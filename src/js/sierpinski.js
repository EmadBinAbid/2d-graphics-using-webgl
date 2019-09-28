/**
 * File:        sierpinski.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

"use strict";

const dom = config.environment.dom;
const global = config.environment.global;

let webglHandler;

const colorRed = [global.colorVector.red, global.colorVector.red, global.colorVector.red];
const colorWhite = [global.colorVector.white, global.colorVector.white, global.colorVector.white];
let allSierpinskiRedTrianges = [];
let allSierpinskiWhiteTrianges = [];

window.onload = initProgram;

function initProgram() {
    try {
        createCanvas(dom.sierpinskiCanvas, global.canvasWidth, global.canvasHeight);
    }
    catch {
        LOGERROR("initProgram()", "Sorry; your web browser does not support HTML5's canvas element.");
        alert("Sorry; your web browser does not support HTML5's canvas element.");
    }

    /**
     * Creating basic HTML DOM structure of the page
     */
    inputVectors(global.numberOfTriangleVectors, dom.triangleVector, "divVectors");

    // Recursion level
    addText("Recursion Level", dom.divRecursionLevel);
    var recursionLevelInput = inputNumberBox(dom.inputRecursionLevel, dom.divRecursionLevel);
    recursionLevelInput.min = 1;

    createButton(dom.buttonViewVectors, "View", "divViewButton");

    
    webglHandler = new WebGLHandler(dom.sierpinskiCanvas);
    webglHandler.setCanvasBackgroundColor(global.colorVector.white);
    webglHandler.loadContext();
    //webglHandler.render(webglHandler.getWebGLContext().POINTS, 0, 0);       // Mock render() to render canvas on window.onload 

    
    handleViewButtonActions();
}

function renderAllSubDividingTriangles(newTriangle) {
    // Render all red triangles
    webglHandler.handleVertexBuffer(Triangle.flatten(allSierpinskiRedTrianges));
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(colorRed);
    webglHandler.bindColorVariables("vertexColor");

    LOGDEBUG("initProgram()", "allSierpinskiRedTrianges.length = " + allSierpinskiRedTrianges.length);
    webglHandler.render(webglHandler.getWebGLContext().TRIANGLES, 0, allSierpinskiRedTrianges.length * 3);    // *3 is done because each value in 
    // allSierpinskiRedTrianges is a triangle and each triangle has 3 vertices. Therefore the flattened allSierpinskiRedTrianges fed to the buffer has
    // allSierpinskiRedTrianges.length * 3 vec2 values

    // Render base triangle
    webglHandler.handleVertexBuffer(Triangle.flatten([newTriangle]));
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(colorRed);
    webglHandler.bindColorVariables("vertexColor");

    webglHandler.render(webglHandler.getWebGLContext().TRIANGLES, 0, 3);
}

function renderAllNonSubDividingTriangles() {
    // Render all white triangles
    webglHandler.handleVertexBuffer(Triangle.flatten(allSierpinskiWhiteTrianges));
    webglHandler.bindVertexVariables("vertexPosition");
    webglHandler.handleColorBuffer(colorWhite);
    webglHandler.bindColorVariables("vertexColor");

    LOGDEBUG("initProgram()", "allSierpinskiRedTrianges.length = " + allSierpinskiWhiteTrianges.length);
    webglHandler.render(webglHandler.getWebGLContext().TRIANGLES, 0, allSierpinskiWhiteTrianges.length * 3, false);    // *3 is done because each value in 
    // allSierpinskiRedTrianges is a triangle and each triangle has 3 vertices. Therefore the flattened allSierpinskiRedTrianges fed to the buffer has
    // allSierpinskiRedTrianges.length * 3 vec2 values
}

function sierpinskiTriangle(triangle, recursionLevel) {
    // LOGDEBUG("sierpinskiTriangle()", "Recursion Level = " + recursionLevel);

    if (recursionLevel <= 0) {
        return;
    }
    
    const medians = triangle.getMedians().medians;

    const t0 = new Triangle(medians.v1v2, medians.v2v3, medians.v3v1);

    const t1 = new Triangle(triangle.v1, medians.v1v2, medians.v3v1);
    const t2 = new Triangle(medians.v1v2, triangle.v2, medians.v2v3);
    const t3 = new Triangle(medians.v2v3, medians.v3v1, triangle.v3);

    allSierpinskiRedTrianges.push(t1);
    allSierpinskiRedTrianges.push(t2);
    allSierpinskiRedTrianges.push(t3);
    allSierpinskiWhiteTrianges.push(t0);

    sierpinskiTriangle(t1, recursionLevel-1);
    sierpinskiTriangle(t2, recursionLevel-1);
    sierpinskiTriangle(t3, recursionLevel-1);
}

function inputVectors(numberOfVectors, vectorNamePatternId, htmlDOMParent) {
    /**
     * @summary
     * Function to input vector of desired dimension
     * 
     * @author
     * Anonymous
     * 
     * @param numberOfVectors
     * The name of vector to display
     * @param vectorNamePatternId
     * The id of pattern of vectors to be generated
     * @param htmlDOMParent
     */

    LOGDEBUG("inputVectors().", "inputVectors() called.");

    var vectorDimension = global.triangleCoordinateDimension;
    for (var count = 0; count < numberOfVectors; count++) {
        addText("Vector " + count, htmlDOMParent);
        for (var i = 0; i < vectorDimension; i++) {
            var vectorInput = inputNumberBox(vectorNamePatternId + count + "Component" + i, htmlDOMParent);
            vectorInput.placeholder = "C " + i;
            vectorInput.min = -1;
            vectorInput.max = 1;
        }
    }
}

function createVectors() {
    /**
     * @summary
     * Function to return vector dimension
     * 
     * @author
     * Anonymous
     * 
     * @returns
     * An array/list of vectors
     */

    let vectorArray = [];
    const dimension = global.triangleCoordinateDimension;
    const vectorNamePatternId = dom.triangleVector;

    let vector;

    for (var v = 0; v < global.numberOfTriangleVectors; v++) {
        if (dimension == 2) {
            const component0 = parseFloat(getValue(vectorNamePatternId + v + 'Component0'));
            const component1 = parseFloat(getValue(vectorNamePatternId + v + 'Component1'));

            if (component0 <= 1 && component1 <= 1 
                && component0 >= -1 && component1 >= -1) {
                vector = vec2(component0, component1);
            }
        }
        else if (dimension == 3) {
            const component0 = parseFloat(getValue(vectorNamePatternId + v + 'Component0'));
            const component1 = parseFloat(getValue(vectorNamePatternId + v + 'Component1'));
            const component2 = parseFloat(getValue(vectorNamePatternId + v + 'Component2'));

            if (component0 <= 1 && component1 <= 1 && component2 <= 1 
                && component0 >= -1 && component1 >= -1 && component2 >= -1) {
                vector = vec2(component0, component1, component2);
            }
        }
        else if (dimension == 4) {
            const component0 = parseFloat(getValue(vectorNamePatternId + v + 'Component0'));
            const component1 = parseFloat(getValue(vectorNamePatternId + v + 'Component1'));
            const component2 = parseFloat(getValue(vectorNamePatternId + v + 'Component2'));
            const component3 = parseFloat(getValue(vectorNamePatternId + v + 'Component3'));

            if (component0 <= 1 && component1 <= 1 && component2 <= 1 && component3 <= 1 
                && component0 >= -1 && component1 >= -1 && component2 >= -1 && component3 >= -1) {
                vector = vec2(component0, component1, component2);
            }
        }
        else {
            LOGINFO("createVectors().", "Vectors not defined for dimensions of less than 2 and greater than 4.");
            alert("[!]INFO: Out of range. Vectors not defined for dimensions of less than 2 and greater than 4.");
        }
        vectorArray.push(vector);
    }
    return vectorArray;
}

function handleViewButtonActions() {
    /**
     * @summary
     * Function to handle view button actions
     * 
     * @author
     * Anonymous
     */

    LOGDEBUG("handleViewButtonActions().", "handleViewButtonActions() called.");
    document.getElementById(dom.buttonViewVectors).onclick = function () {
        var triangleCoordinateDimension = dom.triangleCoordinateDimension;
        let isComponentEmpty = 0;

        console.log(dom.triangleVector + '0Component' + 0);

        for (let i = 0; i < triangleCoordinateDimension; i++) {
            if (!getValue(dom.triangleVector + '0Component' + i) 
            && !getValue(dom.triangleVector + '1Component' + i) 
            && !getValue(dom.triangleVector + '2Component' + i)) {
                isComponentEmpty = 1;
            }
        }

        if (!getValue(dom.inputRecursionLevel)) {
            isComponentEmpty = 1;
        }

        if (isComponentEmpty == 0) {
            allSierpinskiRedTrianges = [];
            allSierpinskiWhiteTrianges = [];

            const vectorArray = createVectors();                  // Calling a custom function
            let isVectorUndefined = false;
            for (let i=0; i<vectorArray.length; i++) {
                if (typeof vectorArray[i] === 'undefined') {
                    isVectorUndefined = true;
                }
            }

            const recursionLevel = parseInt(getValue(dom.inputRecursionLevel));
            let isRecursionLevelUndefined = false;
            if (recursionLevel <=0)
            {
                isRecursionLevelUndefined = true;
            }
            
            if (!isVectorUndefined && !isRecursionLevelUndefined) {
                const newTriangle = new Triangle(vectorArray[0], vectorArray[1], vectorArray[2]);
                sierpinskiTriangle(newTriangle, recursionLevel);

                renderAllSubDividingTriangles(newTriangle);

                renderAllNonSubDividingTriangles();
                
            }
            else {
                LOGDEBUG("handleViewButtonActions()", "Input range out of bound.");
                alert("Input range out of bound.");
            }
        }
        else {
            LOGERROR("handleViewButtonActions()", "Missing component values.");
            alert("Please fill all vector components");
        }
    }
}