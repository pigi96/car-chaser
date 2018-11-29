"use strict"

function main() {
	
	normalize(modelObj.meshes);
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


    let worldMatrix = new Float32Array(16);
    let viewMatrix = new Float32Array(16);
    let projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, 40*input.zoom], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(60), webgl.width / webgl.height, 0.1, 1000.0);

    let identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	//gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

	world.draw(viewMatrix, projMatrix);

	deltaTime = performance.now() - frameStart;
	requestAnimationFrame(update);
}

function normalize(mashes){
		console.log("začetek normalizacije");
    	for(var i=1;i<mashes.length;i++){
    		let max = Math.max(...mashes[i].vertices); 
    		let min = Math.min(...mashes[i].vertices); 
    		let rng = 2;
    		if(i== 1 || i == 2 || i == 3){
    			rng = 4;
    		}
    		for(var j=0;j<mashes[i].vertices.length;j++){
    			mashes[i].vertices[j]=rng*(mashes[i].vertices[j]-min)/(max-min) - rng/2;
    		}
    	}
    }