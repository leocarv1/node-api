import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { IClient } from '../interfaces/IClient';
import City from './City';
import { ETables } from '../enums/ETables';
import Reservation from './Reservation';

type ClientCreationAttributes = Optional<IClient, 'id'>

class Client extends Model<IClient, ClientCreationAttributes> implements IClient {
    public id!: number;
    public full_name!: string;
    public email!: string;
    public phone!: string;
    public doc!: string;

    public readonly reservation?: Reservation;

    public static associations: {
        reservation: Association<Client, Reservation>;
    };

    static initModel(sequelize: Sequelize) {
        Client.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                full_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                doc: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: ETables.clients,
                timestamps: true, 
                underscored: true,
                hooks: {
                    beforeCreate: async (client) => {
                        if (client.doc) {
                            client.doc = client.doc.replace(/[-.]/g, "");
                        }
                    },
                    beforeUpdate: async (client) => {
                        if (client.changed('doc')) {
                            client.doc = client.doc.replace(/[-.]/g, "");
                        }
                    }
                }
            }
        )
    }
}

export default Client;