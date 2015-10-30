// title      : Latin Cube	
// author     : 
// description: a Latin Cube nxnxn 
// file       : latin_cube.jscad

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'length', caption: 'Length of the cube (number of blocks):', type: 'int', initial: 4, size: 5 },
    { name: 'width', caption: 'Width of each block:', type: 'int', initial: 5, size: 5 },
	{ name: 'space', caption: 'Space between each layer:', type: 'int', initial: 2, size: 5},
	{ name: 'name', caption: 'Numbers for all blocks (a 0 means a sparse position):', type: 'text', initial: "1234234134124123234134124123123434124123123423414123123423413412", size:30},
	{ name: 'transparency', caption: 'Transparency:', type: 'float', initial: 0.5, size:10}
  ];
}

function main(params)
{
  var cube  = createCube(params.length, params.width, params.space, params.name, params.transparency);
  return cube;
}

// generate 3D Latin Cube
function createCube(length, width, space, name, transparency){


	var o = [];    // our stack of objects
	var l = [];    // our stack of line segments (when rendering vector text)
	var p = [];    // our stack of extruded line segments
	var result = [];

	var toCenter = -length*width/2;
	var colorTable = [[1,0,0],[0,102/255,0],[1,0.5,0],[51/255,1,1/255],[0,1,1],[1,1,0],[0,0,1],[1,102/255,178/255],[0.5,0,1],[0.5,0.5,0.5]];
	
  for(var i = 0; i < length; i++){
	for(var j = length-1; j >= 0; j--){
		for(var k = 0; k < length; k++){
			var value = name[((i)*length*length)+(((length-1)-j)*length)+(k)];
			if (value != 0){
			l = vector_text(0,0,name[((i)*length*length)+(((length-1)-j)*length)+(k)]);
				l.forEach(function(s) {
					
					result.push(rectangular_extrude(s, { w:1, h:1 }).setColor([0,0,0]).scale(1/width,1/width,1/width).rotateX(90).translate([width,width,width]).translate([k*2*width,j*2*width,i*2*(width+space)]).translate([toCenter,toCenter,0]));
				});
				
				result.push( CSG.roundedCube({center: [width,width,width], radius:[width,width,width], roundradius: 0.2}).translate([k*2*width,j*2*width,i*2*(width+space)]).setColor(colorTable[value-1][0],colorTable[value-1][1],colorTable[value-1][2],transparency).translate([toCenter,toCenter,0]));
				
			}
		}
	}
  }
  return result;
}


  
  