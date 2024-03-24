import { StorageAdapter } from "../../api/adapters/storage-adapter";
import { fetch_checkstate_token, fetch_valid_user } from "../../api/peticiones";

export const authLogin = async (email: string, password: string) => {
    try {
        const data = await fetch_valid_user(email, password);
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const token = await StorageAdapter.getItem('token');
        const data = await fetch_checkstate_token(token);
        return data;
    } catch (error) {
        console.log({error})
        return null;
    }
}