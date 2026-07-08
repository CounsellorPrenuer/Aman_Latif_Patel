export type Feature = { _type?: string;text: string; included: boolean}
export type Plan = { _type?: string;tier: string; name: string; price: string; features: Feature[]; buttonText: string}
export type Audience = { _type?: string;label: string; leftPlan: Plan; rightPlan: Plan}
export type CustomService = { _type?: string;title: string; price: string; description: string; icon: string; buttonText: string}

export type SiteContent = {
  brandName: string
  tagline: string
  aboutBrand: string
  heroTitle: string
  heroSubtitle: string
  founderName: string
  founderBio: unknown[]
  founderImage: unknown
  services: {title: string; description: string}[]
  successStories?: string[]
  testimonials: {quote: string; author: string}[]
  packageAudiences: Audience[]
  customServices: CustomService[]
  phone: string
  email: string
  instagram: string
  linkedin: string
  coreValues?: string[]
  whoShouldContact?: string[]
  sessionDetails?: string
}
