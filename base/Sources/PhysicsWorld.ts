
///if arm_physics

class PhysicsWorldRaw {
	world: Ammo.btDiscreteDynamicsWorld;
	dispatcher: Ammo.btCollisionDispatcher;
	contacts: TPair[] = [];
	bodyMap = new Map<i32, PhysicsBodyRaw>();
	timeScale = 1.0;
	timeStep = 1 / 60;
	maxSteps = 1;
}

class PhysicsWorld {

	static active: PhysicsWorldRaw = null;
	static vec1: Ammo.btVector3 = null;
	static vec2: Ammo.btVector3 = null;
	static v1 = new Vec4();
	static v2 = new Vec4();

	static load = (done: ()=>void) => {
		let b = Krom.loadBlob("data/plugins/ammo.js");
		globalThis.eval(System.bufferToString(b));
		let print = (s: string) => { Krom.log(s); };
		Ammo({print: print}).then(done);
	}

	static create(): PhysicsWorldRaw {
		let pw = new PhysicsWorldRaw();
		PhysicsWorld.active = pw;
		PhysicsWorld.vec1 = new Ammo.btVector3(0, 0, 0);
		PhysicsWorld.vec2 = new Ammo.btVector3(0, 0, 0);
		PhysicsWorld.init(pw);
		return pw;
	}

	static reset = (pw: PhysicsWorldRaw) => {
		for (let body of pw.bodyMap.values()) PhysicsWorld.removeBody(pw, body);
	}

	static init = (pw: PhysicsWorldRaw) => {
		let broadphase = new Ammo.btDbvtBroadphase();
		let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		pw.dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
		let solver = new Ammo.btSequentialImpulseConstraintSolver();
		pw.world = new Ammo.btDiscreteDynamicsWorld(pw.dispatcher, broadphase, solver, collisionConfiguration);
		PhysicsWorld.setGravity(pw, new Vec4(0, 0, -9.81));
	}

	static setGravity = (pw: PhysicsWorldRaw, v: Vec4) => {
		PhysicsWorld.vec1.setValue(v.x, v.y, v.z);
		pw.world.setGravity(PhysicsWorld.vec1);
	}

	static addBody = (pw: PhysicsWorldRaw, pb: PhysicsBodyRaw) => {
		pw.world.addRigidBody(pb.body, pb.group, pb.mask);
		pw.bodyMap.set(pb.id, pb);
	}

	static removeBody = (pw: PhysicsWorldRaw, pb: PhysicsBodyRaw) => {
		if (pb.destroyed) return;
		pb.destroyed = true;
		if (pw.world != null) pw.world.removeRigidBody(pb.body);
		pw.bodyMap.delete(pb.id);
		PhysicsBody.delete(pb);
	}

	static getContacts = (pw: PhysicsWorldRaw, pb: PhysicsBodyRaw): PhysicsBodyRaw[] => {
		if (pw.contacts.length == 0) return null;
		let res: PhysicsBodyRaw[] = [];
		for (let i = 0; i < pw.contacts.length; ++i) {
			let c = pw.contacts[i];
			let pb: PhysicsBodyRaw = null;
			if (c.a == pb.body.userIndex) pb = pw.bodyMap.get(c.b);
			else if (c.b == pb.body.userIndex) pb = pw.bodyMap.get(c.a);
			if (pb != null && res.indexOf(pb) == -1) res.push(pb);
		}
		return res;
	}

	static getContactPairs = (pw: PhysicsWorldRaw, pb: PhysicsBodyRaw): TPair[] => {
		if (pw.contacts.length == 0) return null;
		let res: TPair[] = [];
		for (let i = 0; i < pw.contacts.length; ++i) {
			let c = pw.contacts[i];
			if (c.a == pb.body.userIndex) res.push(c);
			else if (c.b == pb.body.userIndex) res.push(c);
		}
		return res;
	}

	static lateUpdate = (pw: PhysicsWorldRaw) => {
		let t = Time.delta * pw.timeScale;
		if (t == 0.0) return; // Simulation paused

		pw.world.stepSimulation(pw.timeStep, pw.maxSteps, t);
		PhysicsWorld.updateContacts(pw);
		for (let body of pw.bodyMap.values()) PhysicsBody.physicsUpdate(body);
	}

	static updateContacts = (pw: PhysicsWorldRaw) => {
		pw.contacts = [];
		let disp: Ammo.btDispatcher = pw.dispatcher;
		let numManifolds = disp.getNumManifolds();

		for (let i = 0; i < numManifolds; ++i) {
			let contactManifold = disp.getManifoldByIndexInternal(i);
			let body0 = Ammo.btRigidBody.prototype.upcast(contactManifold.getBody0());
			let body1 = Ammo.btRigidBody.prototype.upcast(contactManifold.getBody1());

			let numContacts = contactManifold.getNumContacts();
			let pt: Ammo.btManifoldPoint = null;
			let posA: Ammo.btVector3 = null;
			let posB: Ammo.btVector3 = null;
			let nor: Ammo.btVector3 = null;
			for (let j = 0; j < numContacts; ++j) {
				pt = contactManifold.getContactPoint(j);
				posA = pt.get_m_positionWorldOnA();
				posB = pt.get_m_positionWorldOnB();
				nor = pt.get_m_normalWorldOnB();
				let cp: TPair = {
					a: body0.userIndex,
					b: body1.userIndex,
					posA: new Vec4(posA.x(), posA.y(), posA.z()),
					posB: new Vec4(posB.x(), posB.y(), posB.z()),
					normOnB: new Vec4(nor.x(), nor.y(), nor.z()),
					impulse: pt.getAppliedImpulse(),
					distance: pt.getDistance()
				};
				pw.contacts.push(cp);
			}
		}
	}

	static pickClosest = (pw: PhysicsWorldRaw, inputX: f32, inputY: f32): PhysicsBodyRaw => {
		let camera = Scene.camera;
		let start = new Vec4();
		let end = new Vec4();
		RayCaster.getDirection(start, end, inputX, inputY, camera);
		let hit = PhysicsWorld.rayCast(pw, camera.base.transform.world.getLoc(), end);
		let body = (hit != null) ? hit.body : null;
		return body;
	}

	static rayCast = (pw: PhysicsWorldRaw, from: Vec4, to: Vec4, group: i32 = 0x00000001, mask = 0xffffffff): THit => {
		let rayFrom = PhysicsWorld.vec1;
		let rayTo = PhysicsWorld.vec2;
		rayFrom.setValue(from.x, from.y, from.z);
		rayTo.setValue(to.x, to.y, to.z);

		let rayCallback = new Ammo.ClosestRayResultCallback(rayFrom, rayTo);

		rayCallback.set_m_collisionFilterGroup(group);
		rayCallback.set_m_collisionFilterMask(mask);

		let worldDyn: Ammo.btDynamicsWorld = pw.world;
		let worldCol: Ammo.btCollisionWorld = worldDyn;
		worldCol.rayTest(rayFrom, rayTo, rayCallback);
		let pb: PhysicsBodyRaw = null;
		let hitInfo: THit = null;

		let rc: Ammo.RayResultCallback = rayCallback;
		if (rc.hasHit()) {
			let co = rayCallback.get_m_collisionObject();
			let body = Ammo.btRigidBody.prototype.upcast(co);
			let hit = rayCallback.get_m_hitPointWorld();
			PhysicsWorld.v1.set(hit.x(), hit.y(), hit.z());
			let norm = rayCallback.get_m_hitNormalWorld();
			PhysicsWorld.v2.set(norm.x(), norm.y(), norm.z());
			pb = pw.bodyMap.get(body.userIndex);
			hitInfo = {
				body: pb,
				pos: PhysicsWorld.v1,
				normal: PhysicsWorld.v2
			};
		}

		Ammo.destroy(rayCallback);
		return hitInfo;
	}
}

type THit = {
	body: PhysicsBodyRaw;
	pos: Vec4;
	normal: Vec4;
}

type TPair = {
	a: i32;
	b: i32;
	posA: Vec4;
	posB: Vec4;
	normOnB: Vec4;
	impulse: f32;
	distance: f32;
}

///end
