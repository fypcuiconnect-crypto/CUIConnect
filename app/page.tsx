"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Users, Bolt, FileText, Moon, Sun } from 'lucide-react'
import { useTheme } from './providers'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function HomePage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-zinc-950 dark:text-white">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative overflow-hidden bg-white dark:bg-zinc-950"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_45%)] opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <button
            type="button"
            onClick={toggleTheme}
            className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-sky-400 hover:bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-white dark:hover:bg-zinc-800/90 sm:right-10"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <motion.div variants={fadeUp} className="max-w-3xl space-y-8">
            <span className="inline-flex items-center rounded-full bg-sky-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Conversational AI Platform</span>
            <div className="space-y-6">
              <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">CUI Connect makes your documents speak back.</h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">Experience a chatbot built for document-driven teams, with intelligent search, secure collaboration, and AI-powered insights in one polished interface.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/chat" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">Start Chatting<ArrowRight className="ml-2 h-4 w-4" /></Link>
              <a href="#features" className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500">Explore Features</a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200 bg-slate-100 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Accuracy</p>
                <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">99%</p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-slate-100 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Response Time</p>
                <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white"><span className="text-sky-400"><Bolt className="inline h-5 w-5" /></span> 1.2s</p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-slate-100 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Built for Teams</p>
                <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Collaborative</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative rounded-[2rem] border border-sky-500/10 bg-slate-50/80 p-6 shadow-2xl shadow-sky-500/10 ring-1 ring-sky-500/10 dark:bg-slate-950/80">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-3xl bg-sky-500/10 p-2 text-sky-300">
                  <Users className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Live intelligence</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">AI-powered chatbot</p>
                </div>
              </div>
              <div className="mt-8 rounded-[1.75rem] border border-zinc-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-5 flex items-center gap-3 text-zinc-500 dark:text-zinc-300">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold">Session active</span>
                </div>
                <div className="relative overflow-hidden rounded-3xl bg-white p-5 dark:bg-zinc-900">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-500/10 blur-2xl" />
                  <Image src="/images/hero-ai.svg" alt="AI illustration" width={520} height={360} className="relative mx-auto max-h-[280px] w-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="features" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={staggerContainer} className="border-t border-zinc-200 bg-slate-50 py-20 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Features</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Powerful capabilities for modern AI workflows.</h2>
            <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-400">Explore the ways CUI Connect helps teams find answers faster, keep data secure, and turn documents into actionable knowledge.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Natural language chat',
                description: 'Ask questions in plain English and get instant answers from your documents.',
                icon: Sparkles,
              },
              {
                title: 'Document intelligence',
                description: 'Analyze text, CSV, and Parquet data with contextual embeddings and vector search.',
                icon: FileText,
              },
              {
                title: 'Secure team collaboration',
                description: 'Authenticated access, role-based workflows, and secure data handling built in.',
                icon: ShieldCheck,
              },
            ].map((feature, index) => (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">About</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">CUI Connect helps teams transform documents into action.</h2>
              <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">With fast ingestion, embedded search, and conversational access, your data is no longer trapped in files. CUI Connect helps your team ask better questions, share insights, and drive outcomes with AI.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Backend</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Rubab architected the ingestion API, secure routes, and the backend engine powering the chatbot.</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Frontend</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Sughra designed the user experience, polished the interface, and ensured every interaction feels smooth.</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="grid gap-6">
              <article className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-5 rounded-3xl border border-sky-500/10 bg-sky-500/10 p-5 text-sky-200">
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-300">AI & Dataset</p>
                  <p className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Shiza</p>
                </div>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">Shiza leads dataset preparation, embedding quality, and AI reasoning so your chatbot delivers reliable, contextual answers.</p>
              </article>
              <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Why choose CUI Connect?</p>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-zinc-400">
                  <li>• AI-first document search with fast, accurate answers.</li>
                  <li>• Clean team dashboard designed for collaboration.</li>
                  <li>• Scalable ingestion for JSON, CSV, Parquet, and text sources.</li>
                </ul>
              </article>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="border-t border-zinc-200 bg-slate-50 py-20 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Meet the Team</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Built by a strong, specialized team.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Rubab',
                title: 'Backend Developer',
                bio: 'Designed the secure API, authentication flow, and ingestion pipeline for dependable backend operations.',
                image: '/images/rubab.svg',
              },
              {
                name: 'Sughra',
                title: 'Frontend Developer',
                bio: 'Created the responsive interface, polished animations, and ensured a premium user experience.',
                image: '/images/sughra.svg',
              },
              {
                name: 'Shiza',
                title: 'Dataset & AI Developer',
                bio: 'Managed dataset engineering, embeddings, and the AI logic that powers contextual answers.',
                image: '/images/shiza.svg',
              },
            ].map((member) => (
              <motion.article
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-xl transition-transform dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <Image src={member.image} alt={member.name} width={220} height={220} className="mx-auto" />
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{member.title}</p>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{member.name}</h3>
                  <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="border-t border-zinc-200 bg-slate-50 py-16 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Get started</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Ready to talk with your AI assistant?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Open the chat and begin exploring your data with conversational intelligence, smart search, and secure collaboration.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/chat" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">Open Chat</Link>
            <a href="#team" className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500">Meet the Team</a>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
