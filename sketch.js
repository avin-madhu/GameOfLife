// makes an empty 2d array
function make2dArray(cols, rows)
{
   let arr = new Array(cols);
   for(let i = 0; i < arr.length; i++)
   {
    arr[i] = new Array(rows);
   }

   return arr;
}


let grid;
let cols;
let rows;

let scale =20;

function setup()
{
  var canvas = createCanvas(500,500);
  canvas.parent("canvas")
  grid = make2dArray(40,40)
  
  cols = width/scale;
  rows = width/scale;

  for(let i = 0; i < cols; i++)
  {
    for(let j = 0; j < rows; j++)
    {
      grid[i][j] = floor(random(2));
    }
  }
  console.log(grid);

}

function draw()
{
  background (0);
  
  for(let i = 0; i < cols; i++)
  {
    for(let j = 0; j < rows; j++)
    {
      let x = i*scale;
      let y = j*scale;
      if(grid[i][j]==1)
      {
        fill (3,252,65)
      }
      else
      {
        fill (0)
      }
      rect(x,y,scale,scale,5)
    }
  }


  let nextGen = make2dArray(cols,rows)
  

  for(let i = 0; i < cols; i++)
  {
    for(let j = 0; j < rows; j++)
    {
      
      let state = grid[i][j];



         // count the live neighbours!
      let neighbours = count(grid,i,j);

      if(state == 0 && neighbours==3)//overpopulation
      {
        nextGen[i][j] = 1;
      }
      else if(state==1 && neighbours<2||neighbours>3)
      {
        nextGen[i][j] = 0;
      }
      else
      {
        nextGen[i][j] = grid[i][j]
      }


    }
  }

  grid = nextGen;


}


// function to count the live neighbours
function count(grid,x,y)
{
  let sum=0

  for(let i=-1 ; i<2 ; i++)
  {
    for(let j=-1; j<2 ; j++)
    {
       let Ecol = (x+i + cols)%cols; 
       let Erow = (y+j + rows)%rows; 

       sum+= grid[Ecol][Erow];
    }
  }
  sum-=grid[x][y];
  return sum;
  
}
