import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-8 dark:text-white">Privacy Policy</h1>
                <div className="privacy-policy-content" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>

                    <p><strong>Last updated: April 15, 2026</strong></p>
                    <p>Please read these terms and conditions carefully before using Our Service.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Interpretation and Definitions</h3>
                    <h4>Interpretation</h4>
                    <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

                    <h4>Definitions</h4>
                    <p>For the purposes of these Terms and Conditions:</p>
                    <ul className="list-disc" style={{ paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '10px' }}><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Country</strong> refers to: British Columbia, Canada</li>
                        <li style={{ marginBottom: '10px' }}><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions) refers to Sudoku.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Service</strong> refers to the Website.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Terms and Conditions</strong> (also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service. These Terms and Conditions have been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank" rel="noopener noreferrer">TermsFeed Terms and Conditions Generator</a>.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Website</strong> refers to Sudoku, accessible from <a href="https://sudokuplays.com.com" target="_blank" rel="noopener noreferrer">sudokuplays.com.com</a></li>
                        <li style={{ marginBottom: '10px' }}><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                    </ul>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Acknowledgment</h3>
                    <p>These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                    <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
                    <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
                    <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
                    <p>Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Regional Compliance</h3>
                    <h4>
                        <ol>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong className='text-sm'>
                                    1. Canadian Privacy Compliance (BC PIPA & PIPEDA)</strong>
                                <div><p className='mb-1 mt-2 text-sm'><b>Compliance with Canadian Privacy Standards</b></p>
                                    <p>
                                        This Service is governed by the laws of British Columbia and Canada.
                                        In accordance with the Personal Information Protection Act (PIPA) and the Personal Information Protection and Electronic Documents Act (PIPEDA),
                                        we hereby disclose that we collect and utilize non-personally identifiable technical data for commercial purposes, specifically the delivery of rewarded advertisements.
                                        All data stored via LocalStorage is functional in nature and remains under the user's control. We do not sell, rent, or trade individual user data to third parties.
                                    </p>
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <b className='text-sm'>
                                    2. California Consumer Privacy Act (CCPA/CPRA) - "LA Law"
                                </b>
                                <div>
                                    <p className='mb-1 mt-2 text-sm'>
                                        <b>California Resident Notice at Collection and Privacy Rights</b>
                                    </p>
                                    Under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA),
                                    California residents have specific rights regarding their "Personal Information."

                                    <ul className="md:list-disc ml-5 space-y-1 text-sm">
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b className='text-sm'>Notice at Collection: </b>We collect identifiers (via LocalStorage and IP-based analytics)
                                            to facilitate game rewards and analyze site traffic.</li>
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b className='text-sm'>Right to Opt-Out of Sale or Sharing: </b>While we do not sell data for money,
                                            our use of third-party advertising networks may be classified as "sharing" for cross-contextual behavioral advertising.
                                            Users may exercise their right to opt-out by utilizing "Do Not Track" browser signals or adjusting device-level ad-tracking permissions.</li>
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b>Non-Discrimination: </b>
                                            We will not deny service or change your game experience for exercising your privacy rights.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <div>
                                    <b>3. European Union & UK Compliance (GDPR)</b>
                                    <p>
                                        <b>General Data Protection Regulation (GDPR) Disclosure </b>
                                    </p>
                                    For users residing in the European Economic Area (EEA) or the United Kingdom,
                                    the processing of your data is governed by the GDPR.
                                    <ul className="md:list-disc ml-5 space-y-1 text-sm">
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b>Legal Basis for Processing: </b>
                                            We process data based on "Legitimate Interests" (site security and basic analytics) and "Contractual Necessity" (using LocalStorage to fulfill the delivery of hints following an advertisement).
                                        </li>
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b>Data Controller: </b>
                                            <Link to="/">sudokuplays.com</Link> acts as the Data Controller for local device storage.
                                        </li>
                                        <li className='mb-1 mt-2 text-sm'>
                                            <b>Data Subject Rights: </b>
                                            You have the right to access, rectify, or erase your data. Since we do not maintain server-side user accounts, you may exercise your "Right to be Forgotten" at any time by clearing your browser's cache and LocalStorage.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div><b className='text-sm'>4. Specific Disclosure: LocalStorage & Analytics</b>
                                    <p className='mb-1 mt-2 text-sm'>
                                        <b>Technical Data & Cookies Disclaimer</b>
                                    </p>
                                    This Service utilizes Web LocalStorage to maintain game state, high scores, and a 24-hour
                                    "Hint Memo" for ad verification. Unlike traditional tracking cookies, this data is stored locally on your device and is not transmitted to our servers. We utilize Cloudflare Analytics for privacy-first, non-invasive traffic monitoring
                                    which does not collect personal identifiers or track users across external websites.
                                </div>
                            </li>
                        </ol>
                    </h4>
                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Links to Other Websites</h3>
                    <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.</p>
                    <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
                    <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.</p>

                    <h4>Links from a Third-Party Social Media Service</h4>
                    <p>The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.</p>
                    <p>You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Termination</h3>
                    <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                    <p>Upon termination, Your right to use the Service will cease immediately.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Limitation of Liability</h3>
                    <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
                    <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
                    <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>"AS IS" and "AS AVAILABLE" Disclaimer</h3>
                    <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
                    <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
                    <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Governing Law</h3>
                    <p>The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Disputes Resolution</h3>
                    <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>For European Union (EU) Users</h3>
                    <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>United States Legal Compliance</h3>
                    <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Severability and Waiver</h3>
                    <h4>Severability</h4>
                    <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                    <h4>Waiver</h4>
                    <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Translation Interpretation</h3>
                    <p>These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Changes to These Terms and Conditions</h3>
                    <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
                    <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.</p>

                    <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Contact Us</h3>
                    <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li><strong>By email:</strong> <a href="mailto:sitehelp.chat@gmail.com">sitehelp.chat@gmail.com</a></li>
                    </ul>
                </div>
            </main>
        </Layout >
    )
}
export default PrivacyPolicy