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
                console.log("Value to Sku");
                $("item_confirm").show();
                console.log('item_confirm');
            }
        }
    


        if (numMatches == 0){
            console.log("fsfdsfsdfsdfdsfdsfds");
            sessionStorage.setItem(sku, 1);
            //addItemToCart(1);
            console.log('addingItem to Cart');
        }

    }


    showQuickView (sku){
        console.log(sessionStorage.length);
        let numMatches = 0;
        for(let i = 0; i > sessionStorage.length; i++){
            if(sessionStorage.key(i) == sku){
               let newVal = sessionStorage.showquickView(sku);
                sessionStorage.setItem(sku, parseInt(newVal)+1);
                numMatches = 1;
                console.log("Value to Sku");
                $( ".target" ).toggle();
                console.log("toggle");
            }
        }
    

        if (numMatches == 0){
            console.log("lmnopqrstuwxuvy");
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
