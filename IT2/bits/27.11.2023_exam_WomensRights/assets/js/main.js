var QuestionFilePath = "./data/data.csv";
function init(){
    console.log("init run");
    console.log(ParseCSV(ReadAnything(QuestionFilePath)));
}