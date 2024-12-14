import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Github } from "lucide-react";

// Reusable components for cleaner code
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="text-5xl mb-6 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, name, role }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-4"></div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/event.png"
                alt="Orbivent Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-blue-600">Orbivent</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/login"
                className="px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-28 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              Elevate Your Event Management
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Create, manage, and attend events effortlessly with Orbivent's
              intuitive platform.
            </p>
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon="📅"
                title="Intuitive Event Creation"
                description="Set up your event in minutes with our user-friendly interface."
              />
              <FeatureCard
                icon="🔒"
                title="Secure Registration"
                description="Protect your attendees' data with our robust security measures."
              />
              <FeatureCard
                icon="⚡"
                title="Real-Time Updates"
                description="Keep everyone informed with instant notifications and changes."
              />
              <FeatureCard
                icon="📊"
                title="Comprehensive Analytics"
                description="Make data-driven decisions with insightful event metrics."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Orbivent has streamlined our event planning process. It's intuitive and powerful!"
                name="Alex Johnson"
                role="Event Organizer"
              />
              <TestimonialCard
                quote="Registering for events and getting updates is now effortless. Highly recommended!"
                name="Sarah Lee"
                role="Conference Attendee"
              />
              <TestimonialCard
                quote="The analytics tools have been crucial for improving our event strategies."
                name="Mike Brown"
                role="Corporate Event Planner"
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
              Ready to Elevate Your Events?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied users and start creating amazing
              events today.
            </p>
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/event.png"
                  alt="Orbivent Logo"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold">Orbivent</span>
              </Link>
              <p className="text-gray-400">Simplifying event management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-blue-500"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Twitter size={24} />
                </Link>
                <Link
                  href="https://github.com"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Github size={24} />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li>
                  <Link
                    href="/features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">info@orbivent.com</p>
              <p className="text-gray-400">+1 (234) 567-8901</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
