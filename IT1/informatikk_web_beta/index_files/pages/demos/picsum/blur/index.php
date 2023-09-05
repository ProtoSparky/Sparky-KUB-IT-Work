<?php
$w_bot = '</body>';
$refresh_time = 15; //in minutes

$refresh_time_calc = $refresh_time * 60;
//init

$rand_num = mt_rand(0,4);
if ($rand_num == 0){
    $wsize = 1920;
    $hsize = 1080;
    $isUW= 0;
}
elseif($rand_num == 1){
    $wsize = 2560;
    $hsize = 1440;
    $isUW= 0;
}
elseif($rand_num == 2){
    $wsize = 3840;
    $hsize = 1440;
    $isUW= 1;
}
elseif($rand_num == 3){
    $wsize = 3840;
    $hsize = 2160;
    $isUW= 0;
}
elseif($rand_num == 4){
    $wsize = 4000;
    $hsize = 3000;
    $isUW= 0;
}

if ($isUW == 0){
    $w_top = '<html><head>
    <link rel="stylesheet" href="index.css">
    </head><body>';
}
elseif ($isUW == 1){
    $w_top = '<html><head>
    <link rel="stylesheet" href="uw_index.css">
    </head><body>';
}

$imgLink = 'https://picsum.photos/'.$wsize.'/'.$hsize.'';

print $w_top;
print '<img src="'.$imgLink.'" class ="BGimg">'; 


print $w_bot;

header("Refresh:".$refresh_time_calc."");

?>