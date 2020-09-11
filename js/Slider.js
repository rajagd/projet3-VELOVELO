"use strict";
// créer un constructor object.prototype
/*

>> ça nous permet d'ajouter les propriétés à tous les objets de type Object
>> On choisi l'objet "Slider"
>> init ou return pour exécuter la function
>> La méthode querySelector () renvoie le premier élément qui correspond à un ou plusieurs sélecteurs CSS spécifiés dans le document.
>> querySelectorAll() retourne une  NodeList des éléments correspondants au groupe de selecteurs CSS spécifiés qui sont des descendants de l'élément
*/



Slider.prototype = {
	init: function () {
		this.images = this.createSlider.querySelector( ".slider-images" ); // querySelector le div avec la classe .slider-images
		this.slides = this.createSlider.querySelectorAll( ".slide" );  // querySelectorAll le div avec la classe .slide
		this.previous = this.createSlider.querySelector( ".arrowLeft" );
		this.next = this.createSlider.querySelector( ".arrowRight" );
		this.play =  this.createSlider.querySelector(".play");
		this.pause = this.createSlider.querySelector(".pause");
		this.totalSlides = this.slides.length; // totale nombre de slides
		this.index = 0; // le premier slide
		this.timer = 0;
		
		this.animation(); // pour executer l'animation de Slider
		this.getEventListener();
	},


	// function pour executer l'animation 5 sec
	// on utilise bind(this) à appeler la function
	// this.timer = setInterval(function() {

	animation: function() {
		this.timer = setTimeout(function() {
		this.slideRight();
		}.bind(this), 5000); // On peut changer ici la valeur d'animation de slider 5000=5 sce
	},

	// addEventListener DOM
	// pour créer des événement de cliques

	getEventListener: function() {

	// addEventListener sur la bouton de Pause

		this.pause.addEventListener( "click", function() {
			clearInterval( this.timer ); // clearInterval pour stopper l'animation
			this.timer = 0; // pour revenir l'animation vers 0
			this.changeColorPause(); // pour changer le couleur de bouton pause
		}.bind(this), true);

	// addEventListener sur le bouton de Play en mouse click

		this.play.addEventListener( "click", function() {
			this.animation(); // on démarre l'animation
			this.changeColorPlay(); // pour change le couleur de bouton play
		}.bind(this), true);

	// addEventListener sur les images (div="slider-images") pour aller à droite

		this.images.addEventListener( "click", function() {
			this.changeColor(); // ça change le couleur et revient à la couleur initiale
			this.slideRight(); // slide se deplace vers à droite
		}.bind(this), false);

	// addEventListener sur le bouton next(arrowRight) pour aller à droite en mouse click

		this.next.addEventListener( "click", function() {
			this.changeColor();
			this.slideRight();
		}.bind(this), false);

	// addEventListener sur le bouton previous(arrowLeft) pour aller à gauche en mouse click

		this.previous.addEventListener( "click", function() {
			this.changeColor();
			this.slideLeft();
		}.bind(this));

		// addEventListener pour keyboard arrows

		window.addEventListener( "keyup", function (e) {
			this.changeColor();
			this.keyupEvent(e);
		}.bind(this), false);
	},
	/*
	getEventListener: function terminé
	*/

	// function pour montrer le slide et  la description

	slideStart: function( firstSlide ) {
		let altImages = this.slides[firstSlide].getAttribute("alt");
		let slideDesc = document.querySelector(".description");
		slideDesc.textContent = altImages;

		// montrer le slide
		let currentSlide = this.slides[firstSlide];
		currentSlide.style.opacity = 1;

		for(let i = 0; i < this.totalSlides; i++ ) {
			let slide = this.slides[i];
			// inégalité stricte
			if( slide !== currentSlide ) {
				slide.style.opacity = 0;
			}
		}

		// Reinitialiser l'animation
		clearInterval( this.timer );
		this.timer = null;
		this.animation();
	},
	/*
		slideStart function est terminé
 	*/



	// slide va tourner à gauche

	slideLeft: function(){
		if(this.index===0){
			this.index = this.totalSlides-1;
		}
		else{
			this.index--;
		}
		this.slideStart( this.index );
	},

	// slide va touner à droite

	slideRight: function(){
		if(this.index===(this.totalSlides-1)){
			this.index = 0;
		}
		else{
			this.index++;
		}
		this.slideStart( this.index );
	},


	changeColor: function(){
		this.play.style.color = "#62a8d0";
		this.pause.style.color = "#62a8d0";
		this.play.style.textShadow = "3px 3px 10px #000000"
		this.pause.style.textShadow = "3px 3px 10px #000000"
	},

	changeColorPause: function(){
		this.pause.style.color = "green";
		this.pause.style.textShadow = "black"
		this.play.style.color = "#62a8d0";
		this.play.style.textShadow = "3px 3px 10px #000000"
	},

	changeColorPlay: function(){
		this.play.style.color = "green";
		this.play.style.textShadow = "black"
		this.pause.style.color = "#62a8d0";
		this.pause.style.textShadow = "3px 3px 10px #000000"
	},

	// Keycodes events pour slideRight ( Right Arrow et up) et SlideLeft ( left Arrow et down )

	keyupEvent: function(e){
		switch(e.keyCode){
			case 39:
				this.slideRight();
				break;
			case 38:
				this.slideRight();
				break;
			case 37:
				this.slideLeft();
				break;
			case 40:
				this.slideLeft();
				break;

		}
	}
};

	/*
	Slider.prototype est terminé
	*/

	// function to show sliders

	function Slider( showSliders )
	{
	// Attribuez des éléments à querySelector
	this.createSlider = document.querySelector( showSliders ); //

	// L'instruction return met fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante.
	this.init();
	}

	//console.log(Slider);



