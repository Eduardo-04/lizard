import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const USER = {
  username: 'eduardo.04',
  handle: '@eduardo',
  bio: 'Manga, música rara y videojuegos difíciles.',
  following: 12,
  followers: 34,
};

const STATS = [
  { label: 'ÁLBUMES',  count: 12, glyph: '音', color: '#00d9ff' },
  { label: 'FILMS',    count: 8,  glyph: '映', color: '#ff2147' },
  { label: 'JUEGOS',   count: 5,  glyph: '遊', color: '#a855f7' },
  { label: 'LIBROS',   count: 3,  glyph: '読', color: '#f59e0b' },
];

const DIARY = [
  {
    month: 'ABRIL 2026',
    entries: [
      { id: '1', day: '18', title: 'Berserk Vol. 1',         type: 'TEXT',     rating: 5, cover: '読' },
      { id: '2', day: '17', title: 'Chainsaw Man',           type: 'VISUAL',   rating: 4, cover: '映' },
      { id: '3', day: '15', title: 'Madvillainy',            type: 'AUDIO',    rating: 5, cover: '音' },
    ],
  },
  {
    month: 'MARZO 2026',
    entries: [
      { id: '4', day: '30', title: 'Sekiro',                 type: 'INTERACT', rating: 5, cover: '遊' },
      { id: '5', day: '22', title: 'Blame! Vol. 2',          type: 'TEXT',     rating: 5, cover: '読' },
      { id: '6', day: '14', title: 'Tame Impala — Currents', type: 'AUDIO',    rating: 4, cover: '音' },
      { id: '7', day: '05', title: 'Dune Part Two',          type: 'VISUAL',   rating: 4, cover: '映' },
    ],
  },
];

const TYPE_COLOR: Record<string, string> = {
  AUDIO:    '#00d9ff',
  VISUAL:   '#ff2147',
  INTERACT: '#a855f7',
  TEXT:     '#f59e0b',
};

const FILTERS = ['ALL', 'AUDIO', 'VISUAL', 'INTERACT', 'TEXT'];
const totalReviews = STATS.reduce((a, b) => a + b.count, 0);

function Stars({ count }: { count: number }) {
  return (
    <View style={s.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={[s.star, { color: i <= count ? '#f59e0b' : '#27272a' }]}>★</Text>
      ))}
    </View>
  );
}

export default function ProfileScreen() {
  const [filter, setFilter] = useState('ALL');

  const filteredDiary = DIARY.map(section => ({
    ...section,
    entries: filter === 'ALL'
      ? section.entries
      : section.entries.filter(e => e.type === filter),
  })).filter(section => section.entries.length > 0);

  return (
    <SafeAreaView style={s.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* TOPBAR */}
        <View style={s.topbar}>
          <Text style={s.topbarLabel}>PERFIL</Text>
          <TouchableOpacity
            style={s.settingsBtn}
            onPress={() => router.push('/settings')}
          >
            <Text style={s.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* HEADER CENTRADO */}
        <View style={s.profileHeader}>
          <View style={s.avatarWrap}>
            <View style={s.avatarInner}>
              <Text style={s.avatarLetter}>E</Text>
            </View>
            <View style={[s.corner, s.cornerTL]} />
            <View style={[s.corner, s.cornerTR]} />
            <View style={[s.corner, s.cornerBL]} />
            <View style={[s.corner, s.cornerBR]} />
          </View>

          <Text style={s.profileName}>{USER.username}</Text>
          <Text style={s.profileHandle}>{USER.handle}</Text>
          <Text style={s.profileBio}>{USER.bio}</Text>

          <View style={s.metaRow}>
            <View style={s.metaItem}>
              <Text style={s.metaCount}>{totalReviews}</Text>
              <Text style={s.metaLabel}>RESEÑAS</Text>
            </View>
            <Text style={s.metaDivider}>·</Text>
            <View style={s.metaItem}>
              <Text style={s.metaCount}>4.6</Text>
              <Text style={s.metaLabel}>PROM</Text>
            </View>
            <Text style={s.metaDivider}>·</Text>
            <View style={s.metaItem}>
              <Text style={s.metaCount}>{USER.following}</Text>
              <Text style={s.metaLabel}>SIGUIENDO</Text>
            </View>
            <Text style={s.metaDivider}>·</Text>
            <View style={s.metaItem}>
              <Text style={s.metaCount}>{USER.followers}</Text>
              <Text style={s.metaLabel}>SEGUIDORES</Text>
            </View>
          </View>
        </View>

        {/* COLECCIÓN */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>COLECCIÓN</Text>
        </View>
        <View style={s.statsGrid}>
          {STATS.map(item => (
            <View key={item.label} style={s.statCard}>
              <Text style={[s.statGlyph, { color: item.color }]}>{item.glyph}</Text>
              <Text style={s.statCount}>{item.count}</Text>
              <Text style={s.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* DIARIO */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>DIARIO</Text>
        </View>

        {/* FILTROS */}
        <View style={s.filtersOuter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.filtersContent}
          >
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[s.filterBtn, filter === f && s.filterBtnActive]}
              >
                <Text style={[s.filterText, filter === f && s.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={[s.fadeEdge, s.fadeLeft]}  pointerEvents="none" />
          <View style={[s.fadeEdge, s.fadeRight]} pointerEvents="none" />
        </View>

        {/* ENTRIES */}
        {filteredDiary.map(section => (
          <View key={section.month}>
            <Text style={s.monthLabel}>{section.month}</Text>
            {section.entries.map(entry => (
              <TouchableOpacity key={entry.id} activeOpacity={0.7} style={s.entry}>
                <View style={s.entryDate}>
                  <Text style={s.entryDay}>{entry.day}</Text>
                </View>
                <View style={s.entryCover}>
                  <Text style={s.entryCoverGlyph}>{entry.cover}</Text>
                </View>
                <View style={s.entryInfo}>
                  <Text style={[s.entryType, { color: TYPE_COLOR[entry.type] }]}>{entry.type}</Text>
                  <Text style={s.entryTitle} numberOfLines={1}>{entry.title}</Text>
                  <Stars count={entry.rating} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={s.logoutBtn}>
          <Text style={s.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const CORNER_SIZE = 10;

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#000' },
  content: { paddingBottom: 120 },

  topbar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, marginBottom: 32 },
  topbarLabel:  { color: '#f4f4f5', fontSize: 11, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase' },
  settingsBtn:  { width: 36, height: 36, borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  settingsIcon: { color: '#52525b', fontSize: 16 },

  profileHeader: { alignItems: 'center', paddingHorizontal: 24, marginBottom: 40 },
  avatarWrap:    { width: 88, height: 88, marginBottom: 20, position: 'relative' },
  avatarInner:   { width: 88, height: 88, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  avatarLetter:  { color: '#f4f4f5', fontSize: 40, fontWeight: '900' },

  corner:   { position: 'absolute', width: CORNER_SIZE, height: CORNER_SIZE },
  cornerTL: { top: -3,    left: -3,  borderTopWidth: 2,    borderLeftWidth: 2,  borderColor: '#ff2147' },
  cornerTR: { top: -3,    right: -3, borderTopWidth: 2,    borderRightWidth: 2, borderColor: '#ff2147' },
  cornerBL: { bottom: -3, left: -3,  borderBottomWidth: 2, borderLeftWidth: 2,  borderColor: '#ff2147' },
  cornerBR: { bottom: -3, right: -3, borderBottomWidth: 2, borderRightWidth: 2, borderColor: '#ff2147' },

  profileName:   { color: '#f4f4f5', fontSize: 22, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
  profileHandle: { color: '#3f3f46', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  profileBio:    { color: '#52525b', fontSize: 12, lineHeight: 18, textAlign: 'center', marginBottom: 24 },

  metaRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  metaItem:    { alignItems: 'center' },
  metaCount:   { color: '#f4f4f5', fontSize: 16, fontWeight: '900' },
  metaLabel:   { color: '#3f3f46', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  metaDivider: { color: '#27272a', fontSize: 18, marginBottom: 8 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  dot:           { width: 5, height: 5, borderRadius: 3, backgroundColor: '#ff2147', marginRight: 10 },
  sectionTitle:  { color: '#52525b', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },

  statsGrid: { flexDirection: 'row', paddingHorizontal: 24, gap: 8, marginBottom: 36 },
  statCard:  { flex: 1, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', paddingVertical: 12, alignItems: 'center' },
  statGlyph: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  statCount: { color: '#f4f4f5', fontSize: 20, fontWeight: '900' },
  statLabel: { color: '#52525b', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 },

  filtersOuter:   { marginHorizontal: 24, marginBottom: 24, position: 'relative' },
  filtersContent: { gap: 8, paddingHorizontal: 2 },
  filterBtn:        { height: 34, paddingHorizontal: 14, justifyContent: 'center', borderWidth: 1, borderColor: '#27272a' },
  filterBtnActive:  { borderColor: '#f4f4f5', backgroundColor: '#f4f4f5' },
  filterText:       { color: '#52525b', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700' },
  filterTextActive: { color: '#000' },
  fadeEdge:  { position: 'absolute', top: 0, bottom: 0, width: 24 },
  fadeLeft:  { left: 0,  backgroundColor: '#000' },
  fadeRight: { right: 0, backgroundColor: '#000' },

  monthLabel:      { color: '#27272a', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 8, marginTop: 8 },
  entry:           { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#0a0a0a', alignItems: 'center', gap: 14 },
  entryDate:       { width: 28, alignItems: 'center' },
  entryDay:        { color: '#3f3f46', fontSize: 13, fontWeight: '700' },
  entryCover:      { width: 44, height: 44, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  entryCoverGlyph: { fontSize: 20, color: '#27272a' },
  entryInfo:       { flex: 1 },
  entryType:       { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', marginBottom: 2 },
  entryTitle:      { color: '#f4f4f5', fontSize: 14, fontWeight: '700', letterSpacing: -0.3, marginBottom: 4 },
  stars:           { flexDirection: 'row', gap: 2 },
  star:            { fontSize: 11 },

  logoutBtn:  { marginHorizontal: 24, marginTop: 40, borderWidth: 1, borderColor: '#27272a', paddingVertical: 16, alignItems: 'center' },
  logoutText: { color: '#3f3f46', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700' },
});