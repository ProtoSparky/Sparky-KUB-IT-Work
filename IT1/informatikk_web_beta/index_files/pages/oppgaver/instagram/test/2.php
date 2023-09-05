<?php



$input = 4;

$power_of = 21;  
$number_equal_to_power = 0;

/*
if($number_equal_to_power == 0){
    for($x = 1; $x <= $power_of; $x++){
        $output = $input ** $x;     
        if ($x == $power_of){
            print number_format($output, 1);
            print "<br>"; 
            print "<br>";
            print  "Total different combinations: ".number_format($output, 1);
        }
        else{
            print number_format($output, 1);
            print "<br>"; 
        }
    
        
    }
}
else{
    for($x = 1; $x <= $input; $x++){
        $output = $input ** $x;     
        print number_format($output, 1);
        print "<br>";  
    
        
    }
}
*/
$x = 2;
while(true){
    $x++;
    print number_format(($input ** $x), 1);
    print "<br>";
}









?>