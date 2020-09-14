import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { View, TextInput, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import api from '../services/api';

export default function Items({ navigation }) {
    const id = navigation.getParam('id');
    const [listItems, setListItems] = useState([]);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    console.log("Cheguei na tela de Items" + id);

    useEffect(() => {
        async function loadItems() {
            const response = await api.get('/items', {
                headers: {
                    todolistid: id,
                }
            })
            console.log(response.data[0].name)
            setListItems(response.data);

        }
        loadItems();
    }, [id]);

    async function handleGoBack() {

        navigation.navigate('Main');
    }

    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logo} onPress={handleGoBack}>
                <Image source={logo} />
            </TouchableOpacity>
            <Text style={styles.fontDestackH1}># APP Tarefas #</Text>


            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
            </View>
            <Text>Is CheckBox selected: {toggleCheckBox ? 'S' : 'N'}</Text>

            <View>
                {listItems.length === 0
                    ? <View>
                        <Text style={styles.fontDestackH2}>Items</Text>
                    </View> :
                    (<View style={styles.checkboxContainer}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={styles.label}>Do you like React Native?</Text>
                    </View>


                    )
                }
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Criar Item</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
})