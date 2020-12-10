import fs from 'fs';
import path from 'path';

const fsPromises = fs.promises;

const createUfDbDir = async () => {
  try {
    await fsPromises.mkdir(path.join('src', 'db', 'ufs'), { recursive: false });
  } catch (error) {
    console.log('Atualizando arquivos...');
  }
};

export default createUfDbDir;
