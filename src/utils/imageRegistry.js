const imageModules = import.meta.glob('../data/class*/**/*.{png,jpg,jpeg}', {
  eager: true,
  as: 'url',
});

const imageMap = {};

Object.entries(imageModules).forEach(([path, url]) => {
  // Przykład ścieżki: ../data/class1/1.png
  const match = path.match(/..\/data\/(class[^/]+)\/(\d+)\.(png|jpe?g)$/);
  if (!match) return;

  const [, classId, day] = match;
  if (!imageMap[classId]) {
    imageMap[classId] = {};
  }

  imageMap[classId][day] = url;
});

export function getTaskImage(classId, day) {
  if (!classId || !day) return null;
  return imageMap[classId]?.[String(day)] ?? null;
}


