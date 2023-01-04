//IMPORT NAVIGATION LIBS
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from '../utilies/AppColors.js';
import Styles from '../utilies/AppStyle.js';

//IMPORT ICONS
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//IMPORT SCREENS
import Dashboard, { screenOptions as DashboardScreenOptions } from '../screens/dashboard';
import Favorite from '../screens/favorite';
import Gift from '../screens/gifts';
import Profile from '../screens/profile';
import ViewGift from '../screens/gifts/ViewGift.js';

//TEST IMPORTS
import DashTest from '../screens/dashboard/Test';
import FavoriteTest from '../screens/favorite/Test';
import profileTest from '../screens/profile/Test';

//IMPORTS INTERFACE
import Login from '../screens/account/Login.js';
import Register from '../screens/account/Register.js';
import Verify from '../screens/account/Verify.js';

const defaultOptions = {
    headerStyle: { backgroundColor: Colors.pink },
    headerTintColor: Colors.white
}


//CREATE STACK
const DashboardStackNavigator = createNativeStackNavigator();
export const DashboardStack = () => {
    return (
        <DashboardStackNavigator.Navigator screenOptions={defaultOptions}>
            <DashboardStackNavigator.Screen name='Dashboard' component={Dashboard}
                options={DashboardScreenOptions} />
            <DashboardStackNavigator.Screen name='Dashboard Test' component={DashTest} />
        </DashboardStackNavigator.Navigator>
    );
}

const FavoriteStackNavigator = createNativeStackNavigator();
export const FavoriteStack = () => {
    return (
        <FavoriteStackNavigator.Navigator screenOptions={defaultOptions}>
            <FavoriteStackNavigator.Screen name='favorite' component={Favorite} />
            <FavoriteStackNavigator.Screen name='Favorite Test' component={FavoriteTest} />
        </FavoriteStackNavigator.Navigator>
    );
}

const ProfileStackNavigator = createNativeStackNavigator();
export const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={defaultOptions}>
            <ProfileStackNavigator.Screen name='profile' component={Profile} />
            <ProfileStackNavigator.Screen name='Profile Test' component={profileTest} />
        </ProfileStackNavigator.Navigator>
    );
}

const GiftsStackNavigator = createNativeStackNavigator();
export const GiftStack = () => {
    return (
        <GiftsStackNavigator.Navigator screenOptions={defaultOptions}>
            <GiftsStackNavigator.Screen name='gifts' component={Gift} />
            <GiftsStackNavigator.Screen name='viewGift' component={ViewGift} />
        </GiftsStackNavigator.Navigator>
    );
}

// CREATE ACCOUNT STACK
const AccountStackNavigator = createNativeStackNavigator();
export const AccountStack = () => {
    return (
        <AccountStackNavigator.Navigator>
            <AccountStackNavigator.Screen name='Login' component={Login} />
            <AccountStackNavigator.Screen name='Register' component={Register} />
            <AccountStackNavigator.Screen name='Verify' component={Verify} />
        </AccountStackNavigator.Navigator>
    )
}

//CREATE TABS
const AppTabs = createMaterialBottomTabNavigator();
export const TabsNavigator = () => {
    return (
        <AppTabs.Navigator activeColor={Colors.white} inactiveColor={Colors.dark_turquoise} barStyle={{ backgroundColor: Colors.ocean }}>
            <AppTabs.Screen name='dashboardTab' component={DashboardStack}

                options={{ tabBarLabel: 'Dashboard', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='view-grid' size={26} color={color} />) }} />

            <AppTabs.Screen name='favoriteTab' component={FavoriteStack}
                options={{ tabBarLabel: 'Favorite', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='cards-heart' size={26} color={color} />) }} />

            <AppTabs.Screen name='giftTab' component={GiftStack}
                options={{ tabBarLabel: 'Gift', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name='gift' size={26} color={color} />) }} />

            <AppTabs.Screen name='profileTab' component={ProfileStack}
                options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color }) => (<Ionicons name='person-circle' size={26} color={color} />) }} />
        </AppTabs.Navigator>
    );
}

