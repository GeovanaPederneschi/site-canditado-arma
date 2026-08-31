const blips = [
  { top: '30%', left: '62%', delay: '0s' },
  { top: '58%', left: '35%', delay: '0.8s' },
  { top: '68%', left: '70%', delay: '1.6s' },
  { top: '25%', left: '30%', delay: '1.1s' },
]

export default function Radar({ className = '' }) {
  return (
    <div className={`radar-wrap aspect-square ${className}`}>
      <div className="radar-rings" />
      <div className="radar-sweep" />
      {blips.map((b, i) => (
        <div key={i} className="radar-blip" style={{ top: b.top, left: b.left, animationDelay: b.delay }} />
      ))}
      {/* crosshair center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4ADE80]" />
    </div>
  )
}
