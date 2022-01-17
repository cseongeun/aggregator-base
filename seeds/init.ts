import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

function removeId(str) {
  if (str !== 'chain_id') {
    return str.replace('_id', '');
  } else {
    return str;
  }
}

// function toRefine(originalData: any) {
//   return originalData.map((d) => {
//     const data = {};
//     Object.keys(d).forEach((k) => {
//       const key = _.camelCase(removeId(k));
//       let value = d[k];
//       const toChangeBooleanKey = [
//         'status',
//         'verify',
//         'swapBase',
//         'useDex',
//         'useFarm',
//         'useNFT',
//         'useLending',
//       ];

//       if (key.includes(toChangeBooleanKey)) {
//         if (value === 1) {
//           value = true;
//         } else {
//           value = false;
//         }
//       }

//       data[key] = value;
//     });
//     return data;
//   });
// }

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // const networkData = toRefine(require('./data/network.json'));
    // const tokenPriceData = toRefine(require('./data/tokenPrice.json'));
    // const tokenData = toRefine(require('./data/token.json'));
    // const protocolData = toRefine(require('./data/protocol.json'));
    // const contractData = toRefine(require('./data/contract.json'));
    // const taskData = toRefine(require('./data/task.json'));
    // await connection.getRepository('network').save(networkData);
    // await connection.getRepository('token').save(tokenData);
    // await connection.getRepository('protocol').save(protocolData);
    // await connection.getRepository('contract').save(contractData);
    // await connection.getRepository('task').save(taskData);
    // await connection.getRepository('token_price').save(tokenPriceData);
  }
}
