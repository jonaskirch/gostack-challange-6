import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import './config/ReactotronConfig';
import 'react-native-gesture-handler';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* <View>
        <Text>asd</Text>
      </View> */}
      <Routes />
    </>
  );
}
