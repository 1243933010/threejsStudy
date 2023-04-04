<template>
    <!-- <img src="../assets/scifi_girl_v.01/scene.gltf" alt=""> -->
</template>


<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const firstThree = () => {  //绿色方块旋转
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;
    document.body.appendChild(renderer.domElement)
    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate()
}
// firstThree()

const createLine = () => { //画线
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);  //设置背景的尺寸
    document.body.appendChild(renderer.domElement)
    const camera = new THREE.PerspectiveCamera(45, window.innerHeight / window.innerHeight, 1, 500)
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();


    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }) //定义线的材质

    const points = [];//定义三个点
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    // points.push(new THREE.Vector3(0,0,30))
    // points.push(new THREE.Vector3(0,30,0))

    points.push(new THREE.Vector3(10, 0, 0))
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);//把三个点跟线连在一起
    scene.add(line);
    renderer.render(scene, camera);

}
// createLine()

const loadFltf = ()=>{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,window.innerHeight/window.innerHeight,0.25,20);
    camera.position.set(2, 1, 7);
    camera.lookAt(0, 0, 0);


    let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
 scene.add(ambientLight); //将环境光添加到场景中
 let pointLight = new THREE.PointLight(0xffffff, 1, 0);
 pointLight.position.set(200, 200, 200); //设置点光源位置
 scene.add(pointLight); //将点光源添加至场景

    

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);  //设置背景的尺寸
    document.body.appendChild(renderer.domElement)
    let controls = new OrbitControls(camera, renderer.domElement);
   

    const loader = new GLTFLoader();
    console.log(loader)
    loader.setPath('skull_salazar_downloadable/');
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
}

loadFltf()
</script>


<style></style>