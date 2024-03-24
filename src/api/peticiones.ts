export async function fetch_lista_productos() {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/listaProductosCRUD.php?datos_general=all`)
        .then(res => res.json());

    return data;
}

export async function fetch_producto_by_id(id: number) {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/listaProductosCRUD.php?datos_especi=all&id_producto=${id}`)
        .then(res => res.json());

    return data;
}

export async function fetch_lista_marca() {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/marcaCRUD.php?datos_general=all`)
        .then(res => res.json());

    return data;
}

export async function fetch_valid_user(email: string, clave: string) {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/validUsuarios_rn.php?datos_especi=all&email=${email}&clave=${clave}`)
        .then(res => res.json());

    return data;
}

export async function fetch_checkstate_token(token: string) {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/validUsuarios_rn.php?checkState=all&token=${token}`)
        .then(res => res.json());

    return data;
}

export async function fetch_shoppingcar_call(token: string) {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/shoppingcar.php?datos_general=all&token=${token}`)
        .then(res => res.json());

    return data;
}

export async function fetch_shoppingcar_call_filter(token: undefined) {
    const data = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/shoppingcar.php?datos_general_filter=all&token=${token}`)
        .then(res => res.json());

    return data;
}

export async function fetch_shoppingcar_send(listaProductos: any, token: string) {

    let ListShoppy = await fetch_shoppingcar_call_filter(token);
    let data = [];

    if (ListShoppy == '') {
        data.push(listaProductos);
    } else {
        ListShoppy = JSON.parse(ListShoppy);
        let aux_listaShoppy = ListShoppy.filter((item: any) => item.id_product == listaProductos.id_product);
        if (aux_listaShoppy.length != 0) {
            let aux_data = ListShoppy.filter((item: any) => item.id_product != listaProductos.id_product);
            data = aux_data;
            data.push(listaProductos);
        } else {
            data = ListShoppy;
            data.push(listaProductos);
        }
    }

    const putData = {
        add_list_shopping: 'all',
        token: token,
        listaProductos: data,
    }

    console.log(putData)

    const resp = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/shoppingcar.php`, {
        method: 'PUT',
        body: JSON.stringify(putData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/html'
        }
    })
        .then((response) => response.text())
        .then((responseData) => {
            return responseData;
        })
        .catch((error) => {
            console.error('error', error)
        });

    return resp;

}

export async function fetch_shoppingcar_arti_delete(listaProductos: any, token: string) {

    const ListShoppy = await fetch_shoppingcar_call(token);

    const data = []

    let aux_data = ListShoppy.filter((item: any) => item.id_product != listaProductos[0].id_product);
    data.push(aux_data);

    const putData = {
        add_list_shopping: 'all',
        token: token,
        listaProductos: data,
    }

    const resp = await fetch(`https://tiendatecnolo.softdevdsrp.com.co/shoppingcar.php`, {
        method: 'PUT',
        body: JSON.stringify(putData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/html'
        }
    })
        .then((response) => response.text())
        .then((responseData) => {
            return responseData;
        })
        .catch((error) => {
            console.error('error', error)
        });

    return resp;

}

export async function fetch_shoppingcar_clean(token: undefined) {

    fetch(`https://tiendatecnolo.softdevdsrp.com.co/shoppingcar.php`, {
        method: 'DELETE',
        body: JSON.stringify({ token, clean_list_shopping: 'all' }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/html'
        }
    })
        .then((response) => response.text())
        .then((responseData) => {
            return responseData;
        })
        .catch((error) => {
            console.error('error', error)
        });

}