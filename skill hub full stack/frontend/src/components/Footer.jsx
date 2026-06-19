function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-footer">
      <h3>SkillHub Learning Platform</h3>
      <p>© {year} SkillHub. All Rights Reserved. Empowering builders worldwide.</p>
    </footer>
  );
}

export default Footer;
