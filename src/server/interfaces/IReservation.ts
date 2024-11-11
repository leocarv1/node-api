export interface IReservation {
    id: number,
    apartment_id: number,
    client_id: number,
    days: number,
    active: boolean,
    date_initial: Date,
    date_final?: Date
}