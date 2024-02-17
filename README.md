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

### 1. Import ig to preview

This is running on schedule to fetch latest ig posts and upload to cms, and then we can manage tags of the new posts inside cms

### 2. Upload ig to cdn

This get the ig posts from review, download the ig image and upload to cdn. trigger by cms when imported new ig posts
