
var allData = [];
var userAnswers;
var correctAnswers;
var index = 1;
var numOfCorrectAnswers = 0;
var numOfQuestions = 0;

function initQuestions(result){

    correctAnswers = [];
    //Loops through all the JSON results
    result.forEach(function(product){
        numOfQuestions++;

        allData.push(product);
        var para = document.createElement("div");
        var element = document.getElementById("list");
        correctAnswers.push(product.correct_answer);

        //Creates HTML elements
        var htmlText = "<p>"+"Question "+index+". "+product.question+"</p>";
        htmlText += "<div class='buttonDiv'>";
        htmlText +="<button type='button' id='trueButton"+index+"' value='True'>True</button>";
        htmlText += "<button type='button' id='falseButton"+index+"' value='False'>False</button>";
        htmlText += "</div>";
        para.innerHTML = htmlText;
        element.appendChild(para);
        index++;
    });

    //Saves values from buttoms and disables them when clicked
    userAnswers = [];
    var query = document.querySelector("main");
    query.addEventListener("click",function(e){

        //Checking to see if the target is a button
        if(e.target.nodeName === "BUTTON"){
            if(e.target.id !== "submitButton"){
                var parent = e.target.parentNode;
                userAnswers.push(e.target.value);
                parent.childNodes[0].disabled = true;
                parent.childNodes[1].disabled = true;
            }else{
                e.target.disabled = true;
            }
        }
    });

    //Finishes the quiz via the submit button, prints out result
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", () => (
        userAnswers.forEach((answer, index)=> {
            if (answer === correctAnswers[index]){
                numOfCorrectAnswers++;
            }
            document.getElementsByClassName("results")[0].innerHTML = "Results: " + numOfCorrectAnswers + " / " + numOfQuestions;
        })

    ));


}

//Hämtar data från API
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
httpReq.open("GET","https://opentdb.com/api.php?amount=15&category=22&type=boolean");
httpReq.responseType="json";
httpReq.send();