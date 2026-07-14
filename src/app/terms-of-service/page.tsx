import type { Metadata } from "next";
import { LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Birch Glen Lodge website and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalShell title="Terms of Service">
      <p>
        <strong>Effective Date:</strong> 12/19/25
      </p>
      <p>
        By accessing or using the Birch Glen Lodge website, booking a stay, contacting us, or opting
        in to receive communications, you agree to the following Terms of Service (&ldquo;Terms&rdquo;).
        If you do not agree, please do not use our services.
      </p>

      <hr />

      <h2>1. About Birch Glen Lodge</h2>
      <p>
        Birch Glen Lodge is a privately owned motel located in Cascade, Idaho. We provide short-term
        lodging accommodations and related guest services.
      </p>

      <hr />

      <h2>2. Reservations &amp; Bookings</h2>
      <ul>
        <li>
          <p>Reservations are subject to availability and confirmation.</p>
        </li>
        <li>
          <p>Rates, fees, minimum stays, and policies may vary by season or promotion.</p>
        </li>
        <li>
          <p>
            We reserve the right to refuse or cancel reservations for reasons including, but not
            limited to, suspected fraud, violation of policies, or safety concerns.
          </p>
        </li>
      </ul>

      <hr />

      <h2>3. Check-In &amp; Check-Out</h2>
      <ul>
        <li>
          <p>Check-in and check-out times are communicated at the time of booking.</p>
        </li>
        <li>
          <p>
            Early check-in or late check-out may be available upon request and may incur additional
            fees.
          </p>
        </li>
        <li>
          <p>
            Guests are responsible for returning room keys and leaving rooms in reasonable
            condition.
          </p>
        </li>
      </ul>

      <hr />

      <h2>4. Payments, Cancellations &amp; Refunds</h2>
      <ul>
        <li>
          <p>Payment policies, deposits, and cancellation terms are disclosed at the time of booking.</p>
        </li>
        <li>
          <p>Failure to cancel within the stated cancellation window may result in charges.</p>
        </li>
        <li>
          <p>No-shows may be charged according to the reservation policy.</p>
        </li>
        <li>
          <p>
            Refunds, if applicable, are issued at the discretion of Birch Glen Lodge in accordance
            with posted policies.
          </p>
        </li>
      </ul>

      <hr />

      <h2>5. Guest Responsibilities</h2>
      <p>Guests agree to:</p>
      <ul>
        <li>
          <p>Use the property respectfully and lawfully.</p>
        </li>
        <li>
          <p>Follow posted property rules and local laws.</p>
        </li>
        <li>
          <p>Avoid excessive noise, damage, or disruptive behavior.</p>
        </li>
        <li>
          <p>
            Be financially responsible for any damage caused to rooms or property during their stay.
          </p>
        </li>
      </ul>
      <p>
        Birch Glen Lodge reserves the right to remove guests from the property without refund if
        policies are violated.
      </p>

      <hr />

      <h2>6. Property Use &amp; Liability</h2>
      <ul>
        <li>
          <p>Guests stay at their own risk.</p>
        </li>
        <li>
          <p>
            Birch Glen Lodge is not responsible for loss, theft, or damage to personal property.
          </p>
        </li>
        <li>
          <p>
            Guests assume responsibility for their personal safety and the safety of accompanying
            individuals.
          </p>
        </li>
        <li>
          <p>
            To the fullest extent permitted by law, Birch Glen Lodge is not liable for injuries,
            losses, or damages arising from use of the property, except where prohibited by law.
          </p>
        </li>
      </ul>

      <hr />

      <h2>7. Communications &amp; SMS Messaging</h2>
      <p>
        By providing your phone number or email address, you consent to receive communications from
        Birch Glen Lodge, which may include:
      </p>
      <ul>
        <li>
          <p>Reservation confirmations and reminders</p>
        </li>
        <li>
          <p>Customer service messages</p>
        </li>
        <li>
          <p>Promotional offers (such as seasonal specials or gift cards)</p>
        </li>
        <li>
          <p>Review requests after your stay</p>
        </li>
      </ul>
      <p>
        <strong>Message frequency may vary.</strong>
        <br />
        <strong>Message and data rates may apply.</strong>
        <br />
        You may opt out of SMS messages at any time by replying <strong>STOP</strong>. For help,
        reply <strong>HELP</strong>.
      </p>
      <p>Consent to receive messages is not required to make a purchase or booking.</p>

      <hr />

      <h2>8. Website Use</h2>
      <ul>
        <li>
          <p>Content on this website is provided for general informational purposes.</p>
        </li>
        <li>
          <p>
            We make reasonable efforts to keep information accurate but do not guarantee
            completeness or availability.
          </p>
        </li>
        <li>
          <p>Unauthorized use, copying, or misuse of website content is prohibited.</p>
        </li>
      </ul>

      <hr />

      <h2>9. Third-Party Services</h2>
      <p>
        Our website or booking process may link to third-party services (such as payment processors
        or booking platforms). Birch Glen Lodge is not responsible for the policies or actions of
        third-party providers.
      </p>

      <hr />

      <h2>10. Changes to These Terms</h2>
      <p>
        Birch Glen Lodge may update these Terms at any time. Updates will be posted on this page with
        a revised effective date. Continued use of our services constitutes acceptance of updated
        Terms.
      </p>

      <hr />

      <h2>11. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the <strong>State of Idaho</strong>, without regard
        to conflict of law principles.
      </p>

      <hr />

      <h2>12. Contact Information</h2>
      <p>If you have questions about these Terms or our services, please contact us:</p>
      <p>
        <strong>Birch Glen Lodge</strong>
        <br />
        Cascade, Idaho
      </p>
      <p>Email: info@thebirchglenlodge.com</p>
      <p>Phone: (208) 510-0663</p>
    </LegalShell>
  );
}
