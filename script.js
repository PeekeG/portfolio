const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let mouse = { x: null, y: null, radius: 100 };

function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });

class Particle {
    constructor(x, y, size, color, speedX, speedY){
        this.x = x; this.y = y; this.size = size;
        this.color = color; this.speedX = speedX; this.speedY = speedY;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
    update(){
        this.x += this.speedX; this.y += this.speedY;
        if(this.x<0 || this.x>canvas.width) this.speedX*=-1;
        if(this.y<0 || this.y>canvas.height) this.speedY*=-1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius){ this.x -= dx/20; this.y -= dy/20; }
        this.draw();
    }
}

function init(){
    particlesArray = [];
    for(let i=0;i<120;i++){
        let size = Math.random()*3+1;
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        let speedX = (Math.random()-0.5)*1.5;
        let speedY = (Math.random()-0.5)*1.5;
        let color = `rgba(144, 255, 135, ${Math.random()})`;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}
init();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particlesArray.length;i++){ particlesArray[i].update(); }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('click', e=>{
    for(let i=0;i<10;i++){
        let size = Math.random()*3+1;
        let x = e.x;
        let y = e.y;
        let speedX = (Math.random()-0.5)*2;
        let speedY = (Math.random()-0.5)*2;
        let color = `rgba(144, 255, 135, ${Math.random()})`;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
});
