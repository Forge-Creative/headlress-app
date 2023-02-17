import Head from 'next/head'
import { gql, useQuery } from '@apollo/client';


export default function News() {

  const { data } = useQuery(gql`
  query NewsCategoryPostsQuery {
    posts(where: {categoryName: "News"}) {
      nodes {
        id 
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
        slug
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
        <title>News</title>
      </Head>
      <main>
      <div className="cards-wrapper">
          {(posts.map(post => {
            const {id, title, excerpt, slug} = post
            return (
            <div key={id} className="post-card">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              <a href={`/news/${slug}`}>Read more</a>
            </div>
          )}))}
        </div>
      </main>
    </>
  )
}

