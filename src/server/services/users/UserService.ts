import { Op } from "sequelize";
import { User } from "../../models";

export class UserService 
{
    public static async getByEmail(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({
                where: {
                    email: {
                        [Op.eq]: email
                    }
                }
            });

            return user;
        } catch (err) {
            console.log(err);

            throw new Error("User not found!")
        }
    }
}