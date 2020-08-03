import axios from 'axios';

export const getHello = (person: string) => {
  return 'Hello, ' + person;
};

export const getText = () =>
  axios.get('https://jsonplaceholder.typicode.com/todos/1');
