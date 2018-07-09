/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mapbox from '@mapbox/react-native-mapbox-gl'

Mapbox.setAccessToken('pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNqYzVxYTJ6NTF2NWUyeHBmNjcwdWwxY28ifQ.ug4rD1lc-yvGduyTkO18UA');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const webViewStyle = Platform.select({
  ios: {marginTop: 20},
  android: {}
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
    );
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.770]}
          style={styles.container}>
        </Mapbox.MapView>
      </View>
    );
  }
}

class BlogScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{uri: 'https://dotsconnect.us'}}
          style={webViewStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default createBottomTabNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  Blog: BlogScreen
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-home';
      } else if (routeName === 'Map') {
        iconName = 'ios-navigate';
      } else if (routeName === 'Blog') {
        iconName = 'ios-paper'
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#338182',
    inactiveTintColor: 'gray',
  },
});