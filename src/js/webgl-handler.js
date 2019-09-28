/**
 * File:        webgl-handler.js
 * Author:      Anonymous
 * Created On:  15/09/2019
 * Description: /////////////////// 
*/

class WebGLHandler {
    /**
     * @summary
     * A class to handle all WebGL related operations
     * 
     * @author
     * Anonymous
     */

    constructor(canvasId) {
        this.canvasId = canvasId;
        this.glContext = WebGLUtils.setupWebGL(getElement(this.canvasId));
        this.program = initShaders(this.glContext, "vertex-shader", "fragment-shader");	// program variable holds our shaders (one for each shader)
        this.canvasColor;
    }

    getWebGLHandler() {
        /**
         * @summary
         * Function to return the current class instance
         * 
         * @author
         * Anonymous
         
         * @returns
         * Current class instance
        */
        return this;
    }

    setupWebGLContext() {
        /**
         * @summary
         * A function to set up WebGL context variable
         * 
         * @author
         * Anonymous
         */
        this.glContext = WebGLUtils.setupWebGL(getElement(this.canvasId));
    }

    getWebGLContext() {
        /**
         * @summary
         * A function to return WebGL context variable
         * 
         * @author
         * Anonymous
         * 
         * @returns
         * WebGL context variable
         */
        return this.glContext;
    }

    getCanvas() {
        /**
         * @summary
         * A function to return HTML canvas element by ID
         * 
         * @author
         * Anonymous
         * 
         * @returns
         * HTML canvas element
         */
        return getElement(this.canvasId);
    }

    setCanvasBackgroundColor(canvasColor) {
        /**
         * @summary
         * A function to set HTML canvas color
         * 
         * @author
         * Anonymous
         * 
         * @param canvasColor
         * vec4 containing RGBA values
         */
        this.canvasColor = canvasColor;
    }

    loadContext() {
        /**
         * @summary
         * A function to load WebGL configurations
         * 
         * @author
         * Anonymous
         * 
         * @returns
         * WebGL context variable
         */

        this.setupWebGLContext();

        if (!this.glContext) {
            LOGERROR("initProgram()", "WebGL is not available in current context.");
            alert("WebGL isn't available");
        }
        else {
            // We can adjust the h/w of the viewport to match the aspect ratio of the clipping rectangle
            // to ensure we don't distort objects 
            this.glContext.viewport(0, 0, this.getCanvas().width, this.getCanvas().height);

            if (this.canvasColor) {
                this.glContext.clearColor(this.canvasColor[0], this.canvasColor[1], this.canvasColor[2], this.canvasColor[3]);
            }
            else {
                this.glContext.clearColor(1.0, 1.0, 1.0, 1.0);
            }

            this.glContext.useProgram(this.program);
        }
        return this.glContext;
    }

    setProgram() {
        this.glContext.useProgram(this.program);
    }

    handleVertexBuffer(data) {
        /**
         * @summary
         * A function to load shape data into buffer which then passes it to the GPU
         * 
         * @author
         * Anonymous
         * 
         * @param data
         * vec2 shape data
         */

        // The following creates a vertex buffer object on the GPU and then places our data in it 
        var bufferId = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, bufferId);	//glContext.ARRAY_BUFFER indicates that the data in the buffer will be vertex attribute data rather than indices to the data
        // The binding operation makes this buffer the current buffer. Subsequent functions that put data in a buffer will use this buffer until we bind a different buffer.

        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, flatten(data), this.glContext.STATIC_DRAW);	// Accepts only native types (not JS objs) --> therefore flatten used
        // The above places the data into the buffer
        // Last parameter determines how we will use the data. If we are sending them once and displaying them only then glContext.STATIC_DRAW suffices
    }

    bindVertexVariables(variables) {
        // Establishes a connection between the array in the application and the input array vertexPosition in the shader.
        var vertexPosition = this.glContext.getAttribLocation(this.program, variables);
        this.glContext.vertexAttribPointer(vertexPosition, 2, this.glContext.FLOAT, false, 0, 0);
        // 2nd+3rd parameter: elts in array are each two floating-point numbers
        // 4th parameter: Indicates that we do not want the data normalized in the range (0.0,1.0)
        // 5th parameter: The values in the array are contiguous 
        // 6th parameter: The address in the buffer where the data begins
        this.glContext.enableVertexAttribArray(vertexPosition);
    }

    handleColorBuffer(data) {
        /**
         * @summary
         * A function to load color data into buffer which then passes it to the GPU
         * 
         * @author
         * Anonymous
         * 
         * @param data
         * vec4 color data
         */

        // The following creates a vertex buffer object on the GPU and then places our data in it 
        var bufferId = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, bufferId);	//glContext.ARRAY_BUFFER indicates that the data in the buffer will be vertex attribute data rather than indices to the data
        // The binding operation makes this buffer the current buffer. Subsequent functions that put data in a buffer will use this buffer until we bind a different buffer.

        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, flatten(data), this.glContext.STATIC_DRAW);	// Accepts only native types (not JS objs) --> therefore flatten used
        // The above places the data into the buffer
        // Last parameter determines how we will use the data. If we are sending them once and displaying them only then glContext.STATIC_DRAW suffices
    }

    bindColorVariables(variables) {
        // Establishes a connection between the array in the application and the input array vertexPosition in the shader.
        var vertexColor = this.glContext.getAttribLocation(this.program, variables);
        this.glContext.vertexAttribPointer(vertexColor, 4, this.glContext.FLOAT, false, 0, 0);
        // 2nd+3rd parameter: elts in array are each two floating-point numbers
        // 4th parameter: Indicates that we do not want the data normalized in the range (0.0,1.0)
        // 5th parameter: The values in the array are contiguous 
        // 6th parameter: The address in the buffer where the data begins
        this.glContext.enableVertexAttribArray(vertexColor);
    }

    render(shape, startIndex, numberOfPoints, clearContext=true) {
        /**
         * @summary
         * A function to render shape onto screen
         * 
         * @author
         * Anonymous
         * 
         * @param shape
         * ENUM of shape to be drawn
         * @param startIndex
         * Position of buffer to start capturing points from
         * @param numberOfPoints
         * Number of points to capture for a single render
         */

        if (clearContext) {
            this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
        }
        // Rendering is carried about by the vertex shader, rasterizer and the fragment shader in order to get the proper pixels displayed in the framebuffer
        // Calling drawArrays invokes the vshader 
        this.glContext.drawArrays(shape, startIndex, numberOfPoints);
        // Used when we are ready to display our points 
        // First parameter tells the GPU that data will be rendered as distinct points rather than as lines or triangles 
        // First parameter could be glContext.POINTS, glContext.LINES, glContext.TRIANGLES, glContext.LINE_STRIP, glContext.LINE_LOOP etc. 
        // Second parameter states where to start searching from (what index) of the array 
        // Last parameter states how many points to display NOT the end position 
    }

    loadEnvironment() {

    }
}
