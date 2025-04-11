// import { SORT_ORDER } from '../constants/index.js';

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
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
    'photo',
  ];

  if (keysOfContact.includes(sortBy)) {
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
