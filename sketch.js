var canvasWidth = 600
var cellWidth = 40;
var cols, rows;
var grid = []
var current
var stack = []

function setup() {
  createCanvas(canvasWidth, canvasWidth);
  cols = floor(width/cellWidth);
  rows = floor(width/cellWidth);
  // frameRate(100)

  for(var j=0; j<rows; j++){
    for(var i=0; i<cols; i++){
      var cell = new Cell(i, j)
      grid.push(cell)
    }
  }

  current = grid[0]
}


function removeWalls(a, b){
  if(a.i - b.i === 1){
    a.walls[3] = false
    b.walls[1] = false
  }else if(a.i - b.i === -1){
    a.walls[1] = false
    b.walls[3] = false
  }

  if(a.j - b.j === 1){
    a.walls[0] = false
    b.walls[2] = false
  }else if(a.j - b.j === -1){
    a.walls[2] = false
    b.walls[0] = false
  }
}

function draw() {
  background(51);

  for(var i = 0; i < grid.length; i ++){
    grid[i].show()
  }

  if(current){
    current.visited = true
    current.highlight();
    var next = current.checkNeighbors()
  }


  if(next){
    next.visited = true

    stack.push(current)

    removeWalls(current, next)

    current = next
  }else if(stack.length > 0){
    current = stack.pop()
  }else if(stack.length == 0){
    current = null //end the process, otherwise it will keep on running
  }
}

function gridIndex(i, j){
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1
  }

  return i + j * cols
}

function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true]
  this.visited = false


  this.checkNeighbors = function(){
    console.log("checking")
    var neighbors = [];
    var top = grid[gridIndex(i, j-1)]
    var right = grid[gridIndex(i+1, j)]
    var bottom = grid[gridIndex(i, j+1)]
    var left = grid[gridIndex(i-1, j)]

    if(top && !top.visited){
      neighbors.push(top)
    }
    if(right && !right.visited){
      neighbors.push(right)
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom)
    }
    if(left && !left.visited){
      neighbors.push(left)
    }


    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length))
      return neighbors[r]
    }else{
      return undefined;
    }

  }


  this.show = function(){
    var x = this.i*cellWidth;
    var y = this.j*cellWidth;
    stroke(255);


    if(this.walls[0]){
      line(x, y, x+cellWidth, y);
    }
    if(this.walls[1]){
      line(x+cellWidth, y, x+cellWidth, y+cellWidth);
    }
    if(this.walls[2]){
      line(x+cellWidth, y+cellWidth, x, y+cellWidth);
    }
    if(this.walls[3]){
      line(x, y+cellWidth, x, y);
    }


    if(this.visited){
      noStroke()
      // stroke(0);
      fill(255,0,255,100)
      rect(x,y,cellWidth,cellWidth)
    }
  }

  this.highlight = function(){
    var x = this.i*cellWidth;
    var y = this.j*cellWidth;
    noStroke()
    fill(255)
    rect(x,y,cellWidth,cellWidth)
  }

}
