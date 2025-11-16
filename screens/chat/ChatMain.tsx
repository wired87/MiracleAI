import React, {memo, useCallback, useContext, useMemo} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  StyleSheet
} from "react-native";

import {chatStyles, windowWidth} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";

import {InputContext, ThemeContext, MediaContext} from "../Context";
import SingleErrorMessage from "../../components/container/chat/SingleErrorMessage";
import {StyleProps} from "react-native-reanimated";
import {userMesssageObject} from "./ChatNavigator";
import {CameraOverlay} from "../../components/camera/CameraOverlay";

const SingleMessageMemo = memo(SingleMessage);

export const ChatMain = () => {

  const { messages, messagesLeft } = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);
  const { cameraVisible, setCameraVisible } = useContext(MediaContext);

  const keyExtractor = (item: object, index: number) => String(index);

  // Styles
  const mainViewStyles =
    [localStyles.main, {backgroundColor: customTheme.primary}];

  const primaryTextStyles: StyleProps =
    {textAlign: "justify", marginBottom: 15, color: customTheme.text}

  const secondaryTextStylesText: StyleProps =
    {color: customTheme.text, fontSize: 10, position: "absolute", left: 10, bottom: 3}

  const renderItem = useCallback(({ item }: { item: userMesssageObject }) => {
    if (item)
      if (item.type === "text" || item.type == "IMAGE") {
        return (
          <SingleMessageMemo
            item={item}
            styles={chatStyles}
            primaryTextStyles={primaryTextStyles}
            secondaryTextStylesText={secondaryTextStylesText}
          />
        )
      }else if (item.type == "error") {
        return <SingleErrorMessage item={item} />
    }
    return <></>
  }, [customTheme, messages]);


  const miracleText = useMemo(() => {
    const aixTextStyles =
      [localStyles.centeredText, {color: customTheme.placeholder, opacity: 1}];
    return <View style={
      [
        chatStyles.chatBackground,
        {
          borderColor: customTheme.borderColor,
          backgroundColor: "transparent"
        }
      ]
    }>
      <Text style={aixTextStyles}>MIRACLE</Text>
    </View>
  },[customTheme]);


  return (
    <SafeAreaView style={mainViewStyles}>
      <KeyboardAvoidingView
        style={mainViewStyles}>
        <View style={localStyles.defaultContainer}>

          {miracleText}

          <FlatList
            inverted
            style={localStyles.fullPercent}
            data={messages}
            contentContainerStyle={localStyles.columnReverse}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>

        <View style={localStyles.messageInputView}>
          <MessageInputContainer messagesLeft={messagesLeft}/>
        </View>

      </KeyboardAvoidingView>
      
      <CameraOverlay
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
      />
    </SafeAreaView>
  );
}


const localStyles = StyleSheet.create(
  {
    messageInputView: {
      bottom: 10,
      flexDirection: "row",
      justifyContent:"center",
      alignItems: "center"
    },
    centeredText: {
      gap: 20,
      fontFamily: "wizardFont",
      fontSize: 20,
    },
    bgText: {
      fontSize: 160,
    },
    defaultContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    fullPercent: {
      marginTop: 40,
      marginBottom: 10,

    },
    columnReverse: {
      flexDirection: 'column-reverse',
      justifyContent: "flex-end",
      alignItems: "flex-end",
      width: windowWidth
    },
    customFontSize: {
      fontSize: 10,
    },
    main: {
      paddingTop: 0,
      flex: 1,
      marginBottom: 0,
      flexDirection: "column"
    },
    aiContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      position: "absolute",
      width: 200,
      height: 200,
    }
  }
)

