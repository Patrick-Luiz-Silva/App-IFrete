import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EscolhaPerfilScreen from "./screens/EscolhaPerfil.js";
import CadastroScreen from './screens/Cadastro';
import LoginScreen from './screens/Login';
import PrincipalUsuarioScreen from './screens/PrincipalUsuario';
import EditarPerfilScreen from './screens/EditarPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EscolhaPerfil">
        <Stack.Screen 
          name="EscolhaPerfil" 
          component={EscolhaPerfilScreen} 
          options={{ title: 'Escolha seu Perfil' }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Cadastro' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="PrincipalUsuario" 
          component={PrincipalUsuarioScreen} 
          options={{ title: 'Postar Frete' }} 
        />
        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfilScreen} 
          options={{ title: 'Editar Perfil' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
