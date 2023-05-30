import { Canvas } from "@react-three/fiber";
import Box from "@/components/Box";
import Sticker from "@/components/AvatarGenerator/Sticker";
import { Suspense } from "react";

const AvatarGenerator = () => {
  return (
    <div className="w-full min-h-[500px] shadow border-2">
      <Canvas orthographic style={{ height: 500 }}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
          <Sticker img="/ugly_fish.png" startingPosition={[450, 110, 0]} />
          <Sticker img="/hands.png" startingPosition={[450, 0, 0]} />
          <Sticker img="/ugly_fish.png" startingPosition={[450, -110, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AvatarGenerator;
