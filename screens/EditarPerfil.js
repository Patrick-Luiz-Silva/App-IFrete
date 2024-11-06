import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarPerfilScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [carregando, setCarregando] = useState(true); // Estado de carregamento
    const [erro, setErro] = useState('');

    // Função para buscar o perfil do usuário
    const carregarPerfil = async () => {
      try {
          // Obtenha o token do AsyncStorage
          const token = await AsyncStorage.getItem('token');
          console.log("Token recuperado:", token);  // Log para verificar o token
  
          if (!token) {
              setErro("Token não encontrado");
              setCarregando(false);
              return;
          }
  
          // Faça a solicitação para obter o perfil
          const response = await axios.get('http://localhost:3000/api/perfil', {
              headers: { Authorization: `Bearer ${token}` }
          });
  
          // Preencha os dados do perfil
          setNome(response.data.nome);
          setEmail(response.data.email);
          setTelefone(response.data.telefone);
          setEndereco(response.data.endereco);
      } catch (error) {
          console.error("Erro ao carregar perfil:", error);
          setErro("Erro ao carregar o perfil");
      } finally {
          setCarregando(false); // Finaliza o estado de carregamento
      }
    };

    useEffect(() => {
        carregarPerfil();
    }, []);

    // Função para salvar as alterações
    const salvarAlteracoes = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          console.log("Token para atualização:", token); // Log para verificar o token
  
          if (!token) {
              setErro("Token não encontrado");
              return;
          }
  
          // Solicitação para atualizar o perfil com o token no formato Bearer
          const response = await axios.put('http://localhost:3000/api/perfil', {
              nome,
              email,
              telefone,
              endereco
          }, {
              headers: { Authorization: `Bearer ${token}` }
          });
  
          alert("Perfil atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
          setErro("Erro ao atualizar o perfil");
        }
      };

    if (carregando) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {erro ? <Text style={styles.error}>{erro}</Text> : null}
            <TextInput
                placeholder="Nome"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Telefone"
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="Endereço"
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
            />
            <Button title="Salvar Alterações" onPress={salvarAlteracoes} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
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
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});
