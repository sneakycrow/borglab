import { Canvas } from "@react-three/fiber";
import Box from "@/components/Box";
import React, { Suspense, useState } from "react";
import Sticker from "@/components/AvatarGenerator/Sticker";

const stickerList = [
  {
    id: "ugly_fish",
    src: "/ugly_fish.png",
    alt: "Ugly Fish",
    width: 100,
    height: 100,
  },
];

type TSticker = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const AvatarGenerator = () => {
  const [selectedStickers, setSelectedStickers] = useState<TSticker[]>([]);
  return (
    <div className="w-full min-h-[500px]">
      {selectedStickers.length > 0 && (
        <div className="flex flex-col">
          <h3 className="text-lg">Selected Stickers</h3>
          <div className="flex flex-row">
            {selectedStickers.map((sticker) => (
              <div
                key={sticker.src}
                className="flex flex-row items-center justify-between"
              >
                <img
                  src={sticker.src}
                  alt={sticker.alt}
                  width={sticker.width}
                  height={sticker.height}
                  className="self-start"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <Canvas
        orthographic
        className="min-h-[500px] my-5 shadow border-2"
        style={{ height: 500 }}
      >
        <Suspense fallback={null}>
          <Box />
          {selectedStickers.map((sticker) => (
            <Sticker key={sticker.id} img={sticker.src} />
          ))}
        </Suspense>
      </Canvas>
      <div className="block">
        <h3>Available Stickers</h3>
        {stickerList
          .filter(
            (sticker) =>
              !selectedStickers
                .map((sticker) => sticker.id)
                .includes(sticker.id)
          )
          .map((sticker) => (
            <div
              key={sticker.src}
              className="flex flex-row items-center justify-between"
            >
              <img
                src={sticker.src}
                alt={sticker.alt}
                width={sticker.width}
                height={sticker.height}
                onClick={() =>
                  setSelectedStickers((prev) => [...prev, sticker])
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvatarGenerator;
