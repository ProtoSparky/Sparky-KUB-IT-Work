<?php
include './skriv_error_log.php';
include ("./db_connection.php");

//initialisering.
$websiden = '
    <h2>Opprette nytt kjoretoy</h2>
    <form method="POST" action="">
    <table>
    <tr><td>Registreringsnr.</td><td><input type="text" name="regnr" size="30"></td></tr>
    <tr><td>Velg type:</td><td>
        <input type="radio" id="moped" name="type" value="moped">
        <label for="moped">Moped</label><br>
        <input type="radio" id="motorsykkel" name="type" value="motorsykkel">
        <label for="motorsykkel">Motorsykkel</label><br>
        <input type="radio" id="traktor" name="type" value="traktor">
        <label for="traktor">Traktor</label><br>
        <input type="radio" id="personbil" name="type" value="personbil">
        <label for="personbil">Personbil</label><br>
        <input type="radio" id="varebil" name="type" value="varebil">
        <label for="varebil">Varebil</label><br>
    </td></tr>
    <tr><td>Produsent</td><td><input type="text" name="produsent" size="30"></td></tr>
    <tr><td>Modell</td><td><input type="text" name="modell" size="30"></td></tr>
    <tr><td>Ny farge</td><td><input type="text" name="farge" size="30"></td></tr>
    <tr><td>Velg drivstoff:</td><td>
        <input type="radio" id="bensin" name="drivstoff" value="bensin">
        <label for="bensin">Bensin</label><br>
        <input type="radio" id="diesel" name="drivstoff" value="diesel">
        <label for="diesel">Diesel</label><br>
        <input type="radio" id="elektrisk" name="drivstoff" value="elektrisk">
        <label for="elektrisk">Elektrisk</label>
    </td></tr>
    <tr><td>Send inn.</td><td><input type="submit" value="Ny eier" name="send_eier"></td></tr>
    </table>
    </form>';

//motta data fra form og send til database.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $regnr = $_POST['regnr'];
    $type = $_POST['type'];
    $produsent = $_POST['produsent'];
    $modell = $_POST['modell'];
    $farge = $_POST['farge'];
    $drivstoff = $_POST['drivstoff'];

    $sql = "INSERT INTO tbl_kjoretoy (regnr,type,produsent,modell,farge,drivstoff) 
            VALUES ('$regnr', '$type','$produsent','$modell','$farge','$drivstoff')";

    mysqli_query($lenke, $sql);
    mysqli_close($lenke);

    $websiden = '
        <div id="overskrift">Kjøretøy er registrert i databasen"</div>
        <div id="tekst">Ny person trykk på knapp. <a href="./eks_30_04_person_opprette.php"><button>person</button></a>
        <div id="tekst">Nytt kjøretøy, trykk på knapp.<a href= "./eks_30_05_kjoretoy_opprette.php"><button>Kjøretøy</button></a>';
        

}
//Vis webside.
print '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" type="text/css" href="./eks_30_01.css">
        </head><body><div id="ramme">';    
print $websiden;
print '</div></body></html>';

?>