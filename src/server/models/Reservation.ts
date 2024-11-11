import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connect from '../database';

import { IReservation } from '../interfaces/IReservation';
import { User } from '.';
import { ETables } from '../enums/ETables';

type ReservationCreationAttributes = Optional<IReservation, 'id'>

class Reservation extends Model<IReservation, ReservationCreationAttributes> implements IReservation {
    public id!: number;
    public apartment_id!: number;
    public client_id!: number;
    public days!: number;

    static initModel(sequelize: Sequelize) {
        Reservation.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                apartment_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                client_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                days: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: ETables.reservations,
                timestamps: true, 
                underscored: true, 
            }
        )
    }
}

export default Reservation;
