import { Player } from './Player.js';
import { OrbitControls } from './OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 200 );
		this.camera.position.set( 0, 1.6, 5 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x505050 );

		this.scene.add( new THREE.HemisphereLight( 0xffffff, 0x404040 ) );

        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        
		container.appendChild( this.renderer.domElement );
        
        this.raycaster = new THREE.Raycaster();
        this.workingMatrix = new THREE.Matrix4();
        this.workingVector = new THREE.Vector3();
        this.workingQuat = new THREE.Quaternion();
        this.origin = new THREE.Vector3();
        
        this.initScene();

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.y = 1;
        controls.update();

        window.addEventListener('resize', this.resize.bind(this) );
        
        document.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            console.log(`keydown ${event.code}`);
            switch(event.code){
                case 'KeyD':
                    this.knight.playAnim('drawaction');
                    break;
                case 'KeyU':
                    this.knight.playAnim('useaction');
                    break;
                case 'ArrowUp':
                    this.workingVector.set(0,1,1);
                    break;
                case 'ArrowDown':
                    this.workingVector.set(0,1,-1);
                    break;
                case 'ArrowLeft':
                    this.workingVector.set(1,1,0);
                    break;
                case 'ArrowRight':
                    this.workingVector.set(-1,1,0);
                    break;
                case 'KeyL':
                    this.knight.hit();
                    break;
            }
          }, false);

        document.addEventListener('keyup', (event) => {
            console.log(`keyup ${event.code}`);
            switch(event.code){
                case 'KeyD':
                case 'KeyU':
                    this.knight.stopAnims();
                    break;
            }
        }, false);

        this.renderer.setAnimationLoop( this.render.bind(this) );
	}	
    
    initScene(){
        this.knight = new Player(this.scene);
    } 
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {  
        const dt = this.clock.getDelta();
        if (this.knight){
            this.knight.update(dt, null, this.camera);
            this.knight.setDirection(this.workingVector);
        }
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };

window.app = new App();  