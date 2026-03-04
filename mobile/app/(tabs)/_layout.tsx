import { Tabs } from 'expo-router';
import { House, CircleUserRound, ShoppingCart, Heart , Baby } from 'lucide-react-native';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useTheme } from '@/ThemeContext';
import { useMenu } from '@/MenuContext';
import Menu from '@/components/Menu';
import { usePathname } from "expo-router";
import { useEffect } from 'react';

export default function TabsLayout() {

  const { theme } = useTheme();
  const {  setMenuOpen } = useMenu();
  const pathname = usePathname();
  
  useEffect(() => {
    setMenuOpen(false);
  } , [pathname])
  return (
    <View className='relative' style={{ flex: 1, backgroundColor: theme.background }}>

        <Menu />

      <SafeAreaView edges={['top']} style={{ backgroundColor: theme.background }}>
        <Header  />
      </SafeAreaView>


      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: theme.background
            }
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => <House size={20} color={color} />,
            }}
          />

          <Tabs.Screen
            name="cart"
            options={{
              tabBarIcon: ({ color }) => <ShoppingCart size={20} color={color} />,
            }}
          />

          <Tabs.Screen
            name="fav"
            options={{
              tabBarIcon: ({ color }) => <Heart size={20} color={color} />,
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ color }) => <CircleUserRound size={20} color={color} />,
            }}
          />

          <Tabs.Screen
            name="cats"
            options={{
                href: null
            }}
          />

          <Tabs.Screen
            name="search"
            options={{
                href: null
            }}
          />



          



        </Tabs>
      </View>

    </View>
  );
}