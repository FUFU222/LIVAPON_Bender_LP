import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://livapon-bender-lp.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://livapon-bender-lp.vercel.app/terms',
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://livapon-bender-lp.vercel.app/privacy',
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}
