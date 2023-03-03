import Head from 'next/head'
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';


const About = () => {
  const { data } = useQuery(gql`
  query AboutUsQuery {
    page(id: "2", idType: DATABASE_ID) {
      title
      pageTemplate {
        topText
        topImage {
          sourceUrl
        }
        contentSection {
          contentSectionText
          contentSectionTitle
          contentSectionImage {
            sourceUrl
          }
        }
      }
    }
  }
  `)

  const page = data?.page;
  const topImage = page?.pageTemplate?.topImage?.sourceUrl
  const topText = page?.pageTemplate?.topText
  const contentSection = page?.pageTemplate?.contentSection

  console.log(contentSection);

  if (!page) {
    return <main><div>loading...</div></main>
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <div style={{ backgroundImage: `url(${topImage})`, backgroundSize: 'cover', height: 'calc(50vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', paddingLeft: '100px', fontSize: '64px' }}>{topText}</h1>
      </div>
      <main>
        {contentSection.map(content => (
          <div key={content.contentSectionTitle} style={{ marginBottom: '50px' }}>
            <h2>{content.contentSectionTitle}</h2>
            <div style={{display: 'flex', gap: '32px', marginTop: '30px'}}>
            <Image src={content.contentSectionImage.sourceUrl} alt='feature image' width={400} height={300} />
            <p dangerouslySetInnerHTML={{ __html: content.contentSectionText }} />
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default About