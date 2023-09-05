<?php
include './skriv_error_log.php';
include ("./db_connection.php");

//initialisering.
$websiden = '
    <h2>Opprette ny eier</h2>
    <form method="POST" action="">
    <table>
    <tr><td>Personnr.</td><td><input type="number" name="personnr" size="30"></td></tr>
    <tr><td>Fornavn.</td><td><input type="text" name="fornavn" size="30"></td></tr>
    <tr><td>Etternavn.</td><td><input type="text" name="etternavn" size="30"></td></tr>
    <tr><td>Adresse.</td><td><input type="text" name="adresse" size="30"></td></tr>
    <tr><td>telefon.</td><td><input type="number" name="telefonnr" size="30"></td></tr>
    <tr><td>epost.</td><td><input type="text" name="epost" size="30"></td></tr>
    <tr><td>Send inn.</td><td><input type="submit" value="Ny eier" name="send_eier"></td></tr>
    </table>
    </form>
    ';
    
//motta data fra form og send til database.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $personnr = $_POST['personnr'];
    $fornavn = $_POST['fornavn'];
    $etternavn = $_POST['etternavn'];
    $adresse = $_POST['adresse'];
    $postnr = $_POST['postnr'];
    $telefonnr = $_POST['telefonnr'];
    $epost = $_POST['epost'];

    $sql = "INSERT INTO tbl_person (personnr,fornavn,etternavn,adresse,telefonnr,epost) 
            VALUES ('$personnr', '$fornavn','$etternavn','$adresse','$postnr','$telefonnr','$epost')";

    mysqli_query($lenke, $sql);
    mysqli_close($lenke);

    $websiden = '
        <div id="overskrift">Person er registrert i databasen"</div>
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