import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function TodoListSwipe(props) {
    const [listData, setListData] = useState(props.list);
    const user = props.user;

    useEffect(() => {
        async function setTodoLists() {
            setListData(props.list);
        }
        setTodoLists();
    }, [props.list.length]);

    const navigation = props.navigation;

    const rowTranslateAnimatedValues = {};
    Array(props.list.length)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width &&
            !this.animationIsRunning
        ) {
            this.animationIsRunning = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);

                console.log('List :' + key + '  ' + listData[prevIndex].id);
                deleteTodoList(listData[prevIndex].id);

                newData.splice(prevIndex, 1);
                setListData(newData);
                this.animationIsRunning = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                styles.rowFrontContainer,
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50],
                    }),
                },
            ]}
        >
            <TouchableHighlight
                onPress={() => handleTodoListSelected(data.item)}
                //onPress={() => console.log('You touched me' + data.item.id)}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.text}>
                    <Icon name="format-list-bulleted" size={30} color="#31B2BF" />
                    <Text style={styles.text}>{data.item.text}</Text>
                </View>
            </TouchableHighlight>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    async function deleteTodoList(id) {
        console.log('Delete' + id);
    }

    async function handleTodoListSelected(todoListItem) {
        console.log("navigate to Items : " + todoListItem.id);
        console.log("Navigation : " + navigation);
        navigation.navigate('Items', { id: todoListItem.id, todoListText: todoListItem.text, user });
    }

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        alignContent: 'stretch',
        justifyContent: 'space-between'
    },
    backTextWhite: {
        color: 'white',
        fontWeight: 'bold',
    },
    rowFront: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 3,
        justifyContent: 'center'
    },
});