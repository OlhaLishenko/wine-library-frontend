export const normolizeTitle = (title: string) => {
  return `${title[0].toUpperCase()}${title.toLowerCase().slice(1).replace('_', ' ').toLowerCase()}`;
};
