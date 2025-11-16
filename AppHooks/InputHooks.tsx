
import {useState} from "react";
import {DocumentPickerResult} from "expo-document-picker";
import {ImagePickerResult} from "expo-image-picker";

// AlreadyRunning Hook

export function useAlreadyRunning() {
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);
  const updateAlreadyRunning = (value:boolean) => {
    setAlreadyRunning(value);
  }

  return {alreadyRunning, setAlreadyRunning, updateAlreadyRunning};
}


export function usePickedImage() {
  const [pickedImage, setPickedImage] = useState<ImagePickerResult | undefined>(undefined);

  const updatePickedImage = (image: ImagePickerResult | undefined) => {
    setPickedImage(image);
  }

  return { pickedImage, updatePickedImage };
}

export function useDoc() {
  const [doc, setDoc] = useState<DocumentPickerResult | undefined>(undefined);

  const updateDoc = (doc: DocumentPickerResult | undefined) => {
    setDoc(doc);
  }

  return { doc, updateDoc };
}

export function useMessageIndex() {
  const [messageIndex, setMessageIndex] = useState(0);

  return { messageIndex, setMessageIndex };
}

export function useInput() {
  const [input, setInput] = useState("");
  return { input, setInput };
}


export function useMessagesLeft() {
  const [messagesLeft, setMessagesLeft] = useState("");

  return { messagesLeft, setMessagesLeft };
}

export function useMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  return { messages, setMessages };
}

export function useMessageBreakOption() {
  const [messageBreakOption, setMessageBreakOption] = useState(false);

  return { messageBreakOption, setMessageBreakOption };
}

export function useTyping() {
  const [typing, setTyping] = useState(false); // typing indicator

  return { typing, setTyping };
}

export function useCurrentRecording() {
  const [currentRecording, setCurrentRecording] = useState(false);

  return { currentRecording, setCurrentRecording };
}

export function useCameraVisible() {
  const [cameraVisible, setCameraVisible] = useState(false);

  return { cameraVisible, setCameraVisible };
}