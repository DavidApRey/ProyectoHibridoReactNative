import { Image, Pressable, Text, View } from "react-native"
import { globalStyles } from "../../theme/globalStyle"
import { Card } from "react-native-paper";

interface Props {
    onPress: () => void;
    img: string;
    nombre: string;
    precio: string;
}

export const ProductList = ({ onPress, img, nombre, precio }: Props) => {

    return (
        <Pressable onPress={() => onPress()}>
            <Card style={{
                margin: 10
            }}>
                <Card.Content>
                    <View style={{
                        flexDirection: "row",
                        padding: 2,
                        borderRadius: 6,
                        height: 'auto'
                    }}>
                        <View style={{
                            width: 'auto',
                            height: 150,
                        }}>
                            <Image
                                source={{ uri: img }}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderWidth: 2,
                                    borderRadius: 6
                                }}
                            />
                        </View>
                        <View style={{
                            width: '53%',
                            height: 150,
                            padding: 10
                        }}>
                            <Text numberOfLines={3} style={globalStyles.title}>{nombre}</Text>
                            <Text style={{
                                fontSize: 20,
                                color: 'black',
                                fontWeight: '500'
                            }}>$ {parseInt(precio).toLocaleString()}</Text>
                            <Text style={globalStyles.TextEnvioGratis}>Envio Gratis</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Pressable >
    )
}