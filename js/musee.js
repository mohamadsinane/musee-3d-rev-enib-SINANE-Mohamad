var canvas, engine;
var scene, camera;
var elevatorGround, music;

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
		if (camera.position.x < 16 && camera.position.x > 13 && camera.position.z < -27.5 && camera.position.z > -30 && ready == true) {
			if (secondFloor == true) {
				animateElevator(camera, elevatorGround, -6, music);
				secondFloor = false
			}
			else {
				animateElevator(camera, elevatorGround, 6, music);
				secondFloor = true
			}
			ready = false
		}
		else if (camera.position.x < 16 && camera.position.x > 13 && camera.position.z < -27.5 && camera.position.z > -30) {
			ready = false
		}
		else {
			ready = true
		}
	});
}

function createLights() {
	entranceRoom_0 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(10, 4, -10));
	leftRoom = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(5, 4, -20));
	centerRoom = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(20, 4, -20));
	rightRoom = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(25, 4, -25));
	entranceRoom_1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(25, 8, -25));
	Room_1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(15, 26, -15));
}

function peuplerScene() {

	createStrucureForMuseum();
	placePaintings();
	addElevatorToScene();


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
	["assets/tableaux/Mona_lisa.jpg", "titre", "description", 20, 2.5, -0.1],
	["assets/tableaux/expo2.jpg", "titre", "description", 26, 2.5, -0.1]];
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
	sol.metadata = { "type": 'ground' };

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

	var roofBottomFloorWithCeiling = createWall(30, 15, 4, 4);
	roofBottomFloorWithCeiling.position = new BABYLON.Vector3(0, 6, -30);

	var stair = createStairs(0.3, 2.5, 7, 20, new BABYLON.Vector3(0, 0, 0));
	stair.position = new BABYLON.Vector3(25, 0.2, -5)
	stair.rotation = new BABYLON.Vector3(0, 3.14 / 2, 0)

	var bridge = createWall(3.5, 10,0,0)
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

	TopFloorEntrance = createWall(4, 4, 0, 0);
	TopFloorEntrance.position = new BABYLON.Vector3(13, 0, -26);

}

init();



