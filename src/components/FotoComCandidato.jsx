import { useCallback, useEffect, useRef, useState } from 'react'
import { candidatoAvatarDataUrl } from './CandidatoAvatar'

const CANVAS_SIZE = 1080
const BANNER_HEIGHT = 176
const PHOTO_HEIGHT = CANVAS_SIZE - BANNER_HEIGHT
const DIVIDER_WIDTH = 10
const MAX_FILE_SIZE = 15 * 1024 * 1024

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawCover(ctx, img, x, y, w, h) {
  const imgRatio = img.width / img.height
  const boxRatio = w / h
  let sx, sy, sw, sh
  if (imgRatio > boxRatio) {
    sh = img.height
    sw = sh * boxRatio
    sx = (img.width - sw) / 2
    sy = 0
  } else {
    sw = img.width
    sh = sw / boxRatio
    sx = 0
    sy = (img.height - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

export default function FotoComCandidato() {
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const candidatoImgRef = useRef(null)
  const userImgRef = useRef(null)

  const [userImageSrc, setUserImageSrc] = useState(null)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    const halfWidth = CANVAS_SIZE / 2

    if (userImgRef.current) {
      drawCover(ctx, userImgRef.current, 0, 0, halfWidth - DIVIDER_WIDTH / 2, PHOTO_HEIGHT)
    } else {
      ctx.fillStyle = '#22262E'
      ctx.fillRect(0, 0, halfWidth - DIVIDER_WIDTH / 2, PHOTO_HEIGHT)
      ctx.fillStyle = '#9AA3B2'
      ctx.font = '600 30px Inter, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Sua foto aqui', halfWidth / 2, PHOTO_HEIGHT / 2)
    }

    ctx.fillStyle = '#16181D'
    ctx.fillRect(halfWidth + DIVIDER_WIDTH / 2, 0, halfWidth - DIVIDER_WIDTH / 2, PHOTO_HEIGHT)
    if (candidatoImgRef.current) {
      drawCover(
        ctx,
        candidatoImgRef.current,
        halfWidth + DIVIDER_WIDTH / 2,
        0,
        halfWidth - DIVIDER_WIDTH / 2,
        PHOTO_HEIGHT,
      )
    }

    ctx.fillStyle = '#B91C1C'
    ctx.fillRect(halfWidth - DIVIDER_WIDTH / 2, 0, DIVIDER_WIDTH, PHOTO_HEIGHT)

    ctx.fillStyle = '#0F1115'
    ctx.fillRect(0, PHOTO_HEIGHT, CANVAS_SIZE, BANNER_HEIGHT)
    ctx.fillStyle = '#B91C1C'
    ctx.fillRect(0, PHOTO_HEIGHT, CANVAS_SIZE, 6)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = '400 56px "Bebas Neue", Inter, sans-serif'
    ctx.fillText('EU APOIO MARCOS TEIXEIRA', CANVAS_SIZE / 2, PHOTO_HEIGHT + 78)

    ctx.fillStyle = '#B91C1C'
    ctx.font = '700 30px Inter, system-ui, sans-serif'
    ctx.fillText('Deputado Estadual · Número 1911', CANVAS_SIZE / 2, PHOTO_HEIGHT + 128)
  }, [])

  useEffect(() => {
    let cancelled = false
    loadImage(candidatoAvatarDataUrl).then((img) => {
      if (cancelled) return
      candidatoImgRef.current = img
      draw()
    })
    return () => {
      cancelled = true
    }
  }, [draw])

  useEffect(() => {
    if (!userImageSrc) {
      userImgRef.current = null
      draw()
      return
    }
    let cancelled = false
    setStatus('loading')
    loadImage(userImageSrc)
      .then((img) => {
        if (cancelled) return
        userImgRef.current = img
        draw()
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setErrorMsg('Não foi possível abrir essa imagem. Tente outro arquivo.')
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [userImageSrc, draw])

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Envie um arquivo de imagem (JPG, PNG ou WEBP).')
      setStatus('error')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg('A imagem é muito grande. Envie um arquivo de até 15MB.')
      setStatus('error')
      return
    }
    setErrorMsg('')
    const reader = new FileReader()
    reader.onload = () => setUserImageSrc(reader.result)
    reader.onerror = () => {
      setErrorMsg('Não foi possível ler esse arquivo. Tente novamente.')
      setStatus('error')
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e) => handleFile(e.target.files?.[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'eu-apoio-marcos-teixeira.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const handleReset = () => {
    setUserImageSrc(null)
    setErrorMsg('')
    setStatus('idle')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <section id="foto-com-candidato" className="py-20 lg:py-28 bg-[#0F1115]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] text-xs font-bold uppercase tracking-widest">
              Participe da campanha
            </span>
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-5 tracking-wide">
            Sua foto ao lado de Marcos
          </h2>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Envie uma foto sua e gere, na hora, uma imagem lado a lado com o
            candidato — pronta para postar nos stories e no feed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
                isDragging ? 'border-[#B91C1C] bg-white/5' : 'border-[#4A5568]/40 bg-[#22262E]/40'
              }`}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" aria-label="Enviar foto" />
              <div className="w-14 h-14 bg-[#B91C1C] flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 8.25L12 3.75m0 0L7.5 8.25M12 3.75v12" />
                </svg>
              </div>
              <p className="font-semibold text-white mb-1">
                {userImageSrc ? 'Trocar foto' : 'Clique ou arraste sua foto aqui'}
              </p>
              <p className="text-white/40 text-sm">JPG, PNG ou WEBP · até 15MB</p>
            </div>

            {status === 'error' && errorMsg && (
              <p className="text-[#F87171] text-sm font-medium" role="alert">{errorMsg}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!userImageSrc || status !== 'ready'}
                className="bg-[#B91C1C] text-white px-8 py-4 font-semibold text-sm hover:bg-[#7F1414] transition-colors duration-200 shadow-md disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                Baixar imagem
              </button>
              {userImageSrc && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="border-2 border-[#4A5568] text-white px-8 py-4 font-semibold text-sm hover:bg-white/5 transition-colors duration-200 uppercase tracking-wide"
                >
                  Remover
                </button>
              )}
            </div>

            <p className="text-white/40 text-xs leading-relaxed">
              Depois de baixar, poste nos stories ou no feed com a hashtag{' '}
              <span className="font-semibold text-[#B91C1C]">#MarcosTeixeira1911</span>. Sua foto
              fica salva apenas no seu dispositivo — nada é enviado a servidores.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-full max-w-sm overflow-hidden shadow-2xl border border-[#4A5568]/40">
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="w-full h-auto block"
                aria-label="Pré-visualização da imagem lado a lado com o candidato"
              />
            </div>
            <p className="text-white/30 text-xs">Pré-visualização em tempo real</p>
          </div>
        </div>
      </div>
    </section>
  )
}
