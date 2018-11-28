class World {
	constructor() {
		this.obstacles = [];
		this.enemies = [];
		this.player = new Player();
		this.enemy = new Enemy();
	}

	initialize() {

    }

    draw(viewMatrix, projMatrix) {
	    this.update();

	    this.player.draw(viewMatrix, projMatrix);

        this.enemy.draw(viewMatrix, projMatrix);
    }

    update() {
        this.player.update();
    }
}