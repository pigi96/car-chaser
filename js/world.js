class World {
	constructor() {
		this.obstacles = [];
		this.enemies = [];
		this.player = new Player();
		this.enemy = [];
		this.enemy.position = [0, 0];
        this.obstacles[0] = new Obstacle([5, 0, 0]);
        this.obstacles[1] = new Obstacle([-5, 0, 0]);

        //this.enemies[0] = new Enemy([5, -5, 0]);
        //this.enemies[1] = new Enemy([-5, 5, 0]);

        this.ground = [];
        this.timer = performance.now();

        this.roads = [];

        this.buildMap();
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

        this.ground.forEach(o => o.draw(viewMatrix, projMatrix));

        this.roads.forEach(o => o.draw(viewMatrix, projMatrix));
    }

    update() {
        this.player.update();

        this.player.outOfBounds();

        if (performance.now() - this.timer >= 3000) {
            this.timer = performance.now();
            //this.enemies.push(new Enemy([0, 0, 0]));
        }
    }
    
   /* CheckForCollisions(){
          console.log("Checking for collisions");
          world.obstacles.forEach()
    }*/
    
    
    HandlePlayerFatalCollisions(){
        //console.log("Checking for player fatal collisions");
        for(let i=0;i< world.obstacles.length;i++){
            if(world.player.collision(world.player,world.obstacles[i])){
                return false;
            }
        }
        return true;
    }
    
    HandleEnemyFatalCollisions(){
        //console.log("Checking for enemy fatal collisions");
        for(let i=0;i< world.obstacles.length;i++){
            for(let j=0;j< world.enemies.length;j++){
                if(world.obstacles[i].collision(world.obstacles[i],world.enemies[j])){
                    //console.log("fatal");
                    world.enemies.splice(j,Math.min(j+1,world.enemies.length));
                }
            }
        }
    }
    
    HandleNonFatalCollisions(){
        console.log("Handling nonfatal collisions");
        for(let i=0;i< world.enemies.length;i++){
            for(let j=i+1;j< world.enemies.length;j++){
                if(world.enemies[i].collision(world.enemies[i],world.enemies[j])){
                    world.enemies[i].hp -=40;
                    world.enemies[j].hp -=40;
                    console.log("enemy hp: "+world.enemies[i].hp);
                    if(world.enemies[i].hp <= 0){
                        world.enemies.splice(i,Math.min(i+1,world.enemies.length));
                    }
                    if(world.enemies[j].hp <= 0){
                        world.enemies.splice(j,Math.min(j+1,world.enemies.length));
                    }
                }
            }
            if(world.player.collision(world.player,world.enemies[i])){
                    world.player.hp -=30;
                    world.enemies[i].hp -=30;
                    console.log("player hp"+world.player.hp);
                    if(world.player.hp <= 0){
                        window.location.reload();
                    }
                    if(world.enemies[i].hp <= 0){
                        world.enemies.splice(j,Math.min(j+1,world.enemies.length));
                    }
                
            }
        }
    }
    
    buildMap() {
        for (let i = 45; i >= -45; i = i - 15) {
            for (let j = 45; j >= -45; j = j - 15) {
                this.ground.push(new Ground([i, j, 0]));
            }
        }

        let angle = 4 / 4 * Math.PI;
        let upPoint = [1, 1, 0];
        let leftPoint = [1, 0, 0];
        for (let i = -4; i < 8; i++) {
            this.roads.push(new Road(1, [0, i * 2.5], angle, upPoint));
        }

        for (let i = 0; i < 9; i++) {
            this.roads.push(new Road(1, [0, 31 + i * 2.5], angle, upPoint));
        }

        this.roads.push(new Road(3, [0, -14.5], angle, upPoint));

        for (let i = 0; i < 14; i++) {
            this.roads.push(new Road(1, [0, -18.8 - i * 2.5], angle, upPoint));
        }

        for (let i = 0; i < 7; i++) {
            this.roads.push(new Road(1, [4 + i * 2.5, -14.5], angle, leftPoint));
        }

        this.roads.push(new Road(2, [25.5, -9.6], angle, upPoint));

        for (let i = 0; i < 10; i++) {
            this.roads.push(new Road(1, [30.52, 19 - i * 2.5], angle, upPoint));
        }

        this.roads.push(new Road(3, [30.52, 25], angle, upPoint));

        for (let i = 0; i < 9; i++) {
            this.roads.push(new Road(1, [30.52, 31 + i * 2.5], angle, upPoint));
        }

        for (let i = 0; i < 7; i++) {
            this.roads.push(new Road(1, [36.2 + i * 2.5, 25], angle, leftPoint));
        }

        this.roads.push(new Road(3, [0, 25], angle, upPoint));

        for (let i = 0; i < 9; i++) {
            this.roads.push(new Road(1, [26 - i * 2.5, 25], angle, leftPoint));
        }

        for (let i = 0; i < 9; i++) {
            this.roads.push(new Road(1, [-5 - i * 2.5, 25], angle, leftPoint));
        }

        this.roads.push(new Road(2, [-31.5, 30], angle, leftPoint));

        for (let i = 0; i < 7; i++) {
            this.roads.push(new Road(1, [-36.4, 36 + i * 2.5], angle, upPoint));
        }

        for (let i = 0; i < 20; i++) {
            this.roads.push(new Road(1, [-4 - i * 2.5, -14.5], angle, leftPoint));
        }
    }
}