class Ground extends Model {
    constructor(pos) {
        super();

        this.createBuffers(grassObj, 0);
        this.createTextures(grass);

        let angle = 4 / 4 * Math.PI;
        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [1, 1, 0]);
        let matrix3 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], -1]);
        mat4.multiply(this.rotatedMatrix, this.rotatedMatrix, matrix3);
    }
}