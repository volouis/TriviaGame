var question = ["Who killed Superman?",
                "Who is Thor's dad?",
                "Where is Wolverine from?", 
                "Whish one of these did not fight Superman?",
            ];

var answers = ["1", "2", "3", "0"];

var selection = [["Joker", "Doomsday", "Batman", "Brainiac"],
                ["Loki", "Iron Man", "Odin", "Steve Rogers"],
                ["U.S.A", "England", "Australia", "Canada"],
                ["Lois Lane", "Batman", "Muhammad Ali", "Lex Luthor"],
            ];

var correct = 0;
var incorrect = 0;
var unanswered = 0;

var i = correct + incorrect + unanswered;


$(document).ready(function(){

    $("#start").click(function(){
        $("#start").hide();

        intervalID = setInterval(game,5000);

    });
});


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

function notans(){
    $("#every").empty();
    $("#ques").hide();
    unanswered++;
}

function game(){
    i = correct + incorrect + unanswered;
    console.log(i);
    console.log(question.length);
    
    if(i === question.length){
        clearInterval(intervalID);
    }else{
        trivia(question[i], selection[i]);

        var slow = setTimeout(notans, 3000);

        $(".asking").click(function(){
            if($(this).attr("value") === answers[i]){
                console.log("hello");
                correct++;
            }else if($(this).attr("value") !== answers[i]){
                incorrect++;
            }

            clearInterval(intervalID);
            $("#every").empty();
            $("#ques").hide()
        });
    }
}