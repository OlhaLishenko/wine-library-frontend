import { WineType } from '@/shared/types/WineType';

export const getPropertyList = (wine: WineType) => {
  const list: { title: string; value: string | number }[] = [];
  const outOfList = ['id', 'name', 'imageUrl', 'description', 'grapes'];

  const filteredList = Object.entries(wine).filter(
    (property) => !outOfList.some((item) => item === property[0])
  );

  filteredList.map((item) => list.push({ title: item[0], value: item[1] }));

  return list;
};
