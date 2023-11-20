var DataFilePath = "./data/";
function init(){
    const DataFIle = DataFilePath + "1.csv";
    const CSVARR = ParseCSV(ReadAnything(DataFIle));

    console.log(CSVARR); 
    DrawSector(CSVARR);
}