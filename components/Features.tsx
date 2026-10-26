
import Image from "next/image";
import { ReactNode } from "react";
import AppIcon from "@/components/AppIcon"
type Feature = {
  src: string;
  title: string;
  description: string;
  tone: string;
};

type FeaturesProps = {
  data: Feature[];
  columns?: number;
  heading: string;
  description?: string;
  children?: ReactNode
};

export default function Features({
  data,
  columns = 4,
  heading,
  description,
  children
}: FeaturesProps) {
  const itemCount = data.length;

  const maxColumns = Math.min(
    Math.max(1, Math.floor(columns)),
    itemCount
  );

  // Find all column counts that divide the item count evenly.
  const validColumns = Array.from(
    { length: maxColumns },
    (_, i) => maxColumns - i
  ).filter((count) => itemCount % count === 0);

  const desktopColumns = validColumns[0] ?? 1;
  const tabletColumns =
    validColumns.find((count) => count <= 2) ?? 1;
  const mobileColumns = 1;

  return (
    <section className="features-section" id="features">
      <div className="section-heading">
        <h2>{heading}</h2>
        <p>
          {description}
        </p>
      </div>

      <div
        className="feature-grid"
        style={
          {
            "--desktop-columns": desktopColumns,
            "--tablet-columns": tabletColumns,
            "--mobile-columns": mobileColumns,
          } as React.CSSProperties
        }
      >
        {data.map((feature) => (
          <div
            className={`feature-card ${feature.tone}`}
            key={feature.title}
          >
            <AppIcon name={feature.src} size={64} />
            <span className="feature-title">
              {feature.title}
            </span>
            <span className="feature-description">
              {feature.description}
            </span>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
}
