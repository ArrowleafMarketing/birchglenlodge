import type { Metadata } from "next";
import { LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Birch Glen Lodge collects, uses, and protects your personal information when you visit our website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        <strong>Effective Date:</strong> 5/1/25
      </p>
      <p>
        At The Birch Glen Lodge, your privacy is important to us. This Privacy Policy outlines how we
        collect, use, and protect your personal information when you visit our website,{" "}
        <a href="/">https://thebirchglenlodge.com/</a>.
      </p>

      <h3>1. Information We Collect</h3>
      <p>We may collect the following types of personal and technical information:</p>
      <ul>
        <li>
          <strong>Contact Information</strong> (such as name, phone number, email address)
        </li>
        <li>
          <strong>Reservation Details</strong> (such as dates of stay, number of guests)
        </li>
        <li>
          <strong>Payment Information</strong> (via our third-party booking engine)
        </li>
        <li>
          <strong>Technical Information</strong> (such as IP address, browser type, and device data)
        </li>
        <li>
          <strong>Location Information</strong> (based on your IP address)
        </li>
        <li>
          <strong>Usage Data</strong> through cookies and analytics tools
        </li>
      </ul>

      <h3>2. How We Collect Information</h3>
      <p>We collect information through:</p>
      <ul>
        <li>Booking and contact forms on our website</li>
        <li>Third-party platforms such as booking engines or payment processors</li>
        <li>Analytics and advertising tools like Google Analytics and Facebook Pixel</li>
        <li>Cookies and similar technologies</li>
      </ul>

      <h3>3. How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>Process and confirm your reservations</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Send you booking confirmations and updates</li>
        <li>Improve our website and services</li>
        <li>Run marketing and remarketing campaigns</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h3>4. Sharing Your Information</h3>
      <p>
        We may share your information with trusted third-party providers who assist us in operating
        our website and delivering services, including:
      </p>
      <ul>
        <li>Booking and payment processors</li>
        <li>Marketing and advertising platforms</li>
        <li>Email and communication services</li>
      </ul>
      <p>
        These providers are only authorized to use your information as necessary to perform services
        on our behalf.
      </p>

      <h3>5. Cookies and Tracking Technologies</h3>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Improve your browsing experience</li>
        <li>Analyze website traffic and usage</li>
        <li>Serve relevant ads through remarketing tools</li>
      </ul>
      <p>
        You can modify your cookie settings through your browser. By using our website, you consent
        to our use of cookies as described in this policy.
      </p>

      <h3>6. Data Security</h3>
      <p>
        We take reasonable steps to protect your information from unauthorized access, use, or
        disclosure. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h3>7. Your Rights</h3>
      <p>If you would like to:</p>
      <ul>
        <li>Access, correct, or delete your personal information</li>
        <li>Opt out of marketing emails or data collection tools</li>
      </ul>
      <p>You may contact us using the information below.</p>

      <h3>8. Contact Us</h3>
      <p>For any questions about this privacy policy or your data, please contact:</p>
      <p>
        <strong>The Birch Glen Lodge</strong>
        <br />
        <a href="mailto:info@thebirchglenlodge.com">info@thebirchglenlodge.com</a>
        <br />
        208-382-4238
      </p>

      <h3>9. Changes to This Policy</h3>
      <p>
        We may update this policy from time to time. The updated version will be posted on our
        website with a new effective date.
      </p>
    </LegalShell>
  );
}
