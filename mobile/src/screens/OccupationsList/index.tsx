import React, { useState } from 'react';
import { Feather, Octicons } from '@expo/vector-icons';
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


type TypeLongPress = {
  event: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>;
  id: string;
}


export function OccupationsList() {

  const navigation = useNavigation();
  const [occupations, setOccupations] = useState<TypeOccupation[]>([]);


  useFocusEffect(() => {
    api.get('occupations')
      .then(res => {
        setOccupations(res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  });


  function goBack() {
    navigation.goBack();
  }


  function redirectToOccupation(id?: string) {
    navigation.navigate('Occupation', { id });
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
    api.delete(`occupations/${id}`)
      .then(res => {
        api.get('occupations')
          .then(res => {
            let title = 'Solicitação Concluída!';
            let message = 'Item removido com sucesso.';

            Alert.alert(title, message, [
              { text: "OK" } 
            ]);

            setOccupations(res.data.data);
          });
      });
  }


  return (
    <View style={container.main}>

      <Header title={'Profissões'} showBack={true} goTo={'Occupation'} />
      
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={occupations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LongPressGestureHandler
            onHandlerStateChange={ (event) => onLongPress({ event, id: item.id }) }
            minDurationMs={800}
          >
            <RectButton onPress={ () => redirectToOccupation( item.id ) }>
              <View style={styles.listItem}>
                <View style={styles.listItemImgText}>
                  <Octicons name="briefcase" size={50} color={'#000'} />
                  <View style={styles.listItemContainer}>
                    <Text style={styles.listItemTitle}>{item.description}</Text>
                    <Text style={styles.listItemSubtitle}>{item.situation ? 'Ativa' : 'Inativa'}</Text>
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