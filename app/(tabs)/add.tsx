import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Add() {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <View style={s.dot} />
        <Text style={s.label}>ADD</Text>
      </View>
      <Text style={s.soon}>Próximamente</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#000', paddingHorizontal: 24, paddingTop: 32 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  dot:    { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ff2147', marginRight: 10 },
  label:  { color: '#f4f4f5', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  soon:   { color: '#3f3f46', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' },
});