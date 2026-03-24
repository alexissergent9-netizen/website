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

const DEFAULTS = {
  siteNameFirst: 'DAVID',
  siteNameSecond: 'HOCKNEY',
  pageTitle: 'David Hockney',
  footerCopyright: `All Images and Site Content Copyright © ${CURRENT_YEAR} David Hockney - All Rights Reserved`,
  navItems: DEFAULT_NAV,
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
    googleSheetsService.getSiteData()
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSiteData(prev => withCurrentYear({ ...prev, ...data }))
        }
      })
      .catch(() => {})

    googleSheetsService.getNavItems()
      .then(items => {
        if (items.length > 0) {
          setSiteData(prev => ({ ...prev, navItems: items }))
        }
      })
      .catch(() => {})
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
