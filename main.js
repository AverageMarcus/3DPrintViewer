(function(window) {
  'use strict';
  var core = window.core;
  var T = window.THREE;

  core.init();
  // core.addGround();

  var ambientLight = new T.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  var light = new T.DirectionalLight(0xffffff, 1);
  light.color.setHSL(0.1, 1, 0.95);
  light.position.set(0, 30, 20);
  light.position.multiplyScalar(40);
  scene.add(light);

  var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );

  var stlLoader = new T.STLLoader();
  var objModel;
  stlLoader.load('3DBenchy.stl', function(geometry) {
    objModel = new THREE.Mesh( geometry, material );
    objModel.position.set( 0, -10, 5 );
    objModel.rotation.set(-Math.PI / 2, 0, 0 );
    objModel.scale.set( 0.5, 0.5, 0.5 );
    objModel.castShadow = true;
    objModel.receiveShadow = true;
    objModel.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( -0, -0, 0 ) );

    scene.add( objModel );
  });

  var control = new function () {
    this.rotSpeed = 0.003;
    this.scale = 1;
  };
  
  camera.position.set(0,10,25);

  var update = function() {
    var x = camera.position.x;
    var z = camera.position.z;
    var y = camera.position.y;
    camera.position.x = x * Math.cos(control.rotSpeed) + z * Math.sin(control.rotSpeed);
    camera.position.y = y * Math.cos(control.rotSpeed / 5) + z * Math.sin(control.rotSpeed / 5);
    camera.position.z = z * Math.cos(control.rotSpeed) - x * Math.sin(control.rotSpeed);

    camera.lookAt(scene.position);
    
    controls.update();

    _renderer.render(scene, camera);
    requestAnimationFrame(animateRenderer);
  };
  var animateRenderer = function() {
    update();
  }
  update();

}(window));