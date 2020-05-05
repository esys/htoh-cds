import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  route: any;
};

export default class HotelListScreen extends Component<Props, {}> {
  render() {
    const { id } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text>Hotel id {id}</Text>
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
