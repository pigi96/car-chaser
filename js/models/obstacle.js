class Obstacle extends Model {
    constructor(pos) {
        super();

        this.createBuffers(modelObj);
        this.createTextures(img);

        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
    }
}