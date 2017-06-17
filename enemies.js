var enemies = [];
var tiles = [];

function loadEnemies(){
	enemies.push({
		x:130,y:30,vx:0,vy:1,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:190,y:190,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:550,y:240,vx:-1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:555,y:380,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:50,y:490,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
    	x:230,y:530,vx:-1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:825,y:530,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:910,y:530,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:995,y:530,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:690,y:60,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:690,y:110,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:690,y:160,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:690,y:210,vx:1,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:400,y:470,vx:0,vy:0,prox:0,al:1,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:460,y:470,vx:0,vy:0,prox:0,al:1,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:640,y:470,vx:0,vy:0,prox:0,al:1,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:690,y:470,vx:0,vy:0,prox:0,al:1,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:540,y:60,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:540,y:110,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	});
	enemies.push({
		x:380,y:120,vx:0,vy:0,prox:0,al:0,dam:0,limit:2,lastFire:0
	})
}

function renderEnemies(){
	for(var i=0;i<enemies.length;i++){
		ctx.beginPath();
		ctx.arc(enemies[i].x,enemies[i].y,10,0,2*Math.PI,false);
		ctx.fillStyle = "Red";
		ctx.fill();
		ctx.closePath();
	}
}

function updateEnemiesPos(){
	checkEnem();
	for(var i=0;i<enemies.length;i++){
		enemies[i].x+=enemies[i].vx;
		enemies[i].y+=enemies[i].vy;
	}
}

function checkCollEnem(play,wall){
	if(play.x<wall.x){
		if(play.y>wall.y&&Math.abs(play.y-wall.y)<wall.h&&(wall.x-play.x)<10){
		
			return 'LEFT';
		}
	}
	else{
		if(play.y<wall.y){
			if(play.x>wall.x&&(play.x-wall.x)<wall.w&&(wall.y-play.y)<10){//TOP
			
				return 'TOP'
			}
		}
		else{
			if((play.x-wall.x)<(wall.w+10)&&(play.y-wall.y)<=wall.h&&(play.y>wall.y)){//RIGHT
				return 'RIGHT';
			}
			else if((play.x>wall.x)&&(play.x-wall.x)<wall.w&&(play.y-wall.y)<(wall.h+10)){//BOTTOM
				return 'BOTTOM';
			}
		}
	}
	return 'NULL'
}

function checkEnem(){
	for(var i=0;i<enemies.length;i++){
		for(j=0;j<walls.length;j++){
			var str = checkCollEnem(enemies[i],walls[j]);
			if(str=='LEFT'||str=='RIGHT')
				enemies[i].vx = -enemies[i].vx;
			else if(str=='TOP'||str=='BOTTOM')
				enemies[i].vy = -enemies[i].vy;
		}
	}
}


function updateEnemies(){
	updateEnemiesPos();
	proxCheck();
	updateAl();
	bulletHitEnemy();
	enemyShoot();
	for(var i=0;i<enemies.length;i++){
	if(input.isDown('UP')){
		enemies[i].y++;
		
	}
	else if(input.isDown('DOWN')){
		enemies[i].y--;
		
	}
	else if(input.isDown('LEFT')){
		enemies[i].x++;
		
	}
	else if(input.isDown('RIGHT')){
		enemies[i].x--;
		
	}
	}
	if(input.isDown('UP')){
		player[inactive].y++;
		
	}
	else if(input.isDown('DOWN')){
		player[inactive].y--;
		
	}
	else if(input.isDown('LEFT')){
		player[inactive].x++;
		
	}
	else if(input.isDown('RIGHT')){
		player[inactive].x--;
		
	}

}

function initializeEnemyPos(){
	for(var q=0;q<enemies.length;q++){
		enemies[q].x+=236;
		enemies[q].y-=398;
	}
}

function enemyShoot(){
	for(var i=0;i<enemies.length;i++){
		if((player[active].x-8)<=(enemies[i].x)&&(player[active].x+8)>=(enemies[i].x)&&enemies[i].al==1&&(Date.now()-enemies[i].lastFire>500)){
			if(player[active].y>enemies[i].y){
				bulletsEn.push({
					x:enemies[i].x,y:enemies[i].y,vx:0,vy:10,r:2
				});
			}
			else{
				bulletsEn.push({
					x:enemies[i].x,y:enemies[i].y,vx:0,vy:-10,r:2
				})
			}
			enemies[i].lastFire = Date.now();
		}
		if((player[active].y-8)<=enemies[i].y&&(player[active].y+8)>=(enemies[i].y)&&enemies[i].al==1&&(Date.now()-enemies[i].lastFire>500)){
			if(player[active].x>enemies[i].x){
				bulletsEn.push({
					x:enemies[i].x,y:enemies[i].y,vx:10,vy:0,r:2
				});
			}
			else{
				bulletsEn.push({
					x:enemies[i].x,y:enemies[i].y,vx:-10,vy:0,r:2
				});
			}
			enemies[i].lastFire = Date.now();
		}
	}
}

function proxCheck(){
	for(var i=0;i<enemies.length;i++){
		if(Math.abs(player[active].x-enemies[i].x)<=160&&Math.abs(player[active].y-enemies[i].y)<=160)
			enemies[i].prox = 1;
		else
			enemies[i].prox = 0;
	}	
}
function updateAl(){
	for(var i=0;i<enemies.length;i++){
		if(enemies[i].prox==1&&input.isDown('SPACE')){
			enemies[i].al = 1;
		}
	}
}

function bulletHitEnemy(){
	for(var j=0;j<enemies.length;j++){
	for(var i=0;i<bulletsPl.length;i++){
		if((bulletsPl[i].x>=(enemies[j].x-10))&&(bulletsPl[i].x<=(enemies[j].x+10))&&(bulletsPl[i].y<=(enemies[j].y+10))&&(bulletsPl[i].y>=(enemies[j].y-10))){
			console.log("BOOM");
			bulletsPl.splice(i,1);
			i--;
			enemies[j].dam++;
		}
	  	}
	}
	deadEnemy();

}

function deadEnemy(){
	for(var b=0;b<enemies.length;b++){
		if(enemies[b].dam>=enemies[b].limit){
			enemies.splice(b,1);
			b--;
		}
	}
}

function loadTiles(){
	tiles.push({
		x:0,y:550,w:40,h:40,type:0//Enterance Tile
	});
	tiles.push({
		x:535,y:510,w:40,h:40,type:1,occ:0//C4 Tile
	});
	tiles.push({
		x:400,y:10,w:40,h:40,type:1,occ:0//C4 Tile
	});
	tiles.push({
		x:1040 ,y:-30,w:40,h:40,type:0//Exit Tile
	});
}

function initialiseTilePos(){
	for(var i=0;i<tiles.length;i++){
		tiles[i].x+=236;
		tiles[i].y-=398;
	}
}

function renderTiles(){
	updateTilePos();
	for(var i=0;i<tiles.length;i++){
		ctx.beginPath();
		ctx.rect(tiles[i].x,tiles[i].y,tiles[i].w,tiles[i].h);
		if(tiles[i].type==0)
			ctx.fillStyle = "Pink";
		if(tiles[i].type==1){
			if(tiles[i].occ==0)
				ctx.fillStyle = "Green";
			else
				ctx.fillStyle = "Red";
		}
		ctx.fill();
		ctx.closePath();

	}
}


function updateTilePos(){
	for(var i=0;i<tiles.length;i++){
	if(input.isDown('UP')){
		tiles[i].y++;
		
	}
	else if(input.isDown('DOWN')){
		tiles[i].y--;
		
	}
	else if(input.isDown('LEFT')){
		tiles[i].x++;
		
	}
	else if(input.isDown('RIGHT')){
		tiles[i].x--;
		
	}
	}
}