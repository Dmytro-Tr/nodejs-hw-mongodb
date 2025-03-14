const parseSortOrder = (sortOrder) => {
  if (typeof sortOrder === 'undefined') {
    return 'asc';
  }

  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    return 'asc';
  }

  return sortOrder;
};

const parseSortBy = (sortBy) => {
  const keysOfStudent = ['_id', 'name', 'isFavourite'];

  if (keysOfStudent.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
