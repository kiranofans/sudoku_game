import Layout from '@/components/Layout';
import { ListUi, PageLevelNavMenu } from '@/components/SmallUiWidgets';
import { ThemeProvider } from '@/components/ThemeContext';

function PrivacyPolicy() {
    return (
        <ThemeProvider>

            <Layout>
                <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
                    <h1 className="text-3xl font-bold text-center mt-6 mb-6 dark:text-white">Privacy Policy</h1>
                    <PageLevelNavMenu sections={[

                    ]} activeSlug={''} />
                    <div className="privacy-policy-content space-y-0.5" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>
                        <p><strong>Last updated: November 5, 2026</strong></p>
                        {/* <p>Please read these privacy policies carefully before using Our Service.</p> */}

                        {/* <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Interpretation and Definitions</h3> */}

                        <p className='mt-2'>SudokuPlays ("SudokuPlays," "we," "us," or "our") operates sudokuplays.com (the "Website").
                            This Privacy Policy explains what information may be collected when you visit or use the Website,
                            why it is used, when it may be shared, and the choices and rights available to you.
                        </p>
                        <p>
                            SudokuPlays is a browser-based Sudoku game. You can play without creating an account.
                            This policy is written for the Website's current no-account design and the services identified below.
                            If the Website's features or service providers change, this policy may need to be updated.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            1. Information We Collect
                        </h4>
                        <h4 className='font-semibold px-4'>Information You Provide</h4>
                        <p className='px-4'>You can browse and play Sudoku without giving us your name, email address, or other account information.
                            We do not require you to register or create a player account.</p>
                        <p className='px-4 pt-1'>
                            If you contact us through the <a href="/contact">Contact page</a> or by email, we receive the information you choose to send.
                            This may include your email address, name (if you provide it), the subject of your message, and the contents of your message or any attachment.
                            Please do not send sensitive personal information unless it is necessary for your inquiry.
                        </p>

                        <h4 className='font-semibold px-4 pt-1'>
                            Gameplay Information Stored in Your Browser
                        </h4>

                        <p className='px-4'>
                            SudokuPlays uses your browser's <b>LocalStorage</b> to support gameplay features.
                            Depending on the features you use, this may include the current game state, scores,
                            high scores, score history, and temporary hint- or reward-related information
                            (including information maintained for a limited period, such as 24 hours).
                        </p>

                        <p className='px-4 pt-1'>
                            This information is stored in your browser on your device rather than in a
                            SudokuPlays player account or central gameplay database.
                            In the Website's current design, gameplay information stored this way is used
                            by the game in your browser and is not routinely sent to SudokuPlays as part of normal gameplay.
                            LocalStorage is different from a browser cookie, although both are forms of browser storage.
                            You can remove this information by clearing the Website's site data or LocalStorage in your browser.
                            Doing so may reset saved scores, history, or game state.
                        </p>

                        <h4 className='font-semibold px-4 pt-1'>Technical and Usage Information</h4>
                        <p className='px-4'>
                            When you visit the Website, the Website's hosting, content-delivery, security, and
                            analytics providers may process technical information needed to deliver and protect
                            the Website and understand its use. Depending on the service and configuration, this may include:
                        </p>

                        <ul className='list-disc space-y-0.5' style={{ paddingLeft: '2.5rem' }}>
                            <li>Internet Protocol (IP) address and approximate location derived from it;</li>
                            <li>Browser type and version, device type, operating system, and language;</li>
                            <li>Pages or URLs requested, referring page, and date and time of requests;</li>
                            <li>General usage, page-view, performance, and security information; and</li>
                            <li>Interactions or custom events recorded by the Website's analytics configuration.</li>
                        </ul>
                        <p className='px-4 pt-1'>
                            We use the analytics tools described in Section 3.
                            We do not ask you to provide precise location information to play Sudoku.
                        </p>
                        <h4 className='font-semibold pt-1'>
                            2. How We Use Information
                        </h4>
                        <p className='px-4 pt-1'>We may use information for the following purposes:</p>
                        <ul className='list-disc space-y-0.5' style={{ paddingLeft: '2.5rem' }}>
                            <li>To operate the Website and provide Sudoku gameplay and related features;</li>
                            <li>To keep gameplay information, such as scores and hints, available in your browser;</li>
                            <li>To respond to questions, feedback, and support requests;</li>
                            <li>To understand Website traffic and usage, diagnose errors, and improve performance and content;</li>
                            <li>To protect the Website, investigate abuse, prevent fraud, and maintain service security; and</li>
                            <li>To display and measure advertising, where advertising services are enabled.</li>
                        </ul>

                        <p className='px-4'>
                            We use information only for purposes that are appropriate to the way it was collected
                            and as permitted or required by applicable law.
                        </p>

                        <h4 className='font-semibold pt-1'>3. Analytics and Website Providers</h4>
                        <h4 className='font-semibold px-4'>Umami Analytics</h4>

                        <p className='px-4'>
                            We use Umami Analytics to understand how visitors use the Website and to improve it.
                            Depending on the Website's tracker configuration, analytics may include page views, referring pages,
                            browser and operating-system information, approximate location, and custom events enabled by the Website.
                        </p>
                        <p className='pt-1 px-4'>
                            Umami's standard analytics does not use cookies for visitor tracking.
                            By default, Umami generates a session identifier using the Website ID, a visitor's IP address,
                            browser User-Agent information, and a rotating salt. The IP address is processed to generate
                            that identifier but is not stored as a field in the standard analytics session record.
                            The identifier is pseudonymous; this does not mean that an IP address is never processed
                            by the systems involved in delivering an analytics request. The exact data collected may depend
                            on whether Umami is self-hosted or cloud-hosted and on our configuration.
                        </p>
                        <p className='pt-1 px-4'>
                            For more information, see <a href="https://docs.umami.is/docs/metric-definitions">Umami's metric</a> definitions and
                            <a href='https://docs.umami.is/'> Umami's documentation</a>.
                        </p>

                        <h4 className='font-semibold px-4 pt-1'>Cloudflare</h4>

                        <p className='px-4'>
                            We use Cloudflare services to help host, deliver, and protect the Website.
                            Cloudflare may process technical information such as IP addresses, request details,
                            and browser information for content delivery, security, reliability, and troubleshooting.
                        </p>

                        <p className='px-4 pt-1'>
                            We also use Cloudflare Web Analytics to understand general Website traffic. Cloudflare states
                            that its Web Analytics product does not use cookies or LocalStorage for analytics and does not
                            fingerprint individuals using IP addresses or browser User-Agent information for analytics.
                            Cloudflare's separate hosting, content-delivery, and security services may nevertheless process
                            technical request information for their operational purposes.
                        </p>

                        <p className='pt-1 px-4'>
                            For more information, see <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's Privacy Policy</a> and
                            <a href='https://www.cloudflare.com/web-analytics/'> Cloudflare Web Analytics</a>.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            4. Cookies, LocalStorage, and Similar Technologies
                        </h4>
                        <p className='px-4'>
                            LocalStorage is used for gameplay functions described in Section 1.
                            It is stored by your browser for the Website and is not the same as a cookie.
                        </p>

                        <p className='px-4 pt-1'>
                            The standard analytics functions of Umami and Cloudflare Web Analytics described above do not rely on cookies.
                            However, cookies or similar technologies may be used by hosting or security features, advertising providers,
                            or other third-party services when those features are enabled. For example, Google advertising services may use cookies,
                            web beacons, IP addresses, or other identifiers to deliver, measure, and personalize advertising.
                        </p>

                        <p className='px-4 pt-1'>
                            You can manage or clear browser storage and cookies through your browser settings.
                            Blocking or deleting storage may affect some Website features.
                            Browser controls do not necessarily prevent all technical information from being processed
                            when a website is requested.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            5. Advertising and Google AdSense
                        </h4>
                        <p className='px-4'>
                            We may use Google AdSense or other advertising providers to display advertisements on the Website.
                            When advertising services are active, Google and its advertising partners may use cookies and similar
                            technologies to collect or receive information about your browser, device, IP address, the page being
                            viewed, and your interaction with advertisements. This information may be used to deliver, limit, personalize,
                            and measure advertisements, subject to the provider's settings, your choices, and applicable law.
                        </p>

                        <p className='px-4 pt-1'>
                            Third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this
                            Website or other websites. Other advertising vendors or networks may also place or read cookies, use web beacons,
                            or process IP addresses or other identifiers in connection with ad serving.
                        </p>
                        <p className='px-4 pt-1'>
                            You can learn more about Google's practices at <a href='https://policies.google.com/technologies/partner-sites'>
                                How Google uses information from sites or apps that use its services</a> and in the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
                            You can manage Google's personalized advertising settings through <a href='https://policies.google.com/privacy'>My Ad Center</a>.
                            You may also find information about industry advertising choices at <a href='https://youradchoices.com/'>YourAdChoices</a>.
                        </p>
                        <p className='px-4 pt-1'>
                            Changing personalized-ad settings does not necessarily stop all advertisements or all technical data processing.
                            Where required, we will provide or use an appropriate consent or choice mechanism for advertising technologies.
                            Visitors in the European Economic Area, the United Kingdom, and Switzerland may be subject to additional consent
                            requirements for Google's advertising services.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            6. Contact Form and EmailJS
                        </h4>
                        <p className='px-4'>
                            Our Contact page uses EmailJS to transmit messages submitted through the contact form to us.
                            Information you enter into the form, such as your email address and message, is processed by EmailJS
                            and may be handled by its infrastructure and service providers to deliver the message, maintain the service,
                            and prevent abuse.
                        </p>
                        <p className='px-4 pt-1'>
                            We use the information in your message to respond to you and handle your inquiry.
                            We do not use contact-form details for unrelated purposes unless you agree or the law permits or requires it.
                            EmailJS processes information under its own service terms and privacy practices. See the <a href='https://www.emailjs.com/legal/privacy-policy/'>EmailJS Privacy Policy</a>.
                        </p>
                        <p className='px-4 pt-1'>
                            You can also contact us directly at <a href="mailto:sitehelp.chat@gmail.com">sitehelp.chat@gmail.com</a>.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            7. When We Share Information
                        </h4>
                        <p className='px-4'>
                            We do not sell personal information for money. We may disclose or allow access to information
                            in the following circumstances:
                        </p>

                        <ul className='list-disc space-y-0.5' style={{ paddingLeft: '2.5rem' }}>
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
                        <p className='px-4 pt-1'>
                            Some privacy laws treat certain disclosures to advertising partners for personalized or cross-context advertising as "sharing,"
                            even when no money is paid for the information. The treatment of advertising data depends on the services enabled and the
                            law that applies to you. We will provide applicable choices or opt-outs where required by law.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            9. How Long We Keep Information
                        </h4>
                        <p className='px-4'>
                            We keep information only for as long as reasonably necessary for the purposes described in this policy,
                            unless a longer period is required or permitted by law.
                        </p>
                        <ul className='list-disc space-y-0.5' style={{ paddingLeft: '2.5rem' }}>
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
                        <h4 className='font-semibold pt-1'>
                            10. Security
                        </h4>
                        <p className='px-4'>
                            We use reasonable safeguards designed to protect information under our control against unauthorized access, use, alteration, or disclosure.
                            These may include access controls, service-provider safeguards, and measures to protect the Website and its infrastructure. No website,
                            internet transmission, or electronic storage method can be guaranteed to be completely secure.
                            Information processed by a third-party provider is also subject to that provider's security practices and controls.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            11. Your CHoices and Privacy Rights
                        </h4>
                        <div className='px-4 space-y-1'>
                            <p>
                                You can clear SudokuPlays LocalStorage, cookies, and other site data using your browser settings. This may reset saved gameplay information or affect Website functionality. You may also choose not to submit information through the Contact page.
                            </p>
                            <p>
                                Depending on the privacy law that applies to you, you may have the right to request access to personal information about you, request correction of inaccurate information, withdraw consent where processing is based on consent, request deletion, or raise a concern about how your information is handled. Some rights are subject to legal exceptions and may not apply to every type of information or processing.
                            </p>
                            <p>
                                To make a privacy request, contact our Privacy Officer using the details in Section 15. We may need to verify your identity and clarify the request before responding. Clearing your browser's LocalStorage only removes data stored on your device; it does not delete a message you previously sent to us or records held by a third-party provider.
                            </p>
                        </div>

                        <h4 className='font-semibold pt-1 px-4'>
                            Additional Information for Canadian Visitors
                        </h4>

                        <div className='px-4 space-y-1'>
                            <p>
                                SudokuPlays is operated in British Columbia. The British Columbia Personal Information Protection Act (PIPA)
                                is a key private-sector privacy law relevant to organizations operating in the province. The federal Personal
                                Information Protection and Electronic Documents Act (PIPEDA) may also apply to particular activities,
                                including certain interprovincial or international commercial data flows.
                                The specific law applicable to a particular activity depends on the circumstances.
                            </p>
                            <p>
                                If you have a concern about our handling of personal information, you may contact our Privacy Officer first.
                                You may also contact the <a href='https://www.oipc.bc.ca/'>Office of the Information and Privacy Commissioner for British Columbia</a>.
                                Information about PIPEDA is available from the <a href='https://www.priv.gc.ca/'>Office of the Privacy Commissioner of Canada</a>.
                            </p>
                        </div>
                        <h4 className='font-semibold pt-1 px-4'>
                            Visitors in Other Regions
                        </h4>
                        <p className='px-4'>
                            Depending on where you live and whether the relevant law applies to our activities, you may have additional rights under privacy laws such
                            as the GDPR, UK GDPR, or applicable US state privacy laws. This policy is intended to explain our practices; it does not claim that every
                            privacy law applies to every visitor or that every right is available in every circumstance.
                        </p>

                        <h4 className='font-semibold pt-1'>
                            12. Children's Privacy
                        </h4>
                        <p className='px-4'>
                            The Website's Terms and Conditions state that the service is intended for individuals who are at least 18 years old.
                            SudokuPlays does not knowingly seek to collect personal information from anyone under 18.
                            If you believe someone under 18 has sent us personal information, please contact our Privacy Officer so that we can
                            review the request and take appropriate steps.
                        </p>
                        <h4 className='font-semibold pt-1'>
                            13. Third-Party Websites
                        </h4>
                        <p className='px-4'>
                            The Website may contain links to third-party websites or services. We do not control those websites and are not responsible
                            for their privacy practices. When you follow an external link, review the privacy policy of the third party before providing information to it.
                        </p>
                        <h4 className='font-semibold pt-1'>
                            14. Changes to This Privacy Policy
                        </h4>

                        <p className='px-4'>
                            We may update this Privacy Policy when our practices, services, or legal obligations change.
                            The updated version will be posted on this page with a revised "Last updated" date.
                            We encourage you to review this page periodically.
                        </p>
                        <h4 className='font-semibold pt-1'>
                            15. Contact and Privacy Officer
                        </h4>
                        <p className='px-4'>
                            For questions, privacy requests, or concerns about this Privacy Policy or our handling of personal information, contact:
                        </p>
                        <div className='px-4 pt-1'>
                            <h4 className='font-semibold'>Privacy Officer</h4>
                            <h4 className='font-semibold'>SudokuPlays</h4>
                            <p>Email: <a href='mailto:sitehelp.chat@gmail.com'>sitehelp.chat@gmail.com</a>
                                <br />
                                Contact page: <a href='/contact'>https://sudokuplays.com/contact/</a>
                            </p>
                        </div>
                    </div>
                </main>
            </Layout >
        </ThemeProvider >
    )
}
export default PrivacyPolicy