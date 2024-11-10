import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ route, navigation }) {
  const { perfil = 'Motorista' } = route.params || {};
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Para exibir mensagens de erro

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        senha,
      });
  
      if (response.status === 200) {
        const { token } = response.data; // Recupera o token da resposta
        // Salva o token no AsyncStorage
        await AsyncStorage.setItem('token', token);
        console.log("Token salvo com sucesso:", token);
  
        // Login bem-sucedido, redirecionar para a tela PrincipalUsuario
        navigation.navigate('PrincipalMotorista');
      }
    } catch (error) {
      setErrorMessage('Email ou senha inválidos!');
      console.error('Erro no login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login - {perfil}</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} {/* Exibe a mensagem de erro */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro', { perfil: 'Motorista' })} />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    color: "#4CAF50",
  },
  error: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
  },
});
