import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform, 
  ActivityIndicator, Image, Keyboard, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

interface AlbumResult {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

const TYPES = [
  { id: 'AUDIO', label: 'AUDIO', kanji: '音', color: '#00d9ff' },
  { id: 'VISUAL', label: 'VISUAL', kanji: '映', color: '#ff2147' },
  { id: 'INTERACT', label: 'INTERACT', kanji: '遊', color: '#a855f7' },
  { id: 'TEXT', label: 'TEXT', kanji: '読', color: '#f59e0b' },
];

export default function AddScreen() {
  const params = useLocalSearchParams();

  // Estados iniciales
  const [selectedType, setSelectedType] = useState((params.prefillType as string) || 'AUDIO');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  
  // Inyección de datos si vienen de un detalle
  const [selectedMedia, setSelectedMedia] = useState<AlbumResult | null>(
    params.prefillTitle ? {
      id: params.prefillId as string,
      title: params.prefillTitle as string,
      artist: params.prefillArtist as string,
      cover: params.prefillCover as string,
    } : null
  );

  const [searchResults, setSearchResults] = useState<AlbumResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
  }, []);

  // MOTOR DE BÚSQUEDA DINÁMICO (Sincronizado con SearchScreen)
  const handleSearch = useCallback((text: string, category: string) => {
    setTitle(text);

    if (category !== 'AUDIO' || text.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    setIsSearching(true);

    searchTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(text)}&fmt=json`,
          { headers: { 'User-Agent': 'LizardTerminal/1.0' } }
        );
        const data = await response.json();
        
        if (data['release-groups']) {
          const uniqueResultsMap = new Map();
          data['release-groups'].forEach((album: any) => {
            const albumTitle = album.title.trim();
            const artistName = album['artist-credit']?.[0]?.name || 'Unknown Artist';
            const key = `${albumTitle}-${artistName}`.toLowerCase();
            if (!uniqueResultsMap.has(key)) {
              uniqueResultsMap.set(key, {
                id: album.id,
                title: albumTitle,
                artist: artistName,
                cover: `https://coverartarchive.org/release-group/${album.id}/front-250`
              });
            }
          });
          setSearchResults(Array.from(uniqueResultsMap.values()).slice(0, 5));
        }
      } catch (error) {
        console.error("API_ERROR:", error);
      } finally {
        setIsSearching(false);
      }
    }, 600);
  }, []);

  const selectAlbum = (album: AlbumResult) => {
    setSelectedMedia(album);
    setTitle(album.title);
    setSearchResults([]);
    Keyboard.dismiss();
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={s.headerContainer}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.headerAction}>
            <Text style={s.backText}>{'<'} CANCEL_PROCESS</Text>
          </TouchableOpacity>
          <View style={s.headerTitle}>
            <View style={s.dot} />
            <Text style={s.label}>NEW_LOG_ENTRY</Text>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
      >
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          
          {/* 01 // CATEGORÍA */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>01 // SELECT_CLASS</Text>
            <View style={s.grid}>
              {TYPES.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  disabled={!!params.prefillId}
                  onPress={() => { setSelectedType(t.id); setSelectedMedia(null); setSearchResults([]); setTitle(''); }}
                  style={[s.card, selectedType === t.id && { borderColor: t.color }, !!params.prefillId && { opacity: 0.5 }]}
                >
                  <Text style={[s.kanji, selectedType === t.id && { color: t.color }]}>{t.kanji}</Text>
                  <Text style={[s.typeText, selectedType === t.id && { color: '#fff' }]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 02 // TARGET */}
          <View style={[s.section, { zIndex: 10 }]}>
            <View style={s.titleRow}>
              <Text style={s.sectionLabel}>02 // TARGET_IDENTIFIER</Text>
              {isSearching && <ActivityIndicator size="small" color="#00d9ff" />}
            </View>

            {selectedMedia ? (
              <View style={s.selectedContainer}>
                <Image source={{ uri: selectedMedia.cover }} style={s.selectedCover} />
                <View style={s.selectedInfo}>
                  <Text style={s.selectedTitle}>{selectedMedia.title}</Text>
                  <Text style={s.selectedArtist}>{selectedMedia.artist}</Text>
                  {!params.prefillId && (
                    <TouchableOpacity onPress={() => {setSelectedMedia(null); setTitle('');}} style={s.changeBtn}>
                      <Text style={s.changeBtnText}>[ REMOVE_DATA ]</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              <View style={s.inputWrapper}>
                {searchResults.length > 0 && (
                  <View style={s.dropdownFloat}>
                    <ScrollView style={s.dropdown} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                      {searchResults.map((item) => (
                        <TouchableOpacity key={item.id} style={s.dropdownItem} onPress={() => selectAlbum(item)}>
                          <Image source={{ uri: item.cover }} style={s.dropdownCover} />
                          <View style={s.dropdownTextWrap}>
                            <Text style={s.dropdownTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={s.dropdownArtist} numberOfLines={1}>{item.artist}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <View style={s.dropdownPointer} />
                  </View>
                )}
                <TextInput
                  style={[s.input, searchResults.length > 0 && s.inputActive]}
                  placeholder={selectedType === 'AUDIO' ? "SEARCH_DATABASE..." : "API_OFFLINE_FOR_THIS_CLASS..."}
                  placeholderTextColor="#27272a"
                  value={title}
                  onChangeText={(t) => handleSearch(t, selectedType)}
                  autoCorrect={false}
                />
              </View>
            )}
          </View>

          {/* 03 // VALORACIÓN */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>03 // EVALUATION_METRIC</Text>
            <View style={s.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  <Text style={[s.star, { color: i <= rating ? '#f59e0b' : '#18181b' }]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 04 // REPORTE */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>04 // DETAILED_REPORT</Text>
            <TextInput
              style={[s.input, s.textArea]}
              placeholder="AWAITING_INPUT..."
              placeholderTextColor="#27272a"
              value={review}
              onChangeText={setReview}
              multiline
              textAlignVertical="top"
              selectionColor="#ff2147"
            />
          </View>
        </ScrollView>

        <View style={s.footer}>
          <TouchableOpacity style={s.executeBtn} onPress={() => router.back()}>
            <Text style={s.executeText}>EXECUTE_LOG_SEQUENCE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  headerContainer: { backgroundColor: '#000', borderBottomWidth: 1, borderBottomColor: '#18181b', zIndex: 1000 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, alignItems: 'center' },
  headerAction: { paddingVertical: 4, paddingRight: 10 },
  backText: { color: '#52525b', fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  headerTitle: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, backgroundColor: '#ff2147', marginRight: 8 },
  label: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 60 },
  section: { marginBottom: 32 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionLabel: { color: '#3f3f46', fontSize: 10, fontFamily: 'monospace', letterSpacing: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card: { width: '47%', backgroundColor: '#050505', borderWidth: 1, borderColor: '#18181b', padding: 16, alignItems: 'center' },
  kanji: { fontSize: 24, color: '#18181b', marginBottom: 4 },
  typeText: { fontSize: 10, color: '#3f3f46', fontWeight: '700', letterSpacing: 2 },
  selectedContainer: { flexDirection: 'row', backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a', padding: 12 },
  selectedCover: { width: 80, height: 80, backgroundColor: '#18181b' },
  selectedInfo: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  selectedTitle: { color: '#fff', fontSize: 16, fontWeight: '900', marginBottom: 4 },
  selectedArtist: { color: '#52525b', fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase' },
  changeBtn: { marginTop: 8 },
  changeBtnText: { color: '#ff2147', fontSize: 9, fontWeight: '900' },
  inputWrapper: { position: 'relative' },
  input: { borderBottomWidth: 1, borderColor: '#18181b', color: '#fff', fontSize: 20, paddingVertical: 12, fontWeight: '700', backgroundColor: '#000' },
  inputActive: { borderColor: '#00d9ff' },
  dropdownFloat: { position: 'absolute', bottom: '100%', left: 0, right: 0, zIndex: 100, marginBottom: 5, paddingBottom: 10 },
  dropdown: { backgroundColor: '#0a0a0a', borderWidth: 2, borderColor: '#00d9ff', maxHeight: 220 },
  dropdownPointer: { width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderTopWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#00d9ff', alignSelf: 'center' },
  dropdownItem: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#18181b', alignItems: 'center' },
  dropdownCover: { width: 50, height: 50, backgroundColor: '#18181b', marginRight: 12 },
  dropdownTextWrap: { flex: 1 },
  dropdownTitle: { color: '#fff', fontSize: 13, fontWeight: '700' },
  dropdownArtist: { color: '#71717a', fontSize: 10 },
  starsRow: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  star: { fontSize: 40 },
  textArea: { height: 120, fontSize: 14, paddingVertical: 16 },
  footer: { paddingHorizontal: 24, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#18181b', backgroundColor: '#000' },
  executeBtn: { backgroundColor: '#fff', paddingVertical: 16, alignItems: 'center' },
  executeText: { color: '#000', fontWeight: '900', letterSpacing: 3, fontSize: 12 },
});