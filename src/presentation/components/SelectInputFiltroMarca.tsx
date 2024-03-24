import { useEffect, useState } from 'react'
import { fetch_lista_marca } from '../../api/peticiones';
import { ListaMarcas } from '../../interfaces/products.interface';
import Dropdown from 'react-native-input-select';
import { View } from 'react-native';

interface Props {
    setDatoSelect: any;
    datoSelect: string;
}

export const SelectInputFiltroMarca = ({setDatoSelect, datoSelect}: Props) => {

    useEffect(() => {
        loadMarcas()
    }, []);

    const [listaMarcas, setListaMarcas] = useState<ListaMarcas[]>([])

    const loadMarcas = async () => {
        const listaMarcasPromise = await fetch_lista_marca();
        const listaMarcas = await Promise.all(listaMarcasPromise);
        setListaMarcas(listaMarcas);
    }

    const dataDropDown: any = [];

    listaMarcas.map((item) => {
        let data = {
            'label': item.marca,
            'value': item.id_cons
        };

        dataDropDown.push(data)
    });

    return (
        <View >
            <Dropdown
                placeholder="Filtro de Marca"
                options={dataDropDown}
                selectedValue={datoSelect}
                onValueChange={(value: any) => setDatoSelect(value)}
                primaryColor={'green'}
            />
        </View>
    )
}
