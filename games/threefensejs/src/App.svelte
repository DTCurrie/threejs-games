<script lang="ts">
  import { Scene } from "three";
  import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

  import { orthographicCamera } from "utils/three/camera";
  import { screenSize } from "utils/window/screen-size";
  import {
    renderScene,
    requestRender,
    webGlRenderer,
  } from "utils/three/renderer";
  import * as THREE from "three";
  import { onMount } from "svelte";
  import Inspector from "three-inspect";

  const scene = new Scene();
  const { width, height, aspect } = screenSize();
  const loader = new FBXLoader();

  const renderer = webGlRenderer(width(), height(), {
    antialias: true,
    alpha: true,
  });

  const dimension = 16;
  const { camera } = orthographicCamera({
    left: -dimension * aspect(),
    right: dimension * aspect(),
    top: dimension,
    bottom: -dimension,
  });

  let main: HTMLElement;

  const inspector = new Inspector(THREE, scene, camera, renderer);

  function animate() {
    requestRender(renderer, scene, camera);
  }

  function onWindowResize() {
    renderer.setSize(width(), height());

    camera.left = -dimension * aspect();
    camera.right = dimension * aspect();
    camera.top = dimension;
    camera.bottom = -dimension;
    camera.updateProjectionMatrix();
    requestRender(renderer, scene, camera);
  }

  onMount(() => {
    camera.updateProjectionMatrix();
    camera.position.set(20, 20, 20); // all components equal
    camera.lookAt(scene.position); // or the origi
    scene.add(camera);

    main.appendChild(renderer.domElement);

    renderScene(renderer, scene, camera);

    window.addEventListener("resize", onWindowResize, false);
    const interval = window.setInterval(animate, 250);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.clearInterval(interval);
      inspector.dispose();
    };
  });
</script>

<main bind:this={main} />

<style>
</style>
