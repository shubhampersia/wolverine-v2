import { useState } from "react";
import Layout from "@/components/Layout";
import { FadeIn, StaggerContainer } from "@/components/Animations";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs, getBlogByKey } from "@/data/blogs";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type ChecklistItem = {
  title: string;
  desc: string;
};

const CHECKLIST_PAGE_SIZE = 5;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Interactive checklist:
   - Shows five evaluation points at a time on the left.
   - The selected point is displayed in the aligned detail card on the right.
   - Previous / next controls move between the two groups of five.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ChecklistTabs = ({
  heading,
  intro,
  items,
  pageSize = CHECKLIST_PAGE_SIZE,
  paginationCentered = false,
}: {
  heading?: string;
  intro?: string;
  items: ChecklistItem[];
  pageSize?: number;
  paginationCentered?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safeActive = Math.min(active, Math.max(0, items.length - 1));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * pageSize;
  const visibleItems = items.slice(
    pageStart,
    pageStart + pageSize,
  );

  const activeItem = items[safeActive];

  const goToPage = (nextPage: number) => {
    const next = Math.max(0, Math.min(nextPage, totalPages - 1));
    setPage(next);
    setActive(Math.min(next * pageSize, Math.max(0, items.length - 1)));
  };

  const selectItem = (index: number) => {
    setActive(index);
  };

  const renderPagination = () =>
    totalPages > 1 ? (
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goToPage(page - 1)}
          disabled={safePage === 0}
          aria-label="Previous checklist page"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary bg-secondary text-primary shadow-sm transition-all hover:-translate-x-0.5 hover:border-primary hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft size={21} strokeWidth={2.5} />
        </button>

        <span
          className="min-w-[58px] text-center text-sm font-bold tracking-wide text-foreground"
          aria-live="polite"
        >
          {safePage + 1} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={safePage === totalPages - 1}
          aria-label="Next checklist page"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all hover:translate-x-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight size={21} strokeWidth={2.5} />
        </button>
      </div>
    ) : null;

  return (
    <section className="mt-20 lg:mt-24">
      {heading && (
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-section mb-5">{heading}</h2>

            <div className="divider-gold mx-auto mb-6" />

            {intro && (
              <p className="text-muted-foreground leading-relaxed mb-10">
                {intro}
              </p>
            )}
          </div>
        </FadeIn>
      )}

      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 lg:gap-10 items-stretch">
          {/* Five checklist items at a time */}
          <div className="flex flex-col">
            <div className="space-y-3">
              {visibleItems.map((item, visibleIndex) => {
                const itemIndex = pageStart + visibleIndex;
                const isActive = itemIndex === safeActive;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => selectItem(itemIndex)}
                    aria-pressed={isActive}
                    className={`group w-full flex items-center gap-4 text-left rounded-2xl border px-4 py-4 min-h-[76px] transition-all duration-200 ${
                      isActive
                        ? "bg-secondary border-primary shadow-md"
                        : "bg-background border-border hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`font-semibold text-sm leading-snug ${
                        isActive
                          ? "text-secondary-foreground"
                          : "text-foreground/80"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {renderPagination()}
          </div>

          {/* Detail card */}
          <div className="card-dark min-h-[390px] lg:min-h-full flex flex-col justify-between rounded-2xl p-7 md:p-9">
            <div>
              <div className="flex items-start justify-between gap-6 mb-8">
                <span className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {String(safeActive + 1).padStart(2, "0")}
                </span>

                <CheckCircle2 size={22} className="text-primary/60 shrink-0" />
              </div>

              <h3 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-5 max-w-2xl">
                {activeItem.title}
              </h3>

              <p className="text-secondary-foreground/65 leading-8 max-w-3xl">
                {activeItem.desc.includes("Tier-2:") ? (
                  <>
                    <span>{activeItem.desc.split(" Tier-2:")[0]}</span>
                    <span className="block mt-2">
                      Tier-2:{activeItem.desc.split(" Tier-2:")[1]}
                    </span>
                  </>
                ) : (
                  activeItem.desc
                )}
              </p>
            </div>


          </div>
        </div>
      </FadeIn>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Standard article sections that appear before the checklist.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const renderIntroSection = (section: any, key: string | number) => {
  if (section.type === "heading") {
    return (
      <FadeIn key={key}>
        <div className="mb-6">
          <h2 className="heading-section">{section.text}</h2>
          <div className="w-10 h-1 bg-primary mt-5" />
        </div>
      </FadeIn>
    );
  }

  if (section.type === "paragraph") {
    return (
      <FadeIn key={key}>
        <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
          {section.text}
        </p>
      </FadeIn>
    );
  }

  return null;
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Common mistakes section:
   heading stays on the left while the actual content sits in a
   dedicated card on the right.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TwoColumnChecklistCards = ({
  leftHeading,
  leftIntro,
  leftItems,
  leftSupportingText,
  rightHeading,
  rightIntro,
  rightItems,
  rightSupportingText,
}: {
  leftHeading: string;
  leftIntro?: string;
  leftItems: string[];
  leftSupportingText?: string;
  rightHeading: string;
  rightIntro?: string;
  rightItems: string[];
  rightSupportingText?: string;
}) => (
  <section className="mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      <FadeIn>
        <article className="h-full rounded-2xl border border-border bg-muted/20 p-7 md:p-9 shadow-sm">
          <h2 className="heading-section leading-tight">
            {leftHeading}
          </h2>

          <div className="divider-gold mt-5 mb-6" />

          {leftIntro && (
            <p className="mb-7 text-muted-foreground text-base lg:text-lg leading-8">
              {leftIntro}
            </p>
          )}

          <ul className="space-y-4">
            {leftItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground text-base leading-7"
              >
                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {leftSupportingText && (
            <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-7">
              {leftSupportingText}
            </p>
          )}
        </article>
      </FadeIn>

      <FadeIn>
        <article className="h-full rounded-2xl border border-border bg-muted/20 p-7 md:p-9 shadow-sm">
          <h2 className="heading-section leading-tight">
            {rightHeading}
          </h2>

          <div className="divider-gold mt-5 mb-6" />

          {rightIntro && (
            <p className="mb-7 text-muted-foreground text-base lg:text-lg leading-8">
              {rightIntro}
            </p>
          )}

          <ul className="space-y-4">
            {rightItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground text-base leading-7"
              >
                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {rightSupportingText && (
            <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-7">
              {rightSupportingText}
            </p>
          )}
        </article>
      </FadeIn>
    </div>
  </section>
);

const CommonMistakesSection = ({
  heading,
  items,
  supportingText,
}: {
  heading: string;
  items: string[];
  supportingText?: string;
}) => (
  <section className="mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-8 lg:gap-16 items-center">
      <FadeIn>
        <div className="self-center">
          <h2 className="heading-section leading-tight">{heading}</h2>

          <div className="divider-gold mt-6" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="rounded-2xl border border-border bg-muted/20 p-7 md:p-9">
          <ul className="space-y-5">
            {items.map((item: string, index: number) => (
              <li
                key={item}
                className="flex items-start gap-4 text-muted-foreground leading-relaxed"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {supportingText && (
            <p className="mt-8 pt-6 border-t border-border text-muted-foreground leading-relaxed">
              {supportingText}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Conclusion:
   centered heading + full-width text, so the section does not leave
   the large empty right-side gap from the previous max-w-3xl layout.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ConclusionSection = ({ paragraphs }: { paragraphs: string[] }) => (
  <section className="mt-20 lg:mt-24 pt-16 lg:pt-20 border-t border-border">
    <FadeIn>
      <div className="text-center mb-10">
        <h2 className="heading-section">Conclusion</h2>

        <div className="divider-gold mx-auto mt-6" />
      </div>
    </FadeIn>

    <div className="max-w-6xl mx-auto space-y-7">
      {paragraphs.map((paragraph, index) => (
        <FadeIn key={index} delay={index * 0.06}>
          <p className="text-muted-foreground text-base lg:text-lg leading-8">
            {paragraph}
          </p>
        </FadeIn>
      ))}
    </div>
  </section>
);


const stripSectionNumber = (text: string) =>
  text.replace(/^\d+\.\s*/, "");

const getSectionRange = (sections: any[], start: number, end: number) =>
  sections.slice(start + 1, end === -1 ? sections.length : end);

const TierQuestionCard = ({
  heading,
  sections,
}: {
  heading: string;
  sections: any[];
}) => (
  <FadeIn>
    <article className="tier-question-card h-full rounded-2xl border border-border bg-background p-7 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground">
        {stripSectionNumber(heading)}
      </h3>

      <div className="tier-question-accent" />

      <div className="mt-6 space-y-5">
        {sections
          .filter((section: any) => section.type === "paragraph")
          .map((section: any, index: number) => (
            <p
              key={index}
              className="text-muted-foreground text-base leading-7"
            >
              {section.text}
            </p>
          ))}

        {sections
          .filter((section: any) => section.type === "bulletList")
          .map((section: any, index: number) => (
            <div key={index} className="tier-expectations pt-0">
              {section.heading && (
                <h4 className="text-center text-base md:text-lg font-bold text-foreground mb-8">
                  {section.heading}
                </h4>
              )}

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {section.items.map((item: string) => (
                  <li
                    key={item}
                    className="min-h-[64px] rounded-lg border border-primary/15 bg-primary/[0.07] px-3 py-2.5 flex items-center justify-center text-center shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.11] hover:shadow-md"
                  >
                    <span className="text-sm lg:text-[14px] leading-5 font-medium text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </article>
  </FadeIn>
);

const TierQuestionCards = ({
  firstHeading,
  firstSections,
  secondHeading,
  secondSections,
}: {
  firstHeading: string;
  firstSections: any[];
  secondHeading: string;
  secondSections: any[];
}) => (
  <section className="tier-question-section mt-16 lg:mt-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      <TierQuestionCard heading={firstHeading} sections={firstSections} />
      <TierQuestionCard heading={secondHeading} sections={secondSections} />
    </div>
  </section>
);

const TierComparisonSection = ({
  heading,
  items,
  supportingText,
}: {
  heading: string;
  items: ChecklistItem[];
  supportingText?: string;
}) => (
  <section className="tier-comparison-section mt-20 lg:mt-24">
    <FadeIn>
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="heading-section">{stripSectionNumber(heading)}</h2>
        <div className="divider-gold mx-auto mt-6" />
      </div>
    </FadeIn>

    <ChecklistTabs items={items} pageSize={3} paginationCentered />

    {supportingText && (
      <FadeIn>
        <p className="mt-10 max-w-5xl mx-auto text-center text-muted-foreground text-base lg:text-lg leading-8">
          {supportingText}
        </p>
      </FadeIn>
    )}
  </section>
);

const TierSupplyChainSection = ({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) => (
  <section className="tier-supply-chain-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-10 lg:gap-20 items-center">
      <FadeIn>
        <div className="flex items-center h-full">
          <div>
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mt-6" />
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground text-base lg:text-lg leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

const Tier2ImportanceSection = ({
  heading,
  paragraphs,
  items,
}: {
  heading: string;
  paragraphs: string[];
  items: string[];
}) => (
  <section className="tier-two-importance-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.7fr] gap-10 lg:gap-20 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-7">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground text-base lg:text-lg leading-8"
            >
              {paragraph}
            </p>
          ))}

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5 pt-1">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  </section>
);

const ProcurementEvaluationCard = ({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: ChecklistItem[];
}) => (
  <section className="tier-evaluation-section mt-20 lg:mt-24">
    <FadeIn>
      <div className="rounded-2xl border border-border bg-muted/20 p-7 md:p-10 lg:p-12 shadow-sm">
        <div className="max-w-3xl mb-9">
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6" />
          <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-8">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-8">
          {items.map((item, index) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-bold text-base text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </section>
);

const TierCapabilitySection = ({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) => (
  <section className="tier-capability-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground text-base lg:text-lg leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

const TierWolverineSection = ({
  heading,
  paragraphs,
  items,
  supportingText,
}: {
  heading: string;
  paragraphs: string[];
  items: string[];
  supportingText?: string;
}) => (
  <section className="tier-wolverine-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6 mb-7" />

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-base lg:text-lg leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="rounded-2xl border border-border bg-muted/20 p-7 md:p-9 shadow-sm">
          <h3 className="font-bold text-lg md:text-xl text-foreground mb-6">
            Common Mistakes When Evaluating Supplier Tiers
          </h3>

          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-4 text-muted-foreground leading-relaxed"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {supportingText && (
            <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-relaxed">
              {supportingText}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  </section>
);


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Certification blog layout:
   - Heading left / content right for the individual standards.
   - Procurement verification section uses heading + intro on left
     and evaluation bullets on the right.
   - Conclusion is stacked vertically to avoid the large empty gap.
   These components are only used by the certification article.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const CertificationTextSplitSection = ({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) => (
  <section className="certification-text-split-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground text-base lg:text-lg leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

const CertificationFeatureSection = ({
  heading,
  paragraphs,
  items,
  itemsHeading,
  supportingText,
}: {
  heading: string;
  paragraphs: string[];
  items?: string[];
  itemsHeading?: string;
  supportingText?: string;
}) => (
  <section className="certification-feature-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6 mb-7" />

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-base lg:text-lg leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      {items && items.length > 0 && (
        <FadeIn>
          <div className="rounded-2xl border border-border bg-muted/20 p-7 md:p-9 shadow-sm">
            {itemsHeading && (
              <h3 className="font-bold text-lg md:text-xl text-foreground mb-6">
                {itemsHeading}
              </h3>
            )}

            <ul className="space-y-4">
              {items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-muted-foreground leading-relaxed"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {supportingText && (
              <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-relaxed">
                {supportingText}
              </p>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  </section>
);

const CertificationComparisonTabsSection = ({
  heading,
  intro,
  items,
  supportingText,
}: {
  heading: string;
  intro: string;
  items: ChecklistItem[];
  supportingText?: string;
}) => {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 4;

  // Guard against missing/empty CMS content so the page never crashes
  // while the certification data is loading or being edited.
  const safeItems = items.filter(
    (item): item is ChecklistItem =>
      Boolean(item && item.title && typeof item.desc === "string"),
  );

  const totalPages = Math.max(1, Math.ceil(safeItems.length / pageSize));
  const safeActive = Math.min(active, Math.max(0, safeItems.length - 1));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * pageSize;
  const visibleItems = safeItems.slice(pageStart, pageStart + pageSize);
  const activeItem = safeItems[safeActive];

  const goToPage = (nextPage: number) => {
    const safePage = Math.max(0, Math.min(nextPage, totalPages - 1));
    setPage(safePage);
    setActive(safePage * pageSize);
  };

  if (!activeItem) {
    return (
      <section className="certification-comparison-tabs-section mt-20 lg:mt-24">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-section">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mx-auto mt-6 mb-6" />
            <p className="text-muted-foreground text-base lg:text-lg leading-8">
              {intro}
            </p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="certification-comparison-tabs-section mt-20 lg:mt-24">
      <FadeIn>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="heading-section">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mx-auto mt-6 mb-6" />
          <p className="text-muted-foreground text-base lg:text-lg leading-8">
            {intro}
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.9fr] gap-6 lg:gap-10 items-stretch">
          <div className="flex flex-col">
            <div className="space-y-3">
              {visibleItems.map((item, visibleIndex) => {
                const itemIndex = pageStart + visibleIndex;
                const isActive = itemIndex === active;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActive(itemIndex)}
                    aria-pressed={isActive}
                    className={`group w-full flex items-center gap-4 text-left rounded-2xl border px-4 py-4 min-h-[76px] transition-all duration-200 ${
                      isActive
                        ? "bg-secondary border-primary shadow-md"
                        : "bg-background border-border hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-semibold text-sm leading-snug ${
                        isActive
                          ? "text-secondary-foreground"
                          : "text-foreground/80"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-7 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={safePage === 0}
                  aria-label="Previous certification comparison page"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary bg-secondary text-primary shadow-sm transition-all hover:-translate-x-0.5 hover:border-primary hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronLeft size={21} strokeWidth={2.5} />
                </button>

                <span className="min-w-[58px] text-center text-sm font-bold tracking-wide text-foreground">
                  {safePage + 1} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={safePage === totalPages - 1}
                  aria-label="Next certification comparison page"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all hover:translate-x-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronRight size={21} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          <div className="card-dark min-h-[390px] lg:min-h-full flex flex-col rounded-2xl p-7 md:p-9">
            <div className="flex items-start justify-between gap-6 mb-8">
              <span className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold text-primary shrink-0">
                {String(active + 1).padStart(2, "0")}
              </span>
              <CheckCircle2 size={22} className="text-primary/60 shrink-0" />
            </div>

            <h3 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-5">
              {activeItem.title}
            </h3>

            <div className="space-y-5 text-secondary-foreground/70 leading-8">
              <p>
                <span className="font-semibold text-secondary-foreground">
                  Primary Focus:
                </span>{" "}
                {activeItem.desc.split(/Why it matters:/i)[0].replace(
                  /Primary focus:\s*/i,
                  "",
                ).trim()}
              </p>

              <p>
                <span className="font-semibold text-secondary-foreground">
                  Why It Matters:
                </span>{" "}
                {activeItem.desc.split(/Why it matters:/i)[1]?.trim() ?? ""}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {supportingText && (
        <FadeIn>
          <p className="mt-10 max-w-5xl mx-auto text-center text-muted-foreground text-base lg:text-lg leading-8">
            {supportingText}
          </p>
        </FadeIn>
      )}
    </section>
  );
};

const CertificationStandardsCompareSection = ({
  heading,
  paragraphs,
  items,
}: {
  heading: string;
  paragraphs: string[];
  items: ChecklistItem[];
}) => (
  <section className="certification-standards-section mt-20 lg:mt-24">
    <FadeIn>
      <div>
        <h2 className="heading-section leading-tight">
          {stripSectionNumber(heading)}
        </h2>
        <div className="divider-gold mt-6 mb-7" />

        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-muted-foreground text-base lg:text-lg leading-8 mb-6"
          >
            {paragraph}
          </p>
        ))}

        <div className="overflow-x-auto rounded-2xl border border-border bg-muted/10 shadow-sm">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-primary/[0.055]">
                <th className="px-6 py-5 text-left text-sm font-bold text-foreground">
                  Standard / Process
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-foreground">
                  Primary Focus
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-foreground">
                  Why It Matters
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const [focus, why] = item.desc.split(
                  /Why it matters:\s*/i,
                );

                return (
                  <tr
                    key={item.title}
                    className={index < items.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="px-6 py-5 font-bold text-foreground align-top">
                      {item.title}
                    </td>
                    <td className="px-6 py-5 text-muted-foreground align-top">
                      {focus.replace(/Primary focus:\s*/i, "").trim()}
                    </td>
                    <td className="px-6 py-5 text-muted-foreground align-top">
                      {why?.trim() ?? ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-8">
          These should not be viewed as interchangeable certifications. Each
          serves a different purpose within supplier evaluation.
        </p>
      </div>
    </FadeIn>
  </section>
);

const CertificationProcurementSection = ({
  heading,
  intro,
  items,
  supportingText,
}: {
  heading: string;
  intro: string[];
  items: string[];
  supportingText?: string;
}) => (
  <section className="certification-procurement-section mt-16 lg:mt-20">
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.5fr] gap-8 lg:gap-16 items-start">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-5 mb-6" />
          <div className="space-y-5">
            {intro.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-base lg:text-lg leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="rounded-2xl border border-border bg-muted/20 p-6 md:p-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground leading-7"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {supportingText && (
            <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-7">
              {supportingText}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  </section>
);

const CertificationDueDiligenceSection = ({
  heading,
  paragraphs,
  items,
  itemsHeading,
  supportingText,
}: {
  heading: string;
  paragraphs: string[];
  items: string[];
  itemsHeading?: string;
  supportingText?: string;
}) => (
  <section className="certification-due-diligence-section mt-20 lg:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div>
          <h2 className="heading-section leading-tight">
            {stripSectionNumber(heading)}
          </h2>
          <div className="divider-gold mt-6 mb-7" />

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-base lg:text-lg leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="rounded-2xl border border-border bg-muted/20 p-7 md:p-9 shadow-sm">
          {itemsHeading && (
            <h3 className="font-bold text-lg md:text-xl text-foreground mb-6">
              {itemsHeading}
            </h3>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground leading-7"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {supportingText && (
            <p className="mt-7 pt-6 border-t border-border text-muted-foreground leading-relaxed">
              {supportingText}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  </section>
);

const CertificationConclusionSection = ({
  paragraphs,
}: {
  paragraphs: string[];
}) => (
  <section className="certification-conclusion-section mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-border">
    <FadeIn>
      <div className="text-center mb-8 lg:mb-10">
        <h2 className="heading-section">Conclusion</h2>
        <div className="divider-gold mx-auto mt-5" />
      </div>
    </FadeIn>

    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-7">
      {paragraphs.map((paragraph, index) => (
        <FadeIn key={index} delay={index * 0.05}>
          <p className="text-muted-foreground text-base lg:text-lg leading-8">
            {paragraph}
          </p>
        </FadeIn>
      ))}
    </div>
  </section>
);


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Drawing-to-Dispatch article layout:
   - "From Engineering Drawing to Production" stays with TL;DR on the right.
   - Every remaining section uses a clean two-column layout:
     heading on the left, article copy/bullets on the right.
   - Content is rendered directly from the blog data so the copy remains unchanged.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const DrawingToDispatchSplitSection = ({
  heading,
  sections,
}: {
  heading: string;
  sections: any[];
}) => {
  const isConclusion = stripSectionNumber(heading).trim() === "Conclusion";

  if (isConclusion) {
    return (
      <section className="drawing-dispatch-conclusion mt-20 lg:mt-24 pt-16 lg:pt-20 border-t border-border">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto space-y-7">
          {sections
            .filter((section: any) => section.type === "paragraph")
            .map((section: any, index: number) => (
              <FadeIn key={`conclusion-${index}`} delay={index * 0.06}>
                <p className="text-muted-foreground text-base lg:text-lg leading-8">
                  {section.text}
                </p>
              </FadeIn>
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="drawing-dispatch-split-section mt-16 lg:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-10 lg:gap-20 items-start">
        {/* LEFT: Heading */}
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mt-6" />
          </div>
        </FadeIn>

        {/* RIGHT: Description + bullet points */}
        <FadeIn>
          <div className="space-y-7">
            {sections.map((section: any, index: number) => {
              if (section.type === "paragraph") {
                return (
                  <p
                    key={`paragraph-${index}`}
                    className="text-muted-foreground text-base lg:text-lg leading-8"
                  >
                    {section.text}
                  </p>
                );
              }

              if (section.type === "bulletList") {
                return (
                  <div key={`bullets-${index}`} className="pt-1">
                    {section.heading && (
                      <h3 className="mb-7 text-base md:text-lg font-bold text-foreground">
                        {section.heading}
                      </h3>
                    )}

                    {/* Two bullet points per row on desktop */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5">
                      {section.items.map((item: string, itemIndex: number) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
                        >
                          <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


const ZeroDefectSplitSection = ({
  heading,
  sections,
}: {
  heading: string;
  sections: any[];
}) => {
  const isConclusion = stripSectionNumber(heading).trim() === "Conclusion";

  if (isConclusion) {
    return (
      <section className="drawing-dispatch-conclusion mt-20 lg:mt-24 pt-16 lg:pt-20 border-t border-border">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto space-y-7">
          {sections
            .filter((section: any) => section.type === "paragraph")
            .map((section: any, index: number) => (
              <FadeIn key={`zero-defect-conclusion-${index}`} delay={index * 0.06}>
                <p className="text-muted-foreground text-base lg:text-lg leading-8">
                  {section.text}
                </p>
              </FadeIn>
            ))}
        </div>
      </section>
    );
  }

  const checklistSection = sections.find(
    (section: any) => section.type === "checklist",
  );

  const textSections = sections.filter(
    (section: any) => section.type !== "checklist",
  );

  return (
    <section className="drawing-dispatch-split-section mt-16 lg:mt-24">
      {/* Section heading LEFT + descriptive content RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-10 lg:gap-20 items-start">
        {/* LEFT: heading only */}
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mt-6" />
          </div>
        </FadeIn>

        {/* RIGHT: description and normal bullet points */}
        <FadeIn>
          <div className="space-y-7">
            {textSections.map((section: any, index: number) => {
              if (section.type === "paragraph") {
                return (
                  <p
                    key={`zero-defect-paragraph-${index}`}
                    className="text-muted-foreground text-base lg:text-lg leading-8"
                  >
                    {section.text}
                  </p>
                );
              }

              if (section.type === "bulletList") {
                return (
                  <div key={`zero-defect-bullets-${index}`} className="pt-1">
                    {section.heading && (
                      <h3 className="mb-7 text-base md:text-lg font-bold text-foreground">
                        {section.heading}
                      </h3>
                    )}

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5">
                      {section.items.map((item: string, itemIndex: number) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
                        >
                          <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </FadeIn>
      </div>

      {/* 8D interactive tabs: centered independently across the page */}
      {checklistSection && (
        <FadeIn>
          <div className="mt-20 lg:mt-24 mx-auto w-full max-w-6xl">
            <ChecklistTabs
              heading={checklistSection.heading}
              intro={checklistSection.intro}
              items={checklistSection.items}
              paginationCentered={true}
            />
          </div>
        </FadeIn>
      )}
    </section>
  );
};


const LocalisationSplitSection = ({
  heading,
  sections,
}: {
  heading: string;
  sections: any[];
}) => {
  const isConclusion = stripSectionNumber(heading).trim() === "Conclusion";

  if (isConclusion) {
    return (
      <section className="drawing-dispatch-conclusion mt-20 lg:mt-24 pt-16 lg:pt-20 border-t border-border">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-6xl mx-auto space-y-7">
            {sections
              .filter((section: any) => section.type === "paragraph")
              .map((section: any, index: number) => (
                <p
                  key={`localisation-conclusion-${index}`}
                  className="text-muted-foreground text-base lg:text-lg leading-8"
                >
                  {section.text}
                </p>
              ))}
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="drawing-dispatch-split-section mt-16 lg:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-10 lg:gap-20 items-start">
        {/* LEFT: heading only */}
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>
            <div className="divider-gold mt-6" />
          </div>
        </FadeIn>

        {/* RIGHT: complete description + bullet points */}
        <FadeIn>
          <div className="space-y-7">
            {sections.map((section: any, index: number) => {
              if (section.type === "paragraph") {
                return (
                  <p
                    key={`localisation-paragraph-${index}`}
                    className="text-muted-foreground text-base lg:text-lg leading-8"
                  >
                    {section.text}
                  </p>
                );
              }

              if (section.type === "bulletList") {
                return (
                  <div key={`localisation-bullets-${index}`} className="pt-1">
                    {section.heading && (
                      <h3 className="mb-7 text-base md:text-lg font-bold text-foreground">
                        {section.heading}
                      </h3>
                    )}

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5">
                      {section.items.map((item: string, itemIndex: number) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
                        >
                          <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const ToolingHybridSection = ({
  heading,
  sections,
}: {
  heading: string;
  sections: any[];
}) => {
  /*
   * Layout:
   * LEFT  = heading only
   * RIGHT = all description content belonging to this section,
   *         including paragraphs and the bullet list.
   *
   * This keeps the heading visually anchored on the left while the
   * complete article content stays together on the right.
   */
  return (
    <section className="drawing-dispatch-split-section mt-16 lg:mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.7fr] gap-10 lg:gap-20 items-start">
        {/* LEFT: Heading only */}
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <h2 className="heading-section leading-tight">
              {stripSectionNumber(heading)}
            </h2>

            <div className="divider-gold mt-6" />
          </div>
        </FadeIn>

        {/* RIGHT: Complete description + bullet points */}
        <FadeIn>
          <div className="space-y-7">
            {sections.map((section: any, index: number) => {
              if (section.type === "paragraph") {
                return (
                  <p
                    key={`tooling-paragraph-${index}`}
                    className="text-muted-foreground text-base lg:text-lg leading-8"
                  >
                    {section.text}
                  </p>
                );
              }

              if (section.type === "bulletList") {
                return (
                  <div
                    key={`tooling-bullets-${index}`}
                    className="pt-1"
                  >
                    {section.heading && (
                      <h3 className="mb-7 text-base md:text-lg font-bold text-foreground">
                        {section.heading}
                      </h3>
                    )}

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5">
                      {section.items.map(
                        (item: string, itemIndex: number) => (
                          <li
                            key={`${item}-${itemIndex}`}
                            className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
                          >
                            <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const DrawingToDispatchIntroSection = ({
  sections,
  tldr,
  headingText = "From Engineering Drawing to Production",
}: {
  sections: any[];
  tldr: string;
  headingText?: string;
}) => {
  const headingSection = sections.find(
    (section: any) =>
      section.type === "heading" &&
      section.text === headingText,
  );

  const contentSections = sections.filter(
    (section: any) => section !== headingSection,
  );

  return (
    <section className="drawing-dispatch-intro-section">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16 items-center">
        <FadeIn>
          <div className="min-w-0">
            {headingSection && (
              <>
                <h2 className="heading-section leading-tight">
                  {stripSectionNumber(headingSection.text)}
                </h2>
                <div className="divider-gold mt-6 mb-7" />
              </>
            )}

            <div className="space-y-6">
              {contentSections.map((section: any, index: number) => {
                if (section.type === "paragraph") {
                  return (
                    <p
                      key={`intro-paragraph-${index}`}
                      className="text-muted-foreground text-base lg:text-lg leading-8"
                    >
                      {section.text}
                    </p>
                  );
                }

                if (section.type === "bulletList") {
                  return (
                    <div key={`intro-bullets-${index}`} className="pt-1">
                      {section.heading && (
                        <h3 className="mb-5 text-base md:text-lg font-bold text-foreground">
                          {section.heading}
                        </h3>
                      )}

                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5">
                        {section.items.map((item: string, itemIndex: number) => (
                          <li
                            key={`${item}-${itemIndex}`}
                            className="flex items-start gap-3 text-muted-foreground text-base lg:text-lg leading-7"
                          >
                            <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </FadeIn>

        <aside className="w-full">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.045] p-7 md:p-8 shadow-sm">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  TL;DR
                </span>
                <span className="h-px flex-1 bg-primary/20" />
              </div>

              <p className="text-foreground/85 text-sm md:text-base leading-7">
                {tldr}
              </p>
            </div>
          </FadeIn>
        </aside>
      </div>
    </section>
  );
};

const BlogDetail = () => {
  const { blogKey } = useParams();
  const data = blogKey ? getBlogByKey(blogKey) : undefined;
  const isTierSupplierBlog =
    data?.key === "tier1-vs-tier2-automotive-parts-suppliers";
  const isCertificationBlog =
    data?.key === "automotive-parts-supplier-certifications-iatf-16949";
  const isDrawingToDispatchBlog =
    data?.key === "automotive-component-manufacturers-drawing-to-dispatch";
  const isToolingCapabilityBlog =
    data?.key === "in-house-tool-and-die-automotive-component-manufacturers";
  const isZeroDefectBlog =
    data?.key === "zero-defect-quality-control-automotive-component-manufacturers";
  const isLocalisationBlog =
    data?.key === "localisation-india-automotive-component-manufacturers";
  const [relatedPage, setRelatedPage] = useState(0);

  if (!blogKey || !data) {
    return <Navigate to="/blog" replace />;
  }

  const otherPosts = blogs.filter((b) => b.key !== data.key);
  const RELATED_PAGE_SIZE = 3;
  const relatedTotalPages = Math.ceil(otherPosts.length / RELATED_PAGE_SIZE);
  const visibleRelatedPosts = otherPosts.slice(
    relatedPage * RELATED_PAGE_SIZE,
    relatedPage * RELATED_PAGE_SIZE + RELATED_PAGE_SIZE,
  );

  const checklistIndex = data.sections.findIndex(
    (s: any) => s.type === "checklist",
  );

  const introSections =
    checklistIndex === -1
      ? data.sections
      : data.sections.slice(0, checklistIndex);

  const checklistSection =
    checklistIndex === -1
      ? null
      : (data.sections[checklistIndex] as any);

  const afterSections =
    checklistIndex === -1
      ? []
      : data.sections.slice(checklistIndex + 1);

  const tierSections = data.sections as any[];

  const certificationSections = data.sections as any[];

  const certWhyIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "Why Certifications Matter When Evaluating Automotive Suppliers",
  );

  const certIatfIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "1. IATF 16949: The Key Automotive Quality Standard",
  );

  const certIso9001Index = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "2. ISO 9001: Quality Management Systems",
  );

  const certIso14001Index = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "3. ISO 14001: Environmental Management",
  );

  const certPpapIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "4. PPAP Readiness: Demonstrating Production Capability",
  );

  const certTogetherIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "5. How These Certifications Work Together",
  );

  const certProcurementIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "6. What Procurement Teams Should Verify",
  );

  const certDueDiligenceIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "7. Certification Does Not Replace Supplier Due Diligence",
  );

  const certPpapControlIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "8. Why PPAP and Process Control Matter",
  );

  const certWolverineIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "9. Where Wolverine Fits",
  );

  const certConclusionIndex = certificationSections.findIndex(
    (section: any) =>
      section.type === "heading" && section.text === "Conclusion",
  );

  const certSectionContent = (start: number, end: number) =>
    start > -1 && end > start
      ? certificationSections.slice(start + 1, end)
      : [];

  const certParagraphs = (start: number, end: number) =>
    certSectionContent(start, end)
      .filter((section: any) => section.type === "paragraph")
      .map((section: any) => section.text);

  const certBulletList = (start: number, end: number) =>
    certSectionContent(start, end).find(
      (section: any) => section.type === "bulletList",
    );

  const certIatfContent = certParagraphs(
    certIatfIndex,
    certIso9001Index,
  );

  const certIatfBullets = certBulletList(certIatfIndex, certIso9001Index);

  const certIso9001Content = certParagraphs(
    certIso9001Index,
    certIso14001Index,
  );

  const certIso14001Content = certParagraphs(
    certIso14001Index,
    certPpapIndex,
  );

  const certPpapContent = certParagraphs(
    certPpapIndex,
    certTogetherIndex,
  );

  const certPpapBullets = certBulletList(certPpapIndex, certTogetherIndex);

  const certTogetherContent = certParagraphs(
    certTogetherIndex,
    certProcurementIndex,
  );

  // The "How These Certifications Work Together" content uses a
  // `checklist` block (not a `bulletList`) in the certification data.
  const certTogetherItems = certSectionContent(
    certTogetherIndex,
    certProcurementIndex,
  ).find((section: any) => section.type === "checklist");

  const certProcurementContent = certParagraphs(
    certProcurementIndex,
    certDueDiligenceIndex,
  );

  const certDueDiligenceRange = certSectionContent(
    certDueDiligenceIndex,
    certPpapControlIndex,
  );

  const certDueDiligenceBullets = certDueDiligenceRange.find(
    (section: any) => section.type === "bulletList",
  );

  const certDueDiligenceContent = certDueDiligenceRange
    .filter((section: any) => section.type === "paragraph")
    .slice(0, 2)
    .map((section: any) => section.text);

  const certDueDiligenceSupportingText = certDueDiligenceRange
    .filter((section: any) => section.type === "paragraph")
    .slice(2)
    .map((section: any) => section.text)
    .join(" ");

  const certPpapControlContent = certParagraphs(
    certPpapControlIndex,
    certWolverineIndex,
  );

  const certWolverineAllParagraphs = certParagraphs(
    certWolverineIndex,
    certConclusionIndex,
  );

  const certWolverineContent = certWolverineAllParagraphs.slice(0, -1);

  const certWolverineSupportingText =
    certWolverineAllParagraphs[certWolverineAllParagraphs.length - 1];

  const certWolverineBullets = certBulletList(
    certWolverineIndex,
    certConclusionIndex,
  );

  const certConclusionParagraphs =
    certConclusionIndex > -1
      ? certificationSections
          .slice(certConclusionIndex + 1)
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];



  const tierIntroEnd = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "1. What Are Tier-1 Automotive Parts Suppliers?",
  );

  const tierQuestionTwoIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "2. What Are Tier-2 Suppliers?",
  );

  const tierComparisonHeadingIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "3. Tier-1 vs. Tier-2: Key Differences",
  );

  const tierComparisonChecklistIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "checklist" &&
      section.heading === "Comparing Tier-1 and Tier-2 Suppliers",
  );

  const tierSectionFourIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "4. How Supplier Tiers Affect the Supply Chain",
  );

  const tierSectionFiveIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "5. Why Tier-2 Suppliers Matter to OEMs",
  );

  const tierSectionSixIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "6. What Should Procurement Teams Evaluate?",
  );

  const tierEvaluationChecklistIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "checklist" &&
      section.heading === "What to Evaluate Beyond Tier Classification",
  );

  const tierSectionSevenIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "7. Tier Level Does Not Equal Supplier Capability",
  );

  const tierSectionEightIndex = tierSections.findIndex(
    (section: any) =>
      section.type === "heading" &&
      section.text === "8. Where Wolverine Fits",
  );

  const tierIntroSections =
    tierIntroEnd > -1
      ? tierSections.slice(0, tierIntroEnd)
      : introSections;

  const tierQuestionOneSections =
    tierIntroEnd > -1 && tierQuestionTwoIndex > -1
      ? getSectionRange(tierSections, tierIntroEnd, tierQuestionTwoIndex)
      : [];

  const tierQuestionTwoSections =
    tierQuestionTwoIndex > -1 && tierComparisonHeadingIndex > -1
      ? getSectionRange(tierSections, tierQuestionTwoIndex, tierComparisonHeadingIndex)
      : [];

  const tierComparisonItems =
    tierComparisonChecklistIndex > -1
      ? tierSections[tierComparisonChecklistIndex].items
      : [];

  const tierEvaluationItems =
    tierEvaluationChecklistIndex > -1
      ? tierSections[tierEvaluationChecklistIndex].items
      : [];

  const tierComparisonSupportingText =
    tierComparisonChecklistIndex > -1
      ? tierSections
          .slice(
            tierComparisonChecklistIndex + 1,
            tierSectionFourIndex > -1 ? tierSectionFourIndex : undefined,
          )
          .find((section: any) => section.type === "paragraph")?.text
      : undefined;

  const tierFourParagraphs =
    tierSectionFourIndex > -1 && tierSectionFiveIndex > tierSectionFourIndex
      ? tierSections
          .slice(tierSectionFourIndex + 1, tierSectionFiveIndex)
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];

  const tierFiveParagraphs =
    tierSectionFiveIndex > -1 && tierSectionSixIndex > tierSectionFiveIndex
      ? tierSections
          .slice(tierSectionFiveIndex + 1, tierSectionSixIndex)
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];

  const tierFiveItems =
    tierSectionFiveIndex > -1 && tierSectionSixIndex > tierSectionFiveIndex
      ? tierSections
          .slice(tierSectionFiveIndex + 1, tierSectionSixIndex)
          .find((section: any) => section.type === "bulletList")?.items ?? []
      : [];

  const tierEvaluationIntro =
    tierSectionSixIndex > -1 && tierEvaluationChecklistIndex > tierSectionSixIndex
      ? tierSections
          .slice(tierSectionSixIndex + 1, tierEvaluationChecklistIndex)
          .find((section: any) => section.type === "paragraph")?.text ?? ""
      : "";

  // Conclusion for the non-certification article layouts.
  // This must be derived from afterSections because the checklist is
  // the split point used above.
  const conclusionIndex = afterSections.findIndex(
    (section: any) =>
      section.type === "heading" && section.text === "Conclusion",
  );

  const conclusionParagraphs =
    conclusionIndex > -1
      ? afterSections
          .slice(conclusionIndex + 1)
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];

  const lookForIndex = afterSections.findIndex(
    (section: any) =>
      section.type === "heading" && section.text === "What to Look for Instead",
  );

  const commonShortlistingMistakesIndex = afterSections.findIndex(
    (section: any) =>
      section.type === "bulletList" &&
      section.heading === "Common Shortlisting Mistakes",
  );

  const lookForRange =
    lookForIndex > -1
      ? afterSections.slice(
          lookForIndex + 1,
          commonShortlistingMistakesIndex > -1
            ? commonShortlistingMistakesIndex
            : undefined,
        )
      : [];

  const lookForIntro =
    lookForRange.find((section: any) => section.type === "paragraph")?.text;

  const lookForItems =
    lookForRange.find((section: any) => section.type === "bulletList")?.items ?? [];

  const lookForSupportingText =
    lookForRange
      .filter((section: any) => section.type === "paragraph")
      .slice(1)
      .map((section: any) => section.text)
      .join(" ") || undefined;

  const commonShortlistingMistakesSection =
    commonShortlistingMistakesIndex > -1
      ? (afterSections[commonShortlistingMistakesIndex] as {
          type: "bulletList";
          heading: string;
          items: string[];
        })
      : undefined;

  // Supplied article copy for the Common Shortlisting Mistakes card.
  const commonMistakesIntro =
    "Procurement teams can overlook supplier risks when the evaluation process focuses too heavily on immediate commercial factors.";

  const commonMistakesSupportingText =
    commonShortlistingMistakesIndex > -1
      ? afterSections
          .slice(
            commonShortlistingMistakesIndex + 1,
            conclusionIndex > -1 ? conclusionIndex : undefined,
          )
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
          .join(" ") || undefined
      : undefined;


  const tierEightMistakesSection =
    tierSectionEightIndex > -1
      ? tierSections
          .slice(tierSectionEightIndex + 1)
          .find(
            (section: any) =>
              section.type === "bulletList" &&
              section.heading === "Common Mistakes When Evaluating Supplier Tiers",
          )
      : undefined;

  const tierEightMistakesIndex =
    tierEightMistakesSection ? tierSections.indexOf(tierEightMistakesSection) : -1;

  const tierSevenParagraphs =
    tierSectionSevenIndex > -1 && tierSectionEightIndex > tierSectionSevenIndex
      ? tierSections
          .slice(tierSectionSevenIndex + 1, tierSectionEightIndex)
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];

  const tierEightParagraphs =
    tierSectionEightIndex > -1
      ? tierSections
          .slice(
            tierSectionEightIndex + 1,
            tierEightMistakesIndex > -1 ? tierEightMistakesIndex : undefined,
          )
          .filter((section: any) => section.type === "paragraph")
          .map((section: any) => section.text)
      : [];

  const tierEightItems = tierEightMistakesSection?.items ?? [];

  const tierEightSupportingText =
    tierEightMistakesIndex > -1
      ? tierSections
          .slice(tierEightMistakesIndex + 1)
          .find(
            (section: any) =>
              section.type === "paragraph" &&
              section.text.startsWith("Evaluating the complete supply chain"),
          )?.text
      : undefined;

  return (
    <Layout>
      <Helmet>
        <title>{data.metaTitle} | WLVTEC</title>
        <meta name="description" content={data.metaDescription} />
        <link
          rel="canonical"
          href={`https://wlvtec.com/blog/${data.key}`}
        />

        {isTierSupplierBlog && (
          <style>{`
            .tier-supplier-blog .tier-question-card {
              box-shadow: 0 8px 30px rgba(18, 24, 38, 0.05);
              transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
            }

            .tier-supplier-blog .tier-question-card:hover {
              transform: translateY(-3px);
              border-color: hsl(var(--primary) / 0.35);
              box-shadow: 0 14px 34px rgba(18, 24, 38, 0.09);
            }

            .tier-supplier-blog .tier-question-accent {
              width: 42px;
              height: 4px;
              margin-top: 18px;
              background: hsl(var(--primary));
            }

            .tier-supplier-blog .tier-question-section {
              scroll-margin-top: 100px;
            }

            .tier-supplier-blog .tier-expectations {
              padding: 0 0 0.25rem;
            }

            .certification-standard-section,
            .certification-standards-section,
            .certification-procurement-section,
            .certification-conclusion-section {
              scroll-margin-top: 100px;
            }

            .certification-feature-section + .certification-feature-section,
            .certification-standards-section + .certification-feature-section,
            .certification-procurement-section + .certification-feature-section,
            .certification-due-diligence-section + .certification-feature-section {
              margin-top: 4.5rem;
            }

            @media (max-width: 1024px) {
              .certification-feature-section + .certification-feature-section,
              .certification-standards-section + .certification-feature-section,
              .certification-procurement-section + .certification-feature-section,
              .certification-due-diligence-section + .certification-feature-section {
                margin-top: 3.5rem;
              }
            }

            .tier-supplier-blog .tier-expectations li {
              min-width: 0;
            }

            .drawing-dispatch-split-section {
              scroll-margin-top: 100px;
            }

            .drawing-dispatch-intro-section {
              scroll-margin-top: 100px;
            }

            .drawing-dispatch-split-section + .drawing-dispatch-split-section {
              margin-top: 5rem;
            }

            @media (max-width: 1024px) {
              .drawing-dispatch-split-section + .drawing-dispatch-split-section {
                margin-top: 3.5rem;
              }
            }

            .tier-supplier-blog .tier-comparison-section .card-dark {
              min-height: 330px;
            }

            .tier-supplier-blog .tier-comparison-section > section {
              margin-top: 0;
            }

            .tier-supplier-blog .tier-evaluation-copy {
              max-width: 650px;
            }

            .tier-supplier-blog .tier-evaluation-card {
              box-shadow: 0 8px 28px rgba(18, 24, 38, 0.05);
            }

            @media (max-width: 1024px) {
              .tier-supplier-blog .tier-question-card {
                transform: none;
              }

              .tier-supplier-blog .tier-evaluation-copy {
                max-width: none;
              }
            }
          `}</style>
        )}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            author: { "@type": "Person", name: data.author },
            datePublished: data.date,
            description: data.metaDescription,
            publisher: { "@type": "Organization", name: "WLVTEC" },
            mainEntityOfPage: `https://wlvtec.com/blog/${data.key}`,
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://wlvtec.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://wlvtec.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.title,
                item: `https://wlvtec.com/blog/${data.key}`,
              },
            ],
          })}
        </script>
      </Helmet>

      {/* ━━ HERO ━━ */}
      <section className="relative section-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />

        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative py-14 lg:py-16">
          <FadeIn>
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to blog
              </Link>
            </div>

            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-sm">
                {data.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6 max-w-4xl">
              {data.title}
            </h1>

            <div className="divider-gold mb-6" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary-foreground/60">
              <span>By {data.author}</span>
              <span className="w-1 h-1 rounded-full bg-secondary-foreground/30" />
              <span>{formatDate(data.date)}</span>
              <span className="w-1 h-1 rounded-full bg-secondary-foreground/30" />
              <span>{data.readTime}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ ARTICLE CONTENT ━━ */}
      <section
        className={`py-14 lg:py-20 bg-background ${
          isTierSupplierBlog ? "tier-supplier-blog" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {isDrawingToDispatchBlog ? (
            <>
              {(() => {
                const drawingSections = data.sections as any[];
                const drawingIntroIndex = drawingSections.findIndex(
                  (section: any) =>
                    section.type === "heading" &&
                    section.text === "From Engineering Drawing to Production",
                );

                const drawingNumberedHeadingIndexes = drawingSections
                  .map((section: any, index: number) =>
                    section.type === "heading" &&
                    /^(?:[1-7]\.\s|Why Process Control Matters|Conclusion$)/.test(
                      section.text,
                    )
                      ? index
                      : -1,
                  )
                  .filter((index: number) => index > -1);

                const drawingSectionRanges = drawingNumberedHeadingIndexes.map(
                  (start: number, index: number) => ({
                    start,
                    end:
                      drawingNumberedHeadingIndexes[index + 1] ??
                      drawingSections.length,
                  }),
                );

                return (
                  <>
                    {drawingIntroIndex > -1 && (
                      <DrawingToDispatchIntroSection
                        sections={drawingSections.slice(0, drawingNumberedHeadingIndexes[0] ?? drawingSections.length)}
                        tldr={data.tldr}
                        headingText="From Engineering Drawing to Production"
                      />
                    )}

                    {drawingSectionRanges.map(({ start, end }) => {
                      const section = drawingSections[start];

                      return (
                        <DrawingToDispatchSplitSection
                          key={section.text}
                          heading={section.text}
                          sections={drawingSections.slice(start + 1, end)}
                        />
                      );
                    })}
                  </>
                );
              })()}
            </>
          ) : isToolingCapabilityBlog ? (
            <>
              {(() => {
                const toolingSections = data.sections as any[];
                const toolingIntroHeading =
                  "Why Tooling Capability Matters in Automotive Manufacturing";
                const toolingHybridHeading =
                  "In-House Capability vs. Outsourced Tooling";

                const toolingIntroIndex = toolingSections.findIndex(
                  (section: any) =>
                    section.type === "heading" &&
                    section.text === toolingIntroHeading,
                );

                /*
                 * Keep Section 7 separate from the following
                 * "In-House Capability vs. Outsourced Tooling" section.
                 * The latter is rendered by ToolingHybridSection so its
                 * description remains on the left and its bullet list/
                 * supporting paragraph remain on the right.
                 */
                const toolingSectionHeadingIndexes = toolingSections
                  .map((section: any, index: number) =>
                    section.type === "heading" &&
                    (/^(?:[1-7]\.\s|Conclusion$)/.test(section.text) ||
                      section.text === toolingHybridHeading)
                      ? index
                      : -1,
                  )
                  .filter((index: number) => index > -1);

                const toolingSectionRanges =
                  toolingSectionHeadingIndexes.map(
                    (start: number, index: number) => ({
                      start,
                      end:
                        toolingSectionHeadingIndexes[index + 1] ??
                        toolingSections.length,
                    }),
                  );

                return (
                  <>
                    {toolingIntroIndex > -1 && (
                      <DrawingToDispatchIntroSection
                        sections={toolingSections.slice(
                          0,
                          toolingSectionHeadingIndexes[0] ??
                            toolingSections.length,
                        )}
                        tldr={data.tldr}
                        headingText={toolingIntroHeading}
                      />
                    )}

                    {toolingSectionRanges.map(({ start, end }) => {
                      const section = toolingSections[start];
                      const sectionContent = toolingSections.slice(
                        start + 1,
                        end,
                      );

                      if (section.text === toolingHybridHeading) {
                        return (
                          <ToolingHybridSection
                            key={section.text}
                            heading={section.text}
                            sections={sectionContent}
                          />
                        );
                      }

                      return (
                        <DrawingToDispatchSplitSection
                          key={section.text}
                          heading={section.text}
                          sections={sectionContent}
                        />
                      );
                    })}
                  </>
                );
              })()}
            </>
          ) : isZeroDefectBlog ? (
            <>
              {(() => {
                const qualitySections = data.sections as any[];
                const introHeading = "What Zero-Defect Quality Actually Means";

                const introIndex = qualitySections.findIndex(
                  (section: any) =>
                    section.type === "heading" &&
                    section.text === introHeading,
                );

                const sectionHeadingIndexes = qualitySections
                  .map((section: any, index: number) =>
                    section.type === "heading" ? index : -1,
                  )
                  .filter((index: number) => index > -1);

                const sectionRanges = sectionHeadingIndexes.map(
                  (start: number, index: number) => ({
                    start,
                    end:
                      sectionHeadingIndexes[index + 1] ??
                      qualitySections.length,
                  }),
                );

                return (
                  <>
                    {introIndex > -1 && (
                      <DrawingToDispatchIntroSection
                        sections={qualitySections.slice(
                          introIndex,
                          sectionHeadingIndexes[1] ??
                            qualitySections.length,
                        )}
                        tldr={data.tldr}
                        headingText={introHeading}
                      />
                    )}

                    {sectionRanges.slice(1).map(({ start, end }) => {
                      const section = qualitySections[start];

                      return (
                        <ZeroDefectSplitSection
                          key={section.text}
                          heading={section.text}
                          sections={qualitySections.slice(start + 1, end)}
                        />
                      );
                    })}
                  </>
                );
              })()}
            </>
          ) : isLocalisationBlog ? (
            <>
              {(() => {
                const localisationSections = data.sections as any[];
                const introHeading =
                  "Why Localisation Has Become a Strategic Priority";

                const introIndex = localisationSections.findIndex(
                  (section: any) =>
                    section.type === "heading" &&
                    section.text === introHeading,
                );

                const headingIndexes = localisationSections
                  .map((section: any, index: number) =>
                    section.type === "heading" ? index : -1,
                  )
                  .filter((index: number) => index > -1);

                const ranges = headingIndexes.map(
                  (start: number, index: number) => ({
                    start,
                    end: headingIndexes[index + 1] ?? localisationSections.length,
                  }),
                );

                return (
                  <>
                    {/* Intro: heading + description LEFT, TL;DR RIGHT */}
                    {introIndex > -1 && (
                      <DrawingToDispatchIntroSection
                        sections={localisationSections.slice(
                          introIndex,
                          headingIndexes[1] ?? localisationSections.length,
                        )}
                        tldr={data.tldr}
                        headingText={introHeading}
                      />
                    )}

                    {/* All remaining sections: heading LEFT, description/bullets RIGHT */}
                    {ranges.slice(1).map(({ start, end }) => {
                      const section = localisationSections[start];

                      return (
                        <LocalisationSplitSection
                          key={section.text}
                          heading={section.text}
                          sections={localisationSections.slice(start + 1, end)}
                        />
                      );
                    })}
                  </>
                );
              })()}
            </>
          ) : isCertificationBlog ? (
            <>
              {/* Why Certifications Matter: heading + description on the left, TL;DR on the right. */}
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16 items-center">
                <article className="min-w-0">
                  {certWhyIndex > -1 &&
                    certParagraphs(
                      certWhyIndex,
                      certIatfIndex,
                    ).map((paragraph: string, idx: number) => (
                      <FadeIn key={idx}>
                        <div className={idx === 0 ? "" : "mt-6"}>
                          {idx === 0 && (
                            <h2 className="heading-section leading-tight mb-5">
                              {stripSectionNumber(
                                certificationSections[certWhyIndex].text,
                              )}
                            </h2>
                          )}
                          {idx === 0 && <div className="divider-gold mb-6" />}
                          <p className="text-muted-foreground text-base lg:text-lg leading-8">
                            {paragraph}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                </article>

                <aside className="w-full">
                  <FadeIn>
                    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.045] p-7 md:p-8 shadow-sm">
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          TL;DR
                        </span>
                        <span className="h-px flex-1 bg-primary/20" />
                      </div>

                      <p className="text-foreground/85 text-sm md:text-base leading-7">
                        {data.tldr}
                      </p>
                    </div>
                  </FadeIn>
                </aside>
              </div>

              {certIatfIndex > -1 && certIso9001Index > -1 && (
                <CertificationFeatureSection
                  heading={certificationSections[certIatfIndex].text}
                  paragraphs={certIatfContent}
                  items={certIatfBullets?.items ?? []}
                  itemsHeading={certIatfBullets?.heading}
                />
              )}

              {certIso9001Index > -1 && certIso14001Index > -1 && (
                <CertificationTextSplitSection
                  heading={certificationSections[certIso9001Index].text}
                  paragraphs={certIso9001Content}
                />
              )}

              {certIso14001Index > -1 && certPpapIndex > -1 && (
                <CertificationTextSplitSection
                  heading={certificationSections[certIso14001Index].text}
                  paragraphs={certIso14001Content}
                />
              )}

              {certPpapIndex > -1 && certTogetherIndex > -1 && (
                <CertificationFeatureSection
                  heading={certificationSections[certPpapIndex].text}
                  paragraphs={certPpapContent}
                  items={certPpapBullets?.items ?? []}
                  itemsHeading={certPpapBullets?.heading}
                />
              )}

              {certTogetherIndex > -1 && certProcurementIndex > -1 && (
                <CertificationComparisonTabsSection
                  heading={certificationSections[certTogetherIndex].text}
                  intro={certTogetherContent.join(" ")}
                  items={certTogetherItems?.items ?? []}
                  supportingText="These should not be viewed as interchangeable certifications. Each serves a different purpose within supplier evaluation."
                />
              )}

              {certProcurementIndex > -1 && certDueDiligenceIndex > -1 && (
                <ProcurementEvaluationCard
                  heading={certificationSections[certProcurementIndex].text}
                  intro={certProcurementContent.join(" ")}
                  items={
                    certificationSections
                      .slice(certProcurementIndex + 1, certDueDiligenceIndex)
                      .find((section: any) => section.type === "checklist")
                      ?.items ?? []
                  }
                />
              )}

              {certDueDiligenceIndex > -1 && certPpapControlIndex > -1 && (
                <CertificationDueDiligenceSection
                  heading={certificationSections[certDueDiligenceIndex].text}
                  paragraphs={certDueDiligenceContent}
                  items={certDueDiligenceBullets?.items ?? []}
                  itemsHeading={certDueDiligenceBullets?.heading}
                  supportingText={certDueDiligenceSupportingText}
                />
              )}

              {certPpapControlIndex > -1 && certWolverineIndex > -1 && (
                <CertificationTextSplitSection
                  heading={certificationSections[certPpapControlIndex].text}
                  paragraphs={certPpapControlContent}
                />
              )}

              {certWolverineIndex > -1 && certConclusionIndex > -1 && (
                <TierWolverineSection
                  heading={certificationSections[certWolverineIndex].text}
                  paragraphs={certWolverineContent}
                  items={certWolverineBullets?.items ?? []}
                  supportingText={certWolverineSupportingText}
                />
              )}

              {certConclusionParagraphs.length > 0 && (
                <CertificationConclusionSection
                  paragraphs={certConclusionParagraphs}
                />
              )}
            </>
          ) : isTierSupplierBlog ? (
            <>
              {/* Existing Tier-1 / Tier-2 layout remains unchanged. */}
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-16 items-center">
                <article className="min-w-0">
                  {tierIntroSections.map((section: any, idx: number) =>
                    renderIntroSection(section, idx),
                  )}
                </article>

                <aside className="w-full">
                  <FadeIn>
                    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.045] p-7 md:p-8 shadow-sm">
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          TL;DR
                        </span>
                        <span className="h-px flex-1 bg-primary/20" />
                      </div>

                      <p className="text-foreground/85 text-sm md:text-base leading-7">
                        {data.tldr}
                      </p>
                    </div>
                  </FadeIn>
                </aside>
              </div>

              {tierIntroEnd > -1 && tierQuestionTwoIndex > -1 && tierComparisonHeadingIndex > -1 && (
                <TierQuestionCards
                  firstHeading={tierSections[tierIntroEnd].text}
                  firstSections={tierQuestionOneSections}
                  secondHeading={tierSections[tierQuestionTwoIndex].text}
                  secondSections={tierQuestionTwoSections}
                />
              )}

              {tierComparisonHeadingIndex > -1 && tierComparisonItems.length > 0 && (
                <TierComparisonSection
                  heading={tierSections[tierComparisonHeadingIndex].text}
                  items={tierComparisonItems}
                  supportingText={tierComparisonSupportingText}
                />
              )}

              {tierSectionFourIndex > -1 && tierFourParagraphs.length > 0 && (
                <TierSupplyChainSection
                  heading={tierSections[tierSectionFourIndex].text}
                  paragraphs={tierFourParagraphs}
                />
              )}

              {tierSectionFiveIndex > -1 && tierFiveParagraphs.length > 0 && (
                <Tier2ImportanceSection
                  heading={tierSections[tierSectionFiveIndex].text}
                  paragraphs={tierFiveParagraphs}
                  items={tierFiveItems}
                />
              )}

              {tierSectionSixIndex > -1 && tierEvaluationItems.length > 0 && (
                <ProcurementEvaluationCard
                  heading={tierSections[tierSectionSixIndex].text}
                  intro={tierEvaluationIntro}
                  items={tierEvaluationItems}
                />
              )}

              {tierSectionSevenIndex > -1 && tierSevenParagraphs.length > 0 && (
                <TierCapabilitySection
                  heading={tierSections[tierSectionSevenIndex].text}
                  paragraphs={tierSevenParagraphs}
                />
              )}

              {tierSectionEightIndex > -1 && tierEightParagraphs.length > 0 && (
                <TierWolverineSection
                  heading={tierSections[tierSectionEightIndex].text}
                  paragraphs={tierEightParagraphs}
                  items={tierEightItems}
                  supportingText={tierEightSupportingText}
                />
              )}

              {conclusionParagraphs.length > 0 && (
                <ConclusionSection paragraphs={conclusionParagraphs} />
              )}
            </>
          ) : (
            <>
              {/* Existing layout for every other blog remains unchanged. */}
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-16 items-center">
                <article className="min-w-0">
                  {introSections.map((section: any, idx: number) =>
                    renderIntroSection(section, idx),
                  )}
                </article>

                <aside className="w-full">
                  <div className="lg:sticky lg:top-24">
                    <FadeIn>
                      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.045] p-7 md:p-8 shadow-sm">
                        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            TL;DR
                          </span>
                          <span className="h-px flex-1 bg-primary/20" />
                        </div>

                        <p className="text-foreground/85 text-sm md:text-base leading-7">
                          {data.tldr}
                        </p>
                      </div>
                    </FadeIn>
                  </div>
                </aside>
              </div>

              {checklistSection && (
                <ChecklistTabs
                  heading={checklistSection.heading}
                  intro={checklistSection.intro}
                  items={checklistSection.items}
                />
              )}

              {lookForItems.length > 0 &&
                commonShortlistingMistakesSection && (
                  <TwoColumnChecklistCards
                    leftHeading="What to Look for Instead"
                    leftIntro={lookForIntro}
                    leftItems={lookForItems}
                    leftSupportingText={lookForSupportingText}
                    rightHeading={commonShortlistingMistakesSection.heading}
                    rightIntro={commonMistakesIntro}
                    rightItems={commonShortlistingMistakesSection.items}
                    rightSupportingText={commonMistakesSupportingText}
                  />
                )}

              {conclusionParagraphs.length > 0 && (
                <ConclusionSection paragraphs={conclusionParagraphs} />
              )}
            </>
          )}
        </div>
      </section>

      {/* ━━ MORE POSTS ━━ */}
      {otherPosts.length > 0 && (
        <section className="py-16 lg:py-20 section-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <FadeIn>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
                <div>
                  <h2 className="heading-section">More From the Blog</h2>
                  <div className="divider-gold mt-5" />
                </div>

                {relatedTotalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setRelatedPage((current) => Math.max(0, current - 1))
                      }
                      disabled={relatedPage === 0}
                      aria-label="Previous blog posts"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary-foreground/15 text-secondary-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setRelatedPage((current) =>
                          Math.min(relatedTotalPages - 1, current + 1),
                        )
                      }
                      disabled={relatedPage === relatedTotalPages - 1}
                      aria-label="Next blog posts"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary-foreground/15 text-secondary-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>

            <StaggerContainer
              key={relatedPage}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleRelatedPosts.map((post, i) => (
                <FadeIn key={post.key} delay={i * 0.06}>
                  <Link
                    to={`/blog/${post.key}`}
                    className="group h-full flex flex-col rounded-2xl border border-secondary-foreground/10 bg-secondary/20 overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="p-6 flex flex-col min-h-[190px]">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="inline-flex items-center rounded-full bg-primary px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary-foreground">
                          {post.category}
                        </span>
                        <span className="text-xs text-secondary-foreground/45">
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-base lg:text-lg leading-snug mb-3">
                        {post.title}
                      </h3>

                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read more
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </StaggerContainer>

            {relatedTotalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: relatedTotalPages }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRelatedPage(index)}
                    aria-label={`Show blog page ${index + 1}`}
                    aria-current={relatedPage === index ? "page" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      relatedPage === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-secondary-foreground/25 hover:bg-secondary-foreground/45"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ━━ CTA ━━ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <FadeIn>
            <h2 className="heading-section mb-4">Ready to Get Started?</h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact us to discuss your sourcing and manufacturing
              requirements.
            </p>

            <Link to="/contact" className="btn-primary">
              Contact Us <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;