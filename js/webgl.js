"use strict"

class WebGL {
	initialize(vsText, fsText) {
		this.canvas = document.getElementById("glCanvas");
		//this.ctx = this.canvas.getContext("2d");
        //this.ctx.font = "30px Arial";
        //this.ctx.strokeText("Hello World",10,50);

		const { glCan, width, height } = this.getWebGLContext();
		this.gl = glCan;
		this.width = width;
		this.height = height;

		if(!this.gl) {
			return;
		}

		this.setDrawCanvas();

		this.program = this.initalizeShaders(vsText, fsText);
	}

	getWebGLContext() {
		let gl = this.canvas.getContext("webgl");

		if (!gl) {
			console.log("WebGL not supported, falling back on experimental-webgl");
			gl = this.canvas.getContext("experimental-webgl");
			if (!gl) {
				alert("Your browser does not support WebGL");
			}
		}

		return { glCan: gl, width: this.canvas.width, height: this.canvas.height };
	}

	setDrawCanvas() {
		this.gl.clearColor(0.75, 0.85, 0.8, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
	}

	getShader(source, type) {
		let shader = this.gl.createShader(type);

		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			console.error("Error: ", this.gl.getShaderInfoLog(shader));
			return;
		}

		return shader;
	}

	getProgram(vertexShader, fragmentShader) {
		let program = this.gl.createProgram();
		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);
		if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
			console.error("Error: ", this.gl.getProgramInfoLog(program));
			return;
		}

		this.gl.validateProgram(program);
		if (!this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS)) {
			console.error("ERROR validating program!", this.gl.getProgramInfoLog(program));
			return;
		}

		return program;
	}

	initalizeShaders(vsText, fsText) {
		const vertexShader = this.getShader(vsText, this.gl.VERTEX_SHADER);
		const fragmentShader = this.getShader(fsText, this.gl.FRAGMENT_SHADER);

		const program = this.getProgram(vertexShader, fragmentShader);

		this.gl.useProgram(program);

		return program;
	}

	translate(worldMatrix, viewMatrix, projMatrix) {
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, 'mWorld'), this.gl.FALSE, worldMatrix);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, 'mView'), this.gl.FALSE, viewMatrix);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, 'mProj'), this.gl.FALSE, projMatrix);
    }
}

let webgl = new WebGL();