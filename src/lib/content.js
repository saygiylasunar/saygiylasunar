import site from '../content/site.json'
import services from '../content/services.json'
import projectRecords from '../content/projects.json'
import experience from '../content/experience.json'
import skills from '../content/skills.json'
import parcels from '../content/parcels.json'

/**
 * Public site content only.
 * Never place genuinely private project information in projects.json.
 */
const projects = projectRecords.filter((project) => project.visibility === 'public')

export { site, services, projects, experience, skills, parcels }

export function getService(slug) {
  return services.find((service) => service.slug === slug)
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsForService(serviceSlug) {
  return projects.filter((project) => project.serviceSlugs?.includes(serviceSlug))
}

export function getPublishedParcels() {
  const withheld = new Set(['304-11', ...(parcels.config.excluded || [])])
  return parcels.items.filter((parcel) => parcel.published && !withheld.has(parcel.id))
}

export function parcelTotalPrice(parcel) {
  if (!Number.isFinite(parcel?.tapuAlanM2)) return null
  return Math.trunc(parcel.tapuAlanM2) * parcels.config.fiyatM2
}
