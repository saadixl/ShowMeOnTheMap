import { SitePageShell } from './SitePageShell.jsx'
import { EmailLink } from '../EmailLink.jsx'

export function PrivacyPage() {
  return (
    <SitePageShell title="Privacy Policy" description="ShowMeOnTheMap privacy policy — learn what data we collect, how we use it, and how we protect your information.">
      <p>Last updated: 2026-05-24</p>

      <h2>Overview</h2>
      <p>
        ShowMeOnTheMap is an interactive world map for exploring countries
        and data overlays. We aim to collect the minimum data needed to
        operate and improve the app. This policy explains what we collect,
        why we collect it, and how we handle it.
      </p>

      <h2>Information we collect</h2>

      <h3>Location data (optional)</h3>
      <p>
        If you choose to allow browser geolocation, we make a one-time
        request to match your position to a country and display a star
        on the map. We do not store raw GPS coordinates. The derived
        country code and your choice to dismiss the location prompt are
        stored in your browser&apos;s local storage so the experience stays
        consistent across reloads.
      </p>

      <h3>Account data (optional)</h3>
      <p>
        If you sign in with Google, the app stores the following under your
        Firebase account: the list of countries in your &quot;Countries
        I&apos;ve visited&quot; collection (as ISO country codes), the
        derived country code for the map star, and whether you dismissed the
        location prompt. You can remove visited countries at any time.
        Signing out stops syncing until you sign in again.
      </p>

      <h3>Local storage (signed-out users)</h3>
      <p>
        For visitors who are not signed in, the app stores your derived
        country code and location-prompt preference in your browser&apos;s
        local storage. No data leaves your device in this case.
      </p>

      <h2>Cookies and tracking technologies</h2>
      <p>
        ShowMeOnTheMap itself does not set first-party tracking cookies.
        However, a third-party service embedded on the site may set its
        own cookies:
      </p>
      <ul>
        <li>
          <strong>Firebase Authentication</strong> may set session cookies
          when you sign in with Google. These are used solely to maintain
          your login session.
        </li>
      </ul>

      <h2>How we use your data</h2>
      <ul>
        <li>To display your location star on the map.</li>
        <li>To save and sync your visited-countries list across sessions.</li>
        <li>To remember your prompt-dismissal preference so we do not ask again.</li>
      </ul>

      <h2>Data sharing</h2>
      <p>
        We do not sell, rent, or trade your personal information. Data is
        shared only with the third-party service described above (Firebase)
        as necessary to provide the service.
      </p>

      <h2>Data retention</h2>
      <p>
        Local storage data persists until you clear your browser data.
        Firebase account data is retained as long as your account exists.
        You can delete your visited-countries list from within the app at
        any time.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        ShowMeOnTheMap is not directed at children under 13. We do not
        knowingly collect personal information from children. If you
        believe a child has provided us with data, please contact us so we
        can remove it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to access,
        correct, or delete the personal data we hold about you. To exercise
        these rights, email <EmailLink />.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this privacy policy from time to time. The &quot;Last
        updated&quot; date at the top reflects the most recent revision.
        Continued use of the site after changes constitutes acceptance of
        the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email <EmailLink />.
      </p>
    </SitePageShell>
  )
}
