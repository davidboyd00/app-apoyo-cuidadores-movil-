import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/providers/auth-provider";

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert("Falta información", "Ingresa tu correo y contraseña.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Contraseña débil", "Mínimo 8 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      Alert.alert(
        "Cuenta creada",
        "Revisa tu correo para confirmar la cuenta antes de iniciar sesión."
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      Alert.alert("No se pudo registrar", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ThemedText type="title" style={styles.title}>
          Crear cuenta
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Te vamos a pedir aceptar la política de privacidad al entrar.
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
            autoComplete="new-password"
            secureTextEntry
            placeholder="contraseña (mínimo 8)"
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
              {loading ? "Creando..." : "Registrarme"}
            </ThemedText>
          </Pressable>

          <Link href="/(auth)/sign-in" asChild>
            <Pressable>
              <ThemedText type="link">¿Ya tienes cuenta? Entrar</ThemedText>
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
