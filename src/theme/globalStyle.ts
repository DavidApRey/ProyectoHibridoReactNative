import { StyleSheet } from "react-native";


export const globalColor = {
    primary: '#4861e1',
    secondary: '#5a6486',
    tertiary: '#3a0ca3',
    success: '#34c845',
    warning: '#fca311',
    danger: '#e71d36',
    dark: '#22223b',

    background: '#fff'
};


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColor.background,
    },

    primaryButton: {
        backgroundColor: globalColor.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: globalColor.background,
        fontSize: 18,
    },
    title: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    TextEnvioGratis: {
        color: globalColor.success,
        fontSize: 15,
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
        // shadowOffset: ''
    }

});

