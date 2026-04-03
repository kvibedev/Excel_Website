import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div>
      <SEO
        title="Privacy Policy"
        description="Excel Facility Services Group privacy policy — how we collect, use, and protect your personal information."
        path="/privacy-policy"
        keywords="privacy policy, data protection, Excel Facility Services Group"
      />
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-privacy-title">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80" data-testid="text-privacy-subtitle">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <h2 data-testid="text-section-introduction">Introduction</h2>
            <p>
              Excel Facility Services Group ("EFSG," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
            </p>

            <h2 data-testid="text-section-information-collected">Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <h3>Personal Data</h3>
            <p>
              When you fill out a contact form, request an estimate, or register as a vendor, we may collect personally identifiable information such as your name, email address, phone number, mailing address, company name, and other information you voluntarily provide.
            </p>
            <h3>Usage Data</h3>
            <p>
              We may automatically collect certain information when you visit our website, including your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website. This information is used to improve the performance and usability of our website.
            </p>

            <h2 data-testid="text-section-use-of-information">Use of Your Information</h2>
            <p>We may use the information we collect about you to:</p>
            <ul>
              <li>Respond to your inquiries and provide requested services</li>
              <li>Process vendor registration applications</li>
              <li>Send you information about our services, promotions, or updates</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>

            <h2 data-testid="text-section-disclosure">Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf, such as email delivery, data analysis, and customer service.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
            </ul>

            <h2 data-testid="text-section-security">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we take reasonable steps to secure your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee the absolute security of your information.
            </p>

            <h2 data-testid="text-section-cookies">Cookies and Tracking Technologies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your experience. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of this site may not function properly.
            </p>

            <h2 data-testid="text-section-third-party">Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites and services that are not owned or controlled by EFSG. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the privacy policy of every site you visit.
            </p>

            <h2 data-testid="text-section-children">Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without verification of parental consent, we take steps to remove that information from our servers.
            </p>

            <h2 data-testid="text-section-changes">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 data-testid="text-section-contact">Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">contact us</Link>:
            </p>
            <ul>
              <li><strong>Excel Facility Services Group</strong></li>
              <li>200 Broadacres Dr., Suite 160</li>
              <li>Bloomfield, NJ 07003</li>
              <li>Phone: (800) 593-2414</li>
              <li>Email: info@efsgnj.com</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
