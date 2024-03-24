import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper'
import { RootStackParams } from '../../navigator/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const { login } = useAuthStore();
    const [isPosting, setIsPosting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        clave: ''
    });

    const onLogin = async () => {
        if (form.email.length == 0 || form.clave.length == 0) {
            return;
        }

        setIsPosting(true);
        const wasSuccessfull = await login(form.email, form.clave);
        setIsPosting(false);
        if (wasSuccessfull) return;

        Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Card>
                <Card.Content>
                    <View style={{
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 40,
                            color: 'black',
                            fontWeight: "800",
                            paddingBottom: 20
                        }}>Ingresar</Text>
                        <TextInput
                            label="Email"
                            value={form.email}
                            keyboardType='email-address'
                            onChangeText={(email) => setForm({ ...form, email })}
                        />
                    </View>
                    <View style={{
                        padding: 10
                    }}>
                        <TextInput
                            label="Constraseña"
                            secureTextEntry
                            value={form.clave}
                            onChangeText={(clave) => setForm({ ...form, clave })}
                        />
                    </View>

                    <View>
                        <Button disabled={isPosting} mode="contained" onPress={onLogin}>
                            Ingresar
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}
