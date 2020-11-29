function creerScene() {
	var scn = new BABYLON.Scene(engine);
	scn.gravity = new BABYLON.Vector3(0, -.1, 0);
	scn.collisionsEnabled = true;
	return scn;
}


function creerCamera(name, options, scn) {
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	camera = new BABYLON.UniversalCamera(name, new BABYLON.Vector3(10, 1.7, -10), scn);
	camera.setTarget(new BABYLON.Vector3(0.0, 0.7, 0.0));

	camera.checkCollisions = true;
	camera.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
	camera.applyGravity = true;
	camera.keysUp = [90, 38];
	camera.keysDown = [40, 83];
	camera.keysLeft = [81, 37];
	camera.keysRight = [68, 39];
	camera.attachControl(canvas, true);
	camera.inertia = 0.01;
	camera.angularSensibility = 1000;
	if (!camera._collider) {
		camera._collider = new BABYLON.Collider();
	}
	camera._collider.radius = camera.ellipsoid;

	camera.attachControl(canvas, false);


	return camera
}


function creerMateriauSimple(nom, options, scn) {
	let couleur = options.couleur || null;
	let texture = options.texture || null;
	let uScale = options.uScale || 1.0;
	let vScale = options.vScale || 1.0;

	let materiau = new BABYLON.StandardMaterial(nom, scn);
	if (couleur != null) materiau.diffuseColor = couleur;
	if (texture != null) {
		materiau.diffuseTexture = new BABYLON.Texture(texture, scn);
		materiau.diffuseTexture.uScale = uScale;
		materiau.diffuseTexture.vScale = vScale;
	}
	return materiau;
}


function creerSphere(nom, opts, scn) {

	let options = opts || {};
	let diametre = options.diametre || 1.0;

	let sph = BABYLON.Mesh.CreateSphere(nom, diametre, 1, scn);
	sph.material = new BABYLON.StandardMaterial("blanc", scene);
	sph.material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);


	sph.metadata = { "type": 'sphere' }
	return sph;

}

function creerPoster(nom, opts, scn) {

	let options = opts || {};
	let hauteur = options["hauteur"] || 1.0;
	let largeur = options["largeur"] || 1.0;
	let textureName = options["tableau"] || "";

	var group = new BABYLON.TransformNode("group-" + nom)
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, { width: largeur, height: hauteur }, scn);
	tableau1.parent = group;
	tableau1.position.y = hauteur / 2.0;

	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;
	tableau1.checkCollisions = true;
	return group;

}

function creerCloison(nom, opts, scn) {

	let options = opts || {};
	let hauteur = options.hauteur || 3.0;
	let largeur = options.largeur || 5.0;
	let epaisseur = options.epaisseur || 0.1;

	let materiau = options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);

	let groupe = new BABYLON.TransformNode("groupe-" + nom);

	let cloison = BABYLON.MeshBuilder.CreateBox(nom, { width: largeur, height: hauteur, depth: epaisseur }, scn);
	cloison.material = materiau;
	cloison.parent = groupe;
	cloison.position.y = hauteur / 2.0;

	cloison.checkCollisions = true;

	return groupe;
}

function createElevatorStructure() {
	var height = 12;
	var width = 4;
	var doorWidth = 2.2;
	var doorHeight = 3.3
	var shape = [
		new BABYLON.Vector3(0, 0, height),
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(width, 0, 0),
		new BABYLON.Vector3(width, 0, height),
	];

	//Holes in XoZ plane
	var holes = [];
	holes[0] = [
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, doorHeight),
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, 0),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, 0),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, doorHeight),
	];
	holes[1] = [
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, doorHeight + height / 2),
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, height / 2),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, height / 2),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, doorHeight + height / 2),
	];

	var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/murTexture.jpg", scene);
	wallMaterial.diffuseTexture.uScale = 6.0;
	wallMaterial.diffuseTexture.vScale = 6.0;

	var frontWall = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, holes: holes, depth: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	frontWall.checkCollisions = true;
	frontWall.material = wallMaterial;
	var backWall = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, depth: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	backWall.checkCollisions = true;
	backWall.material = wallMaterial;
	var rightWall = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, depth: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	rightWall.checkCollisions = true;
	rightWall.material = wallMaterial;
	var leftWall = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, depth: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	leftWall.checkCollisions = true;
	leftWall.material = wallMaterial;

	frontWall.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	backWall.rotation = new BABYLON.Vector3(-1.57, 0, 0);
	rightWall.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);
	leftWall.rotation = new BABYLON.Vector3(-1.57, 1.57, 0);

	backWall.position = new BABYLON.Vector3(0, 0, -width - 0.5);
	leftWall.position = new BABYLON.Vector3(width - 0.5, 0, 0);

	let groupe = new BABYLON.TransformNode("shaft");
	frontWall.parent = groupe;
	backWall.parent = groupe;
	rightWall.parent = groupe;
	leftWall.parent = groupe;

	return groupe;
}

//Code reference: https://www.babylonjs-playground.com/#1OTXWR#17
var animatedElevator = function (camera, floor, toPositionY, music) {
	//Camera
	var animCamPosition = new BABYLON.Animation("animCam", "position", 15, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var CamerakeysPosition = [];

	CamerakeysPosition.push({
		frame: 0,
		value: camera.position
	});
	CamerakeysPosition.push({
		frame: 100,
		value: new BABYLON.Vector3(camera.position.x, camera.position.y + toPositionY, camera.position.z)
	});

	animCamPosition.setKeys(CamerakeysPosition);
	camera.animations.push(animCamPosition);

	//Floor
	var animFloorPosition = new BABYLON.Animation("animCam", "position", 15, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var FloorkeysPosition = [];

	FloorkeysPosition.push({
		frame: 0,
		value: floor.position
	});
	FloorkeysPosition.push({
		frame: 100,
		value: new BABYLON.Vector3(floor.position.x, floor.position.y + toPositionY, floor.position.z)
	});

	animFloorPosition.setKeys(FloorkeysPosition);
	floor.animations.push(animFloorPosition)

	music.play();
	scene.beginAnimation(camera, 0, 120, false, 1);
	scene.beginAnimation(floor, 0, 120, false, 1);

};

function createStairs(height, width, d, nb, initialPoint) {
	var initialPoint = initialPoint || BABYLON.Vector3.Zero()
	var boxes = [];
	var shape = [];
	for (var j = 0; j < nb; j++) {
		shape = [
			new BABYLON.Vector3(initialPoint.x, initialPoint.y + j * height, initialPoint.z),
		];
		shape.push(new BABYLON.Vector3(initialPoint.x - width / 2, initialPoint.y + j * height, initialPoint.z + d /2 ))
		shape.push(new BABYLON.Vector3(initialPoint.x + width / 2, initialPoint.y + j * height, initialPoint.z + d /2 ))
		var block = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, depth: height, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
		block.rotation = new BABYLON.Vector3(0, 2 * 3.14 * j / 20, 0)
		block.position = new BABYLON.Vector3(0, initialPoint.y + height * j, 0)
		boxes.push(block);
	}
	var cone = BABYLON.MeshBuilder.CreateCylinder("bar", { diameter: 0.3, tessellation: 4, height: 11 }, scene);
	boxes.push(cone)
	var stair = BABYLON.Mesh.MergeMeshes(boxes, true);
	stair.checkCollisions = true;
	return stair;
}



function createWall(width, height, doorWidth, doorHeight) {
	//Polygon shape in XoZ plane
	var shape = [
		new BABYLON.Vector3(0, 0, height),
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(width, 0, 0),
		new BABYLON.Vector3(width, 0, height),
	];
	//Holes in XoZ plane
	var holes = [];
	holes[0] = [
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, doorHeight),
		new BABYLON.Vector3(width / 2 - doorWidth / 2, 0, 0),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, 0),
		new BABYLON.Vector3(width / 2 + doorWidth / 2, 0, doorHeight),

	];

	var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/murTexture.jpg", scene);
	wallMaterial.diffuseTexture.uScale = 5.0;
	wallMaterial.diffuseTexture.vScale = 5.0;

	var polygon = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, holes: holes, depth: 0.2, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	polygon.checkCollisions = true;
	polygon.material = wallMaterial;

	return polygon
}

function placeAndRotateObject(object, posx, posy, posz, rotx, roty, rotz) {
	object.position = new BABYLON.Vector3(posx, posy, posz);
	object.rotation = new BABYLON.Vector3(rotx, roty, rotz);
}

function set_FPS_mode(scene, canvas, camera) {

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
