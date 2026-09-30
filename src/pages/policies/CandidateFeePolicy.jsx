import PolicyLayout from './PolicyLayout.jsx'

export default function CandidateFeePolicy() {
  return (
    <PolicyLayout title="Candidate Fee and Payment Policy" lastUpdated="23 September 2026">
      <h2>1. Fee Principles</h2>
      <p>
        AL WAHID RECRUITER adheres strictly to the fee regulations set by the Ministry of
        External Affairs (MEA), Government of India. We are committed to transparent, fair,
        and lawful fee practices for all candidates.
      </p>

      <h2>2. Permitted Fees</h2>
      <p>
        The following fees may be charged to candidates as per MEA guidelines:
      </p>
      <ul>
        <li><strong>Processing Fee:</strong> For application review, document verification, and recruitment processing</li>
        <li><strong>Service Charge:</strong> For recruitment facilitation and employer coordination</li>
        <li><strong>Medical Examination Fee:</strong> As charged by the designated medical facility</li>
        <li><strong>Police Clearance Fee:</strong> As charged by the relevant authorities</li>
        <li><strong>Passport and Visa Fees:</strong> As charged by the respective government authorities</li>
        <li><strong>Travel Expenses:</strong> Flight ticket and airport transfer costs at actuals</li>
        <li><strong>Pre-departure Orientation:</strong> Training and orientation charges (if applicable)</li>
      </ul>
      <p>
        <strong>Note:</strong> The total fee charged to a candidate shall not exceed the limits
        prescribed by the MEA for the destination country.
      </p>

      <h2>3. Prohibited Fees</h2>
      <p>The following fees are strictly prohibited:</p>
      <ul>
        <li>Any fee charged before issuance of a valid offer letter</li>
        <li>Hidden charges or fees not disclosed in the official fee schedule</li>
        <li>Commission or kickback deductions from candidate salary</li>
        <li>Excessive deposits or security amounts beyond regulatory limits</li>
        <li>Charges for providing job listings or basic information</li>
      </ul>

      <h2>4. Payment Methods</h2>
      <p>Accepted payment methods include:</p>
      <ul>
        <li><strong>Bank Transfer / NEFT / RTGS:</strong> To the agency's official bank account only</li>
        <li><strong>Demand Draft:</strong> Drawn in favor of "AL WAHID RECRUITER"</li>
        <li><strong>Online Payment:</strong> Through the secure payment gateway on our website</li>
        <li><strong>UPI:</strong> Through official UPI handles displayed on the website</li>
      </ul>
      <p>
        <strong>Important:</strong> Cash payments to individual agents or representatives are
        strictly prohibited. The agency shall not be responsible for payments made outside
        official channels.
      </p>

      <h2>5. Official Receipts</h2>
      <ul>
        <li>A digitally generated official receipt will be issued for every payment received</li>
        <li>Receipts will include: payment date, amount, purpose, transaction reference, and authorized signature</li>
        <li>Candidates must retain receipts for their records and future reference</li>
        <li>Any payment without an official receipt should be reported immediately</li>
      </ul>

      <h2>6. Third-Party Charges</h2>
      <ul>
        <li>Medical examination fees are payable directly to the designated medical center</li>
        <li>Government charges (visa, passport, police clearance) are payable to the respective authorities</li>
        <li>The agency will provide a clear breakdown distinguishing agency fees from third-party charges</li>
        <li>Third-party receipts will be provided by the respective service providers</li>
      </ul>

      <h2>7. Refund Policy</h2>
      <p>Refunds may be applicable in the following circumstances:</p>
      <ul>
        <li><strong>Job Not Commenced:</strong> If the candidate does not travel for employment, a refund of processing fees (less administrative charges) may be provided upon written request</li>
        <li><strong>Job Cancellation by Employer:</strong> Full refund of all fees paid by the candidate</li>
        <li><strong>Visa Rejection:</strong> Refund of fees less government charges and medical examination costs</li>
        <li><strong>Duplicate Payment:</strong> Full refund of the duplicated amount</li>
      </ul>
      <p>Refund requests must be submitted in writing within 30 days of the triggering event. Processing time for approved refunds is 15-30 business days.</p>

      <h2>8. Fee Disputes</h2>
      <p>
        Any dispute regarding fees charged should be reported through our{' '}
        <a href="/complaints" className="text-primary hover:text-emerald-500">Complaints and Grievance Process</a>.
        All disputes will be reviewed and resolved in accordance with MEA guidelines and applicable laws.
      </p>
    </PolicyLayout>
  )
}
