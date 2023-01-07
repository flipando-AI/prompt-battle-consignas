let idxActual = 0;
let imgRightBtn;
let tiempoInicial = 90;
let counter = tiempoInicial;
let nuestroFont;

let rightbtnX;
let leftbtnX;

function preload(){
  imgRightBtn = loadImage("right.png");
  nuestroFont = loadFont("Manrope-VariableFont_wght.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

function draw() {
  textFont(nuestroFont);
  background(0);
  fill(255);
  textSize(64);
  textWrap(WORD);
  rectMode(CENTER);
  textAlign(CENTER);
  let textActual = listaTextos[idxActual%listaTextos.length];
  let textoY = height/2;
  text(textActual, width/2, textoY, width*0.75);
  
  imageMode(CENTER);
  
  let mins = Math.floor(counter/60);
  let secs = counter - mins*60
  if(secs < 10){
    secs = "0" + secs;
  }
  let txtTimer = mins + ":" + secs;
  text(txtTimer, width/2, height * 0.1);
  
  if(counter <= 0){
    background(0, 0, 0);
    text("TIME OUT!", width/2, height/2 + 20);
  }
  
  
  let btnsPct = map(windowWidth, 0, 2000, 0.15, 0.02);
  rightbtnX = width*(1-btnsPct)
  leftbtnX = width*(btnsPct)


  tint(255, 255, 255, rightOpacity());
  image(imgRightBtn, rightbtnX, height/2, 100, 100);
  
  push();
  tint(255, 255, 255, leftOpacity());
  translate(leftbtnX, height/2);
  scale(-1, 1);
  image(imgRightBtn, 0, 0, 100, 100);
  pop();
  
  if(frameCount % 60 == 0){
    counter--;
  }
}


function leftOpacity(){
  if(mouseIsInLeftBtn()){
    return 255;
  } else{
    return 80;
  }
}

function rightOpacity(){
  if(mouseIsInRightBtn()){
    return 255;
  } else{
    return 80;
  }
}

function mouseIsInRightBtn(){
  return (dist(mouseX, mouseY, rightbtnX, height/2) < 50);
}

function mouseIsInLeftBtn(){
  return (dist(mouseX, mouseY, leftbtnX, height/2) < 50);
}

function mousePressed(){
  if(mouseIsInRightBtn()){
    nextIdx();
  }
  
  if(mouseIsInLeftBtn()){
    prevIdx();
  }
}

function nextIdx(){
  counter = tiempoInicial;

  idxActual ++;
}


function prevIdx(){
  counter = tiempoInicial;

  idxActual--;
  if(idxActual < 0){
    idxActual = listaTextos.length-1;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    idxActual --;
  } else if (keyCode === RIGHT_ARROW) {
    nextIdx();
  }
}