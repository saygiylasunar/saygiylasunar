import site from '../content/site.json'
import services from '../content/services.json'
import projects from '../content/projects.json'
import experience from '../content/experience.json'
import skills from '../content/skills.json'
import parcels from '../content/parcels.json'

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
  return parcels.items.filter((parcel) => parcel.published)
}

export function parcelTotalPrice(parcel) {
  if (!Number.isFinite(parcel?.tapuAlanM2)) return null
  return Math.trunc(parcel.tapuAlanM2) * parcels.config.fiyatM2
}
