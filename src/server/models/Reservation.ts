import { Association, DataTypes, Model, Op, Optional, Sequelize } from 'sequelize';
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
    public active!: boolean;
    public date_initial!: Date
    public date_final!: Date

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
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                date_initial: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                date_final: {   
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: ETables.reservations,
                timestamps: true, 
                underscored: true, 
                hooks: {
                    beforeValidate: (reservation: Reservation) => {
                        reservation.date_final = reservation.calcFinalDate();
                    },
                    beforeUpdate: (reservation: Reservation) => {
                        reservation.date_final = reservation.calcFinalDate();
                    }
                }
            }
        )
    }

    public calcFinalDate() {
        const date = new Date(this.date_initial);
        date.setDate(date.getDate() + this.days);
        return date;
    }

    static async verifyReservation(apartment_id: number, date_initial: Date ): Promise<boolean> {
        try {
            const existingReservation = await Reservation.findOne({
                where: {
                    apartment_id,
                    active: true,
                    date_initial: {
                        [Op.lte]: date_initial,
                    },
                    date_final: {
                        [Op.gte]: date_initial,
                    }
                },
            });

            return existingReservation !== null;
        } catch (error) {
            console.error("Fail to verify reservation! ", error);
            throw error;
        }
    }
}

export default Reservation;
