import { useEffect, useRef } from "react";
import {
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  DirectionalLight,
  MeshPhysicalMaterial,
  Color
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { SceneSettings } from "../src/types";

export default function ThreeScene({
  imageCarouselRef,
  model,
  sceneSettings
} : {
  imageCarouselRef: React.RefObject<HTMLDivElement>,
  model: string,
  sceneSettings: SceneSettings
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Reset the container if it already exists
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      // Define scene, camera, renderer
      const scene = new Scene();
      const camera = new PerspectiveCamera(75, imageCarouselRef.current.clientWidth / imageCarouselRef.current.clientHeight, 0.1, 1000);
      const renderer = new WebGLRenderer({
        alpha: true
      });
      // Have objects of the scene cast and receive shadows
      scene.traverse(function(obj) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      });
      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      // Set comtrol constraints
      controls.enablePan = sceneSettings.controls.enablePan;
      controls.minDistance = sceneSettings.controls.minDistance;
      controls.maxDistance = sceneSettings.controls.maxDistance;
      controls.enableDamping = sceneSettings.controls.enableDamping;
      controls.dampingFactor = sceneSettings.controls.dampingFactor;
      controls.update();

      // Set the camera position
      camera.position.x = sceneSettings.cameraPosition.x;
      camera.position.y = sceneSettings.cameraPosition.y;
      camera.position.z = sceneSettings.cameraPosition.z;

      // Add the ambient lighting
      const ambiLight = new AmbientLight(0xffffff, 0.4);
      const dirLight = new DirectionalLight(0xffffff, 0.5);
      scene.add(ambiLight);

      // Load the model
      const loader = new OBJLoader();
      loader.load(model, function (obj) {
        // Set the model position
        obj.position.x = sceneSettings.modelPosition.x;
        obj.position.y = sceneSettings.modelPosition.y;
        obj.position.z = sceneSettings.modelPosition.z;
        // Set the model rotation
        obj.rotateX(Math.PI * (sceneSettings.modelRotation.x / 360));
        obj.rotateY(Math.PI * (sceneSettings.modelRotation.y / 360));
        obj.rotateZ(Math.PI * (sceneSettings.modelRotation.z / 360));
        if (sceneSettings.modelColour) {
          // If applicable, set the model colour
          obj.traverse((mesh) => {
            mesh.material = new MeshPhysicalMaterial({ color: parseInt(sceneSettings.modelColour), clearcoatRoughness: sceneSettings.physicalMesh.clearcoatRoughness, reflectivity: sceneSettings.physicalMesh.reflectivity, roughness: sceneSettings.physicalMesh.roughness });
          });
        }
        // Have the directional light follow the camera
        dirLight.target = obj;
        // Sets the controls to focus on the model
        controls.target = obj.position;
        scene.add(obj);
      }, undefined, function (error) {
        console.error(error);
      } );

      // Add the directional light if applicable
      if (sceneSettings.directionalLight) {
        dirLight.position.set(
          sceneSettings.directionalLight.x, 
          sceneSettings.directionalLight.y, 
          sceneSettings.directionalLight.z
        );
        dirLight.castShadow = true;
        dirLight.intensity = sceneSettings.directionalLight.intensity;
        scene.add(dirLight);
      }

      // Set the renderer dimensions initially
      renderer.setSize(imageCarouselRef.current.clientWidth, imageCarouselRef.current.clientHeight, true);
      containerRef.current.appendChild(renderer.domElement);
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        // Set the renderer dimensions
        if (containerRef.current) {
          // Reset the container
          containerRef.current.innerHTML = "";
          renderer.setSize(imageCarouselRef.current.clientWidth, imageCarouselRef.current.clientHeight, true);
          containerRef.current.appendChild(renderer.domElement);
          camera.aspect = imageCarouselRef.current.clientWidth / imageCarouselRef.current.clientHeight;
          renderer.render(scene, camera);
          camera.updateProjectionMatrix();
        }
      });
    }
  }, []);

  return <div ref={containerRef} />;
}
