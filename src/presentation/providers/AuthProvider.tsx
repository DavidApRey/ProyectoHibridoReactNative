import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { PropsWithChildren, useEffect } from 'react'
import { RootStackParams } from '../navigator/StackNavigator'
import { useAuthStore } from '../store/auth/useAuthStore'

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, [])

    useEffect(() => {
        if (status != 'checking') {
            if (status == 'authenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Lista Productos' }],
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            }
        }
    }, [status])

    return (
        <>{children}</>
    )
}
