<?php
$dir="./files/"; 
function file_date($filename){
    $dir="./files/";    
    return date ("d m Y H:i", filemtime($dir.$filename));
}

$folderDIR="./files";
$fileAmountDIR=(count(scandir($folderDIR))-1); 
$img="./indexfiles/icons/";
$img_ex=".png";
$web_top='
<html>
<head>
<link rel="stylesheet" href="index.css">
</head>
<body>';
$web_bottom="    
</body>
</html>";

print($web_top);

function truncate($input){
    if (strlen($input) > 10){
        $output= '('.substr($input, 0, 6)."...".').'.(substr($input, strpos($input, ".") + 1));
    }
    else{
        $output=$input;
    }
    
    return $output;    
}

function ShowFile($img_id,$ISviewable,$hasIcon,$dir,$fileName){
    if($hasIcon==1){

        if($ISviewable==1){
            //code            
            return '<img src="'.$img_id.'" class="image">';
        }     
        else{
            //IF file cannot be viewed, start download
            return '<a href="'.$dir.$fileName.'"><img src="'.$img_id.'" class="image"></a>';
        }

    }
    else{//if it's image
        return '<a href="'.$img_id.'"><img src="'.$img_id.'" class="image"></a>';
    }

    
}




for ($f_loop=2; $f_loop <= $fileAmountDIR; $f_loop++){
    $fileName=(scandir($folderDIR)[$f_loop]);
    $fileExtension=(substr($fileName, strpos($fileName, ".") + 1));

    //print ($fileName."<br>");   

    
    if($fileExtension=="php"){
        $file_description="Kode";
        //print("web<br>");
        $ISviewable=1;
        $img_id=$img."0".$img_ex;
        $hasIcon=1;

    }
    else{
        if($fileExtension=="html"){
            $file_description="Kode";
            //print("web<br>");
            $ISviewable=1;
            $img_id=$img."0".$img_ex;
            $hasIcon=1;
        }
        else{
            if($fileExtension=="css"){
                $file_description="Kode";
                //print("web<br>");
                $ISviewable=1;
                $img_id=$img."0".$img_ex;
                $hasIcon=1;
            } 
            else{
                if($fileExtension=="txt"){
                    $file_description="Tekst";
                    //print("tekst<br>");
                    $ISviewable=1;
                    $img_id=$img."1".$img_ex;
                    $hasIcon=1;
                }
                else{
                    if($fileExtension=="pdf"){
                        $file_description="Dokument";
                        //print("dokument<br>");
                        $ISviewable=0;
                        $img_id=$img."2".$img_ex;
                        $hasIcon=1;
                    }
                    else{
                        if($fileExtension=="jpg"){
                            $file_description="Bilde";
                            $ISviewable=1;
                            //
                            //
                            $img_id=$dir.$fileName;
                            $hasIcon=0;
                
                        }
                        else{
                            if($fileExtension=="png"){
                                $file_description="Bilde";
                                //print("bilde<br>");
                                $ISviewable=1;
                                //
                                //
                                $img_id=$dir.$fileName;
                                $hasIcon=0;
            
                            }
                            else{
                                if($fileExtension=="gif"){
                                    $file_description="Bilde";
                                    //print("animasjon<br>");
                                    $ISviewable=1;
                                    //
                                    //
                                    $img_id=$dir.$fileName;
                                    $hasIcon=0;
                                    
                                }
                                else{
                                    if($fileExtension=="doc"){
                                        $file_description="Dokument";
                                        //print("dokument<br>");
                                        $ISviewable=0;
                                        $img_id=$img."2".$img_ex;
                                        $hasIcon=1;
                                    }
                                    else{
                                        if($fileExtension=="docx"){
                                            $file_description="Dokument";
                                            //print("dokument<br>");
                                            $ISviewable=0;
                                            $img_id=$img."2".$img_ex;
                                            $hasIcon=1;
                                        }
                                        else{
                                            if($fileExtension=="xls"){
                                                $file_description="Skjema";
                                                //print("skjema<br>");
                                                $ISviewable=0;
                                                $img_id=$img."4".$img_ex;
                                                $hasIcon=1;
                                            }
                                            else{
                                                if($fileExtension=="xlsx"){
                                                    $file_description="Skjema";
                                                    //print("skjema<br>");
                                                    $ISviewable=0;
                                                    $img_id=$img."4".$img_ex;
                                                    $hasIcon=1;
                                                }
                                                else{
                                                    //print("annen fil<br>");
                                                    $file_description="Ukjent";
                                                    $ISviewable=0;
                                                    $img_id=$img."5".$img_ex;
                                                    $hasIcon=1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  

    //print($ISviewable."is viewable");

    //print($fileID);
    //print('<img src="'.$img_id.'">');
    $offset=($f_loop-2)*230;
    print('
    <div style="position:absolute;top:'.$offset.'px;">
    <div id="file_viewer_1" class="file_viewer">
    '.Showfile($img_id,$ISviewable,$hasIcon,$dir,$fileName).'         
    <div id="file_description" class="text">'.$file_description.'</div>
    <div id="filename" class="text">'.truncate($fileName).'</div>
    <div id="creation" class="text">Date '.file_date($fileName).'</div>
    </div>
    </div>
    ');



    print("<br><br>");
//For loop
}

print'
<div id="doceshow">

</div>


';

//Exit for loop
print($web_bottom);

?>