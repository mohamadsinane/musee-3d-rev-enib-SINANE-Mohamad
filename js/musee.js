var canvas, engine ;
var scene, camera ;

function init(){
	canvas = document.getElementById("renderCanvas") ; 
	engine = new BABYLON.Engine(canvas,true) ; 
	scene  = creerScene() ; 

	var isLocked = false;
	scene.onPointerDown = function(evt)
	{
		if (!isLocked) //if mouse is not locked
		{
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false; 
			//Test all requests from various browsers
			if (canvas.requestPointerLock) 
				canvas.requestPointerLock();
		}
	};

	camera = creerCamera("camera",{}, scene) ; 

	createLights() ;
	peuplerScene() ;  

	window.addEventListener("resize", function(){engine.resize();}) ; 
	engine.runRenderLoop( function(){scene.render();} ) ; 
}


function createLights(){
	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5,5,5), scene) ; 
}

function peuplerScene(){

	// Création du sol
	var sol = creerSol("sol",{},scene) ; 

	createStrucureForMuseum();
	
	var tableau = creerPoster("tableau1",{tableau:"assets/tableaux/Berthe.jpg"},scene) ;
	tableau.position.z = -0.1  ;  
	tableau.position.y = 1.7 ; 
}


function createStrucureForMuseum()
{
	var side_1 = createWall(30,6,2,4);
	var side_2 = createWall(30,6,0,0);
	var side_3 = createWall(30,6,0,0);
	var side_4 = createWall(30,6,0,0);
	
	side_1.rotation = new BABYLON.Vector3(-1.57,0,0)
	side_2.rotation = new BABYLON.Vector3(-1.57,0,0)
	side_3.rotation = new BABYLON.Vector3(-1.57,1.57,0)
	side_4.rotation = new BABYLON.Vector3(-1.57,1.57,0)
	
	side_2.position = new BABYLON.Vector3(0,0,-30)
	side_4.position = new BABYLON.Vector3(30,0,0)

	var midle_1 = createWall(10,6, 2,4);
	var midle_2 = createWall(10,6, 2,4);
	var midle_3 = createWall(10,6, 2,4);
	
	midle_1.rotation = new BABYLON.Vector3(-1.57,0,0)
	midle_2.rotation = new BABYLON.Vector3(-1.57,0,0)
	midle_3.rotation = new BABYLON.Vector3(-1.57,0,0)

	midle_1.position = new BABYLON.Vector3(0, -0.1,-15)
	midle_2.position = new BABYLON.Vector3(10,-0.1,-15)
	midle_3.position = new BABYLON.Vector3(20,-0.1,-15)
	
	var midle_1_2 = createWall(15,6,0,0);
	var midle_2_3 = createWall(15,6,0,0);

	midle_1_2.rotation = new BABYLON.Vector3(-1.57,1.57,0)
	midle_2_3.rotation = new BABYLON.Vector3(-1.57,1.57,0)

	midle_1_2.position = new BABYLON.Vector3(20, 0,-15)
	midle_2_3.position = new BABYLON.Vector3(10,0,-15)

}

init() ; 



