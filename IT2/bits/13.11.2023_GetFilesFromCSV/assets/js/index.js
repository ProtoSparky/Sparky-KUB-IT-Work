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
    const BarColor = ["Red", "Blue", "Green"];
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

        //Create graph header
        const GraphTextHeader = document.createElement("div");
        GraphTextHeader.className = "GraphHeader";
        GraphTextHeader.innerHTML =  CurrentYearKey; 
        GraphTextHeader.style.color = "white";
        GraphTextHeader.style.position = "absolute";
        GraphTextHeader.style.left="50%";
        GraphTextHeader.style.transform = "translate(-50%)";
        GraphTextHeader.style.bottom = "2px";
        GraphTextHeader.style.fontSize = "25px";
        graph_text.appendChild(GraphTextHeader);
        
        const GraphColors = document.createElement("div");
        GraphColors.style.position = "absolute";
        GraphColors.style.height = "100%";
        GraphColors.style.width = "200px";
        graph_text.appendChild(GraphColors);


        



        //get key in js object
        for(let CurrentAreaKey = 0; CurrentAreaKey < AreaAmount; CurrentAreaKey ++){
            //create graph components
            const GraphSection = document.createElement("div");
            GraphSection.className = "GraphSection";
            GraphSection.id= "GraphSection_" + CurrentAreaKey;
            GraphSection.style.left = (graph_area.offsetWidth /AreaAmount) * CurrentAreaKey + "px";
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
                SumOfAllValues = SumOfAllValues  + parseInt(CurrentFuelData);
                
            } 
            //Calculate percentage
            let AllFuelValuesPercentage = [];
            for(let SelectedValue = 0; SelectedValue < AllFuelValues.length; SelectedValue ++){
                let SelectedFuel = AllFuelValues[SelectedValue];
                let PercentageValue = (SelectedFuel / SumOfAllValues) * 100; 
                AllFuelValuesPercentage[SelectedValue] = PercentageValue;                 
                const GraphCollumn = document.createElement("div");
                GraphCollumn.className = "graph_area_section";
                GraphCollumn.id ="section" + SelectedValue;
                GraphCollumn.style.height = PercentageValue + "%";
                GraphCollumn.style.backgroundColor = BarColor[SelectedValue];
                GraphSection.appendChild(GraphCollumn);
                const GraphText = document.createElement("div");
                GraphText.innerHTML = SelectedFuel + " | " + Math.round(PercentageValue) + "%";
                //GraphText.style.writingMode = "vertical-lr";
                //GraphText.style.textOrientation = "Sideways";
                GraphText.style.fontFamily="monospace";
                GraphText.style.fontSize = "15px";
                GraphText.style.zIndex = 300;

                GraphText.style.width = "150px";
                GraphText.style.height = "100%;"
                GraphText.style.position = "absolute";
                //GraphText.style.left="-30px";
                GraphText.style.marginLeft = "50px";
                GraphText.style.color = "white";        
                GraphText.style.top = "0px";
                GraphCollumn.appendChild(GraphText);

                /*
                //1st color
                const ColorArea = document.createElement("div");
                const ColorIndicator = document.createElement("div");
                const ColorText = document.createElement("div");
                ColorText.innerHTML = "text"
                ColorText.style.color="white";
                ColorArea.style.position = "absolute";
                ColorArea.style.top = 20 * SelectedValue + "px";
                ColorIndicator.style.height = "15px";
                ColorIndicator.style.width = "15px";
                ColorIndicator.style.backgroundColor = BarColor[SelectedValue];
                GraphColors.appendChild(ColorArea);
                ColorArea.appendChild(ColorIndicator);
                ColorArea.appendChild(ColorText);
                */  

                



            }
           
            
            //generate names
            const CurrentGraphName = document.createElement("div");
            CurrentGraphName.style.position = "absolute";
            CurrentGraphName.style.color="white";
            CurrentGraphName.style.left= (graph_area.offsetWidth /AreaAmount) * CurrentAreaKey +  + 100 +"px";
            CurrentGraphName.style.top = "10px";
            //CurrentGraphName.style.textAlign = "center"
            CurrentGraphName.innerHTML=Areas[CurrentAreaKey];
            CurrentGraphName.style.transform = "translate(-50%)";
            graph_text.appendChild(CurrentGraphName);



            //color bars
            const ColorArea = document.createElement("div");
            const ColorIndicator = document.createElement("div");
            const ColorText = document.createElement("div");
            ColorText.innerHTML = CurrentFuelType[CurrentAreaKey];
            ColorText.style.color="white";
            ColorArea.style.position = "absolute";
            ColorArea.style.left = 55 * CurrentAreaKey + "px";
            ColorArea.style.bottom = "0px";
            ColorIndicator.style.height = "15px";
            ColorIndicator.style.width = "30px";
            ColorIndicator.style.backgroundColor = BarColor[CurrentAreaKey];
            GraphColors.appendChild(ColorArea);
            ColorArea.appendChild(ColorIndicator);
            ColorArea.appendChild(ColorText);






            //console.log(AllFuelValuesPercentage.sort());       
             
            

            
        }       





    }
}