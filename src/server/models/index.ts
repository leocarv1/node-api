import connect from '../database'; 
import Apartment from './Apartment';
import City from './City';
import Client from './Client';
import User from './User';

// Inicializa todos os modelos com a conexão
City.initModel(connect);
User.initModel(connect);
Apartment.initModel(connect);
Client.initModel(connect);

// Define as associações entre os modelos
City.hasMany(User, { foreignKey: 'cityId', as: 'users' });
User.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

// Exporta os modelos para uso no resto da aplicação
export { City, User, Apartment, Client };
