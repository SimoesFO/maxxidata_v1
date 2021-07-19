import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Alert, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { container } from '../../global/styles/theme';
import api from '../../services/api';
import { styles } from './styles';


type TypeOccupation = {
  id: string;
  description: string;
  situation: boolean;
  created_at: Date;
  updated_at: Date;
}

type EmployeeIdParams = {
  id: string;
}

type TypeOccupation2 = {
  label: string;
  value: string;
}

export function Employee() {

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as EmployeeIdParams ?? '';

  const [occupations, setOccupations] = useState<TypeOccupation[]>([]);
  const [occupationId, setOccupationId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [situation, setSituation] = useState(true);

  
  useEffect(() => {
    api.get(`occupations`)
      .then(res => {
        setOccupations(res.data.data)
      });
  }, []);


  useEffect(() =>  {
    if(id) {
      api.get(`employees/${id}`)
        .then(res => {
          setName(res.data.name);
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setSituation(res.data.situation);
          setOccupationId(res.data.occupation.id)
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
      name,
      phone,
      email,
      occupationId,
      situation,
    };

    await api.post('employees', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleError(error);
      });
  }


  async function update() {

    const data = {
      id,
      name,
      phone,
      email,
      occupationId,
      situation,
    }
    
    await api.put(`employees/${id}`, data)
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
      <Header title={'Profissionais'} subtitle={'Cadastro'} showBack={true} />

      <ScrollView>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={ name }
          onChangeText={ setName }
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          value={ phone }
          onChangeText={ setPhone }
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          value={ email }
          onChangeText={ setEmail }
        />

        <Text style={styles.label}>Profissão:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={occupationId}
            onValueChange={(item) => setOccupationId(item)}
            >
            <Picker.Item style={styles.itemPicker} label={"Escolhar uma profissão..."} value="" />
            {
              occupations.map(occupation => {
                return <Picker.Item label={occupation.description} value={occupation.id} key={occupation.id} />
              })
            }
          </Picker>
        </View>

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