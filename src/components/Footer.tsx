export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
            The Signature Club.
          </h2>
          <p className="text-xs tracking-[0.3em] font-thin text-white/50 uppercase">
            NotForEveryone&trade;
          </p>
        </div>

        <div className="flex flex-col space-y-6 md:text-right">
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm font-light tracking-widest uppercase">
            <li><a href="#" className="hover:text-accent transition-colors clickable">Instagram</a></li>
            <li><a href="#" className="hover:text-accent transition-colors clickable">TikTok</a></li>
            <li><a href="#" className="hover:text-accent transition-colors clickable">Email</a></li>
          </ul>
          
          <div className="flex flex-col space-y-2 text-xs font-thin text-white/30 tracking-wider">
            <p>Made in Morocco.</p>
            <p>&copy; {new Date().getFullYear()} The Signature Club. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
