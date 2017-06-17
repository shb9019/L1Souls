var bulletsPl = [];
var bulletsEn = [];
function shoot(l){
	if(Date.now()-l.lastFire>player[active].fire){
	if(l.lk=='LEFT')
		bulletsPl.push({
			x:l.x,y:l.y,vx:-10,vy:0,r:2
		});
	else if(l.lk=='RIGHT')
		bulletsPl.push({
			x:l.x,y:l.y,vx:10,vy:0,r:2
		});
	else if(l.lk=='UP')
		bulletsPl.push({
			x:l.x,y:l.y,vx:0,vy:-10,r:2
		});	
	else if(l.lk=='DOWN')
		bulletsPl.push({
			x:l.x,y:l.y,vx:0,vy:10,r:2
		});	
	l.lastFire = Date.now();
	}
}

function renderBullets(){
	for(var i=0;i<bulletsEn.length;i++){
		ctx.beginPath();
		ctx.arc(bulletsEn[i].x,bulletsEn[i].y,bulletsEn[i].r,0,2*Math.PI,false);
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.closePath();
	}
	for(var i=0;i<bulletsPl.length;i++){
		ctx.beginPath();
		ctx.arc(bulletsPl[i].x,bulletsPl[i].y,bulletsPl[i].r,0,2*Math.PI,false);
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.closePath();
	}
}

function updateBullets(){
	bulletHitPlay();
	removeBullets();
	for(var i=0;i<bulletsEn.length;i++){
		bulletsEn[i].x+=bulletsEn[i].vx;
		bulletsEn[i].y+=bulletsEn[i].vy;
	}
	for(var i=0;i<bulletsPl.length;i++){
		bulletsPl[i].x+=bulletsPl[i].vx;
		bulletsPl[i].y+=bulletsPl[i].vy;
	}
}

function removeBullets(){
	for(var i=0;i<bulletsEn.length;i++){
		var boo = false;
		for(var j=0;j<walls.length;j++){
			if(bulletsEn[i].x<=(walls[j].x+10)&&bulletsEn[i].x>=(walls[j].x)&&bulletsEn[i].y>=walls[j].y&&(bulletsEn[i].y<=(walls[j].y+walls[j].h))){
				boo = true;
			}
			else if(bulletsEn[i].y<=(walls[j].y+10)&&bulletsEn[i].y>=(walls[j].y)&&bulletsEn[i].x>=walls[j].x&&(bulletsEn[i].x<=(walls[j].x+walls[j].w))){
				boo = true;
			}
		}
		if(boo){
			bulletsEn.splice(i,1);
			i--;
		}
	}
	for(var i=0;i<bulletsPl.length;i++){
		var boo = false;
		for(var j=0;j<walls.length;j++){
			if(bulletsPl[i].x<=(walls[j].x+10)&&bulletsPl[i].x>=(walls[j].x)&&bulletsPl[i].y>=walls[j].y&&(bulletsPl[i].y<=(walls[j].y+walls[j].h))){
				boo = true;
			}
			else if(bulletsPl[i].y<=(walls[j].y+10)&&bulletsPl[i].y>=(walls[j].y)&&bulletsPl[i].x>=walls[j].x&&(bulletsPl[i].x<=(walls[j].x+walls[j].w))){
				boo = true;
			}
		}
		if(boo){
			bulletsPl.splice(i,1);
			i--;
		}
	}
}

