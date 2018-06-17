var question = ["Who killed Superman?",
                "Who is Thor's dad?",
                "Where is Wolverine from?", 
                "Which one of these did not fight Superman?",
            ];

var answers = ["1", "2", "3", "0"];

var selection = [["Joker", "Doomsday", "Batman", "Brainiac"],
                ["Loki", "Iron Man", "Odin", "Steve Rogers"],
                ["U.S.A", "England", "Australia", "Canada"],
                ["Lois Lane", "Batman", "Muhammad Ali", "Lex Luthor"],
            ];

var gify =[];

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var pick = 0;
var count = 0;
var second;

var i = correct + incorrect + unanswered;


$(document).ready(function(){

    $("#start").click(function(){
        $("#start").hide();

        intervalID = setInterval(game, 1000);

    });
});

//out puts the multiple choice questions
function trivia(quest, sele){

    var word = document.createElement("p");
    word.textContent = quest;
    document.getElementById("every").appendChild(word);

    for(var i = 0; i < sele.length; i++){
        var btn = $("<button>");

        btn.text(sele[i]);

        btn.addClass("asking asking" + i);

        btn.attr("value", i);

        $("#every").append(btn);
    }
}

function game(){
    i = correct + incorrect + unanswered;
    
    if(i === question.length){
        clearInterval(intervalID);
    }else{
        $("#every").empty();
        seconds = 3 - count++;
        $("#every").append("<p> Time Remainging: " + seconds + "</p>");
        //timeLeft(5 ,count++);
        trivia(question[i], selection[i]);

        if(seconds === 0){
            // $("p").hide();
            // $(".asking").hide();
            unanswered++;
            inBet(2, selection[i][answers[i]]);
            count = 0;
        }

        $(".asking").click(function(){
            count = 0;
            if($(this).attr("value") === answers[i]){
                correct++;
                inBet(0, selection[i][answers[i]]);
            }else if($(this).attr("value") !== answers[i]){
                incorrect++;
                inBet(1, selection[i][answers[i]]);
            }
        });
    }
}


// out put the answers
function inBet(p, a){
    clearInterval(intervalID);
    $("#every").empty();

    if(p === 0){
        var word = document.createElement("h2");
        word.textContent = "Correct!!!";
        document.getElementById("every").appendChild(word);
        //$("#every").append("<img scr=assets/images/ >");       *** remember to finish this code

    }else if(p === 1){
        var word = document.createElement("h2");
        word.textContent = "Nope!!!";
        var word2 = document.createElement("p");
        word2.textContent = "The correct answer is " + a;
        document.getElementById("every").appendChild(word);
        document.getElementById("every").appendChild(word2);
        //$("#every").append("<img scr=assets/images/ >");

    }else{
        var word = document.createElement("h2");
        word.textContent = "Too Slow";
        var word2 = document.createElement("p");
        word2.textContent = "The correct answer is " + a;
        document.getElementById("every").appendChild(word);
        document.getElementById("every").appendChild(word2);
        //$("#every").append("<img scr=assets/images/ >");

    }
    intervalID = setInterval(game, 1000);
}

// this is when the users do not answer in time.
function timeLeft(limit, t){
    var seconds = limit - t;
    $("#every").append("<p> Time Remainging: " + seconds + "</p>");
}
