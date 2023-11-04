var CheckountStatusClosed = true; 
function init(){
    console.log("Init run");
    SpawnTable2Arr("TableArea", Headertable, Datatable); 
}

var Headertable = [
    'Image',
    'Model',
    'Producer',
    'Diameter',
    'Width',
    'Type', 
    'Price',
    'View Product',
    'Add to cart',
]
var Datatable = [
    [
        '0', //Tire id 
        'GenericTire.png', //Image
        'Snowproof 1',
        'Nokian Tyres',
        '16', 
        '205', 
        '2', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '1400', //price
        '0', //is in cart
    
    ],
    [
        '1', //Tire id 
        'GenericRim.png', //Image
        'C28',
        'CMS',
        '17', 
        '178', 
        '0', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '900', //price
        '0', //is in cart


    ],
    [
        "2",
        "GoodrideIceMasterSpikeZ-506.png",
        "IceMaster Spike Z-506",
        "Goodride",
        "17",
        "215",
        "3",
        '2500', //price
        '0', //is in cart
    ],
    [
        '3', //Tire id 
        'GenericTire.png', //Image
        'Setula W Race S130',
        'Rotalla',
        '16', 
        '205', 
        '2', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '1030', //price
        '0', //is in cart

    ],
    [
        '4', //Tire id 
        'GenericTire.png', //Image
        'UltraGrip Performance 3',
        'Goodyear',
        '16', 
        '205', 
        '2', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '1419', //price
        '0', //is in cart
    ],
    [
        '5', //Tire id 
        'GenericTire.png', //Image
        'SINCERA SN110',
        'Falken',
        '16', 
        '205', 
        '1', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '1148', //price
        '0', //is in cart
    ],

];
var TireAbout = [

    [
        "Dette dekket er fantastisk under vinteren. Ny nanoteknologi har gjort det mulig å elliminere dekkstøy, noe som styrker din komfort i bilen i kalde dager. ",
        "150",
    ],
    [],
    [],
    [],
    [],
    [],
    [],

]
var Tiretype = ["Rim", "Summer tire", "Winter (w/o spikes)" , "Winter (w spikes)", "Universal" ];

function SpawnTable2Arr(SpawnArea, HeaderArray, DataArray){
    const TableArea = document.getElementById(SpawnArea);
    const TableElement = document.createElement("table");
    TableElement.id = "Table01";
    TableElement.className = "Table";
    TableArea.appendChild(TableElement);

    //Summon table header
    const TableHeaderTableRow = document.createElement("tr");
    TableElement.appendChild(TableHeaderTableRow);
    const HeaderArrayLength = HeaderArray.length;
    for(let HeaderArrayPointer = 0; HeaderArrayPointer < HeaderArrayLength; HeaderArrayPointer ++){
        //Summon every header in table
        const TableHeader = document.createElement("th");
        TableHeader.innerHTML = HeaderArray[HeaderArrayPointer];
        TableHeaderTableRow.appendChild(TableHeader);
    }

    //Add data
    const TableRowLength = DataArray.length;
    for(let TableRowArrayPointer = 0; TableRowArrayPointer <TableRowLength ; TableRowArrayPointer ++ ){
        const CurrentTableRow = document.createElement("tr");
        TableElement.appendChild(CurrentTableRow);
        // Read data from array and place in td
        const CurrentTableDataLength = DataArray[TableRowArrayPointer].length;
        for(let CurrentTableDataPointer = 1; CurrentTableDataPointer <CurrentTableDataLength + 2; CurrentTableDataPointer ++ ){
            const CurrentTableData = document.createElement("td");           

            //add images and other data
            if(CurrentTableDataPointer == 1){
                const TableImage = document.createElement("img");
                TableImage.src = "./assets/img/tire/" + DataArray[TableRowArrayPointer][CurrentTableDataPointer];
                TableImage.className = "TableTire"; 
                CurrentTableData.appendChild(TableImage);
                CurrentTableRow.appendChild(CurrentTableData);
            }
            else if(CurrentTableDataPointer == 6){
                CurrentTableData.innerHTML = Tiretype[ DataArray[TableRowArrayPointer][CurrentTableDataPointer]];
                CurrentTableRow.appendChild(CurrentTableData);                
            }
            else if(CurrentTableDataPointer == 7){
                //Add price
                CurrentTableData.innerHTML = DataArray[TableRowArrayPointer][CurrentTableDataPointer] + "kr";
                CurrentTableRow.appendChild(CurrentTableData);
            } 
            else if(CurrentTableDataPointer == 8){
                const TableProduct = document.createElement("button");
                TableProduct.addEventListener("click", function(){
                    ViewProduct(DataArray[TableRowArrayPointer][0]);
                });
                TableProduct.innerHTML = "View product";
                CurrentTableData.appendChild(TableProduct);
                CurrentTableRow.appendChild(CurrentTableData);
            }
            else if(CurrentTableDataPointer == 9){
                //This is getting cursed, if not outright illegal
                const TableCart = document.createElement("img");
                TableCart.src = "./assets/img/cart-outline.svg";
                TableCart.className = "AddToCart";
                const ProdID = DataArray[TableRowArrayPointer][0];  
                TableCart.id = "prod_" + ProdID;                
                TableCart.addEventListener("click", function(){
                    AddCart(ProdID);
                });
                CurrentTableData.appendChild(TableCart);
                CurrentTableRow.appendChild(CurrentTableData);
            }
            else if(CurrentTableDataPointer == 4){
                //i am truly sorry for this disgrace
                CurrentTableData.innerHTML = DataArray[TableRowArrayPointer][CurrentTableDataPointer] + '"';
                CurrentTableRow.appendChild(CurrentTableData);
            }
            else if(CurrentTableDataPointer != 10){
                CurrentTableData.innerHTML = DataArray[TableRowArrayPointer][CurrentTableDataPointer];
                CurrentTableRow.appendChild(CurrentTableData);
            }


            
        }

    }

}


function ViewProduct(ProductId){
    const RootaboutElement = document.getElementById("AboutWindow");
    const RootSubDiv = document.createElement("div");
    RootSubDiv.id="rootSubDiv"; 
    RootaboutElement.appendChild( RootSubDiv);
    const About =  document.createElement("div");
    const Blur = document.createElement("div");
    About.id = "About";
    RootSubDiv.appendChild(About);    
    //create content blurry
    Blur.id = "blur";
    RootSubDiv.appendChild(Blur);    
    const closeBTN = document.createElement("img");
    closeBTN.id = "CloseBTN";
    closeBTN.src = "./assets/img/close.png";
    closeBTN.addEventListener("click", function(){
        RemoveProductAbout(); 
    })
    About.appendChild(closeBTN);

    const AboutText = document.createElement("div");
    AboutText.id = "AboutText";

    
    const CurrentTireData = Datatable[ProductId];
    const CurrentTireAbout = TireAbout[ProductId];
    if(CurrentTireAbout[0] == undefined || CurrentTireAbout[1] == undefined){
        AboutText.innerHTML = "We have no description for this product. Sorry :(";
    }
    else{
        //AboutText.innerHTML = CurrentTireAbout[0] + "<br>" + "Installasjonspris er: " + CurrentTireAbout[1] + "kr"; 
        AboutText.innerHTML = "<div id='AboutText1'>" + CurrentTireAbout[0] + "</div>" + "<div id='AboutText2'>Installasjonspris er: " + CurrentTireAbout[1] + "kr </div>" 
    }

    About.appendChild(AboutText);


}
function RemoveProductAbout(){
    //Removes about section (view product) for tires. This section was in ViewProduct(), but i had to split it up due to a bug
    const RootSubDiv = document.getElementById("rootSubDiv");
    RootSubDiv.remove();
}

function AddCart(ProductId){
    if(Datatable[ProductId][8] != "0"){
        //Change cart image for product in table 
        const CurrentCart = document.getElementById("prod_" + ProductId);
        CurrentCart.src =  "./assets/img/cart-outline.svg"; //empty
        Datatable[ProductId][8] = "0";
        UpdateCartNumber();
        if(!CheckountStatusClosed){
            DisplayCheckout();
            DisplayCheckout();
            //Reopen checkout screen if it was open (refresh content)
        }
    }
    else{
        Datatable[ProductId][8] = "1";
        //Change cart image for product in table 
        const CurrentCart = document.getElementById("prod_" + ProductId);
        CurrentCart.src = "./assets/img/cart.svg"; //full 
        UpdateCartNumber();
        if(!CheckountStatusClosed){
            DisplayCheckout();
            DisplayCheckout();
            //Reopen checkout screen if it was open (refresh content)
        }
    }
}
function DisplayCheckout(){
    const CheckOutWindowParent = document.getElementById("Checkout");
    let CartItemLength = 0
    for(let CartStatus = 0; CartStatus < Datatable.length; CartStatus ++){
        const CurrentCartStatus = Datatable[CartStatus][8];
        if(CurrentCartStatus == "1"){
            CartItemLength ++
        } 
    }    

    if(CheckountStatusClosed){
        //Open checkout
        CheckountStatusClosed = false;
        const CheckOutWindow = document.createElement("div");
        CheckOutWindow.className = "nav";
        CheckOutWindow.id = "CheckoutWindow";
        CheckOutWindowParent.appendChild(CheckOutWindow);

        //check if cart is full or empty
        //const CartItemLength = CartItems.length;
        if(CartItemLength == 0){
            const CartEmptyMessage = document.createElement("div");
            CartEmptyMessage.innerHTML = "Cart empty <br> Nothing to see here :)";
            CartEmptyMessage.className = "nav";
            CartEmptyMessage.id = "CartEmptymessage";
            CheckOutWindow.appendChild(CartEmptyMessage);
        }
        else{

            //Summon table
            const NewtableArea = document.createElement("div");
            NewtableArea.id = "CheckoutTable";
            NewtableArea.className = "nav";
            CheckOutWindow.appendChild(NewtableArea);
            const Newtable = document.createElement("table");
            Newtable.id = "CheckOutList";
            Newtable.class = "nav";
            NewtableArea.appendChild(Newtable);


            for(let CurrentItem = 0; CurrentItem < Datatable.length; CurrentItem ++){
                const CurrentCartStatus = Datatable[CurrentItem][8];
                const CurrentData =  Datatable[CurrentItem];
                if(CurrentCartStatus == "1"){
                    const CurrentProductId = CurrentData[0];
                    const NewtableDataRow = document.createElement('tr');
                    Newtable.appendChild(NewtableDataRow);
                    const NewtablecellModel = document.createElement('td');
                    const NewtablecellPrice = document.createElement('td');
                    const NewtablecellRemFromCart = document.createElement('td');
                    const NewtablecellRemFromCartBTN = document.createElement("button");
                    NewtablecellModel.innerHTML  = CurrentData[2];
                    NewtablecellPrice.innerHTML = CurrentData[7] + "kr";
                    NewtablecellRemFromCartBTN.addEventListener("click", function(){
                        AddCart(CurrentProductId);   
                    });
                    NewtablecellRemFromCartBTN.innerHTML = "Remove from cart";                    
                    NewtableDataRow.appendChild(NewtablecellModel);
                    NewtableDataRow.appendChild(NewtablecellPrice);
                    NewtableDataRow.appendChild(NewtablecellRemFromCart);
                    NewtableDataRow.appendChild(NewtablecellRemFromCartBTN);
                } 
            }           
                        
        }

    }
    else if(!CheckountStatusClosed){
        //Close the checkout         
        CheckountStatusClosed=true;
        const CheckOutWindow = document.getElementById("CheckoutWindow");
        CheckOutWindow.remove();
    }    
}

function UpdateCartNumber(){
    const CurrentItemInCartObject = document.getElementById("CheckoutItems");
    const CurrentCartImageObject = document.getElementById("CheckoutCart");
    //const CurrentItemsInCart = CartItems.length;
    let CartItemLength = 0;
    for(let CartStatus = 0; CartStatus < Datatable.length; CartStatus ++){
        const CurrentCartStatus = Datatable[CartStatus][8];
        if(CurrentCartStatus == "1"){
            CartItemLength ++
        } 
    }    
    if (CartItemLength > 0){
        CurrentItemInCartObject.innerHTML = CartItemLength;
        CurrentCartImageObject.src = "./assets/img/cart_full.svg";
    }
    else{
        CurrentItemInCartObject.innerHTML = "";
        CurrentCartImageObject.src = "./assets/img/cart-outline.svg";
    }
}

