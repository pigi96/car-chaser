"use strict"

class Player extends Model {
	constructor() {
		super();

		this.createBuffers(carObj, 3);
		this.createTextures(car2);
        
        this.way = "stop";
        this.rotat = "stop";
        this.speed = 0.2;
        this.turnSpeed = 0.003;
        this.look = "up";
        this.angle = 0;
        this.pointingTo = [this.speed, 0.0, 0.0];
	}

    move(direction, rotation) {
        let matrix = null;
        //this.rotate(rotation);
        switch (direction) {
            case "up":
                if(world.HandlePlayerFatalCollisions()){
                switch (rotation) {
                    case "left":
                        this.angle = 3;
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed/Math.sqrt(2), this.speed/Math.sqrt(2), 0.0]);
                        break;
                    case "right":
                        this.angle = 5;
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed/Math.sqrt(2), this.speed/Math.sqrt(2), 0.0]);
                        break;
                    case "stop":
                        this.angle = 4;
                        matrix = mat4.fromTranslation(mat4.create(), [0.0, this.speed, 0.0]);
                        break;
                }
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                }else{
                    window.location.reload();
                }
                break;
            case "down":
                 if(world.HandlePlayerFatalCollisions()){
                switch (rotation) {
                    case "left":
                        this.angle = 1;
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed/Math.sqrt(2), -this.speed/Math.sqrt(2), 0.0]);
                        break;
                    case "right":
                        this.angle = 7;
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed/Math.sqrt(2), -this.speed/Math.sqrt(2), 0.0]);
                        break;
                    case "stop":
                        this.angle = 0;
                        matrix = mat4.fromTranslation(mat4.create(), [0.0, -this.speed, 0.0]);
                        break;
                }
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                 }else{
                    window.location.reload();
                }
                break;
            case "stop":
                switch (rotation) {
                    case "left":
                        if(world.HandlePlayerFatalCollisions()){
                        this.angle = 2;
                        matrix = mat4.fromTranslation(mat4.create(), [this.speed, 0.0, 0.0]);
                        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                        }else{
                            window.location.reload();
                        }
                        break;
                    case "right":
                        if(world.HandlePlayerFatalCollisions()){
                        this.angle = 6;
                        matrix = mat4.fromTranslation(mat4.create(), [-this.speed, 0.0, 0.0]);
                        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                        }else{
                        window.location.reload();
                        }
                        break;
                }
                break;
        }
        this.position[0] = this.posMatrix[12];
        this.position[1] = this.posMatrix[13];
        this.camera();
        
    }

    camera() {

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