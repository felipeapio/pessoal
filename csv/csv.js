import fs from 'fs';
import csv from 'csv-parser';

/**
 * Função para processar o arquivo CSV e retornar os dados como um array de objetos.
 * @param {string} filePath - Caminho do arquivo CSV.
 * @returns {Promise<Array<Object>>} - Promise que resolve com os dados processados.
 */
export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(filePath, { encoding: 'utf8' }) // Define a codificação como UTF-8
      .pipe(
        csv({
          separator: ',', // Certifique-se de que o delimitador está correto
          mapHeaders: ({ header }) => {
            // Remove o BOM e aspas do cabeçalho
            return header.replace(/^\uFEFF/, '').replace(/"/g, '').trim();
          },
        })
      )
      .on('data', (row) => {
        // Extrai o cabeçalho e os valores
        const keys = Object.keys(row)[0].split(','); // Divide o cabeçalho em colunas
        const values = row[Object.keys(row)[0]].split(','); // Divide os valores em colunas
        // Transforma em um objeto chave-valor
        const processedRow = {};
        keys.forEach((key, index) => {
          processedRow[key.trim()] = values[index] ? values[index].trim() : null;
        });

        data.push(processedRow); // Adiciona o objeto processado ao array
      })
      .on('end', () => {
        resolve(data); // Retorna os dados processados
      })
      .on('error', (err) => {
        reject(err); // Retorna o erro, caso ocorra
      });
  });
}
