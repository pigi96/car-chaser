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
                    loadJSONResource("../../assets/Cars.json", function(modelErr, carObj) {
                        if (modelErr) {
                            alert("Fatal error");
                            console.error(modelErr);
                        } else {
                            loadImage("../../assets/Car_01.png", function(imgErr, car1) {
                                if (imgErr) {
                                    alert("Fatal error");
                                    console.error(imgErr);
                                } else {
                                    loadImage("../../assets/Car_02.png", function(imgErr, car2) {
                                        if (imgErr) {
                                            alert("Fatal error");
                                            console.error(imgErr);
                                        } else {
                                            loadImage("../../assets/Car_04.png", function(imgErr, car4) {
                                                if (imgErr) {
                                                    alert("Fatal error");
                                                    console.error(imgErr);
                                                } else {
                                                    loadImage("../../assets/Car_06.png", function(imgErr, car6) {
                                                        if (imgErr) {
                                                            alert("Fatal error");
                                                            console.error(imgErr);
                                                        } else {
                                                            loadImage("../../assets/Car_08.png", function(imgErr, car8) {
                                                                if (imgErr) {
                                                                    alert("Fatal error");
                                                                    console.error(imgErr);
                                                                } else {
                                                                    loadImage("../../assets/Car_10.png", function(imgErr, car10) {
                                                                        if (imgErr) {
                                                                            alert("Fatal error");
                                                                            console.error(imgErr);
                                                                        } else {
                                                                            loadImage("../../assets/Car_11.png", function(imgErr, car11) {
                                                                                if (imgErr) {
                                                                                    alert("Fatal error");
                                                                                    console.error(imgErr);
                                                                                } else {
                                                                                    loadImage("../../assets/Car_12.png", function(imgErr, car12) {
                                                                                        if (imgErr) {
                                                                                            alert("Fatal error");
                                                                                            console.error(imgErr);
                                                                                        } else {
                                                                                            assetsLoaded(vsText, fsText, carObj, car1, car2, car4, car6, car8, car10, car11, car12);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            })
        }
    })
}
let vsText, fsText, carObj, car1, car2, car4, car6, car8, car10, car11, car12;
function assetsLoaded(vsText1, fsText1, carObja, car1a, car2a, car4a, car6a, car8a, car10a, car11a, car12a) {
    vsText = vsText1;
    fsText = fsText1;
    carObj = carObja;
    car1 = car1a;
    car2 = car2a;
    car4 = car4a;
    car6 = car6a;
    car8 = car8a;
    car10 = car10a;
    car11 = car11a;
    car12 = car12a;

    main();
}