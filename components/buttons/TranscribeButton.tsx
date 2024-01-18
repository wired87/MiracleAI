import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import {IconButton} from "react-native-paper";
import {Vibration} from "react-native";
import Voice, {SpeechErrorEvent} from "@react-native-voice/voice";
import * as RNLocalize from 'react-native-localize';
import {styles as s} from "./styles";
import {ThemeContext} from "../../screens/Context"; // Später nur ein mal am Anfang getten und innsecurestore speichern,

// STRINGS
const defaultIcon = "microphone";


interface TranscribeButtonTypes {
  setTranscript: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  buttonIcon?: string;
  buttonStyles?: any;
  transcript: string;
}


const TranscribeButton: React.FC<TranscribeButtonTypes> = (

  {
    setTranscript,
    setError,
    buttonIcon,
    buttonStyles,
    transcript
  }

  ) => {

  const { customTheme } = useContext(ThemeContext);
  const [currentSpeech, setCurrentSpeech] = useState(false);
  const [languageTag, setLanguageTag] = useState('');

  // styles
  const recordingButtonStyles = buttonStyles || [s.redordingButton, {borderColor: customTheme.text}];

  const iconColorProp = currentSpeech ? "red" : customTheme.text;

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy()
        .then(() => Voice.removeAllListeners)
    }
  }, []);


  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
    if (e.error && e.error.message) {
      setError(e.error.message.toString());
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }, []);


  const onSpeechResults = useCallback((r: any) => {
    console.log("onSpeechResults r.value", r.value)
    setTranscript((prevTranscript) => prevTranscript + r.value[0] + " ");
  }, [transcript]);


  useEffect(() => {
    const getDeviceLanguage = () => {
      const locales = RNLocalize.getLocales();
      if (locales.length > 0) {
        setLanguageTag(locales[0].languageTag);
      } else {
        setLanguageTag("en-US");
      }
    };
    getDeviceLanguage();
  }, []);


  const startSpeech = async () => {
    console.log("Recognized voice language", languageTag);
    await Voice.start(languageTag);
  }

  const stopSpeech = async () => {
    await Voice.stop();
  }

  const handleSpeechToText = useCallback(() => {
    Vibration.vibrate();
    if (currentSpeech) {
      stopSpeech()
        .then(() => {
          console.log("Voice recording ended..")
          }
        )
        .catch(e => console.log("Error while stop the recording occurred:", e));
      setCurrentSpeech(!currentSpeech);
    } else {
      startSpeech()
        .then(() => {
          console.log("Voice recording started..");
            setCurrentSpeech(!currentSpeech);
          }
        )
        .catch(e => console.log("Error while stop the recording occurred:", e));
      setCurrentSpeech(!currentSpeech);
    }
  }, [currentSpeech]);

  return(
    <IconButton
      iconColor={iconColorProp}
      style={recordingButtonStyles}
      icon={buttonIcon || defaultIcon}
      onPress={handleSpeechToText}
    />
  );
}

export default memo(TranscribeButton);