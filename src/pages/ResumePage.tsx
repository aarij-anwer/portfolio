import { SymbolIcon } from '@/components/icons';
import RichText from '@/components/RichText';
import SiteShell from '@/components/SiteShell';
import { PageContainer, SurfaceCard } from '@/components/ui';
import { siteMeta } from '@/data/site';
import { parsedResume, resumePdfAvailable, summaryParagraphs, truncateText } from '@/lib/resume';
import Seo, { breadcrumbJsonLd, profilePageJsonLd } from '@/lib/seo';

// Turn "Aug 2025" into "2025-08" for <time dateTime>. Returns undefined for
// values like "Present" that have no machine-readable form.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function isoMonth(value: string) {
  const match = /^([A-Za-z]{3})\w*\s+(\d{4})$/.exec(value.trim());
  if (!match) return undefined;
  const month = MONTHS.indexOf(match[1]);
  return month === -1 ? match[2] : `${match[2]}-${String(month + 1).padStart(2, '0')}`;
}

function DateText({ value }: { value: string }) {
  const iso = isoMonth(value);
  return iso ? <time dateTime={iso}>{value}</time> : <>{value}</>;
}

export default function ResumePage() {
  const resumeData = parsedResume;
  const title = `Resume | ${resumeData.name}, ${resumeData.summary.headline}`;
  const description = truncateText(
    `Resume of ${resumeData.name}, ${resumeData.summary.headline} (${resumeData.location}): ${summaryParagraphs[0]}`,
  );
  // Phone number stays in the PDF only; the web page lists public channels.
  const contacts = resumeData.contact.filter((item) => item.kind !== 'phone');

  return (
    <SiteShell>
      <Seo
        title={title}
        description={description}
        path="/resume"
        type="profile"
        jsonLd={[
          profilePageJsonLd('/resume', title),
          breadcrumbJsonLd([
            { name: siteMeta.name, path: '/' },
            { name: 'Resume', path: '/resume' },
          ]),
        ]}
      />
      <PageContainer className="max-w-[900px] space-y-16">
        <header className="space-y-6 border-b border-surface-variant pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-[-0.04em] text-on-surface md:text-5xl">
                {resumeData.name}
              </h1>
              <p className="text-lg font-medium text-primary">
                {resumeData.summary.headline}
              </p>
            </div>
            {resumePdfAvailable ? (
              <a
                className="inline-flex w-fit items-center justify-center rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-fixed"
                href={`${import.meta.env.BASE_URL}Muhammad_Anwer_Resume.pdf`}
                download
              >
                Download PDF
              </a>
            ) : null}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
            {contacts.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <SymbolIcon name={item.icon} className="h-4 w-4 flex-none text-primary" />
                {item.href ? (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-on-surface"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer me' }
                      : {})}
                  >
                    {item.kind === 'linkedin'
                      ? `LinkedIn: ${item.label}`
                      : item.kind === 'github'
                        ? `GitHub: ${item.label}`
                        : item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
            <SymbolIcon name="core_competencies" className="h-5 w-5" />
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {resumeData.competencies.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 text-base leading-7 text-on-surface-variant"
              >
                <SymbolIcon
                  name={item.icon}
                  className="mt-1 h-5 w-5 flex-none text-primary"
                />
                <div>
                  <strong className="block text-on-surface">{item.label}</strong>
                  <RichText text={item.value} />
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
              <article
                key={item.role}
                className={
                  index === resumeData.experience.length - 1
                    ? 'relative pl-6'
                    : 'relative border-l-2 border-surface-variant pl-6'
                }
              >
                <div
                  className={
                    item.current
                      ? 'absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgb(var(--color-primary)_/_0.45)]'
                      : 'absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-surface-variant'
                  }
                />
                <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-on-surface">
                    {item.role}
                  </h3>
                  <p className="text-sm text-outline">
                    {item.company} | {item.location} |{' '}
                    <DateText value={item.startDate} /> -{' '}
                    <DateText value={item.endDate} />
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-base leading-7 text-on-surface-variant">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={`${item.role}-${bulletIndex}`}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              </article>
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
              <SurfaceCard
                key={item.school}
                className="bg-surface-container-low p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-on-surface">
                      {item.credential}
                    </h3>
                    <p className="mt-1 text-base text-primary">
                      {item.school}
                    </p>
                  </div>
                  <span className="mt-2 text-sm text-outline md:mt-0">
                    {item.location}
                  </span>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {resumeData.interests.length ? (
          <section className="space-y-6">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-primary">
              <SymbolIcon name="favorite" className="h-5 w-5" />
              Interests &amp; Affiliations
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-on-surface-variant">
              {resumeData.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </PageContainer>
    </SiteShell>
  );
}
