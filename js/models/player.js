"use strict"

class Player extends Model {
	constructor() {
		super();

		this.createBuffers(car3Meshes);
		this.createTextures(car2Img);
        
        this.way = "stop";
        this.rotat = "stop";
        this.speed = 0.2;
        this.turnSpeed = 0.003;
        this.look = "up";
        this.angle = 0;
        this.pointingTo = [-this.speed, this.speed, 0.0];
        this.score = 0;
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

    rotateVector(vec, ang) {
        ang = -ang * (Math.PI/180);
        let cos = Math.cos(ang);
        let sin = Math.sin(ang);
        return new Array(Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000);
    };

    move(direction, rotation) {
        //this.rotate(rotation);
        let sum = Math.sqrt(this.pointingTo[0]*this.pointingTo[0]+this.pointingTo[1]*this.pointingTo[1]);
        if (sum == 0) {
            sum = 0.0001;
        }
        this.pointingTo[0] = this.pointingTo[0] / sum;
        this.pointingTo[1] = this.pointingTo[1] / sum;

        let angle = Math.atan2(this.pointingTo[0], -this.pointingTo[1]);
        if (angle >= 0) {
            this.angle = angle * (4 / Math.PI);
        } else {
            this.angle = 4 + (4 + angle * (4 / Math.PI));
        }

        switch(direction) {
            case "up":
                let matrix = mat4.fromTranslation(mat4.create(), [this.speed*this.pointingTo[0], this.speed*this.pointingTo[1], 0.0]);
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                this.position[0] = this.posMatrix[12];
                this.position[1] = this.posMatrix[13];
                switch (rotation) {
                    case "left":
                        this.pointingTo = this.rotateVector(this.pointingTo, 4);
                        break;
                    case "right":
                        this.pointingTo = this.rotateVector(this.pointingTo, -4);
                        break;
                    case "stop":
                        // Do nothing
                        break;
                }
                break;
            case "down":
                let matrix1 = mat4.fromTranslation(mat4.create(), [-this.speed*this.pointingTo[0], -this.speed*this.pointingTo[1], 0.0]);
                mat4.multiply(this.posMatrix, this.posMatrix, matrix1);
                this.position[0] = this.posMatrix[12];
                this.position[1] = this.posMatrix[13];
                switch (rotation) {
                    case "left":
                        this.pointingTo = this.rotateVector(this.pointingTo, 3);
                        break;
                    case "right":
                        this.pointingTo = this.rotateVector(this.pointingTo, -3);
                        break;
                    case "stop":
                        // Do nothing
                        break;
                }
                break;
            case "stop":
                // Do nothing
                break;
        }

        /*
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
        */

        this.position[0] = this.posMatrix[12];
        this.position[1] = this.posMatrix[13];
        this.camera();
        
    }

    outOfBounds() {
	    let bound = 52;
        if (this.position[0] <= -bound || this.position[0] >= bound || this.position[1] <= -bound || this.position[1] >= bound) {
            window.location.reload();
        }
    }

    rotateObject() {
        let angle = this.angle / 4 * Math.PI;
        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [0, 0, 1]);
        this.rotateModelCorrectlyCauseWeDontKnowHowToUseBlender();
    }

    camera() {

    }

    update() {
        this.move(this.way, this.rotat);
    }

}