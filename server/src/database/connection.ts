import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log('Successfully connected with database!');
});
