import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EscolhaPerfil({ navigation }) {
  console.log("EscolhaPerfil renderizado");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu Perfil</Text>
      <Button title="Ir para Cadastro" onPress={() => navigation.navigate('Cadastro', { cadastro: 'Cadastro'})} />
      {/* Adicione o parâmetro perfil ao navegar para Login */}
      <Button title="Ir para Login" onPress={() => navigation.navigate('Login', { perfil: 'Usuário' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
