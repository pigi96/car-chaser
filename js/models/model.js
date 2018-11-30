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
        this.width = 1.5; // default
        this.height = 1.5; // default
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

	createBuffers(meshes) {
		this.modelVertices = meshes[3];
		this.modelIndices = meshes[4];
		this.modelColors = meshes[5];

		this.vertexPositionBuffer = meshes[0];
		this.vertexColorBuffer = meshes[1];
		this.vertexIndexBuffer = meshes[2];
	}

	createTextures(img) {
		this.texture = img;
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

	rotateObject() {}

    direction(direction) {
	    this.way = direction;
    }

    rotation(rotation) {
	    this.rotat = rotation;
    }
}