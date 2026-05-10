// app/contact/page.jsx

import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact',
};

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
                <p className="mt-2 text-gray-600">
                    Send us a message using the form below. We will reply as soon as possible.
                </p>
            </div>

            <ContactForm />
        </main>
    );
}
