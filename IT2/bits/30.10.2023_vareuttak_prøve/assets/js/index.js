var Missoninfo = [];
var Receipt = [];
var TableState = false;
function init(){


}

function RegisterWork(){
    const usernameOBJ = document.getElementById("UserName");    
    const customernameOBJ = document.getElementById("CustomerName");
    const missionnameOBJ = document.getElementById("MissionNumber");

    const username = usernameOBJ.value;
    const customername = customernameOBJ.value;
    const missionname = missionnameOBJ.value;

    if(username == "" ||customername == "" || missionname =="" ){
        console.error("input empty");

    }
    else{
        Missoninfo[0] = username;
        Missoninfo[1] = customername;
        Missoninfo[2] = missionname;
        Missoninfo[3] =  CurrentDay();
        const inputFieldArea = document.getElementById("1st_input");
        inputFieldArea.remove();
        NormalPageView();


    }
}


function CurrentDay(){
    const date = new Date();
    const Currentday = date.getDate();
    const Currentmonth = date.getMonth() + 1;
    const Currentyear = date.getFullYear();
    const CurrentDate = `${Currentday}-${Currentmonth}-${Currentyear}`;
    return CurrentDate; 
}

function NormalPageView(){
    const inputFieldParent = document.getElementById("postInput");
    const inputField = document.createElement("div");
    inputFieldParent.appendChild(inputField);

    const ProductNameInput = document.createElement("input");
    ProductNameInput.id = "ProductNameInput";
    ProductNameInput.className = "input";
    ProductNameInput.placeholder = "navn paa produkt";

    const ProductAmountInput = document.createElement("input");
    ProductAmountInput.id="ProductAmountInput";
    ProductAmountInput.className = "input";
    ProductAmountInput.placeholder = "Menge produkt"; 

    const ProductPriceInput = document.createElement("input");
    ProductPriceInput.id = "ProductPriceInput";
    ProductPriceInput.className = "input";
    ProductPriceInput.placeholder = "Stykkpris";

    const ProductSubmit = document.createElement("button");
    ProductSubmit.id = "ProductSubmit";
    ProductSubmit.className = "input";
    ProductSubmit.innerHTML = "Lagre Data";
    ProductSubmit.addEventListener("click", function(){
        GetProductData();
    })


    inputField.appendChild(ProductNameInput); 
    inputField.appendChild(ProductAmountInput);
    inputField.appendChild(ProductPriceInput);  
    inputField.appendChild(ProductSubmit);      

}

function GetProductData(){
    const ReceiptLength = Receipt.length;


    const ProductNameInput = document.getElementById("ProductNameInput");    
    const ProductAmountInput = document.getElementById("ProductAmountInput");
    const ProductPriceInput = document.getElementById("ProductPriceInput");

    const ProductName = ProductNameInput.value;
    const ProductAmount = parseInt(ProductAmountInput.value);
    const ProductPrice = parseInt(ProductPriceInput.value);
    const TotalPrice =  ProductPrice * ProductAmount
    const MVA = (TotalPrice * 0.25); 
    const TotPlusMVA = (TotalPrice * 0.25) + TotalPrice;
    const Fortjenste = MVA + (TotalPrice * 0.20);
    const Total = TotPlusMVA + Fortjenste; 


    Receipt[ReceiptLength] = [
        ProductName, 
        ProductAmount, 
        ProductPrice,
        MVA, 
        Fortjenste, 
        Total,
    ]



    if(!TableState){
        //SpawnTable2Arr("tablearea","ProductTable", ["Produkt navn", "Produkt mengde", "Varepris", "Totalpris + mva", "TotalPris + mva og fortjenste"], TableData);

        const CustomerName = Missoninfo[1];
        const WorkerName = Missoninfo[0];
        const WorkID = Missoninfo[2];
        const DateTime = Missoninfo[3]; 
        SpawnTable2Arr("customerInfo", "CustomerTable", ["Kunde navn", "Rorlegger navn", "Arbeid ID", "Dato"], [[CustomerName,WorkerName,WorkID, DateTime]]);


        SpawnTable2Arr("receiptInfo", "ReceiptTable", ["Produkt", "Antall", "Pris/prod", "MVA", "Fortjenste", "Total"],Receipt);
        var lastMVA = 0;
        var lastFortjenste = 0;
        var lastTotal = 0;
        var lastamount = 0;

        for(let ReceiptPointer = 0; ReceiptPointer < Receipt.length; ReceiptPointer  ++){
            const TotalMVA = Receipt[ReceiptPointer][3];
            const TotalFortjenste =  Receipt[ReceiptPointer][4];
            const TotalTotal =  Receipt[ReceiptPointer][5];
            const currentMVA = lastMVA + TotalMVA;
            const currentFortjenste = lastFortjenste + TotalFortjenste;
            const currentTotal = lastTotal + TotalTotal;
            lastMVA = currentMVA;
            lastFortjenste = currentFortjenste;
            lastTotal = currentTotal; 

            const TotalAmount = Receipt[ReceiptPointer][1];
            const currentTotalAmount = lastamount + TotalAmount;
            lastamount = currentTotalAmount; 


        }
        SpawnTable2Arr("totalPrice", "TotalPriceTable", ["TotalMVA", "TotalFortjenste", "Totalpris"], [[lastMVA,lastFortjenste,lastTotal],]);

        TableState = true;
    }
    else{
        const customer = document.getElementById("CustomerTable");
        const receiptInf =  document.getElementById("ReceiptTable");
        const totPrice = document.getElementById("TotalPriceTable");

        customer.remove();
        receiptInf.remove();
        totPrice.remove(); 
        TableState = false;

        
        const CustomerName = Missoninfo[1];
        const WorkerName = Missoninfo[0];
        const WorkID = Missoninfo[2];
        const DateTime = Missoninfo[3]; 
        SpawnTable2Arr("customerInfo", "CustomerTable", ["Kunde navn", "Rørlegger navn", "Arbeid ID", "Dato"], [[CustomerName,WorkerName,WorkID, DateTime]]);


        SpawnTable2Arr("receiptInfo", "ReceiptTable", ["Produkt", "Antall", "Pris/prod", "MVA", "Fortjenste", "Total"],Receipt);
        var lastMVA = 0;
        var lastFortjenste = 0;
        var lastTotal = 0;

        for(let ReceiptPointer = 0; ReceiptPointer < Receipt.length; ReceiptPointer  ++){
            const TotalMVA = Receipt[ReceiptPointer][3];
            const TotalFortjenste =  Receipt[ReceiptPointer][4];
            const TotalTotal =  Receipt[ReceiptPointer][5];
            const currentMVA = lastMVA + TotalMVA;
            const currentFortjenste = lastFortjenste + TotalFortjenste;
            const currentTotal = lastTotal + TotalTotal;
            lastMVA = currentMVA;
            lastFortjenste = currentFortjenste;
            lastTotal = currentTotal; 

            const TotalAmount = Receipt[ReceiptPointer][1];
            const currentTotalAmount = lastamount + TotalAmount;
            lastamount = currentTotalAmount; 

        }

        SpawnTable2Arr("totalPrice", "TotalPriceTable", ["TotalMVA", "TotalFortjenste", "Totalpris"], [[lastMVA,lastFortjenste,lastTotal],]);

        
    }

}







