import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Style from '../../utilies/AppStyle';
import { Slider } from '@miblanchard/react-native-slider';
import Tags from "react-native-tags";

const Gift = (props) => {

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
        "Fifth Circle: Hello Hello"
    ]


    return (
        <View style={Style.container}>

            <Text style={{ fontSize: 20, textAlign: 'center' }}>Value: {related} :
                {
                    <Text style={{ fontSize: 20, textAlign: 'center', left: 0, right: 0 }}> {relationsArr[related - 1]}</Text>
                }
            </Text>
            <Slider
                value={related}
                step={1}
                maximumValue={5}
                minimumValue={0}
                onValueChange={value => setRelated(value)}
            />


            <Tags

                containerStyle={{ justifyContent: "center", paddingTop: 10 }}
                inputStyle={{ backgroundColor: "white", borderRadius: 20 }}
                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                    <TouchableOpacity style={{ paddingRight: 5 }} key={`${tag}-${index}`} onPress={onPress}>
                        <Text>#{tag},</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

export default Gift;