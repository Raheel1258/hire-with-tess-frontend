export default async function downloadAudio(audioData: string, fileName: string) {
  let base64Data: string;

  if (audioData.startsWith('http://') || audioData.startsWith('https://')) {
    const response = await fetch(audioData);
    if (!response.ok) {
      throw new Error('Failed to fetch audio file');
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error('Fetched audio blob is empty');
    }

    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    base64Data = btoa(binary);
  } else if (audioData.startsWith('data:')) {
    const commaIndex = audioData.indexOf(',');
    if (commaIndex === -1) {
      throw new Error('Invalid data URI');
    }
    base64Data = audioData.slice(commaIndex + 1);
  } else {
    base64Data = audioData;
  }

  if (!base64Data) {
    throw new Error('Audio payload is empty');
  }

  const link = document.createElement('a');
  link.href = `data:audio/mpeg;base64,${base64Data}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}
