import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (session && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [session, segments, loading, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryProvider>
        <AuthProvider>
          <RootStack />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
