var tbl_data = [[
    //Table 0
        [" ",           "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"], //Row 0
        ["08:00 - 10:00", "Mon R1", "Tue R1", "Wed R1" , "Thur R1", "Frid R1"], //Row 1
        ["10:00 - 12:00", "Mon R2", "Tue R2", "Wed R2" , "Thur R2", "Frid R2"], //Row 2     
        ["Lunsj        ", "      ", "      ", "      " , "       ", "       "], //Row 3
        ["13:30 - 14-30", "Mon R4", "Tue R4", "Wed R4" , "Thur R4", "Frid R4"], //Row 4
        ["14:30 - 16:00", "Mon R5", "Tue R5", "Wed R5" , "Thur R5", "Frid R5"]  //Row 5

    ], 
    
    //Table 1
    [
        [" ",           "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"], //Row 0
        ["08:00 - 10:00", "Mon R10", "Tue R10", "Wed R10" , "Thur R10", "Frid R1"], //Row 1
        ["10:00 - 12:00", "Mon R20", "Tue R20", "Wed R20" , "Thur R20", "Frid R2"], //Row 2     
        ["Lunsj        ", "      ", "      ", "      " , "       ", "       "], //Row 3
        ["13:30 - 14-30", "Mon R40", "Tue R40", "Wed R40" , "Thur R40", "Frid R4"], //Row 4
        ["14:30 - 16:00", "Mon R50", "Tue R50", "Wed R50" , "Thur R50", "Frid R50"]  //Row 5

    ]    


];

function formINIT(){


    //spawn_table2(tbl_data[0], 1, "1A");


}

function SelectClass(SelectedClass){
    if(SelectedClass == "A1"){
        //run for class a1
        spawn_table2(tbl_data[0], 1, "1A", false);
    }
    else if(SelectedClass == "B1"){
        //run for b1
        spawn_table2(tbl_data[1], 0, "1B", false);
    }
}   
