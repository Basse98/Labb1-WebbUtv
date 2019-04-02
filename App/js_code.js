


var incorrectAnswers;
var index = 1;

function initQuestions(result){
    questions = [];
    var questions2 = [];
    var correctAnswers = [];
    incorrectAnswers = [];
    currentIndex = 0;
    result.forEach(function(product){
        var para = document.createElement("p");
        var element = document.getElementById("list");



        var htmltest = "<div><p>"+"Question "+index+". "+product.question+"<p/>"
        htmltest += "<button type='button'>True</button>";
        htmltest += "<button type='button'>False</button>";
        htmltest +="</div>"
        para.innerHTML = htmltest;
        element.appendChild(para);
        index++;


        questions.push(product.question);
        questions2.push(product.question);
        correctAnswers.push(product.correct_answer);
        incorrectAnswers.push(product.incorrect_answers.toString());

    });
    /*
    console.log("Hello from init function");
    console.log(questions);
    console.log(questions2);
    console.log(correctAnswers);
    console.log(incorrectAnswers);
    */

}

function start(){

}


var res;
var httpReq = new XMLHttpRequest;
httpReq.onreadystatechange = function(){
    if(this.readyState === 4 ){
        if(httpReq.status === 200){
            res = httpReq.response;
            initQuestions(res.results);
            start();
        }else{
            console.log("HTTP-status är inte 200, utan " + httpReq.status);
        }
    }

};
httpReq.open("GET"," https://opentdb.com/api.php?amount=10&category=27&type=boolean");
httpReq.responseType="json";
httpReq.send();