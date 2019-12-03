// let dim;

function setup() {
  createCanvas(1010, 800);
  // dim = width / 1;
  // background(0);
  // colorMode(HSB, 360, 100, 100);
  // noStroke();
  // ellipseMode(RADIUS);
  // frameRate(1);
  systems = [];
}

function draw() {
  background(51);
  background(0);
  // for (let x = 0; x <= width; x += dim) {
  //   drawGradient(x, height / 2);
  // }
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    systems[i].addParticle();
  }
  if (systems.length == 0) {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("click mouse", width / 2, height / 2);
  }
}
// function drawGradient(x, y) {
//   let radius = dim / 2;
//   let h = random(0, 360);
//   for (let r = radius; r > 0; --r) {
//     fill(h, 90, 90);
//     ellipse(x, y, r, r);
//     h = (h + 1) % 360;
//   }
// }

function mousePressed() {
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
  systems.push(p);
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.001);
  this.velocity = createVector(random(-2, 5), random(-5, 5));
  this.position = position.copy();
  this.lifespan = 250.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function () {
  stroke(250, this.lifespan);
  strokeWeight(1);
  fill(127, this.lifespan);
  line(this.position.x, this.position.y, 10, 10);
};

Particle.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  }
  else {
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};


function CrazyParticle(origin) {
  Particle.call(this, origin);
  this.theta = 0.0;
};
CrazyParticle.prototype = Object.create(Particle.prototype); 

CrazyParticle.prototype.constructor = CrazyParticle;

CrazyParticle.prototype.update=function() {
  Particle.prototype.update.call(this);

  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
}

CrazyParticle.prototype.display=function() {
  Particle.prototype.display.call(this);
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(255, this.lifespan);
  line(0, 0, 25, 0);
  pop();
}

