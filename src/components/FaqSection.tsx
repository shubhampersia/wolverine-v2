import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/Animations";

export interface Faq {
  question: string;
  answer: string;
}

const FaqSection = ({ faqs, eyebrow = "05" }: { faqs: Faq[]; eyebrow?: string }) => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="numbered-label mb-6">
            <span className="num">{eyebrow}</span> FAQs
          </div>
          <h2 className="heading-section mb-8">Frequently Asked Questions</h2>
        </FadeIn>

        <FadeIn>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
};

export default FaqSection;
