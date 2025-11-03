import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { testimonialsService } from '@/services/api/testimonialsService';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialsService.getAll();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <ApperIcon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTestimonials} />;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. See how FinanceFlow has helped thousands 
          of users take control of their finances and achieve their financial goals.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
          <div className="text-gray-600">Active Users</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
          <div className="text-gray-600">Average Rating</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">95%</div>
          <div className="text-gray-600">Would Recommend</div>
        </Card>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-16"
      >
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your Finances?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial lives with FinanceFlow. 
            Start your journey to financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              Learn More
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Testimonials;