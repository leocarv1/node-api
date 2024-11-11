import connect from '../database'; 
import Apartment from './Apartment';
import City from './City';
import Client from './Client';
import Reservation from './Reservation';
import User from './User';

// Inicializa todos os modelos com a conexão
City.initModel(connect);
User.initModel(connect);
Apartment.initModel(connect);
Client.initModel(connect);
Reservation.initModel(connect);

// Define as associações entre os modelos
City.hasMany(User, { foreignKey: 'city_id', as: 'users' });
User.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

Reservation.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Reservation.hasMany(Apartment, { foreignKey: 'apartment_id', as: 'apartment' });

Client.hasMany(Reservation, { foreignKey: 'client_id', as: 'reservations' });

// Exporta os modelos para uso no resto da aplicação
export { City, User, Apartment, Client, Reservation };
