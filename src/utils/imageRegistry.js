const extensions = ["png", "jpg", "jpeg"];

export async function getTaskImage(classId, day) {
  if (!classId || !day) return null;

  for (const ext of extensions) {
    const url = `/data/${classId}/${day}.${ext}`;

    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) {
        return url;
      }
    } catch {
      continue;
    }
  }

  return null;
}
