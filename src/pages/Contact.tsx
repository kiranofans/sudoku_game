import React from 'react';
import Layout from '@/components/Layout';
import emailjs from '@emailjs/browser';

interface ContactFormData {
    email: string;
    subject: string;
    message: string;
}
const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: ContactFormData = {
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    };
    try {
        const response = await emailjs.send(
            "service_6r35nck",
            "template_h0k37j5",
            {
                user_email: data.email,
                subject: data.subject,
                message: data.message
            },
            "6iWrJ5lrgdzAgyWGp"
        );
        console.log("SUCESS!", response.status, response.text);
        alert("Email sent successfully");
        form.reset();
    } catch (err) {
        console.error('FAILED...', err);
        alert('Failed to send email');
    };

    //Attachment to existing form
    // const formElement = document.getElementById('contact-form') as HTMLFormElement;
    // formElement.addEventListener("submit", {sendEmail});
}

const Contact: React.FC = () => {
    return (
        <Layout>
            <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', margin: '0 auto', flex: '1 0 auto' }}>
                <h1 className="text-3xl font-bold text-center mt-6 mb-6 dark:text-white">Contact</h1>
                <p style={{ marginTop: '0.5rem', marginBottom: "0.5rem", fontSize: '1rem' }} className="text-gray-500 dark:text-gray-400">
                    We value your input and strive to respond to all inquiries as quickly as possible.
                </p>
                <div style={{ textAlign: 'center', padding: '1.5rem 0', fontSize: '1.2rem', lineHeight: '1.6' }}
                    className="dark:text-gray-200 w-2/3">
                    <form id="contact-form" onSubmit={sendEmail}>
                        <div className='felex flex-col'>
                            <div className='flex flex-col text-left' style={{ marginBottom: '1.5rem' }}>
                                <label htmlFor="email" style={{ marginBottom: '0.5rem' }}><h3>Your Email Address: </h3></label>
                                <input className='border-gray-400 dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 border-2 rounded-md p-2 h-10'
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                /></div>
                            <div className='flex flex-col text-left' style={{ marginBottom: '1.5rem' }}>

                                <label htmlFor="subject" className='text-md'>The Subject: </label>

                                <input type="subject" id="subject" name="subject" style={{ marginTop: '0.5rem' }}
                                    className='border-gray-400 dark:bg-gray-800 dark:text-gray-300  
                                    dark:border-gray-700 border-2 rounded-md p-2 h-10'
                                    placeholder="What is this about?" />
                            </div>

                            <div className='flex flex-col text-left' style={{ marginBottom: '1rem' }}>
                                <label htmlFor="message" style={{ marginBottom: '0.5rem' }}>Your Message</label>
                                <textarea className="border-gray-400 dark:bg-gray-800 dark:text-gray-300 
                                dark:border-gray-700 border-2 rounded-md p-2 h-50"
                                    id="message" name="message" placeholder="What is your thought about in detail?"
                                    required />
                            </div>
                            <button type="submit" className='new-game-btn'
                                style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1.5rem' }}>
                                Submit</button>
                        </div>
                    </form>

                    {/* <p style={{ marginBottom: '0.1rem', marginTop: '1.5rem' }}>For support or feedback, please contact us at:</p> */}
                    {/* <a
                        href="mailto:sitehelp.chat@gmail.com"
                        className="dark:bg-gray-800 dark:text-blue-400 dark:border-gray-700"
                        style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            color: '#2980b9',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--button-bg)',
                            border: '1px solid var(--button-border)'
                        }}
                    >
                        sitehelp.chat@gmail.com
                    </a> */}
                </div>
            </main>
        </Layout>
    );
};

export default Contact;
