import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rbzasjel',
    dataset: 'production'
  },
  project: { basePath: '/' },
  studioHost: 'aman-latif-patel'
})
