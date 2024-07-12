var DataFilePath = "./data/";
function init(){
    const DataFIle = DataFilePath + "1.csv";
    const CSVARR = ParseCSV(ReadAnything(DataFIle));
    console.log(CSVARR); 
    DrawSector(CSVARR);
    

}

function SpawnGraph(Data,ColorData){
    const GraphArea = document.getElementById("graph");
    const GraphHeader = document.createElement("div");
    GraphHeader.innerHTML = Data[0][2];
    GraphHeader.style.position = "absolute";
    GraphHeader.style.top = -10 + "px"; 
    GraphHeader.style.left = "50%";
    GraphHeader.style.fontSize = "250%";
    GraphArea.appendChild(GraphHeader);

    const GraphLine = document.createElement("div");
    GraphArea.style.width="100%";
    GraphArea.style.height="100%";
    const GraphWidth = GraphArea.offsetWidth;
    const GraphHeight = GraphArea.offsetHeight; 
    GraphLine.style.width = "100%";
    GraphLine.style.backgroundColor = "black";
    GraphLine.style.height ="3px";
    GraphLine.style.position ="absolute";
    GraphLine.style.top = "50%";
    GraphArea.appendChild(GraphLine);
    
    const DataSize = Data.length;
    
    for(let CurrentDataPointer = 1; CurrentDataPointer < DataSize; CurrentDataPointer++){
        const CurrentData = Data[CurrentDataPointer];
        const CurrentRepresentAmountChange = parseInt(CurrentData[2]); 
        BarMultiplier = CurrentRepresentAmountChange * 10;
        //Debug
       

    }

    
    //add text
    
    const chartHeader = document.getElementById("ramme");
    const ChartHeaderText = document.createElement("div");
    ChartHeaderText.innerHTML = Data[0][1]; 
    ChartHeaderText.style.position = "absolute";
    ChartHeaderText.style.top = 10 + "px";
    chartHeader.appendChild(ChartHeaderText);


    for(let DataPointer = 1; DataPointer < DataSize; DataPointer++){
        const CurrentData = Data[DataPointer];
        const CurrentPartyName = CurrentData[0];
        const CurrentRepresentAmountChange = parseFloat(CurrentData[2]); 
        const BarWidth = GraphWidth / DataSize;

        const BarMultiplier = CurrentRepresentAmountChange * 5;
        //console.log("mult" + CurrentData[2] + "|" + BarMultiplier);
        

        const BarMargin = 10; 
        const CurrentBar = document.createElement("div");

        CurrentBar.style.width = BarWidth - BarMargin + "px";
        CurrentBar.style.left = BarWidth  * DataPointer + "px" ;
        CurrentBar.style.position= "absolute";
        CurrentBar.style.backgroundColor = ColorData[DataPointer];


        
        const CurrentBarAmount = document.createElement("div");
        CurrentBarAmount.innerHTML = CurrentRepresentAmountChange;
        CurrentBarAmount.style.position="absolute"; 
        CurrentBarAmount.style.top = 0 + "px";
        CurrentBarAmount.style.width = "100%";
        CurrentBarAmount.style.textAlign = "center";
        CurrentBarAmount.style.zIndex = 9999;

        CurrentBar.appendChild(CurrentBarAmount);


        if(BarMultiplier < 0){
            CurrentBar.style.height = -BarMultiplier + "px"; 
        }        
        else{
            CurrentBar.style.height = BarMultiplier + "px"; 
            CurrentBar.style.top = -BarMultiplier + "px";
        } 
        
    
        
        GraphLine.appendChild(CurrentBar);

        //summon graph
        
    }
}