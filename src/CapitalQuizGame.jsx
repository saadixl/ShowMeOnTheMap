import { useCallback, useEffect, useRef, useState } from 'react'
import { getCountryDisplayName } from './countryCatalog.js'
import { CAPITAL_CITIES } from './capitalCities.js'
import './FindCountryGame.css'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function CapitalQuizGame({
  visibleCountries,
  onGuess,
  onEnd,
  onCorrect,
  onWrong,
  onReset,
}) {
  const codesWithCapitals = (visibleCountries ?? []).filter(
    (c) => CAPITAL_CITIES[c.toUpperCase()],
  )
  const [queue, setQueue] = useState(() => shuffleArray(codesWithCapitals))
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [locked, setLocked] = useState(false)
  const lastResultTimer = useRef(null)

  const currentCode = queue[index] ?? null
  const capitalName = currentCode
    ? CAPITAL_CITIES[currentCode.toUpperCase()]
    : null

  const handleGuess = useCallback(
    (alpha2) => {
      if (!currentCode || locked) return
      const isCorrect = alpha2?.toUpperCase() === currentCode.toUpperCase()
      setAttempts((a) => a + 1)
      if (lastResultTimer.current) clearTimeout(lastResultTimer.current)
      if (isCorrect) {
        setCorrect((c) => c + 1)
        setLastResult('correct')
        onCorrect?.(currentCode)
        setIndex((i) => i + 1)
        lastResultTimer.current = setTimeout(() => setLastResult(null), 1200)
      } else {
        setLastResult('wrong')
        setLocked(true)
        onWrong?.(alpha2?.toUpperCase(), currentCode)
        lastResultTimer.current = setTimeout(() => {
          setLastResult(null)
          setLocked(false)
          setIndex((i) => i + 1)
        }, 2500)
      }
    },
    [currentCode, locked, onCorrect, onWrong],
  )

  useEffect(() => {
    if (onGuess) onGuess.current = handleGuess
  }, [onGuess, handleGuess])

  useEffect(() => {
    return () => {
      if (lastResultTimer.current) clearTimeout(lastResultTimer.current)
    }
  }, [])

  const handleReset = () => {
    if (lastResultTimer.current) clearTimeout(lastResultTimer.current)
    const fresh = (visibleCountries ?? []).filter(
      (c) => CAPITAL_CITIES[c.toUpperCase()],
    )
    setQueue(shuffleArray(fresh))
    setIndex(0)
    setCorrect(0)
    setAttempts(0)
    setLastResult(null)
    setLocked(false)
    onReset?.()
  }

  const finished = index >= queue.length

  return (
    <div className={`find-country-game${lastResult ? ` find-country-game--${lastResult}` : ''}`}>
      <div className="find-country-game__head">
        <span className="find-country-game__label">Capital City Quiz</span>
        <span className="find-country-game__actions">
          <button
            type="button"
            className="find-country-game__btn"
            aria-label="Reset game"
            title="Reset"
            onClick={handleReset}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1-1.76-4.24L14 10h6V4l-2.35 2.35Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="find-country-game__btn find-country-game__btn--stop"
            aria-label="End game"
            title="End game"
            onClick={onEnd}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
            </svg>
          </button>
        </span>
      </div>
      {finished ? (
        <div className="find-country-game__done">
          All done! {correct}/{attempts}
        </div>
      ) : (
        <>
          <div className="find-country-game__target">{capitalName}</div>
          <div className="find-country-game__score">
            {correct}/{attempts}
            {lastResult === 'correct' && <span className="find-country-game__flash find-country-game__flash--correct">✓</span>}
            {lastResult === 'wrong' && <span className="find-country-game__flash find-country-game__flash--wrong">✗</span>}
          </div>
        </>
      )}
    </div>
  )
}
