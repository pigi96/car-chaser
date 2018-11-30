class Road extends Model {
    constructor(type, pos, angle, matAngle) {
        super();

        switch (type) {
            case 1:
                this.createBuffers(roadForwardObj, 0);
                this.createTextures(roadForward);
                let matrix1 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], 0.45]);
                mat4.multiply(this.posMatrix, this.posMatrix, matrix1);
                break;
            case 2:
                this.createBuffers(road90Obj, 0);
                this.createTextures(road90);
                let matrix2 = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], 0.30]);
                mat4.multiply(this.posMatrix, this.posMatrix, matrix2);
                break;
            case 3:
                this.createBuffers(roadCrossObj, 0);
                this.createTextures(roadCross);
                let matrix = mat4.fromTranslation(mat4.create(), [pos[0], pos[1], 0.30]);
                mat4.multiply(this.posMatrix, this.posMatrix, matrix);
                break;
        }

        mat4.rotate(this.rotatedMatrix, this.posMatrix, angle, matAngle);
    }
}