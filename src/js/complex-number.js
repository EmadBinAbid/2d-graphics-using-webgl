/**
 * File:        complex-number.js
 * Author:      ////////
 * Created On:  22/09/2019
 * Description: /////////////////// 
**/

class ComplexNumber {
    /**
     * @summary
     * A class for 'complex numbers' and their dedicated operations/features
     * 
     * @author
     * Anonymous
     */

    constructor(real, imaginary) {
        /**
         * @author
         * Anonymous
         * 
         * @param real
         * float value of real part of complex number
         * @param imaginary
         * float value of imaginary part of complex number
         */

        this.real = real;
        this.imaginary = imaginary;
        this.cNumber = [ this.real, this.imaginary ];
    }

    static mod(a) {
        return Math.sqrt(Math.pow(a.real, 2) + Math.pow(a.imaginary, 2))
    }

    static add(aComplexNumber, bComplexNumber) {
        return new ComplexNumber(aComplexNumber.real + bComplexNumber.real, 
            aComplexNumber.imaginary + bComplexNumber.imaginary)
    }

    static square(a) {
        return new ComplexNumber(
            Math.pow(a.real, 2) - Math.pow(a.imaginary, 2), 2 * a.real * a.imaginary
            );
    }
    
    static flatten(complexNumberArray) {
        /**
         * @author
         * Anonymous
         * 
         * @param complexNumberArray
         * array of complex numbers
         * 
         * @returns
         * array of vec2 vertices
         */

        const flatArray = [];

        complexNumberArray.forEach(cNumber => {
            flatArray.push(vec2(cNumber.real, cNumber.imaginary)); 
        });
        return flatArray;
    }
}