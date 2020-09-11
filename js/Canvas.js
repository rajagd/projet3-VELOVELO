"use strict";
// Create Object Constructor for Canvas

Canvas.prototype = {
    init: function() {

        this.createCanvas = document.createElement('canvas'); // créer un canvas
        this.createCanvas.setAttribute('width', "250px"); //  width de canvas
        this.createCanvas.setAttribute('height', "100px"); // hauteur de canvas
        this.createCanvas.setAttribute('id', 'canvas'); // utiliser l'element canvas
        this.getCanvas.appendChild(this.createCanvas); // créer l'élément canvas
        this.ctx = this.createCanvas.getContext("2d"); // canvas design en  2d
        this.reservationButton = document.querySelector("#reservationButton"); // Reservation bouton
        this.confirmButton = document.querySelector("#confirmer"); // Confirm bouton
        this.confirmButton.style.display = "none"; // on affiche pas le bouton de confiration pour l'instant 
        this.cancelButton = document.querySelector("#annulerButton"); // annuler la réservation bouton
        this.resetButton = document.querySelector("#resetButton"); // Réinitialiser le bouton

        // les coordonées de souris initialement 

        this.mouseX = 1;
        this.mouseY = 1;

        //Les derniers coordonnées de souris 

        this.lastX = -1;
        this.lastY = -1;

        // les coordonées pour les écrans tactile 

        this.touchX = 0;
        this.touchY = 0;

        //this.mouseDown = true; // 
        //this.isDrawing = true; //

        this.isCanvas();
    },

    // draw canvas on mouse click

    isCanvas: function(){
        this.showCanvas();
    },

    showCanvas: function(){

        //addEventListener pour grandes  écrans
		
        this.createCanvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
        this.createCanvas.addEventListener('mousemove', function (e) { this.mouseMove(e);}.bind(this), false);
        window.addEventListener('mouseup', this.mouseUp.bind(this), false);

        //addEventListener pour les écrans tactiles

        this.createCanvas.addEventListener('touchstart', this.touchStart.bind(this), false);
        this.createCanvas.addEventListener('touchend', this.touchEnd.bind(this), false);
        this.createCanvas.addEventListener('touchmove', this.touchMove.bind(this), false);

        // clique sur le bouton confirmer
		
        this.confirmButton.addEventListener("click",this.removeCanvas.bind(this));

        // clique sur le bouton de réinitialiser
        this.resetButton.addEventListener("click", this.removeCanvas.bind(this));

        // clique sur le bouton d'Annuler
        this.cancelButton.addEventListener("click", this.removeCanvas.bind(this));

        //
        //this.reservationButton.addEventListener("click", this.removeCanvas.bind(this));
    },

		// mouseDown event
	
    	mouseDown: function(){
        this.mouseDown = true;
        this.createLines(this.ctx,this.mouseX,this.mouseY);
    },
        // mouseMove event 

    	mouseMove: function (e){
		
		// La méthode getMousePos () renvoie l'emplacement actuel du curseur de la souris dans le canevas.
		
        this.showMouseLines (e)
		
        // draw lines with mouse click
        if (this.mouseDown) {
            this.createLines(this.ctx,this.mouseX,this.mouseY);
        }
    },

    	// mouseUp event 

   	 	mouseUp: function(){
        this.mouseDown = false;
        this.lastX = -1;
        this.lastY = -1;
    },

    // showMouseLines renvoie l'emplacement actuel du curseur de la souris dans le canevas.

    	showMouseLines: function (e) {
        
			if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
    },

    // créer des lien sur le canavs

    createLines: function (ctx,x,y) {

        if (this.lastX === -1) {
            this.lastX = x;
            this.lastY = y;
        }

        // canvas
        this.ctx.lineCap = "round"; //
        this.ctx.beginPath(); // on va créer le chemin de ligne
        this.ctx.moveTo(this.lastX,this.lastY); // take last coordinates of the mouse
        this.ctx.lineTo(x,y); // actuel mouse position
        this.ctx.lineWidth = 3; // width de ligne
        this.ctx.stroke();  // opening of the path
        this.ctx.closePath(); // path closing
	

        // garder les derniers positions de la mouse 

        this.lastX=x;
        this.lastY=y;

        // on va afficher le bouton Confirmer 

        this.confirmButton.style.display = "inline";
    },

	// on affiche le bouton confirmer
    removeCanvas: function(){
        this.confirmButton.style.display = "none";
        this.ctx.clearRect(0, 0, 250, 100);
    },

    // event pour les écrans tactiles

    touchStart: function () {
        this.showTouchLines();
        this.createLines(this.ctx,this.touchX,this.touchY);
        event.preventDefault();
    },

    touchMove: function (e) {
        this.showTouchLines(e);
        this.createLines(this.ctx,this.touchX,this.touchY);
        event.preventDefault();
    },

    touchEnd: function () {
        //reinitialiser les coordonées de souris
        this.lastX= -1;
        this.lastY= -1;
    },

    // touch positions
    showTouchLines: function (e) {
        if(e.touches) {
            if (e.touches.length === 1) {
                this.touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
                this.touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;

            }
        }
    }

}

// function pour charger le canvas

function Canvas(showCanvas) {
    this.getCanvas = document.querySelector(showCanvas);
    this.init();
}
