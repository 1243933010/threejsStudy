<template>
    <div id="background"></div>
</template>


<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(()=>{
    const canvas = document.querySelector('#background');
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    canvas?.appendChild(renderer.domElement)

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 150;
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    // camera.position.set(0,10,20);

    const scene = new THREE.Scene();
    const controls = new OrbitControls(camera,renderer.domElement)
    controls.target.set(0,0,1)

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

    function render(){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix()
        requestAnimationFrame(render);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // cube.rotation.z += 0.01;

        controls.update()
        renderer.render(scene, camera);
    }
    render();
})
</script>