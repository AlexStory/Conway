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

function conway(){
  matrixRandom(3,3);
  $table.innerHTML = '';
  //update the matrix
  /*
  check status

  if status < 2 become dead
  if status = 3 become alive
  if status > 3 become dead


  */
  matrix.forEach(matrixParser);
}
document.addEventListener('DOMContentLoaded',function(){
  conway();
});
