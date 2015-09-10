/// Ball variables
var numBalls = 12;
var spring = 0.05;
var gravity = 0.03;
var friction = -1.0;
var balls = new Array(numBalls);

///Background variables
var PI=3.14;
var R=125;
var centerR=125;
var a=PI/2;
var a1=PI;
var a2=3*PI/2;
var pathR=125;
var pathG=125;
var G=125;
var centerG=125;
var pathB=125;
var B=125;
var centerB=125;

function setup() {
	createCanvas(480,480);
	InstantiateBalls();
	fill(255, 204, 0);
	noStroke();
}

function draw() {
	UpdateBackground();
	for(var i=0; i<numBalls; i++) {
		var ball = balls[i];
		ball.collide();
		ball.move();
		ball.display();
	}
}

/// Function to instantiate the balls
function InstantiateBalls() {
	for(var i=0; i<numBalls; i++) {
		balls[i] = new Ball(random(width), random(height), random(30,70), i, balls);
	}
}

/// Function to change background
function UpdateBackground() {
	background(pathR,pathG,pathB);
  pathR=centerR+R*sin(a);
  a=a+.03;
   
  pathG=centerG+G*sin(a1);
  a1=a1+.03;
   
  pathB=centerB+B*sin(a2);
  a2=a2+.03;
}

/// The ball class
function Ball(mx, my, mDiameter, mID, mOthers) {
	/// Position
 this.x = mx;
 this.y = my;
 /// Size
 this.diameter = mDiameter;
 /// Velocity
 this.vx = 0;
 this.vy = 0;
 /// Ball ID
 this.id = mID;
 /// The 'others'
 this.others = mOthers;
}

/// Function to handle ball collisions
Ball.prototype.collide = function() {
	for(var i=this.id+1; i<numBalls; i++)
	{
		/// Calculate the distance between two balls
		var dx = this.others[i].x - this.x;
		var dy = this.others[i].y - this.y;
		var distance = sqrt(dx*dx + dy*dy);
		
		/// Minimum distance is the sum of radii of both balls
		var minDist = this.others[i].diameter/2 + this.diameter/2;
		
		/// balls colliding
		if(distance < minDist) {
			/// Calculate ball trajectory
			var angle = atan2(dy, dx);
			var targetX = this.x + cos(angle) * minDist;
			var targetY = this.y + sin(angle) * minDist;
			var ax = (targetX - this.others[i].x) * spring;
			var ay = (targetY - this.others[i].y) * spring;
			
			/// Calculate velocity
			this.vx -= ax;
			this.vy -= ay;
			
			/// Calculate velocity of other balls
			this.others[i].vx += ax;
			this.others[i].vy += ay;
		}
	}
}

/// Function to handle ball movements
Ball.prototype.move = function() {
	/// Add velocity to the ball
	this.vy += gravity;
	this.x += this.vx;
	this.y += this.vy;
	
	/// Collide with the vertical walls
	if(this.x + this.diameter/2 > width) {
		this.x = width - this.diameter/2;
		this.vx *= friction;
	}
	else if (this.x - this.diameter/2 < 0) {
		this.x = this.diameter/2;
		this.vx *= friction;
	}
	
	/// Collide with the horizontal walls
	if(this.y + this.diameter/2 > height) {
		this.y = height - this.diameter/2;
		this.vy *= friction;
	}
	else if(this.y - this.diameter/2 < 0) {
		this.y = this.diameter/2;
		this.vy *= friction;
	}
}

/// Function to display the balls
Ball.prototype.display = function() {
	ellipse(this.x, this.y, this.diameter, this.diameter);
}