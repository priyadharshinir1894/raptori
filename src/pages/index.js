import React from 'react'
import styled from 'styled-components'

import {
	Layout,
	Link,
	PostGrid,
	PostLink,
	SEO,
	WaveSection,
} from 'src/components'
import { get } from 'src/utils'

const H3 = styled.h3`
	margin-top: 0;
`

const IndexPage = ({ data }) => {
	const edges = get(data, 'allMarkdownRemark', 'edges') || []
	return (
		<Layout>
			<SEO title="Home" />
			<WaveSection>
				<h1 className="intro-title">Hello!</h1>
				<p>
					I'm Joe McGrath, a software engineer with a background in
					design, currently working at{' '}
					<Link to="https://webflow.com/">Webflow</Link>. I build
					highly scaleable web apps, contribute to open source, and
					write fiction in my spare time!
				</p>
				<br />
				<p>
					<Link to="/blog" button>
						All Posts
					</Link>
					&nbsp;
					<Link to="/projects" secondary button>
						Projects
					</Link>
					&nbsp;
					<Link to="/resume" secondary button>
						Resume
					</Link>
				</p>
			</WaveSection>
			{edges.length ? (
				<>
					<H3>Featured Posts</H3>
					<PostGrid>
						{edges.map((edge, i) => (
							<PostLink
								key={edge.node.id}
								featured={i === 0}
								post={edge.node}
							/>
						))}
					</PostGrid>
				</>
			) : null}
		</Layout>
	)
}

export default IndexPage

export const pageQuery = graphql`
	query {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			limit: 3
			filter: { frontmatter: { tags: { in: ["home"] } } }
		) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					frontmatter {
						featuredImage {
							childImageSharp {
								fluid {
									src
								}
							}
						}
						path
						title
						subtitle
					}
					fields {
						readingTime {
							text
						}
					}
				}
			}
		}
	}
`
