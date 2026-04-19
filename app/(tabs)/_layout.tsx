import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      {/* 1. Tu grupo principal de Tabs */}
      <Stack.Screen name="(tabs)" />
      
      {/* 2. Tu pantalla de bienvenida (WelcomeScreen) */}
      <Stack.Screen name="index" />
      
      {/* 3. NUEVO: La terminal de comandos configurada como Modal */}
      <Stack.Screen 
        name="add" 
        options={{ 
          presentation: 'modal', 
          animation: 'slide_from_bottom' // Esto le da el efecto de deslizarse hacia arriba
        }} 
      />
      
    </Stack>
  );
}