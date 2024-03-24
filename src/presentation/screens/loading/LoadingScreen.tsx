import React from 'react'
import { Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

export const LoadingScreen = () => {
    return (
        <ActivityIndicator style={{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
        }} animating={true} size={'large'} color={MD2Colors.red800} />
    )
}
