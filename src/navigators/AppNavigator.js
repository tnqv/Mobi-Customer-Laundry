import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import OrderInfo from '../containers/orderInfo';
import ServiceInfo from '../containers/serviceInfo';
import SampleApp from '../containers/sampleApp';
import NotificationFeeds from '../containers/notificationFeeds';
import Settings from '../containers/settings';
import colors from '../config/colors'

const serviceIcon = (<Ionicons name="md-pricetags" size={24} />)
const orderIcon = (<Ionicons name="md-reorder" size={24}  />)
const notificationIcon = (<Ionicons name="md-notifications" size={24} />)
const personIcon = (<Ionicons name="md-person" size={24} />)
const serviceIconActive = (<Ionicons name="md-pricetags" size={24} color={colors.appleDefaultColor} />)
const orderIconActive = (<Ionicons name="md-reorder" size={24}  color={colors.appleDefaultColor} />)
const notificationIconActive = (<Ionicons name="md-notifications" size={24} color={colors.appleDefaultColor}  />)
const personIconActive = (<Ionicons name="md-person" size={24} color={colors.appleDefaultColor} />)

export const MainTabBar = createBottomTabNavigator(
  {
    ServicePrice : {
      screen: ServiceInfo,
      navigationOptions: {
         title: "Dịch vụ",
         tabBarIcon: ({ tintColor, focused }) => (
           !focused ? serviceIcon : serviceIconActive
        ),
      }
    },
    OrderInfo : {
      screen: OrderInfo,
      navigationOptions: {
        title: "Đơn hàng",
        tabBarIcon: ({ tintColor, focused }) => (
          !focused ? orderIcon : orderIconActive
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
      screen: Settings,
      navigationOptions: {
        title: "Tôi",
        tabBarIcon: ({ tintColor, focused }) => (
          !focused ? personIcon : personIconActive
        ),
      }
    }
  }
)