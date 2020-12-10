import fs from 'fs';
import path from 'path';

import { UnF, Cities, TotalCities } from './Interfaces';

const fsPromises = fs.promises;

const getCitiesForEachUF = async (
  citiesFileRead: Array<Cities>,
  stateFileRead: UnF,
) => {
  const { ID: stateID, Nome: stateName } = stateFileRead;
  let newArr: Array<Cities> = [];
  await Promise.all(
    citiesFileRead.map(async (city) => {
      if (city.Estado === stateID) {
        city.Estado = stateName;
        newArr = [...newArr, city];
      }
    }),
  );
  return newArr;
};

export const readFile = async (filePath: string) => {
  const fileRead = JSON.parse(await fsPromises.readFile(filePath, 'utf-8'));
  return fileRead;
};

export const getPath = async (fileName: string, ...args: Array<string>) => {
  const filePath = path.join(...args, fileName);
  return filePath;
};

const writeFiles = async (data: Array<any>, pathToFile: string) => {
  await fsPromises.writeFile(pathToFile, JSON.stringify(data), 'utf-8');
};

export const dataToFiles = async (
  citiesFilePath: string,
  stateFilePath: string,
) => {
  const citiesFileRead: Array<Cities> = await readFile(citiesFilePath);
  const stateFileRead: Array<UnF> = await readFile(stateFilePath);

  await Promise.all(
    stateFileRead.map(async (state) => {
      const data = await getCitiesForEachUF(citiesFileRead, state);
      const filePath = await getPath(`${state.Sigla}.json`, 'src', 'db', 'ufs');
      await writeFiles(data, filePath);
    }),
  );
};

export const returnUfData = async (uf: UnF) => {
  const ufPath = await getPath(`${uf.Sigla}.json`, 'src', 'db', 'ufs');
  const result: Array<Cities> = await readFile(ufPath);
  const objUf: TotalCities = {
    name: uf.Sigla,
    amount: result.length,
  };
  return objUf;
};

export const createArrCitiesUf = async (ufsPath: string) => {
  const ufs: Array<UnF> = await readFile(ufsPath);
  const results: Array<TotalCities> = await Promise.all(
    ufs.map(async (uf) => {
      const result = await returnUfData(uf);
      return result;
    }),
  );

  const pathToFile: string = await getPath(
    'TotalCount.json',
    'src',
    'db',
    'ufs',
  );

  writeFiles(results, pathToFile);
};
