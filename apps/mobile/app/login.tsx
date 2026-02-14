import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  function handleLogin() {
    login();
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/prefeitura_salvador.jpg')}
          style={styles.prefeituraIcon}
        />
        <Text style={styles.title}>Caderneta Digital</Text>
        <Text style={styles.subtitle}>Programa Mãe Salvador</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Acesse sua caderneta da gestante digital com segurança.
        </Text>

        <TouchableOpacity style={styles.govBrButton} onPress={handleLogin} activeOpacity={0.8}>
          <FontAwesome name="sign-in" size={18} color="#fff" />
          <Text style={styles.govBrText}>Entrar com GOV.BR</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Demonstração — toque para entrar
        </Text>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={() => router.push('/cadastro')} activeOpacity={0.7}>
          <Text style={styles.registerLink}>Primeiro acesso? <Text style={{ fontWeight: '700' }}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>MVP · v0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  prefeituraIcon: { width: 200, height: 200, borderRadius: 24, marginBottom: 16, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  title: { fontSize: 24, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  card: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340, alignItems: 'center' },
  cardText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  govBrButton: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1351B4', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, width: '100%', justifyContent: 'center' },
  govBrText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  hint: { fontSize: 11, color: Colors.textMuted, marginTop: 12 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20, width: '100%' },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontSize: 12, color: Colors.textMuted },
  registerLink: { fontSize: 14, color: Colors.primary, textAlign: 'center', marginTop: 16 },
  footer: { fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 32 },
});
