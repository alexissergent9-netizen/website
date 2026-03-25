import { createContext, useContext, useEffect, useState } from 'react'
import googleSheetsService from '../services/googleSheetsService'

const CURRENT_YEAR = new Date().getFullYear()

const DEFAULT_NAV = [
  { key: 'press',       label: 'Press',        enabled: 'true', order: '1' },
  { key: 'exhibitions', label: 'Exhibitions',   enabled: 'true', order: '2' },
  { key: 'works',       label: 'Works',         enabled: 'true', order: '3' },
  { key: 'resources',   label: 'Resources',     enabled: 'true', order: '4' },
  { key: 'contacts',    label: 'Contacts',      enabled: 'true', order: '5' },
]

const DEFAULT_NAV_SUBITEMS = [
  { section: 'press',       parent: '',         key: 'articles',          label: 'articles',                        url: '/press/articles',                              external: 'false', order: '1', enabled: 'true' },
  { section: 'press',       parent: 'articles', key: 'current',           label: 'current',                         url: '/press/articles',                              external: 'false', order: '1', enabled: 'true' },
  { section: 'press',       parent: 'articles', key: 'past',              label: 'past',                            url: '/press/articles/past',                         external: 'false', order: '2', enabled: 'true' },
  { section: 'exhibitions', parent: '',         key: 'current',           label: 'current',                         url: '/exhibitions/current',                         external: 'false', order: '1', enabled: 'true' },
  { section: 'exhibitions', parent: '',         key: 'past',              label: 'past',                            url: '/exhibitions/past',                            external: 'false', order: '2', enabled: 'true' },
  { section: 'exhibitions', parent: '',         key: 'upcoming',          label: 'upcoming',                        url: '/exhibitions/upcoming',                        external: 'false', order: '3', enabled: 'true' },
  { section: 'resources',   parent: '',         key: 'foundation',        label: 'the david hockney foundation',    url: 'http://www.thedavidhockneyfoundation.org/',    external: 'true',  order: '1', enabled: 'true' },
  { section: 'resources',   parent: '',         key: 'galleries',         label: 'galleries',                       url: '/resources/galleries',                         external: 'false', order: '2', enabled: 'true' },
  { section: 'resources',   parent: '',         key: 'making_works',      label: "making 'works'",                  url: '/resources/making_works',                      external: 'false', order: '3', enabled: 'true' },
  { section: 'resources',   parent: '',         key: 'publications',      label: 'publications',                    url: '/resources/publications',                      external: 'false', order: '4', enabled: 'true' },
  { section: 'resources',   parent: '',         key: 'public_collections',label: 'works in public collections',     url: '/resources/public_collections',                external: 'false', order: '5', enabled: 'true' },
]

const DEFAULTS = {
  siteNameFirst: '',
  siteNameSecond: '',
  pageTitle: '',
  footerCopyright: '',
  navItems: DEFAULT_NAV,
  navSubitems: DEFAULT_NAV_SUBITEMS,
  worksCategories: [],
  worksSubcategories: [],
  siteLoading: true,
}

// Replace any 4-digit year in the copyright string with the current year
function withCurrentYear(data) {
  if (data.footerCopyright) {
    data.footerCopyright = data.footerCopyright.replace(/\d{4}/, CURRENT_YEAR)
  }
  return data
}

const SiteDataContext = createContext(DEFAULTS)

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(DEFAULTS)

  useEffect(() => {
    Promise.allSettled([
      googleSheetsService.getSiteData()
        .then(data => {
          if (Object.keys(data).length > 0) {
            setSiteData(prev => withCurrentYear({ ...prev, ...data }))
          }
        }),
      googleSheetsService.getNavItems()
        .then(items => {
          if (items.length > 0) {
            setSiteData(prev => ({ ...prev, navItems: items }))
          }
        }),
      googleSheetsService.getWorksCategories()
        .then(cats => {
          if (cats.length > 0) {
            setSiteData(prev => ({ ...prev, worksCategories: cats }))
          }
        }),
      googleSheetsService.getWorksSubcategories()
        .then(subs => {
          if (subs.length > 0) {
            setSiteData(prev => ({ ...prev, worksSubcategories: subs }))
          }
        }),
      googleSheetsService.getNavSubitems()
        .then(items => {
          if (items.length > 0) {
            setSiteData(prev => ({ ...prev, navSubitems: items }))
          }
        }),
    ]).finally(() => {
      setSiteData(prev => ({ ...prev, siteLoading: false }))
    })
  }, [])

  // Actualizar el título de la pestaña del navegador
  useEffect(() => {
    if (siteData.pageTitle) {
      document.title = siteData.pageTitle
    }
  }, [siteData.pageTitle])

  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  return useContext(SiteDataContext)
}
