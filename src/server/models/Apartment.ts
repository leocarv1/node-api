import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { IApartment } from '../interfaces/IApartment';
import { User } from '.';
import { ETables } from '../enums/ETables';

type ApartmentCreationAttributes = Optional<IApartment, 'id'>

class Apartment extends Model<IApartment, ApartmentCreationAttributes> implements IApartment {
    public id!: number;
    public number!: number;
    public floor!: number;

    static initModel(sequelize: Sequelize) {
        Apartment.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                number: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                floor: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: ETables.apartments,
                timestamps: true, 
                underscored: true, 
            }
        )
    }
}

export default Apartment;
