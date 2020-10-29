var canvas, engine ;
var scene, camera ;

function init(){
	canvas = document.getElementById("renderCanvas") ; 
	engine = new BABYLON.Engine(canvas,true) ; 
	scene  = creerScene() ; 

	camera = creerCamera("camera",{}, scene) ; 

	
	createLights() ;
	peuplerScene() ;  

	set_FPS_mode(scene, canvas,camera) ; 

	window.addEventListener("resize", function(){engine.resize();}) ; 

	engine.runRenderLoop( function(){scene.render();} ) ; 
}


function createLights(){
	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5,5,5), scene) ; 
}



function peuplerScene(){

	// Création du sol
	var sol = creerSol("sol",{},scene) ; 

	// Création d'une cloison

	var materiauRouge = creerMateriauSimple("rouge",{couleur:new BABYLON.Color3(0.8,0.1,0.1)},scene) ;

	var materiauCloison = creerMateriauSimple("mat-cloison",{texture:"assets/textures/murs.jpg"}, scene) ; 

	
	var cloison = creerCloison("cloison",{hauteur:1.0,largeur:1.0,materiau:materiauRouge},scene) ; 

	var cloison1 = creerCloison("cloison",{hauteur:3.0, largeur:5.0,materiau:materiauCloison},scene) ;
	cloison1.position = new BABYLON.Vector3(5,0,-5) ; 
	cloison1.rotation.y = Math.PI ;

	for(var i=0; i< 10; i++){
		var cl = creerCloison("cloison-"+i, {materiau:materiauCloison}, scene) ; 
		cl.position = new BABYLON.Vector3(0,0,-5*i) ; 
	} 

	// Création d un tableau
	var tableau = creerPoster("tableau1",{tableau:"assets/tableaux/Berthe.jpg"},scene) ;
	tableau.parent = cloison1 ; // on accroche le tableau à la cloison 
	tableau.position.z = -0.1  ;  
	tableau.position.y = 1.7 ; 
	


	// Création d une sphere
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1.0}, scene) ; 

	sphere.material = new BABYLON.StandardMaterial("materiau1", scene) ; 
	

}

var isLocked = false ; 

function set_FPS_mode(scene, canvas, camera){

	// On click event, request pointer lock
	scene.onPointerDown = function (evt) {

		//true/false check if we're locked, faster than checking pointerlock on each single click.
		if (!isLocked) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}

		//continue with shooting requests or whatever :P
		//evt === 0 (left mouse click)
		//evt === 1 (mouse wheel click (not scrolling))
		//evt === 2 (right mouse click)
	};

	// Event listener when the pointerlock is updated (or removed by pressing ESC for example).
	var pointerlockchange = function () {
		var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

		// If the user is already locked
		if (!controlEnabled) {
			camera.detachControl(canvas);
			isLocked = false;
		} else {
			camera.attachControl(canvas);
			setTimeout(() => {
				isLocked = true;
			}, 100);

		}
	};

	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

}

init() ;
