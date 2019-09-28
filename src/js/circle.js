	/**
 * File:        circle.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

var gl;

// onload = myFunction;

var vertices;
var verticesLen;
var recursion;
var radius = 2/2;

function transform3(point, degree){
	degree= degree * (Math.PI/180);
	var rotationMat = mat2(Math.cos(degree), -Math.sin(degree), Math.sin(degree), Math.cos(degree));
	return mult(rotationMat, point);
}
function midPoint(vertice){
	var arr=[...vertice];
	var mids = [];
	var center = vec2(arr[0][0]+arr[(arr.length/2)-1][0]/2, arr[0][1]+arr[(arr.length/2)-1][1]/2);
	for (var i = 0; i < arr.length; i++) {
		mids.push(transform3(arr[i], 360/(arr.length*2)));
	}
	var len=arr.length;
	var midIndices = 0;
	console.log("M I D S = ", mids);
	for (var i = 1; i < (len*2)+1; i+=2) {
		arr.splice(i-1, 0, mids[midIndices]);
		midIndices++;
	}
	
	console.log("arr=",arr);
	return arr;
}
function addMidPoints(recursion,vertices){
	var vertice = [...vertices];
	var arr = [...vertices];
	for (var i = 1; i < recursion; i++) {
		arr=midPoint(arr);
		vertice.push(...arr);
	}
	return vertice;
}

window.onload = function init()
{
	document.getElementById("reloadButton").onclick = function () { 
		recursion=0; 
		init();
	};
	recursion = prompt("Please enter number of recursions");
	// recursion=4;
	recursion++;

	var canvas = document.getElementById( "gl-canvas" );
	
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	//  Configure WebGL
	gl.viewport( 0, 0, canvas.width/recursion, canvas.height/recursion );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	//  Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Compute data.

	vertices = [vec2(-1,0), vec2(0,1), vec2(1,0), vec2(0,-1)];

	vertices=addMidPoints(recursion,vertices);
	console.log(vertices);

	// Load the data into the GPU
	gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	verticesLen=vertices.length;
	render(canvas);
};


function render(canvas) {
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINE_LOOP, 0, 4);
	var index=4;
	for (var i = 1; i <= recursion; i++) {
		gl.viewport((canvas.width/recursion)*i, 0, canvas.width/recursion, canvas.height/recursion);
		console.log(index, 2**(i+2));
		gl.drawArrays(gl.LINE_LOOP, index, 2**(i+2));
		index += 2**(i+2);
	}
}
