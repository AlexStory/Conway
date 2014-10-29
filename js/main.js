var matrix = [];
var $table = document.querySelector('.table');
var $tr;
var thecycles =0;
var $cyclesTag = document.querySelector('.cycles');
var xcount=0;
var $liveCount = document.querySelector('.livecount');

document.addEventListener('DOMContentLoaded',function(){
  matrixRandomNine(50,50);
  setInterval(conway, 200);
});

function countMatrix(){
  matrix.forEach(function(row){
    row.forEach(function(cell){
      if (cell === 1){
        xcount++;
      }
    })

  })
}

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
      if(i>9 || j >9){
        matrix[i][j] = 0;
      }else{
        matrix[i][j] = Math.round(Math.random());
        oneCount += matrix[i][j];
      }
      }
  }
  return matrix
}

function rowParser(element){
  var $td = document.createElement('td');
  $td.style.width = '10px';
  $td.style.height = '10px';
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
  var clone=[];
  matrix.forEach(function(element,i){
    clone[i] = matrix[i].slice()
  })
  for(var i=0; i < matrix.length ; i++){
      for(var j=0; j< matrix[i].length ; j++){
        var neighbors =0;
        for(var x = i-1 ; x <= i+1 ; x++){
          for(var y = j-1 ; y <= j+1 ; y++){
            if(x >= 0 && x < matrix.length && y >= 0 && y < matrix[i].length && !( x === i && y === j)){
              neighbors += matrix[x][y];
            }
             else if(x === -1){
              neighbors += matrix[matrix.length-1][y];
            }
            else if(x === matrix.length){
              neighbors += matrix[0][y];
            }
            else if(y === -1){
              if(x === -1){
                neighbors += matrix[matrix.length-1][matrix[i].length-1];
              }
              else if(x === matrix.length){
                neighbors += matrix[0][matrix[i].length-1];
              }
               else if (x >=0 && x < matrix.length){
              neighbors += matrix[x][matrix[i].length-1];
              }
            }
            else if(y === matrix[i].length){
              if(x === -1){
                neighbors += matrix[matrix.length-1][matrix[i][0]];
              }
              else if(x === matrix.length){
                neighbors += matrix[0][matrix[i][0]];
              }
              else if (x >=0 && x < matrix.length){
              neighbors += matrix[x][0];
              }
            }
          }
        }

        if(neighbors < 2){
          clone[i][j] = 0;
        }
        if(neighbors === 3){
          clone[i][j] = 1;
        }
        if(neighbors > 3){
          clone[i][j] = 0;
        }
      }
  }
  xcount = 0;
  thecycles++;
  matrix = clone;
  countMatrix();
  $cyclesTag.innerHTML = 'Cycle: ' + thecycles;
  $liveCount.innerHTML = 'Live Cells: ' + xcount;
}


function conway(){
  $table.innerHTML = '';
  matrix.forEach(matrixParser);
  changeStatus();
}
