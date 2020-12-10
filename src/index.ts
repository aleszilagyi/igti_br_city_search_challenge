import createUfDbDir from './services/createDir';
import {
  dataToFiles,
  getPath,
  createArrCitiesUf,
} from './services/handleFiles';

import cli from './services/handleReadline';

const statesFileName = 'Estados.json';
const citiesFileName = 'Cidades.json';

process.on('unhandledRejection', (reason, p) => {
  throw reason;
});

const main = async () => {
  const cities = await getPath(
    citiesFileName,
    'src',
    'db',
    'cidades-estados-brasil-json',
  );
  const ufs = await getPath(
    statesFileName,
    'src',
    'db',
    'cidades-estados-brasil-json',
  );

  await createUfDbDir();
  await dataToFiles(cities, ufs);
  await createArrCitiesUf(ufs);

  await cli(cities);
};

main();
