import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';

const Favorite = (props) => {
    return (
        <View style={Style.container}>
            <Text>
                Favorite
            </Text>
            <Button onPress={() => { props.navigation.navigate('Favorite Test') }} title='Go to Test'></Button>
        </View>
    );
}

export default Favorite;