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
        let numMatches = 0;
        console.log(sessionStorage.length);
        for(let i = 0; i < sessionStorage.length; i++){
            console.log(sessionStorage);
            if(sessionStorage.key(i) == sku){
               let newVal = sessionStorage.getItem(sku);
                sessionStorage.setItem(sku, parseInt(newVal)+1);
                numMatches = 1;
            }
        }
    


        if (numMatches == 0){
            sessionStorage.setItem(sku, 1);
        }

    }


    showQuickView (sku, products, theApp){
        console.log("click on quickview");
        console.log(sessionStorage.length);
        console.log(theApp); 
        let numMatches = 0;
   

        for(let count = 0; count < theApp.products.length; count++){
                //find the product that matches matching Sku
                console.log(theApp.products);
            if(theApp.products[count].sku == sku){
                let theProduct = theApp.products[count];
                // see a popup
                // show the item in the popup that matches the sku in session storage
                // the following item details must be shown
                 // product name, amount, price, description

        let showQuickView = $('#showQuickView');
        for(let i = 0; i < sessionStorage.length; i++){
            let currentSku = sessionStorage(currentSku);

        for(let p = 0; p < proudctLength; p++){
            let currentProduct = products[p];
            let productSku = currentProductSku;

        if (productSku == currentSku){
            let img = currentProduct.image;
            let name = currentProduct.name;
            let price = currentProduct.price;
            /*output = <div id="Flex this" class ="whatev">"
                     <img src = "${img}, height=110, alt= "${name}">
                     <p>${name}, ${price}, ${currentQty}</p>
        }
        }
        }*/
            }
            }
                
        }
            
        }
    }


   /* removeItemFromCart(){

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }*/

}
}
