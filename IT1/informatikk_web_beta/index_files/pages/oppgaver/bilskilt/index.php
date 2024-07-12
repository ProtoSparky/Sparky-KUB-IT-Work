<?php
//------------------------------------------------------------------------------------------
//sorry for forferdelig kode... jeg har ikke den mentale kapasiteten til å fikse det opp nå
//------------------------------------------------------------------------------------------

//Call input.html
//require('data_input.html');
//-------------------------------------------------------------------------------


//Init variables
$time=time();
$MaxCharLength=620;
$table_top='<table>
<th id="th_reg">Registreringsnummer&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Bilmerke&nbsp;&nbsp;&nbsp;</th>
<th>Bilmodell&nbsp;&nbsp;&nbsp;</th>
<th>Produksjonsår&nbsp;&nbsp;&nbsp;</th>
<th>Bilfarge</th>
';
$table_bottom='</table>';
$dir='./webs/submit/';
$array = scandir($dir);
$arrayLength= count($array);
$year=date('Y');

//WEB page
$web='
<html>
    <head>
        <title>Bil registrering</title>
        <link rel="stylesheet" href="./webs/css/index.css">
    </head>
    <body>
        <br><br><br><br><form action="" method="POST" id="form">
                    <label for="car_let" class="text" id="reg_text">Registreringsnummer</label>
                    <input type="text"  name="car_let" id="car_let" class="input_field" required minlength="2" maxlength="10" placeholder="AB">
                    <label for="car_num"></label>
                    <input type="text"  name="car_num" id="car_num" class="input_field" required  maxlength="5" placeholder="feks: 12345">
                    <!--car numberplate-->

                    <label for="car_name"class="text" id="name_text">Bil merke</label>
                    <input type="text"  name="car_name" id="car_name" class="input_field" required minlength="1" maxlength="50" placeholder="feks:bmw">
                    <label for="car_model" class="text" id="model_text">Bil modell</label>
                    <input type="text"  name="car_model" id="car_model" class="input_field" required  maxlength="50"> 

                    <!--car manufacturer and model-->

                    <label for="car_color" class="text" id="color_text">Bil farge (RGB)</label>
                    <input type="number"  name="car_colorR" id="car_colorR" class="input_field" required minlength="3" maxlength="3" min="0" max="255">
                    <input type="number" name="car_colorG" id="car_colorG" class="input_field" required minlength="3" maxlength="3" min="0" max="255">
                    <input type="number"  name="car_colorB" id="car_colorB" class="input_field" required minlength="3" maxlength="3" min="0" max="255"> 

                    <!--car color-->

                    <label for="car_year" class="text" id="year_text">Produkjsonsår</label>
                    <input type="number"  name="car_year" id="car_year" class="input_field" required minlength="4" maxlength="4" min="1880" max="'.$year.'" placeholder="feks: 2021">

                    <!--car manufacturing year-->
                    <input type="submit" value="Send inn" name="submit" id="submit" class="input_button"> 
            </form>       
    </body>     
</html>
';

//-------------------------------------------------------------------------------

//Txt filtering for info tekst
$patterns = array();
$patterns[0] = '/</';
$patterns[1] = '/>/';
$patterns[2] = '/[\$,]/';

$replacements = array();
$replacements[0] = '{{Less}}';
$replacements[1] = '{{More}}';
$replacements[2] = '{{DOLL}}';
//-------------------------------------------------------------------------------

//gather inputs
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $car_let_unfil = $_POST['car_let'];
    $car_num_unfil = $_POST['car_num'];
    $car_name_unfil = $_POST['car_name'];
    $car_model_unfil = $_POST['car_model'];
    $car_year_unfil = $_POST['car_year'];
    $car_colorR_unfil = $_POST['car_colorR'];
    $car_colorG_unfil = $_POST['car_colorG'];
    $car_colorB_unfil = $_POST['car_colorB'];
    

    if (empty($car_let_unfil||$car_num_unfil||$car_name_unfil||$car_model_unfil||$car_year_unfil||$car_colorR_unfil||$car_colorG_unfil||$car_colorB_unfil )){
        
    }
    
}

//-------------------------------------------------------------------------------

//print web page
print($web);
print '<div id="text">';
print("<br><br><br>".$table_top);
for ($x = 2; $x <= $arrayLength - 1; $x+=1) {
    $xOffset= $x -1;
    $form_start = file_get_contents( "$dir$array[$x]" );
    echo $form_start;
}
print($table_bottom);
print '</div>';

//-------------------------------------------------------------------------------



?>
