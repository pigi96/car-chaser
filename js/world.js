class World {
	constructor() {
		this.obstacles = [];
		this.enemies = [];
		this.player = new Player();
		this.enemy = [];
		this.enemy.position = [0, 0];
        this.obstacles[0] = new Obstacle([5, 0, 0]);
        this.obstacles[1] = new Obstacle([-5, 0, 0]);

        this.enemies[0] = new Enemy([5, -5, 0]);
        this.enemies[1] = new Enemy([-5, 5, 0]);

        this.ground = [];
        this.timer = performance.now();

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
    }

    update() {
        this.player.update();

        this.player.outOfBounds();

        if (performance.now() - this.timer >= 3000) {
            this.timer = performance.now();
            this.enemies.push(new Enemy([0, 0, 0]));
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
        this.ground[0] = new Ground([-30, 0, 0]);
        this.ground[1] = new Ground([-15, 0, 0]);
        this.ground[2] = new Ground([0, 0, 0]);
        this.ground[3] = new Ground([15, 0, 0]);
        this.ground[4] = new Ground([30, 0, 0]);

        this.ground[5] = new Ground([-30, 15, 0]);
        this.ground[6] = new Ground([-15, 15, 0]);
        this.ground[7] = new Ground([0, 15, 0]);
        this.ground[8] = new Ground([15, 15, 0]);
        this.ground[9] = new Ground([30, 15, 0]);

        this.ground[10] = new Ground([-30, 30, 0]);
        this.ground[11] = new Ground([-15, 30, 0]);
        this.ground[12] = new Ground([0, 30, 0]);
        this.ground[13] = new Ground([15, 30, 0]);
        this.ground[14] = new Ground([30, 30, 0]);

        this.ground[15] = new Ground([-30, -15, 0]);
        this.ground[16] = new Ground([-15, -15, 0]);
        this.ground[17] = new Ground([0, -15, 0]);
        this.ground[18] = new Ground([15, -15, 0]);
        this.ground[19] = new Ground([30, -15, 0]);

        this.ground[20] = new Ground([-30, -30, 0]);
        this.ground[21] = new Ground([-15, -30, 0]);
        this.ground[22] = new Ground([0, -30, 0]);
        this.ground[23] = new Ground([15, -30, 0]);
        this.ground[24] = new Ground([30, -30, 0]);
    }
}