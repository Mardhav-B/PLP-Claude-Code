// Generates a deterministic SVG data-URI placeholder image so the demo
// never depends on external network requests. Swap ProductCard's <img src>
// for a real CDN URL once the backend provides product images.
const PALETTE = [
  ['#FDE9E0', '#E85D3D'],
  ['#E8F1FD', '#3D6FE8'],
  ['#E9FDEB', '#3DAE5F'],
  ['#FDF3E0', '#E8A23D'],
  ['#F3E8FD', '#8A3DE8'],
  ['#E0FBFD', '#3DBCE8'],
  ['#FDE0F0', '#E83D9E'],
  ['#F0FDE0', '#84C21B'],
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function placeholderImage(seed, label) {
  const idx = hashString(seed) % PALETTE.length;
  const [bg, fg] = PALETTE[idx];
  const initials = label
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
      <rect width="480" height="480" fill="${bg}"/>
      <circle cx="240" cy="200" r="90" fill="${fg}" opacity="0.15"/>
      <text x="50%" y="52%" font-family="'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700" fill="${fg}" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
