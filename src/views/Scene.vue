<template>
    <div id="scene"></div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 150, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)
    // camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    const canvas = document.querySelector('#scene')
    canvas?.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);  //实现手指拖动移动位置


    const objects: any = [];
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const spherGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    //创建一个空节点，解决太阳地球一样大的问题
    const solarSystem = new THREE.Object3D()
    scene.add(solarSystem)
    objects.push(solarSystem);


    //创建太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
    const sunMesh = new THREE.Mesh(spherGeometry, sunMaterial)
    sunMesh.scale.set(5, 5, 5)
    // scene.add(sunMesh)
    solarSystem.add(sunMesh)  //太阳改为空场景的子节点
    objects.push(sunMesh)


    //添加包含地球月球的场景
    const earchOrbit = new THREE.Object3D();
    earchOrbit.position.x = 10;
    solarSystem.add(earchOrbit);
    objects.push(earchOrbit)

    //添加地球
    const earchMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 })
    const earthMesh = new THREE.Mesh(spherGeometry, earchMaterial)
    //    earthMesh.scale.set(17, 17,17)
    //    earthMesh.position.x = 10;
    //    scene.add(earthMesh);
    //    sunMesh.add(earthMesh)   //这不让地球不作为scene的子节点，作为sun的子节点
    //   solarSystem.add(earthMesh)  //地球改为空场景的子节点
    earchOrbit.add(earthMesh)
    objects.push(earthMesh);


    //添加包含月球的场景
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earchOrbit.add(moonOrbit)
    objects.push(moonOrbit)  //这一步可有可无

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
    const moonMesh = new THREE.Mesh(spherGeometry, moonMaterial)
    moonMesh.scale.set(.5, .5, .5)
    moonOrbit.add(moonMesh)
    objects.push(moonMesh)


    //添加光源
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity)
    scene.add(light)

    //执行动画
    function animate() {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        // const axes = new THREE.AxesHelper();
        // axes.material.depthTest = false;
        // axes.renderOrder = 1;
        // solarSystem.add(axes);
        // earchOrbit.add(axes.clone());
        // moonOrbit.add(axes.clone());

        objects.forEach((obj: any) => {
            obj.rotation.y += 0.01;
            // const axes = new THREE.AxesHelper();
            // axes.material.depthTest = false;
            // axes.renderOrder = 1;
            // obj.add(axes);

        });
        controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate()
})
</script>