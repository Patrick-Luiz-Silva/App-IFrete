import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Login({ route, navigation }) {
  // Adicione um valor padrão para perfil
  const { perfil = 'Usuario' } = route.params || {};
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    navigation.navigate('EscolhaPerfil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login - {perfil}</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={handleLogin} />
        </View> 
        <View style={styles.buttonWrapper}>
          <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro', { cadastro: 'Cadastro' })} />
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
    marginHorizontal: 5, // Espaçamento entre os botões
    color: "#4CAF50",
  },
});

