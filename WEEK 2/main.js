function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // ================= Huruf M =================
        // Batang vertikal kiri (4 titik)
        -0.85, -0.6,
        -0.77, -0.6,
        -0.85,  0.6,
        -0.77,  0.6,

        // Diagonal kiri ke tengah (4 titik)
        -0.85,  0.6,
        -0.77,  0.6,
        -0.64, -0.05,
        -0.56, -0.05,

        // Diagonal tengah ke kanan (4 titik)
        -0.64, -0.05,
        -0.56, -0.05,
        -0.43,  0.6,
        -0.35,  0.6,

        // Batang vertikal kanan (4 titik)
        -0.43, -0.6,
        -0.35, -0.6,
        -0.43,  0.6,
        -0.35,  0.6,

        // ================= Huruf A (Pertama) =================
        // Kaki kiri (4 titik)
        -0.25, -0.6,
        -0.17, -0.6,
        -0.04,  0.6,
         0.04,  0.6,

        // Kaki kanan (4 titik)
        -0.04,  0.6,
         0.04,  0.6,
         0.17, -0.6,
         0.25, -0.6,

        // Batang tengah horizontal (4 titik)
        -0.16, -0.12,
        -0.16, -0.04,
         0.16, -0.12,
         0.16, -0.04,

        // ================= Huruf A (Kedua) =================
        // Kaki kiri (4 titik)
        0.35, -0.6,
        0.43, -0.6,
        0.56,  0.6,
        0.64,  0.6,

        // Kaki kanan (4 titik)
        0.56,  0.6,
        0.64,  0.6,
        0.77, -0.6,
        0.85, -0.6,

        // Batang tengah horizontal (4 titik)
        0.44, -0.12,
        0.44, -0.04,
        0.76, -0.12,
        0.76, -0.04
    ];
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main(){
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 0.5, 0.85);
    }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Huruf M (4 segmen x 4 titik = 16 vertex, indeks 0 sampai 15)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);

    // Huruf A Pertama (3 segmen x 4 titik = 12 vertex, indeks 16 sampai 27)
    gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 20, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 24, 4);

    // Huruf A Kedua (3 segmen x 4 titik = 12 vertex, indeks 28 sampai 39)
    gl.drawArrays(gl.TRIANGLE_STRIP, 28, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 32, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 36, 4);
}