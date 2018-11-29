"use strict"

class Enemy extends Model {
	constructor(pos) {
        super();

        let random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                this.createBuffers(carObj, 2);
                this.createTextures(car8);
                this.hp = 80;
                this.speed = 0.15;
                break;
            case 1:
                this.createBuffers(carObj, 3);
                this.createTextures(car1);
                this.hp= 120;
                this.speed = 0.1;
                break;
            case 2:
                this.createBuffers(carObj, 0);
                this.createTextures(car11);
                this.hp = 300;
                this.speed = 0.08;
                break;
        }
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
	}
	

	attackPlayer(player) {
	  world.HandleEnemyFatalCollisions();
	    let dir = [0, 0];
	    dir[0] = player.position[0] - this.position[0];
	    dir[1] = player.position[1] - this.position[1];

	    let sum = Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]);
	    if (sum == 0) {
	        sum = 0.0001;
        }
	    dir[0] = dir[0] / sum;
	    dir[1] = dir[1] / sum;

	    let angle = Math.atan2(dir[0], -dir[1]);
	    //console.log(angle);
	    if (angle >= 0) {
	        this.angle = angle * (4 / Math.PI);
        } else {
	        this.angle = 4 + (4 + angle * (4 / Math.PI));
        }

        let matrix = mat4.fromTranslation(mat4.create(), [this.speed*dir[0], this.speed*dir[1], 0.0]);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
        this.position[0] = this.posMatrix[12];
        this.position[1] = this.posMatrix[13];
	  }
}