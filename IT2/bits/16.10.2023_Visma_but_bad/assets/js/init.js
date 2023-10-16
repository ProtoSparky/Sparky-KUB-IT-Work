function init(){
    const tbl_data = [
        [" ",           "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"], //Row 0
        ["08:00 - 10:00", "Mon R1", "Tue R1", "Wed R1" , "Thur R1", "Frid R1"], //Row 1
        ["10:00 - 12:00", "Mon R2", "Tue R2", "Wed R2" , "Thur R2", "Frid R2"], //Row 2     
        ["Lunsj        ", "      ", "      ", "      " , "       ", "       "], //Row 3
        ["13:30 - 14-30", "Mon R4", "Tue R4", "Wed R4" , "Thur R4", "Frid R4"], //Row 4
        ["14:30 - 16:00", "Mon R5", "Tue R5", "Wed R5" , "Thur R5", "Frid R5"]  //Row 5

        ];

    spawn_table2(tbl_data, 1, "1A");

    spawn_table2(tbl_data, 2, "1C");
    
}