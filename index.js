const { Rectangle, QuadTree, Point } = require('./quadTree');
function setup() {

  let boundary = new Rectangle(400, 400, 400, 400);
  let qt = new QuadTree(boundary, 4);

  for (let i = 0; i < 5; i++) {
    let p = new Point(Math.random() * 20, Math.random() * 20);
    qt.insert(p);
  }

  console.log(qt)
}

setup();
