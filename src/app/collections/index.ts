const USERS_COLLECTION = 'users';
const CONTACTS_COLLECTION = 'contacts';
const CHAT_COLLECTION = 'chats';

export const collections = {
  users: USERS_COLLECTION,
  contacts: CONTACTS_COLLECTION,
  chats: CHAT_COLLECTION,
};

export const subCollections = {
  [collections.chats]: {
    messages: 'messages',
  },
};
