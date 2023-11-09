import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../../../components/layout';
import Seo from '../../../../components/seo';

import '../../../../styles/global.css';
import '../../../../styles/style.css';

const CPXLevel1Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const exercises = data.allMdx.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <div className="exercises-main">
        <article className="hero">
          <img
            src="images/desk.jpg"
            className="background-image"
            alt="CPX Board with Lights"
          />
          <div className="pane">
            <header className="content">
              <h2>
                <span>CPX Training Workshop</span>
              </h2>
            </header>
            <section className="content">
              <span>CircuitPython - Level 1</span>
            </section>
          </div>
        </article>
        <Seo title="CircuitPython | Level 1" />
        <article className="content">
          <img
            src="../../../images/circuitpython/mu.png"
            alt="Mu Blink"
            className="makecode"
          />
          <h2>
            Intro to CircuitPython with Adafruit's Circuit Playground Express
          </h2>
          <h3>
            <Link to={`/setup`}>Start Here</Link>
          </h3>
          <p>
            If you haven't set up your Circuit Playground Express board to
            support CircuitPython yet, please refer to the{' '}
            <Link to={`/setup`}>setup instructions</Link>.
          </p>
        </article>
        {exercises.map((node) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header className="content">
                <h3>
                  <Link to={node.fields.slug}>{title}</Link>
                </h3>
              </header>
              <section className="content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default CPXLevel1Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {
        internal: {
          contentFilePath: { regex: "/exercises/circuitpython/level-1//" }
        }
      }
      sort: [
        { frontmatter: { level: ASC } }
        { frontmatter: { exercise: ASC } }
      ]
    ) {
      nodes {
        id
        tableOfContents
        frontmatter {
          title
        }
        internal {
          contentFilePath
        }
        fields {
          slug
        }
      }
    }
  }
`;
