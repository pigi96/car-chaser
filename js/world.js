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
        this.enemies.push(new Enemy([-5, 5, 0]));

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

        //this.enemies.forEach(o => o.attackPlayer(this.player));

        this.player.outOfBounds();

        if (performance.now() - this.timer >= 3000) {
            this.timer = performance.now();

            //this.spawnNewEnemy();
        }
    }

    spawnNewEnemy() {
	    let x_range = Math.floor(Math.random() * 2);
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
	    let y_ran = Math.floor(Math.random() * 20) - 10 + y;



        this.enemies.push(new Enemy([x_ran, y_ran, 0]));
    }
    
    HandleHealCollisions(){
        //console.log("Handling heal collisions");
         for(let i=0;i< world.heals.length;i++){
            if(world.heals[i].collision(world.heals[i],world.player)){
                if(world.player.hp < 100){
                    console.log("lets regen!");
                    world.player.hp = Math.min(world.player.hp+20,100);
                    world.heals.splice(i,Math.min(i+1,world.heals.length));
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
                    world.crates.splice(i,Math.min(i+1,world.crates.length));
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
                        world.enemies.splice(i,Math.min(i+1,world.enemies.length));
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

        //this.obstacles[0] = new Obstacle(1,[5, 0, 0]);
        //this.obstacles[1] = new Obstacle(1,[-5, 0, 0]);
        //this.obstacles.push(new Obstacle(2, [10, 0, 0]));
    }
}