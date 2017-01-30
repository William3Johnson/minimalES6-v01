/**
 * Created by Edward_J_Apostol on 2016-08-29.
 */
// this is where the "main" section of your app begins.
// its like a launch pad, where you bring all your other classes
// together for use.

//import Car from './Car';
//
//let edward = new Person("Edward");
//let eds_car = new Car("ford");

//edward.car = eds_car;
//edward.car.drive(edward);

//let cessna = new Plane ("Cessna", "Boeing", 1972);
//cessna.fly(thePlane);

//let thePlane = newPlane;
//newPlane.fly(thePlane);

//new plane = cessna,Boeing, 1972

import BestBuyWebService from './BestBuyWebService';

let bbws = new BestBuyWebService();
bbws.apiKey ="8ccddf4rtjz5k5btqam84qak";
bbws.url = "http://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=" 
+ bbws.apiKey + "&format=json";

bbws.getData();


