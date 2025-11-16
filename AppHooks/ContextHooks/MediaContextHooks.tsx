import {useDoc, usePickedImage, useCameraVisible} from "../InputHooks";

export const useMediaContextHooks = () => {
  const {pickedImage, updatePickedImage} = usePickedImage();
  const {doc, updateDoc} = useDoc();
  const {cameraVisible, setCameraVisible} = useCameraVisible();
  return {
    doc, updateDoc,
    pickedImage, updatePickedImage,
    cameraVisible, setCameraVisible,
  }
}