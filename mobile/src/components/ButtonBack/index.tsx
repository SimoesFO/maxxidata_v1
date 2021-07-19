import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type ButtonBackProps = {
  showBack?: boolean;
}

export function ButtonBack({ showBack }: ButtonBackProps) {
  const navigation = useNavigation();
  
  function goBack() {
    navigation.goBack();
  }

  return (
    showBack 
    ? <RectButton style={styles.buttonBack} onPress={goBack}>
        <Feather name="chevron-left" size={18} color={'#000'} />
      </RectButton>
    : <View style={styles.viewBlank} />
  )
}