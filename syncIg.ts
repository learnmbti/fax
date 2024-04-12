import { existsSync, mkdirSync, createWriteStream, writeFileSync } from "fs"

import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { execSync } from 'child_process'

const authHeader = process.env.CMS_AUTH ?? ''
const cmsUrl = process.env.CMS_URL ?? 'http://localhost:3000/cms'

type IIgPost = {
  id: string
  caption: string
  media_url: string
  permalink: string
  username: string
  timestamp: string
  tags: string[]
  updatedAt: string
}

type IIgCreator = {
  id: string
  username: string
  profile_picture_url: string
}

type DownloadImage = {
  src: string
  fileName: string
}

type ImportResponse = {
  postUpsertResults: unknown
  posts: IIgPost[]
  creators: IIgCreator[]
  downloadImages: DownloadImage[]
}

if (!existsSync('cdn/img/ig')) {
  mkdirSync('cdn/img/ig', { recursive: true })
}

const isValidImportResponse = (payload: unknown | ImportResponse): payload is ImportResponse => {
  return typeof payload === 'object'
   && payload !== null
   && 'posts' in payload
   && Array.isArray(payload.posts)
   && 'creators' in payload
   && Array.isArray(payload.creators)
   && 'downloadImages' in payload
   && Array.isArray(payload.downloadImages)
}

console.log('importing and fetching posts and creators...')

const response = await fetch(`${cmsUrl}/ig/import`, {
  method: 'POST',
  headers: {
    Authorization: authHeader,
  }
})
if (response.status !== 200) {
  throw new Error(`error when importing ig status=${response.status} body=${await response.text()}`)
}
const result = await response.json()
if (!isValidImportResponse(result)) {
  console.error(result)
  throw new Error(`got invalid import response`)
}
const { postUpsertResults, posts, creators, downloadImages } = result

console.log('postUpsertResults', postUpsertResults)
console.log(`fetched ${posts.length} posts, ${creators.length} creators, total of ${downloadImages.length} images`)

const excludeFields = (array: Record<string, unknown>[]) => {
  return array.map(({
    _id,
    __v,
    profile_picture_url,
    media_url,
    ...rest }) => rest)
}

writeFileSync('cdn/posts.json', JSON.stringify(excludeFields(posts), null, 2))
writeFileSync('cdn/creators.json', JSON.stringify(excludeFields(creators), null, 2))

console.log('wrote to json files')

const downloadFile = async (url: string, fileName: string) => {
  const forceDownloadThisFile = process.env.FORCE_DOWNLOAD?.includes(fileName)
  console.log('force download', process.env.FORCE_DOWNLOAD, fileName, forceDownloadThisFile)
  if (existsSync(fileName) && !forceDownloadThisFile) {
    console.log(`${fileName} exists, skipping download`)
    return
  }
  console.log(`downloading ${__dirname}/${fileName} from ${url}`)
  // const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  // const fileStream = createWriteStream(fileName, { flags: 'wx' });
  // if (res.body) {
  //   await finished(Readable.fromWeb(res.body as any).pipe(fileStream));
  // }
  execSync(`curl "${url}" -o ${__dirname}/${fileName}`)
  console.log(`downloaded ${fileName} from ${url}`)
};

const queue: Array<() => Promise<void>> = downloadImages.map(downloadImage => (() => downloadFile(downloadImage.src, `cdn/${downloadImage.fileName}`)))

const consumer = async () => {
  while (queue.length > 0) {
    console.log(`${queue.length} iamges left...`)
    await queue.pop()?.().catch(e => console.error(e))
  }
}

console.log('downloading image files')

await Promise.all([consumer(), consumer(), consumer(), consumer()])

console.log('done')
