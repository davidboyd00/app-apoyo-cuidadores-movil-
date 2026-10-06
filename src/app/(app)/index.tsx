import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/providers/auth-provider";

export default function HomeScreen() {
  const { session, signOut } = useAuth();
  const email = session?.user?.email ?? "";

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ThemedText type="title">Hola</ThemedText>
        <ThemedText themeColor="textSecondary">{email}</ThemedText>

        <View style={styles.info}>
          <ThemedText>Semana 1: autenticación lista.</ThemedText>
          <ThemedText themeColor="textSecondary">
            Falta el gate de consentimiento, lista de pacientes y el resto del
            MVP (ver docs/ROADMAP.md).
          </ThemedText>
        </View>

        <Pressable onPress={signOut} style={styles.signOutButton}>
          <ThemedText style={styles.signOutText}>Cerrar sesión</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.three },
  info: { marginTop: Spacing.four, gap: Spacing.two },
  signOutButton: {
    marginTop: "auto",
    padding: Spacing.three,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    alignItems: "center",
  },
  signOutText: { fontWeight: "600" },
});
