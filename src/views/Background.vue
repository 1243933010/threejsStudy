<template>
    <div id="background"></div>

    <div class="box">

    </div>
</template>


<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
onMounted(()=>{
    const canvas = document.querySelector('#background');
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    canvas?.appendChild(renderer.domElement)

    const css3DRenderer  = new CSS3DRenderer();
    css3DRenderer .setSize(window.innerWidth/4, window.innerHeight/4);
    css3DRenderer .domElement.style.position = 'absolute';
    css3DRenderer .domElement.style.top = '1px';
    css3DRenderer .domElement.style.left = '50%';

    canvas?.appendChild(css3DRenderer .domElement);

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 150;
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    // camera.position.set(0,10,20);

    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera,renderer.domElement)
    controls.target.set(0,0,1)
    const controls1 = new OrbitControls(camera,css3DRenderer.domElement)
    controls1.target.set(0,0,1)

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
    '/pos-x.jpg','/neg-x.jpg', '/pos-y.jpg','/neg-y.jpg',
    '/pos-z.jpg', '/neg-z.jpg',
    ])
    scene.background=  texture;

    const box = new THREE.BoxGeometry(1,1,1)
    const boxMat = new THREE.MeshBasicMaterial({color:'#BAC'})
    const mesh = new THREE.Mesh(box,boxMat);
    mesh.position.z = 3;
    mesh.position.y = 1;

    scene.add(mesh)

  
    const element = document.querySelector('.box')
    const cssObject = new CSS3DObject(element);
    cssObject.position.z = 3;
    cssObject.position.y = 1;
    // cssObject.position.set(0, 0, 0);
    // cssObject.rotation.set(0, 0, 0);
    // cssObject.scale.set(1, 1, 1);
    scene.add(cssObject);


    function render(){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix()
        requestAnimationFrame(render);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // cube.rotation.z += 0.01;

        controls.update()
        controls1.update()
        renderer.render(scene, camera);
        css3DRenderer.render(scene, camera);

    }
    render();
})
</script>

<style>
.box{
    width: 10px;
    height: 10px;
    background-color: red;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100; */
}
</style>