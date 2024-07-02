import type { Material, Stone } from "@/types/components/collection";

export const getItemNameByProperties = (materials: Material[], stones: Stone[]): string => {
  let name: string = "";

  materials.forEach((material) => {
    name += material.name + ", ";
  });

  stones.forEach((stone) => {
    name += stone.name + ", ";
  });

  return name.slice(0, -2);
};

export const getItemName = (str: string) => {
  return str.replace(/ - Embouts .*/, "");
};