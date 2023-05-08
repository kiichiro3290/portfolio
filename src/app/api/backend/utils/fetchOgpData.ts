import { JSDOM } from 'jsdom'
import { OgpData } from 'src/types/ogp'

export const fetchOgpData = async (url: string) => {
  const res = await fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const dom = new JSDOM(text)

      const meta = dom.window.document.head.querySelectorAll('meta')
      const titleTag = dom.window.document.title
      const tagsContainingOg = Array.from(meta).filter((tag) => {
        const property = tag.getAttribute('property')
        const name = tag.getAttribute('name')
        const checkOg = (text: string) => text.substring(0, 3) === 'og:'

        return checkOg(property ?? '') || checkOg(name ?? '')
      })

      const ogp = tagsContainingOg.reduce((previous: any, tag: Element) => {
        const attr = tag.hasAttribute('property')
          ? tag.getAttribute('property')
          : tag.getAttribute('name')

        const key = attr?.trim().replace('og:', '') ?? ''
        const content = tag.getAttribute('content') ?? ''
        previous[key] = content

        return previous
      }, {})

      const siteUrl = ogp['url'].substring(
        0,
        ogp['url'].indexOf('/', 8)
      ) as string
      const faviconPath = '/favicon.ico'

      const ogpData: OgpData = {
        title: titleTag,
        description: ogp['description'] as string,
        faviconUrl: siteUrl + faviconPath,
        ogpImgUrl: ogp['image'] as string,
        pageUrl: url as string,
      }

      return ogpData
    })

  return res
}
