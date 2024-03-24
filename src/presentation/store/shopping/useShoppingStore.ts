import { create } from "zustand";
import { StorageAdapter } from "../../../api/adapters/storage-adapter";
import { fetch_shoppingcar_send } from "../../../api/peticiones";

interface ListaProductos {
    id_product: string;
    cantidad: number;
    imagen: string;
}

export interface ShoppingCar {

    id_product: string;
    cantidad: number;
    imagen: string;

    addProduct: (id_product: string, cantidad: number, imagen: string) => Promise<[]>;
    outProduct: () => Promise<void>;
    clean: () => Promise<void>;
}

// export const useShoppingStore = create<ShoppingCar>()((set, get) => ({
//     addProduct: async (id_product: string, cantidad: number, imagen: string, token: string) => {

//         const datos = {id_product, cantidad, imagen};
//         set(datos);
//         await fetch_shoppingcar_send(datos, token);
//         // await StorageAdapter.setItem('listaProductos', resp);

//     },
// }))