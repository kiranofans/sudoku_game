export const shareLinks = {
    x: (text: string, url: string) =>
        `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,

    facebook: (text: string, url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}}`,

    whatsapp: (text: string, url: string) =>
        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,

    reddit: (title: string, url: string) =>
        `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,

    linkedin: (text: string, url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,

    telegram: (text: string, url: string) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
};
