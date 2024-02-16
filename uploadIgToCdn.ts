import { writeFileSync } from "fs"

const authHeader = process.env.CMS_AUTH
const cmsUrl = process.env.CMS_URL

const response = await fetch(`${cmsUrl}/ig/posts`, {headers: {Authorization: authHeader}})
const json = await response.text()
writeFileSync('cdn/posts.json', json)
