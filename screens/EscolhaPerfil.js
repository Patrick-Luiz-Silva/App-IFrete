import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EscolhaPerfil({ navigation }) {
  console.log("EscolhaPerfil renderizado");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu Perfil</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Usuario" onPress={() => navigation.navigate('Cadastro', { perfil: 'Usuario'})} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Motorista" onPress={() => navigation.navigate('Cadastro', { perfil: 'Motorista' })} />
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
