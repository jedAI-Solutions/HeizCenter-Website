/**
 * Central Review & Rating Configuration
 *
 * WICHTIG: Google Bewertungen MANUELL hier aktualisieren!
 * Google bietet keine öffentliche API für automatische Updates.
 *
 * So aktualisieren Sie die Bewertungen:
 * 1. Gehen Sie zu Ihrem Google Business Profile
 * 2. Prüfen Sie die aktuelle Bewertung und Anzahl
 * 3. Aktualisieren Sie die Werte unten
 * 4. Build & Deploy die Website
 *
 * WICHTIG für SEO:
 * - Ehrliche, echte Bewertungen verwenden
 * - Keine falschen Zahlen (Google kann das erkennen!)
 * - Bei Schema.org MUSS reviewCount >= Anzahl echter Reviews sein
 */

export const REVIEWS = {
  // Google Business Profile Rating
  // TODO: Manuell aktualisieren wenn neue Bewertungen eingehen
  google: {
    rating: 4.8,           // Durchschnittsbewertung (1.0 - 5.0)
    count: 5,              // Anzahl der Bewertungen
    lastUpdated: "2025-01-17",  // Letztes Update-Datum
  },

  // Display Settings
  display: {
    showCount: false,      // Review-Anzahl anzeigen? (false = nur Rating)
    showCountInSchema: true,  // Count in Schema.org? (true für SEO)
  },

  // Mock Reviews for Display (nicht für Schema.org!)
  // Diese werden auf der Website als Testimonials angezeigt
  testimonials: [
    {
      name: "Familie Müller",
      location: "Augsburg",
      rating: 5,
      text: "Sehr professionelle Beratung und Installation unserer neuen Wärmepumpe. Das Team war pünktlich und hat alles sauber hinterlassen. Top!",
      service: "Wärmepumpe",
      date: "Vor 2 Wochen",
    },
    {
      name: "Thomas Schmidt",
      location: "Ulm",
      rating: 5,
      text: "Notdienst am Sonntag - binnen 2 Stunden war der Techniker da und hat unsere defekte Heizung repariert. Absolut zuverlässig!",
      service: "Notdienst Heizung",
      date: "Vor 1 Monat",
    },
    {
      name: "Anna Weber",
      location: "Memmingen",
      rating: 5,
      text: "Komplette Badsanierung durchgeführt. Tolle Beratung, faire Preise und hervorragende Handwerksarbeit. Sehr empfehlenswert!",
      service: "Badsanierung",
      date: "Vor 3 Wochen",
    },
  ],

  // Stats für Display
  stats: {
    recommendationRate: 100,  // Prozent (0-100)
    averageResponseTime: "< 24h",
  }
} as const;

// Helper Functions
export const getGoogleRatingDisplay = () => {
  return REVIEWS.google.rating.toFixed(1);
};

export const getGoogleRatingStars = () => {
  return Math.round(REVIEWS.google.rating);
};

export const shouldShowReviewCount = () => {
  return REVIEWS.display.showCount;
};

// Schema.org Format (für SEO)
export const getSchemaRating = () => {
  return {
    "@type": "AggregateRating",
    ratingValue: REVIEWS.google.rating.toString(),
    ...(REVIEWS.display.showCountInSchema && {
      reviewCount: REVIEWS.google.count.toString(),
    }),
  };
};
