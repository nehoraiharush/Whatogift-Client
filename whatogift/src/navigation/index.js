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

//TEST IMPORTS
import DashTest from '../screens/dashboard/Test';
import FavoriteTest from '../screens/favorite/Test';
import profileTest from '../screens/profile/Test';
import giftsTest from '../screens/gifts/Test';


//CREATE STACK
const DashboardStackNavigator = createNativeStackNavigator();
export const DashboardStack = () => {
    return (
        <DashboardStackNavigator.Navigator>
            <DashboardStackNavigator.Screen name='dashboard' component={Dashboard} />
            <DashboardStackNavigator.Screen name='Dashboard Test' component={DashTest} />
        </DashboardStackNavigator.Navigator>
    );
}

const FavoriteStackNavigator = createNativeStackNavigator();
export const FavoriteStack = () => {
    return (
        <FavoriteStackNavigator.Navigator>
            <FavoriteStackNavigator.Screen name='favorite' component={Favorite} />
            <FavoriteStackNavigator.Screen name='Favorite Test' component={FavoriteTest} />
        </FavoriteStackNavigator.Navigator>
    );
}

const ProfileStackNavigator = createNativeStackNavigator();
export const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen name='profile' component={Profile} />
            <ProfileStackNavigator.Screen name='Profile Test' component={profileTest} />
        </ProfileStackNavigator.Navigator>
    );
}

const GiftsStackNavigator = createNativeStackNavigator();
export const GiftStack = () => {
    return (
        <GiftsStackNavigator.Navigator>
            <GiftsStackNavigator.Screen name='gifts' component={Gift} />
            <GiftsStackNavigator.Screen name='Gifts Test' component={giftsTest} />
        </GiftsStackNavigator.Navigator>
    );
}

//CREATE TABS
const AppTabs = createMaterialBottomTabNavigator();
export const TabsNavigator = () => {
    return (
        <AppTabs.Navigator>
            <AppTabs.Screen name='dashboardTab' component={DashboardStack}
                options={{ tabBarLabel: 'Dashboard', tabBarIcon: () => (<MaterialCommunityIcons name='view-grid' size={28} />) }} />

            <AppTabs.Screen name='favoriteTab' component={FavoriteStack}
                options={{ tabBarLabel: 'Favorite', tabBarIcon: () => (<MaterialCommunityIcons name='cards-heart' size={28} />) }} />

            <AppTabs.Screen name='giftTab' component={GiftStack}
                options={{ tabBarLabel: 'Gift', tabBarIcon: () => (<MaterialCommunityIcons name='gift-outline' size={28} />) }} />

            <AppTabs.Screen name='profileTab' component={ProfileStack}
                options={{ tabBarLabel: 'Profile', tabBarIcon: () => (<Ionicons name='person-circle' size={28} />) }} />
        </AppTabs.Navigator>
    );
}