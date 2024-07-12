<?php
include './skriv_error_log.php';
include("./db_connection.php");


/////////// VELG KJORETOY //////////////////

$teller = 0;
$sql = "SELECT * FROM tbl_kjoretoy WHERE eier IS NULL";
$resultat = mysqli_query($lenke,$sql);
//print_r($resultat);    //Kun for test.

while ($row = mysqli_fetch_array($resultat)) { 
    $idnummer[$teller] = $row["id"];
    $regnr[$teller] = $row["regnr"];
    $type[$teller] = $row["type"];
    $produsent[$teller] = $row["produsent"];
    $modell[$teller] = $row["modell"];
    $farge[$teller] = $row["farge"];
    $drivstoff[$teller] = $row["drivstoff"];
    $eier[$teller] = $row["eier"];
    $teller = $teller+1;
    }
mysqli_close($tilkopling);
    


//////// Utskrift ///////

print '<html><head></head><body><table>
    <tr><td>ID</td><td>regnr</td><td>type</td>
    <td>produsent</td><td>modell</td>
    <td>farge</td><td>drivstoff</td><td>eier</td></tr>';

$antallrow = $teller;

//List alle rader fra database.
for($a=0;$a<=$antallrow;$a++) {
    print '<tr><td>'.$idnummer[$a].'</td><td>'.$regnr[$a].'</td>';
    print '<td>'.$type[$a].'</td><td>'.$produsent[$a].'</td>';
    print '<td>'.$modell[$a].'</td>';
    print '<td>'.$farge[$a].'</td>';
    print '<td>'.$drivstoff[$a].'</td>';
    print '<td>'.$eier[$a].'</td></tr>';
}


/////////////////  Velg person. ///////////////

$teller = 0;
$sql = "SELECT * FROM tbl_person";
$resultat = mysqli_query($lenke,$sql);
//print_r($resultat);    //Kun for test.

while ($row = mysqli_fetch_array($resultat)) { 
    $idnummer[$teller] = $row["id"];
    $personnr[$teller] = $row["personnr"];
    $fornavn[$teller] = $row["fornavn"];
    $etternavn[$teller] = $row["etternavn"];
    $adresse[$teller] = $row["adresse"];
    $postnr[$teller] = $row["postnr"];
    $telefonnr[$teller] = $row["telefonnr"];
    $epost[$teller] = $row["epost"];
    $teller = $teller+1;
    }
mysqli_close($tilkopling);

//////// Utskrift ///////

print '<html><head></head><body><table>
    <tr><td>ID</td><td>personnr</td><td>fornavn</td><td>etternavn</td>
    <td>adresse</td><td>postnr</td>
    <td>telefonnr</td><td>epost</td></tr>';

$antallrow = $teller;

//List alle rader fra database.
for($a=0;$a<=$antallrow;$a++) {
    print '<tr><td>'.$idnummer[$a].'</td><td>'.$personnr[$a].'</td><td>'.$fornavn[$a].'</td>';
    print '<td>'.$etternavn[$a].'</td><td>'.$adresse[$a].'</td>';
    print '<td>'.$postnr[$a].'</td>';
    print '<td>'.$telefonnr[$a].'</td>';
    print '<td>'.$epost[$a].'</td></tr>';
}

print '</table>';

//////////// VELG BIL OG PERSON /////////////////////

//Valg av bilregistrering som skal oppdateres.
//print heading til visning.
print '<html><head></head><body>';
print '<h2>Velg hvilken bil som skal oppdateres. </h2>';
print '<form method = "POST" action = "./eks_30_09B_kjoretoy_sett_eier.php" name="oppdatere">';
print '<select size = "1" name = "registreringsnummer">';

//antall rader som er skrevet ut i arrayform.
$antallrowA = count($regnr);

//list alle valgte rader ut i tabell
for($a = 0; $a <= $antallrowA; $a++) {
print '<option Value"'.$regnr[$a].'">'.$regnr[$a].'</option>';
}


print '<select size = "1" name = "personnummer">';
//antall rader som er skrevet ut i arrayform.
$antallrowB = count($personnr);

//list alle valgte rader ut i tabell
for($b = 0; $b <= $antallrowB; $b++) {
print '<option Value"'.$personnr[$b].'">'.$personnr[$b].'</option>';
}


print '</select><p></p>';
print '</p><input type="submit" value="Send valgt nummer for oppdatering" name="send_valg">';
//print avslutning paa visning.
print '</form></body></html>';


//Avslutning
print '</body></html>';
?>