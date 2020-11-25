const canvas = document.getElementById("video-container");
let CANVAS_WIDTH = canvas.offsetWidth;
let CANVAS_HEIGHT = canvas.offsetHeight;
//canvas.style.width = '100%';
//canvas.style.height = '100%';
var camera, scene, renderer, loader, clouds,counter,texture,sphere;
var geometry, materials, textMesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 30, CANVAS_WIDTH/ CANVAS_HEIGHT, 0.01, 1000 );
    camera.name = "cam";
    camera.position.z = 100;

    scene = new THREE.Scene();
    
    let ambient = new THREE.AmbientLight('#d80e0e');
    scene.add(ambient);
  
    const dirLight = new THREE.DirectionalLight( '#fe39b9', 0.125 );
    dirLight.position.set( 0, 0, -100 ).normalize();
    scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    pointLight.position.set( 100, 0, 90 );
    scene.add( pointLight );
    
    renderer = new THREE.WebGLRenderer( {antialias: true } )
    renderer.setClearColor('white');
    renderer.setSize(CANVAS_WIDTH,CANVAS_HEIGHT );
    renderer.setPixelRatio( window.devicePixelRatio );
    canvas.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    let texLoader = new THREE.TextureLoader()
    texLoader.load('assets/img/env.jpg',
    (tex) => {
        texture =tex;
      console.log(tex);
    })
    materials = [
      new THREE.MeshNormalMaterial( {color: 'white', emissive: 'red', reflectivity:1,envMap: texture}),
      new THREE.MeshNormalMaterial({wireframe : true})
    ];
    loader = new THREE.FontLoader();
    loader.load('assets/fonts/Lato_Black_Regular.json', (font) =>
      {
      let textGeo = new THREE.TextGeometry('Marcos Moran',
      {
        font: font,
        size: 15,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize : 1,
        bevelOffset : 0,
        bevelSegments:2 
      })
      
				textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
      //	textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
        textMesh = new THREE.Mesh( textGeo, materials[0]);
        textMesh.position.set(-65, -10);
        scene.add(textMesh);

        geometry= new THREE.SphereGeometry(110,20,20);
        var sphereMat = new THREE.MeshBasicMaterial({color:'black',opacity: 0.1 ,wireframe:true, transparent: true});
        sphere = new THREE.Mesh(geometry,sphereMat);
        sphere.position.z = 1;
        scene.add(sphere);
    })
}

function animate() {

    requestAnimationFrame( animate );
    sphere.rotation.y += 0.001;
    controls.update();
    renderer.render( scene, camera );
    //console.log(noise(10));

}


    