"use strict"

class Input {
    constructor() {
        this.zoom = -15;
        this.zoom_max = -30;
        this.zoom_min = -5;

        this.keyboard();
    }

    keyboard() {
        document.onkeydown = (event) => this.handleKeyDown(event);
        document.onkeyup = (event) => this.handleKeyUp(event);
        //document.onkeypress = (event) => this.handleKeyPress(event);
    }

    handleKeyDown(event) {
        switch (event.key.toLowerCase()) {
            case "z":
                this.zoom -= 1;
                if (this.zoom < this.zoom_max) {
                    this.zoom = this.zoom_max;
                }
                break;
            case "u":
                this.zoom += 1;
                if (this.zoom > this.zoom_min) {
                    this.zoom = this.zoom_min;
                }
                break;
            case "w":
                world.player.direction("up");
                break;
            case "s":
                world.player.direction("down");
                break;
            case "a":
                world.player.rotation("left");
                break;
            case "d":
                world.player.rotation("right");
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.key.toLowerCase()) {
            case "w":
                world.player.direction("stop");
                break;
            case "s":
                world.player.direction("stop");
                break;
            case "a":
                world.player.rotation("stop");
                break;
            case "d":
                world.player.rotation("stop");
                break;
        }
    }
    /*
    handleKeyPress(event) {
        switch (event.key.toLowerCase()) {
            case "z":
                this.zoom -= 1;
                if (this.zoom < this.zoom_max) {
                    this.zoom = this.zoom_max;
                }
                break;
            case "u":
                this.zoom += 1;
                if (this.zoom > this.zoom_min) {
                    this.zoom = this.zoom_min;
                }
                break;
            case "w":
                world.player.move("up");
                break;
            case "s":
                world.player.move("down");
                break;
            case "a":
                world.player.move("left");
                break;
            case "d":
                world.player.move("right");
                break;
        }
    }*/

}