import readline from 'readline';

import {
  getUfData,
  getMoreOrLessAmountUf,
  getLargestCityName,
  getSmallestCityName,
} from './interators';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ufs: Array<string> = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MG',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SC',
  'SE',
  'SP',
  'TO',
];

const lineMsgs = {
  welcomeMsg: `
Olá, Bem vindo à CLI do primeiro Desafio do Bootcamp Fullstack Developer da IGTI.
Por favor, escolha uma das opções abaixo digitando o número correspondente:`,
  generalOptions: `
1 - Acessar dados de um estado específico
2 - Mostrar lista dos 5 estados que contêm mais cidades
3 - Mostrar lista dos 5 estados que contêm menos cidades
4 - Buscar o maior nome de cidade do País ou estado específico
5 - Buscar o menor nome de cidade do País ou estado específico
6 - Sair do Console

Opção: `,
  getBackOrExit: `
Digite uma das opções abaixo:
1 - Retornar ao menu;
2 - Consultar novamente a função;
6 - Sair do console;

Opção: `,
  firstOptionMenu: `
Digite a UF do estado para acessar os dados. Ex: MG

Digite: `,
  searchForLargestName: `
Digite a UF do estado ou a palavra "BR" para obter a cidade de maior nome. Ex: MG

Digite: `,
  searchForSmallestName: `
Digite a UF do estado ou a palavra "BR" para obter a cidade de menor nome. Ex: MG

Digite: `,
  invalidInput: `
  Opção inválida, tente novamente`,
  goodBye: `
Obrigado por utilizar o app, use 'ctrl+c' para finalizar o servidor.
Até mais!`,
};

const cli = (cities: string) => {
  const exitOrMenu = async (callback: CallableFunction) => {
    rl.question(`${lineMsgs.getBackOrExit}`, async (answer) => {
      if (answer === '1') {
        cli(cities);
      } else if (answer === '6') {
        console.log(lineMsgs.goodBye);
        rl.close();
      } else if (answer === '2') {
        await callback();
      } else {
        console.log(lineMsgs.invalidInput);
        await exitOrMenu(callback);
      }
    });
  };

  const firstOption = async () => {
    rl.question(`${lineMsgs.firstOptionMenu}`, async (answer) => {
      const read = answer.toUpperCase();
      if (ufs.includes(read)) {
        console.log(await getUfData(read));
        await exitOrMenu(firstOption);
      } else {
        console.log(lineMsgs.invalidInput);
        await firstOption();
      }
    });
  };

  const secondOption = async () => {
    console.log(await getMoreOrLessAmountUf(0));
    await exitOrMenu(secondOption);
  };

  const thirdOption = async () => {
    console.log(await getMoreOrLessAmountUf(1));
    await exitOrMenu(thirdOption);
  };

  const fourthOption = async () => {
    rl.question(`${lineMsgs.searchForLargestName}`, async (answer) => {
      const read = answer.toUpperCase();
      if (ufs.includes(read)) {
        console.log(await getLargestCityName(read));
        await exitOrMenu(fourthOption);
      } else if (read === 'BR') {
        console.log(await getLargestCityName(cities));
        await exitOrMenu(fourthOption);
      } else {
        console.log(lineMsgs.invalidInput);
        await fourthOption();
      }
    });
  };

  const fifthOption = async () => {
    rl.question(`${lineMsgs.searchForLargestName}`, async (answer) => {
      const read = answer.toUpperCase();
      if (ufs.includes(read)) {
        console.log(await getSmallestCityName(read));
        await exitOrMenu(fifthOption);
      } else if (read === 'BR') {
        console.log(await getSmallestCityName(cities));
        await exitOrMenu(fifthOption);
      } else {
        console.log(lineMsgs.invalidInput);
        await fifthOption();
      }
    });
  };

  const sixthOption = async () => {
    console.log(lineMsgs.goodBye);
    rl.close();
  };

  const start = async () => {
    rl.question(
      `${lineMsgs.welcomeMsg}
${lineMsgs.generalOptions}`,
      async (answer) => {
        if (answer === '1') {
          await firstOption();
        } else if (answer === '2') {
          await secondOption();
        } else if (answer === '3') {
          await thirdOption();
        } else if (answer === '4') {
          await fourthOption();
        } else if (answer === '5') {
          await fifthOption();
        } else if (answer === '6') {
          await sixthOption();
        } else {
          console.log(lineMsgs.invalidInput);
          await start();
        }
      },
    );
  };

  start();
};

export default cli;
