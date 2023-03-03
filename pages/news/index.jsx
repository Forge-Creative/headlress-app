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
      <div style={{ backgroundImage: 'url(https://headless.fc9.sandbox.net.nz/wp-content/uploads/2023/03/TEAM-PHOTO-placeholder.png)', backgroundSize: 'cover', height: 'calc(50vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', paddingLeft: '100px', fontSize: '64px' }}>News</h1>
      </div>
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

