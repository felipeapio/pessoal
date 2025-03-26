import { parseCSV } from '../csv/csv.js';
import People from '../models/people.js';
import { createInterface } from 'readline';
import { Sequelize } from 'sequelize'; // Importe Sequelize para usar os operadores

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

export async function importCSVtoDB(filePath) {
  const data = await parseCSV(filePath);
  for (const row of data) {
    await People.create({
      Index: row.Index,
      User_Id: row['User Id'],
      First_Name: row['First Name'],
      Last_Name: row['Last Name'],
      Sex: row.Sex,
      Email: row.Email,
      Phone: row.Phone,
      Date_of_birth: row['Date of birth'],
      Job_Title: row['Job Title'],
    });
  }
  console.log('Dados importados com sucesso!');
}

export async function listPeople() {
  const people = await People.findAll({ limit: 10 }); // Limite para exemplo
  console.log('Dados importados:');
  console.log(JSON.stringify(people, null, 2));
}

export async function filterPeopleByName() {
  const name = await askQuestion('Digite parte do nome para filtrar: ');
  const people = await People.findAll({
    where: {
      First_Name: { [Sequelize.Op.like]: `%${name}%` }, // Use Sequelize.Op.like
    },
  });
  console.log('Resultados filtrados:');
  console.log(JSON.stringify(people, null, 2));
}