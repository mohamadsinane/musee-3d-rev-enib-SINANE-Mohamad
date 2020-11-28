var canvas, engine;
var scene, camera;
var light;
var elevatorGround;
var upStair = false;

function init() {
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);
	scene = creerScene();

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

function addEventsToScene() {
	window.addEventListener("resize", function () { engine.resize(); });
	document.addEventListener('keydown', function (e) {
		if (e.keyCode === 75 && upStair === false) {
			animatedElevator(camera, elevatorGround, 6);
			upStair = true
		}
		else if (e.keyCode === 75 && upStair === true) {
			animatedElevator(camera, elevatorGround, -6);
			upStair = false
		}
	});
}

function createLights() {
	ligh = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(10, 4, -10));
	light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(20, 4, -20));
	light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(25, 4, -25));
	light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(25, 8, -25));
}

function peuplerScene() {

	createStrucureForMuseum();
	placePaintings();

}

function placePaintings() {
	var paintingsList = [["assets/tableaux/ocean.jpg", "titre", "description", 4, 2.5, -0.1],
	["assets/tableaux/sun.jpg", "titre", "description", 10, 2.5, -0.1],
	["assets/tableaux/Mona_lisa.jpg", "titre", "description", 16, 2.5, -0.1]];

	paintingsList.forEach(element => {
		var tableau = creerPoster("tableau", { tableau: element[0] }, scene);
		tableau.position = new BABYLON.Vector3(element[3], element[4], element[5])
	});

}

function createStrucureForMuseum() {
	var sol = createWall(30, 30, 0, 0)
	sol.position = new BABYLON.Vector3(0, 0, -30)
	sol.material = new BABYLON.StandardMaterial("blanc", scene);
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/solTexture.jpg', scene);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/solTexture.jpg', scene);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/solTexture.jpg', scene);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/solTexture.jpg', scene);
	sol.material.diffuseTexture.uScale = 30.0;
	sol.material.diffuseTexture.vScale = 30.0;
	sol.material.specularTexture.uScale = 30.0;
	sol.material.specularTexture.vScale = 30.0;
	sol.material.emissiveTexture.uScale = 30.0;
	sol.material.emissiveTexture.vScale = 30.0;
	sol.material.ambientTexture.uScale = 30.0;
	sol.material.ambientTexture.vScale = 30.0;
	sol.receiveShadows = true;
	sol.metadata = { "type": 'ground' }

	var sideBottomFloor_1 = createWall(30, 6, 2, 4);
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

	var roofBottomFloorWithCeiling = createWall(30, 30, 4, 4);
	roofBottomFloorWithCeiling.position = new BABYLON.Vector3(0, 6, -30);

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

	var shaft = createElevatorShaft();
	shaft.position = new BABYLON.Vector3(13, 0, -26);
	elevatorGround = createWall(4, 4, 0, 0);
	elevatorGround.position = new BABYLON.Vector3(13, 0, -30);


}

init();



