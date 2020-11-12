var canvas = document.getElementById("myCanvas");
var scoreLabel = document.getElementById("score");
var timeLabel = document.getElementById("time");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var background = "#7a5609";
window.onload = init;
function init() {
	if (window.Event) {
	  document.captureEvents(Event.MOUSEMOVE);
	}
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

class Orange {
  constructor() {
    this.radius = 30 + Math.random() * 20;
    this.isCut = false;
    this.xDistance = this.radius * 0.2;
    this.yDistance = this.radius * 0.2;
  }

  drawLeaves(x, y){
    var colors = ["#157810", "#2c8028", "#3a8237", "#1ab312"];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++){
        ctx.beginPath();
        ctx.fillStyle = colors[i+j];
        ctx.arc(x - this.radius * (0.5 + 0.1 * i), y-this.radius * (0.5 + 0.1 * j), this.radius * (0.05 + (i+j) * 0.03), 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  drawFull(x, y){
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2);
    var grd = ctx.createLinearGradient(x-100, y-100, x+110, y+100);
    grd.addColorStop(0, "#fa9e00");
    grd.addColorStop(1, "#ff5900");
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    this.drawLeaves(x, y);
  }

  drawCut(x, y){
    ctx.beginPath();
    ctx.arc(x, y, this.radius, Math.PI * 0.6, Math.PI * 1.6);
    var grd = ctx.createLinearGradient(x-100, y-100, x+110, y+100);
    grd.addColorStop(0, "#fa9e00");
    grd.addColorStop(1, "#ff5900");
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    this.drawLeaves(x, y);

    x += this.xDistance;
    y += this.yDistance;
    this.xDistance += 0.2
    this.yDistance += 0.5

    ctx.beginPath();
    ctx.arc(x, y, this.radius, Math.PI * 1.6, Math.PI * 2.6);
    var grd = ctx.createLinearGradient(x-100, y-100, x+110, y+100);
    grd.addColorStop(0, "#fa9e00");
    grd.addColorStop(1, "#ff5900");
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
  }

  cut(){
    this.isCut = true;
  }

  draw(x, y) {
    if (this.isCut){
      this.drawCut(x, y);
    } else {
      this.drawFull(x, y);
    }
  }

  get score(){
    return 5;
  }
}

class Banana {
  constructor() {
    this.height = 18 + Math.random() * 5;
    this.width = 75 + Math.random() * 15;
    this.isCut = false;
    this.xDistance = this.width * 0.2;
    this.yDistance = this.height * 0.2;
  }

  drawStem(x, y){
    ctx.beginPath();
    var grd = ctx.createLinearGradient(x-50, y-50, x+50, y+50);
    grd.addColorStop(0, "green");
    grd.addColorStop(1, "#e3cc1e");
    ctx.fillStyle = grd;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y + 15);
    ctx.lineTo(x - 5, y + 25);
    ctx.lineTo(x - 10, y + 5);
    ctx.fill();
    ctx.closePath();
  }

  drawDot(x, y){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawFull(x, y){
    
    x -= this.width * 1.15;
    y -= this.height * 2.3;

    ctx.beginPath();
    ctx.moveTo(this.height+x, this.height+y);
    ctx.bezierCurveTo(this.height+x, this.width+y, this.width*2+x, this.width+y, this.width*2+x, this.height+y);
    ctx.fillStyle = "#e3cc1e";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.height+x, this.height-1+y);
    ctx.bezierCurveTo(this.height+x, this.width-40+y, this.width*2+x, this.width-40+y, this.width*2+x, this.height-1+y);
    ctx.fillStyle = background;
    ctx.fill();
    ctx.closePath();
    
    this.drawStem(x + this.width * 0.3, y + this.height * 0.8);
    this.drawDot(x + this.width * 2, y + this.height * 1.2);
  }

  drawCut(x, y){
    x -= this.width*1.15;
    y -= this.height * 2.3;

    ctx.beginPath();
    ctx.moveTo(this.height+x, this.height+y);
    ctx.bezierCurveTo(this.height+x, this.width+y, this.width+x, this.width+y, this.width+x, this.height+y);
    ctx.fillStyle = "#e3cc1e";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.height+x, this.height-1+y);
    ctx.bezierCurveTo(this.height+x, this.width-40+y, this.width*2+x, this.width-40+y, this.width+x, this.height-1+y);
    ctx.fillStyle = background;
    ctx.fill();
    ctx.closePath();
    this.drawStem(x + this.width * 0.3, y + this.height * 0.8);

    x += this.xDistance;
    y += this.yDistance;
    this.xDistance += 0.2
    this.yDistance += 0.5

    ctx.beginPath();
    ctx.moveTo(this.width+x, this.height+y);
    ctx.bezierCurveTo(this.height+x, this.width+y, this.width*2+x, this.width+y, this.width*2+x, this.height+y);
    ctx.fillStyle = "#e3cc1e";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.width+x, this.height-1+y);
    ctx.bezierCurveTo(this.height+x, this.width-40+y, this.width*2+x, this.width-40+y, this.width*2+x, this.height-1+y);
    ctx.fillStyle = background;
    ctx.fill();
    ctx.closePath();
    this.drawDot(x + this.width * 2, y + this.height * 0.8);
  }

  cut(){
    this.isCut = true;
  }

  draw(x, y) {
    if (this.isCut){
      this.drawCut(x, y);
    } else {
      this.drawFull(x, y);
    }
  }

  get score(){
    return 15;
  }
}

class Apple {
  constructor() {
    this.radius = 30 + Math.random() * 20;
    this.isCut = false;
    this.xDistance = this.radius * 0.2;
    this.yDistance = this.radius * 0.2;
  }

  drawStick(x, y){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(x, y, 10, -Math.PI * 0.4, Math.PI * 0.5);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.arc(x, y+10, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawFull(x, y){

    x -= 75;
    y -= 60;

    ctx.beginPath();
    var grd = ctx.createLinearGradient(x-10, y-10, x+110, y+100);
    grd.addColorStop(0, "#319e1b");
    grd.addColorStop(1, "#50d130");
    ctx.fillStyle = grd;
    ctx.moveTo(x+75, y+25);
    ctx.bezierCurveTo(x+75, y+25, x+70, y+25, x+50, y+25);
    ctx.bezierCurveTo(x+20, y+25, x+20, y+62.5, x+20, y+62.5);
    ctx.bezierCurveTo(x+20, y+80, x+40, y+102, x+75, y+110);
    ctx.bezierCurveTo(x+110, y+102, x+130, y+80, x+130, y+62.5);
    ctx.bezierCurveTo(x+130, y+62.5, x+130, y+25, x+100, y+25);
    ctx.bezierCurveTo(x+85, y+25, x+75, y+25, x+75, y+25);
    ctx.fill();
    ctx.closePath();
    this.drawStick(x+75, y+20);
  }

  drawCut(x, y){

    x -= 75;
    y -= 60;

    ctx.beginPath();
    var grd = ctx.createLinearGradient(x-10, y-10, x+110, y+100);
    grd.addColorStop(0, "#319e1b");
    grd.addColorStop(1, "#50d130");
    ctx.fillStyle = grd;
    ctx.moveTo(x+75, y+25);
    ctx.bezierCurveTo(x+75, y+25, x+70, y+25, x+50, y+25);
    ctx.bezierCurveTo(x+20, y+25, x+20, y+62.5, x+20, y+62.5);
    ctx.bezierCurveTo(x+20, y+80, x+40, y+102, x+75, y+110);
    ctx.fill();
    ctx.closePath();

    x += this.xDistance;
    y += this.yDistance;
    this.xDistance += 0.2
    this.yDistance += 0.5

    ctx.beginPath();
    var grd = ctx.createLinearGradient(x-10, y-10, x+110, y+100);
    grd.addColorStop(0, "#319e1b");
    grd.addColorStop(1, "#50d130");
    ctx.fillStyle = grd;
    ctx.moveTo(x+75, y+110);
    ctx.bezierCurveTo(x+110, y+102, x+130, y+80, x+130, y+62.5);
    ctx.bezierCurveTo(x+130, y+62.5, x+130, y+25, x+100, y+25);
    ctx.bezierCurveTo(x+85, y+25, x+75, y+25, x+75, y+25);
    ctx.fill();
    ctx.closePath();
    this.drawStick(x+75, y+20);
  }

  cut(){
    this.isCut = true;
  }

  draw(x, y) {
    if (this.isCut){
      this.drawCut(x, y);
    } else {
      this.drawFull(x, y);
    }
  }

  get score(){
    return 5;
  }
}


class FruitThrow{
  constructor(){
    this.velocityY = -(12 + (Math.random() - 0.5) * 2);
    this.velocityX = 0;
    this.x = 80 + Math.random() * (canvas.width-160);
    this.startY = canvas.height+100
    this.y = this.startY;
    this.accelY = 0.135;
    this.accelX = (-0.5 + Math.random()) * 0.01;
  }

  getCoords(){
    this.velocityX += this.accelX;
    this.velocityY += this.accelY;

    this.x += this.velocityX;
    this.y += this.velocityY;

    return {
      x: this.x,
      y: this.y,
    };
  }

  get isFell(){
    return this.y > this.startY;
  }
}

class FruitObject{
  constructor(fruit){
    this.fruitThrow = new FruitThrow();
    this.fruit = fruit;
    this.hitRadius = 40;
    this.x = 0;
    this.y = 0;
  }

  cut(){
    this.fruit.cut();
  }

  get isCut(){
    return this.fruit.isCut;
  }

  get isFell(){
    return this.fruitThrow.isFell;
  }

  get score(){
    return this.fruit.score;
  }

  tryCut(cx, cy) {
    var distancesquared = (this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy);
    if (distancesquared <= this.hitRadius * this.hitRadius && !this.isCut){
      return true;
    }
    return false;
  }

  update(){
    if(!this.isFell){
      var coords = this.fruitThrow.getCoords();
      this.x = coords.x;
      this.y = coords.y;
      this.fruit.draw(this.x, this.y);
    }
  }
}

class Blade{
  constructor(stateHandler, positionHandler){
    var self = this;
    document.addEventListener("mousedown", (e) => self.onMouseDown(e), false);
    document.addEventListener("mouseup", (e) => self.onMouseUp(e), false);
    canvas.addEventListener("mousemove", (e) => self.onMouseMove(e), false);
    this.stateHandler = stateHandler;
    this.positionHandler = positionHandler;
    this.trackPoints = [];
  }

  onMouseDown(e){
    this.bladePressed = true;
    this.onMouseMove(e);
    this.stateHandler(true);
  }

  onMouseUp(e){
    this.bladePressed = false;
    this.stateHandler(false);
  }

  addPoint(x, y){
    var point = {x: x, y: y};
    this.trackPoints.push(point);
    setTimeout(() => {
      this.trackPoints = this.trackPoints.filter(p => p != point);
    }, 250);
  }

  onMouseMove(e){
    if (this.bladePressed){
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      this.addPoint(x, y);
    }
  }

  interpolatePosition(p1, p2, segment){
    var density = 50;
    var dx = (p2.x - p1.x) / density;
    var dy = (p2.y - p1.y) / density;
    var p = p1;
    var increaser = 0.3;
    var width = 1 + segment * increaser;
    for (var i = 0; i < density; ++i){
      var newP = {x: p.x + dx, y: p.y + dy};
      ctx.beginPath();
      ctx.lineWidth = width + (increaser / i);
      ctx.strokeStyle = "#ff3c00";
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(newP.x, newP.y);
      ctx.stroke();
      ctx.closePath();
      this.positionHandler(p.x, p.y);
      p = newP;
    }
    this.positionHandler(p.x, p.y);
  }

  update(){
    for (var i = 1; i < this.trackPoints.length; i++){
      var p1 = this.trackPoints[i-1];
      var p2 = this.trackPoints[i];
      this.interpolatePosition(p1, p2, i);
    }
  }
}

class FruitWave{
  constructor(){
    var count = randomInteger(3, 10);
    this.fruits = [];
    this.activeFruits = [];
    for (var i = 0; i < count-1; ++i){
      var number = randomInteger(0, 1);
      this.fruits.push(number == 0 ? new Apple() : new Orange());
    }
    this.fruits.push(new Banana());
    this.isSync = randomInteger(1, 4) == 1;
    if (this.isSync){
      this.activeFruits = this.fruits.map(fruit => new FruitObject(fruit));
    } else {
      for (var i = 0; i < this.fruits.length; i++){
        var fruit = this.fruits[i];
        setTimeout((fruit) => {
          this.activeFruits.push(new FruitObject(fruit));
        }, randomInteger(500, 5000), fruit);
      }
    }
  }

  get isDone(){
    return this.activeFruits.length == this.fruits.length && this.activeFruits.every(fruit => fruit.isFell);
  }

  update(){
    var bananas = this.activeFruits.filter(fruitObject => fruitObject.fruit instanceof Banana);
    var others = this.activeFruits.filter(fruitObject => !(fruitObject.fruit instanceof Banana));
    bananas.forEach(fruit => fruit.update());
    others.forEach(fruit => fruit.update());
  }
}

class Game{
  constructor(duration){
    var self = this;
    this.cutCombo = 0;
    this.score = 0;
    this.duration = duration;
    this.showComboLabel = false;
    this.labelCombo = 0;
    this.ellapsedTime = 0;
    this.lastFruitTime = 0;
    this.bladeState = false;
    this.isGameShouldEnd = false;
    this.blade = new Blade((state) => {
      if (!state){
        this.cutCombo = 0;
      }
    }, (x, y) => self.setBladePosition(x, y));
    this.fruitWave = new FruitWave();

    this.intervalId = setInterval(() =>{
      this.ellapsedTime += 1;
      if (this.ellapsedTime >= this.duration){
        this.isGameShouldEnd = true;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  get isDone(){
    return this.isGameShouldEnd && this.fruitWave.isDone;
  }

  drawLabels(){
    ctx.beginPath();
    ctx.font = "27px Arial";
    ctx.fillStyle = "#fa9e00";
    ctx.fillText("Score: " + this.score, 10, 50);
    ctx.fillText("Time: " + (this.duration - this.ellapsedTime), canvas.width - 115, 50);
    if (this.cutCombo > 1){
      this.showComboLabel = true;
      if (this.comboTimeoutId != null){
        clearTimeout(this.comboTimeoutId);
      }
      setTimeout(() => {
        this.showComboLabel = false;
        this.labelCombo = 0;
      }, 4000);
    }
    if (this.showComboLabel){
      if(this.labelCombo < this.cutCombo){
        this.labelCombo = this.cutCombo;
      }
      ctx.fillText("COMBO: x" + this.labelCombo + "!!!", canvas.width/2 - 80, 50);
    }
    ctx.closePath();
  }

  update(){
    this.drawLabels();
    this.fruitWave.update();
    if (this.fruitWave.isDone && !this.isGameShouldEnd){
      this.fruitWave = new FruitWave();
    }
    this.blade.update();
  }

  checkCombo(){
    var time = new Date().getTime();
    if (time - this.lastFruitTime <= 1000){
      this.cutCombo += 1;
    } else{
      this.cutCombo = 1;
    }
    this.lastFruitTime = time;
  }

  countScore(addScore){
    this.score += addScore * this.cutCombo;
    scoreLabel.innerText = this.score;
  }

  setBladePosition(x, y){
    this.fruitWave.activeFruits.forEach(fruit => {
      if (fruit.tryCut(x, y) && !fruit.isCut){
        fruit.cut();
        this.checkCombo();
        this.countScore(fruit.score);
      }
    });
  }
}

function drawBack(){
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = background;
  ctx.fill();
  ctx.closePath();
}

var game = null;

function draw() {
  drawBack();
  if (game != null && !game.isDone){
    game.update();
  } else {
    ctx.beginPath();
    ctx.font = "27px Arial";
    ctx.fillStyle = "#fa9e00";
    if (game != null){
      ctx.fillText("Score: " + game.score, canvas.width/2 - 80, 260);
    }
    ctx.fillText("Press Space", canvas.width/2 - 80, 320);
    ctx.closePath(); 
  }
}

setInterval(draw, 10);

document.body.onkeyup = function(e){
  if(e.keyCode == 32 && (game == null || game.isDone)){
    game = new Game(60);
  }
}