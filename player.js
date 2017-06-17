var player = [];
var lk = 'UP';

function loadPlayer(){
player.push({
	x:canvas.width/2,y:canvas.height/2,r:10,type:0,dam:0,limit:10,lastFire:0,lk:'UP',color:"blue",fire: 500
});
player.push({
	x:300,y:40,r:15,type:1,dam:0,limit:20,lastFire:0,lk:'UP',color:"green",fire:0
});
}
var active = 0;
var inactive = 1;
var lastSoulChange = 0;

function renderPlayer(){
	ctx.beginPath();
	ctx.arc(player[active].x,player[active].y,player[active].r,0,2*Math.PI,false);
	ctx.fillStyle = player[active].color;
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(player[inactive].x,player[inactive].y,player[inactive].r,0,2*Math.PI,false);
	ctx.fillStyle = player[inactive].color;
	ctx.fill();
	ctx.closePath();
}

function updatePlayer(){
	if(input.isDown('LEFT')){
		player[active].lk = 'LEFT';
	}
	else if(input.isDown('RIGHT')){
		player[active].lk = 'RIGHT';

	}
	else if(input.isDown('UP')){
		player[active].lk = 'UP';
	}
	else if(input.isDown('DOWN')){
		player[active].lk = 'DOWN';
	}	
	else if(input.isDown('s')){
		soulChange();
	}
	else if(input.isDown('c')){
		placeC4();
	}
	if(input.isDown('SPACE')){
		shoot(player[active]);
	}
	
}

function isGameOver(){
	if(player[active].dam==player[active].limit)
		return true;
}
function isGameWon(){
	if(tiles[3].x>=216&&tiles[3].x<=256&&tiles[3].y<=172&&tiles[3].y>=132&&tiles[2].occ==1&&tiles[1].occ==1&&enemies.length==0){
		return true;
	}
}

function bulletHitPlay(){
	for(var i=0;i<bulletsEn.length;i++){
		if((bulletsEn[i].x>=(canvas.width-16)/2)&&(bulletsEn[i].x<=(canvas.width+16)/2)&&(bulletsEn[i].y<=(canvas.height+16)/2)&&(bulletsEn[i].y>=(canvas.height-16)/2)){
			bulletsEn.splice(i,1);
			i--;
			player[active].dam++;
			console.log(player[active].dam);
		}
	}
}

function initializePlayerPos(){
	player[inactive].x+=236;
	player[inactive].y-=398;
}

function soulChange(){
	if(Math.abs(player[inactive].x-player[active].x)<80&&Math.abs(player[inactive].y-player[active].y)<80&&(Date.now()-lastSoulChange)>750){
	var temp = inactive;
	inactive = active;
	active = temp;

	moveEverythingEx(player[inactive].x-player[active].x,player[inactive].y-player[active].y);
	lastSoulChange = Date.now();
	}
}

function moveEverythingEx(dx,dy){
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
	player[active].x = canvas.width/2;
	player[active].y = canvas.height/2;
	px+=dx;
	py+=dy;
	
}

function placeC4(){
	for(var i=0;i<tiles.length;i++){
		if(tiles[i].x>=216&&tiles[i].x<=256&&tiles[i].y>=136&&tiles[i].y<=176&&tiles[i].occ==0){
			tiles[i].occ = 1;
		}
	}
}
