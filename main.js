var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 342;
document.body.appendChild(canvas);

var px = 0;
var py = 0;
var xo;
initialize();

function initialize(){
	loadWalls();
	loadPlayer();
	loadEnemies();
	loadTiles();
	initializePos();
	loadIntro();
}

function main(){
	render();
	update();
	if(isGameWon()){
		clearInterval(xo);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font = "30px Arial";
		ctx.fillStyle = "Red";
		ctx.fillText("YOU WON",10,50);

	}
	if(isGameOver()){
		clearInterval(xo);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font = "30px Arial";
		ctx.fillStyle = "Red";
		ctx.fillText("GAME OVER",10,50);
	}
}

function render(){
	renderWalls();
	renderTiles();
	renderPlayer();
	renderBullets();
	renderEnemies();
}

function update(){
	updateWalls();
	updatePlayer();
	updateEnemies();
	updateBullets();
}

function initializePos(){
	initializeWallPos();
	initializeEnemyPos();
	initializePlayerPos();
	initialiseTilePos();
}

function game(){
xo = setInterval(main,12);
}

function loadIntro(){
	ctx.font = "50px Arial";
	ctx.fillStyle = "Blue";
	ctx.fillText("SOULS",160,170);
	var P1 = setTimeout(Page1,3000);
	var P2 = setTimeout(Page2,10000);
	var P3 = setTimeout(Page3,20000);
	var P4 = setTimeout(game,26000);
}

function Page1(){
	ctx.clearRect(0,0,canvas.width,canvas.height/2);
	ctx.font = "20px Arial";
	ctx.fillStyle = "Red";
	ctx.fillText("UP Arrow - Move Up",10,30);
	ctx.fillText("DOWN Arrow - Move Down",10,60);
	ctx.fillText("LEFT Arrow - Move Left",10,90);
	ctx.fillText("RIGHT Arrow - Move Right",10,120);
	ctx.fillText("SPACE BAR - Shoot",10,150);
	ctx.fillText("C - Place C4",10,180);
	ctx.fillText("S - Change Souls",10,210);
}

function Page2(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.font = "30px Arial";
	ctx.FillStyle = "Green";
	ctx.fillText("Objectives: ",10,30);
	ctx.font = "20px Arial";
	ctx.fillStyle = "Blue";
	ctx.fillText("Change soul with General (Green Circle)",40,70)
	ctx.fillText("Kill all Red.",40,100);
	ctx.fillText("Place C4s at all Greens",40,130);
	ctx.fillText("Escape through Upper Pink",40,160);
}

function Page3(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.font = "50px Arial";
	ctx.fillStyle = "Blue";
	ctx.fillText("TIP",200,100);
	ctx.font = "20px Arial";
	ctx.fillStyle = "Red";
	ctx.fillText("Once a gaurd sees you shooting he'll shoot ",50,150);
	ctx.fillText("the next time he sees you",100,180);
}
