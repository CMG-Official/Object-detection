img = "";
stats  = "";
objects = [];

let video;
let button;


function setup() {
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO); //access live webcam
  video.size(320, 240); //change the size to 320 x 240
  button = createButton('snap'); //create a button called "snap"
  button.hide();
  button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"
  canvas2 = createCanvas(700,450);
  canvas2.center();
  mdl = ml5.objectDetector("cocossd",modelloaded);
  document.getElementById("status").innerHTML = "Status : detecting objects";
  
}

function takesnap() {
  image(video, 0, 0); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
}



function draw() {

  //image(video, 0, 0); 
  
  
  
}
function preload(){
img = loadImage("images.jpeg");
}

function draw(){
    mdl.detect(video , gotresults);
    image(video,0,0,700,450);
    if(stats != " "){
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";
            fill(255,0,0);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
            
        }
    }
}

function modelloaded(){
console.log("model is loaded");
stats = "true";
}
function gotresults(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }

}
