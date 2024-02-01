
class MakeVoxel {

	///if arm_voxels
	static run = (data: TShaderContext) => {
		let structure = new VertexStructure();
		structure.add("pos", VertexData.I16_4X_Normalized);
		structure.add("nor", VertexData.I16_2X_Normalized);
		structure.add("tex", VertexData.I16_2X_Normalized);

		let pipeState = data._pipeState;
		pipeState.inputLayout = [structure];
		data.vertex_elements = [{name: "pos", data: "short4norm"}, {name: "nor", data: "short2norm"}, {name: "tex", data: "short2norm"}];

		// ///if arm_skin
		// let isMesh = Context.raw.object.constructor == MeshObject;
		// let skin = isMesh && cast(Context.raw.object, MeshObject).data.geom.bones != null;
		// if (skin) {
		// 	structure.add("bone", VertexData.I16_4X_Normalized);
		// 	structure.add("weight", VertexData.I16_4X_Normalized);
		// 	data.raw.vertex_elements.push({ name: "bone", data: 'short4norm' });
		// 	data.raw.vertex_elements.push({ name: "weight", data: 'short4norm' });
		// }
		// ///end

		let ds = MakeMaterial.getDisplaceStrength();
		pipeState.vertexShader = Shader.fromSource(MakeVoxel.voxelSource(), ShaderType.Vertex);

		pipeState.compile();
		data.constants = [{ name: "W", type: "mat4", link: "_worldMatrix" }, { name: "N", type: "mat3", link: "_normalMatrix" }];
		data._constants = [pipeState.getConstantLocation("W"), pipeState.getConstantLocation("N")];
		data.texture_units = [{ name: "texpaint_pack" }, { name: "voxels", is_image: true }];
		data._textureUnits = [pipeState.getTextureUnit("texpaint_pack"), pipeState.getTextureUnit("voxels")];
	}

	static voxelSource = (): string => {
		///if krom_direct3d11
		return `#define vec3 float3
		uniform float4x4 W;
		uniform float3x3 N;
		Texture2D<float4> texpaint_pack;
		SamplerState _texpaint_pack_sampler;
		struct SPIRV_Cross_Input { float4 pos : TEXCOORD1; float2 nor : TEXCOORD0; float2 tex : TEXCOORD2; };
		struct SPIRV_Cross_Output { float4 svpos : SV_POSITION; };
		SPIRV_Cross_Output main(SPIRV_Cross_Input stage_input) {
			SPIRV_Cross_Output stage_output;
			" + MakeMaterial.voxelgiHalfExtents() + "
			stage_output.svpos.xyz = mul(float4(stage_input.pos.xyz, 1.0), W).xyz / voxelgiHalfExtents.xxx;
			float3 wnormal = normalize(mul(float3(stage_input.nor.xy, stage_input.pos.w), N));
			float height = texpaint_pack.SampleLevel(_texpaint_pack_sampler, stage_input.tex, 0.0).a;
			stage_output.svpos.xyz += wnormal * height.xxx * float3(" + ds + "," + ds + "," + ds + ");
			stage_output.svpos.w = 1.0;
			return stage_output;
		}`;
		///else
		return `#version 450
		in vec4 pos;
		in vec2 nor;
		in vec2 tex;
		out vec3 voxpositionGeom;
		uniform mat4 W;
		uniform mat3 N;
		uniform sampler2D texpaint_pack;
		void main() {
			" + MakeMaterial.voxelgiHalfExtents() + "
			voxpositionGeom = vec3(W * vec4(pos.xyz, 1.0)) / voxelgiHalfExtents;
			vec3 wnormal = normalize(N * vec3(nor.xy, pos.w));
			float height = textureLod(texpaint_pack, tex, 0.0).a;
			voxpositionGeom += wnormal * vec3(height) * vec3(" + ds + ");
		}`;
		///end
	}
	///end
}
