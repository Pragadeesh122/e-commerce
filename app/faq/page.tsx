import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {auth} from "@/app/lib/auth";
import {getUserByEmail} from "@/app/lib/supabase/helpers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Link from "next/link";

const faqItems = [
  {
    question: "What is EleganceHub's return policy?",
    answer:
      "We offer a 30-day return policy for all unworn and unwashed items in their original condition with tags attached. Refunds are processed within 5-7 business days after we receive the returned item.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. Please check our shipping page for more details.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site.",
  },
  {
    question: "Are your products sustainable?",
    answer:
      "We are committed to sustainability and continuously work to increase our eco-friendly offerings. Look for our 'Sustainable' tag on products that meet our environmental standards.",
  },
  {
    question: "How do I know which size to order?",
    answer:
      "We provide detailed size guides for each product. You can find these by clicking on the 'Size Guide' link on any product page. If you're still unsure, our customer service team is happy to assist you.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay. All transactions are securely processed to protect your personal information.",
  },
];

export default async function FAQPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Header user={user} render={false} />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <h1 className='text-5xl font-bold text-center mb-12 text-gray-800'>
          Frequently Asked Questions
        </h1>

        <div className='max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg'>
          <Accordion type='single' collapsible className='w-full'>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-lg font-semibold text-gray-800'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-md text-gray-600'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className='mt-12 text-center'>
          <p className='text-lg text-gray-700 mb-4'>
            Can&apos;t find the answer you&apos;re looking for?
          </p>
          <Link
            href='/contact'
            className=' bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300'>
            Contact Support
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
