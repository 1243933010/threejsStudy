<template>
    <div id="shadow">

    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {
    const canvas = document.querySelector('#shadow')
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
    scene.background = new THREE.Color("white");


    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, -5, 0)

    const loader = new THREE.TextureLoader();

    //创建一个地板，使用贴图
    const planeSize = 40;
    const texture = loader.load('/checker.png')
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearesFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    //创建平面
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planMat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
    planMat.color.setRGB(1.5, 1.5, 1.5);
    const mesh = new THREE.Mesh(planeGeo, planMat)
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh)

    const shadowTexture = loader.load("/roundshadow.png");
    const sphereShadowBases = [];
    //创建一个球体
    const sphereRadius = 1;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius,sphereWidthDivisions,sphereHeightDivisions );

    //创建一个假阴影的平面网格
    const planeSize1 = 1;
    const shadowGeo = new THREE.PlaneGeometry(planeSize1, planeSize1);


    const numSpheres = 15;
    for (let i = 0; i < numSpheres; ++i) {
        // make a base for the shadow and the sphere
        // so they move together.
        const base = new THREE.Object3D();
        scene.add(base);

        // add the shadow to the base
        // note: we make a new material for each sphere
        // so we can set that sphere's material transparency
        // separately.
        const shadowMat = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true, // so we can see the ground
            depthWrite: false, // so we don't have to sort
        });
        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.position.y = 0.001; // so we're above the ground slightly
        shadowMesh.rotation.x = Math.PI * -0.5;
        const shadowSize = sphereRadius * 4;
        shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
        base.add(shadowMesh);

        // add the sphere to the base
        const u = i / numSpheres; // goes from 0 to 1 as we iterate the spheres.
        const sphereMat = new THREE.MeshPhongMaterial();
        sphereMat.color.setHSL(u, 1, 0.75);
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.position.set(0, sphereRadius + 2, 0);
        base.add(sphereMesh);

        // remember all 3 plus the y position
        sphereShadowBases.push({ base, sphereMesh, shadowMesh, y: sphereMesh.position.y });
    }
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 2;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    const color = 0xffffff;
    const intensity1 = 1;
    const light1 = new THREE.DirectionalLight(color, intensity1);
    light1.position.set(0, 10, 5);
    light1.target.position.set(-5, 0, 0);
    scene.add(light1);
    scene.add(light1.target);

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

    function render(time) {
        time *= 0.001;  // convert to seconds

        resizeRendererToDisplaySize(renderer);

        {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        sphereShadowBases.forEach((sphereShadowBase, ndx) => {
            const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

            // u is a value that goes from 0 to 1 as we iterate the spheres
            const u = ndx / sphereShadowBases.length;

            // compute a position for there base. This will move
            // both the sphere and its shadow
            const speed = time * .2;
            const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
            const radius = Math.sin(speed - ndx) * 10;
            base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

            // yOff is a value that goes from 0 to 1
            const yOff = Math.abs(Math.sin(time * 2 + ndx));
            // move the sphere up and down
            sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
            // fade the shadow as the sphere goes up
            shadowMesh.material.opacity = THREE.MathUtils.lerp(1, .25, yOff);
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})
</script>