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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    // renderer.toneMappingExposure = 3.0;
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-100, 200, 40);
    light.target.position.set(-5, 0, 0);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.setPath('free_1975_porsche_911_930_turbo/');
    loader.load('scene.gltf',(gltf)=>{
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