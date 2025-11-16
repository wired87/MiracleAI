import {createContext, Dispatch, SetStateAction} from "react";

import {ImagePickerResult} from "expo-image-picker";
import {DocumentPickerResult} from "expo-document-picker";
import {JwtToken, UserObjectInterface} from "../AppInterfaces/AuthInterfaces";


export const PrimaryContext = createContext(
  {

    user: null as UserObjectInterface | null,
    setUser: (() => {}) as Dispatch<SetStateAction<UserObjectInterface | null>>,

    loading: false,
    setLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,

    clearMessages: false,
    setClearMessages: (() => {}) as Dispatch<SetStateAction<boolean>>,

    jwtToken: null as JwtToken | null,
    setJwtToken: (() => {}) as Dispatch<SetStateAction<JwtToken | null>>,

    isConnected: false,
    updateIsConnected: (value: boolean):void => {},

    bottomSheetLoaded: false,
    setBottomSheetLoaded: (() => {}) as Dispatch<SetStateAction<boolean>>,

    defaultPostRequest: async (
      postUrl: string,
      postObject: object,
      setError: Dispatch<SetStateAction<string>>,
      setResponse: Dispatch<SetStateAction<any>>,
      setStatus?: Dispatch<SetStateAction<number>>,
      toolAction?:boolean
      ) => Promise<any>,

    alreadyRunning: false,
    updateAlreadyRunning: (value:boolean) :void => {}
  });

export const InputContext = createContext({

  input: "",
  setInput: (() => {}) as Dispatch<SetStateAction<string>>,

  messagesLeft: "",
  setMessagesLeft: (() => {}) as Dispatch<SetStateAction<string>>,

  messages: [] as any[],
  setMessages: (() => {}) as Dispatch<SetStateAction<any[]>>,

  messageIndex: 0,
  setMessageIndex: (() => {}) as Dispatch<SetStateAction<number>>,

  messageBreakOption: false,
  setMessageBreakOption: (() => {}) as Dispatch<SetStateAction<boolean>>,

  typing: false,
  setTyping: (() => {}) as Dispatch<SetStateAction<boolean>>,

  currentRecording: false,
  setCurrentRecording: (() => {}) as Dispatch<SetStateAction<boolean>>,

});


export const MediaContext= createContext(
  {

    pickedImage: undefined as ImagePickerResult | undefined,
    updatePickedImage: (image:ImagePickerResult | undefined):void => {},

    doc: undefined as DocumentPickerResult | undefined,
    updateDoc: (doc:DocumentPickerResult | undefined):void => {},

    cameraVisible: false,
    setCameraVisible: (() => {}) as Dispatch<SetStateAction<boolean>>,

  }
)

export const ToolContext= createContext(
  {
    toolActionValue: "",
    setToolActionValue: (() => {}) as Dispatch<SetStateAction<string>>,
    checkToolActionValueProcess: async (): Promise<boolean> => false,
  }
)


export const FunctionContext = createContext(
  {
    sendMessageProcess: async () => {},
    checkMessagesLeftProcess: async (): Promise<boolean> => false,
  }
);

export const SettingsContext = createContext({
  status: 0,
  setStatus: (() => {}) as Dispatch<SetStateAction<number>>,

});

////////////////// THEME

export interface Theme {
  primary: string;
  secondary: string;
  borderColor: string;
  text: string;
  placeholder: string
  navigatorColor: string;
  modalColor: string;
  secondaryContainerBackground: string;
  switchedSecondaryContainerBackground: string;
  headerIconColors: string;
  messageContainer: string;
  view: string;
  bottomSheetBg: string;
  primaryButton: string;
  secondaryTextInput: string;
  secondaryBorderColor: string;
  errorText: string;
  textMessage: string;
  aiTextMessage: string;
  mirageChatMainColor: string;
  categoryButton: string;
  movieBox: string;
}

export const lightModeTheme: Theme = {
  primary: "#f0f3f7",
  secondary: "#01152a",
  borderColor: "rgba(37,38,38,0.76)",
  text: "#000000",
  navigatorColor: "#f0f3f7",
  modalColor: "rgba(241,236,236,0.75)",
  secondaryContainerBackground: "rgba(250,250,250,0.75)",
  switchedSecondaryContainerBackground: "rgb(37,38,38)",
  headerIconColors: "rgba(3,4,21, .7)",
  messageContainer: "#e1e4e7",
  view: "#dfe3e8",
  bottomSheetBg: "rgba(255,255,255,0.6)",
  placeholder: "rgba(0, 0, 0, .6)",
  primaryButton: "#01152a",
  secondaryTextInput: "rgba(255,255,255, 1)",
  secondaryBorderColor: "rgba(0,0,0,.2)",
  errorText: 'rgb(110,0,0)',
  textMessage: "transparent",//"rgba(0,0,0, .1)",
  aiTextMessage: "rgba(0,0,0,.2)",
  mirageChatMainColor: "rgba(1,21,42,0.42)",
  categoryButton: "rgba(0,0,0,0.76)",
  movieBox: "rgba(0,0,0,0.76)"
}

export const darkModeTheme: Theme = {
  primary: "rgb(24,24,24)",
  secondary: "#d6d9da",
  borderColor: "rgba(241,236,236,0.75)",
  text: "rgb(255,255,255)",
  navigatorColor: "#f0f3f7",
  modalColor: "rgba(37,38,38,0.76)",
  secondaryContainerBackground: "rgba(255,255,255,0.2)",
  switchedSecondaryContainerBackground: "rgb(24,24,24)",
  headerIconColors: "rgb(255,255,255)",
  messageContainer: "rgba(164,163,163,0.7)",
  view: "rgba(66,66,66,0.1)",
  bottomSheetBg: "rgba(189,189,189,0.24)",
  placeholder: "rgba(255, 255, 255, .6)",
  primaryButton: "#232f44",
  secondaryTextInput: "rgba(255,255,255, .6)",
  secondaryBorderColor: "rgba(255,255,255, .6)",
  errorText: 'rgb(148,27,27)',
  textMessage: "transparent", //"rgba(255,255,255, .1)", //"rgba(35,47,68,0.76)", //"rgba(255,255,255,0.44)",
  aiTextMessage: "rgba(215,215,215,0.2)",
  mirageChatMainColor: "rgba(255,255,255, .6)",
  categoryButton: "rgba(255,255,255,0.1)",
  movieBox: "rgba(0,0,0,0.76)",

}

export interface ThemeContextType {
  customTheme: Theme;
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkmode: false,
  setDarkmode: (() => {}) as Dispatch<SetStateAction<boolean>>,

  toggleTheme: (() => {}),

  customTheme: lightModeTheme
});