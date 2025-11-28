const extensions = ["png", "jpg", "jpeg"];

/**
 * Sprawdza czy obrazek istnieje używając obiektu Image()
 * To działa lepiej w produkcji niż fetch HEAD
 */
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function getTaskImage(classId, day) {
  if (!classId || !day) return null;

  for (const ext of extensions) {
    const url = `/data/${classId}/${day}.${ext}`;
    const exists = await checkImageExists(url);
    
    if (exists) {
      return url;
    }
  }

  return null;
}
