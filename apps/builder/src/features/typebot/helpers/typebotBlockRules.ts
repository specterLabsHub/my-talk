export const findInvalidUrls = (urls: string[]): string[] => {
    const validUrls: string[] = [
        'specterlabs.com.br'
    ]

    return urls.filter(url => 
        !validUrls.some(validUrl => 
            url === validUrl ||
            url === `www.${validUrl}` ||
            url === `http://www.${validUrl}` ||
            url === `https://www.${validUrl}`    
        )
    )
}
