import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { ReactNode, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";

interface BoxProps {
  children?: ReactNode;
}

const Box = (props: BoxProps) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [position, setPosition] = useState<Vector3>([0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore
  useFrame((state, delta) => {
    // @ts-ignore
    ref.current.rotation.x += delta;
    // @ts-ignore
    ref.current.rotation.z += delta;
  });

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
    // @ts-ignore
    <mesh
      {...props}
      position={position}
      {...bind()}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Box;
