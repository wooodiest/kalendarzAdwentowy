const imageModules = import.meta.glob('../data/klasa*/**/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const imageMap = {};

Object.entries(imageModules).forEach(([path, url]) => {
  const match = path.match(/..\/data\/(klasa[^/]+)\/(\d+)\.(png|jpe?g)$/);
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


