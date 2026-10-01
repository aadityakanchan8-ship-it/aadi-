import { useState } from 'react';
import { Camera, Eye, X, ZoomIn, Instagram, Facebook, ArrowUpRight, SlidersHorizontal, MapPin, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface PhotoItem {
  id: string;
  title: string;
  category: 'Sports' | 'Science & Lab' | 'Campus Life' | 'Documentary';
  image: string;
  camera: string;
  lens: string;
  settings: string;
  location: string;
  story: string;
}

export function PhotographySection() {
  const { personal } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);

  const photos: PhotoItem[] = [
    {
      id: 'basketball-court',
      title: 'Court Vision: The Playmaker’s Grip',
      category: 'Sports',
      image: '/src/assets/images/basketball_court_shoot_1790825822386.jpg',
      camera: 'Canon EOS DSLR',
      lens: '50mm f/1.8 Prime',
      settings: 'f/1.8 • 1/1600s • ISO 100',
      location: 'Championship Basketball Arena',
      story: 'First-person macro framing capturing the tactical leather grain of the ball against an azure court under radiant afternoon lighting.',
    },
    {
      id: 'chemistry-titration',
      title: 'Titration Protocol: Science in Motion',
      category: 'Science & Lab',
      image: '/src/assets/images/chemistry_lab_shoot_1790825836424.jpg',
      camera: 'Canon EOS DSLR',
      lens: '70-200mm f/2.8L IS USM',
      settings: 'f/2.8 • 1/320s • ISO 400',
      location: 'Senior Chemistry Research Lab',
      story: 'Candid environmental capture of student focus during delicate titration measurement, highlighting scientific inquiry and laboratory discipline.',
    },
    {
      id: 'library-dialogue',
      title: 'Journeys on the Globe: Library Inquiry',
      category: 'Campus Life',
      image: '/src/assets/images/library_reading_shoot_1790825848367.jpg',
      camera: 'Canon EOS DSLR',
      lens: '85mm f/1.8 Portrait',
      settings: 'f/2.2 • 1/200s • ISO 320',
      location: 'Heritage Reading Hall & Library',
      story: 'Natural light study framing two students engaged in world geography against modern geometric wooden diamond bookshelves.',
    },
    {
      id: 'outdoor-canopy',
      title: 'Under the Canopy: Storytelling in Nature',
      category: 'Campus Life',
      image: '/src/assets/images/outdoor_reading_shoot_1790825859528.jpg',
      camera: 'Canon EOS DSLR',
      lens: '70-200mm f/2.8L IS USM',
      settings: 'f/3.2 • 1/400s • ISO 160',
      location: 'Campus Botanical Gardens',
      story: 'Serene group portraiture of students reading peacefully under a shaded heritage tree, celebrating outdoor education and camaraderie.',
    },
  ];

  const categories = ['All', 'Sports', 'Science & Lab', 'Campus Life'];

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="photography" className="py-24 relative bg-[#07090e] border-t border-white/5 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-medium tracking-wide">
              <Camera className="w-3.5 h-3.5" />
              <span>ADIKANSHOTS • VISUAL PORTFOLIO</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Through the Lens: Photography &amp; Creative Direction
            </h2>

            <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
              Authentic on-location institutional, sports, and campus imagery shot by Aaditya Kanchan for educational prospectuses, high-impact campaigns, and media storytelling.
            </p>
          </div>

          {/* Social Links Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={personal.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-colors group cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>@adikanshots</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={personal.facebookPhotography}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-colors group cursor-pointer"
            >
              <Facebook className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Facebook Photography</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'bg-[#0f1422] text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative rounded-2xl bg-[#0c101a] border border-white/10 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-teal-950/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg bg-[#07090e]/85 backdrop-blur-md border border-white/10 text-teal-300 text-[11px] font-mono">
                    {photo.category}
                  </span>
                </div>

                {/* Quick Zoom Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#07090e]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-teal-300 group-hover:scale-110 transition-all">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Bottom Content within Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                </div>
              </div>

              {/* Technical EXIF Metadata Card Footer */}
              <div className="p-4 bg-[#0a0e17] border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 font-semibold">{photo.camera}</span>
                  <span>•</span>
                  <span>{photo.lens}</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {photo.settings}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Accreditation Footnote */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0c121e]/80 border border-teal-500/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Commercial &amp; Institutional Commissions</span>
            </h4>
            <p className="text-sm text-slate-400">
              Photographs featured across university admissions brochures, social campaigns, digital ads, and official student handbooks.
            </p>
          </div>

          <a
            href={personal.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-teal-500/20 whitespace-nowrap"
          >
            <Instagram className="w-4 h-4" />
            <span>Explore Full Archive @adikanshots</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a0e17] border border-teal-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#080b12]">
              <div>
                <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block">
                  {lightboxPhoto.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {lightboxPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setLightboxPhoto(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[300px] max-h-[60vh]">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>

            {/* Modal Technical Details & Story */}
            <div className="p-6 bg-[#080b12] border-t border-white/10 space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                {lightboxPhoto.story}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Camera</span>
                  <span className="text-teal-300 font-semibold">{lightboxPhoto.camera}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Lens</span>
                  <span className="text-white font-medium">{lightboxPhoto.lens}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Exposure</span>
                  <span className="text-white font-medium">{lightboxPhoto.settings}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Location</span>
                  <span className="text-white font-medium truncate block">{lightboxPhoto.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
