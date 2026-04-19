import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet, Switch, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [username, setUsername] = useState('eduardo.04');
  const [handle, setHandle]     = useState('@eduardo');
  const [bio, setBio]           = useState('Manga, música rara y videojuegos difíciles.');
  const [publicProfile, setPublicProfile]     = useState(true);
  const [publicDiary, setPublicDiary]         = useState(true);
  const [notifFeed, setNotifFeed]             = useState(true);
  const [notifSeguidores, setNotifSeguidores] = useState(false);
  const [editing, setEditing]                 = useState(false);

  return (
    <SafeAreaView style={s.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* TOPBAR */}
        <View style={s.topbar}>
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Text style={s.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={s.topbarLabel}>CONFIGURACIÓN_SISTEMA</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* PERFIL */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>PERFIL_USUARIO</Text>
        </View>

        <View style={s.card}>
          <View style={s.avatarRow}>
            <View style={s.avatarWrap}>
              <View style={s.avatarInner}>
                <Text style={s.avatarLetter}>E</Text>
              </View>
              <View style={[s.corner, s.cornerTL]} />
              <View style={[s.corner, s.cornerTR]} />
              <View style={[s.corner, s.cornerBL]} />
              <View style={[s.corner, s.cornerBR]} />
            </View>
            <TouchableOpacity style={s.editBtn} onPress={() => setEditing(v => !v)}>
              <Text style={s.editBtnText}>{editing ? 'GUARDAR_DATOS' : 'EDITAR_PERFIL'}</Text>
            </TouchableOpacity>
          </View>

          <View style={s.divider} />

          <View style={s.field}>
            <Text style={s.fieldLabel}>ID_USUARIO</Text>
            {editing
              ? <TextInput style={s.input} value={username} onChangeText={setUsername} selectionColor="#ff2147" placeholderTextColor="#3f3f46" />
              : <Text style={s.fieldValue}>{username}</Text>}
          </View>

          <View style={s.divider} />

          <View style={s.field}>
            <Text style={s.fieldLabel}>ACCESS_HANDLE</Text>
            {editing
              ? <TextInput style={s.input} value={handle} onChangeText={setHandle} selectionColor="#ff2147" placeholderTextColor="#3f3f46" />
              : <Text style={s.fieldValue}>{handle}</Text>}
          </View>

          <View style={s.divider} />

          <View style={s.field}>
            <Text style={s.fieldLabel}>BIOMETRIC_BIO</Text>
            {editing
              ? <TextInput style={[s.input, s.inputMulti]} value={bio} onChangeText={setBio} multiline selectionColor="#ff2147" placeholderTextColor="#3f3f46" />
              : <Text style={s.fieldValue}>{bio}</Text>}
          </View>
        </View>

        {/* CUENTA Y SEGURIDAD */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>SEGURIDAD</Text>
        </View>

        <View style={s.card}>
          <TouchableOpacity style={s.row} activeOpacity={0.6}>
            <Text style={s.rowLabel}>Cambiar credenciales</Text>
            <Text style={s.rowArrow}>→</Text>
          </TouchableOpacity>
          <View style={s.divider} />
          <TouchableOpacity style={s.row} activeOpacity={0.6}>
            <Text style={s.rowLabel}>Sincronizar correo</Text>
            <Text style={s.rowArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* --- SECCIÓN LIZARD MANIFIESTO --- */}
        <View style={s.sectionHeader}>
          <View style={[s.dot, { backgroundColor: '#00d9ff' }]} />
          <Text style={[s.sectionTitle, { color: '#00d9ff' }]}>LIZARD_CORE</Text>
        </View>

        <View style={s.card}>
          <TouchableOpacity 
            style={s.row} 
            activeOpacity={0.6}
            onPress={() => router.push('/about')} // <-- RUTA CORREGIDA PARA app/about.tsx
          >
            <View>
              <Text style={[s.rowLabel, { color: '#00d9ff' }]}>[ ? ] VIEW_MANIFESTO</Text>
              <Text style={s.rowSub}>Simbología Kanji y filosofía de diseño</Text>
            </View>
            <Text style={[s.rowArrow, { color: '#00d9ff' }]}>→</Text>
          </TouchableOpacity>
          
          <View style={s.divider} />
          
          <View style={s.field}>
            <Text style={s.fieldLabel}>KERNEL_VERSION</Text>
            <Text style={[s.fieldValue, { fontFamily: 'monospace', fontSize: 12 }]}>1.0.4-STABLE_BUILD</Text>
          </View>
        </View>

        {/* PRIVACIDAD */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>PRIVACIDAD_DATOS</Text>
        </View>

        <View style={s.card}>
          <View style={s.rowSwitch}>
            <View style={s.rowSwitchText}>
              <Text style={s.rowLabel}>Visibilidad de Perfil</Text>
              <Text style={s.rowSub}>Cualquiera puede indexar tu perfil</Text>
            </View>
            <Switch value={publicProfile} onValueChange={setPublicProfile} trackColor={{ false: '#27272a', true: '#ff2147' }} thumbColor="#f4f4f5" />
          </View>
          <View style={s.divider} />
          <View style={s.rowSwitch}>
            <View style={s.rowSwitchText}>
              <Text style={s.rowLabel}>Logs Públicos</Text>
              <Text style={s.rowSub}>Compartir actividad en el Global Feed</Text>
            </View>
            <Switch value={publicDiary} onValueChange={setPublicDiary} trackColor={{ false: '#27272a', true: '#ff2147' }} thumbColor="#f4f4f5" />
          </View>
        </View>

        {/* NOTIFICACIONES */}
        <View style={s.sectionHeader}>
          <View style={s.dot} />
          <Text style={s.sectionTitle}>NOTIFICACIONES_PUSH</Text>
        </View>

        <View style={s.card}>
          <View style={s.rowSwitch}>
            <View style={s.rowSwitchText}>
              <Text style={s.rowLabel}>Alertas de Feed</Text>
              <Text style={s.rowSub}>Sincronización con actividad de red</Text>
            </View>
            <Switch value={notifFeed} onValueChange={setNotifFeed} trackColor={{ false: '#27272a', true: '#ff2147' }} thumbColor="#f4f4f5" />
          </View>
          <View style={s.divider} />
          <View style={s.rowSwitch}>
            <View style={s.rowSwitchText}>
              <Text style={s.rowLabel}>Nodos de Seguimiento</Text>
              <Text style={s.rowSub}>Nuevas conexiones detectadas</Text>
            </View>
            <Switch value={notifSeguidores} onValueChange={setNotifSeguidores} trackColor={{ false: '#27272a', true: '#ff2147' }} thumbColor="#f4f4f5" />
          </View>
        </View>

        {/* ZONA PELIGROSA */}
        <View style={s.sectionHeader}>
          <View style={[s.dot, { backgroundColor: '#ff2147' }]} />
          <Text style={[s.sectionTitle, { color: '#ff2147' }]}>DANGER_ZONE</Text>
        </View>

        <View style={s.card}>
          <TouchableOpacity style={s.row} activeOpacity={0.6}>
            <Text style={[s.rowLabel, { color: '#ff2147' }]}>WIPE_ALL_DATA</Text>
            <Text style={[s.rowArrow, { color: '#ff2147' }]}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.logoutBtn}>
          <Text style={s.logoutText}>TERMINAR_SESIÓN [ EXIT ]</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const CORNER = 8;

const s = StyleSheet.create({
  root:     { flex: 1, backgroundColor: '#000' },
  content: { paddingBottom: 80 },

  topbar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, marginBottom: 32 },
  backBtn:      { width: 36, height: 36, borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  backIcon:     { color: '#f4f4f5', fontSize: 18 },
  topbarLabel: { color: '#f4f4f5', fontSize: 11, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginTop: 28, marginBottom: 12 },
  dot:           { width: 5, height: 5, borderRadius: 3, backgroundColor: '#ff2147', marginRight: 10 },
  sectionTitle:  { color: '#52525b', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace' },

  card:    { marginHorizontal: 24, borderWidth: 1, borderColor: '#18181b', backgroundColor: '#0a0a0a' },
  divider: { height: 1, backgroundColor: '#18181b' },

  avatarRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  avatarWrap:   { width: 56, height: 56, position: 'relative' },
  avatarInner:  { width: 56, height: 56, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#f4f4f5', fontSize: 24, fontWeight: '900' },
  corner:       { position: 'absolute', width: CORNER, height: CORNER },
  cornerTL:     { top: -2,    left: -2,  borderTopWidth: 2,    borderLeftWidth: 2,  borderColor: '#ff2147' },
  cornerTR:     { top: -2,    right: -2, borderTopWidth: 2,    borderRightWidth: 2, borderColor: '#ff2147' },
  cornerBL:     { bottom: -2, left: -2,  borderBottomWidth: 2, borderLeftWidth: 2,  borderColor: '#ff2147' },
  cornerBR:     { bottom: -2, right: -2, borderBottomWidth: 2, borderRightWidth: 2, borderColor: '#ff2147' },
  editBtn:      { borderWidth: 1, borderColor: '#27272a', paddingHorizontal: 16, paddingVertical: 9 },
  editBtnText:  { color: '#f4f4f5', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700' },

  field:      { paddingHorizontal: 16, paddingVertical: 14 },
  fieldLabel: { color: '#3f3f46', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, fontFamily: 'monospace' },
  fieldValue: { color: '#f4f4f5', fontSize: 14 },
  input:      { color: '#f4f4f5', fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#ff2147', paddingBottom: 4 },
  inputMulti: { minHeight: 60, textAlignVertical: 'top' },

  row:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  rowLabel:      { color: '#f4f4f5', fontSize: 14 },
  rowArrow:      { color: '#3f3f46', fontSize: 16 },
  rowSwitch:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  rowSwitchText:{ flex: 1, marginRight: 16 },
  rowSub:        { color: '#3f3f46', fontSize: 11, marginTop: 2, fontFamily: 'monospace' },

  logoutBtn:  { marginHorizontal: 24, marginTop: 40, borderWidth: 1, borderColor: '#27272a', paddingVertical: 16, alignItems: 'center' },
  logoutText: { color: '#3f3f46', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', fontFamily: 'monospace' },
});