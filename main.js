song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
scoreRight = 0;
song_1Status = "";
song_2Status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup()
{
    canvas = creatCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is initialised');
}

function gotPoses (results)
{
    if(results.length > 0 )
    {
        console.log(results);
        scoreLeft = results[0].pose.keypoints[9].score;
        console.log("scoreLeft = " +scoreLeft);

        scoreRight = results[0].pose.keypoints[10].score;
        console.log("scoreRight = " +scoreRight);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWristX+ "leftWristY = " +leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWristX+ "rightWristY = " +rightWristY)
    }
}

function draw()
{
    image(video, 0, 0, 400, 400);

    fill("#FF0000");
    stroke("FF0000");
    song_1Status = song1.isPlaying();
    song_2Status = song2.isPlaying();

    if(scoreLeft > 0.2)
    {
        circle(leftWristX,leftWristY, 20);
        song2.stop();
       
        if(song_1Status == False)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "song1.isPlaying";
        }
    }

    if(scoreRight > 0.2)
    {
        circle(rightWristX,rightWristY, 20);
        song1.stop();
       
        if(song_2Status == False)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "song2.isPlaying";
        }
    }
}