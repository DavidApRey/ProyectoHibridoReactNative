import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ShoppingCartScreen } from '../screens/shopping/ShoppingCart';
import { IonIcon } from '../components/shared/IonIcon';
import { StackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator  screenOptions={{
      tabBarStyle: {
        marginBottom: 2,
        paddingBottom: 4,
      },
      headerShown: false,
    }}>
      <Tab.Screen name="Lista" options={{title: 'Lista' , tabBarIcon: ({color}) => (<IonIcon name='home' color={color}></IonIcon>)}} component={HomeScreen} />
      <Tab.Screen name="Carrito" options={{title: 'Carrito' , tabBarIcon: ({color}) => (<IonIcon name='cart' color={color}></IonIcon>)}} component={ShoppingCartScreen} />
    </Tab.Navigator>
  );
}