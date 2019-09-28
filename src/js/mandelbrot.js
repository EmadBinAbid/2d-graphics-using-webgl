/**
 * File:        mandelbrot.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

"use strict";

const dom = config.environment.dom;
const global = config.environment.global;
const mandelbrotScheme = config.environment.global.mandelbrotScheme;

let webglHandler;
let currentColorScheme;

window.onload = initProgram;

function initProgram() {
    const width = global.canvasSmallWidth;

    try {
        createCanvas(dom.mandelbrotCanvas, width, width);
    }
    catch {
        LOGERROR("initProgram()", "Sorry; your web browser does not support HTML5's canvas element.");
        alert("Sorry; your web browser does not support HTML5's canvas element.");
    }

    webglHandler = new WebGLHandler(dom.mandelbrotCanvas);
    webglHandler.setCanvasBackgroundColor(global.colorVector.black);
    webglHandler.loadContext();

    let mandelbrotSet = new MandelbrotSet(width);

    // CHANGE THE VALUES IN FOLLOWING FUNCTION CALLS TO VIEW DIFFERENT 'TRANSFORMATIONS' AND 'COLOR SCHEMES'
    // paramter one     --> mandelbrotSet instance  --> *Don't change it!*
    // paramter two     --> transformation function --> min value = 0, max value = 2
    // parameter three  --> color scheme            --> min value = 0, max value = 2
    setMandelbrotEnvironment(mandelbrotSet, 2, 1);


    mapAllPixelCoordinateToMandelbrot(mandelbrotSet);

    generateAllEscapeTimes(mandelbrotSet, 100);

    renderImmediateEscapePoints(mandelbrotSet);
    renderNonEscapePoints(mandelbrotSet);
    renderDelayedEscapePoints(mandelbrotSet);
}

function renderImmediateEscapePoints(mandelbrotSet) {
    const immediateEscapePointsColor = [];
    for (let i = 0; i < mandelbrotSet.allImmediateEscapePoints.length; i++) {
        immediateEscapePointsColor.push(currentColorScheme.colorImmediateEscape);
    }
    webglHandler.handleVertexBuffer(mandelbrotSet.allImmediateEscapePoints);
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(immediateEscapePointsColor);
    webglHandler.bindColorVariables("vertexColor");
    webglHandler.render(webglHandler.getWebGLContext().POINTS, 0, mandelbrotSet.allImmediateEscapePoints.length, false);
}

function renderNonEscapePoints(mandelbrotSet) {
    const nonEscapeColor = [];
    for (let i = 0; i < mandelbrotSet.allNonEscapePoints.length; i++) {
        nonEscapeColor.push(currentColorScheme.colorNonEscape);
    }

    webglHandler.handleVertexBuffer(mandelbrotSet.allNonEscapePoints);
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(nonEscapeColor);
    webglHandler.bindColorVariables("vertexColor");
    webglHandler.render(webglHandler.getWebGLContext().POINTS, 0, mandelbrotSet.allNonEscapePoints.length, false);
}

function renderDelayedEscapePoints(mandelbrotSet) {
    const delayedEscapePointsColor = [];
    let mappedColor;

    for (let i = 0; i < mandelbrotSet.allDelayedEscapePoints.length; i++) {
        mappedColor = map_point(0, mandelbrotSet.vectorViewingWindowSize, currentColorScheme.colorImmediateEscape, currentColorScheme.colorDelayedEscape, mandelbrotSet.interpolationVerticesEscapeTimes[i]);
        delayedEscapePointsColor.push(mappedColor);
    }

    webglHandler.handleVertexBuffer(mandelbrotSet.allDelayedEscapePoints);
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(delayedEscapePointsColor);
    webglHandler.bindColorVariables("vertexColor");
    webglHandler.render(webglHandler.getWebGLContext().POINTS, 0, mandelbrotSet.allDelayedEscapePoints.length, false);
}

function mapAllPixelCoordinateToMandelbrot(mandelbrotSet) {
    mandelbrotSet.allMandelbrotMap();
}

function generateAllEscapeTimes(mandelbrotSet, nThreshold=500) {
    mandelbrotSet.getAllEscapeTimes(nThreshold);
}

function setMandelbrotEnvironment(mandelbrotSet, transformIndex=0, colorSchemeIndex=0) {
    if (transformIndex === 0) {

    }
    else if (transformIndex === 1) {
        mandelbrotSet.transformFunction = (ePoint) => MathToolkit.square(ePoint);
    }
    else if (transformIndex === 2) {
        mandelbrotSet.transformFunction = (ePoint) => MathToolkit.cube(ePoint);
    }

    if (colorSchemeIndex === 0) {
        currentColorScheme = mandelbrotScheme.schemeOne;
    }
    else if (colorSchemeIndex === 1) {
        currentColorScheme = mandelbrotScheme.schemeTwo;
    }
    else if (colorSchemeIndex === 2) {
        currentColorScheme = mandelbrotScheme.schemeThree;
    }
}