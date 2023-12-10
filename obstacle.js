/**
 * Classe Obstacle.
 * Représente un obstacle avec une position et une taille.
 */
class Obstacle {
  /**
   * Constructeur de la classe Obstacle.
   * @param {number} x - La coordonnée x de l'obstacle.
   * @param {number} y - La coordonnée y de l'obstacle.
   * @param {number} r - Le rayon de l'obstacle.
   */
  constructor(x, y, r) {
    this.imageObstacle = loadImage('assets/images/asteroid.png');
    this.pos = createVector(x, y);
    this.r = r;
  }

  /**
   * Affiche l'obstacle à l'écran.
   */
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CENTER);
    image(this.imageObstacle, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
}