import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { ICity } from '../interfaces/ICity';
import { User } from '.';
import { ETables } from '../enums/ETables';

type CityCreationAttributes = Optional<ICity, 'id'>

class City extends Model<ICity, CityCreationAttributes> implements ICity {
    public id!: number;
    public name!: string;
    public readonly users?: User[];

    public static associations: {
        users: Association<City, User>;
    };

    static initModel(sequelize: Sequelize) {
        City.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: ETables.cities,
                timestamps: true, 
                underscored: true, 
            }
        )
    }
}

export default City;
