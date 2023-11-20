var Data = {
    "settings":{
        "ChartColor.BG":"#2b2b31", //Background color of graph 
        "CharColor.tHead":"white",
        "ChartType":"collumn", //Can have collumn
        
    },
    "datapoint":{
        "0":{
            "Data":"44329",
            "Head":"num1",
            "ChartColor.Coll":"pink",
        },
        "1":{
            "Data":"413426",
            "Head":"num2",
            "ChartColor.Coll":"red",
        },
        "2":{
            "Data":"432347",
            "Head":"num3",
            "ChartColor.Coll":"blue",
        },


    }
}
function SummonChart(Data, ChartAreaID){
    const ChartArea = document.getElementById(ChartAreaID);
    const SettingsData = Data["settings"]
    const ChartData = Data["datapoint"]
    console.log(ChartData);
    if(SettingsData !=undefined && SettingsData !=""){
        if(SettingsData["ChartColor.BG"]!=undefined && SettingsData["ChartColor.BG"]!=""){
            ChartArea.style.backgroundColor= SettingsData["ChartColor.BG"];
        }
        //

        if(SettingsData["ChartType"] != undefined && SettingsData["ChartType"] != ""){
            const ChartType =SettingsData["ChartType"].toLowerCase
            if(ChartType == "collumn"){
                //Summon normal collumns
                
                
                
            }
        }
        else{
            console.error("SummonChart() Settings do not contain valid chart type ");
        }
    }
    else {
        console.log("Settings do not exist");
    }
}