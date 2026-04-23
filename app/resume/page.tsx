import { SymbolIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { PageContainer, SurfaceCard, Tag } from "@/components/ui";
import { resumeData, siteMeta } from "@/data/site";

export default function ResumePage() {
  return (
    <SiteShell>
      <PageContainer className="max-w-[900px] space-y-16">
        <header className="space-y-4 border-b border-surface-variant pb-8">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-on-surface md:text-5xl">{siteMeta.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-outline md:text-base">
            <span className="flex items-center gap-2">
              <SymbolIcon name="mail" className="h-4 w-4 text-primary" />
              {resumeData.contact.email}
            </span>
            <span className="flex items-center gap-2">
              <SymbolIcon name="phone" className="h-4 w-4 text-primary" />
              {resumeData.contact.phone}
            </span>
            <span className="flex items-center gap-2">
              <SymbolIcon name="location_on" className="h-4 w-4 text-primary" />
              {resumeData.contact.location}
            </span>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
            <SymbolIcon name="psychology" className="h-5 w-5" />
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {resumeData.competencies.map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-base leading-7 text-on-surface-variant">
                <SymbolIcon name={item.icon} className="mt-1 h-5 w-5 flex-none text-primary" />
                <div>
                  <strong className="block text-on-surface">{item.label}</strong>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
            <SymbolIcon name="work" className="h-5 w-5" />
            Professional Experience
          </h2>
          <div className="space-y-10">
            {resumeData.experience.map((item, index) => (
              <div
                key={item.role}
                className={index === resumeData.experience.length - 1 ? "relative pl-6" : "relative border-l-2 border-surface-variant pl-6"}
              >
                <div
                  className={
                    item.current
                      ? "absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(173,198,255,0.6)]"
                      : "absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-surface-variant"
                  }
                />
                <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-on-surface">{item.role}</h3>
                  <span className="text-sm text-outline">{item.companyLine}</span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-base leading-7 text-on-surface-variant">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
            <SymbolIcon name="school" className="h-5 w-5" />
            Education
          </h2>
          <div className="space-y-6">
            {resumeData.education.map((item) => (
              <SurfaceCard key={item.school} className="bg-surface-container-low p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-on-surface">{item.school}</h3>
                    <p className="mt-1 text-base text-primary">{item.credential}</p>
                  </div>
                  <span className="mt-2 text-sm text-outline md:mt-0">{item.details}</span>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
            <SymbolIcon name="favorite" className="h-5 w-5" />
            Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.interests.map((item) => (
              <Tag key={item} className="bg-surface-container-low px-4 py-2 text-sm">
                {item}
              </Tag>
            ))}
          </div>
        </section>
      </PageContainer>
    </SiteShell>
  );
}
