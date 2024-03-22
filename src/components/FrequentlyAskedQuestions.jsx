import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FrequentlyAskedQuestions = () => {
  return (
    <Accordion type="single" collapsible className="w-full text-start">
      <AccordionItem value="faq-1">
        <AccordionTrigger>
          What subscription plans are available?
        </AccordionTrigger>
        <AccordionContent>
          We offer a variety of plans, including monthly and a free plan
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-2">
        <AccordionTrigger>
          Can I change my subscription plan later?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you can upgrade or downgrade your subscription plan at any time
          through your account settings.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-3">
        <AccordionTrigger>Why should I upgrade?</AccordionTrigger>
        <AccordionContent>
          Upgrading to a paid plan offers you a greater number of features and
          unlimited uploads, meaning suggested outfits will be much better.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-4">
        <AccordionTrigger>
          What is included in the free subscription plan?
        </AccordionTrigger>
        <AccordionContent>
          The free plan includes access to basic features with limited usage.
          For unlimited access, consider upgrading to a premium plan.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-5">
        <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          You can cancel your subscription at any time by going to your account
          settings and selecting &apos;Manage Subscription&apos;.Your Pro
          membership will be active until the end of the subscription period.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-6">
        <AccordionTrigger className="text-start">
          If I cancel my subscription, will I loose my uploads?{" "}
        </AccordionTrigger>
        <AccordionContent>
          Your uploaded items will be kept but you wont be able to upload more
          unless some are deleted.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FrequentlyAskedQuestions;
