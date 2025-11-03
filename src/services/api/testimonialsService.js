import testimonialsData from '@/services/mockData/testimonials.json';

class TestimonialsService {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return a copy to prevent mutations
    return JSON.parse(JSON.stringify(testimonialsData));
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const testimonial = testimonialsData.find(t => t.Id === parseInt(id));
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    
    return JSON.parse(JSON.stringify(testimonial));
  }

  async getFeatured() {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    // Return testimonials with rating >= 5
    const featured = testimonialsData.filter(t => t.rating >= 5);
    return JSON.parse(JSON.stringify(featured));
  }
}

export const testimonialsService = new TestimonialsService();