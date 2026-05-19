import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';

// ── Scroll animation helper ──────────────────────────────────────────────────
const useScrollAnimation = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);
  return { ref, isVisible };
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
};

// ── Pillar badge colours ──────────────────────────────────────────────────────
const pillarColors: Record<number, string> = {
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-red-100 text-red-700',
  3: 'bg-green-100 text-green-700',
  4: 'bg-purple-100 text-purple-700',
  5: 'bg-amber-100 text-amber-700',
};

const PillarBadge: React.FC<{ pillar: number; name: string }> = ({ pillar, name }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${pillarColors[pillar] ?? 'bg-gray-100 text-gray-600'}`}>
    {name}
  </span>
);

// ── Filter categories ─────────────────────────────────────────────────────────
type FilterKey = 'all' | 1 | 2 | 3 | 4 | 5;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Allt' },
  { key: 1, label: 'Tími og sparnaður' },
  { key: 2, label: 'Mistök fyrirtækja' },
  { key: 3, label: 'AI í rekstri' },
  { key: 4, label: 'Case studies' },
  { key: 5, label: 'Tækifæri' },
];

// ── Inline CTA ────────────────────────────────────────────────────────────────
const InlineCTA: React.FC = () => (
  <div className="bg-brand-primary rounded-2xl px-8 py-10 text-center my-10">
    <h3 className="text-xl font-serif font-bold text-white mb-2">
      Vilt þú vita hvar reksturinn þinn tapar tíma?
    </h3>
    <p className="text-blue-200 text-sm mb-6">
      Fáðu ókeypis AI greiningu á rekstrinum þínum — tekur 5 mínútur.
    </p>
    <Link
      to="/greining"
      className="inline-flex items-center gap-2 bg-white text-brand-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
    >
      Fá fría greiningu <ArrowRight size={16} />
    </Link>
  </div>
);

// ── Post card ─────────────────────────────────────────────────────────────────
const PostCard: React.FC<{ post: BlogPost; delay?: number }> = ({ post, delay = 0 }) => (
  <FadeIn delay={delay}>
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4">
            <PillarBadge pillar={post.pillar} name={post.pillarName} />
            <span className="flex items-center gap-1 text-xs text-brand-gray">
              <Clock size={12} /> {post.readTime} mín
            </span>
          </div>
          <h3 className="font-serif font-bold text-brand-dark text-base leading-snug mb-3 group-hover:text-brand-primary transition-colors line-clamp-3">
            {post.title}
          </h3>
          <p className="text-sm text-brand-gray leading-relaxed flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-1 text-brand-primary text-sm font-medium">
            Lesa <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [email, setEmail] = useState('');

  const featured = blogPosts.find(p => p.featured);
  const nonFeatured = blogPosts.filter(p => !p.featured);

  const filtered = activeFilter === 'all'
    ? nonFeatured
    : nonFeatured.filter(p => p.pillar === activeFilter);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert(`Takk! ${email} hefur verið skráð á póstlistann.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">

      {/* ── Nav ── */}
      <nav className="w-full bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-serif font-bold text-brand-primary tracking-tight">
              Liora<span className="text-brand-accent">Tech</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-sm font-medium text-brand-primary">Blogg</Link>
            <Link
              to="/greining"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-all shadow-md"
            >
              Fá fría greiningu
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 1. Hero ── */}
      <section className="bg-brand-light pt-20 pb-16">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
            Innsýn og ráð fyrir íslensk fyrirtæki
          </h1>
          <p className="text-brand-gray text-lg leading-relaxed">
            Við skrifum um AI, sjálfvirkni og hvernig fyrirtæki geta gert meira með minna.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-5xl py-16">

        {/* ── 2. Featured post ── */}
        {featured && (
          <FadeIn className="mb-14">
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                {featured.image && (
                  <img src={featured.image} alt={featured.title} className="w-full h-56 md:h-72 object-cover" />
                )}
                <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                    Valið innihald
                  </span>
                  <PillarBadge pillar={featured.pillar} name={featured.pillarName} />
                  <span className="flex items-center gap-1 text-xs text-brand-gray">
                    <Clock size={12} /> {featured.readTime} mín
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-4 leading-snug group-hover:text-brand-primary transition-colors max-w-2xl">
                  {featured.title}
                </h2>
                <p className="text-brand-gray leading-relaxed mb-6 max-w-xl">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-brand-dark transition-all">
                  Lesa greinina <ArrowRight size={16} />
                </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        )}

        {/* ── 3. Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={String(f.key)}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f.key
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white border border-gray-200 text-brand-gray hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── 4. Grid + 5. Inline CTA ── */}
        {filtered.length === 0 ? (
          <p className="text-center text-brand-gray py-12">Engar greinar fundust í þessum flokk.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(0, 3).map((post, i) => (
                <PostCard key={post.id} post={post} delay={i * 80} />
              ))}
            </div>

            {/* Inline CTA after 3rd post */}
            <InlineCTA />

            {filtered.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filtered.slice(3).map((post, i) => (
                  <PostCard key={post.id} post={post} delay={i * 80} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── 6. Newsletter ── */}
        <FadeIn className="mt-20">
          <div className="bg-brand-light rounded-2xl px-8 py-10 text-center border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">
              Fáðu nýjustu greinarnar beint í pósthólfið
            </h3>
            <p className="text-brand-gray text-sm mb-6">2x í viku. Engin ruslpóstur.</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="netfangið þitt"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-md"
              >
                Skrá mig
              </button>
            </form>
          </div>
        </FadeIn>
      </div>

      {/* ── 7. Bottom CTA ── */}
      <section className="bg-brand-dark py-20">
        <FadeIn className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Tilbúinn að byrja?
          </h2>
          <p className="text-blue-200 leading-relaxed mb-8">
            Við sýnum þér hvar reksturinn tapar tíma — og hvað á að gera næst.
          </p>
          <Link
            to="/greining"
            className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-lg font-bold text-base hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            Fá fría AI greiningu <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-dark border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} LioraTech · <a href="mailto:ingi@lioratech.is" className="hover:text-white transition-colors">ingi@lioratech.is</a>
        </div>
      </footer>
    </div>
  );
}
