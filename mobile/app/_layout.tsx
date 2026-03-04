import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/ThemeContext';
import '@/global.css'
import { MenuProvider } from '@/MenuContext'


function RootLayout() {
  const { theme } = useTheme();

  
  return (
    <>
      <StatusBar style={theme.headcolor} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <MenuProvider>

        <RootLayout />
      </MenuProvider>
    </ThemeProvider>
  );
}