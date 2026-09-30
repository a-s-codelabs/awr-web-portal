import PolicyLayout from './PolicyLayout.jsx'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="23 September 2026">
      <h2>1. Introduction</h2>
      <p>
        AL WAHID RECRUITER ("we", "us", "our") is committed to protecting the privacy and security
        of your personal information. This Privacy Policy explains how we collect, use, share,
        store, and protect information about candidates, employers, and visitors of our website
        (awr.asuniquegroup.com).
      </p>
      <p>
        By accessing or using our website, you consent to the practices described in this policy.
        If you do not agree, please discontinue use of our website immediately.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Candidate Information</h3>
      <ul>
        <li>Full name, email address, phone number, and nationality</li>
        <li>Resume/CV, educational certificates, professional qualifications, and work experience</li>
        <li>Passport details, visa history, and deployment records</li>
        <li>Medical fitness records and police clearance certificates</li>
        <li>Payment transaction records related to recruitment processing</li>
      </ul>

      <h3>2.2 Employer Information</h3>
      <ul>
        <li>Company name, registration details, and trade license information</li>
        <li>Contact person name, email, phone number, and designation</li>
        <li>Job requirements, salary details, and deployment terms</li>
        <li>Contract and agreement records</li>
      </ul>

      <h3>2.3 Visitor Information</h3>
      <ul>
        <li>IP address, browser type, device type, and operating system</li>
        <li>Pages visited, time spent, referral source, and click patterns</li>
        <li>Cookie identifiers and analytics data</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To process candidate registrations, job applications, and recruitment workflows</li>
        <li>To match candidates with suitable overseas employment opportunities</li>
        <li>To communicate with candidates and employers regarding applications and job offers</li>
        <li>To process payments, issue receipts, and maintain financial records</li>
        <li>To verify candidate credentials, qualifications, and deployment eligibility</li>
        <li>To comply with MEA (Ministry of External Affairs) regulatory requirements</li>
        <li>To improve website functionality, user experience, and service quality</li>
        <li>To send service-related notifications, updates, and responses to inquiries</li>
        <li>To detect, prevent, and address fraud, security breaches, and misuse</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Overseas employers:</strong> Candidate profiles and qualifications for job matching purposes</li>
        <li><strong>Government authorities:</strong> MEA, Protector of Emigrants (POE), immigration departments, and regulatory bodies as required by law</li>
        <li><strong>Medical and verification agencies:</strong> For candidate fitness assessments, background checks, and document verification</li>
        <li><strong>Travel and logistics partners:</strong> For visa processing, flight booking, and deployment coordination</li>
        <li><strong>Payment processors:</strong> For secure handling of recruitment-related transactions</li>
        <li><strong>Legal and regulatory bodies:</strong> When required by law, court order, or regulatory obligation</li>
      </ul>
      <p>
        We do not sell, rent, or trade your personal information to third parties for marketing purposes.
      </p>

      <h2>5. Data Storage and Security</h2>
      <ul>
        <li>All personal data is stored on secure servers with industry-standard encryption</li>
        <li>Access to personal information is restricted to authorized personnel only</li>
        <li>We implement administrative, technical, and physical safeguards to prevent unauthorized access</li>
        <li>Payment information is processed through PCI-DSS compliant payment gateways</li>
        <li>Physical records are stored in locked facilities with controlled access</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal information for as long as necessary to fulfill the purposes
        outlined in this policy, comply with legal obligations, resolve disputes, and enforce
        agreements. Candidate records are retained in accordance with MEA guidelines and
        applicable labor laws.
      </p>

      <h2>7. Your Rights</h2>
      <ul>
        <li>Access and obtain a copy of your personal data</li>
        <li>Correct inaccurate or incomplete information</li>
        <li>Request deletion of your personal data (subject to legal obligations)</li>
        <li>Opt out of non-essential communications</li>
        <li>Lodge a complaint with a relevant data protection authority</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        Our website uses cookies and similar technologies to enhance your browsing experience,
        analyze traffic, and improve our services. Please refer to our{' '}
        <a href="/cookies" className="text-primary hover:text-emerald-500">Cookie Policy</a>{' '}
        for detailed information.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the
        privacy practices or content of those sites. We encourage you to review their privacy
        policies before providing any personal information.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with an updated effective date. Continued use of the website after changes constitutes
        acceptance of the revised policy.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        For questions about this Privacy Policy or to exercise your data rights, contact us at:
      </p>
      <ul>
        <li>Email: privacy@asuniquegroup.com</li>
        <li>Phone: +91 98765 43210</li>
        <li>Address: AL WAHID RECRUITER, Part of AS Unique Group, India</li>
      </ul>
    </PolicyLayout>
  )
}
