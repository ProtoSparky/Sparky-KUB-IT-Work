var CSV_Processed = null; 
var ClientSettings ={
    "StarSigns":{

    }
}
function init(){
    const CSVLoc = "./SiteData/1.csv";
    const CSV = ReadAnything(CSVLoc);
    CSV_Processed = ParseCSV(CSV);

    for(let starsign_pointer = 1; starsign_pointer < CSV_Processed.length; starsign_pointer ++){
        //load all data to json file
        const current_data = CSV_Processed[starsign_pointer];
        const StartDate =  new Date(current_data[1]);   
        const EndDate = new Date(current_data[2]); 
        ClientSettings["StarSigns"][current_data[0]] = {
            StartDate:{
                Day:StartDate.getDate(),
                Month:StartDate.getMonth() + 1,
                Year:StartDate.getFullYear(),
            },
            EndDate:{
                Day:EndDate.getDate(),
                Month:EndDate.getMonth() + 1,
                Year:EndDate.getFullYear(),
            }, 
            SignInfo:current_data[3],
        };
    };

    
}