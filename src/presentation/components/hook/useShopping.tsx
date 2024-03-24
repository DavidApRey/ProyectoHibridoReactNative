import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/auth/useAuthStore';
import { fetch_shoppingcar_call, fetch_shoppingcar_clean } from '../../../api/peticiones';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';
import { Alert } from 'react-native';

export const useShopping = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [listaProductos, setListaProductos] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { token } = useAuthStore();

    useEffect(() => {
        call_list_products();
    }, [token])

    const call_list_products = async () => {
        setIsLoading(true);

        const dataPromise = await fetch_shoppingcar_call(token);
        const dataProduct = await Promise.all(dataPromise);
        setListaProductos(dataProduct);
        calcularTotal(dataProduct);

        setIsLoading(false);
    }

    const comprar = async () => {
        const dataPromise = await fetch_shoppingcar_call(token);
        const dataProduct = await Promise.all(dataPromise);

        if(dataProduct.length != 0){
            fetch_shoppingcar_clean(token);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Lista Productos' }],
            })
        }else{
            Alert.alert(`La lista de articulos esta vacia`);
        }

    }

    const calcularTotal = (dataProduct: any[]) => {

        let suma = 0;

        dataProduct.map(item => {
            suma += item.total;
        });
        setTotal(suma);
    }

    return {
        isLoading,
        listaProductos,
        total,
        comprar
    }

}
