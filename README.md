# Fax

Scripts and workflows to copy files

## To run the scripts

You can use nodeJS run time

```sh
npx tsx ./index.ts # or other scripts
```

Or bun

```sh
bun ./index.ts # or others scripts
```

## Use cases

### 1. Sync ig to preview and cdn

A github action that runs every 15 minutes to ask cms to import ig posts, and refresh cms for json and jpg

1. request cms/ig/import
   1. for each ig creators, fetch their info and posts, put to mongo
   2. response posts and creators info that should be visible to readers
   3. response the list of images should be downloaded
2. store the response in 1.2 to posts.json and creators.json
3. download all images
4. push the new json and images to cdn
