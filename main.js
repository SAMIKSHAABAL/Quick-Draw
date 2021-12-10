function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth= window.speechSynthesis;
}

 function preload(){
     model=ml5.imageClassifier("DoodleNet");
 }

function draw(){
    strokeWeight(6);
    stroke("yellow");
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background("white");
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);

    document.getElementById("Label").innerHTML="Label- "+results[0].label;

    
    document.getElementById("Prediction").innerHTML="Prediction- "+Math.round(results[0].confidence*100)+"%";

UtterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(UtterThis);

}

function classifyCanvas(){
    model.classify(canvas,gotResults);
}

