import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import { Produto } from '../../components/Produtos';
import { useState } from 'react';
 

export function Home(){

    const [produtos, setProduto] = useState([])

    const [name, setName] = useState('')

    function handleProdutoAdd(){
        setProduto([...produtos, name])
        setName('')
    } 
    function handleProdutoRemove(produto){
        Alert.alert("Removendo...",
            "Deseja realmente remover " + produto + " ?",
            [
                {text: "Sim", onPress: () => removeProduto(produto)},
                {text: "Não", style: 'cancel'}  
            ]
        )
    }

    function removeProduto(produtos){
        setProduto( prevState => prevState.filter(state => state != produtos)  )
    }
    return(
        <View style={ styles.container }>
            <Text style={ styles.groupName }>Lista de Compras</Text> 
            <Text style={ styles.groupDate }>Sexta, 14 de Novembro de 2023</Text>
            <View style={ styles.form }>
                <TextInput style={styles.input}
                    onChangeText={setName}
                    value={name}
                />
            </View>
            <TouchableOpacity style={styles.button}
                onPress={handleProdutoAdd}>
                <Text style={styles.textButton}>ADICIONAR</Text>    
            </TouchableOpacity>

            <Text style={ styles.groupName }>Produtos</Text>
            
            <FlatList
                data={produtos}
                keyExtractor={produtos => produtos}
                renderItem={ ({item}) => (
                    <Produto name={item}
                        key={item}
                        onRemove={() => handleProdutoRemove(item)}/>
                )}
                ListEmptyComponent={() => 
                    <Text styles={styles.listEmpty}>Sem produtos informado</Text>
                }
            />
        </View>
    )
}