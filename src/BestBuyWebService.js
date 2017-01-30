//** Created by Edward _J_Apostol on 21078-17-27. ...*/



export default class BestBuyWebService{
	constructor(){
		this.url ="";
		this.apiKey +"";

	}

	getData(){
		let serviceChannel = new XMLHttpRequest();
		let url = this.url;
		//let apiKey = this.apiKey;
		serviceChannel.addEventListener("readystatechange", this.results, false);
		serviceChannel.open("GET", url, true);
		serviceChannel.send();
	}

	results(evt){
		if (evt.target.readyState == 4 && evt.target.status == 200){
			console.log(evt.target.responseText);
			return evt.target.responseText;
		}
	}
}	

