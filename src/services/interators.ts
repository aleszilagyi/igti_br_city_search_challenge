import { getPath, readFile } from './handleFiles';
import { Cities, TotalCities } from './Interfaces';

const callToConsole = async (item: any) => {
  console.log(item);
};

export const getUfData = async (uf: string) => {
  const ufPath = await getPath(`${uf}.json`, 'src', 'db', 'ufs');
  const result = await readFile(ufPath);
  await callToConsole(result);
};

const compareAndGetDescending = async (arr: Array<TotalCities>) => {
  const result = await Promise.all(arr.sort((a, b) => b.amount - a.amount));
  return result;
};

const setDataToArray = async (file: Array<Cities>) => {
  const result = await Promise.all(
    file.map((city) => ({
      name: city.Nome,
      amount: city.Nome.length,
      state: city.Estado,
    })),
  );
  return result;
};

const compareAlphabetically = async (arr: Array<TotalCities>) => {
  const result = await Promise.all(
    arr.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    }),
  );
  return result;
};

const getFirstFiveElements = async (arr: Array<TotalCities>) => {
  const result = await Promise.all(arr.slice(0, 5));
  return result;
};

const getLastFiveElements = async (arr: Array<TotalCities>) => {
  const result = await Promise.all(arr.slice(-5));
  return result;
};

export const getMoreOrLessAmountUf = async (option: number) => {
  const ufPath = await getPath('TotalCount.json', 'src', 'db', 'ufs');
  const arrToSort: Array<TotalCities> = await readFile(ufPath);
  const sortedArr = await compareAndGetDescending(arrToSort);
  const result = option === 0
    ? await getFirstFiveElements(sortedArr)
    : await getLastFiveElements(sortedArr);

  const stringToConsole = `1: ${result[0].name} - ${result[0].amount} cidades
2: ${result[1].name} - ${result[1].amount} cidades
3: ${result[2].name} - ${result[2].amount} cidades
4: ${result[3].name} - ${result[3].amount} cidades
5: ${result[4].name} - ${result[4].amount} cidades`;
  await callToConsole(stringToConsole);
};

export const getSmallestCityName = async (filePath: string) => {
  const file = filePath.includes('.json')
    ? await readFile(filePath)
    : await readFile(await getPath(`${filePath}.json`, 'src', 'db', 'ufs'));
  const arrNameLength = await setDataToArray(file);
  const arrAlphaSorted = await (
    await compareAlphabetically(arrNameLength)
  ).reverse();
  const arrSorted = await (await compareAndGetDescending(arrAlphaSorted))
    .reverse()
    .slice(0, 1);
  const stringToConsole = `Cidade: ${arrSorted[0].name} - ${arrSorted[0].state}, ${arrSorted[0].amount} letras`;

  await callToConsole(stringToConsole);
};

export const getLargestCityName = async (filePath: string) => {
  const file = filePath.includes('.json')
    ? await readFile(filePath)
    : await readFile(await getPath(`${filePath}.json`, 'src', 'db', 'ufs'));
  const arrNameLength = await setDataToArray(file);
  const arrAlphaSorted = await compareAlphabetically(arrNameLength);
  const arrSorted = (await compareAndGetDescending(arrAlphaSorted)).slice(0, 1);
  const stringToConsole = `Cidade: ${arrSorted[0].name} - ${arrSorted[0].state}, ${arrSorted[0].amount} letras`;

  await callToConsole(stringToConsole);
};
