/**
 * File:        colorbar.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

"use strict";

const dom = config.environment.dom;
const global = config.environment.global;

const canvasWidth = global.canvasWidth;
let webglHandler;

window.onload = initProgram;

function initProgram() {
    try {
        createCanvas(dom.colorbarCanvas, canvasWidth, 120);
    }
    catch {
        LOGERROR("initProgram()", "Sorry; your web browser does not support HTML5's canvas element.");
        alert("Sorry; your web browser does not support HTML5's canvas element.");
    }

    webglHandler = new WebGLHandler(dom.colorbarCanvas);
    webglHandler.setCanvasBackgroundColor(global.colorVector.red);
    webglHandler.loadContext();
    
    webglHandler.getWebGLContext().clear(webglHandler.getWebGLContext().COLOR_BUFFER_BIT);

    renderGrayScaleBar();
    renderColorBar();
}

function renderGrayScaleBar() {
    for (let i = 0; i <= canvasWidth; i++) {
        // Calculating the vector for mapped color
        const mappedColor = map_point(0, canvasWidth, vec3(0, 0, 0), vec3(1, 1, 1), i);

        // Calculating the vector for mapped vertex
        const mappedVertex = map_point(0, canvasWidth, [-1], [1], i);
        
        // Creating buffer and sending data to GPU
        webglHandler.handleVertexBuffer([vec2(mappedVertex, 0), vec2(mappedVertex, 1)]);
        webglHandler.bindVertexVariables("vertexPosition");
        webglHandler.handleColorBuffer([vec4(mappedColor, 1.0), vec4(mappedColor, 1.0)]);
        webglHandler.bindColorVariables("vertexColor");

        // Render shape
        webglHandler.render(webglHandler.getWebGLContext().LINES, 0, 2, false); 
    }
}

function renderColorBar() {
    for (let i = 0; i <= canvasWidth; i++) {
        // Calculating the vector for mapped vertex
        const mappedVertex = map_point(0, canvasWidth, [-1], [1], i);
        let mappedColor;

        if (mappedVertex <= 0) {
            // Calculating the vector for mapped color in first half
            mappedColor = map_point(0, canvasWidth/2, vec3(1, 0, 0), vec3(0, 1, 0), i);
        }
        else {
            // Calculating the vector for mapped color in second half
            mappedColor = map_point(canvasWidth/2, canvasWidth, vec3(0, 1, 0), vec3(0, 0, 1), i);
        }
        
        // Creating buffer and sending data to GPU
        webglHandler.handleVertexBuffer([vec2(mappedVertex, -1), vec2(mappedVertex, 0)]);
        webglHandler.bindVertexVariables("vertexPosition");
        webglHandler.handleColorBuffer([vec4(mappedColor, 1.0), vec4(mappedColor, 1.0)]);
        webglHandler.bindColorVariables("vertexColor");

        // Render shape
        webglHandler.render(webglHandler.getWebGLContext().LINES, 0, 2, false); 
    }
}