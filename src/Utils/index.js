
import *  as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"
export function createScene() {
      let scene = new THREE.Scene();
      let textureLoad =new RGBELoader();
      let map = textureLoad.load("./023.hdr");
      scene.background = map;
      scene.environment = map;
    //   scene.environment.mapping = THREE.EquirectangularReflectionMapping;
      return scene
}



export function createCameraModule() {
     let arr = [];
     let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,10000)
     camera.name="我自己的相机"
     arr.push(camera)

     return arr
}



export function createAx() {
    let ax = new THREE.AxesHelper(60);

    return ax
}


export function createRender() {
    let render = new THREE.WebGLRenderer({
        antialias:true,
        logarithmicDepthBuffer:true,
        physicallyCorrectLights:true
    })
    render.setSize(window.innerWidth,window.innerHeight)
    render.outputEncoding = THREE.sRGBEncoding;
    render.toneMappingExposure = 1;
    render.toneMapping = THREE.ACESFilmicToneMapping;
    return render
}



export function createAnimate(scene,render,camera,mix,clock) {
     let nowCamera = camera.cameraList[camera.currentCamera]
     render.render(scene,nowCamera)
     if(mix[0]) {
        let time = clock.getDelta() * 10;
        mix[0].update(time)
     }
     requestAnimationFrame(() => createAnimate(scene,render,camera,mix,clock))
}


export function createControls(camera,render) {
     new OrbitControls(camera,render.domElement)
}


export function createLight() {
     let light = new THREE.DirectionalLight(0xffffff, 5)
     light.position.set(10, 100, 10);
    return  light
}