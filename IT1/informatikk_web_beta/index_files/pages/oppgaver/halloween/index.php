<?php
//Opprette variabel, gi den et tilfeldig tall(0,2)
$tilfeldig = mt_rand(0,2);

//En funksjon er en samling programkode.
//Eksekveres, kjøres, når den aktiveres.
function visWebside($tilfeldig){
if ($tilfeldig == 0) {
include "filA.php";
}
elseif ($tilfeldig == 1){
include "filB.php";
}
elseif ($tilfeldig == 2){
include "filC.php";
}
else {
$tilfeldig = mt_rand(0,2);
visWebside($tilfeldig);
}
}
//funksjonskall
visWebside($tilfeldig);

?>