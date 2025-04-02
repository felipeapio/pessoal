import { Sequelize } from 'sequelize';

/**
 * Função para criar uma conexão com o banco de dados MySQL usando Sequelize.
 * @returns {Sequelize} - Instância do Sequelize conectada ao banco de dados.
 */
export function connectToDatabase() {
  const sequelize = new Sequelize('sys', 'root', 'avanti500', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
      console.error('Erro ao conectar ao banco de dados:', err);
    });

  return sequelize;
}

export default { connectToDatabase };
connectToDatabase()