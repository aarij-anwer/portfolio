import type { ResumeTextSegment } from '@/lib/resume';

export default function RichText({ text }: { text: ResumeTextSegment[] }) {
  return (
    <>
      {text.map((segment, index) => {
        const key = `${segment.text}-${index}`;

        if (segment.bold && segment.italic) {
          return (
            <strong key={key} className="font-semibold text-on-surface">
              <em>{segment.text}</em>
            </strong>
          );
        }

        if (segment.bold) {
          return (
            <strong key={key} className="font-semibold text-on-surface">
              {segment.text}
            </strong>
          );
        }

        if (segment.italic) {
          return <em key={key}>{segment.text}</em>;
        }

        return <span key={key}>{segment.text}</span>;
      })}
    </>
  );
}
