import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find(contactsQuery)
      .merge(contactsQuery)
      .countDocuments(),
    contactsQuery
      // .find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const pagimationData = calculatePaginationData(contactsCount, page, perPage);
  return {
    data: contacts,
    ...pagimationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (contact) => {
  const contactPost = await ContactsCollection.create(contact);
  return contactPost;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, contact, options) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    contact,
    {
      new: true,
      includeResultMetadata: true,
      ...contact,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
