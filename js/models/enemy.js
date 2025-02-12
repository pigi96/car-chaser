"use strict"

class Enemy extends Model {
	constructor(pos) {
        super();

        let speedMultiplier = 1.25 - (Math.random() * 0.5);
        let random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                this.createBuffers(car2Meshes);
                this.createTextures(car8Img);
                this.hp = 80;
                this.speed = 0.15 * speedMultiplier;
                break;
            case 1:
                this.createBuffers(car3Meshes);
                this.createTextures(car1Img);
                this.hp= 120;
                this.speed = 0.1 * speedMultiplier;
                break;
            case 2:
                let random1 = Math.floor(Math.random() * 2);
                this.createBuffers(car0Meshes);
                if (random1 == 0) {
                    this.createTextures(car11Img);
                } else {
                    this.createTextures(car10Img);
                }
                this.hp = 300;
                this.speed = 0.08 * speedMultiplier;
                break;
        }
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);

        this.width = 1.5;
        this.height = 1.5;

        this.hit = false;
        this.lastHit = 500;
        this.counter = this.lastHit;
	}
	

    rotateModelCorrectlyCauseWeDontKnowHowToUseBlender() {
        mat4.rotate(this.rotatedMatrix, this.rotatedMatrix, Math.PI, [0, 1, 1]);
        mat4.rotate(this.rotatedMatrix, this.rotatedMatrix, Math.PI, [0, 0, 1]);
    }

    rotateObject() {
        let angle = this.angle / 4 * Math.PI;
        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [0, 0, 1]);
        this.rotateModelCorrectlyCauseWeDontKnowHowToUseBlender();
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