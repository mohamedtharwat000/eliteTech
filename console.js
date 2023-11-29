import { program, command } from 'bandersnatch';
import data from './dataManager.js';

const cmd = command()
  .default()
  .description('Outputs "bar".')
  .action(() => console.log('bar'));

const app = program().description('foo').add(cmd);

app.run();
