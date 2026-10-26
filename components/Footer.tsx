import AppIcon from "@/components/AppIcon";

const links = [
  { icon: "material-symbols:perm-phone-msg-rounded", label: "تماس با ما" },
  { icon: "material-symbols:info-rounded", label: "درباره رستا" },
  { icon: "material-symbols:encrypted-rounded", label: "حریم خصوصی" },
  { icon: "material-symbols:help", label: "سؤالات متداول" },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      {links.map((link) => (
        <a href="#" className="footer-item" key={link.label}>
          <AppIcon name={link.icon} size={32}/>
          <strong>{link.label}</strong>
        </a>
      ))}
    </footer>
  );
}
