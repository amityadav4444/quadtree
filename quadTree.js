class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.x > this.x - this.w &&
      point.x < this.x + this.w &&
      point.y > this.y - this.h &&
      point.y < this.y + this.w);
  }

  insersects(range) {
    if !(range.x - range.w > this.x + this.w ||
       range.x + range.w < this.x - this.w ||
       range.y - range.h > this.y + this.h ||
       range.y + range.h < this.y - this.h) {
       }
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let newpx = this.boundary.x + this.boundary.w / 2;
    let newpy = this.boundary.y + this.boundary.h / 2;
    let newnx = this.boundary.x - this.boundary.w / 2;
    let newny = this.boundary.y - this.boundary.h / 2;
    let newWidth = this.boundary.w / 2;
    let newHeight = this.boundary.h / 2;

    let ne = new Rectangle(newpx, newpy, newWidth, newHeight);
    this.northeast = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(newnx, newpy, newWidth, newHeight);
    this.northwest = new QuadTree(nw, this.capacity);
    let se = new Rectangle(newpx, newny, newWidth, newHeight);
    this.southeast = new QuadTree(se, this.capacity);
    let sw = new Rectangle(newnx, newny, newWidth, newHeight);
    this.southwest = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast.insert(point)) {
        return true;
      } else if(this.northwest.insert(point)) {
        return true;
      } else if(this.southeast.insert(point)) {
        return true;
      } else if (this.southwest.insert(point)) {
        return true;
      }
    }
  }

  query(range) {
    let found = [];
    if (!this.boundary.insersects(range)) {
      return found;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }

      if (this.divided) {
        found.concat(this.northeast.query(range));
        found.concat(this.northwest.query(range));
        found.concat(this.southeast.query(range));
        found.concat(this.southwest.query(range));
      }
      
      return found;
    }

    
  }
}

module.exports = {
  Rectangle: Rectangle,
  QuadTree: QuadTree,
  Point: Point
};
