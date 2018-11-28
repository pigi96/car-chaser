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
		mat4.identity(this.posMatrix);

		this.way = "stop";
		this.rotat = "stop";
        this.speed = 0.2;
        this.turnSpeed = 0.003;
        this.look = "up";
		this.pointingTo = [this.speed, 0.0, 0.0];
	}

	createBuffers(modelObj) {
		const gl = webgl.gl;
		gl.useProgram(webgl.program);

		let modelVertices = modelObj.meshes[0].vertices;
        let modelIndices = [].concat.apply([], modelObj.meshes[0].faces);
        let modelColors = modelObj.meshes[0].texturecoords[0];

		this.modelVertices = modelVertices;
		this.modelIndices = modelIndices;
		this.modelColors = modelColors;

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
		console.log(this.texture);
	}

	draw(viewMatrix, projMatrix) {
		const gl = webgl.gl;
		gl.useProgram(webgl.program);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelVertices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelColors), gl.STATIC_DRAW);

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.activeTexture(gl.TEXTURE0);
		webgl.translate(this.posMatrix, viewMatrix, projMatrix)
		gl.drawElements(gl.TRIANGLES, this.modelIndices.length, gl.UNSIGNED_SHORT, 0);
	}

	move(direction, rotation) {
	    let matrix = null;
        //this.rotate(rotation);
	    switch (direction) {
            case "up":
                switch (rotation) {
                    case "left":
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed/2, 0.0, this.speed]);
                        break;
                    case "right":
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed/2, 0.0, -this.speed]);
                        break;
                    case "stop":
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed, 0.0, 0.0]);
                        break;
                }
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                break;
            case "down":
                switch (rotation) {
                    case "left":
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed/2, 0.0, this.speed]);
                        break;
                    case "right":
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed/2, 0.0, -this.speed]);
                        break;
                    case "stop":
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed, 0.0, 0.0]);
                        break;
                }
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                break;
            case "stop":
                switch (rotation) {
                    case "left":
                        matrix = mat4.fromTranslation(mat4.create(), [0.0, 0.0, this.speed]);
                        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                        break;
                    case "right":
                        matrix = mat4.fromTranslation(mat4.create(), [0.0, 0.0, -this.speed]);
                        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                        break;
                }
                break;
        }
    }

    direction(direction) {
	    this.way = direction;
    }

    rotation(rotation) {
	    this.rotat = rotation;
    }

    /*
    rotate(rotation) {
	    switch (rotation) {
            case "left":
                if (this.pointingTo[0] >= 0 && this.pointingTo[0] <= this.speed) {
                    this.pointingTo[0] -= this.turnSpeed;
                    this.pointingTo[2] += this.turnSpeed;
                } else if (this.pointingTo[0] <= 0 && this.pointingTo[0] >= -this.speed) {
                    this.pointingTo[0] -= this.turnSpeed;
                    this.pointingTo[2] -= this.turnSpeed;
                } else if (this.pointingTo[0] >= -this.speed && this.pointingTo[0] <= 0) {
                    this.pointingTo[0] += this.turnSpeed;
                    this.pointingTo[2] -= this.turnSpeed;
                } else if (this.pointingTo[0] >= 0 && this.pointingTo[0] <= this.speed) {
                    this.pointingTo[0] += this.turnSpeed;
                    this.pointingTo[2] += this.turnSpeed;
                }
                break;
            case "right":
                if (this.pointingTo[0] >= 0 && this.pointingTo[0] <= this.speed) {
                    this.pointingTo[0] += this.turnSpeed;
                    this.pointingTo[2] -= this.turnSpeed;
                } else if (this.pointingTo[0] <= 0 && this.pointingTo[0] >= -this.speed) {
                    this.pointingTo[0] += this.turnSpeed;
                    this.pointingTo[2] += this.turnSpeed;
                } else if (this.pointingTo[0] >= -this.speed && this.pointingTo[0] <= 0) {
                    this.pointingTo[0] -= this.turnSpeed;
                    this.pointingTo[2] += this.turnSpeed;
                } else if (this.pointingTo[0] >= 0 && this.pointingTo[0] <= this.speed) {
                    this.pointingTo[0] -= this.turnSpeed;
                    this.pointingTo[2] -= this.turnSpeed;
                }
                break;
        }
    }
    */

    update() {
	    this.move(this.way, this.rotat);
    }
}