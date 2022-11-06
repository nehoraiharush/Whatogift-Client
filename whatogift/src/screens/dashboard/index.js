import { View, Text, Button } from 'react-native';
import { Title } from 'react-native-paper';
import Style from '../../utilies/AppStyle';

const Dashboard = (props) => {
    return (
        <View style={Style.container}>
            <Text>
                Dashboard
            </Text>
            <Button onPress={() => { props.navigation.navigate('test') }} title='Go to test'></Button>
        </View>
    );
}

export default Dashboard;