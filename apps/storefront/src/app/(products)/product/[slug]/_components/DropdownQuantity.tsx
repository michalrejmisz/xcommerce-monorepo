"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { TriangleDownIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const DropdownQuantity = ({ length = 9 }) => {
  const [quantity, setQuantity] = useState(1);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantity = ({
    number,
    custom,
  }: {
    number?: number;
    custom?: boolean;
  }) => {
    if (number) {
      setQuantity(number);
      setShowCustomInput(false);
    }
    if (custom) setShowCustomInput(true);
  };
  const handleCustomQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);
    if (value <= 999) {
      setQuantity(value);
    } else {
      setQuantity(999);
    }
  };

  const handleBlur = () => {
    if (quantity > 999) {
      setQuantity(999);
    } else if (quantity <= 0) {
      setQuantity(1);
    }
    setShowCustomInput(false);
  };

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <div
        className={cn(
          "border-box focus flex h-10 w-14 shrink-0 items-center justify-center border focus:outline-none",
          {
            "rounded-lg": !isOpen,
            "rounded-t-lg": isOpen,
          },
        )}
      >
        {showCustomInput ? (
          <div className="m-3 flex w-full">
            <input
              type="number"
              min={1}
              max={999}
              value={quantity}
              onChange={handleCustomQuantityChange}
              onBlur={handleBlur}
              className="w-full focus:outline-none"
              autoFocus
            />
          </div>
        ) : (
          // </div>
          <DropdownMenu.Trigger>
            <div className="flex w-full items-center focus:outline-none">
              {quantity}
              <TriangleDownIcon />
            </div>
          </DropdownMenu.Trigger>
        )}
      </div>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Group className="w-14 rounded-b-lg border bg-white">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <DropdownMenu.Item
                key={item}
                onClick={() => handleQuantity({ number: item })}
                className={cn(
                  "flex h-[30px] items-center justify-center bg-white hover:bg-gray-200 focus:outline-none",
                  {
                    "font-bold": item == quantity,
                  },
                )}
              >
                {item}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Item
              onClick={() => handleQuantity({ custom: true })}
              className="flex h-[30px] items-center justify-center bg-white"
            >
              9+
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownQuantity;
