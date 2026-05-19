# Raw Media Workflow

1. Put original source assets in:
- `assets/raw/images`
- `assets/raw/videos`

2. Optimize images before commit:

```bash
npm run media:optimize
```

3. Add optimized outputs to `public/images` and videos to `public/videos`.

4. CI runs `npm run media:check` to catch unsupported formats and oversized files.
