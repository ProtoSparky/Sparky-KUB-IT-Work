var QuestionFilePath = "./data/data.csv";
var CurrentQuestionKey = 0;
var Questions;
var QuestionLength; 
var CurrentQuestion;
var CorrectAnswers = 0;
var WrongAnswers = 0;
function init(){
    console.log("init run");
    console.log(ParseCSV(ReadAnything(QuestionFilePath)));
    Questions = ParseCSV(ReadAnything(QuestionFilePath));
    QuestionLength = Questions.length;
}

function checkInput(inputOP){
    const QuestionArea = document.getElementById("QuestionArea");
    const Question = document.getElementById("question");
    const AnswerMenu = document.getElementById("AnswerMenu");
    const UserInput = document.getElementById("UserInput");
    const CheckAnswer = document.getElementById("CheckAnswer");
    if(UserInput == null){
        //start game
        CurrentQuestionKey += 1;
        CurrentQuestion = Questions[CurrentQuestionKey];
        Question.innerHTML = CurrentQuestion[0];
        const UserInput = document.createElement("input");
        UserInput.id = "UserInput";
        UserInput.type = "number";
        UserInput.value = 0;
        AnswerMenu.appendChild(UserInput);
        CheckAnswer.innerHTML = "Check answer"; 
    }
    else{
        //Game end
        if(CurrentQuestionKey +1 == QuestionLength){
            const MessageScreen = document.createElement("div");
            MessageScreen.style.position="absolute";
            MessageScreen.style.width = "500px";
            MessageScreen.style.height = "400px";
            MessageScreen.style.transform = "translate(-50%)";
            MessageScreen.style.left = "50%";
            MessageScreen.style.backgroundColor ="lightgrey";
            MessageScreen.innerHTML = "The quiz is over!";
            MessageScreen.style.textAlign = "center";
            MessageScreen.style.fontSize = "40";   
            MessageScreen.id="MessageScreen";             
            QuestionArea.appendChild(MessageScreen);
            const MessageButton = document.createElement("button");
            MessageButton.addEventListener("click",function(){
                RestartGame(); 
            })
            MessageButton.style.position ="absolute";
            MessageButton.style.right = "10px";
            MessageButton.innerHTML = "Restart game";
            MessageButton.style.bottom = "10px";
            MessageButton.style.width = "60px";
            MessageButton.style.height = "40px";
            MessageScreen.appendChild(MessageButton);

            const CorrectNess = document.createElement("div");
            CorrectNess.style.position = "absolute";
            CorrectNess.style.top = "100px";
            CorrectNess.style.fontSize = "20";
            CorrectNess.style.left = "50%";
            CorrectNess.style.transform = "translate(-50%)";
            CorrectNess.style.TextAlign = "center";
            CorrectNess.innerHTML = "You got " + CorrectAnswers + " correct, and " + WrongAnswers + " wrong"; 
            MessageScreen.appendChild(CorrectNess);

            //Create diagram 

            const Diagram = document.createElement("div");
            const DiagramWidth = "300px"; 
            Diagram.style.position = "absolute";
            Diagram.style.top = "200px";
            Diagram.style.width = DiagramWidth; 
            Diagram.style.height = "50px";
            Diagram.style.left = "50%";
            Diagram.style.transform = "translate(-50%)";

            const WinRate = document.createElement("div");
            WinRate.style.position = "absolute";
            WinRate.style.height = "100%";
            WinRate.style.left = "0px";
            WinRate.style.backgroundColor = "#9ecb8c";

            const LoseRate = document.createElement("div");
            LoseRate.style.position = "absolute";
            LoseRate.style.height = "100%";
            LoseRate.style.backgroundColor = "#cb8c8c";
            
            const WinPercentage = (CorrectAnswers/QuestionLength) * 100; 
            const LosePercentage = 100 - WinPercentage; 


            WinRate.style.width = WinPercentage + "%"; //replace
            LoseRate.style.width = LosePercentage + "%" //Replace
            LoseRate.style.left = WinPercentage + "%"; //Replace

            

            MessageScreen.appendChild(Diagram);
            Diagram.appendChild(WinRate);
            Diagram.appendChild(LoseRate); 


            
            
            

        }
        else{
            //Correct answer
            CurrentQuestion = Questions[CurrentQuestionKey];
            Question.innerHTML = Questions[CurrentQuestionKey +1][0];
            const CurrentUserInput = parseInt(document.getElementById("UserInput").value);
            console.log(CurrentUserInput);
            console.log(parseInt(CurrentQuestion[1]));
            if(CurrentUserInput ==  parseInt(CurrentQuestion[1])){
                
                console.log("yay");
                const MessageScreen = document.createElement("div");
                MessageScreen.style.position="absolute";
                MessageScreen.style.width = "500px";
                MessageScreen.style.height = "400px";
                MessageScreen.style.transform = "translate(-50%)";
                MessageScreen.style.left = "50%";
                MessageScreen.style.backgroundColor ="lightgrey";
                MessageScreen.innerHTML = "The answer was correct";
                MessageScreen.style.textAlign = "center";
                MessageScreen.style.fontSize = "40";   
                MessageScreen.id="MessageScreen";  
                MessageScreen.style.backgroundColor = "#9ecb8c";           
                QuestionArea.appendChild(MessageScreen);
                const MessageButton = document.createElement("button");
                MessageButton.addEventListener("click",function(){
                    ClearScreen(); 
                })
                MessageButton.style.position ="absolute";
                MessageButton.style.right = "10px";
                MessageButton.innerHTML = "next";
                MessageButton.style.bottom = "10px";
                MessageButton.style.width = "50px";
                MessageButton.style.height = "20px";
                MessageScreen.appendChild(MessageButton);

                const Correctness = document.createElement("div");
                Correctness.style.position = "absolute";
                Correctness.style.top = "50px";
                Correctness.style.left = "50%";
                Correctness.style.transform = "translate(-50%)";
                CorrectAnswers += 1;
                Correctness.innerHTML = "Total correct answers so far: " + CorrectAnswers;
                Correctness.style.fontSize = "20";
                MessageScreen.appendChild(Correctness);
        
            }
            else{
                //Wrong answer
                const MessageScreen = document.createElement("div");
                MessageScreen.style.position="absolute";
                MessageScreen.style.width = "500px";
                MessageScreen.style.height = "400px";
                MessageScreen.style.transform = "translate(-50%)";
                MessageScreen.style.left = "50%";
                MessageScreen.style.backgroundColor ="lightgrey";
                MessageScreen.innerHTML = "The answer was wrong<br>Better luck next time";
                MessageScreen.style.textAlign = "center";
                MessageScreen.style.fontSize = "40";   
                MessageScreen.id="MessageScreen";    
                MessageScreen.style.backgroundColor = "#cb8c8c";              
                QuestionArea.appendChild(MessageScreen);
                const MessageButton = document.createElement("button");
                MessageButton.addEventListener("click",function(){
                    ClearScreen(); 
                })
                MessageButton.style.position ="absolute";
                MessageButton.style.right = "10px";
                MessageButton.innerHTML = "next";
                MessageButton.style.bottom = "10px";
                MessageButton.style.width = "50px";
                MessageButton.style.height = "20px";
                MessageScreen.appendChild(MessageButton);

                const CorrectNess = document.createElement("div");
                CorrectNess.style.position = "absolute";
                CorrectNess.style.top = "100px";
                CorrectNess.style.fontSize = "20";
                CorrectNess.style.left = "50%";
                CorrectNess.style.transform = "translate(-50%)";
                CorrectNess.style.TextAlign = "center";
                CorrectNess.innerHTML = "You were off by " + (parseInt(CurrentQuestion[1]) - CurrentUserInput) + " years"; 
                MessageScreen.appendChild(CorrectNess);
                WrongAnswers += 1;
            }
            CurrentQuestionKey += 1;
        }
    }
}
function ClearScreen(){
    const MessageScreen = document.getElementById("MessageScreen");
    MessageScreen.remove();
    console.log("aaaaa");
}
function RestartGame(){
    location.reload(); 
}