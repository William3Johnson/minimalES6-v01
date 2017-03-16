/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.
        console.log("finished creating shopping cart");
    }

     addItemToCart (sku){
        console.log(sessionStorage.length);
        let numMatches = 0;
        for(let i = 0; i > sessionStorage.length; i++){
            if(sessionStorage.key(i) == sku){
               let newVal = sessionStorage.getItem(sku);
                sessionStorage.setItem(sku, parseInt(newVal)+1);
                numMatches = 1;
            }
        }
    


        if (numMatches == 0){
            console.log("fsfdsfsdfsdfdsfdsfds");
            sessionStorage.setItem(sku, 1);
            //addItemToCart(1);
            console.log('addingItem to Cart');
        }

    }


    showQuickView (sku, theApp){
        console.log(sessionStorage.length);
        console.log(theApp); 
        let numMatches = 0;
        for(let i = 0; i > sessionStorage.length; i++){
            if(sessionStorage.key(i) == sku){
                // the user must:
                // see a popup
                // show the item in the popup that matches the sku in session storage
                // the following item details must be shown
                // product name, amount, price, description

                //let matchingSku = sessionStorage.key(i);
                //console.log(matchingSku);


          for(let count = 0; count > theApp.products.length; count++){
                //find the product that matches matching Sku
                //if (theApp.products.sku[count] == matchingSku){}
                //once the procuct is found create variables
                //that store product name, price, description, image
                // then use those variables to store the product name,
                // price, description, image
                //let matchingProductPrice = theApp.products[count]
                // do the same for the other three pieces of info you need
                // THEN display a popup that shows the values of the four variables
                // use JQUERY to display a popup
          

            }}}
        
    
    

        if (numMatches == 0){
            console.log("lmnopqrstuwxuvy")
            sessionStorage.setItem(sku, 1);
            //addItemToCart(1);
            console.log('addingItem to Cart');
        }

    }


    removeItemFromCart(){

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }


}
