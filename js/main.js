var matrix = [[0,1,0],[1,1,0],[1,1,1]];
var $table = document.querySelector('.table');
var $tr;

function matrixRandom(x,y){
   matrix=[];
  for (var i=0 ; i<x; i++){
    matrix[i]=[];
    for(var j = 0; j < y ; j++){
      matrix[i][j]= Math.round(Math.random());
    }
  }
  return matrix
}

function rowParser(element){
  var $td = document.createElement('td');
  $td.style.width = '20px';
  $td.style.height = '20px';
  if(element === 0){
    $td.style.backgroundColor= '#bdc3c7'
  }
  else{
    $td.style.backgroundColor= '#3498db'
  }
  $tr.appendChild($td);
}

function matrixParser(element){
  $tr = document.createElement('tr');
  element.forEach(rowParser);
  $table.appendChild($tr);
}

function changeStatus(){
for(var i=0; i < matrix.length ; i++){
    for(var j=0; j< matrix[i].length ; j++){
      var neighbors =0;
      for(var y = -1 ; y <= 1 ; y++){
        for(var x = -1 ; x <= 1 ; x++){
          if(i + x >= 0 && i+x < matrix.length && j + y >= 0 && j + y < matrix[i].length && !( x === 0 && y === 0)){
            neighbors += matrix[i+x][j+y];
          }
        }
      }
    if(neighbors < 2){
      matrix[i][j] = 0;
    }
    if(neighbors === 3){
    matrix[i][j] = 1;
    }
    if(neighbors > 3){
      matrix[i][j] = 0;
    }
}
}
}

function conway(){
  $table.innerHTML = '';
  //update the matrix

  // check status
 //  if status < 2 become dead
 //  if status = 3 become alive
 //  if status > 3 become dead
  matrix.forEach(matrixParser);
  changeStatus();
}
document.addEventListener('DOMContentLoaded',function(){
  matrixRandom(20,20);
  setInterval(conway, 500);
});
