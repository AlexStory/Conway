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

function matrixRandomNine(x,y){
  matrix=[];
  var oneCount = 0;
  for (var i=0 ; i<x; i++){
    matrix[i]=[];
    for(var j=0; j<y ; j++){
      if(i>2){
        matrix[i][j] = 0;
      }else{     
        matrix[i][j] = Math.round(Math.random());
        oneCount += matrix[i][j];
        console.log(oneCount);
      }
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
            if(i+x === -1){
              neighbors += matrix[matrix.length-1][j+y];
            }
            if(i+x === matrix.length){
              neighbors += matrix[0][j+y];
            }
            if(j + y === -1){
              if(i+x === -1){
                neighbors += matrix[matrix.length-1][matrix[i].length-1];
              }
              if(i+x === matrix.length){
                neighbors += matrix[0][matrix[i].length-1];
              }
              if (i + x >=0 && i+ x < matrix.length){
              neighbors += matrix[i+x][matrix[i].length-1];
              }
            }
            if(j + y === matrix[i].length){
              if(i+x === -1){
                neighbors += matrix[matrix.length-1][matrix[i][0]];
              }
              if(i+x === matrix.length){
                neighbors += matrix[0][matrix[i][0]];
              }
              if (i + x >=0 && i+ x < matrix.length){
              neighbors += matrix[i+x][0];
              }
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
  matrix.forEach(matrixParser);
  changeStatus();
}
document.addEventListener('DOMContentLoaded',function(){
  matrixRandomNine(40,40);
  setInterval(conway, 500);
});
