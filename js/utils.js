// ============================================
// YouTube Tags Generator - Utility Functions
// ============================================

// Tag Generation Logic
class TagGenerator {
  constructor() {
    this.commonTags = {
      youtube: ['video', 'trending', 'viral', 'subscribe', 'music', 'gaming', 'vlog', 'tutorial', 'review', 'comedy'],
      etsy: ['handmade', 'vintage', 'craft', 'diy', 'shop', 'art', 'custom', 'gift', 'design'],
      google: ['search', 'business', 'marketing', 'seo', 'ads', 'optimize', 'online', 'digital'],
      fiverr: ['freelance', 'service', 'gig', 'seller', 'professional', 'skilled', 'offer'],
      amazon: ['product', 'seller', 'deal', 'shopping', 'price', 'buy', 'review', 'rating'],
      redbubble: ['print', 'design', 'merch', 'apparel', 'artist', 'creative', 'unique'],
      ebay: ['auction', 'seller', 'buy', 'bidding', 'deal', 'vintage', 'collectible'],
      shopify: ['ecommerce', 'store', 'shop', 'sell', 'customer', 'online', 'product'],
      facebook: ['social', 'community', 'engagement', 'share', 'like', 'friend'],
      tiktok: ['trending', 'short', 'video', 'dance', 'challenge', 'viral', 'fun'],
      twitter: ['tweet', 'news', 'trending', 'discussion', 'thoughts', 'update'],
      instagram: ['photo', 'visual', 'aesthetic', 'lifestyle', 'content', 'influencer'],
      linkedin: ['professional', 'business', 'career', 'networking', 'corporate', 'industry'],
      pinterest: ['idea', 'inspiration', 'diy', 'home', 'fashion', 'lifestyle']
    };
  }

  generateTags(topic, platform = 'youtube') {
    const words = topic.toLowerCase().split(/[\s,]+/).filter(w => w.length > 2);
    const platformTags = this.commonTags[platform] || this.commonTags.youtube;
    
    let tags = [...new Set(words)];
    
    // Add relevant platform tags
    platformTags.forEach(tag => {
      if (words.some(w => this.calculateSimilarity(w, tag) > 0.6) && tags.length < 25) {
        tags.push(tag);
      }
    });
    
    // Add general tags
    tags.push(...platformTags.slice(0, Math.max(0, 25 - tags.length)));
    
    // Remove duplicates and limit
    tags = [...new Set(tags)].slice(0, 30);
    
    return tags;
  }

  calculateSimilarity(str1, str2) {
    const len = Math.min(str1.length, str2.length);
    let matches = 0;
    for (let i = 0; i < len; i++) {
      if (str1[i] === str2[i]) matches++;
    }
    return matches / Math.max(str1.length, str2.length);
  }

  formatTags(tags, separator = ' ') {
    return tags.join(separator);
  }
}

// Initialize tag generator
const tagGenerator = new TagGenerator();

// Copy to clipboard functionality
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy. Please try again.');
  });
}

// Smooth scroll utility
function smoothScroll(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Debounce function for input
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Form validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TagGenerator, copyToClipboard, smoothScroll, debounce, throttle, validateEmail, observer };
}
