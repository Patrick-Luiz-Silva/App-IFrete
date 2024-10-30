import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function EditarPerfil() {
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSalvar = () => {
    alert('Informações atualizadas com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Endereço" style={styles.input} value={endereco} onChangeText={setEndereco} />
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
