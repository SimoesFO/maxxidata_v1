import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.title,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  }
});