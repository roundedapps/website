# Deployment Guide

## Hosting

- **Provider**: Bluehost
- **Domain**: roundedapps.com

## Build

The site uses Next.js static export. Run the build from the project root:

```bash
npm run build
```

This generates the `out/` folder containing the static site.

## Deploy via FTP (FileZilla)

### FTP Credentials

| Setting   | Value                                |
|-----------|--------------------------------------|
| Host      | ftp.roundedapps.com                  |
| Username  | roundedappsftp@roundedapps.com       |
| Port      | 21 (FTP & explicit FTPS)             |
| Password  | Stored in Accessbox (FTP card)       |

### Steps

1. Open **FileZilla**
2. Enter credentials in the Quickconnect bar at the top
3. **Local side (left panel)**: Navigate **inside** the project's `out/` folder (double-click to enter it)
4. **Remote side (right panel)**: Make sure you're at `/` (the root)
5. Select all files/folders (Cmd+A) and upload (choose **Overwrite** when prompted)
6. Wait for the transfer to complete
7. Verify the site at [https://roundedapps.com](https://roundedapps.com)

### Notes

- Always run `npm run build` before deploying to ensure the `out/` folder is up to date
- The password is stored in an Accessbox card for safekeeping
- Upload the **contents** of `out/`, not the `out/` folder itself — go inside it first, then select all
- The remote root is `/`, not `public_html` (Bluehost FTP user is scoped to the web root)
- If things look stale, the "nuke and re-upload" approach works: delete everything on the remote, then upload fresh
