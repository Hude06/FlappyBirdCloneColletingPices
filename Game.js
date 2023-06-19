import { Rect } from "./RectUtils.js";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let currentKey = new Map();
let score = 0;
class Mouth {
    constructor() {
        this.visable = true;
        this.bounds = new Rect(pipe2.top.x,125,32*1.2,24*1.2)
        this.image = new Image()
        this.image.src = "./Mouth.png"
    }
    draw() {
        ctx.imageSmoothingEnabled = false
        if (this.visable) {
            ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
    }
}
class Eye {
    constructor() {
        this.visable = true;
        this.bounds = new Rect(pipe1.top.x,pipe1.hole.y+130,32,32)
        this.image = new Image()
        this.image.src = "./Eye.png"
    }
    draw() {
        if (this.visable) {
            ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
    }
}
class Bird {
    constructor() {
        this.bounds = new Rect(10,10,10,10)
        this.velocity = 0.8;
        this.gravity = 0.1;
        this.alive = true;
        this.head = false
        this.eye = false
        this.mouth = false
        this.visable = false
        this.image = new Image();
        this.image.src = "./body.png"
    }
    draw() {
        if (this.head) {
            head.visable = true;
            head.bounds.x = this.bounds.x;
            head.bounds.y = this.bounds.y
        }
        if (this.mouth) {
            mouth.visable = true;
            mouth.bounds.x = this.bounds.x;
            mouth.bounds.y = this.bounds.y
        }
        if (this.visable === false) {
            ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
        if (this.visable === true) {
            this.bounds.w = 30
            this.bounds.h = 30
            ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

        }
    }
    update() {
        console.log(this.head,this.eye)
        if (this.head) {
            if (this.mouth) {
                head.visable = false;
                mouth.visable = false
                this.visable = true;
            }
        }
        if (bird.alive) {
            if (currentKey.get("ArrowUp")) {
                this.velocity -= 2
            }
        }
        if (this.bounds.intersects(head.bounds) || head.bounds.intersects(this.bounds)) {
            this.head = true;
        }
        if (this.bounds.intersects(mouth.bounds) || mouth.bounds.intersects(this.bounds)) {
            this.mouth = true;
        }
        this.velocity += this.gravity
        this.bounds.y += this.velocity
    }
}
class Pipe {
    constructor(x) {
        this.hole = new Rect(10,10,10,10)
        this.top = new Rect(x,-200,10,300)
        this.bottom = new Rect(this.top.x,this.top.y+100+this.top.h,10,500)
        this.speed = 1;
    }
    draw() {
        ctx.fillRect(this.top.x,this.top.y,this.top.w,this.top.h)
        ctx.fillRect(this.bottom.x,this.bottom.y,this.bottom.w,this.bottom.h)
    }
    update() {
        if (bird.bounds.intersects(this.top) || this.top.intersects(bird.bounds) || bird.bounds.intersects(this.bottom) || this.bottom.intersects(bird.bounds)) {
            bird.alive = false
        }
        if (bird.bounds.intersects(this.hole) || this.hole.intersects(bird.bounds)) {
            score += 1;
        }
        if (this.top.x <= -20) {
            this.top.x = canvas.width+10
            this.bottom.x = canvas.width+10
        }
        this.top.x -= this.speed
        this.bottom.x -= this.speed
        if (bird.head === false) {
            head.bounds.x -= 0.3343
        }
        if (bird.mouth === false) {
            mouth.bounds.x -= 0.3343
        }
    }
}
let pipe1 = new Pipe(500);
let pipe2 = new Pipe(700);
let pipe3 = new Pipe(900);
let bird = new Bird();
let head = new Eye();
let mouth = new Mouth();

function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
    });
}
function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    pipe1.draw()
    pipe2.draw();
    pipe3.draw();
    pipe1.update()
    pipe2.update();
    pipe3.update()
    bird.draw();
    head.draw();
    mouth.draw();
    bird.update();
    currentKey.clear();

    requestAnimationFrame(loop)
}
function init() {
    keyboardInit();
    loop();
}
init();