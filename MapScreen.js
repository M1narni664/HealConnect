import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const LeafletMapWebView = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://leaflet-map-indol.vercel.app/' }} 
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default LeafletMapWebView;
