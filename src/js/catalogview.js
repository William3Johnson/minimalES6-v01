/**
 * Created by Edward_J_Apostol on 2017-01-28.
 */

// this class is responsible for displaying the product data...
// Perhaps in a carousel.
export default class CatalogView{

    constructor(){
        this.initCarousel();
        this.theApp = null;

    }


    initCarousel(){
     console.log("initializing carousel");



        this.carousel = document.getElementsByClassName("container");

    }

    onClickCartButton(theApp){

        return function(e){
            console.log(e.target.getAttribute["data-sku"]); //getAttribute.data-sku
            let theSku = e.target.getAttribute("data-sku");
            this.theApp.shoppingCart.addItemToCart(theSku);
       } //create function addItemToCart ()
    }   

    
        addProductsToCarousel(products, theApp){

            this.theApp = theApp;

        if (products === undefined || products == null){
            return ; // do not do anything! there is no data
        }

        /* the loop creates all the elements for each item in the carousel.
         * it recreates the following structure
         * <div class="product-wrapper">
         * <img src="images/stretch-knit-dress.jpg" alt="Image of stretch knit dress" />
         * <p class="product-type">Dresses</p>
         * <h3>Stretch Knit Dress</h3>
         * <p class="price">$169.00</p>
         * </div>
          * */
        for (let p=0; p<products.length; p++){
            let product = products[p];
            console.log(product);
            // each product is a product object
            // use it to create the element

            // create the DIV tag with class 'product-wrapper'
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","product-wrapper");

            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("img");
            newImg.setAttribute("src", product.image);
            newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku",product.sku);

            // create a new Paragraph to show a description
            let newPara = document.createElement("p");
            newPara.setAttribute("class","product-type");
            let newParaTextNode = document.createTextNode(product.longDescription);
            newPara.appendChild(newParaTextNode);

            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class","price");
            let newPriceParaTextNode = document.createTextNode(product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            /* you will need similar code to create
            an add to cart and a quick view button
            remember that each button you create should have
            a data-sku attribute that corresponds to the sku
            of each product.
            */
            
            let quickViewButton = document.createElement("button");
            quickViewButton.setAttribute("id", `qv${product.sku}`);
            quickViewButton.setAttribute("data-sku", product.sku);
            quickViewButton.setAttribute("type", "button");
            let quickViewTextNode = document.createTextNode("Quick View");
            quickViewButton.appendChild(quickViewTextNode);
            
        
            let addToCartButton = document.createElement ("button");
            addToCartButton.setAttribute("id", `cart_${product.sku}`);
            addToCartButton.setAttribute("data-sku", product.sku);
            addToCartButton.setAttribute("type", "button",);
            let addCartTextNode = document.createTextNode("Add To Cart");
            addToCartButton.appendChild(addCartTextNode);
            addToCartButton.addEventListener("click", this.onClickCartButton(this.theApp),false);

            newDiv.appendChild(newImg);
            newDiv.appendChild(newPara);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickViewButton); // added new quickView Button
            newDiv.appendChild(addToCartButton); // added new addToCartButton
            /*
            * <div>
                <img src="somepicfrombestbuy"></img.
                <p>buy me now</p>
                <h3>Dell Inspirion 12"</h3>
                <p>299.99</p>
                <button id="qv_${product.sku}" data-sku" type="button">Quick View</button>
                <button id = "cart_${product.sku}" data-sku="" type ="button">Add To Cart</button>
                </div>
        
            */
            document.getElementById('c').appendChild(newDiv);
            }


    }

}

