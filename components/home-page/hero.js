import Image from 'next/image';
import classes from './hero.module.css';

function Hero(){
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/my-Image.jpg'
					width={300}
					height={300}
					alt='myImage'
				/>
			</div>
			<h1>Hi, I'm Moaaz</h1>
			<p>
				I'm blog about web development - specialy frontend Framework
				React
			</p>
		</section>
	);
}

export default Hero;
