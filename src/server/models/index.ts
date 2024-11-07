import connect from '../database'; // Importa a conexão com o banco de dados
import City from './City';
import User from './User';

// Inicializa todos os modelos com a conexão
City.initModel(connect);
User.initModel(connect);

// Define as associações entre os modelos
City.hasMany(User, { foreignKey: 'cityId', as: 'users' });
User.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

// Exporta os modelos para uso no resto da aplicação
export { City, User };
