import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { IUser } from '../interfaces/IUser';
import City from './City';
import { ETables } from '../enums/ETables';

import * as bycrypt from 'bcryptjs';

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

    static async encrypt(value: string): Promise<string> {
        const hash = await bycrypt.hash(value, 12);
        return hash;
    }

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
                            user.password = await User.encrypt(user.password);
                        }
                    },
                    beforeUpdate: async (user) => {
                        if (user.changed('password')) {
                            user.password = await User.encrypt(user.password);
                        }
                    }
                }
            }
        )
    }
}

export default User;