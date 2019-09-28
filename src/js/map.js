/**
 * File:        map.js
 * Author:      ////////
 * Created On:  07/09/2019
 * Description: /////////////////// 
*/

function map_point(pointP, pointQ, pointA, pointB, pointX) {
    /**
     * @summary
     * A function which uses the mix() function from MV.js and computes the mapping of point X of PQ on AB
     * 
     * @author
     * Anonymous
     * 
     * @param pointP
     * Initial point on PQ line segment
     * @param pointQ
     * End point on PQ line segment
     * @param pointA
     * Initial point on AB line segment
     * @param pointB
     * End point on AB line segment
     * @param pointX
     * Arbitrary point on PQ line segment
     * 
     * @returns
     * A number or a vector; A mapping, X', of point X on AB line segment
     */

    try {
        var alpha;
        if (typeof pointP == typeof pointQ && typeof pointQ == typeof pointX &&
            pointP.length == pointQ.length && pointQ.length == pointX.length) {
            if (typeof pointX == 'number') {
                alpha = (pointX - pointP) / (pointQ - pointP);
            }
            else {
                alpha = (subtract(pointQ - pointP)[0]) / (subtract(pointX - pointP)[0]);
            }

            if (typeof pointA == typeof pointB && pointA.length == pointB.length) {
                return mix(pointA, pointB, alpha);
            }
            else {
                LOGERROR("map_point().", "A and B must of the same type/shape.");
                alert("[-]ERROR: Shape mismatch. A and B must of the same type/shape.");
            }
        }
        else {
            LOGERROR("map_point().", "P, Q and X must of the same type/shape.");
            alert("[-]ERROR: Shape mismatch. P, Q and X must of the same type/shape.");
        }
    }
    catch {
        LOGERROR("map_point().", "Exception occured.");
    }
}