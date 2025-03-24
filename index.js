import { parseCSV } from "./csv/csv.js"; // Certifique-se de incluir a extensão .js

const data = await parseCSV('./people-100000.csv'); // Use await, pois parseCSV retorna uma Promise
console.log(data[0]);