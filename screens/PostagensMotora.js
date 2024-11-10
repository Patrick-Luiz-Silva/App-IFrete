import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';

export default function VerPostagens({ navigation }) {
    const [postagens, setPostagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null); // Estado para o checkbox único

    const carregarPostagens = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("Token recuperado:", token);

            if (!token) {
                setErro("Token não encontrado");
                setCarregando(false);
                return;
            }

            const response = await axios.get('http://localhost:3000/api/postagens', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPostagens(response.data);
        } catch (error) {
            setErro("Erro ao carregar as postagens");
            console.error("Erro ao carregar postagens:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => { 
        carregarPostagens();
    }, []);

    const handleSelectPost = (postId) => {
        setSelectedPostId(postId === selectedPostId ? null : postId); // Alterna a seleção única
    };

    if (carregando) {
        return <ActivityIndicator style={styles.container} size="large" />;
    }

    return (
        <View style={styles.container}>
            {erro ? (
                <Text style={styles.error}>{erro}</Text>
            ) : postagens.length === 0 ? (
                <View style={styles.noPostsContainer}>
                    <Text style={styles.noPosts}>Nenhuma postagem disponível</Text>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </View>
            ) : (
                <>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <FlatList
                            data={postagens}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Text style={styles.cardText}>Data: {item.dataFrete}</Text>
                                    <Text style={styles.cardText}>Horário: {item.horario}</Text>
                                    <Text style={styles.cardText}>Tipo de Carga: {item.tipoCarga}</Text>
                                    <CheckBox
                                        checked={selectedPostId === item._id}
                                        onPress={() => handleSelectPost(item._id)}
                                        containerStyle={styles.checkboxContainer}
                                    />
                                </View>
                            )}
                        />
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => {
                            if (selectedPostId) {
                                navigation.navigate('Chat', { postId: selectedPostId });
                            } else {
                                alert("Por favor, selecione uma postagem.");
                            }
                        }}
                    >
                        <Text style={styles.chatButtonText}>Iniciar Conversa</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
    },
    scrollContainer: {
        paddingBottom: 100, // Adiciona espaço para o botão
    },
    noPostsContainer: {
        alignItems: 'center',
    },
    noPosts: {
        fontSize: 18,
        color: '#777',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginTop: 10,
    },
    chatButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});