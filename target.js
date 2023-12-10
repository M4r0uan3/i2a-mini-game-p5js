/**
 * Classe Target qui étend la classe Vehicle.
 * Représente une cible avec une position et une vitesse.
 */
class Target extends Vehicle {
  /**
   * Constructeur de la classe Target.
   * @param {number} x - La coordonnée x de la cible.
   * @param {number} y - La coordonnée y de la cible.
   */
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  /**
   * Affiche la cible à l'écran.
   */
  show() {
    push();
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
    pop();
  }
}