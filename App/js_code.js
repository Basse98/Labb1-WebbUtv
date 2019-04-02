
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click",showResults());

function showResults(){

}

function buildQuiz(){
    const output =[];

}

var questions=[];
var res;
var test = new XMLHttpRequest;
test.onreadystatechange = function(){
    if(this.readyState === 4 ){
        if(test.status === 200){
            res = test.response;
            res.results.forEach(function(product){
                var para = document.createElement("p");
                para.innerHTML = product.question;
                var element = document.getElementById("list").appendChild(para);
            });
        }else{
            console.log("HTTP-status är inte 200, utan " + test.status);
        }
    }

};
test.open("GET"," https://opentdb.com/api.php?amount=10&category=27&type=boolean");
test.responseType="json";
test.send();
