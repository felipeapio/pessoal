import { parseCSV } from './csv/csv.js'; 
import { importCSVtoDB, listPeople, filterPeopleByName } from './services/peopleService.js';
import People from './models/people.js';

(async () => {
  try {
    // Mostra o primeiro registro do CSV
    const data = await parseCSV('./people-100000.csv');
    console.log('Primeiro registro do CSV:', data[0]);

    // Sincroniza o modelo People (cria a tabela)
    await People.sync({ force: true });
    console.log('Tabela "people" criada com sucesso.');

    // Importa os dados do CSV para o banco
    await importCSVtoDB('./people-100000.csv');
    console.log('Dados importados com sucesso.');

    // Lista os registros
    await listPeople();

    // Filtra por nome (entrada do teclado)
    await filterPeopleByName();
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    process.exit();
  }
})();