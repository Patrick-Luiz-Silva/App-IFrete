import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Button, StyleSheet } from 'react-native';

export default function PrincipalMotorista({ navigation }) {
    const logout = async () => {
        try {
            // Remover o token de login
            await AsyncStorage.removeItem('token');
            // Redirecionar para a tela de login ou outra tela
            navigation.navigate('EscolhaPerfil');
        } catch (error) {
            console.error('Erro ao fazer logout', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonBox}>
                    <Button title="Editar Perfil" onPress={() => navigation.navigate('EditarPerfil')} />
                </View>
                <View style={styles.buttonBox}>
                    <Button title="Editar Veiculo" onPress={() => navigation.navigate('EditarVeiculo')} />
                </View>
                <View style={styles.buttonBox}>
                    <Button title="Cadastrar Veiculo" onPress={() => navigation.navigate('CadastroVeiculo')} />
                </View>
                <View style={styles.buttonBox}>
                    <Button title="Ver Postagens" onPress={() => navigation.navigate('PostagensMotora')} />
                </View>
                <View style={styles.buttonBox}>
                    <Button title="Sair" onPress={logout} />
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
        padding: 20
    },
    buttonContainer: {
        width: '80%',  
        maxWidth: 300, 
        alignItems: 'center', 
    },
    buttonBox: {
        width: '100%',  
        marginBottom: 10,
    },
});