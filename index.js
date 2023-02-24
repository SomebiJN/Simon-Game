//pattern of initial colours user should copy
var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

//pattern of colours clicked by user
var userClickedPattern = [];

var level = 0;

//has game started?
var started = false;

//detect keyboard key press to start game

$(document).keypress(function(){

    if(!started){
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }

});

//detect when buttons are clicked
$(".btn").click(function(){

    //store the clicked button's id by getting button object
    var userChosenColour = $(this).attr("id");
    
    //store the chosen pattern by the user
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){

    userClickedPattern = [];

    level++;

    //display new level
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    //game pattern is stored
    gamePattern.push(randomChosenColour);

    //select button with id randomChosenColour and flash it
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
  
}

function playSound(name){

    //play audio for selected button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
   //apply css styling for a pressed button
   $("#" + currentColour).addClass("pressed");
   //remove pressed effect after 100ms
   setTimeout(function(){
       $("#" + currentColour).removeClass("pressed");
   },100);

}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log("success");
            //most recent answer is right so move on to next sequence
            if(userClickedPattern.length == gamePattern.length){

                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        console.log(userClickedPattern);
        console.log(gamePattern);
        startOver();
    }
   
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



