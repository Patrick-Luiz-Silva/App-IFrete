import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro({ route, navigation }) {
  const { perfil } = route.params || {};
  const [placa, setPlaca] = useState('');
  const [marcaModelo, setMarcaModelo] = useState('');
  const [tipoCarroceria, setTipoCarroceria] = useState('');
  const [capacidade, setCapacidade] = useState('');

  const handleCadastrarVeiculo = async () => {

    const token = await AsyncStorage.getItem('token'); // Recupera o token JWT do AsyncStorage

    try {
      const response = await fetch('http://localhost:3000/api/cadastro-veiculo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          placa,
          marcaModelo,
          tipoCarroceria,
          capacidade
        }),
      });
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Cadastro de Veículo {perfil}</Text>
      <TextInput placeholder="Placa" style={styles.input} value={placa} onChangeText={setPlaca} />
      <TextInput placeholder="Marca-Modelo" style={styles.input} value={marcaModelo} onChangeText={setMarcaModelo} />
      <TextInput placeholder="Tipo carroceria" style={styles.input} value={tipoCarroceria} onChangeText={setTipoCarroceria} />
      <TextInput placeholder="Capacidade de carga" style={styles.input} value={capacidade} onChangeText={setCapacidade} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Cadastrar" onPress={handleCadastrarVeiculo} />
          <View style={{ height: 10 }} />
            <Button title="Voltar" onPress={() => navigation.goBack()} />
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