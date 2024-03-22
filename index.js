var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];


var started = false;
var level = 0;
var userClickedPattern = [];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level"+ level);
        newSequence();
        started = true;
    }
});

$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playsound(userChosenColour);
animate(userChosenColour);

checkanswer(userClickedPattern.length-1);
});

function newSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChoosenColor);
}

function checkanswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            newSequence();
          }, 1000);
        }
      } else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}


function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");    
    }, 100);  
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


