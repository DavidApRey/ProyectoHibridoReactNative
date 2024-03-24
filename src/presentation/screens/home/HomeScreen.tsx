import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StatusBar, View } from 'react-native';
import { ProductList } from '../../components/ProductList';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from '../../navigator/StackNavigator';
import { fetch_lista_productos } from '../../../api/peticiones';
import { ProductoComputo } from '../../../interfaces/products.interface';
import { SelectInputFiltroMarca } from '../../components/SelectInputFiltroMarca';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [ListProduct, setListProduct] = useState<ProductoComputo[]>();
    const [datoSelect, setDatoSelect] = useState('');

    useEffect(() => {
        initialLoad();
    }, [datoSelect]);

    const initialLoad = async () => {

        if (datoSelect == '') {
            const data_listPromise = await fetch_lista_productos();
            const data_listProduct = await Promise.all(data_listPromise);
            setListProduct(data_listProduct);
        } else {
            const data_listPromise = await fetch_lista_productos();
            const dataFilter = data_listPromise.filter((item: any) => item.codigo_marca[0].id_cons == datoSelect);
            const data_listProduct = await Promise.all(dataFilter);
            setListProduct(data_listProduct);
        }
    }

    return (
        <>
            <SafeAreaView style={{
                flex: 1,
            }}>

                <View>
                    <SelectInputFiltroMarca setDatoSelect={setDatoSelect} datoSelect={datoSelect} />
                </View>

                <FlatList
                    data={ListProduct}
                    renderItem={({ item }) => (
                        <ProductList
                            onPress={() => navigation.navigate('Producto', { id: parseInt(item.id_cons) })}
                            img={item.imagen}
                            nombre={item.nombre_producto}
                            precio={item.precio}
                        />
                    )}
                />
            </SafeAreaView>
        </>
    )
}
