import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const GLOBAL_ACTIVITY = [
  { id: 'rec1', user: 'lizard_king', action: 'DISCO_LOGGED', media: 'Brat', creator: 'Charli XCX', rating: 5, comment: 'El diseño sonoro es de otro planeta.', cover: 'https://picsum.photos/seed/brat/150/150', type: 'AUDIO' },
  { id: 'rec2', user: 'cinephile_01', action: 'FILM_REVIEW', media: 'Civil War', creator: 'Alex Garland', rating: 4, comment: 'Inmersiva y aterradora.', cover: 'https://picsum.photos/seed/civilwar/150/150', type: 'VISUAL' },
];

const CATEGORIES = ['ALL', 'AUDIO', 'VISUAL', 'INTERACT', 'TEXT'];

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // MOTOR DE BÚSQUEDA DINÁMICO CON FILTRO DE CATEGORÍA
  const handleSearch = useCallback((text: string, category: string) => {
    setSearchQuery(text);

    if (text.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    
    // Si la categoría no es ALL o AUDIO, por ahora no buscamos (hasta conectar TMDB/RAWG)
    if (category !== 'ALL' && category !== 'AUDIO') {
      setSearchResults([]);
      return;
    }

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
                media: albumTitle,
                creator: artistName,
                cover: `https://coverartarchive.org/release-group/${album.id}/front-250`,
                type: 'AUDIO',
                isRealData: true 
              });
            }
          });
          setSearchResults(Array.from(uniqueResultsMap.values()).slice(0, 10));
        }
      } catch (error) {
        console.error("API_ERROR:", error);
      } finally {
        setIsSearching(false);
      }
    }, 600);
  }, []);

  const changeCategory = (cat: string) => {
    setActiveTab(cat);
    // Re-ejecutamos la búsqueda con la nueva categoría si hay texto
    if (searchQuery.length >= 3) {
      handleSearch(searchQuery, cat);
    }
  };

  const goToDetail = (item: any) => {
    router.push({
      pathname: `/media/${item.id}`,
      params: { id: item.id, title: item.media, artist: item.creator, cover: item.cover, type: item.type }
    });
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.searchHeader}>
        <Text style={s.terminalPrompt}>ID_QUERY_SYSTEM_v1.0</Text>
        <View style={s.searchBar}>
          <Text style={s.promptChar}>{'>'}</Text>
          <TextInput 
            style={s.searchInput}
            placeholder={`SEARCH_IN_${activeTab}...`}
            placeholderTextColor="#3f3f46"
            value={searchQuery}
            onChangeText={(t) => handleSearch(t, activeTab)}
            selectionColor="#ff2147"
            autoCorrect={false}
          />
          {isSearching && <ActivityIndicator size="small" color="#00d9ff" />}
        </View>
      </View>

      <View style={s.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => changeCategory(cat)}
              style={[s.filterBtn, activeTab === cat && s.filterBtnActive]}
            >
              <Text style={[s.filterText, activeTab === cat && s.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={searchResults.length > 0 ? searchResults : (searchQuery.length < 3 ? GLOBAL_ACTIVITY : [])}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.listContent}
        ListEmptyComponent={
          searchQuery.length >= 3 && !isSearching ? (
            <View style={s.emptyBox}>
              <Text style={s.emptyText}>NO_LOCAL_INTEL_FOR: {activeTab}</Text>
              <Text style={s.emptySubText}>AWAITING_EXTERNAL_API_HANDSHAKE...</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[s.mediaCard, item.isRealData && s.apiCard]} 
            onPress={() => goToDetail(item)}
          >
            {!item.isRealData && (
              <View style={s.cardHeader}>
                <Text style={s.cardUser}>{item.user}</Text>
                <Text style={s.cardAction}>// {item.action}</Text>
              </View>
            )}
            
            <View style={s.cardBody}>
              <Image source={{ uri: item.cover }} style={s.cardCover} />
              <View style={s.cardInfo}>
                <Text style={s.cardTitle} numberOfLines={1}>{item.media}</Text>
                <Text style={s.cardCreator}>{item.creator}</Text>
                
                {item.isRealData ? (
                   <View style={s.apiTag}>
                     <Text style={s.apiTagText}>[ SOURCE: {item.type} ]</Text>
                   </View>
                ) : (
                  <>
                    <View style={s.ratingRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Text key={star} style={[s.star, { color: star <= item.rating ? '#f59e0b' : '#18181b' }]}>★</Text>
                      ))}
                    </View>
                    <Text style={s.cardComment} numberOfLines={2}>"{item.comment}"</Text>
                  </>
                )}
              </View>
            </View>

            <View style={s.cardFooter}>
              <Text style={s.footerText}>{item.isRealData ? 'ENCRYPTED_DATA_SCAN' : 'STATUS: VERIFIED'}</Text>
              <Text style={s.footerText}>{item.isRealData ? `REF: ${item.id.slice(0,8)}` : 'SCAN_COMPLETE'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  searchHeader: { paddingHorizontal: 24, paddingVertical: 16 },
  terminalPrompt: { color: '#3f3f46', fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, marginBottom: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#27272a', paddingVertical: 8 },
  promptChar: { color: '#ff2147', fontSize: 18, fontWeight: '900', marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: 'monospace' },
  filterContainer: { marginBottom: 16 },
  filterScroll: { paddingHorizontal: 24, gap: 10 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 6, borderWidth: 1, borderColor: '#18181b', backgroundColor: '#050505' },
  filterBtnActive: { borderColor: '#fff', backgroundColor: '#111' },
  filterText: { color: '#52525b', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  filterTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 24, paddingBottom: 40 },
  mediaCard: { backgroundColor: '#050505', borderWidth: 1, borderColor: '#18181b', marginBottom: 20, padding: 16 },
  apiCard: { borderColor: '#00d9ff' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#18181b', paddingBottom: 8 },
  cardUser: { color: '#a1a1aa', fontWeight: '900', fontSize: 12 },
  cardAction: { color: '#3f3f46', fontSize: 10, fontFamily: 'monospace' },
  cardBody: { flexDirection: 'row' },
  cardCover: { width: 90, height: 90, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a' },
  cardInfo: { flex: 1, marginLeft: 16 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '900', marginBottom: 2 },
  cardCreator: { color: '#71717a', fontSize: 12, marginBottom: 8 },
  apiTag: { marginTop: 4, alignSelf: 'flex-start', borderLeftWidth: 2, borderLeftColor: '#00d9ff', paddingLeft: 8 },
  apiTagText: { color: '#00d9ff', fontSize: 9, fontFamily: 'monospace' },
  ratingRow: { flexDirection: 'row', gap: 2, marginBottom: 8 },
  star: { fontSize: 12 },
  cardComment: { color: '#d4d4d8', fontSize: 12, fontStyle: 'italic', lineHeight: 18 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#18181b' },
  footerText: { color: '#3f3f46', fontSize: 8, fontFamily: 'monospace' },
  emptyBox: { marginTop: 60, alignItems: 'center', padding: 20 },
  emptyText: { color: '#ff2147', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bold' },
  emptySubText: { color: '#3f3f46', fontFamily: 'monospace', fontSize: 10, marginTop: 8 }
});