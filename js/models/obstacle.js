class Obstacle extends Model {
    constructor(pos) {
        super();
        console.log(pos);
        this.createBuffers(carObj, 1);
        this.createTextures(car11);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        let matrix = mat4.fromTranslation(mat4.create(), pos);
        mat4.multiply(this.posMatrix, this.posMatrix, matrix);
        
    }
}