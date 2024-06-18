"use client";

import Image from "next/image";

import "@acme/db";

import { CheckCircledIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import DropdownQuantity from "./DropdownQuantity";

const BuyBox: React.FC = () => {
  const descriptionMockup = [
    {
      icon: <CheckCircledIcon width="24" height="24" />,
      firstLine: "Dostępny",
      secondLine: "Dowiedz się więcej",
    },
    {
      icon: <CheckCircledIcon width="24" height="24" />,
      firstLine: "Kup teraz, otrzymasz pojutrze",
      secondLine: "Dowiedz się więcej",
    },
    {
      icon: <CheckCircledIcon width="24" height="24" />,
      firstLine: "Darmowa dostawa",
      secondLine: "Szczegóły Dostawy",
    },
    {
      icon: <CheckCircledIcon width="24" height="24" />,
      firstLine: "Rata tylko 14,68",
      secondLine: "Oblicz ratę",
    },
    {
      icon: <CheckCircledIcon width="24" height="24" />,
      firstLine: "Dostepny w salonach",
      secondLine: "Wybierz salon",
    },
  ];
  return (
    <div className="md:border-1 h-fit w-full bg-white md:rounded-lg md:border md:border-gray-200 xl:w-72">
      <div className="flex w-full md:justify-end md:px-4 md:pt-4">
        <span className="text-lg leading-6 md:text-[26px] md:leading-8">
          2699,00 zł
        </span>
      </div>
      <div className="flex flex-row pb-6 pt-4 md:px-4 md:pl-4 md:pt-3">
        <DropdownQuantity />
        <Button className="ml-2 h-10 w-full rounded-md bg-green-200 px-2 py-2 text-white hover:bg-green-400 active:bg-green-300">
          Dodaj do koszyka
        </Button>
      </div>
      <div className="rounded-lg border border-gray-200 md:rounded-none md:border-none">
        {descriptionMockup.map((item, index) => (
          <div
            key={index}
            className={cn("group/item flex flex-row hover:bg-gray-100", {
              "rounded-b-lg": descriptionMockup.length - 1 === index,
              "max-md:rounded-t-lg": index === 0,
            })}
          >
            <div
              className={cn(
                "flex w-14 shrink-0 items-center justify-center text-center xl:w-12",
                {
                  "group-hover/item:md:border-b":
                    index !== descriptionMockup.length - 1,
                  "max-md:rounded-lg md:border-t": index === 0,
                  "max-md:border-t group-hover/item:md:border-t": index !== 0,
                },
              )}
            >
              <span className="m-auto inline-block h-6 w-6 overflow-hidden">
                {item.icon ?? "ikona"}
              </span>
            </div>
            <div
              className={cn("flex w-full flex-col justify-center py-[10px]", {
                "md:border-t": index === 0,
                "border-t": index !== 0,
              })}
            >
              <span className="block text-sm text-gray-500">
                {item.firstLine}
              </span>
              <span className="block text-xs text-gray-300">
                {item.secondLine}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyBox;
