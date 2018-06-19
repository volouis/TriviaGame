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

var gify =["Doomsday.gif", "Odin.gif", "Wolverine.gif", "LoisLane.gif"];

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var pick = 0;
var count = 0;
var seconds;
var i = correct + incorrect + unanswered;


$(document).ready(function(){

    $("#start").click(function(){
        $("#start").hide();

        intervalID = setInterval(game, 1000);

    });
});

function game(){
    i = correct + incorrect + unanswered;
    
    if(i === question.length){
        clearInterval(intervalID);
        setTimeout(ending(), 3000);
    }else{
        $("#every").empty();
        seconds = 10 - count++;
        $("#every").append("<p> Time Remainging: <b>" + seconds + "</b></p>");
        trivia(question[i], selection[i]);

        // this is when the users do not answer in time.
        if(seconds === 0){
            unanswered++;
            clearInterval(intervalID);
            inBet(2, selection[i][answers[i]], gify[i]);
            setTimeout(recall, 3000);
            count = 0;
        }

        $(".asking").click(function(){
            count = 0;
            if($(this).attr("value") === answers[i]){
                correct++;
                clearInterval(intervalID);
                inBet(0, selection[i][answers[i]], gify[i]);
                setTimeout(recall, 3000);
            }else if($(this).attr("value") !== answers[i]){
                incorrect++;
                clearInterval(intervalID);
                inBet(1, selection[i][answers[i]], gify[i]);
                setTimeout(recall, 3000);
            }
        });
    }
}

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

var j = 1;
// out put the answers
function inBet(p, a, g){

    $("#every").empty();

    if(p === 0){
        var word = document.createElement("h2");
        word.textContent = "Correct!!!";
        document.getElementById("every").appendChild(word);
        $("#every").append("<img src=assets/images/" + g + ">");      // *** remember to finish this code

    }else if(p === 1){
        var word = document.createElement("h2");
        word.textContent = "Nope!!!";
        var word2 = document.createElement("p");
        word2.textContent = "The correct answer is " + a;
        document.getElementById("every").appendChild(word);
        document.getElementById("every").appendChild(word2);
        $("#every").append("<img src=assets/images/" + g + ">");

    }else{
        var word = document.createElement("h2");
        word.textContent = "Too Slow";
        var word2 = document.createElement("p");
        word2.textContent = "The correct answer is " + a;
        document.getElementById("every").appendChild(word);
        document.getElementById("every").appendChild(word2);
        $("#every").append("<img src=assets/images/" + g + ">");
    }
}

function recall(){
    intervalID = setInterval(game, 1000);
}

function ending(){
    $("#every").empty();
    $("#every").append("<h2>All done, heres how you did!</h>");
    $("#every").append("<p>Correct Answers: " + correct + "</p>");
    $("#every").append("<p>Incorrect Answers: " + incorrect + "</p>");
    $("#every").append("<p>Unanswered: " + unanswered + "</p>");

    var restBtn = $("<button>");

    restBtn.text("Start Over?")

    restBtn.addClass("restart");

    $("#every").append(restBtn);

    $(".restart").click(function(){
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        pick = 0;
        count = 0;
        i = correct + incorrect + unanswered;

        intervalID = setInterval(game, 1000);
    });
}

