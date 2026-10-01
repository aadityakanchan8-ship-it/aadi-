import { useState, useRef, useEffect } from 'react';
import { Share2, Check, Copy, Linkedin, Twitter, MessageCircle, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function FloatingShareButton() {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const portfolioUrl =
    typeof window !== 'undefined'
      ? window.location.href.split('#')[0]
      : 'https://aadityakanchan.com';

  const shareTitle = `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.primaryTitle}`;
  const shareText = `Explore ${PORTFOLIO_DATA.personal.name}'s Digital Strategy & Performance Marketing Portfolio:`;

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(portfolioUrl);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      const textArea = document.createElement('textarea');
      textArea.value = portfolioUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        success = true;
      } catch {
        success = false;
      }
      textArea.remove();
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2800);
  };

  // Close social popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const encodedUrl = encodeURIComponent(portfolioUrl);
  const encodedText = encodeURIComponent(`${shareText} ${portfolioUrl}`);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-[#0a66c2]',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}`,
      color: 'hover:text-[#1da1f2]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      color: 'hover:text-[#25d366]',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodedText}`,
      color: 'hover:text-teal-400',
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end select-none"
    >
      {/* Expandable Social Sharing Tray */}
      {isMenuOpen && (
        <div className="mb-3 p-3 rounded-2xl bg-[#0c111c]/95 border border-teal-500/30 shadow-2xl backdrop-blur-md flex flex-col gap-2 w-56 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
            <span className="font-mono text-[11px] text-teal-400 uppercase tracking-wider font-semibold">
              Share Profile
            </span>
            <button
              onClick={handleCopy}
              className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1 font-mono transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-teal-400" />
                  <span className="text-teal-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-teal-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5 py-1">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${item.name}`}
                className={`flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 ${item.color} transition-all duration-150 cursor-pointer`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[9px] mt-1 font-mono truncate max-w-full">
                  {item.name.split(' ')[0]}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-1.5 px-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-teal-400" />
                <span>Copy Portfolio Link</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Persistent Floating Button */}
      <div className="flex items-center gap-1.5 bg-[#0c111c]/95 border border-teal-500/40 hover:border-teal-400 p-1.5 rounded-full shadow-2xl shadow-black/80 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-teal-950/50">
        {/* Quick Direct 1-Click Clipboard Trigger */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 pl-3.5 pr-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
            copied
              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/30'
              : 'text-slate-100 hover:text-white bg-slate-900/60 hover:bg-slate-800/80'
          }`}
          aria-label="Share portfolio and copy URL to clipboard"
          title="Click to copy portfolio URL"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span className="whitespace-nowrap">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-teal-400" />
              <span className="whitespace-nowrap">Share</span>
            </>
          )}
        </button>

        {/* Toggle Share Menu Options */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-teal-300 ${
            isMenuOpen ? 'bg-teal-500/20 text-teal-400' : 'hover:bg-white/5'
          }`}
          title="Open more share options (LinkedIn, X, WhatsApp)"
          aria-label="Toggle share options"
          aria-expanded={isMenuOpen}
        >
          <span className="text-xs font-mono font-bold leading-none">⋯</span>
        </button>
      </div>

      {/* Ephemeral Feedback Toast */}
      {copied && (
        <div className="mt-2 text-[11px] font-mono text-teal-300 bg-[#060a12]/95 border border-teal-500/40 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-1 duration-150">
          ✓ Copied portfolio link to clipboard!
        </div>
      )}
    </div>
  );
}
