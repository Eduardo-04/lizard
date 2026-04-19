import React from 'react';
import {
  View, Text, ScrollView,
  StatusBar, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// --- MOCK DATA ---
const USER = {
  username: 'eduardo.04',
  handle: '@eduardo',
};

const STATS = [
  { label: 'ÁLBUMES', count: 12, glyph: '音' },
  { label: 'FILMS',   count: 8,  glyph: '映' },
  { label: 'JUEGOS',  count: 5,  glyph: '遊' },
  { label: 'LIBROS',  count: 3,  glyph: '読' },
];

const FEED = [
  {
    id: '1',
    user: 'carlos.mx',
    action: 'calificó',
    media: 'Berserk Vol. 1',
    type: 'TEXT',
    rating: 5,
    time: 'hace 2 min',
    cover: 'https://picsum.photos/seed/berserk/80/80',
  },
  {
    id: '2',
    user: 'ana.films',
    action: 'reseñó',
    media: 'Chainsaw Man',
    type: 'VISUAL',
    rating: 4,
    time: 'hace 14 min',
    cover: 'https://picsum.photos/seed/chainsaw/80/80',
  },
  {
    id: '3',
    user: 'mk.audio',
    action: 'calificó',
    media: 'Madvillainy',
    type: 'AUDIO',
    rating: 5,
    time: 'hace 1 h',
    cover: 'https://picsum.photos/seed/madvillainy/80/80',
  },
  {
    id: '4',
    user: 'jorge.dev',
    action: 'calificó',
    media: 'Sekiro',
    type: 'INTERACT',
    rating: 4,
    time: 'hace 2 h',
    cover: 'https://picsum.photos/seed/sekiro/80/80',
  },
  {
    id: '5',
    user: 'sofia.reads',
    action: 'reseñó',
    media: 'Blame! Vol. 2',
    type: 'TEXT',
    rating: 5,
    time: 'hace 3 h',
    cover: 'https://picsum.photos/seed/blame/80/80',
  },
];

const TYPE_COLOR: Record<string, string> = {
  AUDIO:    '#00d9ff',
  VISUAL:   '#ff2147',
  INTERACT: '#a855f7',
  TEXT:     '#f59e0b',
};

function Stars({ count }: { count: number }) {
  return (
    <View style={s.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={[s.star, { color: i <= count ? '#f59e0b' : '#27272a' }]}>
          ★
        </Text>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >

        {/* TOPBAR */}
        <View style={s.topbar}>
          <View>
            <Text style={s.greeting}>Bienvenido de vuelta</Text>
            <Text style={s.username}>{USER.username}</Text>
          </View>
          <TouchableOpacity
            style={s.avatar}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <Text style={s.avatarText}>E</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={s.statsContainer}>
          {STATS.map((item) => (
            <View key={item.label} style={s.statCard}>
              <Text style={s.statGlyph}>{item.glyph}</Text>
              <Text style={s.statCount}>{item.count}</Text>
              <Text style={s.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* SECTION HEADER */}
        <View style={s.sectionHeader}>
          <View style={s.sectionDot} />
          <Text style={s.sectionTitle}>ACTIVIDAD RECIENTE</Text>
        </View>

        {/* FEED */}
        {FEED.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.7} style={s.feedItem}>
            <Image
              source={{ uri: item.cover }}
              style={s.cover}
            />
            <View style={s.feedInfo}>
              <View style={s.feedTopRow}>
                <Text style={s.feedUser}>{item.user}</Text>
                <Text style={[s.feedType, { color: TYPE_COLOR[item.type] }]}>
                  {item.type}
                </Text>
              </View>
              <Text style={s.feedMedia} numberOfLines={1}>
                {item.action} <Text style={s.feedMediaBold}>{item.media}</Text>
              </Text>
              <View style={s.feedBottom}>
                <Stars count={item.rating} />
                <Text style={s.feedTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:          { flex: 1, backgroundColor: '#000' },
  content:       { paddingTop: 20, paddingBottom: 80 },

  // TOPBAR
  topbar:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 28 },
  greeting:      { color: '#52525b', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 },
  username:      { color: '#f4f4f5', fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
  avatar:        { width: 40, height: 40, borderRadius: 20, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  avatarText:    { color: '#f4f4f5', fontWeight: '900', fontSize: 16 },

  // STATS
  statsContainer: { flexDirection: 'row', paddingHorizontal: 24, justifyContent: 'space-between', marginBottom: 36 },
  statCard:       { width: '23%', backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', padding: 12, alignItems: 'center' },
  statGlyph:      { color: '#27272a', fontSize: 22, fontWeight: '900', marginBottom: 4 },
  statCount:      { color: '#f4f4f5', fontSize: 22, fontWeight: '900', letterSpacing: -1 },
  statLabel:      { color: '#52525b', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },

  // SECTION HEADER
  sectionHeader:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionDot:     { width: 5, height: 5, borderRadius: 3, backgroundColor: '#ff2147', marginRight: 10 },
  sectionTitle:   { color: '#52525b', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase' },

  // FEED
  feedItem:       { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#18181b' },
  cover:          { width: 52, height: 52, backgroundColor: '#18181b', marginRight: 14 },
  feedInfo:       { flex: 1, justifyContent: 'space-between' },
  feedTopRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  feedUser:       { color: '#a1a1aa', fontSize: 12, fontWeight: '700' },
  feedType:       { fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: '700' },
  feedMedia:      { color: '#71717a', fontSize: 13, marginBottom: 6 },
  feedMediaBold:  { color: '#f4f4f5', fontWeight: '700' },
  feedBottom:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stars:          { flexDirection: 'row', gap: 2 },
  star:           { fontSize: 12 },
  feedTime:       { color: '#3f3f46', fontSize: 10, letterSpacing: 1 },
});