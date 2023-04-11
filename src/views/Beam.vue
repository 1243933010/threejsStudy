<template>
    <div id="beam">

    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {
    const canvas = document.querySelector('#beam')
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas?.appendChild(renderer.domElement);

    const fov = 85;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 3;
    camera.position.set(0, 10, 20)

    const scene = new THREE.Scene()
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, -5, 0)

    const loader = new THREE.TextureLoader();

    const width = 4;
    const height = 4;
    const depth = 4;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ map: loader.load('/preview.jpg') })
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(11, 2, 0);
    scene.add(cube)

    //创建一个地板，使用贴图
    const planeSize = 60;
    const texture = loader.load('/checker.png')
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearesFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    //创建平面
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planMat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(planeGeo, planMat)
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh)

    //添加个正方形模型
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const mesh1 = new THREE.Mesh(cubeGeo, cubeMat);
    mesh1.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh1);

    //添加个圆模型
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
    const mesh2 = new THREE.Mesh(sphereGeo, sphereMat);
    mesh2.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh2);

    //添加个光源(环境光AmbientLight)
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.AmbientLight(color, intensity);
    // scene.add(light)

    //半球光HemisphereLight
    // const skyColor = 0xb1e1ff;
    // const groundColor = 0xb97a20;
    // const intensity = 1;
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    // scene.add(light)

    //方向光DirectionalLight
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);
    // scene.add(light);
    // scene.add(light.target);

    //点光源PointLight
    // const color= 0xffffff;
    // const intensity = 1;
    // const light = new THREE.PointLight(color,intensity);
    // light.position.set(0,10,0)
    // scene.add(light);
    // const helper = new THREE.PointLightHelper(light)
    // scene.add(helper)


    //聚光灯
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    // light.position.set(0, 10, 0);
    // light.position.z = 10;
    // light.position.x = 10;
    light.position.y = 20;

    scene.add(light);
    scene.add(light.target);
    const helper = new THREE.SpotLightHelper(light);
    scene.add(helper);

    function animate() {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix()
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;

        controls.update()
        renderer.render(scene, camera);

    }
    animate()
})
</script>