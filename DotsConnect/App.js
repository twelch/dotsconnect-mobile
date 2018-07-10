/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  WebView,
  Animated,
  Image
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mapbox from '@mapbox/react-native-mapbox-gl'

Mapbox.setAccessToken('pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNqYzVxYTJ6NTF2NWUyeHBmNjcwdWwxY28ifQ.ug4rD1lc-yvGduyTkO18UA');

class PulseImage extends React.Component {
  state = {
    animValue: new Animated.Value(20),  // Initial value
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation() {
    this.state.animValue.setValue(0);
    Animated.timing(                  // Animate over time
      this.state.animValue,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2500,              // Make it take a while
      }
    ).start(this.startAnimation.bind(this));                        // Starts the animation
  }

  render() {
    const marginValue = this.state.animValue.interpolate({
      inputRange: [0, 0.5, 0.998, 0.999, 0.999, 1],
      outputRange: [60, 54, 60, 60, 60, 60]
    });

    return (
      <Animated.Image                 // Special animatable View
        style={{
          flex:1, height: undefined, width: undefined,
          margin: marginValue,         // Bind opacity to animated value
        }}
        resizeMode="contain"
        source={require('./assets/dc-logo-color-1024.png')}
      />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PulseImage />
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
    const webViewStyle = Platform.select({
      ios: {marginTop: 20},
      android: {}
    });

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