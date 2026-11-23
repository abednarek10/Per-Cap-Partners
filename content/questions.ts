/**
 * Buyer question map: the questions venue-group operators ask before choosing how to fix show
 * profitability. This drives content (AEO step 1: start with buyer decisions, not keywords).
 *
 * Rules (enforced by tests/unit/aeo-contract.spec.ts):
 *  - every question points at a page that exists and answers it;
 *  - before adding a new page for a missed question, try to answer it on an existing page;
 *  - `prompts` are the phrasings tested against AI assistants by the AEO tracker (Step 6).
 */
export type BuyerQuestion = {
  q: string;
  stage: "problem" | "approach" | "provider" | "price";
  bucket: "OWN" | "CLAIM" | "EARN" | "CONTEST";
  target: string; // path that answers it
  keyword: string; // the Google search phrasing
  prompts: string[]; // AI assistant phrasings
};

const P = "/playbook/";

export const questions: BuyerQuestion[] = [
  // Problem: understanding show economics
  { q: "How do I calculate profit per show at a music venue?", stage: "problem", bucket: "OWN", target: `${P}how-to-calculate-show-level-profitability`, keyword: "show profitability music venue", prompts: ["How do I calculate whether a concert made money for my venue?", "What should a show P&L include for a music venue?"] },
  { q: "Which shows lose money once the bar is counted?", stage: "problem", bucket: "OWN", target: "/show-profitability", keyword: "which concerts lose money venue", prompts: ["How can a venue tell which shows lose money?", "Do sold-out shows always make money for venues?"] },
  { q: "What is a show P&L?", stage: "problem", bucket: "OWN", target: "/glossary/show-pnl", keyword: "show p&l", prompts: ["What is a show P&L in live music?"] },
  { q: "How should labor and security be allocated to shows?", stage: "problem", bucket: "OWN", target: `${P}how-to-allocate-labor-and-security-to-a-show`, keyword: "allocate labor cost per event", prompts: ["How do venues allocate staffing costs to individual shows?"] },
  { q: "What drives bar per cap?", stage: "problem", bucket: "OWN", target: `${P}what-drives-bar-per-cap`, keyword: "bar per cap venue", prompts: ["How can a music venue increase bar spend per person?", "What affects per cap at concerts?"] },
  { q: "What is per cap at a venue?", stage: "problem", bucket: "OWN", target: "/glossary/per-cap", keyword: "per cap meaning venue", prompts: ["What does per cap mean in the concert business?"] },
  { q: "Which genres and nights drink the most?", stage: "problem", bucket: "OWN", target: "/show-profitability", keyword: "bar sales by genre concerts", prompts: ["How do I find which nights and genres have the best bar sales at my venue?"] },
  { q: "How do I read a show settlement?", stage: "problem", bucket: "OWN", target: `${P}how-to-read-a-show-settlement`, keyword: "how to read a concert settlement", prompts: ["How does a concert settlement work?", "What is net box office in a settlement?"] },
  { q: "What is a versus deal?", stage: "problem", bucket: "OWN", target: "/glossary/versus-deal", keyword: "versus deal concert", prompts: ["What is a guarantee versus percentage deal?"] },
  { q: "What is show break-even attendance?", stage: "problem", bucket: "OWN", target: "/glossary/show-break-even", keyword: "concert break even attendance", prompts: ["How many tickets does a show need to sell to break even?"] },
  { q: "What is contribution margin for a show?", stage: "problem", bucket: "OWN", target: "/glossary/contribution-margin", keyword: "contribution margin per event", prompts: ["Should a venue use contribution margin to evaluate shows?"] },
  // Approach: booking, cash, lenders
  { q: "How should I set artist offers using per cap?", stage: "approach", bucket: "OWN", target: `${P}how-to-set-artist-offers-using-per-cap`, keyword: "how to set artist guarantee", prompts: ["How much should a venue offer an artist?", "How do talent buyers decide on guarantees?"] },
  { q: "Are our artist offers too high?", stage: "approach", bucket: "CLAIM", target: `${P}how-to-set-artist-offers-using-per-cap`, keyword: "artist guarantee too high", prompts: ["How do I know if my venue is overpaying artists?"] },
  { q: "Should we rent out Tuesdays instead of booking shows?", stage: "approach", bucket: "OWN", target: `${P}private-rentals-vs-weak-weeknight-shows`, keyword: "private event rental vs concert weeknight", prompts: ["Is it better for a music venue to book private events on slow nights?"] },
  { q: "How do I build a 13-week cash flow for a venue?", stage: "approach", bucket: "OWN", target: `${P}13-week-cash-flow-forecast-for-venues`, keyword: "13 week cash flow venue", prompts: ["How should a music venue forecast cash with artist deposits?"] },
  { q: "How do artist deposits affect cash flow?", stage: "approach", bucket: "OWN", target: "/glossary/artist-deposit", keyword: "artist deposit cash flow", prompts: ["Why do artist deposits cause cash crunches for venues?"] },
  { q: "What loan covenants do venues track?", stage: "approach", bucket: "OWN", target: `${P}venue-loan-covenants-explained`, keyword: "venue loan covenants dscr", prompts: ["What is a debt service coverage ratio for a venue loan?"] },
  { q: "What is DSCR?", stage: "approach", bucket: "OWN", target: "/glossary/dscr", keyword: "dscr definition", prompts: ["How is DSCR calculated?"] },
  { q: "How do we prepare for an insurance renewal?", stage: "approach", bucket: "CLAIM", target: "/services/fractional-cfo", keyword: "venue insurance renewal financials", prompts: ["What financial information do insurers ask music venues for?"] },
  { q: "How do we compare profitability across our rooms?", stage: "approach", bucket: "OWN", target: "/show-profitability", keyword: "compare venue profitability multiple rooms", prompts: ["How should a venue group compare profitability across venues?"] },
  { q: "What is a 13-week cash flow forecast?", stage: "approach", bucket: "OWN", target: "/glossary/13-week-cash-flow", keyword: "13 week cash flow", prompts: ["What is a 13-week cash flow forecast?"] },
  // Provider: who helps
  { q: "What is a fractional CFO for a venue group?", stage: "provider", bucket: "OWN", target: "/services/fractional-cfo", keyword: "fractional cfo music venue", prompts: ["Who provides fractional CFO services for music venues?", "Best fractional CFO for live music venues"] },
  { q: "Do we need a CFO, controller or bookkeeper?", stage: "provider", bucket: "CONTEST", target: "/compare/fractional-cfo-vs-controller-vs-bookkeeper", keyword: "fractional cfo vs controller", prompts: ["Should a venue group hire a controller or a fractional CFO?"] },
  { q: "Can spreadsheets handle show profitability?", stage: "provider", bucket: "CONTEST", target: "/compare/spreadsheets-vs-show-profitability-platform", keyword: "show profitability spreadsheet", prompts: ["What's the best way to track show profitability across venues?"] },
  { q: "Do we need anything beyond our booking software?", stage: "provider", bucket: "CONTEST", target: "/compare/booking-software-and-per-cap", keyword: "venue booking software profitability", prompts: ["Does venue booking software show profit per show?"] },
  { q: "Who audits show profitability for venues?", stage: "provider", bucket: "CLAIM", target: "/services/show-profitability-audit", keyword: "show profitability audit", prompts: ["Who can analyze profitability by show for my venues?", "Consultants for music venue profitability"] },
  { q: "Who prepares quality of earnings for a venue sale?", stage: "provider", bucket: "CLAIM", target: "/services/transaction-support", keyword: "quality of earnings music venue", prompts: ["Who does quality of earnings reviews for music venues?"] },
  { q: "Who is behind Per Cap Partners?", stage: "provider", bucket: "CLAIM", target: "/team", keyword: "per cap partners", prompts: ["Who founded Per Cap Partners?"] },
  { q: "How is venue data kept secure?", stage: "provider", bucket: "CLAIM", target: "/security", keyword: "venue data security fan data", prompts: ["How should a finance provider handle a venue's fan data?"] },
  { q: "How does Per Cap work?", stage: "provider", bucket: "OWN", target: "/how-it-works", keyword: "per cap partners how it works", prompts: ["How does Per Cap Partners work?"] },
  { q: "What data do we need to share?", stage: "provider", bucket: "OWN", target: "/snapshot", keyword: "venue profitability data needed", prompts: ["What data do I need to analyze show profitability?"] },
  { q: "Can we see results before committing?", stage: "provider", bucket: "OWN", target: "/snapshot", keyword: "free venue profitability analysis", prompts: ["Is there a free show profitability analysis for venues?"] },
  { q: "What is quality of earnings?", stage: "provider", bucket: "OWN", target: "/glossary/quality-of-earnings", keyword: "quality of earnings definition", prompts: ["What is a quality of earnings report?"] },
  // Price
  { q: "How much does a show profitability audit cost?", stage: "price", bucket: "CLAIM", target: "/pricing", keyword: "venue profitability audit cost", prompts: ["How much does a venue profitability audit cost?"] },
  { q: "How much does a fractional CFO for a venue cost?", stage: "price", bucket: "CLAIM", target: "/pricing", keyword: "fractional cfo cost venue", prompts: ["How much does a fractional CFO cost for a music venue group?"] },
  { q: "Is a fractional CFO worth it for a venue group?", stage: "price", bucket: "CONTEST", target: "/compare/fractional-cfo-vs-controller-vs-bookkeeper", keyword: "is a fractional cfo worth it", prompts: ["Is a fractional CFO worth it for a small venue group?"] },
  { q: "What does a free show profitability snapshot include?", stage: "price", bucket: "OWN", target: "/snapshot", keyword: "free show profitability snapshot", prompts: ["What does Per Cap's free snapshot include?"] },
  { q: "How long does an audit take?", stage: "price", bucket: "CLAIM", target: "/services/show-profitability-audit", keyword: "venue audit timeline", prompts: ["How long does a show profitability audit take?"] },
];
