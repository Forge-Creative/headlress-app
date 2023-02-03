import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const Post = () => {
    const { query } = useRouter()
    const router = useRouter()
    const { data } = useQuery(gql`
    query postQuery {
        post(id: "${query.slug}", idType: SLUG) {
            title
            content
            }
        }
        `);

    const post = data?.post
    if (!post) {
        return <div>loading...</div>
    }
    return (
        <div>
            <a href="#" onClick={() => router.back()}>Back</a>
            <h1>{post.title}</h1>
            <h3 dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}

export default Post