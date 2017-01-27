/**
 * Created by Edward_J_Apostol on 2016-08-29.
 */
// this is where the "main" section of your app begins.
// its like a launch pad, where you bring all your other classes
// together for use.

import Person from './Person';
import Car from './Car';
import Plane from './Plane'


let edward = new Person("Edward");
let eds_car = new Car("ford");
let Cessna = new Plane("Cessna", "Boieng", 1972);(
cessna.fly);
let Boeing = Manufacturer("Boeing");
let Year = Year("1972");
edward.hairColor = "mauve";
console.log(edward.hairColor);
edward.car = eds_car;
edward.car.drive(edward);
edward.plane = eds_plane;
edward.plane.fly(edward);