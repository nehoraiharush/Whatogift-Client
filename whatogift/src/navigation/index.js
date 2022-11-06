//IMPORT NAVIGATION LIBS
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//IMPORT ICONS
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//IMPORT SCREENS
import Dashboard from '../screens/dashboard';
import Favorite from '../screens/favorite';
import Gift from '../screens/gifts';
import Profile from '../screens/profile';
import Test from '../screens/dashboard/Test';

//CREATE STACK
const DashboardStackNavigator = createNativeStackNavigator();
export const DashboardStack = () => {
    return (
        <DashboardStackNavigator.Navigator>
            <DashboardStackNavigator.Screen name='dashboard' component={Dashboard} />
            <DashboardStackNavigator.Screen name='test' component={Test} />
        </DashboardStackNavigator.Navigator>
    );
}

//CREATE TABS
const AppTabs = createMaterialBottomTabNavigator();
export const TabsNavigator = () => {
    return (
        <AppTabs.Navigator>
            <AppTabs.Screen name='dashboardTab' component={DashboardStack}
                options={{ tabBarLabel: 'Dashboard', tabBarIcon: () => (<MaterialCommunityIcons name='view-grid' size={28} />) }} />
            <AppTabs.Screen name='favorite' component={Favorite}
                options={{ tabBarLabel: 'Favorite', tabBarIcon: () => (<MaterialCommunityIcons name='cards-heart' size={20} />) }} />
            <AppTabs.Screen name='gift' component={Gift}
                options={{ tabBarLabel: 'Gift', tabBarIcon: () => (<MaterialCommunityIcons name='gift-outline' size={20} />) }} />
            <AppTabs.Screen name='profile' component={Profile}
                options={{ tabBarLabel: 'Profile', tabBarIcon: () => (<Ionicons name='person-circle' size={20} />) }} />
        </AppTabs.Navigator>
    );
}