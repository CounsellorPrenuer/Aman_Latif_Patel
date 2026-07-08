const fs = require('fs');
let content = fs.readFileSync('components/home-client.tsx', 'utf8');
const pkgs = JSON.parse(fs.readFileSync('packages.json', 'utf8')).result;

// inject localContent data
let injected = content.replace('packageAudiences: [],', 'packageAudiences: ' + JSON.stringify(pkgs.packageAudiences) + ',').replace('customServices: [],', 'customServices: ' + JSON.stringify(pkgs.customServices) + ',');

// add successStories to localContent
injected = injected.replace('testimonials: [', 'successStories: [\'Guided students in selecting suitable streams after Grade 10.\', \'Helped students identify career paths aligned with their aptitude and interests.\', \'Assisted families in making informed educational decisions.\', \'Supported students in college selection and admission planning.\', \'Mentored students in developing academic and career roadmaps.\'],\n  testimonials: [');

// inject the Success Stories UI before Testimonials section
const successStoriesJSX = `
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
`;
injected = injected.replace('{/* Testimonials Section */}', successStoriesJSX + '\n        {/* Testimonials Section */}');

fs.writeFileSync('components/home-client.tsx', injected);
