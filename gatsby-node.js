const _ = require('lodash')
const locales = require('./config/i18n')
const { replaceTrailing, localizedSlug, replaceBoth, wrapper } = require('./src/utils/gatsby-node-helpers')

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  if (page.path.includes('404')) {
    return
  }

  // First delete the pages so we can re-create them
  deletePage(page)

  Object.keys(locales).map(lang => {
    // Remove the trailing slash from the path, e.g. --> /categories
    page.path = replaceTrailing(page.path)

    // Remove the leading AND traling slash from path, e.g. --> categories
    const name = replaceBoth(page.path)

    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locales[lang].default ? page.path : `${locales[lang].path}${page.path}`

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: lang,
        name,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const serviceTemplate = require.resolve('./src/templates/service.jsx')
  // const postTemplate = require.resolve('./src/templates/post.jsx')

  const result = await wrapper(
    graphql(`
      {
        posts: allPrismicPost {
          edges {
            node {
              id
              uid
              lang
            }
          }
        }
        services: allPrismicService {
          edges {
            node {
              lang
              uid
            }
          }
        }
      }
    `)
  )

  const serviceList = result.data.services.edges
  // const postsList = result.data.posts.edges

  serviceList.forEach(edge => {
    createPage({
      path: localizedSlug(edge.node),
      component: serviceTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  // postsList.forEach(edge => {
  //   // The uid you assigned in Prismic is the slug!
  //   createPage({
  //     path: localizedSlug(edge.node),
  //     component: postTemplate,
  //     context: {
  //       // Pass the unique ID (uid) through context so the template can filter by it
  //       uid: edge.node.uid,
  //       locale: edge.node.lang,
  //     },
  //   })
  // })
}
