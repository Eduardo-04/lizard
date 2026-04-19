import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Unified Media Tracker</Text>
          <Text style={styles.logo}>LIZARD</Text>
          <View style={styles.divider} />
        </View>

        {/* TAGLINE */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            Registra. Califica. Descubre.{'\n'}
            Tu historial de medios, en un solo lugar.
          </Text>
        </View>

        {/* CATEGORÍAS */}
        <View style={styles.categoriesContainer}>
          {[
            { num: '01', title: 'Música',      sub: 'Álbumes · EPs · Artistas',       emoji: '🎵' },
            { num: '02', title: 'Películas',    sub: 'Films · Series · Documentales',  emoji: '🎬' },
            { num: '03', title: 'Videojuegos',  sub: 'Consola · PC · Mobile',          emoji: '🎮' },
            { num: '04', title: 'Libros',       sub: 'Novelas · Manga · Cómics',       emoji: '📖' },
          ].map((item) => (
            <View key={item.num} style={styles.card}>
              <View>
                <Text style={styles.cardNum}>{item.num}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
              </View>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
            </View>
          ))}
        </View>

        {/* BOTONES */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          LIZARD © 2025 — All media. One place.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: '#000000' },
  scroll:              { flex: 1 },
  scrollContent:       { paddingBottom: 40 },

  header:              { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
  subtitle:            { color: '#71717a', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 4 },
  logo:                { color: '#ffffff', fontSize: 52, fontWeight: '900', letterSpacing: -2 },
  divider:             { height: 2, backgroundColor: '#ffffff', marginTop: 12, width: 64 },

  taglineContainer:    { paddingHorizontal: 24, paddingBottom: 40 },
  tagline:             { color: '#a1a1aa', fontSize: 15, lineHeight: 24 },

  categoriesContainer: { paddingHorizontal: 24, gap: 12 },
  card:                { backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 2, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardNum:             { color: '#52525b', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 4 },
  cardTitle:           { color: '#ffffff', fontSize: 20, fontWeight: '700' },
  cardSub:             { color: '#52525b', fontSize: 11, marginTop: 4 },
  cardEmoji:           { fontSize: 36 },

  ctaContainer:        { paddingHorizontal: 24, marginTop: 40, gap: 12 },
  btnPrimary:          { backgroundColor: '#ffffff', paddingVertical: 16, alignItems: 'center', borderRadius: 2 },
  btnPrimaryText:      { color: '#000000', fontWeight: '900', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase' },
  btnSecondary:        { borderWidth: 1, borderColor: '#3f3f46', paddingVertical: 16, alignItems: 'center', borderRadius: 2 },
  btnSecondaryText:    { color: '#71717a', fontWeight: '700', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase' },

  footer:              { color: '#3f3f46', fontSize: 11, textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase', marginTop: 40, paddingHorizontal: 24 },
});