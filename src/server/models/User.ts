import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { IUser } from '../interfaces/IUser';
import City from './City';
import { ETables } from '../enums/ETables';

import { Authentication } from '../shared/services/Authentication';

type UserCreationAttributes = Optional<IUser, 'id'>

class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public cityId!: number;
    public password!: string;

    public readonly city?: City;

    public static associations: {
        city: Association<User, City>;
    };

    static initModel(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                fullName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cityId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: ETables.users,
                timestamps: true, 
                underscored: true,
                hooks: {
                    beforeCreate: async (user) => {
                        if (user.password) {
                            user.password = await Authentication.hashPassword(user.password);
                        }
                    },
                    beforeUpdate: async (user) => {
                        if (user.changed('password')) {
                            user.password = await Authentication.hashPassword(user.password);
                        }
                    }
                }
            }
        )
    }
}

export default User;