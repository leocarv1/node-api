import { ICity } from "../../interfaces/ICity";
import City from "../../models/City";

export interface ICityService {
    create(city: Omit<ICity, 'id'>): Promise<object | Error>;
}

export class CityService implements ICityService {
    public async create(city: Omit<ICity, "id">): Promise<object | Error> {
        try {
            console.log(city)
            const newCity = await City.create(city);
            return newCity;
        } catch (err) {
            console.log(err);
            return new Error("Could not create new city!");
        }
    }
}
