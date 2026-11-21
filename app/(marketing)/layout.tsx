import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { JsonLd } from "@/components/ui";
import { graph, organization, website, founder } from "@/lib/seo/jsonld";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={graph(organization(), website(), founder())} />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
