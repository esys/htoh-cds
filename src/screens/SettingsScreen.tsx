import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class SettingsScreen extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hi settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});
