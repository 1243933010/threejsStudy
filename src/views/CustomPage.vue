<template>
    <div id="custom"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

onMounted(() => {
    const canvas = document.querySelector('#custom')
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight)
    canvas?.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0,10,20)

    const scene = new THREE.Scene();
    const controls = new OrbitControls(camera,renderer.domElement)

    const loaders = new THREE.CubeTextureLoader();
    const texture = loaders.load([
    '/pos-x.jpg','/neg-x.jpg', '/pos-y.jpg','/neg-y.jpg',
    '/pos-z.jpg', '/neg-z.jpg',
    ])
    scene.background=  texture;

    const loader = new GLTFLoader();
    // loader.setPath('skull_salazar_downloadable/');
    loader.load('111.glb',(gltf)=>{
        console.log('11111',gltf)
        gltf.scene.traverse( function ( child ) {
    if ( child.isMesh ) {
        child.frustumCulled = false;
        //模型阴影
        child.castShadow = true;
        
        //模型自发光
        child.material.emissive =  child.material.color;
        child.material.emissiveMap = child.material.map ;
    }})
        gltf.scene.scale.set(0.5, 1, 0.5);
        scene.add(gltf.scene)
    },undefined,(error)=>{
        console.log('22222')
        console.error(error,'---')
    })
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate()
})
</script>