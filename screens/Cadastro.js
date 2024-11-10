import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function Cadastro({ route, navigation }) {
  const { perfil } = route.params || {};
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleCadastrar = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          telefone,
          endereco,
          perfil,
        }),
      });
      if (response.ok) {
        Alert.alert("Cadastro realizado com sucesso!");
        if (perfil === 'Usuario') {
          navigation.navigate('LoginUsuario');
        }
        if (perfil === 'Motorista') {
          navigation.navigate('LoginMotorista');
        }
      } else {
        Alert.alert("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      Alert.alert("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Cadastro {perfil}</Text>
      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Endereço" style={styles.input} value={endereco} onChangeText={setEndereco} />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Cadastrar" onPress={handleCadastrar} />
        </View> 
        <View style={styles.buttonWrapper}>
          <Button title="Inicio" onPress={() => navigation.navigate('EscolhaPerfil')} />
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