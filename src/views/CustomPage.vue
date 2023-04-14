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
})
</script>