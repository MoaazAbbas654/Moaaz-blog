import { MongoClient } from 'mongodb';

async function handler(req, res){
	if (req.method === 'POST') {
		const { email, name, message } = req.body;
		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({ message: 'invalid input' });
			return;
		}

		let client;
		const url = `mongodb+srv://${process.env.mongodbUserName}:${process.env
			.mongodbPassword}@${process.env
			.mongodbClusterName}.2ucyo.mongodb.net/${process.env
			.mongodbDatabase}?retryWrites=true&w=majority`;
		try {
			client = new MongoClient(url);
			await client.connect();
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ message: 'unable to connect to database' });
			return;
		}
		const newMessage = {
			email,
			name,
			message,
		};
		try {
			const db = client.db();
			const result = await db
				.collection('messages')
				.insertOne(newMessage);
			newMessage._id = result.insertedId;
			client.close();
		} catch (error) {
			res
				.status(500)
				.json({ message: 'unable to insert new Message to database' });
			return;
		}

		res
			.status(201)
			.json({ message: 'Successfult Stored Message', data: newMessage });
	}
}

export default handler;
