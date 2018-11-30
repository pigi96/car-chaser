class Obstacle extends Model {
    constructor(pos) {
        super();
        console.log(pos);
        this.createBuffers(house1Meshes);
        this.createTextures(house1Img);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
        
    }

    rotateObject() {
        let angle = 2 / 4 * Math.PI;
        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [0, 0, 1]);
        this.rotateModelCorrectlyCauseWeDontKnowHowToUseBlender();
    }
}