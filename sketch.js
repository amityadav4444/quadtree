function setup() {

  let boundary = new Rectangle(200, 200, 200, 200);
  let qt = new QuadTree(boundary);

  for (let i = 0; i < 1; i++) {
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }

  console.log(qt)
}
