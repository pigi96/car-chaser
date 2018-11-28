function loadAssets() {
    loadTextResource("../../shaders/shader.vs.glsl", function(vsErr, vsText) {
        if (vsErr) {
            alert("Fatal error");
            console.error(vsErr);
        } else {
            loadTextResource("../../shaders/shader.fs.glsl", function(fsErr, fsText) {
                if (fsErr) {
                    alert("Fatal error");
                    console.error(fsErr);
                } else {
                    loadJSONResource("../../assets/Susan.json", function(modelErr, modelObj) {
                        if (modelErr) {
                            alert("Fatal error");
                            console.error(modelErr);
                        } else {
                            loadImage("../../assets/SusanTexture.png", function(imgErr, img) {
                                if (imgErr) {
                                    alert("Fatal error");
                                    console.error(imgErr);
                                } else {
                                    assetsLoaded(vsText, fsText, modelObj, img);
                                }
                            })
                        }
                    });
                }
            })
        }
    })
}

let vsText, fsText, modelObj, img;
function assetsLoaded(vsText1, fsText1, modelObj1, img1) {
    vsText = vsText1;
    fsText = fsText1;
    modelObj = modelObj1;
    img = img1;

    main();
}