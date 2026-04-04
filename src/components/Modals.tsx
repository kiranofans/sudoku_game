import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    closeable?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, closeable = true }) => {
    if (!isOpen) return null;

    const handleBackdropClick = () => {
        if (closeable) onClose();
    };

    return (
        <div className="instructions-overlay" onClick={handleBackdropClick}>
            <div className="instructions-content" onClick={(e) => e.stopPropagation()}>
                {closeable && <button className="instruct-close-btn" onClick={onClose} aria-label="Close modal"></button>}
                <h3 className="content-title">{title}</h3>
                {children}
            </div>
        </div>
    );
};




export const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play">
        <h4>Quick Guide</h4>
        <p>Fill each row, column, and 3×3 box with numbers 1–9 without repeating.</p>

        <h4>Detailed Sudoku Guide</h4>
        <ol type="1">
            <li>Click a cell to select it.</li>
            <li>Type a number (1–9) or use the number pad to fill it in.</li>
            <li>Switch to <b>Pencil Mode</b> to make notes for possible numbers.</li>
            <li>You can use up to 3 hints during the game.</li>
            <li>The game ends after 10 mistakes or when the puzzle is solved.</li>
        </ol>

        <h4>About the Number Pad</h4>
        <p>The large blue buttons are for input.
            <br></br>Each button also shows the <b>remaining count</b> of that number in the bottom-right corner.</p>

        <h4>About the Scoring System</h4>
        <p>Your score updates in <b>real-time</b> as you play:</p>
        <ol type="1">
            <li>Initially, the score shows <b>- - - -</b> until you earn points.</li>
            <li>Earn <b>Bonus Points</b> for every correct number placed.</li>
            <li>Higher difficulty levels provide a much larger <b>Score Multiplier</b>.</li>
            <li>Making a <b>Mistake</b> or taking too much <b>Time</b> will reduce your score.</li>
            <li>After <b>10 Mistakes</b> the game will end.</li>

        </ol>
    </Modal>
);

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
        <div className="privacy-policy-content" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>
            <div style={{ marginBottom: '1.5rem', padding: '10px', background: '#f0f7ff', borderRadius: '6px', border: '1px solid #cce5ff' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#004085' }}>
                    View online: <a href="https://www.freeprivacypolicy.com/live/6b2c3629-c588-47d4-8c1a-7d44eb7dc7f4" target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3' }}>Privacy Policy Link</a>
                </p>
            </div>

            <p><strong>Last updated: March 13, 2026</strong></p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Interpretation and Definitions</h3>
            <h4>Interpretation</h4>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h4>Definitions</h4>
            <p>For the purposes of this Privacy Policy:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '10px' }}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li style={{ marginBottom: '10px' }}><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party...</li>
                <li style={{ marginBottom: '10px' }}><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to Sudoku.</li>
                <li style={{ marginBottom: '10px' }}><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website...</li>
                <li style={{ marginBottom: '10px' }}><strong>Country</strong> refers to: British Columbia, Canada</li>
                <li style={{ marginBottom: '10px' }}><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                <li style={{ marginBottom: '10px' }}><strong>Personal Data</strong> (or "Personal Information") is any information that relates to an identified or identifiable individual.</li>
                <li style={{ marginBottom: '10px' }}><strong>Service</strong> refers to the Website.</li>
                <li style={{ marginBottom: '10px' }}><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company...</li>
                <li style={{ marginBottom: '10px' }}><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.</li>
                <li style={{ marginBottom: '10px' }}><strong>Website</strong> refers to Sudoku, accessible from <a href="https://sudokuplays.com.com" target="_blank" rel="noopener noreferrer">sudokuplays.com.com</a>.</li>
                <li style={{ marginBottom: '10px' }}><strong>You</strong> means the individual accessing or using the Service...</li>
            </ul>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Collecting and Using Your Personal Data</h3>
            <h4>Types of Data Collected</h4>
            <h5>Personal Data</h5>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.</p>

            <h5>Usage Data</h5>
            <p>Usage Data is collected automatically when using the Service. It may include information such as Your Device's IP address, browser type, pages visited, and time spent on pages.</p>

            <h5>Tracking Technologies and Cookies</h5>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '10px' }}><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device.</li>
                <li style={{ marginBottom: '10px' }}><strong>Web Beacons.</strong> Electronic files that permit the Company to count users or collect related statistics.</li>
            </ul>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Detailed Information on Processing</h3>
            <h4>Advertising</h4>
            <p>We may use Service Providers to show advertisements to You to help support and maintain Our Service.</p>
            <div style={{ padding: '15px', background: 'var(--button-bg)', borderRadius: '8px', marginTop: '10px' }}>
                <p><strong>Google AdSense & DoubleClick Cookie</strong></p>
                <p>Google, as a third party vendor, uses cookies to serve ads on our Service. You may opt out of the use of the DoubleClick Cookie by visiting the <a href="http://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> page.</p>
            </div>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
                <li><strong>By email:</strong> <a href="mailto:sitehelp.chat@gmail.com">sitehelp.chat@gmail.com</a></li>
            </ul>
        </div>
    </Modal>
);

export const TermsAndConditionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms and Conditions">
        <div className="privacy-policy-content" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-color)', textAlign: 'left' }}>
            <div style={{ marginBottom: '1.5rem', padding: '10px', background: '#f0f7ff', borderRadius: '6px', border: '1px solid #cce5ff' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#004085' }}>
                    View online: <a href="https://www.freeprivacypolicy.com/live/3e213669-5074-4c1b-acfc-1b8d5287faad" target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3' }}>Terms and Conditions Link</a>
                </p>
            </div>

            <p><strong>Last updated: March 13, 2026</strong></p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>

            <h3 style={{ borderBottom: '1px solid var(--divider-color)', paddingBottom: '5px', marginTop: '1.5rem' }}>Interpretation and Definitions</h3>
            <h4>Interpretation</h4>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h4>Definitions</h4>
            <p>For the purposes of these Terms and Conditions:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
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
    </Modal>
);

export const AdModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdComplete: () => void }> = ({ isOpen, onClose, onAdComplete }) => {
    const [timeLeft, setTimeLeft] = React.useState(10); // 10 second delay
    const [isCounting, setIsCounting] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setTimeLeft(10);
            setIsCounting(true);
        } else {
            setIsCounting(false);
        }
    }, [isOpen]);

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCounting && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsCounting(false);
        }
        return () => clearTimeout(timer);
    }, [isCounting, timeLeft]);

    const handleClaimHint = () => {
        onAdComplete();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Watch Ad for a Hint" closeable={timeLeft === 0}>
            <div style={{ textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p>Support us by watching a short ad to earn 1 extra hint!</p>
                <div className="ads-part" style={{ width: '100%', minHeight: '250px', margin: '0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc', position: 'relative' }}>
                    {/* The Google AdSense script code snippet provided by the user */}
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867248544126643"
                        crossOrigin="anonymous"></script>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>[Ad Unit Placeholder]</p>

                    {timeLeft > 0 && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                            Wait {timeLeft}s to claim
                        </div>
                    )}
                </div>
                <button
                    onClick={handleClaimHint}
                    disabled={timeLeft > 0}
                    className="new-game-btn"
                    style={{
                        width: 'auto',
                        padding: '10px 30px',
                        opacity: timeLeft > 0 ? 0.5 : 1,
                        cursor: timeLeft > 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    {timeLeft > 0 ? `Wait ${timeLeft}s...` : 'Claim Hint'}
                </button>
            </div>
        </Modal>
    );
};
