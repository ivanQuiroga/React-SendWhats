import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Captura from '../screens/Captura';

const Stack = createStackNavigator();

function MainStackNavigator() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SendWhats" /* Primer Route */>  
                <Stack.Screen /* Asociación Ruta-Componente */
                    name='Home'
                    component={Home}
                    options={{
                        title: 'Mensaje WhatsApp',
                        headerStyle: {
                            backgroundColor: '#075E54',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen /* Asociación Ruta-Componente */
                    name='Mensaje WhatsApp'
                    component={Captura}
                    options={{
                        title: 'Mensaje WhatsApp',
                        headerStyle: {
                            backgroundColor: '#075E54',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator;