<template>
    <div id="material"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {
    const canvas = document.querySelector('#material')
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

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);


    const radius = .5;
    const detail = 5;

    const geometry = new THREE.DodecahedronGeometry(radius, detail);
    // const material = new THREE.MeshPhongMaterial({ color: 0x00FFFF });
    // const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
    const material = new THREE.MeshLambertMaterial({ color: 0x00FFFF });
    // const material = new THREE.MeshToonMaterial({ color: 0x00FFFF });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube)



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
    animate()
})
</script>