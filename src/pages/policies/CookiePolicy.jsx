import PolicyLayout from './PolicyLayout.jsx'

export default function CookiePolicy() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="23 September 2026">
      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files that are placed on your device (computer, tablet, or
        mobile phone) when you visit a website. They are widely used to make websites work
        efficiently, provide a better user experience, and supply information to the website
        owners.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., authentication, session management, security)</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous data (e.g., pages visited, time spent, bounce rate)</li>
        <li><strong>Functional Cookies:</strong> Remember your preferences and settings to enhance your experience (e.g., language preference, region)</li>
        <li><strong>Security Cookies:</strong> Protect against fraud, detect suspicious activity, and safeguard user accounts</li>
      </ul>

      <h2>3. Specific Cookies We Use</h2>
      <ul>
        <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser. Used for maintaining login sessions and form state.</li>
        <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted. Used for remembering preferences and analytics.</li>
        <li><strong>Third-Party Cookies:</strong> Set by third-party services (e.g., Google Analytics) to collect usage data and improve our services.</li>
      </ul>

      <h2>4. Google Analytics</h2>
      <p>
        We use Google Analytics to analyze website traffic and usage patterns. Google Analytics
        uses cookies to collect information about how visitors use our website. This information
        is aggregated and anonymous. You can opt out of Google Analytics by installing the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-emerald-500">
          Google Analytics Opt-out Browser Add-on
        </a>.
      </p>

      <h2>5. Cookie Consent</h2>
      <p>
        When you first visit our website, a cookie consent banner will appear allowing you to
        accept or decline non-essential cookies. You can change your cookie preferences at any
        time by clicking the cookie settings link in our website footer.
      </p>

      <h2>6. Managing Cookies</h2>
      <p>You can control and manage cookies through your browser settings:</p>
      <ul>
        <li><strong>Block all cookies:</strong> Most browsers allow you to block all cookies. However, this may affect website functionality.</li>
        <li><strong>Delete cookies:</strong> You can delete existing cookies through your browser settings.</li>
        <li><strong>Third-party cookies:</strong> You can opt out of third-party advertising cookies through industry opt-out sites.</li>
      </ul>
      <p>
        Please note that disabling cookies may impact the functionality of certain features
        on our website, including the ability to log in and submit applications.
      </p>

      <h2>7. Security</h2>
      <ul>
        <li>Cookies used by our website do not store sensitive personal information</li>
        <li>Authentication cookies are encrypted and transmitted only over HTTPS</li>
        <li>We implement security measures to protect against unauthorized access to cookie data</li>
        <li>Session cookies are automatically invalidated upon logout</li>
      </ul>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology,
        legislation, or our operations. Any changes will be posted on this page with an updated
        effective date.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about our use of cookies, contact:
      </p>
      <ul>
        <li>Email: privacy@asuniquegroup.com</li>
        <li>Phone: +91 98765 43210</li>
      </ul>
    </PolicyLayout>
  )
}
