import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { BorderlessButton } from 'react-native-gesture-handler';


export default function TodoListSwipe(props) {
    const [listData, setListData] = useState(
        props.list.map((item, i) => ({ key: `${i}`, text: `${item.name}` }))
    );

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
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.text}>
                    <Text style={styles.text}>{data.item.text} in a SwipeListView</Text>
                </View>
            </TouchableHighlight>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

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
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        marginTop: 15,
        alignContent: 'stretch',
        justifyContent: 'space-between'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
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
        alignItems: 'stretch'
    }
});
