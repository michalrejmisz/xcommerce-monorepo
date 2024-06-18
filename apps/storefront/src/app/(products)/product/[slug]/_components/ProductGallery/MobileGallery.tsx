"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

import { cn } from "~/lib/utils";
import { ProductGalleryProps } from "./ProductGallery.types";

const MobileGallery: React.FC<ProductGalleryProps> = ({
  mainImageUrl,
  imagesUrlArray,
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();
    const dragBuffer = 50;

    if (x <= -dragBuffer && imgIndex < imagesUrlArray.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= dragBuffer && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-screen overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={{
          type: "spring",
          mass: 3,
          stiffness: 400,
          damping: 50,
        }}
        onDragEnd={onDragEnd}
        className="flex w-full cursor-grab items-center active:cursor-grabbing"
      >
        {imagesUrlArray.map((image, idx) => (
          <motion.div
            key={idx}
            animate={{ scale: imgIndex === idx ? 0.95 : 0.85 }}
            transition={{
              type: "spring",
              mass: 3,
              stiffness: 400,
              damping: 50,
            }}
            className="relative aspect-video w-full max-w-screen-md shrink-0 rounded-xl object-cover"
          >
            <Image
              src={image.url}
              alt={`Gallery image ${idx + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute bottom-2 flex w-full justify-center">
        {imagesUrlArray.map((_, index) => (
          <div
            key={index}
            className={cn("mx-1 h-2 w-2 rounded-full", {
              "bg-gray-300": imgIndex === index,
              "bg-gray-200": imgIndex != index,
            })}
            onClick={() => setImgIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileGallery;
