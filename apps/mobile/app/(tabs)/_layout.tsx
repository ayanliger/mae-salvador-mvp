import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={22} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: { backgroundColor: Colors.card, borderTopColor: Colors.border, height: 60, paddingBottom: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: Colors.card },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Início', tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} /> }}
      />
      <Tabs.Screen
        name="caderneta"
        options={{ title: 'Caderneta', tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} /> }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{ title: 'Avisos', tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} /> }}
      />
    </Tabs>
  );
}
