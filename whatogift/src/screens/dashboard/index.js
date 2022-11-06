import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';

const Dashboard = (props) => {
    return (
        <View style={Style.container}>
            <Text>
                Dashboard
            </Text>
            <Button onPress={() => { props.navigation.navigate('Dashboard Test') }} title='Go to Test'></Button>
        </View>
    );
}

export default Dashboard;