export const extractMediaUrls = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract video sources
    const videoSources = Array.from(doc.querySelectorAll('video source'))
      .map(source => ({
        url: source.getAttribute('src'),
        type: 'video',
        name: source.getAttribute('title') || 'Untitled Video'
      }));
      
    // Extract iframe sources (for embedded content)
    const iframeSources = Array.from(doc.querySelectorAll('iframe'))
      .map(iframe => ({
        url: iframe.getAttribute('src'),
        type: 'iframe',
        name: iframe.getAttribute('title') || 'Embedded Content'
      }));
      
    // Extract links that might be media files
    const mediaLinks = Array.from(doc.querySelectorAll('a'))
      .map(link => ({
        url: link.getAttribute('href'),
        type: 'link',
        name: link.textContent || 'Untitled Link'
      }))
      .filter(link => {
        const url = link.url?.toLowerCase() || '';
        return url.endsWith('.m3u8') || 
               url.endsWith('.mp4') || 
               url.endsWith('.m3u') ||
               url.includes('stream');
      });

    return [...videoSources, ...iframeSources, ...mediaLinks]
      .filter(item => item.url && !item.url.startsWith('#'));
      
  } catch (error) {
    console.error('Error extracting URLs:', error);
    throw error;
  }
};