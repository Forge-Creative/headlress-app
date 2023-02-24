import Head from 'next/head'
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
            seo {
              title
            }
          }
        }
        `);

  const post = data?.post
  const imageUrl = data?.post.featuredImage?.node.sourceUrl
  const seoTitle = post?.seo?.title

  if (!post) {
    return <main><div>loading...</div></main>
  }
  return (
    <>
          <Head>
        <title>{seoTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main>
      <a href="#" onClick={() => router.back()}>Back</a>
      <div className='post-content'>

        <h1>{post.title}</h1>
        {imageUrl && (
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image src={imageUrl} alt='feature image' width={800} height={600} />
          </div>)}
        <div class='post-main' dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
    </>
  )
}

export default Post