var canvas = document.getElementById("renderCanvas");
var xPos = 0,
  yPos = 0,
  zPos = 0;

const theme = `
        <div id = 'introCard' class="card card-1">
            <h2 class="card__title">Search the Sprites</h2>
        </div>
			`;

let htmlContent = "";
htmlContent += theme;
var d = document.getElementById("Card");
d.insertAdjacentHTML("beforeend", htmlContent);

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

const theme3 = `
<div class="card">
<div id="Resturant_Name"></div>
<div class="container">
  <h4><b>John Doe</b></h4>
  <p>Architect & Engineer</p>
</div>
</div>
			`;

let htmlContent3 = "";
htmlContent3 += theme3;
document.body.insertAdjacentHTML("beforeend", htmlContent3);

var ul = document.getElementById("menuList");

var ov = document.createElement("div");
ov.classList.add("overlay");
ov.setAttribute = ("id", "overlayID");
document.body.appendChild(ov);

var left = document.createElement("h1");
left.textContent = "Move Right";
left.classList.add("translationRightButton");
left.setAttribute = ("id", "but");
left.addEventListener("click", translateRight);
left.innerHTML = "&rarr;";
ov.appendChild(left);

var right = document.createElement("h1");
right.classList.add("translationLeftButton");
right.setAttribute = ("id", "but2");
right.addEventListener("click", translateLeft);
right.innerHTML = "&larr;";
ov.appendChild(right);

var zFront = document.createElement("h1");
zFront.classList.add("translationFrontButton");
zFront.setAttribute = ("id", "zFront");
zFront.addEventListener("click", translateFront);
zFront.innerHTML = "&uarr;";
ov.appendChild(zFront);

var zBack = document.createElement("h1");
zBack.classList.add("translationBottomButton");
zBack.setAttribute = ("id", "zBack");
zBack.addEventListener("click", translateBack);
zBack.innerHTML = "&darr;";
ov.appendChild(zBack);

var yUp = document.createElement("button");
yUp.classList.add("translationYUP");
yUp.setAttribute = ("id", "yUP");
yUp.addEventListener("click", translateYUP);
yUp.innerHTML = "Up";
ov.appendChild(yUp);

var yDown = document.createElement("button");
yDown.classList.add("translationYDown");
yDown.setAttribute = ("id", "yDown");
yDown.addEventListener("click", translateYDown);
yDown.innerHTML = "Down";
ov.appendChild(yDown);

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

  //=======================================================
  const div = document.getElementById("test-div");
  const myArray = div.dataset.test.split("+");

  var keySet = [];
  var modelsInResturant = [];
  var selectedResturant;
  var currentMesh;

  for (var key of Object.keys(data)) {
    if (data[key].resturant == myArray[1]) {
      selectedResturant = data[key].resturant;
      modelsInResturant.push(data[key]);
      if (key == myArray[0]) {
        if (data[key].ModelName == "Platter") {
          BABYLON.SceneLoader.ImportMesh(
            ["Object_2", "Object_3", "Object_4"],
            "./models/",
            "Platter.glb",
            scene,
            function (meshes, particleSystems, skeletons) {
              let xQuat = new BABYLON.Quaternion();
              BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);
              var mID = 1;
              for (mesh of meshes) {
                if (mesh.name !== "__root__") {
                  // Move the loaded models to webarStage
                  mesh.numberID = 3;
                  mesh.name = mID;
                  currentMesh = "platter";
                  mesh.setParent(webarStage);
                  mesh.rotationQuaternion.multiplyInPlace(xQuat);
                  scaleByFactor(mesh, 0.375);
                  mID++;
                }
              }
            }
          );
        }

        if (data[key].ModelName == "burger") {
          BABYLON.SceneLoader.ImportMesh(
            ["mainMeshNode_Material_0_0"],
            "./models/",
            "burger.glb",
            scene,
            function (meshes, particleSystems, skeletons) {
              let xQuat = new BABYLON.Quaternion();
              BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);
              var mID = 1;
              for (mesh of meshes) {
                if (mesh.name !== "__root__") {
                  // Move the loaded models to webarStage
                  currentMesh = "burger";
                  mesh.setParent(webarStage);
                  mesh.rotationQuaternion.multiplyInPlace(xQuat);
                  scaleByFactor(mesh, 0.0975);
                  mID++;
                }
              }
            }
          );
        }
      }
    }
  }

  var i = 0;
  var m1 = document.createElement("li");
  m1.innerHTML = modelsInResturant[i].Name;
  m1.id = modelsInResturant[i].Name;
  m1.onclick = function () {
    //Remove Meshes
    if (currentMesh != "burger") {
      scene.getMeshById("1").dispose();
    }

    if (currentMesh != "platter") {
      scene.getMeshById("1").dispose();
      scene.getMeshById("2").dispose();
      scene.getMeshById("3").dispose();
    }

    BABYLON.SceneLoader.ImportMesh(
      ["mainMeshNode_Material_0_0"],
      "./models/",
      "burger.glb",
      scene,
      function (meshes, particleSystems, skeletons) {
        let xQuat = new BABYLON.Quaternion();
        BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);
        var mID = 1;
        for (mesh of meshes) {
          if (mesh.name !== "__root__") {
            // Move the loaded models to webarStage
            currentMesh = "burger";
            mesh.setParent(webarStage);
            mesh.rotationQuaternion.multiplyInPlace(xQuat);
            scaleByFactor(mesh, 0.0975);
            mID++;
          }
        }
      }
    );
  };
  ul.appendChild(m1);

  i = 1;
  var m2 = document.createElement("li");
  m2.innerHTML = modelsInResturant[i].Name;
  m2.id = modelsInResturant[i].Name;
  m2.onclick = function () {
    //Remove Meshes
    if (currentMesh != "burger") {
      scene.getMeshById("1").dispose();
    }

    if (currentMesh != "platter") {
      scene.getMeshById("1").dispose();
      scene.getMeshById("2").dispose();
      scene.getMeshById("3").dispose();
    }

    BABYLON.SceneLoader.ImportMesh(
      ["Object_2", "Object_3", "Object_4"],
      "./models/",
      "Platter.glb",
      scene,
      function (meshes, particleSystems, skeletons) {
        let xQuat = new BABYLON.Quaternion();
        BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);
        var mID = 1;
        for (mesh of meshes) {
          if (mesh.name !== "__root__") {
            mesh.name = mID;
            currentMesh = "platter";
            mesh.setParent(webarStage);
            mesh.rotationQuaternion.multiplyInPlace(xQuat);
            scaleByFactor(mesh, 0.375);
            mID++;
          }
        }
      }
    );
  };
  ul.appendChild(m2);

  console.log(document.getElementById("Meal 1"));

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

function renderSelectedModel(val) {
  console.log(val);
  // for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
  //   scene.getMeshById("object").dispose();
  // }

  // if (data[key].ModelName == "Platter") {
  //   BABYLON.SceneLoader.ImportMesh(
  //     ["Object_2", "Object_3", "Object_4"],
  //     "./models/",
  //     "Platter.glb",
  //     scene,
  //     function (meshes, particleSystems, skeletons) {
  //       let xQuat = new BABYLON.Quaternion();
  //       BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);

  //       for (mesh of meshes) {
  //         if (mesh.name !== "__root__") {
  //           mesh.name = "object";
  //           mesh.setParent(webarStage);
  //           mesh.rotationQuaternion.multiplyInPlace(xQuat);
  //           scaleByFactor(mesh, 0.375);
  //         }
  //       }
  //     }
  //   );
  // }

  // if (data[key].ModelName == "burger") {
  //   BABYLON.SceneLoader.ImportMesh(
  //     ["mainMeshNode_Material_0_0"],
  //     "./models/",
  //     "burger.glb",
  //     scene,
  //     function (meshes, particleSystems, skeletons) {
  //       let xQuat = new BABYLON.Quaternion();
  //       BABYLON.Quaternion.FromEulerAnglesToRef(Math.PI / 2, 0, 0, xQuat);

  //       for (mesh of meshes) {
  //         if (mesh.name !== "__root__") {
  //           // Move the loaded models to webarStage
  //           mesh.name = "object";
  //           mesh.setParent(webarStage);
  //           mesh.rotationQuaternion.multiplyInPlace(xQuat);
  //           scaleByFactor(mesh, 0.0975);
  //         }
  //       }
  //     }
  //   );
  // }
}

function translateRight() {
  xPos = xPos - 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.x = xPos;
  }
}

function translateLeft() {
  xPos = xPos + 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.x = xPos;
  }
}

function translateFront() {
  zPos = zPos + 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.z = zPos;
  }
}

function translateBack() {
  zPos = zPos - 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.z = zPos;
  }
}

function translateYUP() {
  yPos = yPos + 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.y = yPos;
  }
}

function translateYDown() {
  yPos = yPos - 0.1;

  for (var i = 0; i < scene.getMeshById("object").numberID; i++) {
    scene.getMeshByName("object").position.y = yPos;
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
