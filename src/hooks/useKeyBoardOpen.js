import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  function onKeyboardDidShow(e) { // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height);
    setIsKeyboardOpen(true);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
    setIsKeyboardOpen(false);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { keyboardHeight, isKeyboardOpen};
};

export default useKeyboard;
