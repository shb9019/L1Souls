var walls = [];

function loadWalls(){
	walls.push({
		x:80,y:0,w:100,h:10
	});
	walls.push({
		x:80,y:10,w:10,h:160
	});
	walls.push({
		x:0,y:160,w:80,h:10
	});
	walls.push({
		x:-10,y:160,w:10,h:110
	});
	walls.push({
		x:0,y:260,w:90,h:10
	});
	walls.push({
		x:80,y:270,w:10,h:160
	});
	walls.push({
		x:90,y:420,w:160,h:10
	});
	walls.push({
		x:240,y:430,w:10,h:30
	});
	walls.push({
		x:-10,y:460,w:260,h:10
	});
	walls.push({
		x:-10,y:470,w:10,h:130
	});
	walls.push({
		x:0,y:590,w:50,h:10
	});
	walls.push({
		x:40,y:550,w:10,h:40
	});
	walls.push({
		x:50,y:550,w:1040,h:10
	});
	walls.push({
		x:1080,y:-40,w:10,h:590
	});
	walls.push({
		x:170,y:10,w:10,h:160
	});
	walls.push({
		x:180,y:160,h:10,w:80
	});
	walls.push({
		x:250,y:0,w:10,h:160
	});
	walls.push({
		x:260,y:0,w:320,h:10
	});
	walls.push({
		x:570,y:10,w:10,h:250
	});
	walls.push({
		x:170,y:260,w:410,h:10
	});
	walls.push({
		x:170,y:270,w:10,h:70
	});
	walls.push({
		x:170,y:330,w:570,h:10
	});
	walls.push({
		x:730,y:260,w:10,h:70
	});
	walls.push({
		x:650,y:260,w:80,h:10
	});
	walls.push({
		x:650,y:10,w:10,h:250
	});
	walls.push({
		x:650,y:0,w:390,h:10
	});
	walls.push({
		x:1030,y:-40,w:50,h:10
	});
	walls.push({
		x:1030,y:-30,w:10,h:30
	});
	walls.push({
		x:330,y:420,w:10,h:140
	});
	walls.push({
		x:740,y:430,w:10,h:120
	});
	walls.push({
		x:260,y:160,w:140,h:10
    });
	walls.push({
		x:440,y:160,w:140,h:10
	});
	walls.push({
		x:340,y:420,w:170,h:10
	});
	walls.push({
		x:600,y:420,w:150,h:10
	});
}

function renderWalls(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i=0;i<walls.length;i++){
		ctx.beginPath();
		ctx.rect(walls[i].x,walls[i].y,walls[i].w,walls[i].h);
		ctx.fillStyle = "#FFF";
		ctx.fill();
		ctx.closePath();
	}
}

function initializeWallPos(){
	for(var i=0;i<walls.length;i++){
		walls[i].x+=236;
		walls[i].y-=398;
	}
		px+=236;		
		py-=398;

}

function updateWalls(){
	checkWallCollisions();
	for(var i=0;i<walls.length;i++){
	if(input.isDown('UP')){
		walls[i].y++;
		
	}
	else if(input.isDown('DOWN')){
		walls[i].y--;

	}
	else if(input.isDown('LEFT')){
		walls[i].x++;

	}
	else if(input.isDown('RIGHT')){
		walls[i].x--;
	}
	}
	
}

function checkWallCollisions(){
	checkPlayerColl();
}

function checkPlayerColl(){
	for(var i=0;i<walls.length;i++){
		checkColl(player[active],walls[i]);
	}
}

function checkColl(play,wall){
	if(play.x<wall.x){
		if(play.y>wall.y&&Math.abs(play.y-wall.y)<wall.h&&(wall.x-play.x)<play.r){//LEFT
			moveEverything(1,0);
		}
	}
	else{
		if(play.y<wall.y){
			if(play.x>wall.x&&(play.x-wall.x)<wall.w&&(wall.y-play.y)<play.r){//TOP
				moveEverything(0,1);
			}
		}
		else{
			if((play.x-wall.x)<(wall.w+play.r)&&(play.y-wall.y)<=wall.h&&(play.y>wall.y)){//RIGHT
				moveEverything(-1,0);
			}
			else if((play.x>wall.x)&&(play.x-wall.x)<wall.w&&(play.y-wall.y)<(wall.h+play.r)){//BOTTOM
				moveEverything(0,-1);
			}
		}
	}
}

function moveEverything(dx,dy){
	for(var i=0;i<walls.length;i++){
		walls[i].x+=dx;
		walls[i].y+=dy;
	}
	for(var j=0;j<enemies.length;j++){
		enemies[j].x+=dx;
		enemies[j].y+=dy;
	}
	for(var k=0;k<bulletsEn.length;k++){
		bulletsEn[k].x+=dx;
		bulletsEn[k].y+=dy;
	}
	for(var k=0;k<bulletsPl.length;k++){
		bulletsPl[k].x+=dx;
		bulletsPl[k].y+=dy;
	}
	for(var l=0;l<tiles.length;l++){
		tiles[l].x+=dx;
		tiles[l].y+=dy;
	}
	player[inactive].x+=dx;
	player[inactive].y+=dy;
	px+=dx;
	py+=dy;
}
