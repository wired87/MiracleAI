

import { Entypo } from '@expo/vector-icons';
import React, {memo, useContext, useState} from 'react';
import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate, StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {MediaContext, ThemeContext} from "../../screens/Context";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface FloatingButtonProps extends ViewProps {
}

const FloatingMediaButton:React.FC<FloatingButtonProps> = (
  {
     ...rest
   }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const animation = useSharedValue(0);
  const { customTheme } = useContext(ThemeContext);

  const iconColor:string = customTheme.text

  const { updateDoc, updatePickedImage, pickedImage, doc, setCameraVisible } = useContext(MediaContext);

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isOpen ? '45deg' : '0deg'),
        },
      ],
    };
  });


  const customButtonStyles: StyleProps[] = [
    styles.button, {
      backgroundColor: "transparent",
      shadowColor: customTheme.text,
    }, rotationAnimatedStyle];


  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });


  const heartAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -40],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });


  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      animation.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: withSpring(opacityAnimation),
    };
  });

  const getDocument = async () => {
    const document = await DocumentPicker.getDocumentAsync(
      {
        multiple: false,
        type: ['image/*', 'application/pdf', 'application/msword', // 'video/*', for + members
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain']
      }
    )
    console.log("Doc picked:", document);
    if (document) {
      if (pickedImage) {
        updatePickedImage(undefined);
      }
      updateDoc(document);
    }
  }



  function onPress() {
    setModalOpen((curr) => !curr);
  }


  function toggleMenu() {
    onPress();
    setIsOpen((current) => {
      animation.value = current ? 0 : 1;
      return !current;
    });
  }

  const getImage = async (recordImage: boolean) => {
    if (recordImage) {
      // Open vision-camera overlay instead of expo-image-picker
      setCameraVisible(true);
      return;
    }
    
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }
    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);

    if (result && result.assets && !result.canceled) {
      if (doc) {
        updateDoc(undefined);
      }
      updatePickedImage(result);
    }
  };



  return (
    <View style={[styles.container]} {...rest}>
      <Pressable onPress={getDocument}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            heartAnimatedStyle,
            opacityAnimatedStyle,
          ]}>
          <MaterialCommunityIcons name="file-document-outline" size={26} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => getImage(false)}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            thumbAnimatedStyle,
            opacityAnimatedStyle,
          ]}>
          <Entypo name="image" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => getImage(true)}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            thumbAnimatedStyle,
            opacityAnimatedStyle,
          ]}>
          <Entypo name="camera" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={toggleMenu}>
        <Animated.View style={customButtonStyles}>
          <Entypo name="plus" size={24} color={customTheme.text} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default memo(FloatingMediaButton);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:0,
    position: "absolute",
    left: 0,
    bottom: 5,
    width:40
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
  },

  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});


/*
<Pressable onPress={() => getImage(true)}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            thumbAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="camera" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

<Pressable onPress={closeCam}>
    <Animated.View
      style={[
        styles.button,
        styles.secondary,
        pinAnimatedStyle,
        opacityAnimatedStyle,
      ]}
    >
      <Entypo name="camera" size={24} color={iconColor} />
    </Animated.View>
  </Pressable>


SHADOW
 shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10,
    shadowRadius: 10,
 */