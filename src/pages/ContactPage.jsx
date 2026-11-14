import { SitePageShell } from './SitePageShell.jsx'
import { EmailLink } from '../EmailLink.jsx'
import './ContentCards.css'

export function ContactPage() {
  return (
    <SitePageShell title="Contact" description="Get in touch with the ShowMeOnTheMap team — send feedback, report data corrections, or ask questions about the interactive world map.">
      <p className="content-intro">
        We welcome your feedback, questions, and suggestions.
        ShowMeOnTheMap is a community-driven project and hearing from
        users helps us improve.
      </p>

      <div className="content-cards">
        {/* Get in touch */}
        <div className="content-card content-card--accent">
          <div className="content-card__header">
            <span className="content-card__icon">✉️</span>
            <h2 className="content-card__title">Get in touch</h2>
          </div>
          <p className="content-card__body">
            For support, feedback, data corrections, or business inquiries,
            email <EmailLink />.
            We aim to respond within two business days.
          </p>
        </div>

        {/* What to include */}
        <div className="content-grid">
          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">🐛</span>
              <h2 className="content-card__title">Bug reports</h2>
            </div>
            <p className="content-card__body">
              Describe what you expected to happen, what happened instead,
              and your browser/device if possible.
            </p>
          </div>

          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">📊</span>
              <h2 className="content-card__title">Data corrections</h2>
            </div>
            <p className="content-card__body">
              Let us know which country or overlay is inaccurate and include
              a source if you have one.
            </p>
          </div>

          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">💡</span>
              <h2 className="content-card__title">Feature requests</h2>
            </div>
            <p className="content-card__body">
              Describe the overlay, dataset, or interaction you would like
              to see added.
            </p>
          </div>

          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">💬</span>
              <h2 className="content-card__title">General feedback</h2>
            </div>
            <p className="content-card__body">
              Anything that would make the map more useful for you — we read
              every message.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="content-card content-card--faq">
          <div className="content-card__header">
            <span className="content-card__icon">❓</span>
            <h2 className="content-card__title">Frequently asked questions</h2>
          </div>
          <div className="content-cards">
            <div className="content-card">
              <h3 className="content-card__question">Is ShowMeOnTheMap free to use?</h3>
              <p className="content-card__answer">
                Yes. The site is completely free to use.
                No account is required to explore the map and all overlays.
              </p>
            </div>
            <div className="content-card">
              <h3 className="content-card__question">How do I report incorrect data?</h3>
              <p className="content-card__answer">
                Email us with the country name, overlay category, and what you
                believe is correct. We review every report and update the data
                when a reliable source confirms the correction.
              </p>
            </div>
            <div className="content-card">
              <h3 className="content-card__question">Can I use screenshots of the map?</h3>
              <p className="content-card__answer">
                You may use screenshots for personal, educational, and
                non-commercial purposes with attribution to ShowMeOnTheMap.
              </p>
            </div>
            <div className="content-card">
              <h3 className="content-card__question">Do you plan to add more overlays?</h3>
              <p className="content-card__answer">
                Yes. We regularly research and add new data layers. If you have
                a specific dataset in mind, send us a suggestion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SitePageShell>
  )
}
