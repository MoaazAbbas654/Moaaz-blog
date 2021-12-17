import Head from 'next/head';
import { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

function PostDetailPage({ post }){
	return (
		<Fragment>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</Fragment>
	);
}

export function getStaticProps(context){
	const { params } = context;
	const { slug } = params;
	const post = getPostData(slug);
	return {
		props : {
			post,
		},
	};
}

export function getStaticPaths(){
	const postsFileNames = getPostsFiles();
	const slugs = postsFileNames.map((file) => file.replace(/\.md$/, ''));
	const paths = slugs.map((slug) => ({
		params : {
			slug : slug,
		},
	}));
	return {
		paths,
		fallback : false,
	};
}

export default PostDetailPage;
