import { StatusBar } from 'expo-status-bar';
import UserProfile from './screens/UserProfile';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#4abd77',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <UserProfile />
    </PaperProvider>
  );
}
