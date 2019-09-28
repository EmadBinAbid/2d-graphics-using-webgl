/**
 * File:        config.js
 * Author:      ////////
 * Created On:  09/09/2019
 * Description: /////////////////// 
*/

const colorVector = {
    white: vec4(1.0, 1.0, 1.0, 1.0),
    black: vec4(0.0, 0.0, 0.0, 1.0),
    red: vec4(1.0, 0.0, 0.0, 1.0),
    green: vec4(0.0, 1.0, 0.0, 1.0),
    blue: vec4(0.0, 0.0, 1.0, 1.0),
    yellow: vec4(1.0, 1.0, 0.0, 1.0),
    cyan: vec4(0.0, 1.0, 1.0, 1.0),
    orangeRed: vec4(1.0, 0.2705, 0.0, 1.0),
    magenta: vec4(1.0, 0.0, 1.0, 1.0),
    teal: vec4(0.0, 0.5019, 0.5019, 1.0),
}

const config = {
    environment: {
        global: {
            colorVector: {
                white: vec4(1.0, 1.0, 1.0, 1.0),
                black: vec4(0.0, 0.0, 0.0, 1.0),
                red: vec4(1.0, 0.0, 0.0, 1.0),
                green: vec4(0.0, 1.0, 0.0, 1.0),
                blue: vec4(0.0, 0.0, 1.0, 1.0),
                yellow: vec4(1.0, 1.0, 0.0, 1.0),
            },
            mandelbrotScheme: {
                schemeOne: {
                    colorImmediateEscape: colorVector.red,
                    colorDelayedEscape: colorVector.green,
                    colorNonEscape: colorVector.blue
                },
                schemeTwo: {
                    colorImmediateEscape: colorVector.magenta,
                    colorDelayedEscape: colorVector.orangeRed,
                    colorNonEscape: colorVector.teal
                },
                schemeThree: {
                    colorImmediateEscape: colorVector.cyan,
                    colorDelayedEscape: colorVector.black,
                    colorNonEscape: colorVector.yellow
                },
            },
            triangleCoordinateDimension: 2,
            numberOfTriangleVectors: 3,
            canvasWidth: 512,
            canvasHeight: 512,
            canvasSmallWidth: 256,
            canvasSmallHeight: 256,
            canvasLargeWidth: 512,
            canvasLargeHeight: 512,
            canvasHugeWidth: 1024,
            canvasHugeHeight: 1024
        },
        dom: {
            sierpinskiCanvas: 'sierpinski-canvas',
            circleCanvas: 'circle-canvas',
            colorbarCanvas: 'colorbar-canvas',
            maxwellCanvas: 'maxwell-canvas',
            mandelbrotCanvas: 'mandelbrot-canvas',

            
            triangleVector: 'triangleVector',
            buttonViewVectors: 'buttonViewVectors',
            divViewButton: 'divViewButton',
            divRecursionLevel: 'divRecursionLevel',
            inputRecursionLevel: 'inputRecursionLevel'
        }
    },
    js: {

    },
    css: {

    }
}