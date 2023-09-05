<?php

$w_top = '<html><head>
<link rel="stylesheet" href="./index_files/css/index.css">
</head><body>';
$w_bot = '</body></html>';
$w_menu = '
<img src ="./index_files/assets/bg.png" id ="bg_img">
<div id="box">
    <div class="text">
        Krissupport er desverre lagt ned :(
            <br>
            Hvis du vil se et arkiv av nettsiden, Klikk på knappen "Gå videre"
            <br>
            Har du lyst til å se arkiv av dokumentene våres, kan du det
            <br>
            MVh IT ansvarlig, og resten av Krissupport Teamet 
    </div>
    <div id="btn_align">
                <a href="./index_files/krissupport_website/index.html">
                    <div id="btn_1" class="btn">Gå videre -></div>
                </a>
                <a href="./index_files/documents/Forretningsmodell-Krissupport UB.docx">
                    <div id="btn_2" class="btn">Forretningsmodell.docx</div>
                </a>
                <a href="./index_files/documents/Forretningsplan-Krissupport UB.docx">
                    <div id="btn_3" class="btn">Forretningsplan.docx</div>
                </a>
                <!--
                <a href="./index_files/documents/Krissupport Delårsrapport.docx">
                    <div id="btn_4" class="btn">Delårsrapport.docx</div>
                </a>
                

                <a href="./index_files/documents/Krissupport årsrapport.docx">
                    <div id="btn_5" class="btn">Årsrapport.docx</div>
                </a>
                -->
                <a href="https://www.youtube.com/watch?v=NeexcW4ouXo">
                    <div id="btn_4" class="btn">Krissupport Intro Video.mp4</div>
                </a>
                <a href="./index_files/documents/Ny pitch powerpoint.pptx">
                    <div id="btn_5" class="btn">Pitch powerpoint.pptx</div>
                </a>

            </div>
    <div id="contact"><i>Kontakt: kontakt@krissupport.tk</i></div>
</div>
';




print $w_top;
print $w_menu;
print $w_bot;
?>