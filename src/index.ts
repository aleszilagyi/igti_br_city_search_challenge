import fs from 'fs/promises';
import path from 'path';
// import { ReadLine } from 'readline';
// import { EventEmitter } from 'events';

const statesFileName = 'Estados.json';
const citiesFileName = 'Cidades.json';

interface UnF {
  ID: string;
  Sigla: string;
  Nome: string;
}

interface Cities {
  ID: string;
  Nome: string;
  Estado: string;
}

interface StatesUF {
  ID: string;
  Nome: string;
  Estado: string;
}

const createUfDbDir = async () => {
  try {
    await fs.mkdir(path.join('src', 'db', 'ufs'), { recursive: false });
  } catch (err) {
    console.log('UFS dir already exists, moving to next step');
  }
};

const getCitiesForEachUF = async (
  citiesFileRead: Array<Cities>,
  stateFileRead: UnF,
) => {
  const { ID: stateID } = stateFileRead;
  const ufCities: Array<Cities> = [];
  await Promise.all(
    citiesFileRead.map(async (city) => {
      if (city.Estado === stateID) {
        await ufCities.push(city);
      }
    }),
  );
  return ufCities;
};

const readFile = async (filePath: string) => {
  const fileRead = await JSON.parse(await fs.readFile(filePath, 'utf-8'));
  return fileRead;
};

const getPath = async (fileName: string, ...args: Array<string>) => {
  const filePath = path.join(...args, fileName);
  return filePath;
};

const getCitiesNum = async (uf: string) => {
  const fileRead: Array<Cities> = await readFile(
    await getPath(`${uf}.json`, 'src', 'db', 'ufs'),
  );
  return fileRead.length;
};

const writeFiles = async (citiesData: Array<StatesUF>, stateUF: UnF) => {
  await fs.writeFile(
    await getPath(`${stateUF.Sigla}.json`, 'src', 'db', 'ufs'),
    JSON.stringify(citiesData),
    'utf-8',
  );
};

const dataToFiles = async (
  citiesFileRead: Array<Cities>,
  stateFileRead: Array<UnF>,
) => {
  Promise.all(
    stateFileRead.map(async (state) => {
      const data = await getCitiesForEachUF(citiesFileRead, state);
      writeFiles(data, state);
    }),
  );
};

const main = async () => {
  const cities = await readFile(
    await getPath(citiesFileName, 'src', 'db', 'cidades-estados-brasil-json'),
  );
  const ufs = await readFile(
    await getPath(statesFileName, 'src', 'db', 'cidades-estados-brasil-json'),
  );

  await createUfDbDir();
  await dataToFiles(cities, ufs);
  console.log(await getCitiesNum('CE'));
};

main();
