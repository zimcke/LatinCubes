// title      : 3D Sudoku
// author     : 
// description: a 3D sudoku 
// file       : sudoku.jscad

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'length', caption: 'Length of the cube (number of blocks):', type: 'int', initial: 2 },
    { name: 'width', caption: 'Width of each block:', type: 'int', initial: 2 }
  ];
}

function main(params)
{
  var sudoku = createSudoku(params.length, params.width);
  return sudoku;
}

// generate 3D sudoku
function createSudoku(length, width){
  var result = new Array();
  for(var i = 0; i < length; i++){
	for(var j = 0; j < length; j++){
		for(var k = 0; k < length; k++){
			result.push( CSG.cube({radius:[width,width,width]}).translate([k*2*width,j*2*width,i*2*width]) );
		}
	}
  }
  return result;
}
  
  