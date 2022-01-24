//Reflection: My inspiration for this project was the YouTube channel SiIvaGunner, who is dedicated to uploading meme edits or mashups of video game music and passing them off as the real thing, referring to them as "High Quality Video Game Rips." The channel reuses memes as well as video game music, so I wanted to see if the Teachable Machine could tell if a music sample was a high quality rip or an original song. In order to train my model, I created two categories: rip or original song. I originally included over 2000 samples for each category (I included different memes for the rips category), and the model was unable to be trained even after leaving my computer on overnight. After this, I decided to cut the number of models by half and the model was trained. Before, my p5 program could only say "yes" or "no" in response to sound being played, but after a suggestion, I decided to include different confidence levels to give it more variety. I also got a suggestion to include recommendations to high quality rips underneath responses that weren't "yes." For this, I created an array of links to rips. Then I created squares that act as buttons: if you click on one of them, you are redirected to one of the links in the array (the link chosen is random). I programmed it so that you could only click on the squares. If I had more time I would customize the CSS more and change the background colors based on the model's response. I would have also liked to add a score counter in order to keep track of the number of times the model was correct. 


let classifier;

// Label
let label = 'I am LISTENING!';

// Other text
let other = "";
let other2 = "";

//rip links
let rips = ["https://www.youtube.com/watch?v=FE6RuZuvjMs", 
            "https://www.youtube.com/watch?v=7mSZn9UKXTk", 
            "https://www.youtube.com/watch?v=6vQ71voOb-Q",
            "https://www.youtube.com/watch?v=ucJ8vgOllhc",
            "https://www.youtube.com/watch?v=kU2m1O13DOM",
            "https://www.youtube.com/watch?v=8Vjktc_G1lM",
            "https://www.youtube.com/watch?v=Bg0a0bnz0mw",
            "https://www.youtube.com/watch?v=yT7E0j0Usuw",
            "https://www.youtube.com/watch?v=DMH_uotQSC8",
            "https://www.youtube.com/watch?v=eIsSxcQLiuU",
            "https://www.youtube.com/watch?v=y1gTVhWXkfo",
            "https://www.youtube.com/watch?v=8Tb-CHjgsr8",
            "https://www.youtube.com/watch?v=4aajtc0KZTg",
            "https://www.youtube.com/watch?v=Pai4H_3qCGo",
            "https://www.youtube.com/watch?v=K2QNe4Rzy5c",
            "https://www.youtube.com/watch?v=psd8NvU1K9A",
            "https://www.youtube.com/watch?v=RTZeTXRniFA",
            "https://www.youtube.com/watch?v=xkwDzPPtV_s",
            "https://www.youtube.com/watch?v=UOiC3g6YSjM",
            "https://www.youtube.com/watch?v=o4zeepJ_XCY",
            "https://www.youtube.com/watch?v=YYJ68yi_3aY"];

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/qoc1QH57G/';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(400, 400);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  // Draw the label in the canvas
  if (label == "Yes!" || label == "I am LISTENING!") {
    background(55, 149, 204);
    fill(255);
    textFont('Zilla Slab');
    textSize(40);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height / 2);
  } else {
    background(108, 124, 140);
    fill(255);
    noStroke();
    textFont('Zilla Slab');
    textSize(32);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height / 4);
    textSize(14);
    text(other, width / 2, (height / 3));
    text(other2, width / 2, (height / 3)+20);
    link1(89, 17, 77);
    link2(33, 160, 160);
    link3(178, 58, 72);
  }
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  confidence = results[0].confidence;
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  //label = results[0].label;
  if (confidence < 0.2){
    label = "No!";
    other = "You could be listening to these high quality rips instead";
    other2 = "(click on one of the squares below):";
  }
  if (confidence >= 0.2 && confidence < 0.5){
    label = "Probably not!";
    other = "You could be listening to these high quality rips instead";
    other2 = "(click on one of the squares below):";
  }
  if (confidence >= 0.5 && confidence < 0.6){
    label = "IDK";
    other = "You could be listening to these high quality rips instead";
    other2 = "(click on one of the squares below):";
  }
  if (confidence >= 0.6 && confidence < 0.8){
    label = "Maybe?";
    other = "You could be listening to these high quality rips instead";
    other2 = "(click on one of the squares below):";
  }
  if (confidence >= 0.8 && confidence < 0.9){
    label = "Probably!";
    other = "You could be listening to these high quality rips instead";
    other2 = "(click on one of the squares below):";
  }
  if (confidence >= 0.9){
    label = "Yes!";
    other = "";
    other2 = "";
  }
  //print(results[0].confidence);
}

// code below creates squares that you can click on to get redirected to a
// high quality rip. links are put in an array and are randomized
function mousePressed(x1, y1, x2, y2){
  if (mouseY >= y1 && mouseY <= y2 && mouseX >= x1 && mouseX <= x2){ 
    window.open(rips[Math.floor(random(0,22))]);
  }
}

function link1(r, g, b) {
  fill(r, g, b);
  rect(25, 200, 100, 100, 20);
  mousePressed(25, 200, 125, 300);
}

function link2(r, g, b) {
  fill(r, g, b);
  rect(150, 200, 100, 100, 20);
  mousePressed(150, 200, 250, 300);
}

function link3(r, g, b) {
  fill(r, g, b);
  rect(275, 200, 100, 100, 20);
  mousePressed(275, 200, 375, 300);
}