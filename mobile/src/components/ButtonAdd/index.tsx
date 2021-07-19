import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type buttonAddProps = {
  goTo?: string;
}

export function ButtonAdd({ goTo }: buttonAddProps) {
  const navigation = useNavigation();
  
  function redirectTo() {
    if(goTo) 
      navigation.navigate(goTo);
  }

  return (
    goTo 
    ? <RectButton style={styles.buttonAdd} onPress={ redirectTo }>
        <Feather name="plus" size={16} color={theme.colors.textButton} />
      </RectButton>
    : <View style={styles.viewBlank} />
  )
}