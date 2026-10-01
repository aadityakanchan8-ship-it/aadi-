import { useState } from 'react';
import { Phone, Copy, Check, MessageSquare, ShieldCheck, UserCheck, Building2, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA, ProfessionalReference } from '../data/portfolioData';

export function ReferencesSection() {
  const { references } = PORTFOLIO_DATA;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getAccentStyles = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400/50',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          avatarBg: 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/30',
        };
      case 'amber':
        return {
          border: 'border-amber-500/30 hover:border-amber-400/50',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          avatarBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400/50',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          avatarBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'indigo':
        return {
          border: 'border-indigo-500/30 hover:border-indigo-400/50',
          badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
          avatarBg: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
        };
      case 'rose':
        return {
          border: 'border-rose-500/30 hover:border-rose-400/50',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          avatarBg: 'bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30',
        };
      case 'teal':
      default:
        return {
          border: 'border-teal-500/30 hover:border-teal-400/50',
          badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
          avatarBg: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-500/30',
        };
    }
  };

  return (
    <section id="references" className="py-24 relative bg-[#06080e] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-medium tracking-wide">
              <UserCheck className="w-3.5 h-3.5" />
              <span>COLLEAGUE &amp; MANAGERIAL VOUCHES</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Professional References
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Direct managers and cross-functional partners across product management, creative design, brand strategy, and performance marketing available for verification and recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-teal-400/90 bg-[#0d131f] border border-teal-500/20 px-4 py-2 rounded-xl shrink-0">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>{references.length} Verified Organizational Endorsements</span>
          </div>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {references.map((ref: ProfessionalReference) => {
            const styles = getAccentStyles(ref.accentColor);
            const isCopied = copiedId === ref.id;
            const waNumber = ref.cleanPhone.replace(/[^0-9]/g, '');

            return (
              <div
                key={ref.id}
                className={`rounded-2xl bg-[#0c101a] border ${styles.border} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-black/50 relative group`}
              >
                <div>
                  {/* Top Row: Avatar & Status Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      {/* Initials Avatar */}
                      <div
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-display text-lg font-bold shadow-inner ${styles.avatarBg}`}
                      >
                        {ref.avatarInitials}
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                          {ref.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-teal-400 font-medium mt-0.5">
                          <Briefcase className="w-3.5 h-3.5 shrink-0" />
                          <span>{ref.role}</span>
                        </div>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Organization Tag */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-4 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg w-fit">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ref.organization}</span>
                  </div>

                  {/* Cross-functional Context Paragraph */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {ref.relationship}
                  </p>
                </div>

                {/* Contact Actions Footer */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  {/* Phone display & copy */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${ref.cleanPhone}`}
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-teal-300 transition-colors group/call"
                      title="Direct Phone Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-400 group-hover/call:scale-110 transition-transform" />
                      <span>{ref.phone}</span>
                    </a>

                    <button
                      onClick={() => handleCopyPhone(ref.id, ref.phone)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
                      title="Copy phone number"
                      aria-label={`Copy phone number for ${ref.name}`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Quick Connect */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
                      title="Chat via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${ref.cleanPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/25 text-teal-300 text-xs font-medium transition-colors cursor-pointer"
                      title="Call Reference"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Guarantee Footnote */}
        <div className="mt-12 text-center text-xs text-slate-400 font-mono">
          <span>Official professional contacts verified for reference checks, leadership validation, and background screening.</span>
        </div>
      </div>
    </section>
  );
}
