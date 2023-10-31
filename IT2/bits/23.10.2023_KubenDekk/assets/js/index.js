var CartItems = [];
var CheckountStatusClosed = true; 
function init(){
    console.log("Inut run");
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
    //Tire 1
    [
        '0', //Tire id 
        'GenericTire.png', //Image
        'Snowproof 1',
        'Nokian Tyres',
        '16', 
        '205', 
        '2', //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
        '1400', //price
    
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
    ],

];
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
            else{
                CurrentTableData.innerHTML = DataArray[TableRowArrayPointer][CurrentTableDataPointer];
                CurrentTableRow.appendChild(CurrentTableData);
            }     
            



            
        }

    }

}


function ViewProduct(ProductId){
    console.log(ProductId);
}

function AddCart(ProductId){
    const index = CartItems.indexOf(ProductId);
    if (index === -1) {
        // checks if product id is not in array, then adds it
        CartItems.push(ProductId);
        UpdateCartNumber();
        if(!CheckountStatusClosed){
            DisplayCheckout();
            DisplayCheckout();
            //Reopen checkout screen if it was open (refresh content)

        }
        //Change cart image for product in table 
        const CurrentCart = document.getElementById("prod_" + ProductId);
        CurrentCart.src = "./assets/img/cart.svg";
        
    } else {
        
        //Checks if product id is in array, then removes it
        CartItems.splice(index, 1);
        UpdateCartNumber();
        if(!CheckountStatusClosed){
            DisplayCheckout();
            DisplayCheckout();
            //Reopen checkout screen if it was open (refresh content)
        }

        //Change cart image for product in table 
        const CurrentCart = document.getElementById("prod_" + ProductId);
        CurrentCart.src =  "./assets/img/cart-outline.svg";
    }
    //console.log(CartItems);
}
function DisplayCheckout(){
    const CheckOutWindowParent = document.getElementById("Checkout");
    if(CheckountStatusClosed){
        //Open checkout
        CheckountStatusClosed = false;
        const CheckOutWindow = document.createElement("div");
        CheckOutWindow.className = "nav";
        CheckOutWindow.id = "CheckoutWindow";
        CheckOutWindowParent.appendChild(CheckOutWindow);

        //check if cart is full or empty
        const CartItemLength = CartItems.length;
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

            //console.log(CartItems);
            const DataTableLength = Datatable.length;
            for(let ProductPointer = 0; ProductPointer < DataTableLength; ProductPointer ++){
                const NewtableDataRow = document.createElement('tr');
                Newtable.appendChild(NewtableDataRow);
                const CurrentData = Datatable[ProductPointer];
                const CurrentProductId = CurrentData[0];
                const CurrentCartIndex = CartItems.indexOf(ProductPointer.toString());
                //const CurrentCartIndex = CartItems.indexOf("5")
                //console.log(CurrentCartIndex);

                

                if(CurrentCartIndex != -1){
                    const CurrentProduct = Datatable[CurrentCartIndex];
                    console.log(CurrentProduct);

                    const NewtablecellModel = document.createElement('td');
                    const NewtablecellPrice = document.createElement('td');
                    const NewtablecellRemFromCart = document.createElement('td');
                    const NewtablecellRemFromCartBTN = document.createElement("button");
                    NewtablecellModel.innerHTML  = CurrentProduct[2];
                    NewtablecellPrice.innerHTML = CurrentProduct[7] + "kr";

                    NewtablecellRemFromCartBTN.addEventListener("click", function(){
                        RemoveFromShoppingCart(CurrentProductId);   
                    });
                    NewtablecellRemFromCartBTN.innerHTML = "Remove from cart";
                    
                    NewtableDataRow.appendChild(NewtablecellModel);
                    NewtableDataRow.appendChild(NewtablecellPrice);
                    NewtableDataRow.appendChild(NewtablecellRemFromCart);
                    NewtableDataRow.appendChild(NewtablecellRemFromCartBTN);
                }
                

            }
            

            
            /*


            CartItems.forEach(function(ArrayPointer){
                // generate table
                const NewtableDataRow = document.createElement('tr');
                Newtable.appendChild(NewtableDataRow);
                
                const DataTableLength = Datatable.length;
                for (let DataTablePointer = 0; DataTablePointer < DataTableLength; DataTablePointer ++){
                    const CurrentData = Datatable[DataTablePointer];
                    const CurrentProductId = CurrentData[0];

                    for(let CartProductPointer = 0; CartProductPointer <DataTableLength; CartProductPointer ++){
                        
                    }

                    if (CartItems[ArrayPointer] == CurrentProductId){
                       
                        const NewtablecellModel = document.createElement('td');
                        const NewtablecellPrice = document.createElement('td');
                        const NewtablecellRemFromCart = document.createElement('td');
                        const NewtablecellRemFromCartBTN = document.createElement("button");
                        NewtablecellModel.innerHTML  = CurrentData[2];
                        NewtablecellPrice.innerHTML = CurrentData[7] + "kr";

                        NewtablecellRemFromCartBTN.addEventListener("click", function(){
                            RemoveFromShoppingCart(CurrentProductId);   
                        });
                        NewtablecellRemFromCartBTN.innerHTML = "Remove from cart";
                        
                        NewtableDataRow.appendChild(NewtablecellModel);
                        NewtableDataRow.appendChild(NewtablecellPrice);
                        NewtableDataRow.appendChild(NewtablecellRemFromCart);
                        NewtableDataRow.appendChild(NewtablecellRemFromCartBTN);
                        //i was going to do this in a for loop, but i tried for 30s, and it didnt word
                        //so im doing it manually. yay
                        // as im writing this current line, i found the issue. Guess what im not fixing it. Why?
                        //because im lazy                  

                    }
                }  

                
                


            })
            */
            
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
    const CurrentItemsInCart = CartItems.length;
    if (CurrentItemsInCart > 0){
        CurrentItemInCartObject.innerHTML = CurrentItemsInCart;
        CurrentCartImageObject.src = "./assets/img/cart_full.svg";
    }
    else{
        CurrentItemInCartObject.innerHTML = "";
        CurrentCartImageObject.src = "./assets/img/cart-outline.svg";
    }
}
function RemoveFromShoppingCart(ProductId){
    //console.log(ProductId); 
    console.log("AAAAAAAAAAA");
}

