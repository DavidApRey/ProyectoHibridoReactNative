import { createStackNavigator } from '@react-navigation/stack';
import { ProductScreen } from '../screens/product/ProductScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { useAuthStore } from '../store/auth/useAuthStore';

export type RootStackParams = {
  "Lista Productos": undefined;
  Producto: { id: number };
  Login: undefined;
  Loading: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const { logout } = useAuthStore();

  return (
    <Stack.Navigator
      initialRouteName='Loading'
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button mode='elevated' onPress={logout}>
              Cerrar Sesion
            </Button>
          ),
        }}
        name="Lista Productos" component={BottomTabNavigator} />
      <Stack.Screen name="Producto" component={ProductScreen} />
    </Stack.Navigator>
  );
}