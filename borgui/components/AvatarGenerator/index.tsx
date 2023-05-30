import { Canvas } from "@react-three/fiber";
import Box from "@/components/Box";

const AvatarGenerator = () => {
  return (
    <div className="w-full min-h-[500px] shadow border-2">
      <Canvas style={{ height: 500 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
};

export default AvatarGenerator;
