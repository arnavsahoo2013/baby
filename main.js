function setup()
{
    cs = createCanvas(480,380);
    v = createCapture("VIDEO");
    cs.center();
    v.hide();
}
v = "";
status = "";
objects = [];
function preload()
{
    
}
function draw()
{
    image (v,0,0,480,380);

    if(status != "")
    {
        myModel.detect(v,gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:-" + objects.length;

            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x , objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        } 
    }
}
function start()
{
    myModel = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detection started";   
}
function modelLoaded()
{
    console.log("model_has_loaded");
    status = true;
    v.loop();
    v.volume(1);
    v.speed(1);
}
function gotResults(error,results)
{
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}