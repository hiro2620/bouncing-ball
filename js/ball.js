import * as THREE from 'three';

export const createBallClass = (width, height) => {
    return (
        class Ball {
            constructor(
                initialPosition = { x: 0, y: 0  },
                v = { vx: 0, vy:0 }, 
                radius = 50,
                color = 0x0000ff,
                mass = 1,
            ) {
                this.geometry = new THREE.SphereGeometry(radius, 32, 32);
                this.radius = radius;
                this.material = new THREE.MeshBasicMaterial({ color: color });
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.position.x = initialPosition.x;
                this.mesh.position.y = initialPosition.y;
                this.mesh.position.z = radius;
                this.v = v;
                this.mass = mass;
                this.prevV = v;
            }
        
            prepareTick(balls = []) {
                this.v = {...this.prevV};
        
                if (this.mesh.position.x + this.radius > width/2 && this.v.vx > 0) {
                    this.v.vx *= -1;
                } else if (this.mesh.position.x - this.radius < -width/2 && this.v.vx < 0) {
                    this.v.vx *= -1;
                }
        
                if (this.mesh.position.y + this.radius > height/2 && this.v.vy > 0) {
                    this.v.vy *= -1;
                } else if (this.mesh.position.y - this.radius < -height/2 && this.v.vy < 0) {
                    this.v.vy *= -1;
                }
        
                for (const b of balls) {
                    if (b === this) {
                        continue;
                    }
        
                    const d2 = (this.mesh.position.x - b.mesh.position.x) ** 2 + (this.mesh.position.y - b.mesh.position.y) ** 2;
        
                    if (d2 > (this.radius + b.radius)**2) {
                        continue;
                    }
                    
                    // 既に遠ざかっている場合は無視
                    const dp = [b.mesh.position.x - this.mesh.position.x, b.mesh.position.y - this.mesh.position.y];
                    const dv = [b.prevV.vx - this.prevV.vx, b.prevV.vy - this.prevV.vy];
                    if (dp[0] * dv[0] + dp[1] * dv[1] >= 0) {
                        continue;
                    }
        
                    this.v.vx = (this.v.vx * (this.mass - b.mass) + 2 * b.mass * b.prevV.vx) / (this.mass + b.mass);
                    this.v.vy = (this.v.vy * (this.mass - b.mass) + 2 * b.mass * b.prevV.vy) / (this.mass + b.mass);
                }
            }
        
            tick() {
                this.mesh.position.x += this.v.vx;
                this.mesh.position.y += this.v.vy;
        
                this.prevV = {...this.v};
            }
        }
    )
}