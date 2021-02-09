import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
};
export const CloseButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.closeButton} onPress={onPress}>
      <MaterialIcons name="close" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  icon: {
    fontSize: 20,
    color: "#888",
  },
});
