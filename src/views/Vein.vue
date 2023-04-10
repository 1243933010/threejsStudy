<template>
    <div id="vein"> </div>

    <div id="loading">
    <div class="progress"><div class="progressbar"></div></div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(()=>{
    const loadingElem:any = document.querySelector('#loading');
    const progressBarElem:any = document.querySelector('.progressbar');

    const canvas = document.querySelector('#vein')
    console.log(canvas)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    canvas?.appendChild(renderer.domElement);
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
    const scene = new THREE.Scene();
    let controls = new OrbitControls(camera, renderer.domElement);  //实现手指拖动移动位置

    const loadManager = new THREE.LoadingManager();  //多材质情况下实现同步加载，并且有进度条提示
    const loader = new THREE.TextureLoader(loadManager);
    
    const width = 1;
    const height = 1;
    const depth = 1;
    const geometry = new THREE.BoxGeometry(width, height, depth);

    // const material = new THREE.MeshBasicMaterial({map:loader.load('/preview.jpg')})
    // const cube = new THREE.Mesh(geometry, material);

    const materials = [
    new THREE.MeshBasicMaterial({map:loader.load('/flower-1.jpg')}),
    new THREE.MeshBasicMaterial({map:loader.load('/flower-2.jpg')}),
    new THREE.MeshBasicMaterial({map:loader.load('/flower-3.jpg')}),
    new THREE.MeshBasicMaterial({map:loader.load('/flower-4.jpg')}),
    new THREE.MeshBasicMaterial({map:loader.load('/flower-5.jpg')}),
    new THREE.MeshBasicMaterial({map:loader.load('/flower-6.jpg')})
    ]
    let cube:any ;
    loadManager.onLoad=()=>{
        loadingElem.style.display = 'none';
        cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        animate()
    }

    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
  const progress = itemsLoaded / itemsTotal;
  progressBarElem.style.transform = `scaleX(${progress})`;
}
    function animate() {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
   
})
</script>


<style>
#loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#loading .progress {
    margin: 1.5em;
    border: 1px solid white;
    width: 50vw;
}
#loading .progressbar {
    margin: 2px;
    background: white;
    height: 1em;
    transform-origin: top left;
    transform: scaleX(0);
}
</style>