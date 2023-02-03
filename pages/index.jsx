import Head from 'next/head'
import { gql, useQuery } from '@apollo/client';


export default function Home() {

  const { data } = useQuery(gql`
  query NewQuery {
    posts {
      nodes {
        id
        slug
        excerpt
        title
      }
    }
  }
  `)

const posts= data?.posts?.nodes; 
console.log(posts);
  return ( 
    <>
      <Head>
        <title>Headless</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {posts? (posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.slug}</p>
            <h3 dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <a href={`/${post.slug}`}>Read more</a>
          </div>
        ))):(
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

