import React, { ReactNode } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";

type Props = {
  marginTop: number;
  children: ReactNode;
  visible: boolean;
  onTouchOutside: () => void;
};

export default class TransparentModal extends React.Component<Props, {}> {
  static defaultProps = {
    marginTop: 300,
    visible: false,
  };

  render() {
    const { marginTop, visible, onTouchOutside } = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.modalEmptyView, { height: marginTop }]} onPress={() => onTouchOutside()} />
          <View style={[styles.modalView, { height: marginTop }]}>{this.props.children}</View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalEmptyView: {},
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
