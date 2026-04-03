import { createContext, useContext, useEffect, useState } from 'react'
import googleSheetsService from '../services/googleSheetsService'

const CURRENT_YEAR = new Date().getFullYear()

const DEFAULTS = {
  siteNameFirst: '',
  siteNameSecond: '',
  pageTitle: '',
  footerCopyright: '',
  navItems: [],
  navSubitems: [],
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

  // Actualizar título y meta tags SEO desde Sheets
  useEffect(() => {
    if (siteData.pageTitle) {
      document.title = siteData.pageTitle
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', siteData.pageTitle)
    }
  }, [siteData.pageTitle])

  useEffect(() => {
    if (siteData.metaDescription) {
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', siteData.metaDescription)
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', siteData.metaDescription)
    }
  }, [siteData.metaDescription])

  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  return useContext(SiteDataContext)
}
