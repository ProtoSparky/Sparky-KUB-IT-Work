var DataLoc = "./assets/data/11823_20231113-130803.csv";
var ProcessedData = {};
function init(){
    console.log("init");
    const RawCSV = ParseCSV(ReadAnything(DataLoc)); 
    let Data = [];
    for(let CurrentArrKey = 0; CurrentArrKey < RawCSV.length; CurrentArrKey ++){
        let CurrentArrData = RawCSV[CurrentArrKey];
        //Data.push(CurrentArrData);
        if(CurrentArrKey > 2){            
            if(CurrentArrData[0] == "" && CurrentArrData[1] == "" && CurrentArrData[2] == "" && CurrentArrData[3] == "" && CurrentArrData[4] == ""){
                CurrentArrKey = RawCSV.length - 1;
            }
            else{
                Data.push(CurrentArrData);
            }   
        } 
        //This loop cleans up the array data
    }

    const AmountOFYears = Data[0].length - 2;
    for(let CurrentYears = 0; CurrentYears < AmountOFYears; CurrentYears ++){
        const CurrentYear = Data[0][CurrentYears + 2];
        let DataArrOffset =  CurrentYears + 1;

        if(CurrentYears == 0){
            DataArrOffset = CurrentYears + 3 * CurrentYears + 1;
        }
        else if(CurrentYears > 0){
            DataArrOffset = CurrentYears + 3 * CurrentYears - 1;
        }

        const Area1 =   Data[1];
        const Area1_2 = Data[2];
        const Area1_3 = Data[3];
        const Area2 =   Data[4];
        const Area2_2 = Data[5];
        const Area2_3 = Data[6];
        const Area3 =   Data[7];
        const Area3_2 = Data[8];
        const Area3_3 = Data[9];
        
        let ProcessedCSV = {
            [CurrentYear]:{
                [Area1[0]]:{
                    "Bensin":Area1[2 + CurrentYears],
                    "Diesel":Area1_2[2 + CurrentYears],
                    "El":Area1_3[2 + CurrentYears],
                }, 
                [Area2[0]]:{
                    "Bensin":Area2[2 + CurrentYears ],
                    "Diesel":Area2_2[2 + CurrentYears],
                    "El":Area2_3[2 + CurrentYears],
                }, 
                [Area3[0]]:{
                    "Bensin":Area3[2 + CurrentYears ],
                    "Diesel":Area3_2[2 + CurrentYears],
                    "El":Area3_3[2 + CurrentYears],
                }, 
            }
        }
        
        ProcessedData = { ...ProcessedData, ...ProcessedCSV };   

    }






    console.log(Data);
    console.log(JSON.stringify(ProcessedData));

    SpawnBarChart(ProcessedData)
    
}


function SpawnBarChart(ProcessedData){
    const DataLength = Object.keys(ProcessedData).length;
    const YearKeys = Object.keys(ProcessedData);
    /*
    const GraphArea = document.getElementById("graph_text1");
    const GraphWhole = document.getElementById("graph1");
    const GraphAreaWidth = GraphArea.clientWidth;
    const GraphAreaHeight = GraphWhole.clientHeight - GraphArea.clientHeight;
    */
    for(let CurrentKey = 0; CurrentKey < DataLength; CurrentKey ++){
        let CurrentYearKey = YearKeys[CurrentKey];
        let AreaKeys = Object.keys(ProcessedData[YearKeys[CurrentKey]]);
        let AreaAmount = AreaKeys.length;
        //Summon part of graph
        const GraphBody = document.getElementById("graphs")
        const GraphArea = document.createElement("div");
        GraphArea.className = "graph";
        GraphArea.id = "Graph_" + CurrentKey;  
        GraphArea.style.top = 500 * CurrentKey + "px";
        const graph_area = document.createElement("div");
        graph_area.className = "graph_area";
        graph_area.id = "graph_area" + CurrentKey;
        const graph_text = document.createElement("div");
        graph_text.className = "graph_text"; 
        GraphBody.appendChild(GraphArea);
        GraphArea.appendChild(graph_area);
        GraphArea.appendChild(graph_text);
        



        //get key in js object
        for(let CurrentAreaKey = 0; CurrentAreaKey < AreaAmount; CurrentAreaKey ++){
            //create graph components
            const GraphSection = document.createElement("div");
            GraphSection.class = "GraphSection";
            GraphSection.id= "GraphSection_" + CurrentAreaKey;
            graph_area.appendChild(GraphSection);



            //get area in selected year
            let Areas = Object.keys(ProcessedData[YearKeys[CurrentKey]]);
            let CurrentFuelType = Object.keys(ProcessedData[YearKeys[CurrentKey]][Areas[CurrentAreaKey]]);
            //Select vehicle fuel type
            let AllFuelValues = [];
            let SumOfAllValues = 0
            for(let SelectedFuelType = 0; SelectedFuelType < CurrentFuelType.length; SelectedFuelType ++){
                let CurrentSelectedFuelType = CurrentFuelType[SelectedFuelType];
                //let CurrentFuelData = Object.keys(ProcessedData[YearKeys[CurrentKey]][Areas[CurrentAreaKey]][CurrentSelectedFuelType]);
                let CurrentFuelData = ProcessedData[YearKeys[CurrentKey]][Areas[CurrentAreaKey]][CurrentSelectedFuelType];
                AllFuelValues[SelectedFuelType] = parseInt(CurrentFuelData); 
                SumOfAllValues = SumOfAllValues  + parseInt(CurrentFuelData)
                
            } 
            //Calculate percentage
            let AllFuelValuesPercentage = [];
            for(let SelectedValue = 0; SelectedValue < AllFuelValues.length; SelectedValue ++){
                let SelectedFuel = AllFuelValues[SelectedValue];
                let PercentageValue = (SelectedFuel / SumOfAllValues) * 100; 
                AllFuelValuesPercentage[SelectedValue] = PercentageValue; 
            }



            console.log(AllFuelValuesPercentage.sort());       
             
            

            
        }       





    }
}