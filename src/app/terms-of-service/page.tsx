import type { Metadata } from "next";
import { LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Birch Glen Lodge website and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalShell title="Terms of Service" effectiveDate="12/19/25">
      <p>
        By accessing or using the Birch Glen Lodge website, booking a stay, contacting us, or opting
        in to receive communications, you agree to the following Terms of Service (&ldquo;Terms&rdquo;).
        If you do not agree, please do not use our services.
      </p>

      <h2>1. About Birch Glen Lodge</h2>
      <p>
        Birch Glen Lodge is a privately owned motel located in Cascade, Idaho. We provide short-term
        lodging accommodations and related guest services.
      </p>

      <h2>2. Reservations &amp; Bookings</h2>
      <ul>
        <li>Reservations are subject to availability and confirmation.</li>
        <li>Rates, fees, minimum stays, and policies may vary by season or promotion.</li>
        <li>
          We reserve the right to refuse or cancel reservations for reasons including, but not
          limited to, suspected fraud, violation of policies, or safety concerns.
        </li>
      </ul>

      <h2>3. Check-In &amp; Check-Out</h2>
      <ul>
        <li>Check-in and check-out times are communicated at the time of booking.</li>
        <li>Early check-in or late check-out may be available upon request and may incur additional fees.</li>
        <li>Guests are responsible for returning room keys and leaving rooms in reasonable condition.</li>
      </ul>

      <h2>4. Payments, Cancellations &amp; Refunds</h2>
      <ul>
        <li>Payment policies, deposits, and cancellation terms are disclosed at the time of booking.</li>
        <li>Failure to cancel within the stated cancellation window may result in charges.</li>
        <li>No-shows may be charged according to the reservation policy.</li>
        <li>
          Refunds, if applicable, are issued at the discretion of Birch Glen Lodge in accordance
          with posted policies.
        </li>
      </ul>

      <h2>5. Guest Responsibilities</h2>
      <p>Guests agree to:</p>
      <ul>
        <li>Use the property respectfully and lawfully.</li>
        <li>Follow posted property rules and local laws.</li>
        <li>Avoid excessive noise, damage, or disruptive behavior.</li>
        <li>Be financially responsible for any damage caused to rooms or property during their stay.</li>
      </ul>
      <p>
        Birch Glen Lodge reserves the right to remove guests from the property without refund if
        policies are violated.
      </p>

      <h2>6. Property Use &amp; Liability</h2>
      <ul>
        <li>Guests stay at their own risk.</li>
        <li>Birch Glen Lodge is not responsible for loss, theft, or damage to personal property.</li>
        <li>Guests assume responsibility for their personal safety and the safety of accompanying individuals.</li>
        <li>
          To the fullest extent permitted by law, Birch Glen Lodge is not liable for injuries,
          losses, or damages arising from use of the property, except where prohibited by law.
        </li>
      </ul>

      <h2>7. Communications &amp; SMS Messaging</h2>
      <p>
        By providing your phone number or email address, you consent to receive communications from
        Birch Glen Lodge, which may include:
      </p>
      <ul>
        <li>Reservation confirmations and reminders</li>
        <li>Customer service messages</li>
        <li>Promotional offers (such as seasonal specials or gift cards)</li>
        <li>Review requests after your stay</li>
      </ul>
      <p>Message frequency may vary. Message and data rates may apply.</p>
      <p>
        You may opt out of SMS messages at any time by replying STOP. For help, reply HELP. Consent
        to receive messages is not required to make a purchase or booking.
      </p>

      <h2>8. Website Use</h2>
      <ul>
        <li>Content on this website is provided for general informational purposes.</li>
        <li>We make reasonable efforts to keep information accurate but do not guarantee completeness or availability.</li>
        <li>Unauthorized use, copying, or misuse of website content is prohibited.</li>
      </ul>

      <h2>9. Third-Party Services</h2>
      <p>
        Our website or booking process may link to third-party services (such as payment processors
        or booking platforms). Birch Glen Lodge is not responsible for the policies or actions of
        third-party providers.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        Birch Glen Lodge may update these Terms at any time. Updates will be posted on this page with
        a revised effective date. Continued use of our services constitutes acceptance of updated
        Terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Idaho, without regard to conflict of law
        principles.
      </p>

      <h2>12. Contact Information</h2>
      <p>If you have questions about these Terms or our services, please contact us:</p>
      <p>
        Birch Glen Lodge
        <br />
        Cascade, Idaho
        <br />
        Email: <a href="mailto:info@thebirchglenlodge.com">info@thebirchglenlodge.com</a>
        <br />
        Phone: (208) 510-0663
      </p>
    </LegalShell>
  );
}
