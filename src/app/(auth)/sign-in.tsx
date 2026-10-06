import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/providers/auth-provider";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert("Falta información", "Ingresa tu correo y contraseña.");
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      Alert.alert("No se pudo iniciar sesión", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ThemedText type="title" style={styles.title}>
          Entrar
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Usa tu correo del grupo de cuidado.
        </ThemedText>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            placeholder="correo@ejemplo.cl"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            secureTextEntry
            placeholder="contraseña"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Pressable
            disabled={loading}
            onPress={onSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || loading) && styles.primaryButtonPressed,
            ]}
          >
            <ThemedText style={styles.primaryButtonText}>
              {loading ? "Entrando..." : "Entrar"}
            </ThemedText>
          </Pressable>

          <Link href="/(auth)/sign-up" asChild>
            <Pressable>
              <ThemedText type="link">¿No tienes cuenta? Regístrate</ThemedText>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.three,
    justifyContent: "center",
  },
  title: { textAlign: "center" },
  form: { gap: Spacing.three, marginTop: Spacing.four },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: Spacing.three,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  primaryButton: {
    backgroundColor: "#0A84FF",
    padding: Spacing.three,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonPressed: { opacity: 0.7 },
  primaryButtonText: { color: "#FFF", fontWeight: "600" },
});
