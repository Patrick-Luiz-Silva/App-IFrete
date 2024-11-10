import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EditarVeiculoDetalhes({ route, navigation }) {
    const { veiculo } = route.params; // Recebe o objeto veiculo
    const [dadosVeiculo, setDadosVeiculo] = useState(veiculo); // Inicializa com os dados do veículo
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    // Função para salvar as alterações no veículo
    const salvarAlteracoes = async () => {
        setCarregando(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error("Token não encontrado");

            await axios.put('http://localhost:3000/api/veiculo', dadosVeiculo, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Veículo atualizado com sucesso!");
        } catch (error) {
            setErro("Erro ao atualizar o veículo");
        } finally {
            setCarregando(false);
        }
    };

    if (carregando) return <ActivityIndicator style={styles.container} size="large" />;

    return (
        <View style={styles.container}>
            {erro ? <Text style={styles.error}>{erro}</Text> : null}
            <TextInput
                placeholder="Placa"
                style={styles.input}
                value={dadosVeiculo.placa}
                onChangeText={(placa) => setDadosVeiculo((prev) => ({ ...prev, placa }))}
            />
            <TextInput
                placeholder="Marca e Modelo"
                style={styles.input}
                value={dadosVeiculo.marcaModelo}
                onChangeText={(marcaModelo) => setDadosVeiculo((prev) => ({ ...prev, marcaModelo }))}
            />
            <TextInput
                placeholder="Tipo de Carroceria"
                style={styles.input}
                value={dadosVeiculo.tipoCarroceria}
                onChangeText={(tipoCarroceria) => setDadosVeiculo((prev) => ({ ...prev, tipoCarroceria }))}
            />
            <TextInput
                placeholder="Capacidade de Carga"
                style={styles.input}
                value={dadosVeiculo.capacidade}
                onChangeText={(capacidade) => setDadosVeiculo((prev) => ({ ...prev, capacidade }))}
                keyboardType="numeric"
            />
            <Button title="Salvar Alterações" onPress={salvarAlteracoes} />
            <View style={{ height: 10 }} />
            <Button title="Voltar" onPress={() => navigation.navigate('PrincipalMotorista')} />
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
