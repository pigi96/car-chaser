"use strict"

class Model {
	constructor() {
		this.vertexPositionBuffer = null;
		this.vertexColorBuffer = null;
		this.vertexIndexBuffer = null;
		this.texture = null;

		this.modelVertices = null;
		this.modelIndices = null;
		this.modelTexCoords = null;
		this.posMatrix = new Float32Array(16);
		this.rotatedMatrix = new Float32Array(16);
		mat4.identity(this.posMatrix);
		mat4.identity(this.rotatedMatrix);

		this.angle = 0;
		this.angletSet = 0;

        this.position = [0, 0];
        this.width = 1.5;
        this.height = 1.5;
        this.hp = 100;
	}

    rotateModelCorrectlyCauseWeDontKnowHowToUseBlender() {
        mat4.rotate(this.rotatedMatrix, this.rotatedMatrix, Math.PI, [0, 1, 1]);
        mat4.rotate(this.rotatedMatrix, this.rotatedMatrix, Math.PI, [0, 0, 1]);
    }

	collision(model1, model2) {
        if (Math.abs(model1.position[0] - model2.position[0]) <= this.width) {
            if (Math.abs(model1.position[1] - model2.position[1]) <= this.height) {
                return true;
            }
        }
        return false;
    }

	createBuffers(modelObj, meshPos) {
		const gl = webgl.gl;
		gl.useProgram(webgl.program);

		let modelVertices = modelObj.meshes[meshPos].vertices;
        let modelIndices = [].concat.apply([], modelObj.meshes[meshPos].faces);
        let modelColors = modelObj.meshes[meshPos].texturecoords[0];

		this.modelVertices = modelVertices;
		this.modelIndices = modelIndices;
		this.modelColors = modelColors;
		//console.log(meshPos, modelVertices);

		const vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertices), gl.STATIC_DRAW);

		const vertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelColors), gl.STATIC_DRAW);

		const vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		let positionAttribLocation = gl.getAttribLocation(webgl.program, 'aVertexPosition');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
		let colorAttribLocation = gl.getAttribLocation(webgl.program, 'aVertexColor');
		gl.vertexAttribPointer(
            colorAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0
		);
		gl.enableVertexAttribArray(colorAttribLocation);

		this.vertexPositionBuffer = vertexPositionBuffer;
		this.vertexColorBuffer = vertexColorBuffer;
		this.vertexIndexBuffer = vertexIndexBuffer;
	}

	createTextures(img) {
		const gl = webgl.gl;
		gl.useProgram(webgl.program);

		let texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texImage2D(
			gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
			gl.UNSIGNED_BYTE,
			img
		);
		gl.bindTexture(gl.TEXTURE_2D, null);

		this.texture = texture;
	}

	draw(viewMatrix, projMatrix) {
		const gl = webgl.gl;
		gl.useProgram(webgl.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        let positionAttribLocation = gl.getAttribLocation(webgl.program, 'aVertexPosition');
        gl.vertexAttribPointer(
            positionAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(positionAttribLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        let colorAttribLocation = gl.getAttribLocation(webgl.program, 'aVertexColor');
        gl.vertexAttribPointer(
            colorAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0
        );
        gl.enableVertexAttribArray(colorAttribLocation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.activeTexture(gl.TEXTURE0);
        this.rotateObject();
		webgl.translate(this.rotatedMatrix, viewMatrix, projMatrix);

		gl.drawElements(gl.TRIANGLES, this.modelIndices.length, gl.UNSIGNED_SHORT, 0);
	}

	rotateObject() {
        let angle = this.angle / 4 * Math.PI;
        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [0, 0, 1]);
        this.rotateModelCorrectlyCauseWeDontKnowHowToUseBlender();
    }

    direction(direction) {
	    this.way = direction;
    }

    rotation(rotation) {
	    this.rotat = rotation;
    }
}