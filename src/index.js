import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import 'react-native-gesture-handler';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
