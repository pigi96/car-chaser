precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aVertexColor;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  fragTexCoord = aVertexColor;
  gl_Position = mProj * mView * mWorld * vec4(aVertexPosition, 1.0);
}