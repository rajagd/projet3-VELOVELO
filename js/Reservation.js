"use strict";
/*
>> ça nous permet d'ajouter les propriétés à tous les objets de type Object
>> On choisi l'objet "Slider"
>> init ou return pour exécuter la function
>> La méthode querySelector () renvoie le premier élément qui correspond à un ou plusieurs sélecteurs CSS spécifiés dans le document.
>> querySelectorAll() retourne une  NodeList des éléments correspondants au groupe de selecteurs CSS spécifiés qui sont des descendants de l'élément
*/

	// créer un constructor object.prototype



Reservation.prototype = {
	init: function() {
		this.stationAddressShow = this.getReservations.querySelector( ".stationAddressShow"); // adresse de station
		this.placesBloc = this.getReservations.querySelector( ".placesBloc" ); // nombre de places
		this.getNumberOfVelo = this.getReservations.querySelector( ".showVelos" ); //  nombre de vélos disponibles
		this.reservationForm = this.getReservations.querySelector("#reservation-form"); // formulaire de reservation
		this.nom = this.getReservations.querySelector( "#nom" ); // champ de nom
		this.prenom = this.getReservations.querySelector( "#prenom" ); // champ de prenom
		this.canvasBloc = this.getReservations.querySelector("#canvasBloc"); // block de Canvas
		this.showThreeButtons = this.getReservations.querySelector("#showThreeButtons"); // montrer les 3 boutons quand on va cliquer sur Reserver
		this.reservationButton = this.getReservations.querySelector("#reservationButton"); // bouton Reserver
		this.confirmButton = this.getReservations.querySelector("#confirmer"); // Bouton confirmer
		this.cancelButton = this.getReservations.querySelector("#annulerButton");// Bouton annuler
		this.showTimer; // Montrer l'heure

		this.showReservation();

	},


	// function pour formulaire de réservation

	showReservation: function(){
		this.reservationDeVelo();
	},

	reservationDeVelo: function(){

		// on va mettre session storage de confimation texte de reservation
		this.reservationStorage();

	//	on va mettre le timer en session storage

		this.getSessionClock();

	//	addEventListener sur le bouton de Reserver sur submit

		this.reservationForm.addEventListener("submit", function (e){
			e.preventDefault();

	//	block de canvas va appraitre

			this.showCanvasBloc();


			this.nom.disabled = true; // si true, les visiteurs ne peuvent pas changer le nom , apres avoir cliqué sur le bouton Reserver
			this.prenom.disabled = true; // si true, les visiteurs ne peuvent pas changer le prenom , apres avoir cliqué sur le bouton Reserver

	//	bouton de confirmation

			this.confirmation();

	//	Annuler la reservation form
			this.cancel();

		}.bind(this));
	},

	//	session storage pour la confirmational text apres la réservation

	reservationStorage: function(){

		let txtContent = document.querySelector(".showText"); // quand il n'y a pas de réservation , on affiche ça
		let showReservationTxt;
		let txtReservation = sessionStorage.getItem("showConfirmText"); // on va afficher confirmational text de reservation

 	// texte normale sur le site

		if(txtReservation) {
			showReservationTxt  = txtReservation; // on va afficher confirmational text de reservation
		} else {
			showReservationTxt = "Réservation de vélo en ligne !"; // quand il n'y a pas de réservation , on affiche ça
		}
		//session storage
		sessionStorage.setItem('showConfirmText', showReservationTxt);
		// Affichage dans la page
		txtContent.innerHTML = showReservationTxt;
	},

	// on va garder minutes, secondes dans la session storage

	getSessionClock: function(){
		let minutes = sessionStorage.getItem("minutes");
		let secondes = sessionStorage.getItem("secondes");
		if(minutes&&secondes){
			sessionStorage.setItem('minutes', minutes);
			sessionStorage.setItem('secondes', secondes);
			this.timerOn(minutes, secondes);
		}
	},

	//	on va apparaitre canvas block pour la signature

	showCanvasBloc: function(){

		this.canvasBloc.style.display = "block"; // show canvas block
		this.showThreeButtons.style.display = "block"; // show button pour annuler , effacer
		this.getNumberOfVelo.style.display = "none";
		this.placesBloc.style.display = "none";
		this.reservationButton.style.display = "none"; // reserve ; reservation button
	},


	// Confirmation button & confirm reservation
	confirmation: function(){

		this.confirmButton.addEventListener("click", function (){
			//enregistrement des valeurs
			let nomInput = this.nom.value;
			let prenomInput = this.prenom.value;
			localStorage.setItem("nom", nomInput);
			localStorage.setItem("prenom", prenomInput);
			sessionStorage.setItem("Station adresse", this.stationAddressShow.textContent);

			//enregistrement dans le storage + minuteur

			let msgReservationInit = "<b> Confirmation de Réservation  :</b> " + this.stationAddressShow.textContent + " par 	<b>" + nomInput.toUpperCase() + " " + prenomInput + "</b><br/>";
			sessionStorage.setItem('showConfirmText', msgReservationInit); // msgReservation
			let txtContent = document.querySelector(".showText");
			txtContent.innerHTML = msgReservationInit;
			// +
			sessionStorage.removeItem("minutes");
			sessionStorage.removeItem("secondes");
			sessionStorage.setItem("minutes", 19);
			sessionStorage.setItem("secondes", 60);
			clearInterval(this.showTimer);
			this.timerOn(19, 60);

			// Keep reservation block alive

			this.afterReservationBlock();
		}.bind(this));
	},

	timerOn: function(minutes, secondes){
		let txtContent = document.querySelector(".showText");
		let getTimerBlock = document.querySelector(".getTime");
		let showAlert;
		this.showTimer = setInterval( function(){
			sessionStorage.setItem('minutes', minutes);
			sessionStorage.setItem('secondes', secondes);
			if(minutes < 0){
				clearInterval(this.showTimer);
				sessionStorage.clear();
				txtContent.textContent = "Votre réservation est expirée ! ";
				getTimerBlock.innerHTML = "Veuillez réserver un nouveau vélo ! ";
			} else {
				secondes = secondes - 1;
				showAlert = "<b>Vous avez  : </b>"+minutes+"min et "+secondes+"s pour aller à votre station ..";
				getTimerBlock.innerHTML = showAlert;

				if(secondes === 0){
					minutes = minutes - 1;
					secondes = 60;
					showAlert = "<b>Vous avez  : </b>"+minutes+"min et "+secondes+"s pour aller à votre station ..";
				}
			}
		}, 1000); // 1 sec interval
	},

	cancel: function(){
		this.cancelButton.addEventListener("click", function (){
			document.querySelector(".showText");
			this.afterReservationBlock();
		}.bind(this));
	},

	// Keep reservation block alive

	afterReservationBlock: function() {

		let map = document.querySelector("#getMap");
		map.style.width = "100%";

		this.getReservations.style.width = "100%"; // width of reservation block
		this.getReservations.style.display = "none"; // none




	}
}

	//	function pour charger la Reservation.prototype

	function Reservation(showReservation) {
	this.getReservations = document.querySelector( showReservation );
	this.init(); // initiate  tous les attributs de Reservation.prototype
	}




