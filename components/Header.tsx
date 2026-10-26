"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AppIcon from "@/components/AppIcon";

const navItems = [
  { label: "راه‌های ارتباطی", href: "/contact" },
  { label: "درباره ما", href: "/about" },
  { label: "حریم خصوصی", href: "/privacy" },
  { label: "سوالات متداول", href: "/FAQ" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
        <div className="site-header">
                <div className="brand">
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={menuOpen}
          aria-controls="header-navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <Link className="brand" href="/" aria-label="صفحه اصلی رستا">
          <Image className="logo" src="/images/logo.png" alt="rasta" width={100} height={100} />

          <span className="brand-text">
            <strong>رستا</strong>
            <small>روان سالم و تاب‌آور</small>
          </span>
        </Link>
      </div>

      <div className="header-actions">
        <Link className="button button-outline small-button" href="/login">
          <AppIcon name="material-symbols:person" size={24}/>
          <span>ورود</span>
        </Link>

        <Link className="button button-primary small-button" href="/signup">
          <AppIcon name="material-symbols:person-add" size={24}/>
          <span>ثبت‌نام</span>
        </Link>
      </div>
      {menuOpen && (
        <>
          <button
            type="button"
            className="menu-backdrop"
            aria-label="بستن منو"
            onClick={() => setMenuOpen(false)}
          />

          <nav
            id="header-navigation"
            className="header-dropdown"
            aria-label="ناوبری اصلی"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </>
      )}
        </div>

    </header>
  );
}
