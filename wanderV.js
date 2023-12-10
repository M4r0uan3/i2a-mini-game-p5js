class WanderVehicle extends Vehicle {
  constructor(x, y, img) {
    super(x, y, img);
    this.maxSpeed = 3; // Adjust the maximum speed as needed
    this.maxForce = 0.2; // Adjust the maximum force as needed

    // Wander variables
    this.wanderRadius = 50;
    this.wanderDistance = 100;
    this.wanderAngle = random(TWO_PI);
  }

  wander() {
    const wanderTarget = createVector();
    wanderTarget.x = this.pos.x + this.wanderDistance * cos(this.wanderAngle);
    wanderTarget.y = this.pos.y + this.wanderDistance * sin(this.wanderAngle);

    const force = p5.Vector.sub(wanderTarget, this.pos);
    force.setMag(this.maxForce);
    this.applyForce(force);

    // Randomly change the wander angle a bit for smooth wandering
    this.wanderAngle += random(-0.5, 0.5);
  }

  applyBehaviors(target, obstacles, vehicles) {
    const separateForce = this.separate(vehicles);
    const avoidObstaclesForce = this.avoidObstacles(obstacles);
    const fleeForce = this.flee(vehicles);

    separateForce.mult(1.5);
    avoidObstaclesForce.mult(5);
    fleeForce.mult(2); // Adjust the weight of fleeing

    this.applyForce(separateForce);
    this.applyForce(avoidObstaclesForce);
    this.applyForce(fleeForce);

    // Add other behaviors as needed
  }
  flee(vehicles) {
    const fleeRadius = 100; // Adjust the radius for fleeing
    const fleeForce = createVector(0, 0);

    for (let other of vehicles) {
      const d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

      if (other !== this && d < fleeRadius) {
        const diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.mult(this.maxSpeed);
        fleeForce.add(diff);
      }
    }

    return fleeForce;
  }
  
  separate(vehicles) {
    const desiredSeparation = 25;
    const steer = createVector(0, 0);
    let count = 0;
  
    for (let other of vehicles) {
      const d = p5.Vector.dist(this.pos, other.pos);
  
      if (other !== this && d < desiredSeparation) {
        const diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++;
      }
    }
  
    if (count > 0) {
      steer.div(count);
    }
  
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }
  
    return steer;
  }
  

  // Avoid obstacles behavior
  avoidObstacles(obstacles) {
    const desiredSeparation = 50;
    const steer = createVector(0, 0);
    let count = 0;

    for (let obstacle of obstacles) {
      const d = p5.Vector.dist(this.pos, obstacle.pos);

      if (d < desiredSeparation) {
        // Calculate vector pointing away from the obstacle
        const diff = p5.Vector.sub(this.pos, obstacle.pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++;
      }
    }

    // Average the steering vector
    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }

    return steer;
  }
  edges() {
    const d = 25; // Adjust this value based on the size of your enemy

    if (this.pos.x < d || this.pos.x > width - d) {
      this.vel.x *= -1;
    }

    if (this.pos.y < d || this.pos.y > height - d) {
      this.vel.y *= -1;
    }

    // Ensure the enemy stays within the canvas boundaries
    this.pos.x = constrain(this.pos.x, d, width - d);
    this.pos.y = constrain(this.pos.y, d, height - d);
  }
}
