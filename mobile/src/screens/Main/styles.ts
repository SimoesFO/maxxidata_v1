import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  viewText: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
  },

  text: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },

  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%'    
  },

  buttons: {
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: theme.colors.button,
    width: 150,
    height: 150,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 25,

  },

  textButtons: {
    color: theme.colors.textButton,
    fontWeight: 'bold',
    fontSize: 16,
  }
});