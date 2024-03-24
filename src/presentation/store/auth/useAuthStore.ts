import { create } from "zustand";
import { AuthStatus, Usuario } from "../../../interfaces/products.interface";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../api/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    user?: Usuario;
    token?: string;

    login: (email: string, clave: string) => Promise<Boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    user: undefined,
    token: undefined,
    login: async (email: string, clave: string) => {

        const resp = await authLogin(email, clave);
        if (resp.length == 0) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', resp[0].token);

        set({ status: 'authenticated', user: resp.user, token: resp[0].token });

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (resp == null) {
            if (resp.length == 0) {
                set({ status: 'unauthenticated', user: undefined });
                return;
            }

            await StorageAdapter.setItem('token', resp[0].token);
            set({ status: 'authenticated', user: resp.user });
        } else {
            set({ status: 'unauthenticated', user: undefined });
            return;
        }
    },

    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', user: undefined, token: undefined });
    }

}))