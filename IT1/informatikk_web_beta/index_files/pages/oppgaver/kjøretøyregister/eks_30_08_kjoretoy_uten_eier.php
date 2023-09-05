<?php
include './skriv_error_log.php';
include("./db_connection.php");

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
//Avslutning
print '</table></body></html>';
?>