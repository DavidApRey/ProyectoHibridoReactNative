import { Alert, Image, SafeAreaView, ScrollView, StatusBar, View } from "react-native"
import { globalStyles } from "../../../theme/globalStyle"
import { RootStackParams } from "../../navigator/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useProduct } from "../../components/hook/useProduct";
import { SelectInput } from "../../components/SelectInput";
import { ActivityIndicator, Button, Card, Divider, MD2Colors, PaperProvider, Text } from 'react-native-paper';
import { IonIcon } from '../../components/shared/IonIcon';
import { ModalWinAspecto } from "../../components/ModalWinAspecto";
import { useEffect, useState } from "react";
import ModalWinCpu from "../../components/ModalWinCpu";
import ModalWinAlma from "../../components/ModalWinAlma";
import ModalWinRam from "../../components/ModalWinRam";
import ModalWinSo from "../../components/ModalWinSo";
import { fetch_shoppingcar_send } from "../../../api/peticiones";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'Producto'> { };

export const ProductScreen = ({ route }: Props) => {

    const [visible_aspecto, setVisible_aspecto] = useState(false);
    const showModal_aspecto = () => setVisible_aspecto(true);
    const hideModal_aspecto = () => setVisible_aspecto(false);

    const [visible_cpu, setVisible_cpu] = useState(false);
    const showModal_cpu = () => setVisible_cpu(true);
    const hideModal_cpu = () => setVisible_cpu(false);

    const [visible_ram, setVisible_ram] = useState(false);
    const showModal_ram = () => setVisible_ram(true);
    const hideModal_ram = () => setVisible_ram(false);

    const [visible_almacen, setVisible_almacen] = useState(false);
    const showModal_almacen = () => setVisible_almacen(true);
    const hideModal_almacen = () => setVisible_almacen(false);

    const [visible_so, setVisible_so] = useState(false);
    const showModal_so = () => setVisible_so(true);
    const hideModal_so = () => setVisible_so(false);

    const [cantidad, setCantidad] = useState(0);

    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
    };

    const { id } = route.params;
    const { token } = useAuthStore();
    // const token = 'f408bc747a94c78766f74eb574454a9c';
    const { isLoading, productoData } = useProduct(id);

    const add_producto = async (token: string) => {

        const lista = {
            id_product: productoData[0].id_articulo,
            cantidad: cantidad,
        };
        
        let resp = await fetch_shoppingcar_send(lista, token);
        console.log(resp);
        resp = parseInt(resp);
        if (resp == 200) {
            Alert.alert("Articulo añadido a la lista");
        } else {
            Alert.alert("Error al añadir el articulo a la lista");
        }
    }

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <ActivityIndicator animating={true} size="large" color={MD2Colors.purple400} />
            </View>
        );
    } else {
        return (
            <PaperProvider>
                <SafeAreaView style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight,
                }}>
                    <ScrollView>
                        <View style={globalStyles.container}>
                            <Card>
                                <Card.Content>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'black',
                                        fontWeight: "800",
                                    }}>
                                        {productoData[0].nombre_producto}
                                        
                                    </Text>
                                    <Text>{token}</Text>
                                    <Divider style={{ marginVertical: 20, paddingTop: 2 }} />
                                    <View style={{
                                        width: '100%',
                                        alignItems: 'center'
                                    }}>
                                        <Image
                                            source={{ uri: productoData[0].imagen }}
                                            style={{
                                                width: 300,
                                                height: 250,
                                                borderWidth: 2,
                                                borderRadius: 6,

                                            }}
                                        />
                                    </View>
                                    <Divider style={{ marginVertical: 20, paddingTop: 2 }} />
                                    <View>
                                        <Text style={{
                                            fontSize: 30,
                                            color: 'black',
                                            fontWeight: '500',
                                        }}>$ {parseInt(productoData[0].precio).toLocaleString()}</Text>
                                    </View>
                                    <Divider style={{ marginVertical: 20, paddingTop: 2 }} />
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            color: 'black',
                                            fontWeight: '500',
                                        }}>Stock disponible</Text>
                                        <SelectInput onPress={setCantidad} />
                                    </View>
                                    <Divider style={{ marginVertical: 20, paddingTop: 2 }} />
                                    <View>
                                        <Button
                                            icon={() => (<IonIcon name='cart' color="white"></IonIcon>)}
                                            mode="contained"
                                            onPress={() => add_producto(token)}
                                        >
                                            Añadir al carrito
                                        </Button>
                                    </View>

                                </Card.Content>
                            </Card>
                            <Card style={{ marginVertical: 20 }}>
                                <Card.Content>
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            color: 'black',
                                            fontWeight: '500',
                                            textAlign: 'center',
                                        }}>
                                            Caracteristicas Tecnicas
                                        </Text>

                                        <Button
                                            mode="contained"
                                            icon={() => (<IonIcon name='desktop-outline' color="white"></IonIcon>)}
                                            style={{ marginTop: 10 }}
                                            onPress={showModal_aspecto}
                                        >
                                            Aspecto
                                        </Button>

                                        <ModalWinAspecto
                                            stylesGeneral={containerStyle}
                                            hideModal={hideModal_aspecto}
                                            visible={visible_aspecto}
                                            datosLista={
                                                [
                                                    {
                                                        'color': productoData[0].color,
                                                        'modelo': productoData[0].modelo,
                                                        'tamaño_pantalla': productoData[0].tamano_pantalla,
                                                        'resolucion_pantalla': productoData[0].resolucion_pantalla,
                                                        'garantia': productoData[0].garantia,
                                                    }
                                                ]
                                            }
                                        />

                                        <Button
                                            mode="contained"
                                            icon={() => (<IonIcon name='hardware-chip-outline' color="white"></IonIcon>)}
                                            style={{ marginTop: 10 }}
                                            onPress={showModal_cpu}
                                        >
                                            Procesador
                                        </Button>

                                        <ModalWinCpu
                                            stylesGeneral={containerStyle}
                                            hideModal={hideModal_cpu}
                                            visible={visible_cpu}
                                            datosLista={productoData[0].codigo_procesador}
                                        />

                                        <Button
                                            mode="contained"
                                            icon={() => (<IonIcon name='library-outline' color="white"></IonIcon>)}
                                            style={{ marginTop: 10 }}
                                            onPress={showModal_ram}
                                        >
                                            Memoria Ram
                                        </Button>

                                        <ModalWinRam
                                            stylesGeneral={containerStyle}
                                            hideModal={hideModal_ram}
                                            visible={visible_ram}
                                            datosLista={productoData[0].codigo_memoria_ram}
                                        />

                                        <Button
                                            mode="contained"
                                            icon={() => (<IonIcon name='cloud' color="white"></IonIcon>)}
                                            style={{ marginTop: 10 }}
                                            onPress={showModal_almacen}
                                        >
                                            Almacenamiento
                                        </Button>

                                        <ModalWinAlma
                                            stylesGeneral={containerStyle}
                                            hideModal={hideModal_almacen}
                                            visible={visible_almacen}
                                            datosLista={productoData[0].codigo_almacenamiento}
                                        />

                                        <Button
                                            mode="contained"
                                            icon={() => (<IonIcon name='logo-microsoft' color="white"></IonIcon>)}
                                            style={{ marginTop: 10 }}
                                            onPress={showModal_so}
                                        >
                                            Sistema Operativo
                                        </Button>

                                        <ModalWinSo
                                            stylesGeneral={containerStyle}
                                            hideModal={hideModal_so}
                                            visible={visible_so}
                                            datosLista={productoData[0].codigo_sistema_operativo}
                                        />
                                    </View>

                                </Card.Content>
                            </Card>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
        )
    }
}
