const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isValidType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isValidType(type)) return type;
};

const parseFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};
