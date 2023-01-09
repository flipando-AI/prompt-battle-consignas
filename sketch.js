let idxActual = 0;
let imgRightBtn;
let playBtn;
let resetBtn;
let pauseBtn;
let tiempoInicial = 59;
let counter = tiempoInicial;
let nuestroFont;

let rightbtnX;
let leftbtnX;
let rightbtnY;
let leftbtnY;

let playing = false;

function preload(){
  imgRightBtn = loadImage("right.png");
  nuestroFont = loadFont("Manrope-VariableFont_wght.ttf");
  playBtn = loadImage("play.png");
  pauseBtn = loadImage("pause.png");
  resetBtn = loadImage("reset.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);  


}

function draw() {
  textFont(nuestroFont);
  background(0);
  fill(255);
  textWrap(WORD);
  rectMode(CENTER);
  textAlign(CENTER);
  let textActual = listaTextos[idxActual%listaTextos.length];
  let textoY = height/2.6;
  text(textActual, width/2, textoY, width);
  
  imageMode(CENTER);
  
  let mins = Math.floor(counter/60);
  let secs = counter - mins*60
  if(secs < 10){
    secs = "0" + secs;
  }
  let txtTimer = mins + ":" + secs;
  
  textSize(160);
  textStyle(BOLD);


  if(counter <= 0){
    text("TIME OUT!", width/2, height * 0.2);
    playing = false;
  } else{
    text(txtTimer, width/2, height * 0.2);
  }

  textSize(120);
  textStyle(NORMAL);


  
  rightbtnX = width*0.8
  leftbtnX = width*0.2
  rightbtnY = height * 0.9
  leftbtnY = height * 0.9


  tint(255, 255, 255, rightOpacity());
  image(imgRightBtn, rightbtnX, height*0.9, 100, 100);

  tint(255, 255, 255, playOpacity());
  if(playing){
    image(pauseBtn, width*0.4, height*0.9, 100, 100)
  } else{
    image(playBtn, width*0.4, height*0.9, 100, 100)
  }

  tint(255, 255, 255, resetOpacity());
  image(resetBtn, width*0.6, height*0.9, 100, 100)


  
  push();
  tint(255, 255, 255, leftOpacity());
  translate(leftbtnX, height*0.9);
  scale(-1, 1);
  image(imgRightBtn, 0, 0, 100, 100);
  pop();
  
  if(frameCount % 30 == 0 && playing){
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

function playOpacity(){
  if(mouseIsInPlayBtn()){
    return 255;
  } else{
    return 80;
  }
}

function resetOpacity(){
  if(mouseIsInResetBtn()){
    return 255;
  } else{
    return 80;
  }
}

function mouseIsInRightBtn(){
  return (dist(mouseX, mouseY, rightbtnX, rightbtnY) < 50);
}

function mouseIsInLeftBtn(){
  return (dist(mouseX, mouseY, leftbtnX, leftbtnY) < 50);
}

function mouseIsInPlayBtn(){
  if(mouseX > width*0.4 - 50 && mouseX < width*0.4 + 50 && mouseY > height*0.9 - 50 && mouseY < height*0.9 + 50){
    return true;
  } else{
    return false;
  }
}

function mouseIsInResetBtn(){
  return (dist(mouseX, mouseY, width*0.6, height*0.9) < 50);
}

function mousePressed(){
  if(mouseIsInRightBtn()){
    nextIdx();
  } else if(mouseIsInLeftBtn()){
    prevIdx();
  } else if(mouseIsInPlayBtn()){
    playing = !playing;
    if(counter <= 0){
      counter = tiempoInicial;
    }
    
  } else if(mouseIsInResetBtn()){
    console.log("aaaaaa");
    playing = false;
    counter = tiempoInicial;
  }
}

function nextIdx(){
  if(!playing){
    counter = tiempoInicial;
  }

  idxActual ++;
}


function prevIdx(){

  idxActual--;
  if(idxActual < 0){
    idxActual = listaTextos.length-1;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}