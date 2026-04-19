import React, { useState } from 'react';
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
  { label: 'ÁLBUMES', count: 12, glyph: '音', color: '#00d9ff' },
  { label: 'FILMS',   count: 8,  glyph: '映', color: '#ff2147' },
  { label: 'JUEGOS',  count: 5,  glyph: '遊', color: '#a855f7' },
  { label: 'LIBROS',  count: 3,  glyph: '読', color: '#f59e0b' },
];

const IN_PROGRESS = [
  { id: 'p1', title: 'Ants From Up There', creator: 'Black Country, New Road', type: 'AUDIO', progress: 'Loop', cover: '音' },
  { id: 'p2', title: 'Uncut Gems', creator: 'Safdie Bros', type: 'VISUAL', progress: 'Pausado', cover: '映' },
  { id: 'p3', title: 'Project Hail Mary', creator: 'Andy Weir', type: 'TEXT', progress: 'Cap. 12', cover: '読' },
];

const NETWORK_FEED = [
  { 
    id: 'n1', 
    user: 'carlos.mx', 
    action: 'calificó', 
    media: 'Berserk Vol. 13', 
    creator: 'Kentaro Miura',
    type: 'TEXT', 
    rating: 5, 
    time: 'hace 2 min', 
    cover: 'https://picsum.photos/seed/berserk13/80/80' 
  },
  { 
    id: 'n2', 
    user: 'ana.films', 
    action: 'reseñó', 
    media: 'Chainsaw Man', 
    creator: 'Tatsuki Fujimoto',
    type: 'VISUAL', 
    rating: 4, 
    time: 'hace 14 min', 
    cover: 'https://picsum.photos/seed/chainsaw/80/80' 
  },
];

// --- NUEVA DATA GLOBAL ---
const GLOBAL_TRENDS = [
  {
    id: 'g1',
    category: 'VISUAL',
    title: 'Dune: Part Two',
    rating: '4.8',
    logs: '12.4K',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=200&auto=format&fit=crop',
    user: '@cinephile99',
    review: 'Denis Villeneuve lo volvió a hacer. Una experiencia religiosa en Imax.',
  },
  {
    id: 'g2',
    category: 'INTERACT',
    title: 'Elden Ring: SOTET',
    rating: '4.9',
    logs: '8.2K',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=200&auto=format&fit=crop',
    user: '@souls_fan',
    review: 'El jefe final me costó 4 horas de mi vida. 10/10.',
  },
  {
    id: 'g3',
    category: 'AUDIO',
    title: 'Brat',
    rating: '4.2',
    logs: '45.1K',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop',
    user: '@pop_head',
    review: 'Totalmente adictivo. Producción impecable.',
  }
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
        <Text key={i} style={[s.star, { color: i <= count ? '#f59e0b' : '#27272a' }]}>★</Text>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const [feedChannel, setFeedChannel] = useState<'NETWORK' | 'GLOBAL'>('NETWORK');

  const goToDetail = (item: any) => {
    router.push({
      pathname: `/media/${item.id}`,
      params: {
        id: item.id,
        title: item.media || item.title,
        artist: item.creator || 'Unknown',
        cover: item.cover || item.image
      }
    });
  };

  return (
    <SafeAreaView style={s.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        
        {/* TOPBAR */}
        <View style={s.topbar}>
          <View>
            <Text style={s.greeting}>SYSTEM LOGIN: SUCCESS</Text>
            <Text style={s.username}>{USER.username}</Text>
          </View>
          
          <View style={s.topbarActions}>
            <TouchableOpacity style={s.iconBtn} onPress={() => router.push('/(tabs)/search')}>
              <Text style={s.iconBtnText}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.avatar} onPress={() => router.push('/(tabs)/profile')}>
              <Text style={s.avatarText}>E</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS */}
        <View style={s.statsContainer}>
          {STATS.map((item) => (
            <View key={item.label} style={s.statCard}>
              <Text style={[s.statGlyph, { color: item.color }]}>{item.glyph}</Text>
              <Text style={s.statCount}>{item.count}</Text>
              <Text style={s.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* IN PROGRESS */}
        <View style={s.sectionHeader}>
          <View style={s.sectionDot} />
          <Text style={s.sectionTitle}>CURRENTLY CONSUMING</Text>
        </View>
        <View style={s.progressContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.progressScroll}>
            {IN_PROGRESS.map((item) => (
              <TouchableOpacity key={item.id} activeOpacity={0.8} style={s.progressCard}>
                <View style={s.progressCover}>
                  <Text style={[s.progressGlyph, { color: TYPE_COLOR[item.type] }]}>{item.cover}</Text>
                </View>
                <View style={s.progressInfo}>
                  <Text style={[s.progressType, { color: TYPE_COLOR[item.type] }]}>{item.type}</Text>
                  <Text style={s.progressTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={s.progressCreator} numberOfLines={1}>{item.creator}</Text>
                  <View style={s.progressBarWrap}>
                    <Text style={s.progressStatus}>[{item.progress}]</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FEED TABS */}
        <View style={s.feedTabs}>
          <TouchableOpacity 
            style={[s.feedTabBtn, feedChannel === 'NETWORK' && s.feedTabActive]} 
            onPress={() => setFeedChannel('NETWORK')}
          >
            <Text style={[s.feedTabText, feedChannel === 'NETWORK' && s.feedTabTextActive]}>[ NETWORK_SYNC ]</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[s.feedTabBtn, feedChannel === 'GLOBAL' && s.feedTabActive]} 
            onPress={() => setFeedChannel('GLOBAL')}
          >
            <Text style={[s.feedTabText, feedChannel === 'GLOBAL' && s.feedTabTextActive]}>[ GLOBAL_TRENDS ]</Text>
          </TouchableOpacity>
        </View>

        {/* --- RENDERIZADO CONDICIONAL DEL FEED --- */}
        {feedChannel === 'NETWORK' ? (
          /* FEED NETWORK ORIGINAL */
          NETWORK_FEED.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              activeOpacity={0.7} 
              style={s.feedItem}
              onPress={() => goToDetail(item)}
            >
              <Image source={{ uri: item.cover }} style={s.cover} />
              <View style={s.feedInfo}>
                <View style={s.feedTopRow}>
                  <Text style={s.feedUser}>{item.user}</Text>
                  <Text style={[s.feedType, { color: TYPE_COLOR[item.type] }]}>{item.type}</Text>
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
          ))
        ) : (
          /* NUEVO FEED GLOBAL TRENDS (AHORA CLICKABLE) */
          <View style={s.globalContainer}>
            {GLOBAL_TRENDS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={s.globalItem}
                activeOpacity={0.7}
                onPress={() => goToDetail(item)}
              >
                
                {/* Header: Imagen + Info */}
                <View style={s.globalHeader}>
                  <Image source={{ uri: item.image }} style={s.globalImage} />
                  <View style={s.globalInfo}>
                    <Text style={[s.globalCategory, { color: TYPE_COLOR[item.category] }]}>
                      {item.category}
                    </Text>
                    <Text style={s.globalTitle}>{item.title}</Text>
                    <Text style={s.globalStats}>
                      ★ {item.rating} AVG // {item.logs} LOGS
                    </Text>
                  </View>
                </View>

                {/* Caja de Reseña Indentada */}
                <View style={s.reviewBox}>
                  <Text style={s.reviewUserLabel}>
                    USER: <Text style={s.reviewUser}>{item.user}</Text>
                  </Text>
                  <Text style={s.reviewText}>"{item.review}"</Text>
                </View>

              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>

      {/* BOTÓN FLOTANTE LOG */}
      <View style={s.commandBar}>
        <Text style={s.commandPrompt}>{'>'} AWAITING_NEW_ENTRY...</Text>
        <TouchableOpacity activeOpacity={0.8} style={s.commandBtn} onPress={() => router.push('/add')}>
          <Text style={s.commandBtnText}>[ + ] LOG</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:          { flex: 1, backgroundColor: '#000' },
  content:       { paddingTop: 20, paddingBottom: 40 },
  topbar:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 28 },
  topbarActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  greeting:      { color: '#52525b', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2, fontFamily: 'monospace' },
  username:      { color: '#f4f4f5', fontSize: 24, fontWeight: '900', letterSpacing: -1 },
  iconBtn:       { width: 44, height: 44, borderRadius: 2, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  iconBtnText:   { fontSize: 18 },
  avatar:        { width: 44, height: 44, borderRadius: 2, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  avatarText:    { color: '#f4f4f5', fontWeight: '900', fontSize: 20 },
  statsContainer:{ flexDirection: 'row', paddingHorizontal: 24, gap: 8, marginBottom: 36 },
  statCard:      { flex: 1, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', paddingVertical: 12, alignItems: 'center' },
  statGlyph:     { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  statCount:     { color: '#f4f4f5', fontSize: 20, fontWeight: '900', letterSpacing: -1 },
  statLabel:     { color: '#52525b', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionDot:    { width: 5, height: 5, borderRadius: 0, backgroundColor: '#ff2147', marginRight: 10 },
  sectionTitle:  { color: '#52525b', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', fontWeight: '700' },
  progressContainer: { marginBottom: 24 },
  progressScroll:    { paddingHorizontal: 24, gap: 12 },
  progressCard:      { width: 200, backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', flexDirection: 'row', padding: 12, alignItems: 'center' },
  progressCover:     { width: 40, height: 40, backgroundColor: '#000', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  progressGlyph:     { fontSize: 18 },
  progressInfo:      { flex: 1 },
  progressType:      { fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', marginBottom: 2 },
  progressTitle:     { color: '#f4f4f5', fontSize: 12, fontWeight: '700', marginBottom: 2 },
  progressCreator:   { color: '#71717a', fontSize: 10, marginBottom: 6 },
  progressBarWrap:   { borderTopWidth: 1, borderTopColor: '#27272a', paddingTop: 4 },
  progressStatus:    { color: '#a1a1aa', fontSize: 9, fontFamily: 'monospace' },
  feedTabs:      { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#18181b' },
  feedTabBtn:    { paddingVertical: 12, marginRight: 24 },
  feedTabActive: { borderBottomWidth: 2, borderBottomColor: '#fff' },
  feedTabText:   { color: '#52525b', fontSize: 10, fontFamily: 'monospace', letterSpacing: 1, fontWeight: '700' },
  feedTabTextActive: { color: '#fff' },
  feedItem:      { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#18181b' },
  cover:         { width: 52, height: 52, backgroundColor: '#18181b', marginRight: 14, borderWidth: 1, borderColor: '#27272a' },
  feedInfo:      { flex: 1, justifyContent: 'space-between' },
  feedTopRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  feedUser:      { color: '#a1a1aa', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  feedType:      { fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700' },
  feedMedia:     { color: '#71717a', fontSize: 12, marginBottom: 6 },
  feedMediaBold: { color: '#f4f4f5', fontWeight: '700' },
  feedBottom:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stars:         { flexDirection: 'row', gap: 2 },
  star:          { fontSize: 10 },
  feedTime:      { color: '#3f3f46', fontSize: 9, fontFamily: 'monospace' },
  commandBar:     { borderTopWidth: 1, borderTopColor: '#27272a', backgroundColor: '#0a0a0a', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  commandPrompt:  { color: '#52525b', fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  commandBtn:     { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 2 },
  commandBtnText: { color: '#000', fontWeight: '900', fontSize: 11, letterSpacing: 2, fontFamily: 'monospace' },

  // --- ESTILOS PARA GLOBAL TRENDS ---
  globalContainer: { paddingHorizontal: 24, paddingTop: 16 },
  globalItem:      { marginBottom: 32, borderBottomWidth: 1, borderBottomColor: '#18181b', paddingBottom: 24 },
  globalHeader:    { flexDirection: 'row', gap: 16, marginBottom: 16 },
  globalImage:     { width: 80, height: 80, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a' },
  globalInfo:      { flex: 1, justifyContent: 'center' },
  globalCategory:  { fontSize: 10, fontFamily: 'monospace', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
  globalTitle:     { color: '#f4f4f5', fontSize: 20, fontWeight: 'bold', letterSpacing: -0.5, marginBottom: 4 },
  globalStats:     { color: '#71717a', fontSize: 11, fontFamily: 'monospace', letterSpacing: 1 },
  reviewBox:       { backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#18181b', padding: 16, marginLeft: 32 },
  reviewUserLabel: { color: '#71717a', fontSize: 10, fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  reviewUser:      { color: '#a1a1aa' },
  reviewText:      { color: '#d4d4d8', fontStyle: 'italic', fontSize: 14, lineHeight: 22 },
});