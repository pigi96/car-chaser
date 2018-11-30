"use strict"

let grassImg, roadForwardImg, road90Img, roadCrossImg, house1Img;
let car1Img, car2Img, car4Img, car6Img, car8Img, car10Img, car11Img;
let grassMeshes, roadForwardMeshes, road90Meshes, roadCrossMeshes, house1Meshes;
let car0Meshes, car1Meshes, car2Meshes, car3Meshes;
let hammerMeshes,crateMeshes;
let crateImg;
let containerMeshes, containerImg;
let hammerImg;
let cabinMeshes, blacksmithMeshes;
let cabinBlackImg, cabinBrownImg, blacksmithBlackImg, blacksmithBrownImg;

let vsText, fsText, carObj, car1, car2, car4, car6, car8;
let car10, car11, grassObj, grass, house1Obj, house1, roadForwardObj;
let roadForward, road90Obj, road90, roadCrossObj, roadCross, hammer;
let crate,crateTex,containerObj, containerTex, hammerTex;
let cabinObj, cabinBlackTex, cabinBrownTex, blacksmithObj, blacksmithBrownTex, blacksmithBlackTex;
function loadAssets() {
    loadTextResource("../../shaders/shader.vs.glsl").then(function (url) {
        vsText = url;
        return loadTextResource("../../shaders/shader.fs.glsl");
    }).then(function (url) {
        fsText = url;
        return loadJSONResource("../../assets/Cars.json");
    }).then(function (url) {
        carObj = url;
        return loadImage("../../assets/Car_01.png");
    }).then(function (url) {
        car1 = url;
        return loadImage("../../assets/Car_02.png");
    }).then(function (url) {
        car2 = url;
        return loadImage("../../assets/Car_04.png");
    }).then(function (url) {
        car4 = url;
        return loadImage("../../assets/Car_06.png");
    }).then(function (url) {
        car6 = url;
        return loadImage("../../assets/Car_08.png");
    }).then(function (url) {
        car8 = url;
        return loadImage("../../assets/Car_10.png");
    }).then(function (url) {
        car10 = url;
        return loadImage("../../assets/Car_11.png");
    }).then(function (url) {
        car11 = url;
        return loadJSONResource("../../assets/house1Obj.json");
    }).then(function (url) {
        house1Obj = url;
        return loadImage("../../assets/house1.png");
    }).then(function (url) {
        house1 = url;
        return loadJSONResource("../../assets/grassObj.json");
    }).then(function (url) {
        grassObj = url;
        return loadImage("../../assets/grass.jpg");
    }).then(function (url) {
        grass = url;
        return loadJSONResource("../../assets/roadForward.json");
    }).then(function (url) {
        roadForwardObj = url;
        return loadImage("../../assets/roadForwardTexture.jpg");
    }).then(function (url) {
        roadForward = url;
        return loadJSONResource("../../assets/road90.json");
    }).then(function (url) {
        road90Obj = url;
        return loadImage("../../assets/road90Texture.jpg");
    }).then(function (url) {
        road90 = url;
        return loadJSONResource("../../assets/roadCross.json");
    }).then(function (url) {
        roadCrossObj = url;
        return loadImage("../../assets/roadCrossTexture.jpg");
    }).then(function (url) {
        roadCross = url;
        return loadJSONResource("../../assets/hammer.json");
    }).then(function (url) {
        hammer = url;
        console.log(hammer);
        return loadJSONResource("../../assets/crate1.json");
    }).then(function (url) {
        crate = url;
        return loadImage("../../assets/crateTex.png");
    }).then(function (url) {
        crateTex = url;
        return loadJSONResource("../../assets/containerObj.json");
    }).then(function (url) {
        containerObj = url;
        return loadImage("../../assets/container.jpg");
    }).then(function (url) {
        containerTex = url;
        return loadImage("../../assets/hammerTex.jpg");
    }).then(function(url) {
        hammerTex = url;
        return loadJSONResource("../../assets/cabin.json");
    }).then(function (url) {
        cabinObj = url;
        return loadImage("../../assets/cabinBrown.jpg");
    }).then(function (url) {
        cabinBrownTex = url;
        return loadImage("../../assets/cabinBlack.jpg");
    }).then(function(url) {
        cabinBlackTex = url;
        return loadJSONResource("../../assets/blacksmith.json");
    }).then(function (url) {
        blacksmithObj = url;
        return loadImage("../../assets/blacksmithBrown.jpg");
    }).then(function (url) {
        blacksmithBrownTex = url;
        return loadImage("../../assets/blacksmithBlack.jpg");
    }).then(function (url) {
        blacksmithBlackTex = url;
        init();
    })
}

function init() {
    resize(carObj.meshes, 0);
    resize(grassObj.meshes, 15);
    resize(house1Obj.meshes, 6);
    resize(roadForwardObj.meshes, 6);
    resize(roadCrossObj.meshes, 15);
    resize(road90Obj.meshes, 16);
    resize(hammer.meshes, 2);
    resize(crate.meshes, 1);
    resize(containerObj.meshes, 5);
    resize(cabinObj.meshes, 5.5);
    resize(blacksmithObj.meshes, 5);
    load();
}

function setAssets() {
    grassImg = createTextures(grass);
    grassMeshes = createBuffers(grassObj, 0);
    roadForwardImg = createTextures(roadForward);
    roadForwardMeshes = createBuffers(roadForwardObj, 0);
    road90Img = createTextures(road90);
    road90Meshes = createBuffers(road90Obj, 0);
    roadCrossImg = createTextures(roadCross);
    roadCrossMeshes = createBuffers(roadCrossObj, 0);
    
    car0Meshes = createBuffers(carObj, 0);
    car1Meshes = createBuffers(carObj, 1);
    car2Meshes = createBuffers(carObj, 2);
    car3Meshes = createBuffers(carObj, 3);
    car1Img = createTextures(car1);
    car2Img = createTextures(car2);
    car4Img = createTextures(car4);
    car6Img = createTextures(car6);
    car8Img = createTextures(car8);
    car10Img = createTextures(car10);
    car11Img = createTextures(car11);

    house1Img = createTextures(house1);
    house1Meshes = createBuffers(house1Obj, 0);

    hammerMeshes = createBuffers(hammer,0);
    crateMeshes = createBuffers(crate,0);
    crateImg = createTextures(crateTex);

    containerMeshes = createBuffers(containerObj, 0);
    containerImg = createTextures(containerTex);

    hammerImg = createTextures(hammerTex);

    cabinMeshes = createBuffers(cabinObj, 0);
    cabinBrownImg = createTextures(cabinBrownTex);
    cabinBlackImg = createTextures(cabinBlackTex);

    blacksmithMeshes = createBuffers(blacksmithObj, 0);
    blacksmithBrownImg = createTextures(blacksmithBrownTex);
    blacksmithBlackImg = createTextures(blacksmithBlackTex);
}

function resize(mashes, rng){
    if (rng == 0) {
        for (var i = 0; i < mashes.length; i++) {
            let max = Math.max(...mashes[i].vertices);
            let min = Math.min(...mashes[i].vertices);
            let rng = 3;
            if (i == 1 || i == 2 || i == 3) {
                rng = 2;
            }
            for (var j = 0; j < mashes[i].vertices.length; j++) {
                mashes[i].vertices[j] = rng * (mashes[i].vertices[j] - min) / (max - min) - rng / 2;
            }

            // console.log(mashes[i].vertices);
        }
    } else {
        for (var i = 0; i < mashes.length; i++) {
            let max = Math.max(...mashes[i].vertices);
            let min = Math.min(...mashes[i].vertices);
            for (var j = 0; j < mashes[i].vertices.length; j++) {
                mashes[i].vertices[j] = rng * (mashes[i].vertices[j] - min) / (max - min) - rng / 2;
            }

            // console.log(mashes[i].vertices);
        }
    }
}