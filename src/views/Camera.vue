<template>
    <div id="camera"></div>


    <div class="split">
        <div id="view1" tabindex="1"></div>
        <div id="view2" tabindex="2"></div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {
    const canvas = document.querySelector('#camera')
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

    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    const view1Elem = document.querySelector('#view1');
    const view2Elem = document.querySelector('#view2');

    const controls = new OrbitControls(camera, view1Elem)
    controls.target.set(0, -5, 0)

    const loader = new THREE.TextureLoader();

    const camera2 = new THREE.PerspectiveCamera(
        60,  // fov
        2,   // aspect
        0.1, // near
        500, // far
    );
    camera2.position.set(40, 10, 30);
    camera2.lookAt(0, 5, 0);

    const controls2 = new OrbitControls(camera2, view2Elem);
    controls2.target.set(0, 5, 0);
    controls2.update();




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


    //方向光DirectionalLight
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);


    function animate() {
        // const canvas = renderer.domElement;
        // camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.updateProjectionMatrix()
        // resizeRendererToDisplaySize(renderer);
 
 // 启用剪刀函数
 renderer.setScissorTest(true);

 // 渲染主视野
 {
   const aspect = setScissorForElement(view1Elem);

   // 用计算出的aspect修改摄像机参数
   camera.aspect = aspect;
   camera.updateProjectionMatrix();
   cameraHelper.update();

   // 来原视野中不要绘制cameraHelper
   cameraHelper.visible = false;

   scene.background.set(0x000000);

   // 渲染
   renderer.render(scene, camera);
 }

 // 渲染第二台摄像机
 {
   const aspect = setScissorForElement(view2Elem);

   // 调整aspect
   camera2.aspect = aspect;
   camera2.updateProjectionMatrix();

   // 在第二台摄像机中绘制cameraHelper
   cameraHelper.visible = true;

   scene.background.set(0x000040);

   renderer.render(scene, camera2);
 }
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // cube.rotation.z += 0.01;

        // controls.update()
        // renderer.render(scene, camera);

    }

    function setScissorForElement(elem) {
  const canvasRect = canvas.getBoundingClientRect();
  const elemRect = elem.getBoundingClientRect();
 
  // 计算canvas的尺寸
  const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
  const left = Math.max(0, elemRect.left - canvasRect.left);
  const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
  const top = Math.max(0, elemRect.top - canvasRect.top);
 
  const width = Math.min(canvasRect.width, right - left);
  const height = Math.min(canvasRect.height, bottom - top);
 
  // 设置剪函数以仅渲染一部分场景
  const positiveYUpBottom = canvasRect.height - bottom;
  renderer.setScissor(left, positiveYUpBottom, width, height);
  renderer.setViewport(left, positiveYUpBottom, width, height);
 
  // 返回aspect
  return width / height;
}
    animate()
})
</script>


<style>
.split {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.split>div {
    width: 100%;
    height: 100%;
}
</style>