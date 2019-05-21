const website = require('./website')

module.exports = {
  'it-it': {
    default: true,
    path: 'it',
    locale: 'it-it',
    siteLanguage: 'it',
    ogLang: 'it_IT',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
  },
  'en-gb': {
    path: 'en',
    locale: 'en-gb',
    siteLanguage: 'en',
    ogLang: 'en_US',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
    defaultDescription: website.description,
  },
}
