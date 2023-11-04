* When sorting products, selected cart icons revert to default unselected state. Item remains in cart, but user is unable to see it on the table. (is visible in checkout) 
(fixed with     //Fixes bug that hides selected cars on sort
    for(let ProductNumber = 0; ProductNumber < Datatable.length; ProductNumber ++){
        AddCart(ProductNumber);
        AddCart(ProductNumber);
    }
    //Fixes bug that hides selected cars on sort)

* If sorting doenst find item, it adds a bunch of items to cart. No idea why