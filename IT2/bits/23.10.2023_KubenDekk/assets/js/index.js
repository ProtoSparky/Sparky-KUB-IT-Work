var CheckountStatusClosed = true; 
var SelectedSort = 0;
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
    [
        "Denne dekkfelgen er billig, og den fungerer. Hvilke forventninger skal du ha til en rusten felg som koster nesten ingenting?",
        "10"
    ],
    [
        "IceMaster Spike Z-506 er et dekk for deg som liker å stabbe bakken med pigger i vinteren.",
        "450"
    ],
    [
        "Setula W Race S130, Et dekk for deg som liker å påkjøre småbarn med lastebil. Demper til og med de største humpene i bakken!",
        "290"
    ],
    [
        "Goodyear lanserer UltraGrip Performance 3, et dekk som bruker gummi fra 100% barnearbeid. Takket være den nye grip teknologien, kan du være en mer hissig bilist uten å påkjøre sykkelistene",
        "90"
    ],
    [
        "SINCERA SN110, Et sommerdekk som tilbyr den beste kvalitet uten å ødelegge for naturen. Takket være G.R.E.T.A teknologien, kan vi minske co2 utslippet ved å drepe bilisten. Kjøper du produktet vårt, blir du faktisk betalt 250kr for installasjon",
        "-250"
    ],
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
        AboutText.innerHTML = "<div id='AboutText1'><i>" + CurrentTireAbout[0] + "</i></div>" + "<div id='AboutText2'>Installasjonspris: " + CurrentTireAbout[1] + "kr</div><img id ='tireIcon' src='./assets/img/tire/" + CurrentTireData[1] + "'></img><div id='ProductID'>Lager ID: <b>" + CurrentTireData[0] + "</b></div>";
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

            let total_price = 0;
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
                    NewtablecellRemFromCartBTN.className = "checkout_btn";
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
                    const currentPrice = total_price + parseInt(CurrentData[7]);
                    total_price = currentPrice;
                } 
            }    
            //display total
            const Total = document.createElement("div");
            Total.id ="TotalCheckoutPrice";
            Total.innerHTML = "<i>Total: " + total_price + "kr</i>";
            NewtableArea.appendChild(Total);


                        
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


function ApplySort(){
    const SortObject = document.getElementById("SortSelect");
    const SortValue = SortObject.value;
    //0 = rim | 1 = Summer tire | 2 = winter (w/o spikes) | 3 = winter (w spikes) | 4 = Universal
    //SelectedSort | 0 == unsorted
    if(SortValue  == "Pr_LTH"){
        //Sort price low to high
        const WantedSort = 8;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByPrice(Datatable, 0)); 
        }
    }
    else if(SortValue == "Pr_HTL"){
        //Sort price high to low
        const WantedSort = 7;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByPrice(Datatable, 1)); 

        }
    }
    else if(SortValue == "DiaLTH"){
        //sort tire diamater small to large
        const WantedSort = 6;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByDia(Datatable, 0)); 
        }
    }
    else if(SortValue == "DiaHTL"){
        //Sort tire diamater large to small
        const WantedSort = 5;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByDia(Datatable, 1)); 
        
        }
    }
    else if(SortValue == "TT_sum"){
        //Sort tire type:Summer
        const WantedSort = 4;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByTireType(Datatable, "1")); 
        }
        
    }
    else if(SortValue == "TT_win"){
        //Sort tire type: winter w/o spikes
        const WantedSort = 3;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByTireType(Datatable, "2")); 
        }
    }
    else if(SortValue == "TT_win_sp"){
        //Sort tire type: witer with spikes
        const WantedSort = 2;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByTireType(Datatable, "3")); 
        }
    }
    else if(SortValue == "TT_whole"){
        //Sort tire type: universal tire
        const WantedSort = 1;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByTireType(Datatable, "4")); 
        }
    }
    else if(SortValue == "TT_all"){
        //Show any tires
        const WantedSort = 0;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, Datatable); 
        }
    }
    else if(SortValue == "RM"){
        //Sort by just rims
        const WantedSort = 9;
        if(SelectedSort != WantedSort){
            SelectedSort = WantedSort;
            const OldTable = document.getElementById("Table01");
            OldTable.remove();
            SpawnTable2Arr("TableArea", Headertable, sortByTireType(Datatable, "0")); 
        }
    }
}
function searchItems(){
    const WantedSort = 10;
    const SearchBar = document.getElementById("SearchBox");
    const SearchQuery = SearchBar.value;
    const OldTable = document.getElementById("Table01");
    OldTable.remove();
    SpawnTable2Arr("TableArea", Headertable, search(SearchQuery, Datatable)); 

}

function sortByPrice(tireData, operation) {
    const sortedTireData = [...tireData];
    sortedTireData.sort((a, b) => {
        const priceA = parseInt(a[7], 10);
        const priceB = parseInt(b[7], 10);

        if (operation === 0) {
            return priceA - priceB; // Sort by lowest price
        } 
        else if (operation === 1) {
            return priceB - priceA; // Sort by highest price
        }
        else {
            return 0; // Default to no sorting
        }
    });
    return sortedTireData;
}
function sortByDia(tireData, operation) {
    const sortedTireData = [...tireData];
    sortedTireData.sort((a, b) => {
        const priceA = parseInt(a[4], 10);
        const priceB = parseInt(b[4], 10);

        if (operation === 0) {
            return priceA - priceB; // Sort by lowest price
        } 
        else if (operation === 1) {
            return priceB - priceA; // Sort by highest price
        }
        else {
            return 0; // Default to no sorting
        }
    });
    return sortedTireData;
}

function sortByTireType(tireData, tireType) {
    // copy original array
    const filteredTireData = tireData.filter(tire => tire[6] === tireType);

    //custom order
    const tireTypeOrder = {
        '0': 0,  // rim
        '1': 1,  // Summer tire
        '2': 2,  // winter (w/o spikes)
        '3': 3,  // winter (w spikes)
        '4': 4   // Universal
    };

    // create filtered
    filteredTireData.sort((a, b) => {
        const tireTypeA = tireTypeOrder[a[6]];
        const tireTypeB = tireTypeOrder[b[6]];

        return tireTypeA - tireTypeB;
    });

    return filteredTireData;
}