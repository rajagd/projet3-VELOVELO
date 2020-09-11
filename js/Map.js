"use strict";
// créer un constructor object.prototype


Map.prototype = {
	init: function() {
		this.getMapBloc = this.createMap.querySelector( "#getMap" );  // block pour montrer le map
		this.showReservationBloc = this.createMap.querySelector( ".showReservations" ); // reservation block
		this.stationStatusShow = this.createMap.querySelector(".stationStatusShow"); // status de station , fermée ou ouverte
		this.stationNameShow = this.createMap.querySelector(".stationNameShow"); // nom de station
		this.stationAddressShow = this.createMap.querySelector( ".stationAddressShow" ); // adresse de station
		this.placesBloc = this.createMap.querySelector( ".placesBloc" ); // nombre de places block
		this.getNumberOfVelo = this.createMap.querySelector( ".showVelos" );  //  nombre de vélo dispo
		this.bankingBlock = this.createMap.querySelector( ".banking" ); // terminale de paiement
		this.reservationForm = this.createMap.querySelector("#reservation-form"); // formulaire de réservation
		this.nom = this.createMap.querySelector( "#nom" );
		this.prenom = this.createMap.querySelector( "#prenom" );
		this.canvasBloc = this.createMap.querySelector("#canvasBloc");  // bloc de canvas
		this.showThreeButtons = this.createMap.querySelector("#showThreeButtons"); // bouton de confrimation de réservation
		this.reservationButton = this.createMap.querySelector("#reservationButton"); // bouton de reserver

		this.createMarkers();

	},



	// charger le map avec l'api de mapbox

	showMap: function(){

		let setMap = L.map('getMap').setView([47.75, 7.33], 14);

		L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png?access_token={accessToken}',
			{
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				minZoom: 12,
				accessToken: 'pk.eyJ1IjoicHJvbW96b29ucyIsImEiOiJja2F6bG43a20wcjZxMnBxcXNiaGdic2hnIn0.smZUvWINH3PX_p_9i2h-mA' // mapbox api access
			}).addTo(setMap);

		return setMap;
	},

//  créer des markers icons

	showStationIcons: function(station, map, marker){
		// Si la station est ouverte...

		if(station.status === "OPEN"){
			// Quand la station est ouverte et vélos sont disponibles

			marker = L.marker([station.position.lat, station.position.lng], {icon: this.getIcons("icon1")}).addTo(map);

			// Quand la station est ouverte mais pas de vélo disponible

			if(station.available_bikes == 0){
				marker = L.marker([station.position.lat, station.position.lng], {icon: this.getIcons("icon2")}).addTo(map);
			}
		}
		// Quand la station est fermée

		else {

			marker = L.marker([station.position.lat, station.position.lng], {icon: this.getIcons("icon3")}).addTo(map);
		}

		return marker;
	},

	//  ajouter des images à marker icons



	getIcons: function(showIcons){
		if (showIcons === "icon1") {
			showIcons = new L.Icon({
				iconUrl: 'images/open.png',
				iconSize: [32, 32],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
			});
		} else if (showIcons === "icon2") {
			var showIcons = new L.Icon({
				iconUrl: 'images/cafe.png',
				iconSize: [32, 32],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
			});
		} else if (showIcons === "icon3") {
			var showIcons = new L.Icon({
				iconUrl: 'images/close.png',
				iconSize: [32, 32],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
			});
		}
		return showIcons;
	},

	// on va récupérer les données de station avec l'api de jcdecaux

	createMarkers: function(){
		this.showStations();
	},

	//

	showStations: function(){
		let getCity = this.showMap();
		// 	avec ajax , on va récuperer les données de station avec l'api de jcdecaux et nom de la ville

		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Mulhouse&apiKey=612a0c7711f164fde8a1d0c195f7d20c2b78625e", function(response){

			// 	Récupérer les stations
			let stations = JSON.parse(response);

			stations.forEach(function(station){
				//	récuperer les markers
				let marker = this.showStationIcons(station, getCity);

				//	obtenez les infos par rapport les variables de jcdecaux

				let statusStation = station.status;
				console.log(statusStation);
				//	obtenez les noms des stations
				let stationName = station.name;
				console.log(stationName);

				//	obtenez les adresses des stations
				let adresse = station.address;
				console.log(adresse);

				//	obtenez les status de présence d'un terminal de paiement sur les stations

				let statusBanking = station.banking;
				console.log(statusBanking);

				//	obtenez les nombres de places disponibles sur la station

				let numberOfPlaces = station.available_bike_stands;
				console.log(numberOfPlaces);

				//	obtenez les nombres de vélo disponibles sur la station

				let numberOfVelo = station.available_bikes;
				console.log(numberOfVelo);

				// click function avec addEventListener sur le marker

				marker.addEventListener('click', function () {

					// on va afficher le formulaire de réservation , session storage si existe, infos sur la stations

					this.showFormulaire(); // Ouverture d'une formulaire de réservation
					this.nameStorage(); // session storage de nom & prénom
					this.reserveUnVelo(stationName, statusStation, adresse, numberOfPlaces, numberOfVelo, statusBanking); // infos sur la station
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},


	//	ouverture de formulaire de réservation

	showFormulaire: function(){

		this.getMapBloc.style.width = "65%";  // width de map
		this.showReservationBloc.style.width = "35%"; // width de formulaire de réservation
		this.showReservationBloc.style.display = "block";
		this.showReservationBloc.style.backgroundColor = "grey";

		//	si le client change d'avis et clique sur une autre station

		this.getNumberOfVelo.style.display = "block";  // show nombre de vélo dispo
		this.placesBloc.style.display = "block";
		this.bankingBlock.style.display = "block"; // banking
		this.reservationButton.style.display = "block";  // reserver ; reservation button
		this.canvasBloc.style.display = "none"; // canvas block est caché pour l'instant
		this.showThreeButtons.style.display = "none"; // bouton de confirmation, annuler, reinitialiser sont cachés encore
		this.nom.disabled = false; // true; si on veut pas laisser les clients changer leur nom , sinon false
		this.prenom.disabled = false; // true; si on veut pas laisser les clients changer leur prenom , sinon false
	},

	// on va garder le nom et prénom pour la session de storage

	nameStorage: function(){
		if(localStorage.getItem("nom")!==null || localStorage.getItem("prenom")!==null){
			this.nom.value = localStorage.getItem("nom");
			this.prenom.value = localStorage.getItem("prenom");
		}
	},

	// réservation de velo

	reserveUnVelo: function(stationName, statusStation, adresse, numberOfPlaces, numberOfVelo){
		//Si la station est ouverte
		if(statusStation==="OPEN"){
			this.stationStatusShow.textContent = "Station est Ouverte" ; // show station status  when opened
			this.stationNameShow.textContent = stationName;
			this.stationNameShow.style.backgroundColor = "green"
			this.stationNameShow.style.fontFamily = "Arial";
			this.getNumberOfVelo.style.backgroundColor = "green";
			this.getNumberOfVelo.style.fontFamily = "Arial"
			this.getNumberOfVelo.style.color = "white";
			this.placesBloc.style.backgroundColor = "pink";
			this.placesBloc.style.marginBottom = "10px";
			this.stationAddressShow.textContent = adresse;
			this.reservationForm.style.display = "block";
			this.reservationForm.style.backgroundColor = "yellow";
			this.reservationForm.style.border = "1px solid #0000FF";

			this.placesVelos(numberOfPlaces);
			this.showVelos(numberOfVelo, adresse);

		} else {
			this.stationStatusShow.textContent = "Station est Fermée "; // quand la station est fermée
			this.getNumberOfVelo.style.backgroundColor = "red";
			this.stationNameShow.textContent = stationName; //  nom de station

		}
	},

	placesVelos: function(placesDispo){

		//	montre les places disponibles  1 ou +1

		if((placesDispo===0)||(placesDispo===1)) {
			this.placesBloc.textContent = placesDispo+" place disponible"; // si une place est disponible
		} else {
			this.placesBloc.textContent = placesDispo+" places disponibles"; // si +1 places disponible
		}
	},

	showVelos: function(numberOfVelo, adresse, statusBanking){
		//	s'il n'y a pas de velo disponible

		if(numberOfVelo===0){
			this.getNumberOfVelo.textContent = "Désolé ! Il n'y a pas de vélo disponible en ce moment. Veuillez cliquer sur une autre station svp ! ";
			this.getNumberOfVelo.style.padding= "8px";
			this.getNumberOfVelo.style.borderRadius= "5px";
			this.getNumberOfVelo.style.backgroundColor = "red"; // bloc de nombre de velo disponible change le couleur

			this.reservationForm.style.display = "none"; // pas de formulaire de réservation

		} else {
			this.getNumberOfVelo.style.backgroundColor = "green"; // else velos sont disponibles
			this.getNumberOfVelo.style.fontFamily = "Arial"
			this.getNumberOfVelo.style.color = "white";
			this.getNumberOfVelo.style.padding= "8px";
			this.getNumberOfVelo.style.borderRadius= "5px";


			// 	s'il y a des vélo disponible à réserver

			if((numberOfVelo===1)) {
				this.getNumberOfVelo.textContent = numberOfVelo+" Vélo disponible ! "; // pour 1 vélo

			} else {
				this.getNumberOfVelo.textContent = numberOfVelo+" Vélos sont disponibles. ";

			}



			//	terminal de paiement

			if(statusBanking = true) {
				this.bankingBlock.textContent = "Terminal de Paiement disponible";

			} else {
				this.bankingBlock.textContent = " Terminal de paiement non disponibles";

			}
		}
	}
}



/*
	Map.prototype est terminé
 	*/

// function pour charger le map

function Map( loadMap ) {
	this.createMap = document.querySelector( loadMap );
	this.init(); // init tous les attributs de Map.prototype
}
