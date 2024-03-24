import { Image, ScrollView, Text, View, FlatList } from 'react-native';
import { ActivityIndicator, Button, Card, Dialog, MD2Colors, Modal, PaperProvider, Portal } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { IonIcon } from "../../components/shared/IonIcon"
import { useShopping } from "../../components/hook/useShopping"

export const ShoppingCartScreen = () => {

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const { isLoading, listaProductos, total, comprar } = useShopping();

    const [visibleDialog, setVisibleDialog] = useState(false);
    const hideDialog = () => setVisibleDialog(false);

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
                <Portal>
                    <SafeAreaView style={{
                        flex: 1,
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <FlatList
                                data={listaProductos}
                                renderItem={({ item }) => (
                                    <Card style={{
                                        marginHorizontal: 10,
                                        marginVertical: 3
                                    }} key={item.id_articulo}>
                                        <Card.Content>
                                            <View style={{
                                                flexDirection: "row",
                                                padding: 2,
                                                borderRadius: 6,
                                                height: 'auto'
                                            }}>
                                                <View style={{
                                                    width: 'auto',
                                                }}>
                                                    <Image
                                                        source={{ uri: item.imagen }}
                                                        style={{
                                                            width: 140,
                                                            height: 140,
                                                            borderWidth: 2,
                                                            borderRadius: 6
                                                        }}
                                                    />
                                                </View>
                                                <View style={{
                                                    width: '65%',
                                                    height: 150,
                                                    padding: 10
                                                }}>
                                                    <Text numberOfLines={3} style={{
                                                        fontWeight: '600',
                                                        fontSize: 10,
                                                        color: 'black'
                                                    }}>{item.nombre_producto}</Text>
                                                    <Text numberOfLines={3} style={{
                                                        fontWeight: '600',
                                                        fontSize: 15,
                                                        color: 'black'
                                                    }}>Cantidad: {item.cantidad}</Text>
                                                    <Text numberOfLines={3} style={{
                                                        fontWeight: '600',
                                                        fontSize: 15,
                                                        color: 'black'
                                                    }}>Precio Articulo: {parseInt(item.precio).toLocaleString()}</Text>
                                                    <Text numberOfLines={3} style={{
                                                        fontWeight: '600',
                                                        fontSize: 15,
                                                        color: 'black'
                                                    }}>Total: {(item.cantidad * item.precio).toLocaleString()}</Text>
                                                </View>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                )}
                                keyExtractor={item => item.id}
                            />

                            <View style={{
                                position: 'absolute',
                                bottom: 1,
                                right: 1,
                            }}>
                                <View style={{
                                    marginHorizontal: 10,
                                    marginVertical: 3,
                                }}>
                                    <Button mode="contained" style={{
                                        padding: 0,
                                        margin: 0,
                                    }} onPress={showModal}>
                                        <IonIcon name='cart' color="white"></IonIcon>
                                    </Button>
                                </View>
                            </View>

                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <Text numberOfLines={3} style={{
                                    fontWeight: '600',
                                    fontSize: 15,
                                    color: 'black',
                                    margin: 2,
                                    padding: 4
                                }}>Total: {total.toLocaleString()}</Text>

                                <Button mode="contained" style={{
                                    padding: 0,
                                    marginTop: 10,
                                }} onPress={() => setVisibleDialog(true)}>
                                    Comprar
                                </Button>
                            </Modal>

                            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                                <Dialog.Actions>
                                    <Text numberOfLines={3} style={{
                                        fontWeight: '600',
                                        fontSize: 15,
                                        color: 'black',
                                        margin: 2,
                                        padding: 4
                                    }}>¿Desea finalizar la compra?</Text>
                                    <Button onPress={() => setVisibleDialog(false)}>No</Button>
                                    <Button onPress={() => {comprar()}}>Si</Button>
                                </Dialog.Actions>
                            </Dialog>

                        </View>
                    </SafeAreaView>
                </Portal>
            </PaperProvider>
        )
    }
}
