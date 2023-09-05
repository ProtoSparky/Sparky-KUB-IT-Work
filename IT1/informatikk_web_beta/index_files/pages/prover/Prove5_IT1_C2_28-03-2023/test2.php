<?php

function test ($input1,$input2,$input3){
    print $input1;
    print $input2;
    print $input3;
}

$test = 'test,test2,test3';

test($test);

$params = explode(',', $str);
call_user_func_array(array($this->ModelName, 'functionname'), $params);


?>