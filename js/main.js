"use strict"

function main() {
	normalize(carObj.meshes,1);
	normalize(grassObj.meshes,1);
    load();
}

let input;
let world;
function load() {
	webgl.initialize(vsText, fsText);

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
    //mat4.fromRotation(viewMatrix, glMatrix.toRadian(40), [0, 0, 0]);
    mat4.translate(viewMatrix, viewMatrix, [-world.player.position[0], -world.player.position[1], 0.0]);
    //mat4.multiply(projMatrix, projMatrix, viewMatrix);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

	world.draw(viewMatrix, projMatrix);

	deltaTime = performance.now() - frameStart;
	requestAnimationFrame(update);
}

function normalize(mashes, type, rngf){
    if (type == 1) {
        for (var i = 0; i < mashes.length; i++) {
            let max = Math.max(...mashes[i].vertices);
            let min = Math.min(...mashes[i].vertices);
            let rng = 4;
            if (i == 1 || i == 2 || i == 3) {
                rng = 2;
            }
            for (var j = 0; j < mashes[i].vertices.length; j++) {
                mashes[i].vertices[j] = rng * (mashes[i].vertices[j] - min) / (max - min) - rng / 2;
            }
        }
    } else if (type == 2) {
        for (var i = 0; i < mashes.length; i++) {
            let max = Math.max(...mashes[i].vertices);
            let min = Math.min(...mashes[i].vertices);
            let rng = rngf;
            for (var j = 0; j < mashes[i].vertices.length; j++) {
                mashes[i].vertices[j] = rng * (mashes[i].vertices[j] - min) / (max - min) - rng / 2;
            }
        }
    }
    }