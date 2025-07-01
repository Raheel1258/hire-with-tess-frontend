export default async function downloadAudio(audioData: string, fileName: string) {
    try {
        let base64Data: string;
        
        // Check if the input is a URL or base64 data
        if (audioData.startsWith('http://') || audioData.startsWith('https://')) {
            // It's a URL, fetch and convert to base64
            const response = await fetch(audioData);
            if (!response.ok) {
                throw new Error('Failed to fetch audio file');
            }
            
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Convert to base64
            let binary = '';
            for (let i = 0; i < uint8Array.length; i++) {
                binary += String.fromCharCode(uint8Array[i]);
            }
            base64Data = btoa(binary);
        } else {
            // It's already base64 data
            base64Data = audioData;
        }
        
        const link = document.createElement('a');
        link.href = `data:audio/mpeg;base64,${base64Data}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    } catch (error) {
        console.error('Download failed:', error);
        throw error;
    }
}