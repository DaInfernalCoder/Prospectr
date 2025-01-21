'use client'

import { Clock, DollarSign, Package2, Brain } from "lucide-react"

const OtherTools = () => {
  return (
    <section className="w-full bg-base-100 py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Finding leads shouldn&apos;t be this <span className="text-error">hard</span></h2>
          <p className="text-xl text-base-content/70">Other LinkedIn automation tools...</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Manual Posting */}
          <div className="card bg-base-200 hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-error" />
                <h3 className="text-xl font-semibold">Manual prospecting</h3>
              </div>
              <p className="text-base-content/70">
                Hours wasted searching LinkedIn profiles one by one, sending connection requests manually, and tracking responses in spreadsheets
              </p>
            </div>
          </div>

          {/* Unfairly expensive */}
          <div className="card bg-base-200 hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-error" />
                <h3 className="text-xl font-semibold">Enterprise pricing</h3>
              </div>
              <p className="text-base-content/70">
                Most LinkedIn automation tools charge hundreds per month - pricing out freelancers, startups, and small businesses
              </p>
            </div>
          </div>

          {/* Features you don't need */}
          <div className="card bg-base-200 hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <Package2 className="w-6 h-6 text-error" />
                <h3 className="text-xl font-semibold">Bloated features</h3>
              </div>
              <p className="text-base-content/70">
                Paying for complex CRM features, analytics dashboards, and team collaboration when you just need simple lead generation
              </p>
            </div>
          </div>

          {/* Complex tools */}
          <div className="card bg-base-200 hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-error" />
                <h3 className="text-xl font-semibold">Risk of automation</h3>
              </div>
              <p className="text-base-content/70">
                Most tools violate LinkedIn&apos;s terms of service, putting your account at risk with aggressive automation and scraping
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-base-content/70">
            Why choose between wasting time or risking your account? There&apos;s a better way...
          </p>
        </div>
      </div>
    </section>
  )
}

export default OtherTools 