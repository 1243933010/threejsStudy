<template>
    <div id="threejs2">

    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'


const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)



//图元
onMounted(() => {
    const canvas = document.querySelector('#threejs2')
    canvas?.appendChild(renderer.domElement);
   const cube =  boxGeometry()
    function animate() {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate()
})

//盒子
const boxGeometry = () => {
   
//  //添加个光源
//  const color = 0xFFFFFF;
//     const intensity = 1;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(-1, 2, 4);
//     scene.add(light);

    const width = 1;
    const height = 1;
    const depth = 1;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
    
}

</script>