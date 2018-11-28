class World {
	constructor() {
		this.obstacles = [];
		this.enemies = [];
		this.player = new Player();
		this.enemy = [];
		this.enemy.position = [0, 0];

        this.obstacles[0] = new Obstacle([5, 0, 0]);
        this.obstacles[1] = new Obstacle([-5, 0, 0]);

        this.enemies[0] = new Enemy([8, -13, 0]);
        this.enemies[1] = new Enemy([-9, 13, 0]);
	}

	initialize() {

    }

    draw(viewMatrix, projMatrix) {
	    this.update();

	    this.player.draw(viewMatrix, projMatrix);
	    //console.log(this.player.position);

        this.enemies.forEach(o => o.attackPlayer(this.player));
        this.enemies.forEach(o => o.draw(viewMatrix, projMatrix));
        //console.log(this.player.collision(this.player, this.enemy));

        this.obstacles.forEach(o => o.draw(viewMatrix, projMatrix));
    }

    update() {
        this.player.update();
    }
}