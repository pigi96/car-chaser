class Obstacle extends Model {
    constructor(type, pos) {
        super();

        if (type == 1) {
            this.createBuffers(house1Meshes);
            this.createTextures(house1Img);
            this.position[0] = pos[0];
            this.position[1] = pos[1];
            let angle = 0 / 4 * Math.PI;
            mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [1, 1, 0]);
            let matrix3 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], 0]);
            mat4.multiply(this.rotatedMatrix, this.rotatedMatrix, matrix3);
        } else if(type == 2) {
            this.createBuffers(containerMeshes);
            this.createTextures(containerImg);
            this.position[0] = pos[0];
            this.position[1] = pos[1];
            let angle = 0 / 4 * Math.PI;
            mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, [1, 0, 0]);
            let matrix3 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], -3]);
            mat4.multiply(this.rotatedMatrix, this.rotatedMatrix, matrix3);
        }
    }
}