import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { ButtonAdd } from '../ButtonAdd';
import { ButtonBack } from '../ButtonBack';

type HeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  goTo?: string;
}

export function Header({ title, subtitle, showBack = false, goTo }: HeaderProps) {
  const navigation = useNavigation();
  
  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.header}>
      <ButtonBack showBack={showBack} />

      <View>
        <Text style={styles.title}>{ title }</Text>
        { subtitle ? <Text style={styles.subtitle}>{ subtitle }</Text> : null }
      </View>
      
      <ButtonAdd goTo={goTo} />
    </View>
  )
}