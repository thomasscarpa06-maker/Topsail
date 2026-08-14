// Moteur WebGL du fond du hero (≥ 768 px).
//
// Logique reprise de shader-source.tsx, avec les corrections imposées par
// BRIEF.md :
//  - la classe WebGLRenderer vit au niveau module (hors de tout hook), elle
//    n'est donc plus recréée à chaque rendu ;
//  - PointerHandler et le gestionnaire de pointeur sont supprimés (le shader
//    n'utilise que les uniforms `resolution` et `time`) ;
//  - devicePixelRatio plafonné à 1 (voir createShaderBg).
//
// Le fragment shader est recoloré : filaments safran (#D98C1F) et olive
// (#3E8A66) sur fond encre (#15211C). Ni noir, ni dégradé orange.

import type { HeroBg } from "./heroBg";

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

// Structure de mouvement (nuages fbm + boucle de filaments) reprise telle
// quelle ; seule la colorisation finale est adaptée aux tokens du projet.
export const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
const vec3 ENCRE = vec3(0.082, 0.129, 0.110);
const vec3 SAFRAN = vec3(0.851, 0.549, 0.122);
const vec3 OLIVE = vec3(0.243, 0.541, 0.400);
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    vec3 tint=mix(OLIVE,SAFRAN,.5+.5*sin(i*.7+T*.2));
    col+=.0026/d*tint;
    float b=noise(i+p+bg*1.731);
    col+=.0026*b/length(max(p,vec2(b*p.x*.02,p.y)))*mix(OLIVE,SAFRAN,b);
    // Fumée : les nuages fbm, teintés dans la palette (olive sombre) au lieu
    // de l'orange d'origine. Même structure que le shader source (mix par d).
    col=mix(col,vec3(bg*.05,bg*.15,bg*.11),d);
  }
  // Sol encre : jamais de noir pur, jamais de dégradé orange.
  col+=ENCRE;
  O=vec4(col,1);
}`;

const VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];

export class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private uResolution: WebGLUniformLocation | null = null;
  private uTime: WebGLUniformLocation | null = null;

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, VERTEX_SRC);
    this.compile(this.fs, FRAGMENT_SRC);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program!;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    this.uResolution = gl.getUniformLocation(program, "resolution");
    this.uTime = gl.getUniformLocation(program, "time");
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  render(timeSeconds: number) {
    const gl = this.gl;
    const program = this.program;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uTime, timeSeconds);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
    if (this.buffer) gl.deleteBuffer(this.buffer);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

/**
 * Construit le fond shader. Renvoie `null` si le contexte `webgl2` est
 * indisponible — le composant bascule alors sur le canvas 2D (repli imposé).
 */
export function createShaderBg(canvas: HTMLCanvasElement): HeroBg | null {
  const gl = canvas.getContext("webgl2");
  if (!gl) return null;

  const renderer = new WebGLRenderer(canvas, gl);
  renderer.setup();
  renderer.init();

  // devicePixelRatio plafonné à 1 pour le shader.
  const dpr = Math.min(window.devicePixelRatio || 1, 1);

  return {
    resize(cssWidth, cssHeight) {
      renderer.setSize(
        Math.max(1, Math.round(cssWidth * dpr)),
        Math.max(1, Math.round(cssHeight * dpr)),
      );
    },
    draw(timeMs) {
      renderer.render(timeMs * 1e-3);
    },
    destroy() {
      renderer.destroy();
    },
  };
}
