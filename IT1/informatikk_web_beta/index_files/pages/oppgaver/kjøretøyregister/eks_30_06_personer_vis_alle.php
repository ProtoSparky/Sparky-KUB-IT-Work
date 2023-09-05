<?php
include './skriv_error_log.php';
include("./db_connection.php");

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
//Avslutning
print '</table></body></html>';
?>