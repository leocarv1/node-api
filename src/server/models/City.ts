import { DataTypes, Model, Optional } from 'sequelize';
import connect from '../database';

import { ICity } from '../interfaces/ICity';

type CityCreationAttributes = Optional<ICity, 'id'>

class City extends Model<ICity, CityCreationAttributes> implements ICity {
    public id!: number;
    public name!: string;
}

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
        sequelize: connect,
        tableName: 'cities',
        timestamps: true, 
        underscored: true, 
    }
);

export default City;
