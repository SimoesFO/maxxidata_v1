import { StyleSheet } from 'react-native';


export const theme = {
  colors: {
    background: '#f2f3f4',
    title: '#5c8599',
    text: '#8fa7b3',
    button: '#15c3d6',
    textButton: '#FFF',
  }
}

export const container = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20
  },
})