import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Editor } from "./components/Editor";
import { Section } from "./types/section";

const INITIAL_SECTIONS: Section[] = [
  {
    type: "header",
    data: "お知らせ",
  },
  {
    type: "body",
    data:
      "いつもxxをご利用いただきありがとうございます。お客様にお知らせです。",
  },
  {
    type: "image",
    data:
      "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
  },
];

export default function App() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onChangeText = (index: number, text: string) => {
    const newSections = sections.map((section, _index) => {
      if (_index === index) {
        return {
          ...section,
          data: text,
        };
      } else {
        return section;
      }
    });
    //console.log(newSections);
    setSections(newSections);
  };

  const onPickImage = (uri: string) => {
    const section: Section = {
      type: "image",
      data: uri,
    };
    setSections([...sections, section]);
  };

  const onPressAddText = () => {
    const section: Section = {
      type: "body",
      data: "",
    };
    setSections([...sections, section]);
  };

  const onPressDelete = (index: number) => {
    console.log(index);
    const newSections = sections.filter((section, _index) => {
      return _index !== index;
    });
    //console.log(newSections);
    setSections(newSections);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Editor
        sections={sections}
        onChangeText={onChangeText}
        onPickImage={onPickImage}
        onPressAddText={onPressAddText}
        onPressDelete={onPressDelete}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
