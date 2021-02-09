import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Section } from "../types/section";
import { CloseButton } from "./CloseButton";

type Props = {
  sections: Section[];
  onChangeText: (index: number, text: string) => void;
  onPickImage: (uri: string) => void;
  onPressAddText: () => void;
  onPressDelete: (index: number) => void;
};
export const Editor: React.FC<Props> = ({
  sections,
  onChangeText,
  onPickImage,
  onPressAddText,
  onPressDelete,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onPickImage(result.uri);
    }
  };

  const renderSection = (section: Section, index: number) => {
    const { type, data } = section;
    const isFocused = index === focusedIndex;
    if (type === "header") {
      return (
        <View>
          <TextInput
            value={data}
            style={[
              styles.textInput,
              styles.header,
              isFocused && styles.focused,
            ]}
            onChangeText={(text) => onChangeText(index, text)}
            onFocus={() => setFocusedIndex(index)}
          />
          {isFocused && <CloseButton onPress={() => onPressDelete(index)} />}
        </View>
      );
    } else if (type === "body") {
      return (
        <View>
          <TextInput
            value={data}
            multiline
            style={[styles.textInput, isFocused && styles.focused]}
            onChangeText={(text) => onChangeText(index, text)}
            onFocus={() => setFocusedIndex(index)}
          />
          {isFocused && <CloseButton onPress={() => onPressDelete(index)} />}
        </View>
      );
    } else if (type === "image") {
      return (
        <TouchableOpacity onPress={() => setFocusedIndex(index)}>
          <Image source={{ uri: data }} style={styles.image} />
          {isFocused && <CloseButton onPress={() => onPressDelete(index)} />}
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => renderSection(section, index))}
      <View style={styles.toolBar}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <MaterialIcons name="image" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressAddText}>
          <MaterialIcons name="keyboard-return" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#ccc",
    borderWidth: 1,
    flex: 1,
    padding: 10,
  },
  toolBar: {
    flexDirection: "row",
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
    padding: 15,
  },
  focused: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  button: {
    width: 30,
    height: 30,
  },
  icon: {
    fontSize: 30,
    color: "#888",
  },
});
