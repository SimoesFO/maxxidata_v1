import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Alert, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { container } from '../../global/styles/theme';
import api from '../../services/api';
import { styles } from './styles';


type OccupationIdParams = {
  id: string;
}


export function Occupation() {

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OccupationIdParams ?? '';

  const [description, setDescription] = useState('');
  const [situation, setSituation] = useState(true);


  useEffect(() =>  {
    if(id) {
      api.get(`occupations/${id}`).then(res => {
        setDescription(res.data.description);
        setSituation(res.data.situation);
      });
    }
  }, [id]);


  function goBack() {
    navigation.goBack();
  }


  function handleSave() {
    if(id) {
      update();
      return;
    }

    save();
  }


  async function save() {
    const data = {
      description,
      situation,
    };

    await api.post('occupations', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleError(error);
      });
  }


  async function update() {
    const data = {
      id,
      description,
      situation,
    }
    
    await api.put(`occupations/${id}`, data)
      .then(res => handleSuccess('Cadastro atualizado com sucesso!'))
      .catch(error => {
        handleError(error);
      });
  }


  async function handleSuccess(message: string) {
    let title = 'Sucesso!';

    Alert.alert(title, message, [{ 
        text: "OK", 
        onPress: () => goBack()
      }]
    );
  }


  async function handleError(error: AxiosError) {
    const errorsAll = error.response?.data?.errors;
    const errorsData = Object.values(errorsAll);
    let message = errorsData.join('\n');

    let title = 'Solicitação não realizada!';
    Alert.alert(title, message, [{ 
        text: "OK"
      }]
    );
  }


  return (
    <View style={container.main}>
      <Header title={'Profissões'} subtitle={'Cadastro'} showBack={true} />

      <ScrollView>

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={ description }
          onChangeText={ setDescription }
        />

        <View style={styles.switchContainer}>
        <Text style={styles.label}>Indique o status desta profissão:</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={ situation }
          onValueChange={ setSituation }
        />
      </View>

        <RectButton style={styles.nextButton} onPress={handleSave}>
          <Text style={styles.nextButtonText}>Salvar</Text>
        </RectButton>
      </ScrollView>
    </View>
  )
}