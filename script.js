
var canvas = document.getElementById('canvas');

var context = canvas.getContext('2d'); 




// ---------------------Hilfsvariabeln ------------------------


var currentImage = null;
var kreis = false;
var isDrawing = false;
var size = 3;
var height = 35;
var width = 35;
var farbe = "#000";
var ypos = 30;
var anim = null;



// ---------- Canvas Erscheinungsbild beim Start ---------------


canvas.style.backgroundColor = "#bfc5ff";



// ---------------------------------------------------------------
// ------------------------ Buttons Malen ------------------------
// ---------------------------------------------------------------

kreis = true;
currentImage = null;



// ---------------------------------------------------------------
// --------------------------- Animation -------------------------
// ---------------------------------------------------------------


if (document.getElementById('buta')) {

    var button = document.getElementById('buta');
button.onclick = function() {
	anim = an1;
	context2.fillStyle="#000";
	context2.beginPath();
	context2.fillRect(20,20,200,200);
	context2.closePath();
	}

	}
	
	// Positionsangaben auf der X-Achse für die 3 Kugeln
var pos = {
	x:0,
	y:0
	};
// Intervall starten und alle 30ms ausführen
var iv = setInterval('step()', 30);

function step()
	{		
// Kugeln zeichnen	

drawKugel(500, 10, 0);  // rot
		
drawKugel(200, 5, 1);  // grün
		
drawKugel(10,  1, 2);  // blau
	}

function drawKugel(delta, speed, id)	

{
// Hintergrundlinie zeichnen
drawLinie(delta);
// aktuelle x-Position der Kugel
		
var x = positions[id];

// y-Position berechnen
var  y = (canvas.height / 2);	
			

// Kugel zeichnen		
			
context.drawImage(anim, x, y);

// neue x-Position speichern
		
positions[id] += speed;
		
		
// falls die neue Position größer als das Canvas ist, wieder links anfangen

if(positions[id] > canvas.width){			
positions[id] -= canvas.width;
}	}

function drawLinie(delta){
	
context.beginPath();
context.strokeStyle = '#DDDDDD';

for(var x=0; x<canvas.width; x++) {
// y-Position berechnen
var y = (canvas.height / 2);
				
// nächsten Punkt zeichnen
context.lineTo(x, y);
}
			
		
context.closePath();
}


// ---------------------------------------------------------------
// ---------------------- Phone Movement -------------------------
// ---------------------------------------------------------------


function handleOrientation(event) {
  var xh = event.beta;  // In degree in the range [-180,180]
  var yh = event.gamma; // In degree in the range [-90,90]

  if (xh >  90) { xh =  90};
  if (xh < -90) { xh = -90};

  xh += 90;
  yh += 90;

  isDrawing = true;

  var x2 = xh  - canvas.offsetLeft;
  var y2 = yh - canvas.offsetTop; 
  context.beginPath();
  context.fillStyle = farbe; 
  context.arc(x2, y2, size, 0, Math.PI*2, true);
  context.fill();
  context.closePath();

}


function handlemotion(event) {
  var n = event.acceleration.x;  // In degree in the range [-180,180]
  var m = event.acceleration.y; // In degree in the range [-90,90]

  isDrawing = true;

  var x2 = n  - canvas.offsetLeft;
  var y2 = m - canvas.offsetTop; 
  context.beginPath();
  context.fillStyle = farbe; 
  context.arc(x2, y2, size, 0, Math.PI*2, true);
  context.fill();
  context.closePath();
  console.log(n + " " + m);
}

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handlemotion);

// ---------------------------------------------------------------
// ---------------------- Zeichnen Funktionen --------------------
// ---------------------------------------------------------------


canvas.onmousedown = function(event){
		
if(event.button == 0){
isDrawing = true;
canvas.onmousemove(event);
}

var x2 = event.clientX - canvas.offsetLeft;
var y2 = event.clientY - canvas.offsetTop; 


	
}

// -------------------- Maustaste loslassen ----------------------
	
	
canvas.onmouseup = function(event){		
if(event.button == 0){
isDrawing = false;		
}}
	


// -------------- Maus bewegen / mit Maus zeichnen ---------------


canvas.onmousemove = function(event){

var x = event.clientX - canvas.offsetLeft;
var y = event.clientY - canvas.offsetTop;
 


// -------------------- Kreis malen -----------------

if (isDrawing == true && kreis == true) {
	context.beginPath();
	context.fillStyle = farbe; 
    context.arc(x, y, size, 0, Math.PI*2, true);
    context.fill();
	context.closePath();
	}
  console.log(x + " " + y);

}



// ---------------------------------------------------------------
// ---------------------- Screen säubern -------------------------
// ---------------------------------------------------------------


window.onkeydown = function(event){
console.log(event.keyCode);
		
if(event.keyCode == 67){
context.clearRect(0, 0, canvas.width, canvas.height);		
}
}

