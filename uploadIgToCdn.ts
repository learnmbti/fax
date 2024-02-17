import { writeFileSync, existsSync, mkdirSync, createWriteStream } from "fs"

import { Readable } from'stream';
import { finished } from 'stream/promises';

const authHeader = process.env.CMS_AUTH
const cmsUrl = process.env.CMS_URL
const pageSize = 1000

export type IIgPost = {
  id: string
  caption: string
  media_url: string
  permalink: string
  username: string
  timestamp: string
  tags: string[]
  updatedAt: string
}

console.log('fetching posts...')
const response = await fetch(`${cmsUrl}/ig/posts?limit=${pageSize}`, {headers: {Authorization: authHeader}})
const posts: IIgPost[] = await response.json()
console.log(`fetched ${posts.length} posts`)

if (!existsSync('cdn/img/ig')) {
  mkdirSync('cdn/img/ig', {recursive: true})
}

const postsTransformed = posts.map((post) => ({
  ...post,
  media_url: `https://cdn.learnmbti.com/img/ig/${post.id}.jpg`
}))

const downloadFile = async (url: string, fileName: string) => {
  if (existsSync(fileName)) {
    console.log(`${fileName} exists, skipping download`)
    return
  }
  console.log(`downloading ${fileName}`)
  const res = await fetch(url);
  const fileStream = createWriteStream(fileName, { flags: 'wx' });
  if (res.body) {
    await finished(Readable.fromWeb(res.body as any).pipe(fileStream));
  }
};

const queue: Array<() => Promise<void>> = posts.map(post => (() => downloadFile(post.media_url, `cdn/img/ig/${post.id}.jpg`)))

const consumer = async () => {
  while (queue.length > 0) {
    console.log(`${queue.length} iamges left...`)
    await queue.pop()?.()
  }
}

await Promise.all([consumer(),consumer(), consumer(), consumer()])

console.log('writing json file')
writeFileSync('cdn/posts.json', JSON.stringify(postsTransformed, null, 2))

console.log('done')
