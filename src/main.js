import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.js';

var renderer = null,
    scene = null,
    camera = null,
    // figuras
    cube = null,
    cilindro = null,
    dode = null,
    hedro = null,
    sphere = null,
    torus = null,
    // materiales
    material0 = null,
    material1 = null,
    material2 = null,
    // indicador del material actual
    num_material = 0,
    cambio = false, //verifica si se debe cambiar el material
    animating = true; //inicia la animación 
window.onload = onLoad;
function onLoad() {
    // Grab our container div
    var container = document.getElementById("container");

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Put in a camera
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.set(0, 0, 12);

    // Create the Three.js renderer, add it to our div
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create a directional light to show off the object
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Create a shaded, texture-mapped cube and add it to the scene
    // First, create the texture map
    var mapUrl = "./images/figure.jpg";

    //TextureLoader load in the texture map
    var texture = new THREE.TextureLoader().load(mapUrl);

    // Now, create a Phong material to show shading; pass in the map
    var material = new THREE.MeshPhongMaterial({ map: texture });

    //Inicializamos nuetsros materiales
    material0 = new THREE.MeshBasicMaterial({ map: texture });
    material1 = new THREE.MeshStandardMaterial({ map: texture });
    material2 = new THREE.MeshPhongMaterial({ map: texture });

    //  inicializamos las figuras
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const geometry2 = new THREE.CylinderGeometry(1, 1, 3, 32);
    const geometry3 = new THREE.DodecahedronGeometry(2, 0);
    const geometry4 = new THREE.IcosahedronGeometry(2, 0);
    const geometry5 = new THREE.SphereGeometry(2, 32, 32);
    const geometry6 = new THREE.TorusGeometry(1.5, 0.5, 16, 100);

    // inicializa las figuras con sus valores y textura
    cube = new THREE.Mesh(geometry, material);
    cilindro = new THREE.Mesh(geometry2, material);
    dode = new THREE.Mesh(geometry3, material);
    hedro = new THREE.Mesh(geometry4, material);
    sphere = new THREE.Mesh(geometry5, material);
    torus = new THREE.Mesh(geometry6, material);

    // establecemos la posición de las figuras
    cube.position.set(-7.5, 2.4, 0);
    cilindro.position.set(0, 2.5, 0);
    dode.position.set(7.5, 2.4, 0);
    hedro.position.set(-7.5, -2.4, 0);
    sphere.position.set(0, -2, 0);
    torus.position.set(7.5, -2, 0);

    // como iran girando las figuras
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    cilindro.rotation.x = Math.PI / 5;
    cilindro.rotation.y = Math.PI / 5;
    dode.rotation.x = Math.PI / 5;
    dode.rotation.y = Math.PI / 5;
    hedro.rotation.x = Math.PI / 5;
    hedro.rotation.y = Math.PI / 5;
    sphere.rotation.x = Math.PI / 5;
    sphere.rotation.y = Math.PI / 5;
    torus.rotation.x = Math.PI / 5;
    torus.rotation.y = Math.PI / 5;

    // añadimos de una todas las figuras
    scene.add(cube, cilindro, dode, hedro, sphere, torus);
    addMouseHandler(); // hace que se pueda cambiar el material con el click
    run();
}
//Function to run the render loop
function run() {
    renderer.render(scene, camera);
    //animación del giro de las figuras
    if (animating) {
        cube.rotation.x += 0.02; 
        cube.rotation.y += 0.01; 
        cube.rotation.z += 0.01;
        cilindro.rotation.x += 0.02; 
        cilindro.rotation.y += 0.01; 
        cilindro.rotation.z += 0.01;
        dode.rotation.x += 0.02; 
        dode.rotation.y += 0.01; 
        dode.rotation.z += 0.01;
        hedro.rotation.x += 0.02; 
        hedro.rotation.y += 0.01; 
        hedro.rotation.z += 0.01;
        sphere.rotation.x += 0.02; 
        sphere.rotation.y += 0.01; 
        sphere.rotation.z += 0.01;
        torus.rotation.x += 0.02; 
        torus.rotation.y += 0.01; 
        torus.rotation.z += 0.01;
    }
    requestAnimationFrame(run);
    if (cambio) {
        switch (num_material) {
            case 0:
                cube.material = material0;
                cilindro.material = material0;
                dode.material = material0;
                hedro.material = material0;
                sphere.material = material0;
                torus.material = material0;
                break;
            case 1:
                cube.material = material1;
                cilindro.material = material1;
                dode.material = material1;
                hedro.material = material1;
                sphere.material = material1;
                torus.material = material1;
                break;
            case 2:
                cube.material = material2;
                cilindro.material = material2;
                dode.material = material2;
                hedro.material = material2;
                sphere.material = material2;
                torus.material = material2;
                break;
        }
    }
}

function addMouseHandler() {
    var dom = renderer.domElement;
    dom.addEventListener('mouseup', onMouseUp, false);
}
// este evento lo que hace es que si se presiona el 3 lo que hace es volver al inicio en 0 y hacer que no haga el cambio sino apartir desde el 0
function onMouseUp(event) {
    event.preventDefault();
    num_material++;
    if (num_material == 3) {
        num_material = 0;
    }
    cambio = !cambio;
}	