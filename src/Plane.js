

export default class Plane{

	constructor(name, manufacturer, year){
		if (name !="undefined" && manunfacturer !== undefined && typeof year != undefined){ 
		console.log("This name is " + name);
		console.log("This year is" + year);
		console.log("This plane is made by" + "manufacturer");
			this.manufacturer = manufacturer;
		}else{
		console.log("hey man I'm  not flying a Cessna");
		this.manufacturer="manufacturer";
		this.year="year";
		this.name="name";
		}else{
			console.log("What do we have here? You need valid name, year to make a plane.");
			this.name="no name";
			this.year="no year";
			this.manufacturer="no manufacturer";
		}


	}

	fly(plane){
		console.log("I'm starting to fly a Cessna")
		let output = "";
		if (plane.Name !=undefined && plane.manufacturer !== undefined && typeof plane.year =='undefined';
		output= `
			The ${plane.year} ${plane.manufacturer} ${plane.name} is flying! 
			Quite special!`

		${person.firstName} is flying a ${this.manufacturer}!`
	}