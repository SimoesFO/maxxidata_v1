import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listItemImgText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  listItemContainer: {
    marginLeft: 20,
  },

  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000",
  },

  listItemSubtitle: {
    color: theme.colors.text,
  },

  listLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 5,
  },
});