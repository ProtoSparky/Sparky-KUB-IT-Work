<?php
$img_dir="./index_files/images";
$img_array=scandir($img_dir);
$img_array_size = count($img_array);
$img_pointer_max_size = $img_array_size -1;
session_start();


//INIT

$w_top = '    
<head>
    <link rel="stylesheet" href="./index_files/page_assets/css/index.css">
</head>
<body>
    <div class="center">';
$w_bot='
</div>
</div>
</body>
</html>';

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////PRINT POSTS/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
print $w_top;
$img_offset = 0;
for($img_pointer = 2; $img_pointer <= $img_pointer_max_size; $img_pointer++){
    //print $img_array[$img_pointer];  
    list($img_width, $img_height) = getimagesize('./index_files/images/'.$img_array[$img_pointer]);  
    //$img_pointer2 = $img_width.' '.$img_height;
    if($img_height > $img_width){
        print '    
        <div class="post" style="top:'.$img_offset.'px;">
            <div class="image_centerer">
                <img class="image_tall" src="./index_files/images/'.$img_array[$img_pointer].'">
            </div>
            <div class="like_bar">

            <form action="" method="POST">
                <input type="hidden" name="like" value="'.$img_pointer.'">
                <input type="image" class="like" alt="like"src="./index_files/page_assets/likes/sel.png">
                
            </form>  
                <div class="like_count"> ID'.$img_pointer.'</div>
            </div>
        </div>    
        ';
    }
    else{
        print '    
        <div class="post" style="top:'.$img_offset.'px;">
            <div class="image_centerer">
                <img class="image" src="./index_files/images/'.$img_array[$img_pointer].'">
            </div>
            <div class="like_bar">

                <form action="" method="POST">
                    <input type="hidden" name="like" value="'.$img_pointer.'">
                    <input type="image" class="like" alt="like"src="./index_files/page_assets/likes/un_sel.png">
                    
                </form>  
                <div class="like_count"> ID'.$img_pointer.'</div>
            </div>
        </div>    
        ';
        
    }

    $img_offset = $img_offset + 350;
}
$load_btn_offset = $img_offset +100;

print '
<a class="load_btn" style="top:'.$load_btn_offset.'" href="######">
    <div class="load_btn_txt">
        Load more?
    </div>
</a> 

';
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////PRINT POSTS/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////




if(!empty($_POST['like'])){       
    for($like_pointer = 2; $like_pointer <= $img_pointer_max_size; $like_pointer++){   
        if(!empty($_SESSION['liked'][$like_pointer])){
            //check if like array is empty and set to 0    
            $_SESSION['liked'][$like_pointer] = 0;
            
              
            
            
        }
        else{
            //run coe if session is defined           

            if ($_SESSION['liked'][$like_pointer] == 0){
                // run code if image is not yet liked
                
                

                if($like_pointer == $_POST['like']){
                    print "session";
                    
                }
                
    
            }
            else{
                //run code if if image is liked
                print $like_pointer. " is 1";
                print "<br>";
            }
        }





        /*
        print_r($_SESSION['liked']);
        print "<br>";

        */


     

        /*
        if(!isset($_SESSION['liked'][$like_pointer])){
            //run code
            print "running code";
        }
        else{
            print "trying to def liked @ ". $like_pointer;
            print "<br>";
            $_SESSION['liked']=[$like_pointer][0];
        }
        

        if($_SESSION['liked'] == [$like_pointer][1]){
            print $like_pointer." already liked";
        } 
        else{
            $_SESSION['liked'] = [$_POST['like']][1];
        }*/
    }


}
else{
    //donothing
}




print $w_bot;




?>