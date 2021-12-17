import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PrismLight as SyntaxHightLighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHightLighter.registerLanguage('js', js);
SyntaxHightLighter.registerLanguage('css', css);
import Image from 'next/image';
function PostContent(props){
	const { post } = props;
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	const customRenderers = {
		img  : (image) => (
			<Image
				src={`/images/posts/${post.slug}/${image.src}`}
				alt={image.alt}
				width={600}
				height={300}
			/>
		),
		code : function({ node, inline, className, children, ...props }){
			const match = /language-(\w+)/.exec(className || '');

			const result =

					!inline && match ? <SyntaxHightLighter
						children={String(children).replace(/\n$/, '')}
						style={atomDark}
						language={match[1]}
						PreTag='div'
						{...props}
					/> :
					<code className={className} {...props}>
						{children}
					</code>;
			return result;
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>
				{post.content}
			</ReactMarkdown>
		</article>
	);
}

export default PostContent;
