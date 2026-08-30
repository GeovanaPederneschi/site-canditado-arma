const candidatoAvatarInnerSvg = `
  <defs>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C99B76" />
      <stop offset="100%" stop-color="#A87C57" />
    </linearGradient>
  </defs>

  <circle cx="150" cy="150" r="148" fill="#22262E" />
  <circle cx="150" cy="150" r="148" fill="none" stroke="#4A5568" stroke-opacity="0.5" stroke-width="3" />

  <!-- shoulders / uniform -->
  <path
    d="M 150 168
       C 208 168 246 204 252 258
       L 258 300
       L 42 300
       L 48 258
       C 54 204 92 168 150 168 Z"
    fill="#2D3138"
  />
  <path d="M 150 172 L 140 210 L 150 226 L 160 210 Z" fill="#4A5568" />

  <!-- neck -->
  <rect x="132" y="150" width="36" height="34" rx="8" fill="url(#skinGrad)" />

  <!-- head -->
  <circle cx="150" cy="110" r="60" fill="url(#skinGrad)" />

  <!-- short hair -->
  <path d="M 94 104 Q 92 52 150 50 Q 208 52 206 104 Q 200 68 150 66 Q 100 68 94 104 Z" fill="#2B2016" />

  <!-- face -->
  <ellipse cx="128" cy="112" rx="5.5" ry="4" fill="#1F1710" />
  <ellipse cx="172" cy="112" rx="5.5" ry="4" fill="#1F1710" />
  <path d="M 118 98 Q 128 92 138 97" stroke="#1F1710" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M 162 97 Q 172 92 182 98" stroke="#1F1710" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M 128 140 Q 150 148 172 140" stroke="#6B4A32" stroke-width="3" fill="none" stroke-linecap="round" />

  <!-- shield badge -->
  <path d="M 234 200 L 258 210 V 232 C 258 250 246 262 234 268 C 222 262 210 250 210 232 V 210 Z" fill="#B91C1C" stroke="#22262E" stroke-width="3" />
  <path d="M 234 210 L 250 217 V 232 C 250 244 242 252 234 257 C 226 252 218 244 218 232 V 217 Z" fill="#22262E" />
  <path d="M 226 233 L 231 239 L 244 224" stroke="#E5E7EB" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
`.trim()

export const candidatoAvatarSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">${candidatoAvatarInnerSvg}</svg>`

export const candidatoAvatarDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(candidatoAvatarSvgMarkup)}`

export default function CandidatoAvatar({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: candidatoAvatarInnerSvg }}
    />
  )
}
