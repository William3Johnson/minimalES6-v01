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


    showQuickView (sku, products){
        console.log("click on quickview");
        let numMatches = 0;
   
                console.log("*******");
                console.log(products);
        for(let count = 0; count < products.length; count++)
        {
                //find the product that matches matching Sku

            if(products[count].sku == sku){
                let theProduct = products[count];
                let name = theProduct.name; 
                let price = theProduct.regularPrice;
                let img = theProduct.image;
                let desc = theProduct.longDescription;
                let status = theProduct.orderable;
                console.log(theProduct);
                console.log(price);
                console.log(img);
                console.log(name);
                console.log(desc);
                console.log(status);

                // show the item in the that matches the sku in session storage
                // the following item details must be shown
                 // product name, amount, price, description
                //let showQuickView = $('#showQuickView');
                let output = `
                <img src="${img}" height="110" alt="${name}">
                <p> ${name} ${price} ${status}</p>`;

                console.log(output);

                $(function() {
                    console.log(output);
                    $('.popup-inner').show();
                    $('.popup-inner').append(output);
    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
 
        e.preventDefault();
        $( "quickViewButton" ).appendTo( "#popup" );
    });
 
    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
 
        e.preventDefault();
        $( "quickViewButton" ).appendTo( "#popup" );
    });
});
            }
        }
    }



    
    /* removeItemFromCart(){
    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }*/

}
