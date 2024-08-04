import config from "@/configs/config";
import {Account, ID, Client} from "appwrite";

interface CreateUserAccount {
    name: string;
    email: string;
    password: string;
}

interface LoginUserAccount {
    email: string;
    password: string;
}


const appwriteClient = new Client();

appwriteClient.setEndpoint(config.APP_WRITE_URL).setProject(config.APP_WRITE_PROJECT_ID);

export const account = new Account(appwriteClient);

export class AppwriteService {
    // create a new record of USer inside appwrite

    async createUserAccount({name, email, password}: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    async login({email, password}: LoginUserAccount) {
        try {
            return await account.createEmailPasswordSession(email, password)
        } catch (error: any) {
            console.log(error)
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error: any) {
            console.log(error)
            return false;
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error: any) {
            console.log("Get current User error: ", error)
        }
    }

    async logout() {
        try {
            return await account.deleteSession("current");
        } catch (error: any) {
            console.log("logout error: ", error)
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;

