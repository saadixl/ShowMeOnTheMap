import './GameModal.css'

const GAMES = [
  {
    id: 'find-country',
    title: 'Find the Country',
    description: 'A country name appears — tap it on the map!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M12 8l1.5 2.5H16l-2 2 .8 3-2.8-1.5L9.2 15.5l.8-3-2-2h2.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'capital-quiz',
    title: 'Capital City Quiz',
    description: 'A capital city appears — find its country!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="10" width="18" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v7M9 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
]

export function GameModal({ open, onClose, onSelectGame }) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="game-modal-scrim"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="game-modal"
        role="dialog"
        aria-label="Choose a game"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="game-modal__head">
          <h2 className="game-modal__title">Games</h2>
          <button
            type="button"
            className="game-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="game-modal__list">
          {GAMES.map((game) => (
            <button
              key={game.id}
              type="button"
              className="game-modal__card"
              onClick={() => {
                onSelectGame(game.id)
                onClose()
              }}
            >
              <span className="game-modal__card-icon">{game.icon}</span>
              <span className="game-modal__card-text">
                <span className="game-modal__card-title">{game.title}</span>
                <span className="game-modal__card-desc">{game.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
