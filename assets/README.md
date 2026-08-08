# Land asset bundle

Place the publishable land image archive at:

`assets/lands-publishable.zip`

The archive must use ZIP STORE (no compression). `npm run dev` and `npm run build` automatically extract it into `public/lands/` via `scripts/extract-land-assets.mjs`.

Expected archive paths use the normalized form:

- `_global/tum-imar.webp`
- `304-11/dokum.webp`
- `304-11/imar.webp`
- `304-11/arazi.webp`
- `304-11/uzay.webp`
- `<parcel>/google-earth.webp`
- `<parcel>/dokum.webp`
- `<parcel>/imar.webp`
- `<parcel>/arazi.webp`
- `<parcel>/uzay.webp`

`309-14` is excluded from the public portfolio and must not be present in the publishable archive.
