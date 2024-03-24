import React, { useEffect, useState } from 'react'
import { ProductoComputo } from '../../../interfaces/products.interface';
import { fetch_producto_by_id } from '../../../api/peticiones';

export const useProduct = (id: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [productoData, setProductoData] = useState<ProductoComputo[]>([]);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {

        setIsLoading(true);

        const dataPromise = await fetch_producto_by_id(id);
        const dataProduct = await Promise.all(dataPromise);
        setProductoData(dataProduct);

        setIsLoading(false);
    }

    return {
        isLoading,
        productoData
    }

}
