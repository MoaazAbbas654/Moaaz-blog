import Head from 'next/head';
import { Fragment } from 'react';
import ContactForm from '../components/contact/contact';
function Contact(){
	return (
		<Fragment>
			<Head>
				<title>Contact Me</title>
				<meta name='description' content='Send to me your messages' />
			</Head>
			<ContactForm />
		</Fragment>
	);
}

export default Contact;
