/**
 * File:        maxwell.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

"use strict";

const dom = config.environment.dom;
const global = config.environment.global;

let webglHandler;

let allSierpinskiTrianges = [];

window.onload = initProgram;

function initProgram() {
    try {
        createCanvas(dom.maxwellCanvas, global.canvasSmallWidth + 50, global.canvasSmallHeight);
    }
    catch {
        LOGERROR("initProgram()", "Sorry; your web browser does not support HTML5's canvas element.");
        alert("Sorry; your web browser does not support HTML5's canvas element.");
    }

    const vertices = [vec2(-1, -1), vec2(0, 1), vec2(1, -1)];
    const colors = [global.colorVector.blue, global.colorVector.red, global.colorVector.green];

    webglHandler = new WebGLHandler(dom.maxwellCanvas);
    webglHandler.setCanvasBackgroundColor(global.colorVector.black);
    webglHandler.loadContext();
    webglHandler.handleVertexBuffer(vertices);
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(colors);
    webglHandler.bindColorVariables("vertexColor");
    webglHandler.render(webglHandler.getWebGLContext().TRIANGLES, 0, 3);
}