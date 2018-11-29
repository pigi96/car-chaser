"use strict"

function main() {
	normalize(carObj.meshes);
    load();
}
let input;
let world;

function load() {
	webgl.initialize(vsText, fsText);

	world = new World();
    
	input = new Input();
	setInterval(world.HandleNonFatalCollisions,500);
	
	requestAnimationFrame(update);
}

let deltaTime = 1;
function update() {
    let frameStart = performance.now();

	const gl = webgl.gl;
	gl.useProgram(webgl.program);


    let viewMatrix = new Float32Array(16);
    let projMatrix = new Float32Array(16);


    mat4.perspective(projMatrix, glMatrix.toRadian(90), webgl.width / webgl.height, 0.1, 1000.0);

	mat4.lookAt(viewMatrix, [0, 0, 4*input.zoom], [0, 0, 0], [0, 1, 0]);
    //mat4.fromRotation(viewMatrix, glMatrix.toRadian(40), [1.0, 0.0, 0.0]);
    mat4.translate(viewMatrix, viewMatrix, [-world.player.position[0], -world.player.position[1], -50.0]);
    //mat4.multiply(projMatrix, projMatrix, viewMatrix);

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
		console.log("normalize obj");
    	for(var i=0 ;i<mashes.length; i++){
    		let max = Math.max(...mashes[i].vertices); 
    		let min = Math.min(...mashes[i].vertices); 
    		let rng = 4;
    		if(i== 1 || i == 2 || i == 3){
    			rng = 2;
    		}
    		for(var j=0;j<mashes[i].vertices.length;j++){
    			mashes[i].vertices[j]=rng*(mashes[i].vertices[j]-min)/(max-min) - rng/2;
    		}

           // console.log(mashes[i].vertices);
    	}
    }