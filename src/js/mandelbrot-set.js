/**
 * File:        mandelbrot-set.js
 * Author:      ////////
 * Created On:  22/09/2019
 * Description: /////////////////// 
**/

class MandelbrotSet {
    /**
     * @summary
     * A class for 'mandelbrot set' and its dedicated operations/features
     * 
     * @author
     * Anonymous
     */

    constructor(vectorViewingWindowSize) {
        /**
         * @author
         * Anonymous
         * 
         * @param vectorViewingWindowSize
         * vec2() of viewing window size / view port size
         */

        this.vectorViewingWindowSize = vectorViewingWindowSize;
        this.allMandelbrotComplexCoordinates = [];
        this.allImmediateEscapePoints = [];
        this.allDelayedEscapePoints = [];
        this.allNonEscapePoints = [];
        this.interpolationVerticesEscapeTimes = [];
        this.transformFunction;
    }

    transformEscapePoint(ePoint) {
        if (this.transformFunction) {
            return this.transformFunction(ePoint);
        }
        // LOGDEBUG("MandelbrotSet::transformEscapePoint()", "No transformation function provided. Rendering with default values.");
        return ePoint;
    }

    mandelbrotMap(xyCoordinateVector, keepOriginal=false) {
        const realPart = map_point(0, this.vectorViewingWindowSize, [-2], [2], xyCoordinateVector[1])[0];
        const imaginaryPart = map_point(0, this.vectorViewingWindowSize, [2], [-2], xyCoordinateVector[0])[0];
        
        if (!keepOriginal) {
            return new ComplexNumber(realPart, imaginaryPart);
        }
        else {
            // Needs implementation for keepOriginal=true
        }
    }

    allMandelbrotMap() {
        for (let w = 0; w < this.vectorViewingWindowSize; w++) {
            for (let h = 0; h < this.vectorViewingWindowSize; h++) {
                try {
                    this.allMandelbrotComplexCoordinates.push(this.mandelbrotMap(vec2(w, h)));
                }
                catch {
                    LOGERROR("MandelbrotSet::allMandelbrotMap().", "Unable to map mandelbrot for " + [w, h] + ".");
                }
            }   
        }
    }

    webGLMap(complexNumber) {
        const x = map_point(-2, 2,[-1], [1], complexNumber.real)[0];
        const y = map_point(2, -2, [1], [-1], complexNumber.imaginary)[0];
        
        return vec2(x, y);
    }

    getEscapeTime(cComplexNumber, nThreshold=500) {
        /**
         * @author
         * Anonymous
         * 
         * @param cComplexNumber
         * a ComplexNumber c
         * @param nThreshold
         * threshold value
         */

        let escapeTime = 0;
        let computedMandelbrotComplexNumber;

        while (escapeTime <= nThreshold) {
            computedMandelbrotComplexNumber = this.computeMandelbrotSet(escapeTime, cComplexNumber);
            
            if  (ComplexNumber.mod(computedMandelbrotComplexNumber) > 2) {
                return escapeTime - 1;
            }
            escapeTime++;
        }
        return -1;
    }

    getAllEscapeTimes(nThreshold=500) {
        for (let i = 0; i < this.allMandelbrotComplexCoordinates.length; i++) {
            try {
                const eTime = this.getEscapeTime(this.allMandelbrotComplexCoordinates[i], nThreshold);
                
                if (eTime === 0) {
                    this.allImmediateEscapePoints.push(this.webGLMap(this.allMandelbrotComplexCoordinates[i]));
                }
                else if (eTime === -1) {
                    this.allNonEscapePoints.push(this.webGLMap(this.allMandelbrotComplexCoordinates[i]));
                }
                else {
                    this.allDelayedEscapePoints.push(this.webGLMap(this.allMandelbrotComplexCoordinates[i]));
                    if (eTime === 1) {
                        this.interpolationVerticesEscapeTimes.push(this.transformEscapePoint(eTime));
                    }
                    else if (eTime > 1 && eTime < 10) {
                        this.interpolationVerticesEscapeTimes.push(this.transformEscapePoint(eTime));
                    }
                    else if (eTime > 10 && eTime < 15) {
                        this.interpolationVerticesEscapeTimes.push(this.transformEscapePoint(eTime));
                    }
                    else if (eTime > 15 && eTime < 30) {
                        this.interpolationVerticesEscapeTimes.push(this.transformEscapePoint(eTime));
                    }
                    else {
                        this.interpolationVerticesEscapeTimes.push(this.transformEscapePoint(eTime));
                    }
                }
            }
            catch {
                LOGERROR("MandelbrotSet::getAllEscapeTimes().", "Unable to generate escape time for " + i + ".");
            }
        }
    }

    computeMandelbrotSet(n, c) {
        /**
         * @author
         * Anonymous
         * 
         * @param n
         * positive integer
         * @param c
         * a complex number
         */

        if (n === 0) {
            return new ComplexNumber(0, 0);
        }

        // The equation below is taken from assignment prompt
        return ComplexNumber.add(ComplexNumber.square(this.computeMandelbrotSet(n-1, c)), c);
    }    
}