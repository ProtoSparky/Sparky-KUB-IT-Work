<?php

$saved_dir = './form_data/form.txt';
$chat_array = file($saved_dir);  
$max_var=3000;

session_start();
function filter($input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $replacements = array();
    $replacements[0] = ' ';
    $replacements[1] = ' ';
    $replacements[2] = ' ';    
    $output=preg_replace($patterns, $replacements, $input);
    return ($output);
}


function markdown($input) {
    //rep **, *** to <b>, <i><b>
    $input = preg_replace('/\*\*\*(.+?)\*\*\*/', '<i><b>$1</b></i>', $input);
    $input = preg_replace('/\*\*(.+?)\*\*/', '<b>$1</b>', $input);    
    // rep * to <i> tags
    $input = preg_replace('/\*(.+?)\*/', '<i>$1</i>', $input);
    //aligns text in center   
    $input = preg_replace('/,,(.+?),,/', '<div class="markdown_centered" style="text-align:center"">$1</div>', $input); 
    //adds space with §
    $input = str_replace('§', '&nbsp;', $input);
    // changes text size to smaller one
    $input = preg_replace('/##(.*?)##/', '<br><div class="text_small">$1</div>', $input);
    //creates a hyperlink
    $input = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a class="link" href="$2">$1</a>', $input);
    return $input;
}

$w_top= '<html>
<head>
<script type="text/javascript" src="../../../js/chart_loader.js"></script>
</head>
<body>';

$w_bot ='
</body>
</html>';

$w_form='
<form method="POST" action="">
<input type="number" name="bike_ride_input" id="bike_ride_input" max="30000">
<input type="submit" value="submit" name="submit" id="bike_ride_submit">
</form>';
print $w_top;
print $w_form;

//-----------------------------------------------------------------------------------
//------------------------------INIT-------------------------------------------------
//-----------------------------------------------------------------------------------
/*

if ($_SERVER['REQUEST_METHOD']=='POST'){
    $input=filter($_POST['bike_ride_input']);

    if (empty($input)){
        //input empty
        print "AAAAA";
       
    }
    else{
        //input defined
        $saved_num = $chat_array[0];    
        $input_defined = $input;
        $added = $saved_num + $input_defined; 
        file_put_contents($chat_dir, $added);
        $total_var = $max_var - $added;
        print '<meta http-equiv="refresh" content="0">';
       

    }
}
*/

if ($_SERVER['REQUEST_METHOD']=='POST'){
    if (empty($_POST['bike_ride_input'])){
        print "empty";
    }
    else{
        $input=filter($_POST['bike_ride_input']);
        //get from file
        $saved_num = $chat_array[0];
        $input_added = $saved_num + $input;
        $Delta_var  = $max_var - $input_added;
        if ($Delta_var <= 0){
            $Delta_var = 0;
        }
        print '<meta http-equiv="refresh" content="0">';
        file_put_contents($saved_dir, $input_added);



        //-----------------------------------------------------------------------------------
        //------------------------------CHART------------------------------------------------
        //-----------------------------------------------------------------------------------
        print '
        <script type="text/javascript">

            // Load the Visualization API and the corechart package.
            google.charts.load("current", {"packages":["corechart"]});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn("string", "Ferdig");
            data.addColumn("number", "Slices");
            data.addRows([
                ["Totalt", '.$Delta_var.'],
                ["Ferdig", '.$input_added.'],

            ]);

            // Set chart options
            var options = {"title":"Prosent ferdig",
                            "width":400,
                            "height":400};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
            chart.draw(data, options);
            }
        </script>';
        //-----------------------------------------------------------------------------------
        //------------------------------CHART------------------------------------------------
        //-----------------------------------------------------------------------------------

    }
}
else{
    print "not post";
}

//-----------------------------------------------------------------------------------
//------------------------------CHART------------------------------------------------
//-----------------------------------------------------------------------------------

$delta_num2 = $chat_array[0] - $max_var; 
print '
        <script type="text/javascript">

            // Load the Visualization API and the corechart package.
            google.charts.load("current", {"packages":["corechart"]});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn("string", "Ferdig");
            data.addColumn("number", "Slices");
            data.addRows([
                ["Totalt", '.$max_var.'],
                ["Ferdig", '.$delta_num2.'],

            ]);

            // Set chart options
            var options = {"title":"Prosent ferdig",
                            "width":400,
                            "height":400};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
            chart.draw(data, options);
            }
        </script>';
//-----------------------------------------------------------------------------------
//------------------------------CHART------------------------------------------------
//-----------------------------------------------------------------------------------








//-----------------------------------------------------------------------------------
//------------------------------WEB--------------------------------------------------
//-----------------------------------------------------------------------------------

print '<div id="chart_div"></div>';

print $w_bot;



?>