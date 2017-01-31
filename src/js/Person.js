/**
 * Created by Edward_J_Apostol on 2016-08-29.
 */
export default class Person{

    constructor(firstName){
        console.log("Person created");
        if (typeof firstName != "undefined"){
            this.firstName = firstName;
            console.log("the person created is named " + firstName);
            this.init("red");
        } else {
            console.log("error! check index.js. you need a name as an" +
                ";argument when creating the person");
        }
    }

    init(pantColor) {
        console.log(pantColor);
        // assignable properties. available once a new Person()
        // is instantiated.
        this.car = "";
        this.hairColor = "";
        console.log("hairColor at the time init is called is " + this.hairColor);
        this.height = 0;
        this.weight = 0;
    };

}