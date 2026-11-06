import { useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { PageLevelNavMenu } from '@/components/SmallUiWidgets';
import { ThemeProvider } from '@/components/ThemeContext';
import { useSectionNavigation } from '@/hooks/useGeneralUtils';

const PRIVACY_SECTIONS = [
    { id: 'info-collect', title: 'Information Collected' },
    { id: 'how-we-use', title: 'How We Use Info' },
    { id: 'analytics', title: 'Analytics & Providers' },
    { id: 'cookies-storage', title: 'Cookies & Storage' },
    { id: 'advertising', title: 'Advertising' },
    { id: 'contact-form', title: 'Contact Form' },
    { id: 'sharing', title: 'Data Sharing' },
    { id: 'retention', title: 'Data Retention' },
    { id: 'security', title: 'Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'third-party', title: 'Third-Party Links' },
    { id: 'policy-changes', title: 'Policy Changes' },
    { id: 'contact-officer', title: 'Privacy Officer' },
];

function PrivacyPolicy() {
    const [activeSlug, setActiveSlug] = useState('info-collect');
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const { handleNavClick } = useSectionNavigation(
        PRIVACY_SECTIONS,
        sectionRefs,
        activeSlug,
        setActiveSlug
    );

    return (
        <ThemeProvider>
            <Layout>
                <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
                    <h1 className="text-3xl font-bold text-center mt-6 mb-6 dark:text-white">Privacy Policy</h1>

                    <PageLevelNavMenu
                        sections={PRIVACY_SECTIONS}
                        activeSlug={activeSlug}
                        onNavClick={handleNavClick}
                    />

                    <div className="privacy-policy-content space-y-8" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>
                        <div className="space-y-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                            <p><strong>Last updated: November 5, 2026</strong></p>
                            <p>
                                SudokuPlays ("SudokuPlays," "we," "us," or "our") operates sudokuplays.com (the "Website").
                                This Privacy Policy explains what information may be collected when you visit or use the Website,
                                why it is used, when it may be shared, and the choices and rights available to you.
                            </p>
                            <p>
                                SudokuPlays is a browser-based Sudoku game. You can play without creating an account.
                                This policy is written for the Website's current no-account design and the services identified below.
                                If the Website's features or service providers change, this policy may need to be updated.
                            </p>
                        </div>

                        {/* Section 1: Information We Collect */}
                        <section
                            id="info-collect"
                            ref={(el) => { sectionRefs.current['info-collect'] = el; }}
                            className="scroll-mt-24 space-y-4"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                1. Information We Collect
                            </h2>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">Information You Provide</h3>
                                <p>
                                    You can browse and play Sudoku without giving us your name, email address, or other account information.
                                    We do not require you to register or create a player account.
                                </p>
                                <p>
                                    If you contact us through the <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</a> or by email, we receive the information you choose to send.
                                    This may include your email address, name (if you provide it), the subject of your message, and the contents of your message or any attachment.
                                    Please do not send sensitive personal information unless it is necessary for your inquiry.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                    Gameplay Information Stored in Your Browser
                                </h3>
                                <p>
                                    SudokuPlays uses your browser's <b>LocalStorage</b> to support gameplay features.
                                    Depending on the features you use, this may include the current game state, scores,
                                    high scores, score history, and temporary hint- or reward-related information
                                    (including information maintained for a limited period, such as 24 hours).
                                </p>
                                <p>
                                    This information is stored in your browser on your device rather than in a
                                    SudokuPlays player account or central gameplay database.
                                    In the Website's current design, gameplay information stored this way is used
                                    by the game in your browser and is not routinely sent to SudokuPlays as part of normal gameplay.
                                    LocalStorage is different from a browser cookie, although both are forms of browser storage.
                                    You can remove this information by clearing the Website's site data or LocalStorage in your browser.
                                    Doing so may reset saved scores, history, or game state.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">Technical and Usage Information</h3>
                                <p>
                                    When you visit the Website, the Website's hosting, content-delivery, security, and
                                    analytics providers may process technical information needed to deliver and protect
                                    the Website and understand its use. Depending on the service and configuration, this may include:
                                </p>
                                <ul className="list-disc space-y-1 pl-6">
                                    <li>Internet Protocol (IP) address and approximate location derived from it;</li>
                                    <li>Browser type and version, device type, operating system, and language;</li>
                                    <li>Pages or URLs requested, referring page, and date and time of requests;</li>
                                    <li>General usage, page-view, performance, and security information; and</li>
                                    <li>Interactions or custom events recorded by the Website's analytics configuration.</li>
                                </ul>
                                <p>
                                    We use the analytics tools described in Section 3.
                                    We do not ask you to provide precise location information to play Sudoku.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: How We Use Information */}
                        <section
                            id="how-we-use"
                            ref={(el) => { sectionRefs.current['how-we-use'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                2. How We Use Information
                            </h2>
                            <p>We may use information for the following purposes:</p>
                            <ul className="list-disc space-y-1 pl-6">
                                <li>To operate the Website and provide Sudoku gameplay and related features;</li>
                                <li>To keep gameplay information, such as scores and hints, available in your browser;</li>
                                <li>To respond to questions, feedback, and support requests;</li>
                                <li>To understand Website traffic and usage, diagnose errors, and improve performance and content;</li>
                                <li>To protect the Website, investigate abuse, prevent fraud, and maintain service security; and</li>
                                <li>To display and measure advertising, where advertising services are enabled.</li>
                            </ul>
                            <p>
                                We use information only for purposes that are appropriate to the way it was collected
                                and as permitted or required by applicable law.
                            </p>
                        </section>

                        {/* Section 3: Analytics and Website Providers */}
                        <section
                            id="analytics"
                            ref={(el) => { sectionRefs.current['analytics'] = el; }}
                            className="scroll-mt-24 space-y-4"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                3. Analytics and Website Providers
                            </h2>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">Umami Analytics</h3>
                                <p>
                                    We use Umami Analytics to understand how visitors use the Website and to improve it.
                                    Depending on the Website's tracker configuration, analytics may include page views, referring pages,
                                    browser and operating-system information, approximate location, and custom events enabled by the Website.
                                </p>
                                <p>
                                    Umami's standard analytics does not use cookies for visitor tracking.
                                    By default, Umami generates a session identifier using the Website ID, a visitor's IP address,
                                    browser User-Agent information, and a rotating salt. The IP address is processed to generate
                                    that identifier but is not stored as a field in the standard analytics session record.
                                    The identifier is pseudonymous; this does not mean that an IP address is never processed
                                    by the systems involved in delivering an analytics request. The exact data collected may depend
                                    on whether Umami is self-hosted or cloud-hosted and on our configuration.
                                </p>
                                <p>
                                    For more information, see <a href="https://docs.umami.is/docs/metric-definitions" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Umami's metric definitions</a> and{' '}
                                    <a href="https://docs.umami.is/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Umami's documentation</a>.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">Cloudflare</h3>
                                <p>
                                    We use Cloudflare services to help host, deliver, and protect the Website.
                                    Cloudflare may process technical information such as IP addresses, request details,
                                    and browser information for content delivery, security, reliability, and troubleshooting.
                                </p>
                                <p>
                                    We also use Cloudflare Web Analytics to understand general Website traffic. Cloudflare states
                                    that its Web Analytics product does not use cookies or LocalStorage for analytics and does not
                                    fingerprint individuals using IP addresses or browser User-Agent information for analytics.
                                    Cloudflare's separate hosting, content-delivery, and security services may nevertheless process
                                    technical request information for their operational purposes.
                                </p>
                                <p>
                                    For more information, see <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Cloudflare's Privacy Policy</a> and{' '}
                                    <a href="https://www.cloudflare.com/web-analytics/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Cloudflare Web Analytics</a>.
                                </p>
                            </div>
                        </section>

                        {/* Section 4: Cookies, LocalStorage, and Similar Technologies */}
                        <section
                            id="cookies-storage"
                            ref={(el) => { sectionRefs.current['cookies-storage'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                4. Cookies, LocalStorage, and Similar Technologies
                            </h2>
                            <p>
                                LocalStorage is used for gameplay functions described in Section 1.
                                It is stored by your browser for the Website and is not the same as a cookie.
                            </p>
                            <p>
                                The standard analytics functions of Umami and Cloudflare Web Analytics described above do not rely on cookies.
                                However, cookies or similar technologies may be used by hosting or security features, advertising providers,
                                or other third-party services when those features are enabled. For example, Google advertising services may use cookies,
                                web beacons, IP addresses, or other identifiers to deliver, measure, and personalize advertising.
                            </p>
                            <p>
                                You can manage or clear browser storage and cookies through your browser settings.
                                Blocking or deleting storage may affect some Website features.
                                Browser controls do not necessarily prevent all technical information from being processed
                                when a website is requested.
                            </p>
                        </section>

                        {/* Section 5: Advertising and Google AdSense */}
                        <section
                            id="advertising"
                            ref={(el) => { sectionRefs.current['advertising'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                5. Advertising and Google AdSense
                            </h2>
                            <p>
                                We may use Google AdSense or other advertising providers to display advertisements on the Website.
                                When advertising services are active, Google and its advertising partners may use cookies and similar
                                technologies to collect or receive information about your browser, device, IP address, the page being
                                viewed, and your interaction with advertisements. This information may be used to deliver, limit, personalize,
                                and measure advertisements, subject to the provider's settings, your choices, and applicable law.
                            </p>
                            <p>
                                Third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this
                                Website or other websites. Other advertising vendors or networks may also place or read cookies, use web beacons,
                                or process IP addresses or other identifiers in connection with ad serving.
                            </p>
                            <p>
                                You can learn more about Google's practices at{' '}
                                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    How Google uses information from sites or apps that use its services
                                </a>{' '}
                                and in the{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Google Privacy Policy
                                </a>.
                                You can manage Google's personalized advertising settings through{' '}
                                <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    My Ad Center
                                </a>.
                                You may also find information about industry advertising choices at{' '}
                                <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    YourAdChoices
                                </a>.
                            </p>
                            <p>
                                Changing personalized-ad settings does not necessarily stop all advertisements or all technical data processing.
                                Where required, we will provide or use an appropriate consent or choice mechanism for advertising technologies.
                                Visitors in the European Economic Area, the United Kingdom, and Switzerland may be subject to additional consent
                                requirements for Google's advertising services.
                            </p>
                        </section>

                        {/* Section 6: Contact Form and EmailJS */}
                        <section
                            id="contact-form"
                            ref={(el) => { sectionRefs.current['contact-form'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                6. Contact Form and EmailJS
                            </h2>
                            <p>
                                Our Contact page uses EmailJS to transmit messages submitted through the contact form to us.
                                Information you enter into the form, such as your email address and message, is processed by EmailJS
                                and may be handled by its infrastructure and service providers to deliver the message, maintain the service,
                                and prevent abuse.
                            </p>
                            <p>
                                We use the information in your message to respond to you and handle your inquiry.
                                We do not use contact-form details for unrelated purposes unless you agree or the law permits or requires it.
                                EmailJS processes information under its own service terms and privacy practices. See the{' '}
                                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    EmailJS Privacy Policy
                                </a>.
                            </p>
                            <p>
                                You can also contact us directly at{' '}
                                <a href="mailto:sitehelp.chat@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    sitehelp.chat@gmail.com
                                </a>.
                            </p>
                        </section>

                        {/* Section 7: When We Share Information */}
                        <section
                            id="sharing"
                            ref={(el) => { sectionRefs.current['sharing'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                7. When We Share Information
                            </h2>
                            <p>
                                We do not sell personal information for money. We may disclose or allow access to information
                                in the following circumstances:
                            </p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>
                                    <b>Service providers:</b> We use providers such as Cloudflare, Umami, EmailJS, and, when enabled,
                                    Google or other advertising providers to host, secure, analyze, support, or monetize the Website.
                                    They may process information on our behalf or for their own purposes as described in their privacy policies.
                                </li>
                                <li>
                                    <b>Legal and safety reasons:</b> We may disclose information when we reasonably believe disclosure is required by law,
                                    legal process, or a valid governmental request, or is necessary to protect the rights, safety,
                                    and security of the Website, its operator, visitors, or others.
                                </li>
                                <li>
                                    <b>Business changes:</b> Information may be transferred as part of a sale, reorganization, or transfer of the Website or its operation,
                                    subject to applicable privacy requirements.
                                </li>
                            </ul>
                            <p>
                                Some privacy laws treat certain disclosures to advertising partners for personalized or cross-context advertising as "sharing,"
                                even when no money is paid for the information. The treatment of advertising data depends on the services enabled and the
                                law that applies to you. We will provide applicable choices or opt-outs where required by law.
                            </p>
                        </section>

                        {/* Section 8: How Long We Keep Information */}
                        <section
                            id="retention"
                            ref={(el) => { sectionRefs.current['retention'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                8. How Long We Keep Information
                            </h2>
                            <p>
                                We keep information only for as long as reasonably necessary for the purposes described in this policy,
                                unless a longer period is required or permitted by law.
                            </p>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>
                                    <b>Browser gameplay data:</b> LocalStorage information remains in your browser until it is overwritten,
                                    expires under the Website's feature logic, or you clear the Website's site data.
                                </li>
                                <li>
                                    <b>Contact messages:</b> We retain messages and related correspondence for as long as needed to respond, manage the inquiry,
                                    maintain appropriate business records, and address legal or security matters.
                                </li>
                                <li>
                                    <b>Analytics and technical:</b> Retention is determined by the relevant provider's settings, service terms,
                                    and operational or security requirements. We do not promise a single retention period for all provider logs or analytics records.
                                </li>
                            </ul>
                        </section>

                        {/* Section 9: Security */}
                        <section
                            id="security"
                            ref={(el) => { sectionRefs.current['security'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                9. Security
                            </h2>
                            <p>
                                We use reasonable safeguards designed to protect information under our control against unauthorized access, use, alteration, or disclosure.
                                These may include access controls, service-provider safeguards, and measures to protect the Website and its infrastructure. No website,
                                internet transmission, or electronic storage method can be guaranteed to be completely secure.
                                Information processed by a third-party provider is also subject to that provider's security practices and controls.
                            </p>
                        </section>

                        {/* Section 10: Your Choices and Privacy Rights */}
                        <section
                            id="your-rights"
                            ref={(el) => { sectionRefs.current['your-rights'] = el; }}
                            className="scroll-mt-24 space-y-4"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                10. Your Choices and Privacy Rights
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    You can clear SudokuPlays LocalStorage, cookies, and other site data using your browser settings. This may reset saved gameplay information or affect Website functionality. You may also choose not to submit information through the Contact page.
                                </p>
                                <p>
                                    Depending on the privacy law that applies to you, you may have the right to request access to personal information about you, request correction of inaccurate information, withdraw consent where processing is based on consent, request deletion, or raise a concern about how your information is handled. Some rights are subject to legal exceptions and may not apply to every type of information or processing.
                                </p>
                                <p>
                                    To make a privacy request, contact our Privacy Officer using the details in{' '}
                                    <a href="#contact-officer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                        Section 14
                                    </a>.
                                    We may need to verify your identity and clarify the request before responding. Clearing your browser's LocalStorage only removes data stored on your device; it does not delete a message you previously sent to us or records held by a third-party provider.
                                </p>
                            </div>

                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                    Additional Information for Canadian Visitors
                                </h3>
                                <p>
                                    SudokuPlays is operated in British Columbia. The British Columbia Personal Information Protection Act (PIPA)
                                    is a key private-sector privacy law relevant to organizations operating in the province. The federal Personal
                                    Information Protection and Electronic Documents Act (PIPEDA) may also apply to particular activities,
                                    including certain interprovincial or international commercial data flows.
                                    The specific law applicable to a particular activity depends on the circumstances.
                                </p>
                                <p>
                                    If you have a concern about our handling of personal information, you may contact our Privacy Officer first.
                                    You may also contact the{' '}
                                    <a href="https://www.oipc.bc.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Office of the Information and Privacy Commissioner for British Columbia
                                    </a>.
                                    Information about PIPEDA is available from the{' '}
                                    <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Office of the Privacy Commissioner of Canada
                                    </a>.
                                </p>
                            </div>

                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                                    Visitors in Other Regions
                                </h3>
                                <p>
                                    Depending on where you live and whether the relevant law applies to our activities, you may have additional rights under privacy laws such
                                    as the GDPR, UK GDPR, or applicable US state privacy laws. This policy is intended to explain our practices; it does not claim that every
                                    privacy law applies to every visitor or that every right is available in every circumstance.
                                </p>
                            </div>
                        </section>

                        {/* Section 11: Children's Privacy */}
                        <section
                            id="children"
                            ref={(el) => { sectionRefs.current['children'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                11. Children's Privacy
                            </h2>
                            <p>
                                The Website's Terms and Conditions state that the service is intended for individuals who are at least 18 years old.
                                SudokuPlays does not knowingly seek to collect personal information from anyone under 18.
                                If you believe someone under 18 has sent us personal information, please contact our Privacy Officer so that we can
                                review the request and take appropriate steps.
                            </p>
                        </section>

                        {/* Section 12: Third-Party Websites */}
                        <section
                            id="third-party"
                            ref={(el) => { sectionRefs.current['third-party'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                12. Third-Party Websites
                            </h2>
                            <p>
                                The Website may contain links to third-party websites or services. We do not control those websites and are not responsible
                                for their privacy practices. When you follow an external link, review the privacy policy of the third party before providing information to it.
                            </p>
                        </section>

                        {/* Section 13: Changes to This Privacy Policy */}
                        <section
                            id="policy-changes"
                            ref={(el) => { sectionRefs.current['policy-changes'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                13. Changes to This Privacy Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy when our practices, services, or legal obligations change.
                                The updated version will be posted on this page with a revised "Last updated" date.
                                We encourage you to review this page periodically.
                            </p>
                        </section>

                        {/* Section 14: Contact and Privacy Officer */}
                        <section
                            id="contact-officer"
                            ref={(el) => { sectionRefs.current['contact-officer'] = el; }}
                            className="scroll-mt-24 space-y-3"
                        >
                            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">
                                14. Contact and Privacy Officer
                            </h2>
                            <p>
                                For questions, privacy requests, or concerns about this Privacy Policy or our handling of personal information, contact:
                            </p>
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Privacy Officer</h3>
                                <h4 className="font-medium text-gray-700 dark:text-gray-300">SudokuPlays</h4>
                                <p className="pt-1">
                                    Email:{' '}
                                    <a href="mailto:sitehelp.chat@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        sitehelp.chat@gmail.com
                                    </a>
                                    <br />
                                    Contact page:{' '}
                                    <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        https://sudokuplays.com/contact/
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </main>
            </Layout>
        </ThemeProvider>
    );
}

export default PrivacyPolicy;
