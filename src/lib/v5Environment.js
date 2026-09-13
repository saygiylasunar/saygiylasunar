import { ref, watch } from 'vue'

export const v5Environments = [
  {
    id: 'paper',
    label: { tr: 'Kağıt', en: 'Paper' },
    name: 'Paper Signal',
    swatch: '#ff6428',
  },
  {
    id: 'night',
    label: { tr: 'Gece', en: 'Night' },
    name: 'Night Transmission',
    swatch: '#43e7ff',
  },
  {
    id: 'garden',
    label: { tr: 'Bahçe', en: 'Garden' },
    name: 'Garden Machine',
    swatch: '#ff6040',
  },
  {
    id: 'field',
    label: { tr: 'Saha', en: 'Field' },
    name: 'Field Manual',
    swatch: '#ff6b21',
  },
]

const storedEnvironment = localStorage.getItem('v5-environment')
const isKnownEnvironment = v5Environments.some((environment) => environment.id === storedEnvironment)

export const v5Environment = ref(isKnownEnvironment ? storedEnvironment : 'garden')

export function setV5Environment(nextEnvironment) {
  if (!v5Environments.some((environment) => environment.id === nextEnvironment)) return
  v5Environment.value = nextEnvironment
}

watch(
  v5Environment,
  (value) => {
    document.documentElement.dataset.v5Environment = value
    localStorage.setItem('v5-environment', value)
  },
  { immediate: true },
)
