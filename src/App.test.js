import { mockGoogleCloudFirestore } from 'firestore-jest-mock'
import { mockAdd, mockDelete, mockUpdate, mockCollection } from 'firestore-jest-mock/mocks/firestore';
import moment from 'moment';

describe('Test', () => {
  mockGoogleCloudFirestore({
    database: {
      todos: [
        { id: '1', todo: 'Homer Simpson', date: moment() },
        { id: '2', todo: 'Lisa Simpson', date: moment() },
      ]
    },
  });

  test('gets todos', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();

    return firestore
      .collection('todos')
      .get()
      .then(({ docs }) => {
        const todos = docs.map(doc => ({ id: doc.id, ...doc.data() }));

        expect(mockCollection).toHaveBeenCalledWith('todos');
        expect(todos.length).toBeGreaterThanOrEqual(0);
        expect(todos[0].todo).toEqual('Homer Simpson');
      });
  });

  test('adds todo', async () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();

    const todoPayload = {
      todo: 'Bart Simpson',
      date: moment(),
    };

    await firestore
      .collection('todos')
      .add(todoPayload)
      .then(async () => {
        expect(mockAdd).toBeCalledWith(todoPayload);
      });
  });

  test('updates todo', async () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();

    const todoPayload = {
      todo: 'Bart Simpson',
      date: moment(),
    };

    await firestore
      .collection('todos')
      .doc('abc123')
      .update(todoPayload)
      .then(async () => {
        expect(mockUpdate).toBeCalledWith(todoPayload);
      });
  });

  test('removes todo', async () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();

    await firestore
      .collection('todos')
      .doc('abc123')
      .delete()
      .then(async () => {
        expect(mockDelete).toHaveBeenCalled();
      });

  });
});