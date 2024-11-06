import { DataTypes, Model, Optional } from 'sequelize';
import connect from '../database';

interface CityAttributes {
    id: number;
    name: string;
}

export interface ICity {
    name: string,
    state: string
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>

class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
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
