import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Colors from '@/constants/Colors';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: '(tabs)' };

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: Colors.primary, background: Colors.background, card: Colors.card, text: Colors.text, border: Colors.border },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="dados" options={{ title: 'Meus Dados', headerTintColor: Colors.primary }} />
        <Stack.Screen name="consultas" options={{ title: 'Consultas', headerTintColor: Colors.primary }} />
        <Stack.Screen name="exames" options={{ title: 'Exames', headerTintColor: Colors.primary }} />
        <Stack.Screen name="vacinas" options={{ title: 'Vacinas', headerTintColor: Colors.primary }} />
        <Stack.Screen name="medicacoes" options={{ title: 'Medicações', headerTintColor: Colors.primary }} />
        <Stack.Screen name="cartao" options={{ title: 'Cartão Mãe Salvador', headerTintColor: Colors.primary }} />
        <Stack.Screen name="orientacoes" options={{ title: 'Orientações', headerTintColor: Colors.primary }} />
        <Stack.Screen name="orientacao-detalhe" options={{ title: 'Orientação', headerTintColor: Colors.primary }} />
      </Stack>
    </ThemeProvider>
  );
}
