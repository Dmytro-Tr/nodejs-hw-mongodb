const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isValidType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isValidType(contactType)) return contactType;

  return undefined;
};

const parseFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
