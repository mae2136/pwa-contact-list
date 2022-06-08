// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('workboxSW', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('workboxSW')) {
                console.log('workboxSW database already exists');
                return;
            }
            db.createObjectStore('workboxSW', { keyPath: 'id', autoIncrement: true });
            console.log('workboxSW database created');
        },

    });
}

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
    console.log('Post to the database');
    const userDb = await openDB('workboxSW', 1);

    const txt = userDb.transaction('workboxSW', 'readwrite');

    const store = txt.objectStore('workboxSW');

    const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

    const result = await request;
    console.log('🚀 - data saved to the database', result);
};


// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET all from the database');
    const userDb = await openDB('workboxSW', 1);
    const tx = userDb.transaction('workboxSW', 'readonly');
    const store = tx.objectStore('workboxSW');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const userDb = await openDB('workboxSW', 1);
    const tx = userDb.transaction('workboxSW', 'readwrite');
    const store = tx.objectStore('workboxSW');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
