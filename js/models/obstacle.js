class Obstacle extends Model {
    constructor(pos) {
        super();

        this.createBuffers(cityObj, 1);
        this.createTextures(road);

        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
    }
}