import { useLoader, useThree, Vector3 } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";

interface ImageProps {
  startingPosition: Vector3;
  img: string;
}

const Image = (props: ImageProps) => {
  const texture = useLoader(TextureLoader, props.img);
  const ref = useRef(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [position, setPosition] = useState<Vector3>(props.startingPosition);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      // @ts-ignore
      const [, , z] = position;
      setPosition([x / aspect, -y / aspect, z]);
    },
    // @ts-ignore
    { pointerEvents: true }
  );
  return (
    <mesh {...props} position={position} {...bind()} ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Image;
