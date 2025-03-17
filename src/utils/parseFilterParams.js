const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isValidType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isValidType(type)) return type;

  return undefined;
};

const parseFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
