// Node.js veya serverless function olarak
import fs from 'fs'
import path from 'path'

const dbPath = path.resolve('api/db.json')

function loadData() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return {}
  }
}

function saveData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export default async function handler(req, res) {
  const method = req.method
  const { imageId, reaction } = method === 'POST' ? req.body : req.query

  if (!imageId) {
    return res.status(400).json({ success: false, message: 'imageId is required' })
  }

  const data = loadData()
  data[imageId] = data[imageId] || { like: 0, star: 0, clap: 0, fire: 0 }

  if (method === 'POST') {
    if (!['like', 'star', 'clap', 'fire'].includes(reaction)) {
      return res.status(400).json({ success: false, message: 'invalid reaction' })
    }
    data[imageId][reaction]++
    saveData(data)
    return res.status(200).json({ success: true, newTotal: data[imageId][reaction] })
  }

  if (method === 'GET') {
    return res.status(200).json(data[imageId])
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' })
}
