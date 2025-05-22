import * as THREE from 'three';

class DiceRoller {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private dice: THREE.Group[] = [];
    private container: HTMLElement;
    private isRolling: boolean = false;

    constructor(container: HTMLElement) {
        this.container = container;
        
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 10;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(directionalLight);

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    private createD6(): THREE.Group {
        const diceGroup = new THREE.Group();
        
        // Create dice geometry
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        
        // Add numbers to faces
        const numbers = ['1', '2', '3', '4', '5', '6'];
        numbers.forEach((number, index) => {
            const texture = this.createNumberTexture(number);
            const faceMaterial = new THREE.MeshPhongMaterial({ map: texture });
            cube.material = Array(6).fill(faceMaterial);
        });
        
        diceGroup.add(cube);
        return diceGroup;
    }

    private createD10(): THREE.Group {
        const diceGroup = new THREE.Group();
        
        // Create a simplified d10 using a cone
        const geometry = new THREE.ConeGeometry(1, 2, 10);
        const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        const cone = new THREE.Mesh(geometry, material);
        
        diceGroup.add(cone);
        return diceGroup;
    }

    private createNumberTexture(number: string): THREE.Texture {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d')!;
        
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 128, 128);
        
        context.fillStyle = '#000000';
        context.font = '64px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(number, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    private onWindowResize(): void {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public async rollDice(): Promise<number[]> {
        if (this.isRolling) return [];
        this.isRolling = true;

        // Clear existing dice
        this.dice.forEach(die => this.scene.remove(die));
        this.dice = [];

        // Create new dice
        const d6 = this.createD6();
        const d10_1 = this.createD10();
        const d10_2 = this.createD10();

        // Position dice
        d6.position.x = -4;
        d10_1.position.x = 0;
        d10_2.position.x = 4;

        // Add to scene
        this.scene.add(d6);
        this.scene.add(d10_1);
        this.scene.add(d10_2);

        this.dice = [d6, d10_1, d10_2];

        // Animate roll
        const rollDuration = 2000; // 2 seconds
        const startTime = Date.now();

        return new Promise((resolve) => {
            const animate = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / rollDuration, 1);

                // Rotate dice
                this.dice.forEach(die => {
                    die.rotation.x += 0.1;
                    die.rotation.y += 0.15;
                    die.rotation.z += 0.05;
                });

                this.renderer.render(this.scene, this.camera);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.isRolling = false;
                    // Generate random results
                    const results = [
                        Math.floor(Math.random() * 6) + 1,
                        Math.floor(Math.random() * 10) + 1,
                        Math.floor(Math.random() * 10) + 1
                    ];
                    resolve(results);
                }
            };

            animate();
        });
    }

    public dispose(): void {
        this.renderer.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}

export default DiceRoller;