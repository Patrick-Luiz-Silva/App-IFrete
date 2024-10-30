import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Login({ route, navigation }) {
  // Adicione um valor padrão para perfil
  const { perfil = 'Usuário' } = route.params || {};
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    navigation.navigate('PrincipalUsuario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login - {perfil}</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
