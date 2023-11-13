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
        const Area3_3 = Data[8];
        
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



    
}