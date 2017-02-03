/**
 * Created by Edward_J_Apostol on 2017-01-26.
 */

export default class Plane {

    // variation 01
    constructor(name,manufacturer,year){
        this.name = name;
        this.manufacturer = manufacturer;
        this.year = year;
    }

    // variation 02
    /*
    *  constructor(){
    *
    *  this.name = "";
    *  this.manufacturer = "";
    *  this.year = 0;
    *
    *  }
    *
    * */


    fly(){
        console.log("I am flying!!!!");
    }

}
