/// <reference path='./tr.ts'/>

class NodesMaterial {

	static categories = [_tr("Input"), _tr("Texture"), _tr("Color"), _tr("Vector"), _tr("Converter"), _tr("Group")];

	static list: TNode[][] = [
		[ // Input
			{
				id: 0,
				name: _tr("Attribute"),
				type: "ATTRIBUTE",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("Name"),
						type: "STRING"
					}
				]
			},
			{
				id: 0,
				name: _tr("Camera Data"),
				type: "CAMERA",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("View Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("View Z Depth"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("View Distance"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Fresnel"),
				type: "FRESNEL",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("IOR"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.45,
						min: 0,
						max: 3
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Geometry"),
				type: "NEW_GEOMETRY",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Position"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Tangent"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("True Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Incoming"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Parametric"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Backfacing"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Pointiness"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Random Per Island"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Layer"),
				type: "LAYER", // extension
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Base Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Opacity"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Occlusion"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Roughness"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Metallic"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Emission"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Height"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Subsurface"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("Layer"),
						type: "ENUM",
						default_value: 0,
						data: ""
					}
				]
			},
			{
				id: 0,
				name: _tr("Layer Mask"),
				type: "LAYER_MASK", // extension
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("Layer"),
						type: "ENUM",
						default_value: 0,
						data: ""
					}
				]
			},
			{
				id: 0,
				name: _tr("Layer Weight"),
				type: "LAYER_WEIGHT",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Blend"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fresnel"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Facing"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Material"),
				type: "MATERIAL", // extension
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Base Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Opacity"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Occlusion"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Roughness"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Metallic"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Emission"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Height"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Subsurface"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("Material"),
						type: "ENUM",
						default_value: 0,
						data: ""
					}
				]
			},
			{
				id: 0,
				name: _tr("Object Info"),
				type: "OBJECT_INFO",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Location"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Object Index"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Material Index"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Random"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Picker"),
				type: "PICKER", // extension
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Base Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Opacity"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Occlusion"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Roughness"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Metallic"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Emission"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Height"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Subsurface"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("RGB"),
				type: "RGB",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.5, 0.5, 0.5, 1.0])
					}
				],
				buttons: [
					{
						name: _tr("default_value"),
						type: "RGBA",
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Script"),
				type: "SCRIPT_CPU", // extension
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				buttons: [
					{
						name: " ",
						type: "STRING",
						default_value: ""
					}
				]
			},
			{
				id: 0,
				name: _tr("Shader"),
				type: "SHADER_GPU", // extension
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				buttons: [
					{
						name: " ",
						type: "STRING",
						default_value: ""
					}
				]
			},
			{
				id: 0,
				name: _tr("Tangent"),
				type: "TANGENT",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Tangent"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Texture Coordinate"),
				type: "TEX_COORD",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Generated"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("UV"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Object"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Camera"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Window"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Reflection"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("UV Map"),
				type: "UVMAP",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("UV"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Value"),
				type: "VALUE",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				buttons: [
					{
						name: _tr("default_value"),
						type: "VALUE",
						output: 0,
						min: 0.0,
						max: 10.0
					}
				]
			},
			{
				id: 0,
				name: _tr("Vertex Color"),
				type: "VERTEX_COLOR",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Alpha"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Wireframe"),
				type: "WIREFRAME",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Size"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.01,
						max: 0.1
					},
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("Pixel Size"),
						type: "BOOL",
						default_value: false,
						output: 0
					}
				]
			},
		],
		// [ // Output
		// 	{
		// 		id: 0,
		// 		name: _tr("Material Output"),
		// 		type: "OUTPUT_MATERIAL_PBR",
		// 		x: 0,
		// 		y: 0,
		// 		color: 0xffb34f5a,
		// 		inputs: [
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Base Color"),
		// 				type: "RGBA",
		// 				color: 0xffc7c729,
		// 				default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Opacity"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 1.0
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Occlusion"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 1.0
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Roughness"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 0.1
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Metallic"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 0.0
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Normal Map"),
		// 				type: "VECTOR",
		// 				color: -10238109,
		// 				default_value: new Float32Array([0.5, 0.5, 1.0])
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Emission"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 0.0
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Height"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 0.0
		// 			},
		// 			{
		// 				id: 0,
		// 				node_id: 0,
		// 				name: _tr("Subsurface"),
		// 				type: "VALUE",
		// 				color: 0xffa1a1a1,
		// 				default_value: 0.0
		// 			}
		// 		],
		// 		outputs: [],
		// 		buttons: []
		// 	}
		// ],
		[ // Texture
			{
				id: 0,
				name: _tr("Brick Texture"),
				type: "TEX_BRICK",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 1"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 2"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.2, 0.2, 0.2])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Mortar"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Checker Texture"),
				type: "TEX_CHECKER",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 1"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 2"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.2, 0.2, 0.2])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Curvature Bake"),
				type: "BAKE_CURVATURE",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Strength"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0,
						min: 0.0,
						max: 2.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Radius"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0,
						min: 0.0,
						max: 2.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Offset"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0,
						min: -2.0,
						max: 2.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Gradient Texture"),
				type: "TEX_GRADIENT",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("gradient_type"),
						type: "ENUM",
						// data: ["Linear", "Quadratic", "Easing", "Diagonal", "Radial", "Quadratic Sphere", "Spherical"],
						data: [_tr("Linear"), _tr("Diagonal"), _tr("Radial"), _tr("Spherical")],
						default_value: 0,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Image Texture"),
				type: "TEX_IMAGE",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Alpha"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("File"),
						type: "ENUM",
						default_value: 0,
						data: ""
					},
					{
						name: _tr("Color Space"),
						type: "ENUM",
						default_value: 0,
						data: [_tr("Auto"), _tr("Linear"), _tr("sRGB"), _tr("DirectX Normal Map")]
					}
				]
			},
			{
				id: 0,
				name: _tr("Magic Texture"),
				type: "TEX_MAGIC",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Musgrave Texture"),
				type: "TEX_MUSGRAVE",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Height"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Noise Texture"),
				type: "TEX_NOISE",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Voronoi Texture"),
				type: "TEX_VORONOI",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("coloring"),
						type: "ENUM",
						data: [_tr("Intensity"), _tr("Cells")],
						default_value: 0,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Wave Texture"),
				type: "TEX_WAVE",
				x: 0,
				y: 0,
				color: 0xff4982a0,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 5.0,
						min: 0.0,
						max: 10.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: []
			}
		],
		[ // Color
			{
				id: 0,
				name: _tr("Blur"),
				type: "BLUR", // extension
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Strength"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Bright/Contrast"),
				type: "BRIGHTCONTRAST",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Bright"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Contrast"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Gamma"),
				type: "GAMMA",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Gamma"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Hue/Saturation"),
				type: "HUE_SAT",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Hue"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Saturation"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Invert"),
				type: "INVERT",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("MixRGB"),
				type: "MIX_RGB",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 1"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.5, 0.5, 0.5, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color 2"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.5, 0.5, 0.5, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: [
					{
						name: _tr("blend_type"),
						type: "ENUM",
						data: [_tr("Mix"), _tr("Darken"), _tr("Multiply"), _tr("Burn"), _tr("Lighten"), _tr("Screen"), _tr("Dodge"), _tr("Add"), _tr("Overlay"), _tr("Soft Light"), _tr("Linear Light"), _tr("Difference"), _tr("Subtract"), _tr("Divide"), _tr("Hue"), _tr("Saturation"), _tr("Color"), _tr("Value")],
						default_value: 0,
						output: 0
					},
					{
						name: _tr("use_clamp"),
						type: "BOOL",
						default_value: false,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Quantize"),
				type: "QUANTIZE",
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Stength"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.1,
						min: 0,
						max: 1
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Warp"),
				type: "DIRECT_WARP", // extension
				x: 0,
				y: 0,
				color: 0xff448c6d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Angle"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0,
						min: 0.0,
						max: 360.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Mask"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5,
						min: 0.0,
						max: 1.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			}
		],
		[ // Vector
			{
				id: 0,
				name: _tr("Bump"),
				type: "BUMP",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Strength"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Distance"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Height"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Mapping"),
				type: "MAPPING",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Location"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0]),
						display: 1
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Rotation"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0]),
						max: 360.0,
						display: 1
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Scale"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([1.0, 1.0, 1.0]),
						display: 1
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Mix Normal Map"),
				type: "MIX_NORMAL_MAP",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map 1"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map 2"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					}
				],
				buttons: [
					{
						name: _tr("blend_type"),
						type: "ENUM",
						data: [_tr("Partial Derivative"), _tr("Whiteout"), _tr("Reoriented")],
						default_value: 0,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Normal"),
				type: "NORMAL",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Dot"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				buttons: [
					{
						name: _tr("Vector"),
						type: "VECTOR",
						default_value: new Float32Array([0.0, 0.0, 0.0]),
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Normal Map"),
				type: "NORMAL_MAP",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Stength"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0,
						min: 0.0,
						max: 2.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Normal Map"),
						type: "VECTOR",
						color: -10238109,
						default_value: new Float32Array([0.5, 0.5, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Vector Curves"),
				type: "CURVE_VEC",
				x: 0,
				y: 0,
				color: 0xff522c99,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: [
					{
						name: "arm.NodesMaterial.vectorCurvesButton",
						type: "CUSTOM",
						default_value: [[new Float32Array([0.0, 0.0]), new Float32Array([0.0, 0.0])], [new Float32Array([0.0, 0.0]), new Float32Array([0.0, 0.0])], [new Float32Array([0.0, 0.0]), new Float32Array([0.0, 0.0])]],
						output: 0,
						height: 8.5
					}
				]
			}
		],
		[ // Converter
			{
				id: 0,
				name: _tr("Clamp"),
				type: "CLAMP",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Min"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Max"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("operation"),
						type: "ENUM",
						data: [_tr("Min Max"), _tr("Range")],
						default_value: 0,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Color Ramp"),
				type: "VALTORGB",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Fac"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Alpha"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: "arm.NodesMaterial.colorRampButton",
						type: "CUSTOM",
						default_value: [new Float32Array([1.0, 1.0, 1.0, 1.0, 0.0])],
						data: 0,
						output: 0,
						height: 4.5
					}
				]
			},
			{
				id: 0,
				name: _tr("Color Mask"),
				type: "COLMASK",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Mask Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Radius"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.1,
						min: 0.0,
						max: 1.74
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Fuzziness"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Mask"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Combine HSV"),
				type: "COMBHSV",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("H"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("S"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("V"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Combine RGB"),
				type: "COMBRGB",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("R"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("G"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("B"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Combine XYZ"),
				type: "COMBXYZ",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("X"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Y"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Z"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Map Range"),
				type: "MAPRANGE",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("From Min"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("From Max"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("To Min"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("To Max"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 1.0
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("use_clamp"),
						type: "BOOL",
						default_value: false,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("Math"),
				type: "MATH",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.5
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("operation"),
						type: "ENUM",
						data: [_tr("Add"), _tr("Subtract"), _tr("Multiply"), _tr("Divide"), _tr("Power"), _tr("Logarithm"), _tr("Square Root"), _tr("Inverse Square Root"), _tr("Absolute"), _tr("Exponent"), _tr("Minimum"), _tr("Maximum"), _tr("Less Than"), _tr("Greater Than"), _tr("Sign"), _tr("Round"), _tr("Floor"), _tr("Ceil"), _tr("Truncate"), _tr("Fraction"), _tr("Modulo"), _tr("Snap"), _tr("Ping-Pong"), _tr("Sine"), _tr("Cosine"), _tr("Tangent"), _tr("Arcsine"), _tr("Arccosine"), _tr("Arctangent"), _tr("Arctan2"), _tr("Hyperbolic Sine"), _tr("Hyperbolic Cosine"), _tr("Hyperbolic Tangent"), _tr("To Radians"), _tr("To Degrees")],
						default_value: 0,
						output: 0
					},
					{
						name: _tr("use_clamp"),
						type: "BOOL",
						default_value: false,
						output: 0
					}
				]
			},
			{
				id: 0,
				name: _tr("RGB to BW"),
				type: "RGBTOBW",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.0, 0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Val"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Separate HSV"),
				type: "SEPHSV",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.5, 0.5, 0.5, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("H"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("S"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("V"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Separate RGB"),
				type: "SEPRGB",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Color"),
						type: "RGBA",
						color: 0xffc7c729,
						default_value: new Float32Array([0.8, 0.8, 0.8, 1.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("R"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("G"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("B"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Separate XYZ"),
				type: "SEPXYZ",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("X"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Y"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Z"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: []
			},
			{
				id: 0,
				name: _tr("Vector Math"),
				type: "VECT_MATH",
				x: 0,
				y: 0,
				color: 0xff62676d,
				inputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					}
				],
				outputs: [
					{
						id: 0,
						node_id: 0,
						name: _tr("Vector"),
						type: "VECTOR",
						color: 0xff6363c7,
						default_value: new Float32Array([0.0, 0.0, 0.0])
					},
					{
						id: 0,
						node_id: 0,
						name: _tr("Value"),
						type: "VALUE",
						color: 0xffa1a1a1,
						default_value: 0.0
					}
				],
				buttons: [
					{
						name: _tr("operation"),
						type: "ENUM",
						data: [_tr("Add"), _tr("Subtract"), _tr("Multiply"), _tr("Divide"), _tr("Average"), _tr("Cross Product"), _tr("Project"), _tr("Reflect"), _tr("Dot Product"), _tr("Distance"), _tr("Length"), _tr("Scale"), _tr("Normalize"), _tr("Absolute"), _tr("Minimum"), _tr("Maximum"), _tr("Floor"), _tr("Ceil"), _tr("Fraction"), _tr("Modulo"), _tr("Snap"), _tr("Sine"), _tr("Cosine"), _tr("Tangent")],
						default_value: 0,
						output: 0
					}
				]
			}
		],
		[ // Input
			{
				id: 0,
				name: _tr("New Group"),
				type: "GROUP",
				x: 0,
				y: 0,
				color: 0xffb34f5a,
				inputs: [],
				outputs: [],
				buttons: [
					{
						name: "arm.NodesMaterial.newGroupButton",
						type: "CUSTOM",
						height: 1
					}
				]
			}
		]
	];

	static vectorCurvesButton = (ui: Zui, nodes: Nodes, node: TNode) => {
		let but = node.buttons[0];
		let nhandle = Zui.handle("nodesmaterial_0").nest(node.id);
		ui.row([1 / 3, 1 / 3, 1 / 3]);
		ui.radio(nhandle.nest(0).nest(1), 0, "X");
		ui.radio(nhandle.nest(0).nest(1), 1, "Y");
		ui.radio(nhandle.nest(0).nest(1), 2, "Z");
		// Preview
		let axis = nhandle.nest(0).nest(1).position;
		let val: Float32Array[] = but.default_value[axis]; // [ [[x, y], [x, y], ..], [[x, y]], ..]
		let num = val.length;
		// for (let i = 0; i < num; ++i) { ui.line(); }
		ui._y += nodes.LINE_H() * 5;
		// Edit
		ui.row([1 / 5, 1 / 5, 3 / 5]);
		if (ui.button("+")) {
			let f32a = new Float32Array(2);
			f32a[0] = 0; f32a[1] = 0;
			val.push(f32a);
		}
		if (ui.button("-")) {
			if (val.length > 2) val.pop();
		}
		let ihandle = nhandle.nest(0).nest(2).nest(axis, {position: 0});
		let i = Math.floor(ui.slider(ihandle, "Index", 0, num - 1, false, 1, true, Align.Left));
		if (i >= val.length || i < 0) ihandle.value = i = val.length - 1; // Stay in bounds
		ui.row([1 / 2, 1 / 2]);
		nhandle.nest(0).nest(3).value = val[i][0];
		nhandle.nest(0).nest(4).value = val[i][1];
		val[i][0] = ui.slider(nhandle.nest(0).nest(3, {value: 0}), "X", -1, 1, true, 100, true, Align.Left);
		val[i][1] = ui.slider(nhandle.nest(0).nest(4, {value: 0}), "Y", -1, 1, true, 100, true, Align.Left);
	}

	static colorRampButton = (ui: Zui, nodes: Nodes, node: TNode) => {
		let but = node.buttons[0];
		let nhandle = Zui.handle("nodesmaterial_1").nest(node.id);
		let nx = ui._x;
		let ny = ui._y;

		// Preview
		let vals: Float32Array[] = but.default_value; // [[r, g, b, a, pos], ..]
		let sw = ui._w / nodes.SCALE();
		for (let val of vals) {
			let pos = val[4];
			let col = color_from_floats(val[0], val[1], val[2]);
			ui.fill(pos * sw, 0, (1.0 - pos) * sw, nodes.LINE_H() - 2 * nodes.SCALE(), col);
		}
		ui._y += nodes.LINE_H();
		// Edit
		let ihandle = nhandle.nest(0).nest(2);
		ui.row([1 / 4, 1 / 4, 2 / 4]);
		if (ui.button("+")) {
			let last = vals[vals.length - 1];
			let f32a = new Float32Array(5);
			f32a[0] = last[0];
			f32a[1] = last[1];
			f32a[2] = last[2];
			f32a[3] = last[3];
			f32a[4] = 1.0;
			vals.push(f32a);
			ihandle.value += 1;
		}
		if (ui.button("-") && vals.length > 1) {
			vals.pop();
			ihandle.value -= 1;
		}
		but.data = ui.combo(nhandle.nest(0).nest(1, {position: but.data}), [tr("Linear"), tr("Constant")], tr("Interpolate"));

		ui.row([1 / 2, 1 / 2]);
		let i = Math.floor(ui.slider(ihandle, "Index", 0, vals.length - 1, false, 1, true, Align.Left));
		if (i >= vals.length || i < 0) ihandle.value = i = vals.length - 1; // Stay in bounds

		let val = vals[i];
		nhandle.nest(0).nest(3).value = val[4];
		val[4] = ui.slider(nhandle.nest(0).nest(3), "Pos", 0, 1, true, 100, true, Align.Left);
		if (val[4] > 1.0) val[4] = 1.0; // Stay in bounds
		else if (val[4] < 0.0) val[4] = 0.0;

		let chandle = nhandle.nest(0).nest(4);
		chandle.color = color_from_floats(val[0], val[1], val[2]);
		if (ui.text("", Align.Right, chandle.color) == State.Started) {
			let rx = nx + ui._w - nodes.p(37);
			let ry = ny - nodes.p(5);
			nodes._inputStarted = ui.inputStarted = false;
			nodes.rgbaPopup(ui, chandle, val, Math.floor(rx), Math.floor(ry + ui.ELEMENT_H()));
		}
		val[0] = color_get_rb(chandle.color) / 255;
		val[1] = color_get_gb(chandle.color) / 255;
		val[2] = color_get_bb(chandle.color) / 255;
	}

	static newGroupButton = (ui: Zui, nodes: Nodes, node: TNode) => {
		if (node.name == "New Group") {
			for (let i = 1; i < 999; ++i) {
				node.name = tr("Group") + " " + i;

				let found = false;
				for (let g of Project.materialGroups) {
					if (g.canvas.name == node.name) {
						found = true;
						break;
					}
				}
				if (!found) break;
			}

			Nodes.node_replace.push(node);

			let canvas: TNodeCanvas = {
				name: node.name,
				nodes: [
					{
						id: 0,
						name: _tr("Group Input"),
						type: "GROUP_INPUT",
						x: 50,
						y: 200,
						color: 0xff448c6d,
						inputs: [],
						outputs: [],
						buttons: [
							{
								name: "arm.NodesMaterial.groupInputButton",
								type: "CUSTOM",
								height: 1
							}
						]
					},
					{
						id: 1,
						name: _tr("Group Output"),
						type: "GROUP_OUTPUT",
						x: 450,
						y: 200,
						color: 0xff448c6d,
						inputs: [],
						outputs: [],
						buttons: [
							{
								name: "arm.NodesMaterial.groupOutputButton",
								type: "CUSTOM",
								height: 1
							}
						]
					}
				],
				links: []
			};
			Project.materialGroups.push({ canvas: canvas, nodes: new Nodes() });
		}

		let group: TNodeGroup = null;
		for (let g of Project.materialGroups) {
			if (g.canvas.name == node.name) {
				group = g;
				break;
			}
		}

		if (ui.button(tr("Nodes"))) {
			UINodes.groupStack.push(group);
		}
	}

	static groupInputButton = (ui: Zui, nodes: Nodes, node: TNode) => {
		NodesMaterial.addSocketButton(ui, nodes, node, node.outputs);
	}

	static groupOutputButton = (ui: Zui, nodes: Nodes, node: TNode) => {
		NodesMaterial.addSocketButton(ui, nodes, node, node.inputs);
	}

	static addSocketButton = (ui: Zui, nodes: Nodes, node: TNode, sockets: TNodeSocket[]) => {
		if (ui.button(tr("Add"))) {
			UIMenu.draw((ui: Zui) => {
				let groupStack = UINodes.groupStack;
				let c = groupStack[groupStack.length - 1].canvas;
				if (UIMenu.menuButton(ui, tr("RGBA"))) {
					sockets.push(NodesMaterial.createSocket(nodes, node, null, "RGBA", c));
					NodesMaterial.syncSockets(node);
				}
				if (UIMenu.menuButton(ui, tr("Vector"))) {
					sockets.push(NodesMaterial.createSocket(nodes, node, null, "VECTOR", c));
					NodesMaterial.syncSockets(node);
				}
				if (UIMenu.menuButton(ui, tr("Value"))) {
					sockets.push(NodesMaterial.createSocket(nodes, node, null, "VALUE", c));
					NodesMaterial.syncSockets(node);
				}
			}, 3);
		}
	}

	static syncSockets = (node: TNode) => {
		let groupStack = UINodes.groupStack;
		let c = groupStack[groupStack.length - 1].canvas;
		for (let m of Project.materials) NodesMaterial.syncGroupSockets(m.canvas, c.name, node);
		for (let g of Project.materialGroups) NodesMaterial.syncGroupSockets(g.canvas, c.name, node);
		Nodes.node_replace.push(node);
	}

	static syncGroupSockets = (canvas: TNodeCanvas, groupName: string, node: TNode) => {
		for (let n of canvas.nodes) {
			if (n.type == "GROUP" && n.name == groupName) {
				let isInputs = node.name == "Group Input";
				let oldSockets = isInputs ? n.inputs : n.outputs;
				let sockets = JSON.parse(JSON.stringify(isInputs ? node.outputs : node.inputs));
				isInputs ? n.inputs = sockets : n.outputs = sockets;
				for (let s of sockets) s.node_id = n.id;
				let numSockets = sockets.length < oldSockets.length ? sockets.length : oldSockets.length;
				for (let i = 0; i < numSockets; ++i) {
					if (sockets[i].type == oldSockets[i].type) {
						sockets[i].default_value = oldSockets[i].default_value;
					}
				}
			}
		}
	}

	static get_socket_color = (type: string): i32 => {
		return type == "RGBA" ? 0xffc7c729 : type == "VECTOR" ? 0xff6363c7 : 0xffa1a1a1;
	}

	static get_socket_default_value = (type: string): any => {
		return type == "RGBA" ? new Float32Array([0.8, 0.8, 0.8, 1.0]) : type == "VECTOR" ? new Float32Array([0.0, 0.0, 0.0]) : 0.0;
	}

	static get_socket_name = (type: string): string => {
		return type == "RGBA" ? _tr("Color") : type == "VECTOR" ? _tr("Vector") : _tr("Value");
	}

	static createSocket = (nodes: Nodes, node: TNode, name: string, type: string, canvas: TNodeCanvas, min = 0.0, max = 1.0, default_value: any = null): TNodeSocket => {
		return {
			id: nodes.getSocketId(canvas.nodes),
			node_id: node.id,
			name: name == null ? NodesMaterial.get_socket_name(type) : name,
			type: type,
			color: NodesMaterial.get_socket_color(type),
			default_value: default_value == null ? NodesMaterial.get_socket_default_value(type) : default_value,
			min: min,
			max: max
		}
	}

	static getTNode = (nodeType: string): TNode => {
		for (let c of NodesMaterial.list) for (let n of c) if (n.type == nodeType) return n;
		return null;
	}

	static createNode = (nodeType: string, group: TNodeGroup = null): TNode => {
		let n = NodesMaterial.getTNode(nodeType);
		if (n == null) return null;
		let canvas = group != null ? group.canvas : Context.raw.material.canvas;
		let nodes = group != null ? group.nodes : Context.raw.material.nodes;
		let node = UINodes.makeNode(n, nodes, canvas);
		canvas.nodes.push(node);
		return node;
	}
}
