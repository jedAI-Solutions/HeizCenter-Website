"use client";

import { useReportWebVitals } from "next/web-vitals";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
    }
  });

  return null;
}

// Performance monitoring - Core Web Vitals thresholds
export const VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
};
