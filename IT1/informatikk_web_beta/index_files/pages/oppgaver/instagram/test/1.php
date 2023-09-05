<?php
$input = "font-family:'Courier New', Courier, monospace;";



$input_array = str_split($input);
$input_array_size = count($input_array) -1;
print '<code><code class="syntax">';
$is_syntax=0;
$is_syntax2=0;
for ($x=0; $x <= $input_array_size; $x++){
    $input_loop = $input_array[$x];
    
    if($input_loop == ':'){
        print '</code class="syntax"><code class="separator">'.$input_loop . '</code class="separator"><code class ="property">';
        $output[$x] = '</code class="syntax"><code class="separator">'.$input_loop . '</code class="separator"><code class ="property">';
        $is_syntax = 1;
    }
    elseif($input_loop == ';'){
        print '<code class="separator">'.$input_loop;
        $output[$x] = '<code class="separator">'.$input_loop;
        $is_syntax2=1;
    }
    else{
        print $input_loop;
        $output[$x] = $input_loop;
    }
    
    
}

if($is_syntax =1){
    print '</code>';
}
if($is_syntax=1){
    print '</code>';
}
print '</code>';










print('

<html><head>
    <link rel="stylesheet" href="test.css">
</head><body>

');







print('</body></html>'); 







?>