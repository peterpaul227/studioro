import Link from "next/link";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper/90">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 pt-24 md:pt-32 pb-12">
        {/* Giant wordmark */}
        <div className="flex items-end justify-between gap-8 border-b border-white/10 pb-12 md:pb-16">
          <div className="font-display italic text-[18vw] leading-[0.85] tracking-[-0.04em] md:text-[14vw]">
            studioro
            <span className="text-red">.</span>
          </div>
          <div className="hidden md:block text-xs tracking-[0.2em] uppercase text-white/40 whitespace-nowrap">
            Est. 2009 · Delft
          </div>
        </div>

        {/* Three columns */}
        <div className="grid gap-12 md:grid-cols-4 py-14">
          <div className="md:col-span-2 max-w-md">
            <p className="text-sm uppercase tracking-[0.2em] text-red mb-4">
              Reflecterende videokunst
            </p>
            <p className="font-display italic text-2xl md:text-3xl leading-[1.2]">
              &ldquo;Voorheen aan de kleurrijkste gracht van Delft — nu met de
              camera de wijde wereld in.&rdquo;
            </p>
            <p className="mt-6 text-sm text-white/60">
              — Robert van Nimwegen
            </p>
          </div>

          <div className="text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Menu
            </div>
            <ul className="space-y-2">
              {[
                ["/work", "Werk"],
                ["/about", "Over"],
                ["/services", "Diensten"],
                ["/prints", "Prints"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-paper transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Contact
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@studioro.com"
                  className="hover:text-paper transition-colors"
                >
                  info@studioro.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+31619786803"
                  className="hover:text-paper transition-colors"
                >
                  +31 6 19 78 68 03
                </a>
              </li>
              <li className="text-white/60">Delft, Nederland</li>
            </ul>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-6 mb-3">
              Sociaal
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://vimeo.com/studioro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors"
                >
                  Vimeo ↗
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/studioro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/robertvannimwegen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between pt-8 border-t border-white/10 text-xs text-white/50">
          <div>
            © {YEAR} Studioro · Robert van Nimwegen · KvK 27260276
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-paper transition-colors">
              Privacy
            </Link>
            <Link
              href="/algemene-voorwaarden"
              className="hover:text-paper transition-colors"
            >
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
