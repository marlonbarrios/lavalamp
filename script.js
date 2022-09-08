const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

class Ball {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 80 + 20;
        this.x = this.radius  * 2 + Math.random() *(this.effect.width - this.radius * 4);
       
        this.y = -this.radius;
       
        this.speedX = Math.random() * 0.2 - 0.5;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.angle =  0;
        this.va  = Math.random() * 0.1 - 0.5;
        this.range = Math.random() * 30;
        this.gravity = Math.random() * 0.005;
        this.vy = 0;
    }

    update() {
        if(this.x < this.radius || this.x > this.effect.width- this.radius) this.speedX *= -1;
        if(this.y > this.effect.height + this.radius) {
            this.y = -this.radius;
            this.vy = 0;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.x = this.radius  * 2 + Math.random() *(this.effect.width - this.radius * 4);
       
            this.y = -this.radius;
        }
        if (this.y > this.radius) {
        this.vy += this.gravity;
        this.speedY += this.vy;
        }
       this.x += this.speedX;
       this.y += this.speedY;
        }

   
    draw(context) {
context.beginPath();
context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
context.fill();
}
reset() {
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
}
}


class metaBallEffects {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.metaBallArray = [];
    }
    init(numberOfBalls) {
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaBallArray.push(new Ball(this));
        }
        }
    update() {
        this.metaBallArray.forEach(metaBall => metaBall.update());
        }
    draw(context) {
        this.metaBallArray.forEach(metaBall => metaBall.draw(context));
        }
    reset(newWidth, newHeight) {
            this.width = newWidth;
            this.height = newHeight;
            this.metaBallArray.forEach(metaBall => metaBall.reset());
        }

    }

const effect = new metaBallEffects(canvas.width, canvas.height);
effect.init(20);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw(ctx)
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'white';
    effect.reset(canvas.width, canvas.height);
});

