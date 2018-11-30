class Obstacle extends Model {
    constructor(type, pos) {
        super();

        this.createBuffers(cabinMeshes);
        this.createTextures(cabinBrownImg);
        this.position[0] = pos[0];
        this.position[1] = pos[1];

        this.width = 3;
        this.height = 3;


        let matrix3 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], 0]);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix3);
        if (type == 1) {
            let angle = 4 / 4 * Math.PI;
            mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [1, 0, 0]);
        } else if(type == 2) {

        }
    }

    rotateObject() {
        //let angle = 4 / 4 * Math.PI;
        //mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [1, 0, 0]);

        //this.rotateModelCorrectlyCauseWeDontKnowHowToUseBlender();
    }
}