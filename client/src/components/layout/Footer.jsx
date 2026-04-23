export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner footer-inner--compact">
        <div className="footer-brand">
          <p className="footer-tagline muted sm">Trade What You Know. Learn What You Need.</p>
          <p className="muted sm footer-copy">© {new Date().getFullYear()} SkillSwap</p>
        </div>
      </div>
    </footer>
  );
}
