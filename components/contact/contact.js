import classes from './contact-form.module.css';
import { useRef, useState, useEffect } from 'react';
import Notification from '../ui/notification';

async function sendMessage(message){
	const response = await fetch('/api/contact', {
		method  : 'POST',
		body    : JSON.stringify(message),
		headers : {
			'Content-Type' : 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Something went Wrong');
	}
}

function ContactForm(){
	const emailInputRef = useRef();
	const nameInputRef = useRef();
	const messageInputRef = useRef();
	const [
		reqStatus,
		setReqStatus,
	] = useState();

	const [
		reqError,
		setReqError,
	] = useState();

	useEffect(
		() => {
			if (reqStatus === 'success' || reqStatus === 'error') {
				const timer = setTimeout(() => {
					setReqStatus(null);
					setReqError(null);
				}, 3000);
				return () => clearTimeout(timer);
			}
		},
		[
			reqStatus,
		],
	);

	let enteredEmail;
	let enteredName;
	let enteredMessage;
	async function handleSubmit(e){
		e.preventDefault();

		enteredEmail = emailInputRef.current.value;
		enteredName = nameInputRef.current.value;
		enteredMessage = messageInputRef.current.value;

		setReqStatus('pending');

		try {
			await sendMessage({
				email   : enteredEmail,
				name    : enteredName,
				message : enteredMessage,
			});
			setReqStatus('success');
			enteredEmail = '';
			enteredName = '';
			enteredMessage = '';
		} catch (error) {
			setReqError(error.message);
			setReqStatus('error');
		}
	}

	let notification;
	if (reqStatus === 'pending') {
		notification = {
			status  : 'pending',
			title   : 'Sending Message...',
			message : 'Your Message is on it is way',
		};
	}
	if (reqStatus === 'success') {
		notification = {
			status  : 'success',
			title   : 'Success!',
			message : 'Message Sent Successfully',
		};
	}
	if (reqStatus === 'error') {
		notification = {
			status  : 'error',
			title   : 'Error!',
			message : reqError,
		};
	}
	return (
		<section className={classes.contact}>
			<h1>How can i help you?</h1>
			<form className={classes.form} onSubmit={handleSubmit}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							type='email'
							id='email'
							ref={emailInputRef}
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='email'>Your Name</label>
						<input
							type='text'
							id='name'
							ref={nameInputRef}
							required
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows='5'
						ref={messageInputRef}
						required
					/>
				</div>
				<div className='classes.actions'>
					<button>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	);
}

export default ContactForm;
