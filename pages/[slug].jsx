import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Post = () => {
    const { query } = useRouter()
    const router = useRouter()
    const { data } = useQuery(gql`
    query postQuery {
        post(id: "${query.slug}", idType: SLUG) {
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
        `);

    const post = data?.post
    const imageUrl = data?.post.featuredImage.node.sourceUrl

    if (!post) {
        return <main><div>loading...</div></main>
    }
    return (
        <main>
            <a href="#" onClick={() => router.back()}>Back</a>
            <div className='post-content'>
            
            <h1>{post.title}</h1>
            <Image src={imageUrl} alt='feature image' width={400} height={300}/>
            <h3 dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </main>
    )
}

export default Post