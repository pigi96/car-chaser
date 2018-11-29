class Obstacle extends Model {
    constructor(pos) {
        super();

        this.createBuffers(carObj, 1);
        this.createTextures(car11);

        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
    }
}