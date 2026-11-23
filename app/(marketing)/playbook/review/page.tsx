import Link from "next/link";
import type { Metadata } from "next";
import { playbook } from "@/content/playbook";
import { Container } from "@/components/ui";

// Internal review queue for the certifying CPA. Not linked, noindexed and disallowed in robots.txt.
export const metadata: Metadata = { title: "Playbook review queue", robots: { index: false, follow: false } };

export default function PlaybookReview() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-bold">Playbook review queue</h1>
      <p className="mt-4 max-w-2xl text-muted">
        To certify an entry, review it, then set <code className="font-mono">certified: {"{ date: \"YYYY-MM-DD\" }"}</code> on it in{" "}
        <code className="font-mono">content/playbook.ts</code>. Certified entries become indexable and show your review.
      </p>
      <table className="mt-8 w-full text-left text-sm">
        <thead><tr className="border-b border-line text-muted"><th className="py-2">Entry</th><th className="py-2">Drafted</th><th className="py-2">Status</th></tr></thead>
        <tbody className="divide-y divide-line">
          {playbook.map((e) => (
            <tr key={e.slug}>
              <td className="py-3 pr-4"><Link href={`/playbook/${e.slug}`} className="text-accent-ink hover:underline">{e.title}</Link></td>
              <td className="py-3 pr-4 font-mono">{e.drafted}</td>
              <td className="py-3">{e.certified ? `Certified ${e.certified.date}` : "Pending CPA review"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
