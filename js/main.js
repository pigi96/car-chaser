"use strict"

let input;
let world;
let score = document.getElementById("score");
let scoreNode = document.createTextNode("");
score.appendChild(scoreNode);
let health = document.getElementById("hpidhp");
//let healthNode = document.createTextNode("");
//health.appendChild(healthNode);

function load() {
	webgl.initialize(vsText, fsText);
    setAssets();

	world = new World();
    
	input = new Input();
	
	requestAnimationFrame(update);
}

let deltaTime = 1;
function update() {
    let frameStart = performance.now();

	const gl = webgl.gl;
	gl.useProgram(webgl.program);

    let viewMatrix = new Float32Array(16);
    let projMatrix = new Float32Array(16);


    mat4.perspective(projMatrix, glMatrix.toRadian(60), webgl.width / webgl.height, 0.1, 1000.0);

	mat4.lookAt(viewMatrix, [0, input.zoom, input.zoom], [0, 0, 0], [0, 1, 0]);
    //mat4.fromRotation(viewMatrix, glMatrix.toRadian(40), [1.0, 0.0, 0.0]);
    mat4.translate(viewMatrix, viewMatrix, [-world.player.position[0], -world.player.position[1], 0]);
    //mat4.multiply(projMatrix, projMatrix, viewMatrix);

    let identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	//gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	
	let score = world.player.score;
	scoreNode.nodeValue = score.toFixed(0);
	
	let hp = world.player.hp;
	health.value = hp.toFixed(0);
	
	gl.clearColor(0.4, 0.4, 1, 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	world.draw(viewMatrix, projMatrix);
	
	deltaTime = performance.now() - frameStart;
	requestAnimationFrame(update);
}

function createTextures(img) {
    const gl = webgl.gl;
    gl.useProgram(webgl.program);
    // loooooool
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

    return texture;
}

function createBuffers(modelObj, meshPos) {
    const gl = webgl.gl;
    gl.useProgram(webgl.program);

    let modelVertices = modelObj.meshes[meshPos].vertices;
    let modelIndices = [].concat.apply([], modelObj.meshes[meshPos].faces);
    let modelColors = modelObj.meshes[meshPos].texturecoords[0];

    const vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertices), gl.STATIC_DRAW);
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

    const vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelColors), gl.STATIC_DRAW);
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

    const vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW);

    let returned = [vertexPositionBuffer, vertexColorBuffer, vertexIndexBuffer, modelVertices, modelIndices, modelColors];
    return returned;
}