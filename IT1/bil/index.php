<?php


//functions
function addspaces($str) {
    $result = "";
    $count = 0;
    for ($i = 0; $i < strlen($str); $i++) {
      $char = $str[$i];
      if (is_numeric($char)) {
        $count++;
        if ($count % 2 === 0) {
          $result .= " " . $char;
        } else {
          $result .= $char;
        }
      } else {
        $result .= $char;
        $count = 0;
      }
    }
    return $result;
}

function filter($input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $replacements = array();
    $replacements[0] = ' ';
    $replacements[1] = ' ';
    $replacements[2] = ' ';
    $output=preg_replace($patterns, $replacements, $input);
    return ($output);
}

// remove / in date selector on input
function filtered_date($date_in){
    return preg_replace("/-/", " ", $date_in);
}
//remove - in date
function age_calc($date_input, $currentyear_in){       
    $filtered = preg_replace("/\//", "", $date_input);
    $input_year=substr($filtered, 0, 4);
    return $output=$currentyear_in- $input_year;
}

//End of functions


//WEB-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

$date=date("d/m/Y");
$time= date("h:i:sa");
$currentyear= date("Y");
$time_num=time();
$top='
<html>
<head>
</head>
<head>';

$form='

<form action="" method="POST">

<label for="social_sec_date" class="text" id="social_sec_date">Fødselsdato</label>
<input type="date" name="social_sec_date" id="social_sec_date_input" class="input_field" pattern="\d{4}-\d{2}-\d{2}" required>

<label for="social_sec_num" class="text" id="social_sec_num">Person-numer</label>
<input type="number" name="social_sec_num" id="social_sec_num_input" class="input_field" min="0000" max="99999" required>



<!--Weight-->

<label for="weight" class="text" id="weight">vekt</label>
<input type="number" name="weight" id="weight_input" class="input_field" min="30" max="300" required>

<!--Height-->

<label for="height" class="text" id="height">høyde</label>
<input type="number" name="height" id="height_input" step="0.01" class="input_field" min="1.20" max="2.20" required>

<!--gender-->
<label for="male" class="text" id="gender" class="radio">Mann</label>
<input type="radio" name="gender" id="male" class="radio" value="male">

<label for="female" class="text" id="gender" class="radio">Dame</label>
<input type="radio" name="gender" id="female" value="female" class="radio" checked="checked">

<!--submit-->
<input type="submit" name="submit" class="submit" id="submit">


';
$bottom='
</head>
</html>';

$table_top='        
<table>
<tr>
<th style="padding:0 15px 0 15px;">Klasifisering</th>
<th style="padding:0 15px 0 15px;">Kjønn</th>
<th style="padding:0 15px 0 15px;">Vekt</th>
<th style="padding:0 15px 0 15px;">Høyde</th>
<th style="padding:0 15px 0 15px;">BMI</th>
<th style="padding:0 15px 0 15px;">Alder</th>
<th style="padding:0 15px 0 15px;">Personummer</th>
<th style="padding:0 15px 0 15px;">Dato lagret</th>
<th style="padding:0 15px 0 15px;">Helsevarsel</th>
</tr>

';

$table_bottom ="            
</tr>
</table>
";






//END OF WEB---------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

$social_sec_date_unfil=0;
$social_sec_num_unfil=0;
$weight_unfil=0;
$height_unfil=0;

//get post

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $social_sec_date_unfil = $_POST['social_sec_date'];
    $social_sec_num_unfil = $_POST['social_sec_num'];
    $weight_unfil = $_POST['weight'];
    $height_unfil = $_POST['height'];
    $gender_unfil = $_POST['gender'];
}

//check if input is in memory


if (empty($social_sec_date_unfil||$weight_unfil||$height_unfil||$social_sec_num_unfil)){
    $social_sec_date_unfil=0;
    $social_sec_num_unfil=0;
    $weight_unfil=0;
    $height_unfil=0;
    $gender_unfil="female";

}
else {
    $social_sec_date= filter($social_sec_date_unfil);
    $weight=filter($weight_unfil);
    $height=filter($height_unfil);
    $gender=filter($gender_unfil);
    $social_sec_num=filter($social_sec_num_unfil);
    //filter

    $bmi=($weight/($height*$height));


    //klasifisering




    if ($bmi <= 18.4 ){
        $status="Undervekt";
        $info="Risiko for helseproblemer";
    }
    else {
        if (($bmi >= 18.5) && ($bmi <= 24.9)){
            $status="Normalvekt";
            $info="lav risiko for helseproblemer";
        }
        else{
            if (($bmi >= 25) && ($bmi <= 29.9)){
                $status="Overvekt";
                $info="Økt risiko for diabetes";
            }
            else{
                if (($bmi >= 30) && ($bmi <= 34.9)){
                    $status="Fedme grad 1";
                    $info="Økt risiko for diabetes - Økt risiko for dødelighet.";
                }
                else {
                    if (($bmi >= 35) && ($bmi <= 39.9)){
                        $status="Fedme grad 2";
                        $info="Høy risiko for flere helseproblemer - Økt dødelighet.";
                    }
                    else{
                        if (($bmi >= 40)){
                            $status="Fedme grad 3";
                            $info="Økt helserisiko";
                        }
                    }
                }
            }
        }
    }




$debug = "<br>Din BMI test er registrert ". $date. " klokka ".$time. "."." <br>Din personummer er ".$social_sec_date. " og ditt kjønn er ". $gender. "<br> Din BMI er ".$bmi. " og din klassifisering er ".$status. " altså ". $info; 




//Wirite to file
$MaxCharLength=620;

if ((age_calc($social_sec_date,$currentyear) <=18) || (age_calc($social_sec_date,$currentyear) >=70) ){
    $wrt='<tr>
    <td style="padding:0 15px 0 15px;">'.$status.'</td>
    <td style="padding:0 15px 0 15px;">'.$gender.'</td>
    <td style="padding:0 15px 0 15px;">'.$weight.'kg'.'</td>
    <td style="padding:0 15px 0 15px;">'.$height.'m'.'</td>
    <td style="padding:0 15px 0 15px;">'.round($bmi,2).'</td>
    <td style="padding:0 15px 0 15px;">'.age_calc($social_sec_date,$currentyear).' Bruk ISO BMI'.'</td>
    <td style="padding:0 15px 0 15px;">'.filtered_date($social_sec_date).addspaces($social_sec_num).'</td>
    <td style="padding:0 15px 0 15px;">'.$date.' '.$time.'</td>
    <td style="padding:0 15px 0 15px;">'.$info.'</td>
    </tr>
    ';
    
}

else{
    $wrt='<tr>
    <td style="padding:0 15px 0 15px;">'.$status.'</td>
    <td style="padding:0 15px 0 15px;">'.$gender.'</td>
    <td style="padding:0 15px 0 15px;">'.$weight.'kg'.'</td>
    <td style="padding:0 15px 0 15px;">'.$height.'m'.'</td>
    <td style="padding:0 15px 0 15px;">'.round($bmi,2).'</td>
    <td style="padding:0 15px 0 15px;">'.age_calc($social_sec_date,$currentyear).'</td>
    <td style="padding:0 15px 0 15px;">'.filtered_date($social_sec_date).addspaces($social_sec_num).'</td>
    <td style="padding:0 15px 0 15px;">'.$date.' '.$time.'</td>
    <td style="padding:0 15px 0 15px;">'.$info.'</td>
    </tr>
    ';

}

if (empty($status)){
    //
}
    else{
        if ($status=="Undervekt"){
            //undervekt

            $file = fopen("./submit/Undervekt/$time_num.txt", "w") or die("No write permissions... Aborting");
            $output=$wrt;
            fwrite($file,$output,$MaxCharLength);
            fclose($file);
            
        }
        else{
            if($status=="Normalvekt"){
            //Normalvekt
            $file = fopen("./submit/Normalvekt/$time_num.txt", "w") or die("No write permissions... Aborting");
            $output=$wrt;
            fwrite($file,$output,$MaxCharLength);
            fclose($file);
            }
            else{
                if($status=="Overvekt"){
                    //Overvekt
                    $file = fopen("./submit/Overvekt/$time_num.txt", "w") or die("No write permissions... Aborting");
                    $output=$wrt;
                    fwrite($file,$output,$MaxCharLength);
                    fclose($file);
                }
                else{
                    if($status=="Fedme grad 1"){
                        //Fedme grad 1            
                        $file = fopen("./submit/Fedme_gr1/$time_num.txt", "w") or die("No write permissions... Aborting");
                        $output=$wrt;
                        fwrite($file,$output,$MaxCharLength);
                        fclose($file);
                        
                    }
                    else{
                        if($status=="Fedme grad 2"){
                            //Fedme grad 2                
                            $file = fopen("./submit/Fedme_gr2/$time_num.txt", "w") or die("No write permissions... Aborting");
                            $output=$wrt;
                            fwrite($file,$output,$MaxCharLength);
                            fclose($file);
                            
                        }
                        else{
                            if($status=="Fedme grad 3"){
                                //Fedme grad 3                        
                                $file = fopen("./submit/Fedme_gr3/$time_num.txt", "w") or die("No write permissions... Aborting");
                                $output=$wrt;
                                fwrite($file,$output,$MaxCharLength);
                                fclose($file);
                                
                            }
                            else{
                                $error=("Feithet for stor");
                            }
                            
                        }
                    }
                }
            }
        }
        




        
    }

}

//removes multiple requests
if(isset($_POST['submit'])) {
$file = './submit/Receipt/92.txt';
header("Refresh:3");

//if (file_exists($file)) {
//  header('Content-Description: File Transfer');
//  header('Content-Type: application/octet-stream');
//  header('Content-Disposition: attachment; filename="'.basename($file).'"');
//  header('Expires: 0');
//  header('Cache-Control: must-revalidate');
//  header('Pragma: public');
//  header('Content-Length: ' . filesize($file));
//  readfile($file);
//  exit;
    

//}


}

//print-------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

print($top);
print ($form);

if (empty($error)){
    //
}
else{
    print $error;
}


//undervekt---------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Undervekt/';
$array = scandir($dir);
$arrayLength= count($array);
print($table_top);
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}
//normalvekt--------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Normalvekt/';
$array = scandir($dir);
$arrayLength= count($array);

for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}

//Overvekt----------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Overvekt/';
$array = scandir($dir);
$arrayLength= count($array);
print("<br>");
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}
//Fedme gr1---------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Fedme_gr1/';
$array = scandir($dir);
$arrayLength= count($array);
print("<br>");
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}
//Fedme gr2---------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Fedme_gr2/';
$array = scandir($dir);
$arrayLength= count($array);
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}
//Fedme gr3---------------------------------------------------------------
//------------------------------------------------------------------------
$dir='./submit/Fedme_gr3/';
$array = scandir($dir);
$arrayLength= count($array);
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}





if (empty($table_bottom)){
    //
}
else{
    print $table_bottom;
}



//End of table print------------------------------------------------------
//------------------------------------------------------------------------


print($bottom);
?>