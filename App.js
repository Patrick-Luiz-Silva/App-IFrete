import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EscolhaPerfilScreen from "./screens/EscolhaPerfil";
import CadastroScreen from './screens/Cadastro';
import LoginUsuarioScreen from './screens/LoginUsuario';
import PrincipalUsuarioScreen from './screens/PrincipalUsuario';
import EditarPerfilScreen from './screens/EditarPerfil';
import LoginMotoristaScreen from './screens/LoginMotorista';
import CadastroVeiculoScreen from './screens/CadastroVeiculo';
import NotificacaoScreen from './screens/Notificacao'; // Importar a tela de Notificação
import PrincipalMotorista from './screens/PrncipalMotorista';
import EditarVeiculo from './screens/EditarVeiculo';
import EditarVeiculoDetalhes from './screens/EditarVeiculoDetalhes';
import PostagensMotora from './screens/PostagensMotora';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de Abas Inferiores (Menu Inferior)
function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="PainelPrincipal" 
        component={PrincipalUsuarioScreen} 
        options={{ title: 'Painel Principal' }}
      />
      <Tab.Screen 
        name="EditarPerfil" 
        component={EditarPerfilScreen} 
        options={{ title: 'Editar Perfil' }} 
      />
      <Tab.Screen 
        name="Notificacao" 
        component={NotificacaoScreen} 
        options={{ title: 'Notificação' }}
      />
    </Tab.Navigator>
  );
}

// Navegador de Pilha Principal
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
          name="EditarPerfil" 
          component={EditarPerfilScreen} 
          options={{ title: 'Editar Cadastro' }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Cadastro' }} 
        />
        <Stack.Screen 
          name="LoginUsuario" 
          component={LoginUsuarioScreen} 
          options={{ title: 'Login Usuário' }} 
        />
        <Stack.Screen 
          name="PrincipalUsuario" 
          component={BottomTabNavigator} 
          options={{ title: 'Painel Principal', headerShown: false }} 
        />
        <Stack.Screen 
          name="PrincipalMotorista" 
          component={PrincipalMotorista} 
          options={{ title: 'Painel Principal', headerShown: false }} 
        />
        <Stack.Screen 
          name="CadastroVeiculo" 
          component={CadastroVeiculoScreen} 
          options={{ title: 'Painel Principal', headerShown: false }} 
        />
        <Stack.Screen 
          name="EditarVeiculo" 
          component={EditarVeiculo} 
          options={{ title: 'Painel Principal', headerShown: false }} 
        />
        <Stack.Screen 
          name="EditarVeiculoDetalhes" 
          component={EditarVeiculoDetalhes} 
          options={{ title: 'Painel Principal', headerShown: false }} 
        />
        <Stack.Screen 
          name="LoginMotorista" 
          component={LoginMotoristaScreen} 
          options={{ title: 'Login Motorista' }} 
        />
        <Stack.Screen 
          name="PostagensMotora" 
          component={PostagensMotora} 
          options={{ title: 'Postagens' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
