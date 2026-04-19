// src/api/musicApi.ts

export const searchAlbum = async (query: string) => {
  try {
    // 1. Buscamos el álbum en MusicBrainz
    // Nota: MusicBrainz exige un 'User-Agent' descriptivo para no bloquearte.
    const response = await fetch(
      `https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(query)}&fmt=json`,
      {
        headers: {
          'User-Agent': 'LizardTerminal/1.0 ( tu_correo@gmail.com )', 
        },
      }
    );

    const data = await response.json();

    // 2. Mapeamos y limpiamos los datos para LIZARD
    if (data['release-groups']) {
      return data['release-groups'].slice(0, 5).map((album: any) => ({
        id: album.id,
        title: album.title,
        artist: album['artist-credit']?.[0]?.name || 'Unknown Artist',
        year: album['first-release-date']?.split('-')[0] || 'N/A',
        // Construimos la URL de la portada usando el ID de MusicBrainz
        cover: `https://coverartarchive.org/release-group/${album.id}/front-250`,
        type: 'AUDIO'
      }));
    }
    return [];

  } catch (error) {
    console.error("LOG_ERROR: Fallo en la conexión con MusicBrainz", error);
    return [];
  }
};