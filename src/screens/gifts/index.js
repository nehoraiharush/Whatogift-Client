import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, LogBox, Modal, FlatList } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { Slider } from '@miblanchard/react-native-slider';
import { AutocompleteTags } from 'react-native-autocomplete-tags'
import RadioButtonRN from 'radio-buttons-react-native';
import { TextInput } from 'react-native-paper';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utilies/AppColors';
import GiftItem from './GiftItem.js';

const relationsArr = [
    "First Circle: Mom & Dad & Siblings",
    "Second Circle: Cousins",
    "Third Circle: Childhood Friends",
    "Fourth Circle: Acquaintance",
    "Fifth Circle: Hello Hello",
    "Stranger"
];

const events = [
    '#Wedding',
    '#Birthday',
    "#Party",
];

const genderRbData = [
    { label: 'Male' }, { label: 'Female' }, { label: 'Other' }
];

const interetsData = [
    "#Video Games",
    "#Nature",
    "#Music",
    "#Movies",
    "#Toys"
]

const Gift = (props) => {

    const [token, setToken] = useState('');
    const [location, setLocation] = useState(null);
    const [eventTags, setEventTags] = useState([]);
    const [gender, setGender] = useState(null);
    const [budget, setBudget] = useState([1350, 1550]);
    const [interstsTags, setIntretsTags] = useState([]);
    const [age, setAge] = useState(0);
    const [locationRadius, setLocationRadius] = useState(0);
    const [related, setRelated] = useState(1);
    const [errorMsg, setErrorMsg] = useState(null);

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Gifts',
            headerRight: () => (
                <MaterialIcons onPress={() => setModalVisible(!modalVisible)} name='filter-alt' size={26} color={Colors.white} />
            ),
        });
    }, [])


    const dispatch = useDispatch();

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, []);
    //find location
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if (token && location) {
                const action = await actions.getAllCompaniesByLocation(token, location);

                try {
                    dispatch(action);
                } catch (error) {
                    setErrorMsg(error.message)
                    throw new Error(errorMsg)
                }
            }

        })();
    }, []);
    //find token
    const hasToken = useCallback(async () => {

        const dataFromAsync = await AsyncStorage.getItem('Account');
        if (dataFromAsync != null) {
            const data = JSON.parse(dataFromAsync);
            setToken(data.token);
        }
    }, [token])

    useEffect(() => {
        hasToken();
    }, [hasToken])

    const find_gift_action = useCallback(async => {
        setModalVisible(false)
        try {
            const action = actions.find_gift(
                token, location, eventTags, gender,
                budget, interstsTags, age,
                locationRadius, related
            );
            dispatch(action);
        } catch (error) {
            Alert.alert('Find my gift', error.message);
        }

    })

    const giftData = useSelector((state) => state.giftList);
    //console.log("My Gifts: " + JSON.stringify(giftData))

    return (
        <View style={Style.container}>

            <Modal
                transparent={true}
                onRequestClose={find_gift_action}
                visible={modalVisible}
                animationType='fade'
            >
                <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <View style={{ width: '90%', height: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 10 }}>
                        <ScrollView nestedScrollEnabled={true}>
                            {/*RELATION*/}
                            <Text style={{ fontSize: 20, height: 35 }}>Relation:</Text>
                            <View style={{ height: 30, borderTopWidth: 2, borderBottomWidth: 2 }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>{related} :
                                    {
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}> {relationsArr[related - 1]}</Text>
                                    }
                                </Text>
                            </View>
                            <Slider
                                value={related}
                                step={1}
                                maximumValue={6}
                                minimumValue={1}
                                onValueChange={value => setRelated(value)}
                            />

                            {/*EVENTS*/}
                            <Text style={{ fontSize: 20, padding: 10 }}>Enter an Event:</Text>
                            <View style={[styles.rowContainer]}>
                                <AutocompleteTags
                                    tags={eventTags}
                                    suggestions={events}
                                    labelExtractor={(item) => item}
                                    suggestionExtractor={(item) => item}
                                    onChangeTags={(tags) => setEventTags(tags)}
                                    onAddNewTag={(input) => {
                                        if (input != '') {
                                            if (eventTags.length > 0 && eventTags.find((item) => { if (item == '#' + input) return true; }) === undefined) {
                                                setEventTags((tags) => [...tags, '#' + input]);
                                            }
                                            else if (eventTags.length === 0) {
                                                setEventTags(['#' + input])
                                            }
                                        }
                                    }}
                                    onSuggestionPress={(sugg) => {
                                        if (eventTags.length > 0 && eventTags.find((item) => { if (item === sugg) return true }) === undefined)
                                            setEventTags((tags) => [...tags, sugg]);
                                        else if (eventTags.length === 0)
                                            setEventTags([sugg])
                                    }}
                                    containerStyle={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}
                                    flatListProps={{ horizontal: true }}
                                />
                            </View>

                            {/*INTERESTS*/}
                            <Text style={{ fontSize: 20, padding: 10 }}>Enter an Interests:</Text>
                            <View style={[styles.rowContainer]}>
                                <AutocompleteTags
                                    tags={interstsTags}
                                    suggestions={interetsData}
                                    labelExtractor={(item) => item}
                                    suggestionExtractor={(item) => item}
                                    onChangeTags={(tags) => setIntretsTags(tags)}
                                    onAddNewTag={(input) => {
                                        if (input != '') {
                                            if (interstsTags.length > 0 && interstsTags.find((item) => { if (item == '#' + input) return true; }) === undefined) {
                                                setIntretsTags((tags) => [...tags, '#' + input]);
                                            }
                                            else if (interstsTags.length === 0) {
                                                setIntretsTags(['#' + input])
                                            }
                                        }
                                    }}
                                    onSuggestionPress={(sugg) => {
                                        if (interstsTags.length > 0 && interstsTags.find((item) => { if (item == sugg) return true }) === undefined)
                                            setIntretsTags((tags) => [...tags, sugg]);
                                        else if (interstsTags.length === 0)
                                            setIntretsTags([sugg])
                                    }}
                                    containerStyle={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}
                                    flatListProps={{ horizontal: true }}
                                />
                            </View>

                            {/*GENDER*/}
                            <Text style={{ fontSize: 20, padding: 10 }}>Gender:</Text>
                            <RadioButtonRN
                                data={genderRbData}
                                selectedBtn={(gender) => setGender(gender)}
                            />

                            {/*AGE*/}
                            <Text style={{ fontSize: 20, padding: 10 }}>Age:</Text>
                            <TextInput
                                value={age} onChangeText={age => { setAge(age) }}
                                label="Age"
                                placeholder="Enter your age"
                                keyboardType="numeric"
                                right={<TextInput.Icon icon="numeric" />}
                                style={{ marginBottom: 15 }}
                            />

                            {/*Location*/}
                            <Text style={{ fontSize: 20, height: 35 }}>Location:</Text>
                            <View style={{ height: 30, borderTopWidth: 2, borderBottomWidth: 2, justifyContent: 'center' }}>

                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Location: {locationRadius} km</Text>

                            </View>
                            <Slider
                                value={locationRadius}
                                step={10}
                                maximumValue={100}
                                minimumValue={0}
                                onValueChange={value => setLocationRadius(value[0])}
                            />

                            {/*Budget*/}
                            <Text style={{ fontSize: 20, height: 35 }}>Budget:</Text>
                            <View style={{ height: 50, borderTopWidth: 2, borderBottomWidth: 2, justifyContent: 'center' }}>

                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Min: {budget[0]}${'\n'}Max: {budget[1]}$</Text>

                            </View>
                            <Slider
                                value={budget}
                                step={200}
                                maximumValue={3000}
                                minimumValue={100}
                                onValueChange={value => setBudget([value[0], value[1]])}
                            />

                            <TouchableOpacity onPress={find_gift_action} style={Style.btn_container}>
                                <Text style={Style.btn_white_text}>
                                    FIND MY GIFT
                                </Text>

                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {
                giftData ?
                    (

                        <FlatList
                            data={giftData?.giftList?.message}
                            keyExtractor={(company) => company.product._id}
                            renderItem={comapny =>
                                <GiftItem gift={comapny.item} onClick={() => props.navigation.navigate('viewGift', { product: comapny.item })} />
                            } />
                    ) :
                    (
                        <Text>No data were found</Text>
                    )
            }

        </View>
    );
}


const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    btn_container: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,

    }
});

export default Gift;