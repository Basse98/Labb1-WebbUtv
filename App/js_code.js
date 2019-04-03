
var allData = [];
var userAnswers;
var correctAnswers;
var index = 1;
var numOfCorrectAnswers = 0;

function initQuestions(result){



    correctAnswers = [];
    result.forEach(function(product){
        allData.push(product);
        var para = document.createElement("div");
        var element = document.getElementById("list");
        correctAnswers.push(product.correct_answer);

        var htmltest = "<p>"+"Question "+index+". "+product.question+"<p/>";
        htmltest +="<button type='button' id='trueButton"+index+"' value='True'>True</button>";
        htmltest += "<button type='button' id='falseButton"+index+"' value='False'>False</button>";
        para.innerHTML = htmltest;
        element.appendChild(para);
        index++;
    });

    userAnswers = [];
    var query = document.querySelector("main");
    query.addEventListener("click",function(e){
        //console.log(e.target);
        if(e.target.nodeName === "BUTTON"){
            if(e.target.id !== "submitButton") {
                userAnswers.push(e.target.value);
            }
        }
    });

    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", () => (
        userAnswers.forEach((answer, index)=> {
            if (answer == correctAnswers[index]){
                numOfCorrectAnswers++;
                console.log(numOfCorrectAnswers);
            }
        })

    ));

}


var res;
var httpReq = new XMLHttpRequest;
httpReq.onreadystatechange = function(){
    if(this.readyState === 4 ){
        if(httpReq.status === 200){
            res = httpReq.response;
            initQuestions(res.results);

        }else{
            console.log("HTTP-status är inte 200, utan " + httpReq.status);
        }
    }

};
httpReq.open("GET"," https://opentdb.com/api.php?amount=10&category=27&type=boolean");
httpReq.responseType="json";
httpReq.send();