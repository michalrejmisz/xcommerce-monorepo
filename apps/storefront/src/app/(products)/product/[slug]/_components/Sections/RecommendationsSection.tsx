import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

interface Item {
  image: string;
  title: string;
  price: string;
}

interface ScrollableGalleryProps {
  items: Item[];
}

const ScrollableGallery: React.FC<ScrollableGalleryProps> = ({ items }) => {
  const scrollRef = useRef(null);
  const { scrollX } = useScroll({ container: scrollRef });
  const x = useTransform(scrollX, [0, 100], [0, -100]);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={scrollRef}
        className="scrollbar-hide flex cursor-grab "
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={scrollRef}
          style={{ x }}
          className="flex"
        >
          {items?.map((item: any, index: any) => (
            <motion.div
              key={index}
              className="m-2 w-64 flex-shrink-0 rounded-lg bg-red-200 p-4 shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="mb-2 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <button
        onClick={() => scroll(-200)}
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => scroll(200)}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

const ProductCard = () => {
  return <div className="xl:shadow-custom-sm rounded-lg">Test</div>;
};

const RecomendationsSection = () => {
  const items = [
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_35_680_09.jpg",
      title: "Item 1",
      price: "$10.99",
    },
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_22_863_01.jpg",
      title: "Item 2",
      price: "$15.99",
    },
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_22_863_01.jpg",
      title: "Item 2",
      price: "$15.99",
    },
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_22_863_01.jpg",
      title: "Item 2",
      price: "$15.99",
    },
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_22_863_01.jpg",
      title: "Item 2",
      price: "$15.99",
    },
    {
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_11_8_7_22_863_01.jpg",
      title: "Item 2",
      price: "$15.99",
    },
  ];
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const arrayTest = [1, 2, 3, 4, 5, 6, 7];

  const onDragEnd = () => {
    const x = dragX.get();
    const dragBuffer = 50;

    if (x <= -dragBuffer && imgIndex < arrayTest.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= dragBuffer && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-9 h-screen ">
      <div className="separator flex" />
      <h2 className="font-instrument  mb-6 mt-2 text-2xl -tracking-[0.13px]">
        Rekomendowane akcesoria
      </h2>
      <div>
        <ScrollableGallery items={items} />
        {/* <AnimatePresence>
          <div className="relative w-screen overflow-hidden bg-red-200">
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
              className="flex  flex-row bg-green-200"
            >
              {arrayTest.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    animate={{ scale: imgIndex === idx ? 0.95 : 0.85 }}
                    transition={{
                      type: "spring",
                      mass: 3,
                      stiffness: 400,
                      damping: 50,
                    }}
                    className="basis-1/4 bg-blue-200"
                  >
                    <ProductCard />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export default RecomendationsSection;
