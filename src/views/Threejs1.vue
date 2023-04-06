<template>
    <div id="threejs1">

    </div>
</template>


<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from 'vue';

onMounted(() => {
    loadThree();
})
const loadThree = () => {
    const canvas = document.querySelector('#threejs1')
    console.log(canvas)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth , window.innerHeight )
    canvas?.appendChild(renderer.domElement);
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new THREE.Scene();
    //添加个光源
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    //     let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
    //  scene.add(ambientLight); //将环境光添加到场景中


    //添加个盒子
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];
    // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 绿蓝色
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);



    renderer.render(scene, camera);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    function render(time: number) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        time *= 0.001;  // 将时间单位变为秒
        if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
        // cube.rotation.x = time;
        // cube.rotation.y = time;
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

</script>

