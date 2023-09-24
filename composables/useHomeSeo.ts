import { destr } from 'destr'
import { parseURL, withHttps } from 'ufo'

function getTwitterSite(twitterLink: string) {
  if (!twitterLink) return twitterLink

  const { pathname } = parseURL(withHttps(twitterLink))
  const accountPath = pathname.split('/')[1]
  return accountPath ? `@${accountPath}` : twitterLink
}

export function useHomeSeo() {
  const config = useRuntimeConfig()
  const siteUrl = config?.public?.siteUrl
  const nuxt = useNuxtApp()

  onServerPrefetch(async () => {
    const site = await getSite()
    const socials = destr<{ Twitter: string }>(site?.socials) || {}

    nuxt.runWithContext(() =>
      useSeoMeta({
        title: () => site?.name ?? 'Storipress Karbon Starter',
        description: () => site?.name ?? 'Storipress Karbon Starter',
        ogTitle: () => site?.name ?? 'Storipress Karbon Starter',
        ogDescription: () => site?.name ?? 'Storipress Karbon Starter',
        ogSiteName: () => site?.name ?? 'Storipress Karbon Starter',
        twitterSite: () => getTwitterSite(socials.Twitter),
        ogType: 'website',
        ogUrl: siteUrl,
      }),
    )
  })
}
