import { existsSync, mkdirSync, createWriteStream } from "fs"

import { Readable } from 'stream';
import { finished } from 'stream/promises';

import creators from './cdn/creators.json'

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

const queue: Array<() => Promise<void>> = [
  posts.map(post => (() => downloadFile(post.media_url, `cdn/img/ig/${post.id}.jpg`))),
  creators.map(creator => (() => downloadFile(creator.profile_picture_url, `cdn/img/ig/${creator.username}.jpg`)))
].flat()

const consumer = async () => {
  while (queue.length > 0) {
    console.log(`${queue.length} iamges left...`)
    await queue.pop()?.()
  }
}

await Promise.all([consumer(),consumer(), consumer(), consumer()])

console.log('done')
