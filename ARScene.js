const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


const theme2 = `
  <input type="checkbox" id="ham-menu">
  <label for="ham-menu">
    <div class="hide-des">
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
    </div>
  
  </label>
  <div class="full-page-green"></div>
  <div class="ham-menu">
    <ul id="menuList" class="centre-text bold-text">
    </ul>
  </div>
			`;

let htmlContent2 = "";
htmlContent2 += theme2;
document.body.insertAdjacentHTML("beforeend", htmlContent2);

var ul = document.getElementById("menuList");

var ov = document.createElement("div");
ov.classList.add("overlay");
ov.setAttribute = ("id", "overlayID");

var left = document.createElement("button");
left.textContent = "Move Right";
left.classList.add("translationLeftButton");
left.setAttribute = ("id", "but");
left.addEventListener("click", translateLeft);
left.innerHTML = "&rarr;";
document.body.appendChild(left);

var right = document.createElement("button");
right.classList.add("translationRightButton");
right.setAttribute = ("id", "but2");
right.addEventListener("click", translateRight);
right.innerHTML = "&larr;";
document.body.appendChild(right);

var zFront = document.createElement("button");
zFront.classList.add("translationFrontButton");
zFront.setAttribute = ("id", "zFront");
zFront.addEventListener("click", translateFront);
zFront.innerHTML = "Front";
ov.appendChild(zFront);

var zBack = document.createElement("button");
zBack.classList.add("translationBackButton");
zBack.setAttribute = ("id", "zBack");
zBack.addEventListener("click", translateBack);
zBack.innerHTML = "Back";
ov.appendChild(zBack);

var yUp = document.createElement("button");
yUp.classList.add("translationYUP");
yUp.setAttribute = ("id", "yUP");
yUp.addEventListener("click", translateYUP);
yUp.innerHTML = "&uarr;";
document.body.appendChild(yUp);

var yDown = document.createElement("button");
yDown.classList.add("translationYDown");
yDown.setAttribute = ("id", "yDown");
yDown.addEventListener("click", translateYDown);
yDown.innerHTML = "&darr;";
document.body.appendChild(yDown);


document.body.appendChild(ov);

var canvas = document.getElementById("renderCanvas");
var xPos = 0,
  yPos = 0,
  zPos = 0;

var xRot = 0,
  yRot = 0,
  zRot = 0;

var modelsInResturant = [];
var selectedResturant;
var currentMesh;

var engine = null;
var sceneToRender = null;
var webarStage = null;
var scaleByFactor = function (obj, factor) {
  obj.scaling.x = obj.scaling.x * factor;
  obj.scaling.y = obj.scaling.y * factor;
  obj.scaling.z = obj.scaling.z * factor;
};

var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "./models/environment.dds",
    scene
  );

  var camera = new BABYLON.UniversalCamera(
    "camera1",
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  var light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(5, 10, -2),
    scene
  );
  light.intensity = 0.7;

  webarStage = new BABYLON.Mesh("webarStage", scene);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  //=======================================================

  //==========Getting from Domain
  const id = urlParams.get('Model');
  const myArray = id.split("/");
  //const myArray = ['Meal 1', 'Por Do Sol']

  //To Compare with coresponding Model in JSON
  for (var key of Object.keys(data)) {
    if (data[key].resturant == myArray[1]) {
      selectedResturant = data[key].resturant;
      modelsInResturant.push(data[key]);
      if (key == myArray[0]) {
        currentMesh = key;
      }
    }
  }

  //Rendering Title
  const theme3 = `
        <div id = 'introCard' class="card card-1">
            <h2 id="innerCard" class="card__title">Search the Sprites</h2>
        </div>
			`;

  let htmlContent3 = "";
  htmlContent3 += theme3;
  ov.insertAdjacentHTML("beforeend", htmlContent3);


  document.getElementById("innerCard").innerHTML = data[currentMesh].resturant;

  //Rendering Model in Scene and Setting up flag variables
  BABYLON.SceneLoader.ImportMesh(
    data[currentMesh].Meshes,
    data[currentMesh].path,
    data[currentMesh].object,
    scene,
    function (meshes) {
      let xQuat = new BABYLON.Quaternion();
      BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / data[currentMesh].rotX, data[currentMesh].rotY, data[currentMesh].rotZ, xQuat);
      for (mesh of meshes) {
        if (mesh.name !== "__root__") {
          mesh.setParent(webarStage);
          mesh.position.z = data[currentMesh].posZ;
          mesh.position.y = data[currentMesh].posY;
          mesh.rotationQuaternion.multiplyInPlace(xQuat);
          scaleByFactor(mesh, 0.375);
        }
      }
    }
  );

  xPos = data[currentMesh].posX;
  yPos = data[currentMesh].posY;
  zPos = data[currentMesh].posZ;

  //==============================================Buttons to Switch Model=====================================

  for (var i = 0; i < modelsInResturant.length; i++) {
    var m1 = document.createElement("li");
    m1.innerHTML = modelsInResturant[i].Name;
    m1.id = modelsInResturant[i].Name;
    ul.appendChild(m1);
    console.log(modelsInResturant[i].Name)
  }

  ul.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "LI") {
      renderSelectedModel(e.target.id);
    }
  });

  //=====================================================================================

  WEBARSDK.InitBabylonJs(canvas, scene, camera, webarStage);
  return scene;
};

window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  window.scene = createScene();
};

function renderSelectedModel(ModelName) {
  window.open('https://ar.food2view.com/ ' + '?Model=' + ModelName + '/' + data[currentMesh].resturant, "_self");
}


var currentPosition = { x: 0, y: 0 };
var clicked = false;
var onPointerDown = function (evt) {
  currentPosition.x = evt.clientX;
  currentPosition.y = evt.clientY;
  clicked = true;
};

var onPointerMove = function (evt) {

  if (!clicked) {
    return;
  }

  var dx = evt.clientX - currentPosition.x;
  var dy = evt.clientY - currentPosition.y;

  var angleX = dy * 0.001;
  var angleY = dx * 0.0001;

  if (angleY < 0) {
    for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
      scene.getMeshByName(data[currentMesh].Meshes[i]).addRotation(0, 0, xRot + 0.1);
    }
  }

  if (angleY > 0) {
    for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
      scene.getMeshByName(data[currentMesh].Meshes[i]).addRotation(0, 0, xRot - 0.1);
    }
  }


  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).addRotation(0, 0, xRot);
  }
  currentPosition.x = evt.clientX;
  currentPosition.y = evt.clientY;
};

var onPointerUp = function (evt) {
  clicked = false;
}

function translateRight() {
  xPos = xPos - (-0.1);
  console.log(xPos)
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.x = xPos + 1;
  }
}

function translateLeft() {
  xPos = xPos - 0.1;
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.x = xPos;
  }
}

function translateFront() {
  zPos = zPos - (-0.1);
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.z = zPos;
  }
}

function translateBack() {
  zPos = zPos - 0.1;
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.z = zPos;
  }
}

function translateYUP() {
  yPos = yPos - (-0.1);
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.y = yPos;
  }
}

function translateYDown() {
  yPos = yPos - 0.1;
  for (var i = 0; i < data[currentMesh].Meshes.length; i++) {
    scene.getMeshByName(data[currentMesh].Meshes[i]).position.y = yPos;
  }
}

initFunction().then(() => {
  sceneToRender = window.scene;
  sceneToRender.executeWhenReady(function () {
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  });
});

window.addEventListener("resize", function () {
  engine.resize();
});

WEBARSDK.SetStageReadyCallback(() => {
  console.info("Stage is ready now!!!");
});