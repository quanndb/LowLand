export function hashStringToNumber(str) {
  const FNV_PRIME = 0x01000193; // 16777619
  const OFFSET_BASIS = 0x811c9dc5; // 2166136261

  let hash = OFFSET_BASIS;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash *= FNV_PRIME;
    hash = hash >>> 0; // Chuyển đổi thành số nguyên không dấu 32-bit
  }

  return hash;
}
