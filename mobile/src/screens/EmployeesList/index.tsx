import React, { useState } from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, Text, View } from 'react-native';
import { HandlerStateChangeEvent, LongPressGestureHandler, LongPressGestureHandlerEventPayload, RectButton, State } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { container } from '../../global/styles/theme';
import api from '../../services/api';
import { styles } from './styles';


type TypeOccupation = {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}


type TypeEmployees = {
  id: string;
  name: string;
  phone: string;
  email: string;
  situation: boolean;
  occupation: TypeOccupation;
  createdAt: Date;
  updatedAt: Date;
}


type TypeLongPress = {
  event: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>;
  id: string;
}


export function EmployeesList() {

  const navigation = useNavigation();
  const [employees, setEmployees] = useState<TypeEmployees[]>([]);


  useFocusEffect(() => {
    api.get('employees')
      .then(res => {
        setEmployees(res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  });


  function goBack() {
    navigation.goBack();
  }


  function redirectToEmployee(id?: string) {
    navigation.navigate('Employee', { id });
  }


  function onLongPress({ event, id }: TypeLongPress) {
    if (event.nativeEvent.state === State.ACTIVE) {
      let title = "Remover";
      let message = "Deseja realmente remover o item selecionado?";

      Alert.alert(title, message, [
        { text: "Sim", onPress: () => removerItem(id) },
        { text: "Não" }
      ]
      );
    }
  }


  async function removerItem(id: string) {
    api.delete(`employees/${id}`)
      .then(res => {
        api.get('employees')
          .then(res => {
            let title = 'Solicitação Concluída!';
            let message = 'Item removido com sucesso.';

            Alert.alert(title, message, [
              { text: "OK" } 
            ]);

            setEmployees(res.data.data);
          });
      });
  }
  

  return (
    <View style={container.main}>

      <Header title={'Profissionais'} showBack={true} goTo={'Employee'} />
      
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LongPressGestureHandler
            onHandlerStateChange={ (event) => onLongPress({ event, id: item.id }) }
            minDurationMs={800}
          >
            <RectButton onPress={ () => redirectToEmployee( item.id ) }>
              <View style={styles.listItem}>
                <View style={styles.listItemImgText}>
                  <FontAwesome5 name="user-tie" size={50} color={'#000'} />
                  <View style={styles.listItemContainer}>
                    <Text style={styles.listItemTitle}>{ item.name }</Text>
                    <Text style={styles.listItemSubtitle}>{ item.occupation?.description }</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={16} color={'#000'} />
              </View>

              <View style={styles.listLine} />

            </RectButton>
          </LongPressGestureHandler>
        )} />
    </View>
  );
}