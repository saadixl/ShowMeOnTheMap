import { SitePageShell } from './SitePageShell.jsx'
import { EmailLink } from '../EmailLink.jsx'

export function TermsPage() {
  return (
    <SitePageShell title="Terms of Service" description="Terms of service for ShowMeOnTheMap — the free interactive world map for exploring countries with data overlays.">
      <p>Last updated: 2026-05-24</p>

      <h2>Acceptance of terms</h2>
      <p>
        By accessing or using ShowMeOnTheMap you agree to these Terms of
        Service. If you do not agree, please do not use the site. We may
        update these terms from time to time; continued use after changes
        constitutes acceptance of the revised terms.
      </p>

      <h2>Description of the service</h2>
      <p>
        ShowMeOnTheMap is a free, interactive world map that lets you
        explore countries and highlight regions using data overlays such as
        continents, languages, religions, historical empires, driving side,
        and transcontinental status. The service is provided for
        educational and informational purposes.
      </p>

      <h2>Permitted use</h2>
      <ul>
        <li>You may use the site for personal, educational, and non-commercial purposes.</li>
        <li>You may share links to the map, including overlay-specific URLs.</li>
        <li>You may take screenshots for personal or educational use with attribution.</li>
      </ul>

      <h2>Prohibited conduct</h2>
      <ul>
        <li>Do not attempt to disrupt, overload, or interfere with the service.</li>
        <li>Do not scrape, crawl, or automatically extract data from the site without permission.</li>
        <li>Do not use the site to distribute malware or engage in illegal activity.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The site design, code, and curated data overlays are the property
        of ShowMeOnTheMap. Underlying geographic data is sourced from
        open datasets and attributed where required. Nothing in these terms
        grants you ownership of any site content beyond what is permitted
        under the Permitted Use section.
      </p>

      <h2>Accuracy disclaimer</h2>
      <p>
        Map overlays and country information are provided for educational
        purposes only. Borders, classifications, language distributions,
        religious demographics, and traffic rules vary by source and change
        over time. We strive for accuracy but do not guarantee that all
        data is current or complete.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site uses Firebase for optional authentication and data
        storage. Your use of that service is governed by its terms and
        privacy policy.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        ShowMeOnTheMap is provided &quot;as is&quot; without warranties of
        any kind, express or implied. We are not liable for any damages
        arising from your use of the site or reliance on its content.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <EmailLink />.
      </p>
    </SitePageShell>
  )
}
