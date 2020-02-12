import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ navigation }) {
  const uri = navigation.getParam('repository').html_url;
  return <WebView source={{ uri }} />;
}

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
