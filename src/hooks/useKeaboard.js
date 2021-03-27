import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    Keyboard.addListener('keyboardWillHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsOpen(true);
  };

  const _keyboardDidHide = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
  };
};
