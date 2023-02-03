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

  const posts = data?.posts?.nodes;

  if (!posts) {
    return <main><div>loading...</div></main>
  }

  return (
    <>
      <Head>
        <title>Headless</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="cards-wrapper">
          {(posts.map(post => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <a href={`/${post.slug}`}>Read more</a>
            </div>
          )))}
        </div>
      </main>
    </>
  )
}

