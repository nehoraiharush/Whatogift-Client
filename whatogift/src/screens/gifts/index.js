import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';

const Gift = (props) => {
    return (
        <View style={Style.container}>
            <Text>
                Gift
            </Text>
            <Button onPress={() => { props.navigation.navigate('Gifts Test') }} title='Go to Test'></Button>
        </View>
    );
}

export default Gift;