const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function set16(view, offset, value) {
  view.setUint16(offset, value, true)
}

function set32(view, offset, value) {
  view.setUint32(offset, value >>> 0, true)
}

export async function buildStoreZip(files) {
  const encoder = new TextEncoder()
  const localParts = []
  const centralParts = []
  let localOffset = 0
  let centralSize = 0

  for (const file of files) {
    const nameBytes = encoder.encode(file.name)
    const data = new Uint8Array(await file.blob.arrayBuffer())
    const crc = crc32(data)
    const size = data.byteLength

    const localHeader = new ArrayBuffer(30)
    const local = new DataView(localHeader)
    set32(local, 0, 0x04034b50)
    set16(local, 4, 20)
    set16(local, 6, 0x0800)
    set16(local, 8, 0)
    set16(local, 10, 0)
    set16(local, 12, 0)
    set32(local, 14, crc)
    set32(local, 18, size)
    set32(local, 22, size)
    set16(local, 26, nameBytes.length)
    set16(local, 28, 0)

    localParts.push(localHeader, nameBytes, data)

    const centralHeader = new ArrayBuffer(46)
    const central = new DataView(centralHeader)
    set32(central, 0, 0x02014b50)
    set16(central, 4, 20)
    set16(central, 6, 20)
    set16(central, 8, 0x0800)
    set16(central, 10, 0)
    set16(central, 12, 0)
    set16(central, 14, 0)
    set32(central, 16, crc)
    set32(central, 20, size)
    set32(central, 24, size)
    set16(central, 28, nameBytes.length)
    set16(central, 30, 0)
    set16(central, 32, 0)
    set16(central, 34, 0)
    set16(central, 36, 0)
    set32(central, 38, 0)
    set32(central, 42, localOffset)

    centralParts.push(centralHeader, nameBytes)

    localOffset += 30 + nameBytes.length + size
    centralSize += 46 + nameBytes.length
  }

  const end = new ArrayBuffer(22)
  const eocd = new DataView(end)
  set32(eocd, 0, 0x06054b50)
  set16(eocd, 4, 0)
  set16(eocd, 6, 0)
  set16(eocd, 8, files.length)
  set16(eocd, 10, files.length)
  set32(eocd, 12, centralSize)
  set32(eocd, 16, localOffset)
  set16(eocd, 20, 0)

  return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' })
}
