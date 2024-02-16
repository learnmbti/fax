const authHeader = process.env.CMS_AUTH
const cmsUrl = process.env.CMS_URL

const response = await fetch(`${cmsUrl}/ig/posts`, {headers: {Authorization: authHeader}})
console.log(await response.text())