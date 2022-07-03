import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Get everything from the database', result);
    const jateDb = await openDB('jateDb', 1);
    const tx = jateDb.transaction('jateDb', 'readonly');
    const store = tx.objectStore('text-content');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
    
    //error handling
  } catch (error) {
    console.error('getDb not implemented');
  };
};


initdb();
