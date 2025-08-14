import { MusicData } from '@/sharedTypes/sharedTypes';

export function formatTime(duration?: number | null): string {
  if (typeof duration !== 'number' || isNaN(duration)) return '--:--';

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getUniqueValuesByKey(
  arr: MusicData[],
  key: keyof MusicData,
): string[] {
  const uniqueValue = new Set<string>();
  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValue.add(String(v));
        }
      });
    } else if (value) {
      uniqueValue.add(String(value));
    }
  });
  return Array.from(uniqueValue);
}
