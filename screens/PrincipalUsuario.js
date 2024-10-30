import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function PrincipalUsuario({ navigation }) {
  const [dataFrete, setDataFrete] = useState('');
  const [horario, setHorario] = useState('');
  const [enderecoColeta, setEnderecoColeta] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [tipoCarga, setTipoCarga] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');

  const handlePostarFrete = () => {
    alert('Frete postado com sucesso!');
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
      <Button title="Postar Frete" onPress={handlePostarFrete} />
      <Button title="Editar Perfil" onPress={() => navigation.navigate('EditarPerfil')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
