/**
 * File:        triangle.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

class Triangle {
    /**
     * @summary
     * A class for the shape 'triangle' and its dedicated operations/features
     * 
     * @author
     * Anonymous
     */

    constructor(v1, v2, v3) {
        /**
         * @author
         * Anonymous
         * 
         * @param v1
         * vec2 value of vertex of triangle
         * @param v2
         * vec2 value of vertex of triangle
         * @param v3
         * vec2 value of vertex of triangle
         */

        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.vectorArray = [this.v1, this.v2, this.v3];
    }

    getMedians() {
        /**
         * @summary
         * A function to calculate median points of current triangle instance
         * 
         * @author
         * Anonymous
         * 
         * @returns
         * An object containing medians of all sides
         */

        return {
            medians: {
                v1v2: vec2((this.vectorArray[0][0] + this.vectorArray[1][0]) / 2, (this.vectorArray[0][1] + this.vectorArray[1][1]) / 2), 
                v2v3: vec2((this.vectorArray[1][0] + this.vectorArray[2][0]) / 2, (this.vectorArray[1][1] + this.vectorArray[2][1]) / 2),
                v3v1: vec2((this.vectorArray[2][0] + this.vectorArray[0][0]) / 2, (this.vectorArray[2][1] + this.vectorArray[0][1]) / 2)
            }
        };
    }

    static flatten(triangleArray) {
        /**
         * @author
         * Anonymous
         * 
         * @param triangleArray
         * array of triangles
         * 
         * @returns
         * array of vec2 vertices
         */

        const flatArray = [];

        triangleArray.forEach(triangle => {
            flatArray.push(triangle.v1);
            flatArray.push(triangle.v2);
            flatArray.push(triangle.v3); 
        });
        console.log(flatArray);
        return flatArray;
    }
}