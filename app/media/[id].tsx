import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MediaDetailScreen() {
  const params = useLocalSearchParams();
  
  // Normalización de datos
  const id = typeof params.id === 'string' ? params.id : 'ERR_ID';
  const title = typeof params.title === 'string' ? params.title : 'UNKNOWN_TITLE';
  const artist = typeof params.artist === 'string' ? params.artist : 'UNKNOWN_ARTIST';
  const cover = typeof params.cover === 'string' ? params.cover : 'https://via.placeholder.com/300';

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>{'<'} CLOSE_FILE</Text>
        </TouchableOpacity>
        <Text style={s.headerId}>REF_ID: {id.slice(0, 8).toUpperCase()}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <View style={s.heroSection}>
          <Image source={{ uri: cover }} style={s.mainCover} />
          <View style={s.mainInfo}>
            <Text style={s.typeTag}>DATABASE_ENTRY // AUDIO</Text>
            <Text style={s.title} numberOfLines={2}>{title}</Text>
            <Text style={s.artist}>{artist}</Text>
            
            <View style={s.statsRow}>
              <View style={s.statBox}>
                <Text style={s.statLabel}>AVG_RATING</Text>
                <Text style={s.statValue}>4.82</Text>
              </View>
              <View style={s.statBox}>
                <Text style={s.statLabel}>LOG_COUNT</Text>
                <Text style={s.statValue}>12.4K</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionLabel}>01 // PERSONAL_LOG_HISTORY</Text>
          <View style={s.personalLogCard}>
            <Text style={s.logDate}>TIMESTAMP: 19_APR_2026</Text>
            <Text style={s.starActive}>★★★★★</Text>
            <Text style={s.logText}>
              "Sincronización de datos con el servidor local completada. Entrada lista para análisis."
            </Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionLabel}>02 // COMMUNITY_INTEL</Text>
          {[1, 2].map((i) => (
            <View key={i} style={s.communityComment}>
              <View style={s.commentHeader}>
                <Text style={s.commentUser}>node_id: user_{i}04</Text>
                <Text style={s.commentRating}>★ 5.0</Text>
              </View>
              <Text style={s.commentText}>
                Análisis de frecuencia completado. El impacto cultural de este medio es innegable.
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity 
          style={s.logBtn}
          onPress={() => router.push({
            pathname: '/add',
            params: { 
              prefillId: id,
              prefillTitle: title,
              prefillArtist: artist,
              prefillCover: cover, // Enviamos la imagen real
              prefillType: 'AUDIO'
            }
          })}
        >
          <Text style={s.logBtnText}>+ ADD_TO_MY_DATABASE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#18181b' },
  backBtn: { paddingVertical: 4 },
  backText: { color: '#52525b', fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  headerId: { color: '#3f3f46', fontFamily: 'monospace', fontSize: 10 },
  content: { padding: 24, paddingBottom: 100 },
  heroSection: { flexDirection: 'row', marginBottom: 40 },
  mainCover: { width: 140, height: 140, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a' },
  mainInfo: { flex: 1, marginLeft: 20, justifyContent: 'center' },
  typeTag: { color: '#00d9ff', fontSize: 8, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 4, letterSpacing: -0.5 },
  artist: { color: '#a1a1aa', fontSize: 14, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 16 },
  statBox: { borderLeftWidth: 1, borderLeftColor: '#18181b', paddingLeft: 8 },
  statLabel: { color: '#3f3f46', fontSize: 8, fontFamily: 'monospace', marginBottom: 4 },
  statValue: { color: '#fff', fontSize: 14, fontWeight: '700' },
  section: { marginBottom: 36 },
  sectionLabel: { color: '#3f3f46', fontSize: 10, fontFamily: 'monospace', letterSpacing: 2, marginBottom: 16 },
  personalLogCard: { backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a', padding: 16 },
  logDate: { color: '#52525b', fontSize: 9, fontFamily: 'monospace', marginBottom: 8 },
  starActive: { color: '#f59e0b', fontSize: 14, marginBottom: 8 },
  logText: { color: '#d4d4d8', fontSize: 13, fontStyle: 'italic', lineHeight: 20 },
  communityComment: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#111' },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  commentUser: { color: '#71717a', fontSize: 10, fontFamily: 'monospace' },
  commentRating: { color: '#f59e0b', fontSize: 10, fontWeight: '900' },
  commentText: { color: '#a1a1aa', fontSize: 12, lineHeight: 18 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#000', borderTopWidth: 1, borderTopColor: '#18181b' },
  logBtn: { backgroundColor: '#fff', paddingVertical: 16, alignItems: 'center', borderRadius: 2 },
  logBtnText: { color: '#000', fontWeight: '900', fontSize: 12, letterSpacing: 2 },
});