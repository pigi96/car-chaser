class World {
	constructor() {
		this.obstacles = [];
		this.enemies = [];
		this.player = new Player();
		this.enemy = [];
		this.heals = [];
        this.crates = [];
		this.enemy.position = [0, 0];

        //this.enemies[0] = new Enemy([5, -5, 0]);
        //this.enemies.push(new Enemy([-5, 5, 0]));
        this.ground = [];
        this.timerForEnemies = performance.now();
        this.timerForHeals = performance.now();
        this.timerForCrates = performance.now();
        this.timerForScore = performance.now();
        this.spawnEnemiesAt = 3000;
        this.spawnHealsAt = 8000;
        this.spawnCratesAt = 7000;
        this.updateScoreAt = 1000;

        this.roads = [];

        this.buildMap();
	}

	initialize() {

    }

    draw(viewMatrix, projMatrix) {
	    this.update();
    
	    this.player.draw(viewMatrix, projMatrix);
	    //console.log(this.player.position);


        this.enemies.forEach(o => o.draw(viewMatrix, projMatrix));
        //console.log(this.player.collision(this.player, this.enemy));

        this.obstacles.forEach(o => o.draw(viewMatrix, projMatrix));

        this.ground.forEach(o => o.draw(viewMatrix, projMatrix));

        this.roads.forEach(o => o.draw(viewMatrix, projMatrix));
        
        this.heals.forEach(h => h.draw(viewMatrix, projMatrix));
        
        this.crates.forEach(c => c.draw(viewMatrix, projMatrix));
    }

    update() {
        this.player.update();

        this.HandleHealCollisions();
        this.HandleCrateCollisions();
        this.HandleNonFatalCollisions();
        this.HandleEnemyFatalCollisions();
        if (!this.HandlePlayerFatalCollisions()) {
            this.resetGame();
        }

        this.enemies.forEach(o => o.attackPlayer(this.player));

        this.player.outOfBounds();

        if (performance.now() - this.timerForEnemies >= this.spawnEnemiesAt) {
            this.timerForEnemies = performance.now();

            this.spawnNewEnemy();
        }
        if (performance.now() - this.timerForHeals >= this.spawnHealsAt) {
            this.timerForHeals = performance.now();

            this.spawnHeals();
        }
        if (performance.now() - this.timerForCrates >= this.spawnCratesAt) {
            this.timerForCrates = performance.now();

            this.spawnCrates();
        }
        if (performance.now() - this.timerForScore >= this.updateScoreAt) {
            this.timerForScore = performance.now();

            this.updateScore();
        }
    }

    spawnNewEnemy() {
	    /*let x_range = Math.floor(Math.random() * 2);
	    let y_range = Math.floor(Math.random() * 2);
	    console.log(x_range);
	    let x = 0;
	    let y = 0;
	    if (x_range == 0) {
	        x = -10;
        } else {
	        x = +10;
        }
        if (y_range == 0) {
            y = -10;
        } else {
            y = +10;
        }

        x += this.player.position[0];
	    y += this.player.position[1];

	    let x_ran = Math.floor(Math.random() * 20) - 10 + x;
	    let y_ran = Math.floor(Math.random() * 20) - 10 + y;*/

        let possibleSpawns = [
            [0, 50],
            [30, 50],
            [50, 25],
            [0, -50],
            [-50, -14.5],
            [-36, 50]
        ];

        let random = Math.floor(Math.random() * 6);
        let found = possibleSpawns[random];
        console.log(found[0], found[1]);
        this.enemies.push(new Enemy([found[0], found[1], 0]));
    }
    
    HandleHealCollisions(){
        //console.log("Handling heal collisions");
         for(let i=0;i< world.heals.length;i++){
            if(world.heals[i].collision(world.heals[i],world.player)){
                if(world.player.hp < 100){
                    console.log("lets regen!");
                    world.player.hp = Math.min(world.player.hp+20,100);
                    world.heals.splice(i,1);
                }
            }
        }
    }
    
    HandleCrateCollisions(){
         //console.log("Handling Crate collisions");
         for(let i=0;i< world.crates.length;i++){
            if(world.crates[i].collision(world.crates[i],world.player)){
                    console.log("ay money!");
                    world.player.score += Math.round(Math.random()*10)*10+10;
                    world.crates.splice(i,1);
            }
        }
    }
    
    updateScore(){
        world.player.score += 1;
    }
    
    spawnHeals(){
        if(world.heals.length <5){
            console.log("spawning new heal");
            let oneX = 1 ;
            let oneY = 1 ;
            if(Math.random()< 0.5){
                oneX = -1;
            }
            if(Math.random()< 0.5){
                oneY = -1;
            }
            world.heals[world.heals.length] = new Heal([Math.round(Math.random()*45*oneX),Math.round(Math.random()*45*oneY), 0]);
       }
    }
    
    spawnCrates(){
        if(world.crates.length <5){
            console.log("spawning new crate");
            let oneX = 1 ;
            let oneY = 1 ;
            if(Math.random()< 0.5){
                oneX = -1;
            }
            if(Math.random()< 0.5){
                oneY = -1;
            }
            world.crates[world.crates.length] = new Crate([Math.round(Math.random()*45*oneX),Math.round(Math.random()*45*oneY), 0]);
       }
    }
    
    HandlePlayerFatalCollisions(){
        //console.log("Checking for player fatal collisions");
        for (let i = 0; i < world.obstacles.length; i++){
            if(world.player.collision(world.player, world.obstacles[i])){
                return false;
            }
        }
        return true;
    }
    
    HandleEnemyFatalCollisions(){
        //console.log("Checking for enemy fatal collisions");
        for (let i = 0; i < world.obstacles.length; i++) {
            for(let j = 0; j < world.enemies.length; j++) {
                if(world.obstacles[i].collision(world.obstacles[i],world.enemies[j])){
                    //console.log("fatal");
                    world.enemies.splice(j, 1);
                }
            }
        }
    }
    
    HandleNonFatalCollisions(){
        //console.log("Handling nonfatal collisions");
        for (let i = 0; i < world.enemies.length; i++) {
            for(let j = i+1; j < world.enemies.length; j++) {
                if(world.enemies[i].collision(world.enemies[i], world.enemies[j])){
                    world.enemies[i].hp -=2;
                    world.enemies[j].hp -=2;
                    console.log("enemy hp: "+world.enemies[i].hp);
                    if(world.enemies[i].hp <= 0){
                        world.enemies.splice(i, 1);
                        j--;
                    }
                    if(world.enemies[j].hp <= 0){
                        world.enemies.splice(j, 1);
                    }
                }
            }
            if(world.player.collision(world.player, world.enemies[i])){
                console.log(world.enemies[i]);
                    world.player.hp -=1.5;
                    world.enemies[i].hp -=1.5;
                    console.log("player hp"+world.player.hp);
                    if(world.player.hp <= 0){
                        this.resetGame();
                    } else if(world.enemies[i].hp <= 0){
                        world.enemies.splice(i, 1);
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

        this.obstacles.push(new Obstacle(1,[15, 0, 0]));

        this.obstacles.push(new Obstacle(1,[8, 7, 0]));
        this.obstacles.push(new Obstacle(1,[22, 7, 0]));

        this.obstacles.push(new Obstacle(1,[15, 14, 0]));
        this.obstacles.push(new Obstacle(1,[22, 14, 0]));

        this.obstacles.push(new Obstacle(1,[8, -7, 0]));
        this.obstacles.push(new Obstacle(1,[22, -7, 0]));

        this.obstacles.push(new Obstacle(1,[-20, 15, 0]));
        this.obstacles.push(new Obstacle(1,[-16, 5, 0]));
        this.obstacles.push(new Obstacle(1,[-10, -10, 0]));
        this.obstacles.push(new Obstacle(1,[-15, 0, 0]));

        this.obstacles.push(new Obstacle(1,[-30, -10, 0]));
        this.obstacles.push(new Obstacle(1,[-13, -30, 0]));

        this.obstacles.push(new Obstacle(1,[-40, -45, 0]));
        this.obstacles.push(new Obstacle(1,[-25, -35, 0]));

        this.obstacles.push(new Obstacle(1,[30, -40, 0]));
        this.obstacles.push(new Obstacle(1,[40, -30, 0]));
        this.obstacles.push(new Obstacle(1,[20, -25, 0]));
        this.obstacles.push(new Obstacle(1,[12, -35, 0]));

        this.obstacles.push(new Obstacle(1,[40, 40, 0]));
        this.obstacles.push(new Obstacle(1,[15, 38, 0]));
        this.obstacles.push(new Obstacle(1,[-16, 42, 0]));
        this.obstacles.push(new Obstacle(1,[-25, 35, 0]));

        this.obstacles.push(new Obstacle(1,[40, 0, 0]));

        this.obstacles.push(new Obstacle(1, [-43, 10, 0]));
    }

    resetGame() {
        let score = world.player.score + " -> Gameover, press T to start a new game!";
        scoreNode.nodeValue = score;
	    freeze = true;
        this.player = new Player();
        this.enemies = [];
        this.heals = [];
        this.crates = [];
        this.timerForEnemies = performance.now();
        this.timerForHeals = performance.now();
        this.timerForCrates = performance.now();
        this.timerForScore = performance.now();
	}
}