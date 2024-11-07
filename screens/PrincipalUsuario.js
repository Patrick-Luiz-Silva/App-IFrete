import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PrincipalUsuario({ navigation}) {
  const [dataFrete, setDataFrete] = useState('');
  const [horario, setHorario] = useState('');
  const [enderecoColeta, setEnderecoColeta] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [tipoCarga, setTipoCarga] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');

  const handlePostarFrete = async () => {
    const token = await AsyncStorage.getItem('token'); // Recupera o token JWT do AsyncStorage

    try {
      const response = await fetch('http://localhost:3000/api/postar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho Authorization
        },
        body: JSON.stringify({
          dataFrete,
          horario,
          enderecoColeta,
          enderecoDestino,
          tipoCarga,
          tipoVeiculo,
        }),
      });
      if (response.ok) {
        const successData = await response.json();
        Alert.alert(successData.message);
    } else {
        const errorData = await response.json();
        Alert.alert("Erro na postagem. Tente novamente.");
    }
    } catch (error) {
      Alert.alert("Erro: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postar Frete</Text>
      <TextInput placeholder="Data do Frete" style={styles.input} value={dataFrete} onChangeText={setDataFrete} />
      <TextInput placeholder="Horário" style={styles.input} value={horario} onChangeText={setHorario} />
      <TextInput placeholder="Endereço de Coleta" style={styles.input} value={enderecoColeta} onChangeText={setEnderecoColeta} />
      <TextInput placeholder="Endereço de Destino" style={styles.input} value={enderecoDestino} onChangeText={setEnderecoDestino} />
      <TextInput placeholder="Tipo de Carga" style={styles.input} value={tipoCarga} onChangeText={setTipoCarga} />
      <TextInput placeholder="Tipo de Veículo" style={styles.input} value={tipoVeiculo} onChangeText={setTipoVeiculo} />
      <View style={styles.buttonContainer}>
        <Button title="Postar Frete" onPress={handlePostarFrete} />
      <View style={{ height: 10 }} /> 
        <Button title="Editar Perfil" onPress={() => navigation.navigate('EditarPerfil')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
