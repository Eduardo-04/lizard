import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const SYMBOLS = [
  { 
    kanji: '音', 
    title: 'AUDIO_NODE', 
    color: '#00d9ff', 
    romaji: 'OTO / ON',
    literal: 'SONIDO / RUIDO',
    desc: 'Significado literal: Sonido o ruido producido por un objeto o ser vivo. En LIZARD, este nodo archiva frecuencias acústicas y composiciones musicales.' 
  },
  { 
    kanji: '映', 
    title: 'VISUAL_STREAM', 
    color: '#ff2147', 
    romaji: 'EI / UTSU(SU)',
    literal: 'PROYECTAR / REFLEJAR',
    desc: 'Significado literal: Reflejar la luz o proyectar una imagen. Es la base del cine. En el sistema, captura toda narrativa basada en fotogramas y luz.' 
  },
  { 
    kanji: '遊', 
    title: 'INTERACT_CORE', 
    color: '#a855f7', 
    romaji: 'YU / ASO(BU)',
    literal: 'JUGAR / PASEAR',
    desc: 'Significado literal: Divertirse, jugar o viajar sin rumbo fijo. Define la experiencia lúdica e interactiva de los videojuegos dentro del protocolo.' 
  },
  { 
    kanji: '読', 
    title: 'TEXT_ARCHIVE', 
    color: '#f59e0b', 
    romaji: 'DOKU / YO(MU)',
    literal: 'LEER / RECITAR',
    desc: 'Significado literal: El acto de leer o interpretar un texto. Archiva la palabra escrita, desde literatura clásica hasta el código fuente de la realidad.' 
  },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <View style={s.scanline} pointerEvents="none" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>TERMINATE_SESSION</Text>
        </TouchableOpacity>
        <View style={s.headerStatus}>
          <View style={s.onlineDot} />
          <Text style={s.version}>SYS_STATUS: OPERATIONAL</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={s.heroBlock}>
          <Text style={s.lizardTitle}>LIZARD</Text>
          <View style={s.lizardSubtitleRow}>
            <Text style={s.lizardSubtitle}>CULTURAL_INDEXING_PROTOCOL</Text>
          </View>
          <Text style={s.manifesto}>
            LIZARD es una arquitectura de datos diseñada para la indexación cultural. 
            El sistema utiliza kanjis como identificadores raíz para clasificar la experiencia humana en nodos inmutables de información.
          </Text>
        </View>

        {/* EXPLICACIÓN DE SIMBOLOGÍA */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>// DECODING_KANJI_SYMBOLOGY</Text>
          
          {SYMBOLS.map((item, i) => (
            <View key={i} style={s.itemRow}>
              <View style={[s.kanjiBox, { backgroundColor: item.color }]}>
                <Text style={s.kanjiText}>{item.kanji}</Text>
              </View>
              <View style={s.itemInfo}>
                <View style={s.itemHeader}>
                  <Text style={[s.itemTitle, { color: item.color }]}>{item.title}</Text>
                  <Text style={s.romajiText}>[{item.romaji}]</Text>
                </View>
                
                {/* SIGNIFICADO LITERAL RESALTADO */}
                <View style={s.literalBox}>
                  <Text style={s.literalLabel}>SIGNIFICADO_LITERAL:</Text>
                  <Text style={[s.literalValue, { color: item.color }]}>{item.literal}</Text>
                </View>

                <Text style={s.itemDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={s.footer}>
          <View style={s.divider} />
          <View style={s.devRow}>
            <View>
              <Text style={s.devLabel}>LEAD_SYSTEM_ARCHITECT</Text>
              <Text style={s.devName}>KEVIN_EDUARDO</Text>
            </View>
            <View style={s.signatureBox}>
              <Text style={s.signature}>LZRD</Text>
            </View>
          </View>
          <Text style={s.footerCopy}>© 2026 LIZARD_INTERNAL_SYSTEMS. ALL_RIGHTS_RESERVED.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scanline: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.015)', zIndex: 999 },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 24, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#111'
  },
  backBtn: { backgroundColor: '#ff2147', paddingHorizontal: 12, paddingVertical: 6 },
  backText: { color: '#000', fontSize: 10, fontWeight: '900', fontFamily: 'monospace' },
  headerStatus: { flexDirection: 'row', alignItems: 'center' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00ff00', marginRight: 8 },
  version: { color: '#3f3f46', fontSize: 10, fontFamily: 'monospace' },

  content: { padding: 24 },

  heroBlock: { marginBottom: 48 },
  lizardTitle: { color: '#fff', fontSize: 80, fontWeight: '900', letterSpacing: -6, lineHeight: 80 },
  lizardSubtitleRow: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 4, marginTop: -4 },
  lizardSubtitle: { color: '#000', fontSize: 10, fontWeight: '900', fontFamily: 'monospace' },
  manifesto: { color: '#a1a1aa', fontSize: 13, lineHeight: 20, marginTop: 24, fontFamily: 'monospace' },

  section: { marginBottom: 40 },
  sectionLabel: { color: '#3f3f46', fontSize: 10, fontFamily: 'monospace', letterSpacing: 2, marginBottom: 30 },
  
  itemRow: { flexDirection: 'row', marginBottom: 40, alignItems: 'flex-start' },
  kanjiBox: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  kanjiText: { fontSize: 32, color: '#000', fontWeight: '900' },
  itemInfo: { flex: 1, marginLeft: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  itemTitle: { fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  romajiText: { color: '#3f3f46', fontSize: 9, fontFamily: 'monospace' },

  literalBox: { backgroundColor: '#111', padding: 8, marginBottom: 10, borderLeftWidth: 2, borderLeftColor: '#3f3f46' },
  literalLabel: { color: '#52525b', fontSize: 8, fontFamily: 'monospace', marginBottom: 2 },
  literalValue: { fontSize: 11, fontWeight: '900', fontFamily: 'monospace' },

  itemDesc: { color: '#71717a', fontSize: 11, lineHeight: 17, fontFamily: 'monospace' },

  footer: { marginTop: 20, paddingBottom: 40 },
  divider: { height: 2, backgroundColor: '#111', marginBottom: 24 },
  devRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  devLabel: { color: '#3f3f46', fontSize: 9, fontFamily: 'monospace' },
  devName: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  signatureBox: { borderWidth: 1, borderColor: '#3f3f46', padding: 8 },
  signature: { color: '#3f3f46', fontSize: 12, fontWeight: '100', letterSpacing: 4 },
  footerCopy: { color: '#1a1a1a', textAlign: 'center', marginTop: 40, fontSize: 8, fontFamily: 'monospace' }
});