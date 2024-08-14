
// Get the canvas and context
var canvas = document.getElementById("cubeCanvas");
var ctx = canvas.getContext("2d");

// Set the canvas dimensions to the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the cube's vertices (corners) in 3D space
var cubeVertices = [
    {x: -1, y: -1, z: -1},
    {x:  1, y: -1, z: -1},
    {x:  1, y:  1, z: -1},
    {x: -1, y:  1, z: -1},
    {x: -1, y: -1, z:  1},
    {x:  1, y: -1, z:  1},
    {x:  1, y:  1, z:  1},
    {x: -1, y:  1, z:  1}
];

// Define the cube's edges (which vertices are connected)
var cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];

// Define rotation angles
var angleX = 0;
var angleY = 0;

// Function to draw the cube
function drawCube() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Project 3D points to 2D space
    var projectedVertices = cubeVertices.map(function(vertex) {
        var x = vertex.x;
        var y = vertex.y;
        var z = vertex.z;

        // Rotate around the Y axis
        var rotatedX = x * Math.cos(angleY) - z * Math.sin(angleY);
        var rotatedZ = z * Math.cos(angleY) + x * Math.sin(angleY);

        // Rotate around the X axis
        var rotatedY = y * Math.cos(angleX) - rotatedZ * Math.sin(angleX);
        rotatedZ = rotatedZ * Math.cos(angleX) + y * Math.sin(angleX);

        // Perspective projection
        var distance = 3;
        var scale = canvas.width / 4 / (distance - rotatedZ);

        // 2D coordinates on the canvas
        return {
            x: rotatedX * scale + canvas.width / 2,
            y: rotatedY * scale + canvas.height / 2
        };
    });

    // Draw the edges of the cube
    ctx.strokeStyle = "white";  // Set line color to white
    ctx.lineWidth = 2;  // Set line thickness

    cubeEdges.forEach(function(edge) {
        var start = projectedVertices[edge[0]];
        var end = projectedVertices[edge[1]];
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    });
}

// Function to update the rotation and redraw the cube
function update() {
    angleX += 0.01;  // Rotate a bit more around the X axis
    angleY += 0.01;  // Rotate a bit more around the Y axis
    drawCube();  // Draw the cube with the updated angles
    requestAnimationFrame(update);  // Repeat this function on the next frame
}

// Start the animation
update();  // Call the update function to start the loop