import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {auth} from "@/app/lib/auth";
import {getUserByEmail} from "@/app/lib/supabase/helpers";
import {Input} from "@/app/components/ui/input";
import {Textarea} from "@/app/components/ui/textarea";
import {Button} from "@/app/components/ui/button";
import {Mail, Phone, Clock, MapPin} from "lucide-react";

export default async function ContactPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Header user={user} render={false} />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <h1 className='text-5xl font-bold text-center mb-4 text-gray-800'>
          Contact Us
        </h1>
        <p className='text-xl text-center mb-12 text-gray-600'>
          We&apos;re here to help and answer any question you might have.
        </p>

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
              Get in Touch
            </h2>
            <form className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <Input
                  type='text'
                  id='name'
                  placeholder='Your Name'
                  className='w-full'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <Input
                  type='email'
                  id='email'
                  placeholder='your@email.com'
                  className='w-full'
                />
              </div>
              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Subject
                </label>
                <Input
                  type='text'
                  id='subject'
                  placeholder='How can we help?'
                  className='w-full'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <Textarea
                  id='message'
                  placeholder='Your message here...'
                  className='w-full h-32'
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition duration-300'>
                Send Message
              </Button>
            </form>
          </div>

          <div className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
              Contact Information
            </h2>
            <div className='space-y-6'>
              <div className='flex items-start'>
                <Phone className='w-6 h-6 text-pink-500 mr-3 mt-1' />
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Customer Support
                  </h3>
                  <p className='text-gray-600'>Phone: (555) 123-4567</p>
                  <p className='text-gray-600'>
                    Email: support@elegancehub.com
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <Clock className='w-6 h-6 text-pink-500 mr-3 mt-1' />
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Business Hours
                  </h3>
                  <p className='text-gray-600'>
                    Monday - Friday: 9am - 5pm EST
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <Mail className='w-6 h-6 text-pink-500 mr-3 mt-1' />
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Email Departments
                  </h3>
                  <p className='text-gray-600'>
                    Returns: returns@elegancehub.com
                  </p>
                  <p className='text-gray-600'>
                    Business Inquiries: business@elegancehub.com
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <MapPin className='w-6 h-6 text-pink-500 mr-3 mt-1' />
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Mailing Address
                  </h3>
                  <p className='text-gray-600'>EleganceHub Headquarters</p>
                  <p className='text-gray-600'>123 Fashion Avenue</p>
                  <p className='text-gray-600'>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <p className='text-lg text-gray-700 font-medium'>
            We aim to respond to all inquiries within 24 hours.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
