import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator,createStackNavigator,StackNavigator } from 'react-navigation';
import OrderInfo from '../containers/orderInfo';
import ServiceInfo from '../containers/serviceInfo';
import SampleApp from '../containers/sampleApp';
import OrderDetail from '../containers/orderDetail';
import NotificationFeeds from '../containers/notificationFeeds';
import Settings from '../containers/settings';
import LoginPage from '../containers/loginPage';
import PlaceOrder from '../containers/placeOrder';
import SplashScreen from '../containers/splashScreen';
import LocationManage from '../containers/locationManage';
import EditLocation from '../containers/editLocation';
import ChooseLocation from '../containers/chooseLocation';
import colors from '../config/colors'


const serviceIcon = (<Ionicons name="md-pricetags" size={24} />)
const orderIcon = (<Ionicons name="md-reorder" size={24}  />)
const notificationIcon = (<Ionicons name="md-notifications" size={24} />)
const personIcon = (<Ionicons name="md-person" size={24} />)
const serviceIconActive = (<Ionicons name="md-pricetags" size={24} color={colors.colorBlueOnLeftTopLogo} />)
const orderIconActive = (<Ionicons name="md-reorder" size={24}  color={colors.colorBlueOnLeftTopLogo} />)
const notificationIconActive = (<Ionicons name="md-notifications" size={24} color={colors.colorBlueOnLeftTopLogo}  />)
const personIconActive = (<Ionicons name="md-person" size={24} color={colors.colorBlueOnLeftTopLogo} />)

export const SettingsStack = createStackNavigator({
    MainSettings: {
      screen: Settings,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      }
    },
    LocationManage: {
      screen: LocationManage,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      }
    },
    EditLocation: {
      screen: EditLocation,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      }
    }
},
{
  initialRouteName: 'MainSettings',
  mode: 'modal',
  headerMode: 'none',

});

SettingsStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if(routeName === 'LocationManage') {

    tabBarVisible = false;
    header = null;

  }else if(routeName === 'EditLocation'){

    tabBarVisible = false;

  }
  return {
    tabBarVisible,
  }
}
export const OrderStack = createStackNavigator(
  {
      OrderInfo: {
          screen: OrderInfo,
          navigationOptions: {
              header: null,
          }
      },
      LoginView: {
          screen: LoginPage,
          navigationOptions: {
            tabBarVisible: false,
            header: null,
          }
      },
      PlaceOrderView: {
         screen: PlaceOrder,
         navigationOptions: {
          tabBarVisible: false,
         }
      },
      OrderDetail: {
          screen: OrderDetail,
          navigationOptions: {
            tabBarVisible: false,
          }
      },
      ChooseLocation : {
         screen: ChooseLocation,
         navigationOptions: {
          tabBarVisible: false,
         }
      }
  },
  {
      initialRouteName: 'OrderInfo',
      mode: 'modal',
      headerMode: 'none',

  }
);

OrderStack.navigationOptions = ({navigation}) => {
   let tabBarVisible = true;
   let routeName = navigation.state.routes[navigation.state.index].routeName;

   if(routeName === 'LoginView') {

     tabBarVisible = false;
     header = null;

   }else if(routeName === 'PlaceOrderView'){

     tabBarVisible = false;

   }else if(routeName === 'OrderDetail'){

     tabBarVisible = false;

   }else if (routeName === 'ChooseLocation'){
    tabBarVisible = false;
   }
   return {
     tabBarVisible,
   }
}

export const MainTabBar = createBottomTabNavigator(
  {
    OrderInfo : {
      screen: OrderStack,
      navigationOptions: {
        title: "Đơn hàng",
        tabBarIcon: ({ tintColor, focused }) => (
          !focused ? orderIcon : orderIconActive
       ),
     }
    },
    ServicePrice : {
      screen: ServiceInfo,
      navigationOptions: {
         title: "Dịch vụ",
         tabBarIcon: ({ tintColor, focused }) => (
           !focused ? serviceIcon : serviceIconActive
        ),
      }
    },
    NotificationFeeds : {
      screen: NotificationFeeds,
      navigationOptions: {
        title: "Thông báo",
        tabBarIcon: ({ tintColor, focused }) => (
          !focused ? notificationIcon : notificationIconActive
        ),
      }
    },
    Me : {
      screen: SettingsStack,
      navigationOptions: {
        title: "Tôi",
        tabBarIcon: ({ tintColor, focused }) => (
          !focused ? personIcon : personIconActive
        ),
      }
    }
  },
  {
    stateName: 'MainTabBar',
    tabBarOptions: {
      activeTintColor: colors.colorBlueAccentOnLeftTopLogo,
    }
  }
)

export const AppStack =  createStackNavigator({
  SplashScreen: { screen: SplashScreen },
  MainTabBar: { screen: MainTabBar },
},{
  mode: 'modal',
  headerMode: 'none',
})