import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Cadastro({ route, navigation }) {
  const { cadastro = 'Cadastro' } = route.params || {};
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastrar = () => {
    navigation.navigate('PrincipalUsuario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro - {cadastro}</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Cadastrar" onPress={handleCadastrar} />
      <Button title="Voltar para Escolha de Perfil" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
