import React from 'react';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { container } from '../../global/styles/theme';
import { styles } from './styles';


export function Main() {
  const navigation = useNavigation();


  function redirectTo(route: string) {
    navigation.navigate(route);
  }
  

  return (
    <View style={container.main}>
      <Header title={'Processo Seletivo MaxxiData'} />

      <View style={styles.viewText}>
        <Text style={styles.text}>Este app foi desenvolvido como parte do processo seletivo da empresa MaxxiData</Text>
      </View>

      <View style={styles.containerButtons}>
        <RectButton style={styles.buttons}  onPress={ () => redirectTo('EmployeesList') }>
          <FontAwesome5 name="users" size={60} color={'#FFF'} />
          <Text style={styles.textButtons}>Profissionais</Text>
        </RectButton>
        
        <RectButton style={styles.buttons} onPress={ () => redirectTo('OccupationsList') }>
          <Octicons name="briefcase" size={65} color={'#FFF'} />
          <Text style={styles.textButtons}>Profissões</Text>
        </RectButton>
      </View>
    </View>
  );
}