import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EditarVeiculoScreen({ navigation }) {
    const [veiculos, setVeiculos] = useState([]); 
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    // Função para buscar todos os veículos cadastrados
    const carregarVeiculos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error("Token não encontrado");

            const { data } = await axios.get('http://localhost:3000/api/veiculos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVeiculos(data);
        } catch (error) {
            setErro("Erro ao carregar os veículos");
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => { carregarVeiculos(); }, []); // Carregar veículos apenas uma vez

    if (carregando) return <ActivityIndicator style={styles.container} size="large" />;

    return (
        <View style={styles.container}>
            {erro ? <Text style={styles.error}>{erro}</Text> : null}
            {veiculos.length === 0 ? (
                <View style={styles.noVehiclesContainer}>
                <Text style={styles.noVehicles}>Nenhum veículo cadastrado</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
                </View>
            ) : (
                <FlatList
                    data={veiculos}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.vehicleContainer}>
                            <Text>{item.placa}</Text>
                            <Button
                                title="Editar"
                                onPress={() => navigation.navigate('EditarVeiculoDetalhes', { veiculo: item })}
                            />
                        </View>
                    )}
                />
            )}
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
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    noVehicles: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
    },
    vehicleContainer: {
        marginBottom: 15,
        alignItems: 'center',
    },
    noVehiclesContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
