"use client"

import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {useMemo, useState, useEffect} from 'react'
import {
  Check,
  X,
  FileText,
  Link2,
  BriefcaseBusiness,
  ClipboardList,
  BookOpenText,
  MessagesSquare,
  Globe,
  UserRoundCheck,
  Shield,
  Heart,
  Sparkles,
  Compass,
  FileSearch,
  Clock,
  Languages,
  Phone,
  GraduationCap,
  AlertCircle,
  HelpCircle,
  Users
} from 'lucide-react'
import {client} from '@/lib/sanity.client'
import {siteContentQuery} from '@/lib/queries'
import type {SiteContent} from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  cv: FileText,
  linkedin: Link2,
  strategy: BriefcaseBusiness,
  report: ClipboardList,
  gateway: BookOpenText,
  session: MessagesSquare,
  globe: Globe,
  interview: UserRoundCheck,
}

// Calming, professional color palette based on logo steel blue/slate tones
const brand = {
  navy: '#0F2A4A',       // Deep trust navy
  green: '#5F7D5F',      // Calming sage green
  blueDeep: '#627C94',   // Logo steel blue
  bgSoft: '#F4F7F9',     // Soft lavender/blue-gray white
  accent: '#D0E1D4',     // Light sage accent
  white: '#FFFFFF',
}

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || ''

function withBase(path: string) {
  return `${assetBase}${path}`
}

function formatPrice(price: string) {
  const v = (price || '').replace(/₹/g, '').replace(/\?/g, '').trim()
  return v ? `₹ ${v}` : '₹'
}

// Custom components to style PortableText headings, paragraphs and lists beautifully
const portableTextComponents = {
  block: {
    h3: ({children}: any) => (
      <h3 className="text-base font-bold mt-6 mb-3 border-l-4 pl-3 tracking-wide" style={{color: brand.navy, borderColor: brand.green}}>
        {children}
      </h3>
    ),
    normal: ({children}: any) => (
      <p className="text-slate-600 leading-relaxed text-sm mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({children}: any) => (
      <ul className="list-disc pl-5 mb-4 text-sm text-slate-600 space-y-1.5">
        {children}
      </ul>
    ),
  },
}

const localContent: SiteContent = {
  brandName: 'SIMAN COUNSELLING',
  tagline: 'Guiding Students Towards the Right Career Path',
  heroTitle: 'SIMAN COUNSELLING\nCareer Guidance & Educational Consulting',
  heroSubtitle: 'Empowering students with clarity, confidence, and direction for their future.',
  aboutBrand: 'SIMAN COUNSELLING is a career guidance and educational consulting platform dedicated to helping students make informed academic and career decisions. We provide personalized career counselling, stream selection guidance, psychometric assessments, college admission support, and skill development mentoring. Our objective is to empower students with clarity, confidence, and direction for their future. With extensive experience in education and career counselling, we strive to bridge the gap between potential and opportunity.',
  founderName: 'Aman Latif Patel',
  founderBio: [
    {
      _type: 'block',
      style: 'normal',
      children: [{_type: 'span', text: 'Aman Latif Patel is an educator, career counsellor, and mentor with over 8 years of experience in teaching and student development.'}]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{_type: 'span', text: 'Education & Credentials'}]
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{_type: 'span', text: 'M.A. in English'}]
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{_type: 'span', text: 'B.Ed.'}]
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{_type: 'span', text: 'MBA in Marketing'}]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{_type: 'span', text: 'Professional Journey'}]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{_type: 'span', text: 'He began his professional journey as a Career Counsellor at Mentoria, where he guided students in career planning, stream selection, and educational decision-making. Over the years, he has worked closely with students, parents, and educational institutions to help learners identify their strengths and make informed career choices.'}]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{_type: 'span', text: 'His unique combination of educational expertise and counselling experience enables him to provide practical, student-centric guidance. Through SIMAN COUNSELLING, he aims to empower students with clarity, confidence, and a structured roadmap for their future success.'}]
    }
  ],
  founderImage: null,
  services: [
    { 
      title: 'Career Counselling', 
      description: 'Personalized counselling sessions to help students understand their interests, strengths, personality, and career opportunities. Guidance is provided based on aptitude, aspirations, and future industry trends.' 
    },
    { 
      title: 'Psychometric Assessment', 
      description: 'Scientifically designed assessments to evaluate aptitude, personality, interests, and learning preferences. Detailed reports and counselling sessions help students make informed career decisions.' 
    },
    { 
      title: 'Stream Selection Guidance', 
      description: 'Expert guidance for choosing the right stream after Grade 10 based on aptitude, interests, and long-term career goals.' 
    },
    { 
      title: 'College Admission Guidance', 
      description: 'Support in selecting suitable colleges, understanding admission procedures, application guidance, and career planning after Grade 12.' 
    },
    { 
      title: 'Career Planning & Mentoring', 
      description: 'Long-term mentoring focused on career goal setting, skill development, academic planning, and professional growth.' 
    }
  ],
  successStories: ['Guided students in selecting suitable streams after Grade 10.', 'Helped students identify career paths aligned with their aptitude and interests.', 'Assisted families in making informed educational decisions.', 'Supported students in college selection and admission planning.', 'Mentored students in developing academic and career roadmaps.'],
  testimonials: [
    { 
      quote: 'I am grateful for the guidance I received during my Mentoria counselling session. The counsellor created a comfortable environment where I could openly discuss my questions and concerns. The advice was practical, personalized, and easy to understand. The session gave me greater clarity about my future plans and boosted my confidence in making important decisions.', 
      author: 'Mrs. SIMRAN PATIL (Working Professional)' 
    },
    { 
      quote: 'The psychometric assessment gave me clarity about my interests and future career options. I now feel more confident about my academic decisions.', 
      author: 'MR. DIKSHANT SONWANE (School Student)' 
    }
  ],
  packageAudiences: [{"_type":"packageAudience","label":"8-9 Students","leftPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment to measure your interests"},{"_type":"feature","included":true,"text":"1 career counselling session"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Invites to live webinars by industry experts"},{"_type":"feature","included":false,"text":"Customised reports after each session"},{"_type":"feature","included":false,"text":"Guidance on studying abroad"},{"_type":"feature","included":false,"text":"CV building during internships/graduation"}],"name":"Discover","price":"? 5,500","tier":"Standard"},"rightPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessments to measure interests and abilities"},{"_type":"feature","included":true,"text":"8 career counselling sessions"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Invites to live webinars by industry experts"},{"_type":"feature","included":true,"text":"Customised reports after each session"},{"_type":"feature","included":true,"text":"Guidance on studying abroad"},{"_type":"feature","included":true,"text":"CV building during internships/graduation"}],"name":"Discover plus+","price":"? 15,000","tier":"Premium"}},{"_type":"packageAudience","label":"10-12 Students","leftPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"1 career counselling session"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Pre-recorded webinars"},{"_type":"feature","included":false,"text":"Customised reports"},{"_type":"feature","included":false,"text":"Guidance on studying abroad"},{"_type":"feature","included":false,"text":"CV reviews during internships/graduation"}],"name":"Achieve Online","price":"? 5,999","tier":"Standard"},"rightPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"4 career counselling sessions"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Attend live webinars"},{"_type":"feature","included":true,"text":"Customised reports"},{"_type":"feature","included":true,"text":"Guidance on studying abroad"},{"_type":"feature","included":true,"text":"CV reviews during internships/graduation"}],"name":"Achieve Plus+","price":"? 10,599","tier":"Premium"}},{"_type":"packageAudience","label":"College Graduates","leftPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"1 career counselling session"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Pre-recorded webinars"},{"_type":"feature","included":false,"text":"Customised reports with certificate info"},{"_type":"feature","included":false,"text":"Guidance on studying abroad"},{"_type":"feature","included":false,"text":"CV reviews for job application"}],"name":"Ascend Online","price":"? 6,499","tier":"Standard"},"rightPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"3 career counselling sessions"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Attend live webinars"},{"_type":"feature","included":true,"text":"Customised reports with certificate info"},{"_type":"feature","included":true,"text":"Guidance on studying abroad"},{"_type":"feature","included":true,"text":"CV reviews for job application"}],"name":"Ascend Plus+","price":"? 10,599","tier":"Premium"}},{"_type":"packageAudience","label":"Working Professionals","leftPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"1 career counselling session"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Pre-recorded webinars"},{"_type":"feature","included":false,"text":"Customised reports"},{"_type":"feature","included":false,"text":"Guidance on studying abroad"},{"_type":"feature","included":false,"text":"CV reviews for job application"}],"name":"Ascend Online","price":"? 6,499","tier":"Standard"},"rightPlan":{"_type":"plan","buttonText":"BUY NOW","features":[{"_type":"feature","included":true,"text":"Psychometric assessment"},{"_type":"feature","included":true,"text":"3 career counselling sessions"},{"_type":"feature","included":true,"text":"Lifetime access to Knowledge Gateway"},{"_type":"feature","included":true,"text":"Attend live webinars"},{"_type":"feature","included":true,"text":"Customised reports"},{"_type":"feature","included":true,"text":"Guidance on studying abroad"},{"_type":"feature","included":true,"text":"CV reviews for job application"}],"name":"Ascend Plus+","price":"? 10,599","tier":"Premium"}}],
  customServices: [{"_type":"customService","buttonText":"BUY NOW","description":"Build your CV to stand out from the crowd and increase interview chances.","icon":"cv","price":"?2000","title":"CV Building"},{"_type":"customService","buttonText":"BUY NOW","description":"Revamp your LinkedIn profile with expert recommendations.","icon":"linkedin","price":"?2000","title":"LinkedIn Profile Building"},{"_type":"customService","buttonText":"BUY NOW","description":"Get both CV and LinkedIn profile built by HR experts.","icon":"cv","price":"?3500","title":"LinkedIn Profile + CV Building"},{"_type":"customService","buttonText":"BUY NOW","description":"Customized plan with company/job tracking to land your dream job.","icon":"strategy","price":"?4000","title":"Job Application Strategy"},{"_type":"customService","buttonText":"BUY NOW","description":"Detailed psychometric report for interests, personality and abilities.","icon":"report","price":"?2500","title":"Career Report"},{"_type":"customService","buttonText":"BUY NOW","description":"Detailed action plan and top career path shortlist from expert coaches.","icon":"report","price":"?4000","title":"Career Report + Career Counselling"},{"_type":"customService","buttonText":"BUY NOW","description":"Holistic information and direct access to experts for career queries.","icon":"gateway","price":"?250/month","title":"Knowledge Gateway + Career Helpline Access"},{"_type":"customService","buttonText":"BUY NOW","description":"Resolve your career queries through a focused one-on-one session.","icon":"session","price":"?3500 for 1 hour","title":"One-to-One Session with a Career Expert"},{"_type":"customService","buttonText":"BUY NOW","description":"Plan your masters with unbiased recommendations in India/abroad.","icon":"globe","price":"?3000","title":"Overseas Admission Planner"},{"_type":"customService","buttonText":"BUY NOW","description":"Ace upcoming interviews with guidance from top HR experts.","icon":"interview","price":"?2000","title":"Interview Prep Session"}],
  phone: '+91 8600392687 / 9767953293',
  email: 'apamanpatel12@gmail.com',
  instagram: 'https://www.instagram.com/876amanpatel?igsh=MTdraWVwb2ltZXV1aQ==',
  linkedin: 'https://www.linkedin.com/in/aman-patel-181a27311',
  coreValues: [
    'Student-Centric Approach',
    'Practical Guidance',
    'Clarity & Confidence',
    'Informed Decision Making',
    'Empowerment'
  ],
  whoShouldContact: [
    'Students from Grade 8 onwards',
    'College students & fresh graduates',
    'Working professionals seeking career shifts',
    'Parents looking for structured guidance for their children'
  ],
  sessionDetails: 'Mode: Online / Offline / Hybrid\nLanguage: English / Hindi\nBooking process: Send a WhatsApp message or call +91 8600392687'
}

export default function HomeClient() {
  const [sanityData, setSanityData] = useState<SiteContent | null>(null)
  const [packageMode, setPackageMode] = useState<'mentoria' | 'custom'>('mentoria')
  const [audienceIndex, setAudienceIndex] = useState(0)

  useEffect(() => {
    client.fetch<SiteContent>(siteContentQuery)
      .then((d) => { if (d) setSanityData(d) })
      .catch((err) => { console.error('Sanity fetch error, fallback active', err) })
  }, [])

  // Enforce local, correct text data while gracefully fallback/inheriting sanity dynamic structures like packages
  const data = useMemo(() => {
    return {
      ...localContent,
      ...sanityData,
      // Always enforce the correct local testimonials, services, bios, and null founderImage to force local fallback
      brandName: localContent.brandName,
      tagline: localContent.tagline,
      heroTitle: localContent.heroTitle,
      heroSubtitle: localContent.heroSubtitle,
      aboutBrand: localContent.aboutBrand,
      founderBio: localContent.founderBio,
      founderImage: null, // Forces local fallback image loading
      services: localContent.services,
      testimonials: localContent.testimonials,
      coreValues: localContent.coreValues,
      whoShouldContact: localContent.whoShouldContact,
      sessionDetails: localContent.sessionDetails,
      successStories: localContent.successStories,
      packageAudiences: localContent.packageAudiences,
      customServices: localContent.customServices,
    }
  }, [sanityData])

  const audiences = data.packageAudiences ?? []
  const safeAudienceIndex = Math.min(audienceIndex, Math.max(audiences.length - 1, 0))
  const activeAudience = audiences[safeAudienceIndex]

  const planCards = useMemo(() => {
    if (!activeAudience) return []
    return [activeAudience.leftPlan, activeAudience.rightPlan]
  }, [activeAudience])

  // Custom icons for core values
  const getValueIcon = (index: number) => {
    const icons = [Shield, Heart, Sparkles, Compass, FileSearch]
    const Icon = icons[index % icons.length]
    return <Icon className="h-6 w-6" style={{color: brand.green}} />
  }

  // Custom icons for "Who Should Contact"
  const getAudienceIcon = (index: number) => {
    const icons = [GraduationCap, HelpCircle, Users, Heart]
    const Icon = icons[index % icons.length]
    return <Icon className="h-6 w-6 mt-1 flex-shrink-0" style={{color: brand.blueDeep}} />
  }

  return (
    <div className="text-slate-900 font-sans" style={{background: brand.bgSoft}}>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur transition-all duration-300">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src={withBase('/logo.png')} alt="Logo" width={45} height={45} className="rounded-full shadow-sm text-xs" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-wide" style={{color: brand.navy}}>{data.brandName}</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70" style={{color: brand.blueDeep}}>Career & Personal Growth</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold" style={{color: brand.navy}}>
            <a href="#home" className="hover:text-emerald-700 transition">Home</a>
            <a href="#founder" className="hover:text-emerald-700 transition">About Founder</a>
            <a href="#services" className="hover:text-emerald-700 transition">Services</a>
            {audiences.length > 0 && <a href="#packages" className="hover:text-emerald-700 transition">Packages</a>}
            <a href="#testimonials" className="hover:text-emerald-700 transition">Testimonials</a>
            <a href="#contact" className="hover:text-emerald-700 transition">Contact Us</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="inline-block mb-4 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] rounded-full" style={{background: brand.accent, color: brand.green}}>
              {data.tagline}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl whitespace-pre-line" style={{color: brand.navy}}>
              {data.heroTitle}
            </h1>
            <p className="mb-4 text-lg font-medium text-slate-700">
              {data.heroSubtitle}
            </p>
            <p className="mb-8 text-slate-600 leading-relaxed text-sm">
              {data.aboutBrand}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="rounded-full px-8 py-3.5 font-bold text-white shadow-md hover:shadow-lg transition-all duration-200" style={{background: brand.blueDeep}}>
                Book a Session
              </a>
              <a href="#services" className="rounded-full border-2 px-8 py-3.5 font-bold transition-all duration-200 hover:bg-slate-100" style={{borderColor: brand.blueDeep, color: brand.blueDeep}}>
                Our Services
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-blue-50 rounded-3xl -rotate-3 scale-95 -z-10" />
            <Image 
              src={withBase('/founder.jpg')} 
              alt={data.founderName || 'Founder'} 
              width={450} 
              height={450} 
              className="rounded-3xl shadow-xl border-4 border-white object-cover aspect-square" 
            />
          </div>
        </section>

        {/* About Founder & Qualifications */}
        <section id="founder" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 rounded-3xl bg-white p-8 md:p-12 shadow-sm border border-slate-100 md:grid-cols-[300px_1fr]">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Image 
                src={withBase('/founder.jpg')} 
                alt={data.founderName || 'Founder'} 
                width={300} 
                height={350} 
                className="h-[350px] w-full rounded-2xl object-cover shadow-md" 
              />
              <div className="text-center md:text-left mt-2">
                <h3 className="text-xl font-bold" style={{color: brand.navy}}>{data.founderName}</h3>
                <p className="text-sm font-medium" style={{color: brand.green}}>Counselling Psychologist</p>
                <p className="text-xs text-slate-500 mt-1">MSW | MA in Psychology (Clinical)</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Meet {data.founderName || 'the Founder'}</span>
              <h2 className="mt-2 mb-6 text-3xl font-extrabold" style={{color: brand.navy}}>About Founder</h2>
              <div className="max-w-none text-slate-600 leading-relaxed font-normal">
                {data.founderBio ? <PortableText value={data.founderBio as any} components={portableTextComponents} /> : null}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        {data.coreValues && data.coreValues.length > 0 && (
          <section className="bg-slate-100/50 py-20 border-y border-slate-200/50">
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Our Practice Foundation</span>
                <h2 className="text-3xl font-extrabold mt-2" style={{color: brand.navy}}>Our Core Values</h2>
                <p className="text-slate-600 mt-3">We hold ourselves to the highest professional standards to offer a supportive path toward transformation.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
                {data.coreValues.map((value, idx) => (
                  <div key={value} className="bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100 flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-50">
                      {getValueIcon(idx)}
                    </div>
                    <span className="font-bold text-sm" style={{color: brand.navy}}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Tailored Support For You</span>
            <h2 className="text-3xl font-extrabold mt-2" style={{color: brand.navy}}>Services Offered</h2>
            <p className="text-slate-600 mt-3">Guidance and strategies to build clarity, emotional resilience, and self-awareness.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {data.services?.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-6" style={{background: brand.accent + '50'}}>
                    <Sparkles className="h-6 w-6" style={{color: brand.green}} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold" style={{color: brand.navy}}>{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-8">{service.description}</p>
                </div>
                <a href="https://wa.me/918600392687" target="_blank" rel="noopener noreferrer" className="block text-center rounded-xl py-3 font-semibold text-white transition hover:opacity-90 shadow-sm" style={{background: brand.blueDeep}}>
                  Book Now
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Who Should Contact Us Section */}
        {data.whoShouldContact && data.whoShouldContact.length > 0 && (
          <section className="bg-white py-20 border-t border-slate-100">
            <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Are you seeking guidance?</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-6" style={{color: brand.navy}}>Who Should Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  Counseling is for anyone seeking clarity, self-awareness, and constructive patterns. If you resonate with these challenges, reach out to book a session.
                </p>
                <div className="mt-8">
                  <a href="#contact" className="rounded-full px-8 py-3.5 font-bold text-white shadow-sm transition hover:opacity-90 inline-block" style={{background: brand.green}}>
                    Reach Out Today
                  </a>
                </div>
              </div>
              <div className="grid gap-6">
                {data.whoShouldContact.map((item, idx) => (
                  <div key={item} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    {getAudienceIcon(idx)}
                    <span className="font-semibold text-slate-700 leading-relaxed text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Packages Section */}
        {audiences.length > 0 && (
          <section id="packages" className="py-20" style={{background: '#EFF3F9'}}>
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Mentorship Tiers</span>
                <h2 className="text-3xl font-extrabold mt-2" style={{color: brand.navy}}>Packages & Plans</h2>
              </div>

              <div className="mb-10 max-w-md mx-auto grid grid-cols-2 gap-2 rounded-xl border bg-white p-1.5 shadow-sm">
                <button onClick={() => setPackageMode('mentoria')} className="rounded-lg py-2.5 text-sm font-semibold transition" style={packageMode === 'mentoria' ? {background: brand.blueDeep, color: 'white'} : {color: brand.blueDeep}}>Mentoria&apos;s Plans</button>
                <button onClick={() => setPackageMode('custom')} className="rounded-lg py-2.5 text-sm font-semibold transition" style={packageMode === 'custom' ? {background: brand.blueDeep, color: 'white'} : {color: brand.blueDeep}}>Customise Your Plan</button>
              </div>

              {packageMode === 'mentoria' ? (
                <>
                  <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {audiences.map((audience, idx) => (
                      <button key={audience.label} onClick={() => setAudienceIndex(idx)} className="rounded-full border px-6 py-2.5 font-bold transition text-sm shadow-sm" style={idx === safeAudienceIndex ? {background: brand.blueDeep, borderColor: brand.blueDeep, color: 'white'} : {borderColor: brand.blueDeep, color: brand.blueDeep, background: 'white'}}>
                        {audience.label}
                      </button>
                    ))}
                  </div>

                  {activeAudience ? (
                    <div className="relative mb-10 max-w-4xl mx-auto">
                      <div className="relative grid gap-8 md:grid-cols-2">
                        {planCards.map((plan, idx) => (
                          <article key={plan.name} className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{background: idx === 0 ? '#EBEBFA' : '#E6ECFE', color: idx === 0 ? '#5850EC' : '#1A56DB'}}>
                                {plan.tier}
                              </span>
                              <h4 className="mt-4 text-3xl font-extrabold" style={{color: brand.navy}}>{plan.name}</h4>
                              <p className="mt-2 text-4xl font-extrabold" style={{color: brand.green}}>{formatPrice(plan.price)}</p>
                              
                              <ul className="mt-8 space-y-4 border-t pt-6 border-slate-100">
                                {plan.features?.map((feature) => (
                                  <li key={feature.text} className="flex items-start gap-3 text-slate-600 text-sm">
                                    {feature.included ? (
                                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{color: brand.green}} />
                                    ) : (
                                      <X className="mt-0.5 h-4 w-4 text-slate-300 flex-shrink-0" />
                                    )}
                                    <span className={!feature.included ? 'line-through opacity-50' : ''}>{feature.text}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button className="mt-8 w-full rounded-xl py-3 font-bold text-white transition-all shadow-sm" style={{background: idx === 0 ? brand.blueDeep : brand.green}}>
                              {plan.buttonText}
                            </button>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                    {data.customServices?.map((item) => {
                      const Icon = iconMap[item.icon] || FileText
                      return (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                          <div>
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{background: brand.accent + '30'}}>
                              <Icon className="h-6 w-6" style={{color: brand.blueDeep}} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
                            <p className="font-bold mt-1 text-lg" style={{color: brand.green}}>{formatPrice(item.price)}</p>
                            <p className="mt-3 text-sm text-slate-600 leading-relaxed mb-6">{item.description}</p>
                          </div>
                          <button className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90" style={{background: brand.blueDeep}}>{item.buttonText}</button>
                        </article>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Success Stories Section */}
        {data.successStories && data.successStories.length > 0 && (
          <section className="bg-white py-20 border-y border-slate-200/50">
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Real Impact</span>
                <h2 className="text-3xl font-extrabold mt-2" style={{color: brand.navy}}>Success Stories</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.successStories.map((story, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-white shadow-sm">
                      <Sparkles className="h-5 w-5" style={{color: brand.green}} />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium pt-2">{story}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials (Client Voices) - Name and Location First */}
        <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{color: brand.green}}>Shared Experiences</span>
            <h2 className="text-3xl font-extrabold mt-2" style={{color: brand.navy}}>Client Voices</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {data.testimonials?.map((t) => (
              <blockquote key={t.author} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <footer className="mb-4 font-bold text-lg border-b pb-3 border-slate-100" style={{color: brand.blueDeep}}>
                    {t.author}
                  </footer>
                  <p className="text-slate-600 italic leading-relaxed text-sm">“{t.quote}”</p>
                </div>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Contact Us & Session Details */}
        <section id="contact" className="py-20 text-white relative overflow-hidden" style={{background: brand.navy}}>
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Let&apos;s talk</span>
              <h2 className="text-3xl font-extrabold mt-2">Contact Us</h2>
              <p className="mt-3 text-slate-300">Let&apos;s start a meaningful conversation.</p>
              
              <div className="mt-8 space-y-4 text-slate-200">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span>Phone / WhatsApp: {data.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-emerald-400" />
                  <span>Email: {data.email}</span>
                </div>
                <div className="pt-2 text-sm text-emerald-300">
                  <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                  {data.linkedin && (
                    <>
                      <span className="mx-2">|</span>
                      <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    </>
                  )}
                </div>
              </div>

              {/* Session Details Card */}
              {data.sessionDetails && (
                <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-4 text-emerald-400 flex items-center gap-2">
                    <Clock className="h-5 w-5" /> Session Details
                  </h4>
                  <div className="text-sm space-y-3 text-slate-200">
                    {data.sessionDetails.split('\n').map((line) => {
                      const [label, val] = line.split(':')
                      if (val) {
                        return (
                          <div key={line} className="grid grid-cols-[100px_1fr]">
                            <span className="font-bold opacity-80">{label.trim()}:</span>
                            <span>{val.trim()}</span>
                          </div>
                        )
                      }
                      return <p key={line}>{line}</p>
                    })}
                  </div>
                </div>
              )}
            </div>

            <form className="grid gap-4 rounded-2xl bg-white p-8 text-slate-900 shadow-xl">
              <h3 className="text-xl font-bold mb-2" style={{color: brand.navy}}>Send a Message</h3>
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition" placeholder="Your Name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition" placeholder="Phone Number" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition" placeholder="Email Address" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 transition" placeholder="How can we support you?" />
              <button type="button" className="rounded-xl px-5 py-3 font-bold text-white transition hover:opacity-90 shadow-md" style={{background: brand.green}}>
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer CTA & Brand Info */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-bold text-lg md:text-xl italic px-4 py-2 bg-emerald-50/50 inline-block rounded-xl border border-emerald-100" style={{color: brand.green}}>
            Book a session and begin your journey of self-understanding.
          </p>
          <p className="mt-8 text-sm text-slate-400">© {new Date().getFullYear()} {data.brandName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
