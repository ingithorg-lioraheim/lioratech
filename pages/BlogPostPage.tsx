import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

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

// ── Icelandic date format ─────────────────────────────────────────────────────
const MONTHS_IS = [
  'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní',
  'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember',
];

const formatDateIs = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getUTCDate()}. ${MONTHS_IS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

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

// ── 404 ───────────────────────────────────────────────────────────────────────
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-white font-sans text-brand-dark flex flex-col items-center justify-center px-6">
    <h1 className="font-serif text-4xl font-bold text-brand-dark mb-4">Grein fannst ekki</h1>
    <p className="text-brand-gray mb-8">Við fundum ekki greinina sem þú leitaðir að.</p>
    <Link
      to="/blog"
      className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
    >
      <ArrowLeft size={16} /> Til baka í blogg
    </Link>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <NotFound />;

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

      <article className="container mx-auto px-6 max-w-3xl py-16">

        {/* ── Back link ── */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-brand-primary text-sm font-medium hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Til baka í blogg
        </Link>

        {/* ── Pillar badge + read time ── */}
        <div className="flex items-center gap-3 mb-6">
          <PillarBadge pillar={post.pillar} name={post.pillarName} />
          <span className="flex items-center gap-1 text-xs text-brand-gray">
            <Clock size={12} /> {post.readTime} mín lestur
          </span>
        </div>

        {/* ── Headline ── */}
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8" />
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
          {post.title}
        </h1>

        {/* ── Published date ── */}
        <p className="text-sm text-brand-gray mb-10">
          {formatDateIs(post.publishedAt)}
        </p>

        {/* ── Body ── */}
        <div
          className="prose prose-slate max-w-none text-brand-dark leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* ── Divider ── */}
        <hr className="my-12 border-gray-200" />

        {/* ── Inline CTA ── */}
        <InlineCTA />

      </article>

      {/* ── Footer ── */}
      <footer className="bg-brand-dark border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} LioraTech · <a href="mailto:ingi@lioratech.is" className="hover:text-white transition-colors">ingi@lioratech.is</a>
        </div>
      </footer>
    </div>
  );
}
