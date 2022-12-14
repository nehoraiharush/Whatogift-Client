import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { Slider } from '@miblanchard/react-native-slider';
import { AutocompleteTags } from 'react-native-autocomplete-tags'

const Gift = (props) => {

    const suggestions = ['apple', 'orange', 'banana', 'kiwi'];

    const [tags, setTags] = useState([]);

    const events = [
        { name: 'Wedding' },
        { name: 'Birthday' }
    ]

    const [gender, setGender] = useState(null);
    const [budget, setBudget] = useState({});
    const [inverts, setInverts] = useState([]);
    const [age, setAge] = useState(0);
    const [locationRadius, setLocationRadius] = useState({});
    const [related, setRelated] = useState(1);
    const relationsArr = [
        "First Circle: Mom & Dad & Siblings",
        "Second Circle: Cousins",
        "Third Circle: Childhood Friends",
        "Fourth Circle: Acquaintance",
        "Fifth Circle: Hello Hello",
        "Stranger"
    ]


    return (
        <View style={Style.container}>
            <Text style={{ fontSize: 25, height: 50 }}>Relation:</Text>
            <View style={{ height: 60, borderTopWidth: 2, borderBottomWidth: 2 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Value: {related} :
                    {
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> {relationsArr[related - 1]}</Text>
                    }
                </Text>
            </View>

            <Text style={{ fontSize: 25, height: 50 }}>Tags:</Text>
            <Slider
                value={related}
                step={1}
                maximumValue={6}
                minimumValue={1}
                onValueChange={value => setRelated(value)}

            />

            <View style={[styles.rowContainer]}>
                <AutocompleteTags
                    tags={tags}
                    suggestions={suggestions}
                    labelExtractor={(item) => item}
                    suggestionExtractor={(item) => item}
                    onChangeTags={(tags) => setTags(tags)}
                    onAddNewTag={(input) => {
                        if (!tags.includes('#' + input)) {
                            if (tags.length > 0) {
                                setTags((tags) => [...tags, '#' + input]);
                            }
                            else {
                                setTags(['#' + input])
                            }
                        }
                    }}
                    containerStyle={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

export default Gift;