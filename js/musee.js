var canvas, engine;
var scene, camera;
var elevatorGround;
var music;

function init() {
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);
	scene = creerScene();
	music = new BABYLON.Sound("MusicElevator", "assets/audios/music_in_elevator.wav", scene, null, { loop: false, autoplay: false, length: 4, offset: 0 });
	var isLocked = false;
	
	scene.onPointerDown = function (evt) {
		if (!isLocked) //if mouse is not locked
		{
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
			//Test all requests from various browsers
			if (canvas.requestPointerLock)
				canvas.requestPointerLock();
		}
	};

	camera = creerCamera("camera", {}, scene);
	createLights();
	peuplerScene();
	addEventsToScene();
	engine.runRenderLoop(function () { scene.render(); });
}

function createLights() {
	var outside_0 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(15, 11, -5));
	outside_0.intensity = 0.7;
	var rightRoom_0 =new BABYLON.PointLight("pointLight", new BABYLON.Vector3(5, 2.5, -22));
	rightRoom_0.intensity = 0.8;
	rightRoom_0.range = 9;
	var midRoom_0 =new BABYLON.PointLight("pointLight", new BABYLON.Vector3(15, 2.5, -22));
	midRoom_0.intensity = 0.8;
	midRoom_0.range = 9;
	var leftRoom_0 =new BABYLON.PointLight("pointLight", new BABYLON.Vector3(25, 2.5, -22));
	leftRoom_0.intensity = 0.8;
	leftRoom_0.range = 9;
}

function addEventsToScene() {
	var ready = true;
	var secondFloor = false;
	window.addEventListener("resize", function () { engine.resize(); });
	document.addEventListener('keydown', function (e) {
		if (e.keyCode === 75 && secondFloor === false) {
			animatedElevator(camera, elevatorGround, 6, music);
			secondFloor = true
		}
		else if (e.keyCode === 75 && secondFloor === true) {
			animatedElevator(camera, elevatorGround, -6, music);
			secondFloor = false
		}
	});
	scene.registerBeforeRender(function () {
		if (camera.position.x < 16 && camera.position.x > 13 && camera.position.z < -26 && camera.position.z > -30 && ready == true) {
			if (secondFloor == true) {
				camera.position.z = -27.5;
				animateElevator(camera, elevatorGround, -6, music);
				secondFloor = false;
			}
			else {
				camera.position.z = -27.5;
				animateElevator(camera, elevatorGround, 6, music);
				secondFloor = true;
			}
			ready = false
		}
		else if (camera.position.x < 16 && camera.position.x > 13 && camera.position.z < -26 && camera.position.z > -30) {
			ready = false
		}
		else {
			ready = true
		}
	});
}

function addElevatorToScene() {
	var shaft = createElevatorStructure();
	shaft.position = new BABYLON.Vector3(13, 0, -26);
	elevatorGround = createWall(4, 4, 0, 0);
	elevatorGround.position = new BABYLON.Vector3(13, 0, -30);
}

function placePaintings() {
	var paintingsList = [["assets/tableaux/ocean.jpg", "titre", "description", 4, 2.5, -0.1],
	["assets/tableaux/sun.jpg", "titre", "description", 10, 2.5, -0.1],
	["assets/tableaux/Mona_lisa.jpg", "titre", "description", 20, 2.5, -0.1]];

	paintingsList.forEach(element => {
		var tableau = creerPoster("tableau",{tableau:element[0]},scene);
		tableau.position = new BABYLON.Vector3(element[3], element[4], element[5])
	});

	var paintingsList_Minus90 = [
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 2.5, -10.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 2.5, -5.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 2.5, -20.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 2.5, -25.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 10.55, 2.5, -18.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 10.55, 2.5, -21.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 10.55, 2.5, -24.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 20.55, 2.5, -20.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 20.55, 2.5, -25.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 8.5, -18.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 0.55, 8.5, -24.1]
	];
	paintingsList_Minus90.forEach(element => {
		var tableau = creerPoster("tableau",{tableau:element[0]},scene);
		tableau.position = new BABYLON.Vector3(element[3], element[4], element[5])
		tableau.rotation = new BABYLON.Vector3(0,-1.57,0)
	});

	var paintingsList_Plus90 = [
		["assets/tableaux/monet1.jpg", "titre", "description",  30, 2.5, -5.1],
		["assets/tableaux/monet1.jpg", "titre", "description",  30, 2.5, -10.1],
		["assets/tableaux/monet1.jpg", "titre", "description",10, 2.5, -20.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 10, 2.5, -25.1],
		["assets/tableaux/monet1.jpg", "titre", "description",  20, 2.5, -18.1],
		["assets/tableaux/monet1.jpg", "titre", "description",  20, 2.5, -21.1],
		["assets/tableaux/monet1.jpg", "titre", "description",  20, 2.5, -24.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 30, 2.5, -20.1],
		["assets/tableaux/monet1.jpg", "titre", "description",  30, 2.5, -25.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 30, 8.5, -18.1],
		["assets/tableaux/monet1.jpg", "titre", "description", 30, 8.5, -24.1]
	];
	paintingsList_Plus90.forEach(element => {
		var tableau = creerPoster("tableau",{tableau:element[0]},scene);
		tableau.position = new BABYLON.Vector3(element[3], element[4], element[5])
		tableau.rotation = new BABYLON.Vector3(0,1.57,0)
	});


	var  paintingsList_180 = [
		["assets/tableaux/monet1.jpg", "titre", "description", 3, 2.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 7, 2.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 23, 2.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 27, 2.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 5, 8.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 10, 8.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 20, 8.5, -29.45],
		["assets/tableaux/monet1.jpg", "titre", "description", 25, 8.5, -29.45]
	];
	
	paintingsList_180.forEach(element => {
		var tableau = creerPoster("tableau",{tableau:element[0]},scene);
		tableau.position = new BABYLON.Vector3(element[3], element[4], element[5])
		tableau.rotation = new BABYLON.Vector3(0,3.14,0)
	});

}

function addStatuesToScene()
{
	var scaling = new BABYLON.Vector3(.025, .025, .025);
	createStatue("assets/statues/", "statue1.stl", scene, scaling,new BABYLON.Vector3(16.9, .1, -13.7), 3.14);
	createStatue("assets/statues/", "statue1.stl", scene, scaling,new BABYLON.Vector3(14, .1, -13.7), 3.14);
	createStatue("assets/statues/", "statue2.stl", scene, scaling, new BABYLON.Vector3(14.5, .1, -7.5), 1.57);
}


function createStrucureForMuseum() {
	var sol = createWall(30, 30, 0, 0)
	sol.position = new BABYLON.Vector3(0, 0, -30)
	sol.material = new BABYLON.StandardMaterial("blanc", scene);
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/groundTexture.jpg', scene);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/groundTexture.jpg', scene);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/groundTexture.jpg', scene);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/groundTexture.jpg', scene);
	sol.material.diffuseTexture.uScale = 30.0;
	sol.material.diffuseTexture.vScale = 30.0;
	sol.material.specularTexture.uScale = 30.0;
	sol.material.specularTexture.vScale = 30.0;
	sol.material.emissiveTexture.uScale = 30.0;
	sol.material.emissiveTexture.vScale = 30.0;
	sol.material.ambientTexture.uScale = 30.0;
	sol.material.ambientTexture.vScale = 30.0;
	sol.receiveShadows = true;
	sol.metadata = { "type": 'ground' };



	var topWallMaterial = new BABYLON.StandardMaterial("wallmaterial", scene);
	topWallMaterial.maxSimultaneousLights = 6;
	topWallMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/roofDark.jpg", scene);
	topWallMaterial.diffuseTexture.uScale = 6.0;
	topWallMaterial.diffuseTexture.vScale = 6.0;


	var sideBottomFloor_1 = createWall(30, 6, 0, 0);
	var sideBottomFloor_2 = createWall(30, 6, 0, 0);
	var sideBottomFloor_3 = createWall(30, 6, 0, 0);
	var sideBottomFloor_4 = createWall(30, 6, 0, 0);

	sideBottomFloor_1.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	sideBottomFloor_2.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	sideBottomFloor_3.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);
	sideBottomFloor_4.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);

	sideBottomFloor_2.position = new BABYLON.Vector3(0, 0, -30);
	sideBottomFloor_4.position = new BABYLON.Vector3(30, 0, 0);

	var midle_1 = createWall(10, 6, 2, 4);
	var midle_2 = createWall(10, 6, 2, 4);
	var midle_3 = createWall(10, 6, 2, 4);

	midle_1.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	midle_2.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	midle_3.rotation = new BABYLON.Vector3(-1.57, 0, 0);

	midle_1.position = new BABYLON.Vector3(0, -0.1, -15);
	midle_2.position = new BABYLON.Vector3(10, -0.1, -15);
	midle_3.position = new BABYLON.Vector3(20, -0.1, -15);

	var midle_1_2 = createWall(15, 6, 0, 0);
	var midle_2_3 = createWall(15, 6, 0, 0);

	midle_1_2.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);
	midle_2_3.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);

	midle_1_2.position = new BABYLON.Vector3(20, 0, -15);
	midle_2_3.position = new BABYLON.Vector3(10, 0, -15);

	var roofBottomFloorWithCeiling = createWall(30, 15, 4, 4);
	roofBottomFloorWithCeiling.position = new BABYLON.Vector3(0, 6, -30);
	roofBottomFloorWithCeiling.material = topWallMaterial

	var stair = createStairs(0.3, 2.5, 7, 20, new BABYLON.Vector3(0, 0, 0));
	stair.position = new BABYLON.Vector3(25, 0.2, -5)
	stair.rotation = new BABYLON.Vector3(0, 3.14 / 2, 0)

	var bridge = createWall(3.5,10,0,0)
	bridge.position = new BABYLON.Vector3(25, 6, -15)

	var sideTopFloor_1 = createWall(30, 6, 0, 0);
	var sideTopFloor_2 = createWall(30, 6, 0, 0);
	var sideTopFloor_3 = createWall(30, 6, 0, 0);
	var sideTopFloor_4 = createWall(30, 6, 0, 0);


	sideTopFloor_1.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	sideTopFloor_2.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	sideTopFloor_3.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);
	sideTopFloor_4.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);

	sideTopFloor_1.position = new BABYLON.Vector3(0, 6, 0);
	sideTopFloor_3.position = new BABYLON.Vector3(0, 6, 0);
	sideTopFloor_2.position = new BABYLON.Vector3(0, 6, -30);
	sideTopFloor_4.position = new BABYLON.Vector3(30, 6, 0);


	var roofTopFloor = createWall(30, 30, 0, 0);
	roofTopFloor.position = new BABYLON.Vector3(0, 12, -30);
	roofTopFloor.material = topWallMaterial
}

function peuplerScene() {
	createStrucureForMuseum();
	placePaintings();
	addElevatorToScene();
	addStatuesToScene();
	addBancs();
}

function addBancs()
{
	var scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
	var position_banc = new BABYLON.Vector3(14.5, 0.1, -2.0);
	var position_second_banc = new BABYLON.Vector3(14.5, 6.1, -16.0);
	createStatue("assets/", "bench.gltf", scene, scaling, position_banc, 1.57);
	createStatue("assets/", "bench.gltf", scene, scaling, position_second_banc, 1.57);
}


init();



