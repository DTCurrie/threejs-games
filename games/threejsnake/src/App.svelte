<script lang="ts">
  import { onMount } from "svelte";
  import { Mesh, PlaneGeometry, MeshToonMaterial, Color, Vector2 } from "three";

  import { screenSize } from "utils/window/screen-size";
  import {
    renderScene,
    requestRender,
    webGlRenderer,
  } from "utils/three/renderer";
  import { perspectiveCamera } from "utils/three/camera";
  import { ambientLight } from "utils/three/ambient-light";
  import { pointLight } from "utils/three/point-light";

  import { gameFieldSize } from "./lib/settings";
  import { player } from "./lib/player";
  import { segment } from "./lib/segment";
  import { target } from "./lib/target";
  import { movementSystem } from "./lib/ecs/movement-system";
  import { positionSystem } from "./lib/ecs/position-system";

  import "./app.css";
  import { randomVector2 } from "utils/three/vector";
  import { scene } from "./lib/scene";

  const { width, height, aspect } = screenSize();
  const renderer = webGlRenderer(width(), height(), {
    antialias: true,
    alpha: true,
  });
  const { camera } = perspectiveCamera({});

  let main: HTMLElement;
  let interval;
  let addSegment = false;

  camera.aspect = aspect();
  camera.updateProjectionMatrix();
  scene.add(camera);

  const gameField = new Mesh(
    new PlaneGeometry(gameFieldSize.width, gameFieldSize.height, 1, 1),
    new MeshToonMaterial({
      color: new Color(0, 0.8, 0),
      depthTest: true,
      depthWrite: true,
    })
  );

  gameField.position.z = -0.5;
  scene.add(gameField);

  const point = pointLight();
  point.position.set(0, 0, gameField.position.z + 100);
  scene.add(point);

  const ambient = ambientLight();
  scene.add(ambient);

  gameField.position.set(
    gameFieldSize.width / 2,
    gameFieldSize.height / 2,
    gameField.position.z
  );

  camera.position.set(
    gameFieldSize.width / 2,
    gameFieldSize.height / 2,
    ((gameFieldSize.width / 2) * gameFieldSize.height) / 2 / 2
  );

  camera.lookAt(
    gameFieldSize.width / 2,
    gameFieldSize.height / 2,
    gameField.position.z
  );

  let snake = player();
  scene.add(snake.entity.mesh);

  let food = generateFood(
    snake.entity.position,
    snake.entity.segmentPositions()
  );

  function onWindowResize() {
    renderer.setSize(width(), height());
    camera.aspect = aspect();
    camera.updateProjectionMatrix();
    requestRender(renderer, scene, camera);
  }

  function generateFood(snakePosition: Vector2, segmentPositions: Vector2[]) {
    const coordinates = randomVector2(
      gameFieldSize.width,
      gameFieldSize.height
    );

    if (
      snakePosition.equals(coordinates) ||
      segmentPositions.find((position) =>
        position.equals(snake.entity.position)
      )
    ) {
      return generateFood(snakePosition, segmentPositions);
    }

    const food = target();
    food.entity.position = coordinates;
    scene.add(food.entity.mesh);

    return food;
  }

  function tick() {
    movementSystem();

    if (
      snake.entity
        .segmentPositions()
        .find((position) => position.equals(snake.entity.position))
    ) {
      window.clearInterval(interval);
      snake.destroy();
      food.destroy();

      alert("Game Over!");
      location.reload();
      return;
    }

    if (addSegment) {
      const newSegment = segment();
      scene.add(newSegment.entity.mesh);
      newSegment.entity.position = new Vector2(
        snake.entity.lastPosition.x,
        snake.entity.lastPosition.y
      );
      snake.entity.segments.unshift(newSegment);
      addSegment = false;
    }

    if (snake.entity.position.equals(food.entity.position)) {
      food.destroy();

      const next = generateFood(
        snake.entity.position,
        snake.entity.segmentPositions()
      );

      food = next;
      addSegment = true;
    }

    positionSystem();
  }

  function animate() {
    tick();
    requestRender(renderer, scene, camera);
  }

  onMount(() => {
    main.appendChild(renderer.domElement);

    positionSystem();
    renderScene(renderer, scene, camera);

    interval = window.setInterval(animate, 250);

    window.addEventListener("resize", onWindowResize, false);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  });
</script>

<main bind:this={main} />

<style>
</style>
