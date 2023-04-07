<template>
    <div id="threejs2">

    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  //材质颜色

//图元
onMounted(() => {
    const canvas = document.querySelector('#threejs2')
    canvas?.appendChild(renderer.domElement);
    //    const cube =  boxGeometry()
    // const cube = circleGeometry();
    const cube = coneGeometry();
    let controls = new OrbitControls(camera, renderer.domElement);  //实现手指拖动移动位置

    let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
    scene.add(ambientLight); //将环境光添加到场景中

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

//盒子
const boxGeometry = () => {
    const width = 1;
    const height = 1;
    const depth = 1;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;

}

//平面圆
const circleGeometry = () => {
    const radius = 1;
    const segments = 24;
    const geometry = new THREE.CircleGeometry(radius, segments);
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    return cube;
}

//锥形
const coneGeometry = () => {
    const radius = 1;
    const height = 2;
    const radialSegments = 16;
    const openEnded = true;
    const thetaStart = Math.PI * 0.25;

    const thetaLength = Math.PI * 1.5;
    const heightSegments = 10;
    const geometry = new THREE.ConeGeometry(
        radius, height,
        radialSegments, heightSegments,
        openEnded,
        thetaStart, thetaLength);

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}

</script>