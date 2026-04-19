import React from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const categories = [
  { num: '01', title: 'AUDIO',    glyph: '音' },
  { num: '02', title: 'VISUAL',   glyph: '映' },
  { num: '03', title: 'INTERACT', glyph: '遊' },
  { num: '04', title: 'TEXT',     glyph: '読' },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.pill}>
            <View style={s.dot} />
            <Text style={s.pillText}>SYSTEM ONLINE</Text>
          </View>
          <Text style={s.logo}>LIZARD</Text>
          <View style={s.divider} />
          <Text style={s.tagline}>Track. Rate. Discover.</Text>
        </View>

        {/* GRID */}
        <View style={s.grid}>
          {categories.map((item) => (
            <View key={item.num} style={s.card}>
              <Text style={s.glyph}>{item.glyph}</Text>
              <Text style={s.num}>[{item.num}]</Text>
              <Text style={s.title}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* BOTONES */}
        <View style={s.buttons}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={s.btnPrimary}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={s.btnPrimaryText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={s.btnSecondary}
            onPress={() => router.push('/home')}
          >
            <Text style={s.btnSecondaryText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.footer}>LIZARD // 2026</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:             { flex: 1, backgroundColor: '#000' },
  content:          { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 56 },

  // HEADER
  header:           { marginBottom: 40 },
  pill:             { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dot:              { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ff2147', marginRight: 10 },
  pillText:         { color: '#52525b', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase' },
  logo:             { color: '#f4f4f5', fontSize: 72, fontWeight: '900', letterSpacing: -4, lineHeight: 68, marginBottom: 16 },
  divider:          { height: 2, width: 56, backgroundColor: '#f4f4f5', marginBottom: 16 },
  tagline:          { color: '#71717a', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' },

  // GRID
  grid:             { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 40 },
  card:             { width: '48%', aspectRatio: 1, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', padding: 16, marginBottom: '4%', justifyContent: 'flex-end', overflow: 'hidden' },
  glyph:            { position: 'absolute', right: -6, top: -8, fontSize: 100, fontWeight: '900', color: '#18181b' },
  num:              { color: '#ff2147', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 },
  title:            { color: '#f4f4f5', fontSize: 22, fontWeight: '900', letterSpacing: -1 },

  // BOTONES
  buttons:          { gap: 10, marginBottom: 48 },
  btnPrimary:       { backgroundColor: '#f4f4f5', paddingVertical: 18, alignItems: 'center' },
  btnPrimaryText:   { color: '#000', fontWeight: '900', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase' },
  btnSecondary:     { borderWidth: 1, borderColor: '#27272a', paddingVertical: 18, alignItems: 'center' },
  btnSecondaryText: { color: '#71717a', fontWeight: '700', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase' },

  // FOOTER
  footer:           { color: '#27272a', fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center' },
});