<?php
session_start();
require 'db_connection.php';

$sql ="create table if not exists tbl_trening_activities(
    id int(4) auto_increment primary key, activity varchar(20),
    calories int(4)
)";
mysqli_query($lenke,$sql);
//create db

function filter($input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $replacements = array();
    $replacements[0] = '';
    $replacements[1] = '';
    $replacements[2] = '';    
    $output=preg_replace($patterns, $replacements, $input);
    return ($output);
}

function max_length($input, $max_length) {
    if (strlen($input) > $max_length) {
        return substr($input, 0, $max_length);
    } else {
        return $input;
    }
}

function markdown_slim($input) {
    //rep **, *** to <b>, <i><b>
    $input = preg_replace('/\*\*\*(.+?)\*\*\*/', '<i><b>$1</b></i>', $input);
    $input = preg_replace('/\*\*(.+?)\*\*/', '<b>$1</b>', $input);    
    // rep * to <i> tags
    $input = preg_replace('/\*(.+?)\*/', '<i>$1</i>', $input);
    //creates a hyperlink
    $input = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a class="link" href="$2">$1</a>', $input);
    return $input;
}
//
//
//
$w_top = '
<html><head></head><body>';
$w_bot = '</body></html>';

$w_form_top = '        
<form method="POST" action ="" id="form">';
$w_form_mid='
<input type="datetime-local" name="dateTime" class="input" id="submitDateTime">
<input type="number" name="distanceInput" class="input" id="submitDistance" placeholder="Anntall / Meter" min="1">
<input type="number" name="timeInput" class="input" id="submitTime" placeholder="feks:5 min" min="1">
<input type="text" name="placeInput" class="input" placeholder="feks:KubenVgs">

<select name="activityIntencity" id="activityIntencity">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
</select>
';
$w_form_bot ='
<input type="submit" class="input" id="submit">';






print $w_top;
print $w_form_top;

//
//
//Print select buttons
$sql = "SELECT id, activity,calories FROM tbl_trening_activities";    
$result = $tilkopling->query($sql);

print '<select name="activityType" id="activity_type">';
while($row = $result->fetch_assoc()) {
    print '<option value="'.$row['activity'].'">'.$row['activity'].'</option>';
}
print '</select>';
//print select buttons

print $w_form_mid;
//
//


//
//
//Print select buttons name
$sql = "SELECT id, name, lastname, username FROM tbl_trening_pers2";    
$result = $tilkopling->query($sql);

print '<select name="activeUser" id="activeUser">';
while($row = $result->fetch_assoc()) {
    print '<option value="'.$row['username'].'">'.$row['name'].' '.$row['lastname'].'</option>';
}
print '</select>';
//print select buttons name
//
//



print $w_form_bot;
print $w_bot;

/*
$activity = "Aerobic";
$cal = 70;

$sql = "INSERT INTO tbl_trening_activities (activity, calories)
VALUES ('$activity','$cal')";
mysqli_query($lenke,$sql);
*/
    

if(!empty($_POST['activityType']) && !empty($_POST['dateTime']) && !empty($_POST['distanceInput']) && !empty($_POST['placeInput']) && !empty($_POST['activityIntencity']) && !empty($_POST['activeUser'])&& !empty($_POST['timeInput'])){
    $activity_type= filter($_POST['activityType']);
    $date_time = filter($_POST['dateTime']);
    $distance_input = filter($_POST['distanceInput']);
    $place_input = filter($_POST['placeInput']);
    $activity_intencity = filter($_POST['activityIntencity']);
    $active_user = filter($_POST['activeUser']);
    $time_input = filter($_POST['timeInput']);

    //print $activity_type.'<br>'.$date_time.'<br>'.$distance_input.'<br>'.$place_input.'<br>'.$activity_intencity.'<br>'.$active_user.'<br>'.$time_input;


    //$sql = "SELECT id, name, lastname, username FROM tbl_trening_pers2";  
    $sql = "SELECT * FROM tbl_trening_activities WHERE activity = '$activity_type' ";
    $result = $tilkopling->query($sql);
    while($row = $result->fetch_assoc()) {
        $calories = $row['calories'];
    }

    print $calories*$time_input;



}
else{
    print "No input";
}
    




?>