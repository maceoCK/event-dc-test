import { BundleInspector } from '../.rorkai/inspector';
import { RorkErrorBoundary } from '../.rorkai/rork-error-boundary';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "@/hooks/auth-store";
import { ConferenceContext } from "@/hooks/conference-store";
import { ItineraryContext } from "@/hooks/itinerary-store";
import colors from "@/constants/colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        color: colors.text,
        fontWeight: '600',
      },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="conferences" options={{ headerShown: false }} />
      <Stack.Screen name="event/[id]" options={{ title: "Event Details" }} />
      <Stack.Screen name="location/[id]" options={{ title: "Location Details" }} />
      <Stack.Screen name="business/[id]" options={{ title: "Business Details" }} />
      <Stack.Screen name="announcement/[id]" options={{ title: "Announcement" }} />
      <Stack.Screen name="social/[id]" options={{ title: "Social Post" }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <ConferenceContext>
          <ItineraryContext>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
              <StatusBar style="light" backgroundColor={colors.background} />
              <BundleInspector><RorkErrorBoundary><RootLayoutNav /></RorkErrorBoundary></BundleInspector>
            </GestureHandlerRootView>
          </ItineraryContext>
        </ConferenceContext>
      </AuthContext>
    </QueryClientProvider>
  );
}