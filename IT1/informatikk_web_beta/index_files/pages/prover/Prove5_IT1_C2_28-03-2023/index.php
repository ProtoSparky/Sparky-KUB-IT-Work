<?php 
session_start();
$file_input_csv_dir = './Vannforing_Solbergfoss.csv';
$file_input_array = file($file_input_csv_dir);
$date1= "2023-03-01";
$date2= "2023-03-02";
$date3= "2023-03-03";
$date4= "2023-03-04";
$date5= "2023-03-05";
$date6= "2023-03-06";
$date7= "2023-03-07";
$for_pointer=0;
$saved_dir = './saved/1.csv';

foreach($file_input_array as $file_input_array_currLI){
    
    //split lines
    
    if (str_contains($file_input_array_currLI, $date1)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;     
    }
    elseif (str_contains($file_input_array_currLI, $date2)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    elseif (str_contains($file_input_array_currLI, $date3)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    elseif (str_contains($file_input_array_currLI, $date4)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    elseif (str_contains($file_input_array_currLI, $date5)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    elseif (str_contains($file_input_array_currLI, $date6)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    elseif (str_contains($file_input_array_currLI, $date7)){
        $for_pointer++;
        //print $file_input_array_currLI;
        //print "<br>";
       $clean_array[$for_pointer]= $file_input_array_currLI;
    }
    else{

    }
}

//print_R($clean_array);

$cleaned = implode ("\r\n", $clean_array);

file_put_contents($saved_dir, $cleaned.PHP_EOL , FILE_APPEND | LOCK_EX);

$saved_array=(file($saved_dir));
foreach ($saved_array as $printed_text){
    
    print $printed_text;
    print "<br>";
    $value= substr($printed_text, 21);
    print $value."<br>";
}












//print_r($clean_array);
/*
$input_place_1[]
$input_place_2[]
$input_place_3[]
$input_place_4[]
$input_place_5[]
*/

?>