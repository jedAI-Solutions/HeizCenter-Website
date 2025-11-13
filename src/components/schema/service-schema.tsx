interface ServiceSchemaProps {
  serviceType:
    | "waermepumpe"
    | "heizung"
    | "sanitaer"
    | "klimaanlage";
}

export function ServiceSchema({ serviceType }: ServiceSchemaProps) {
  const serviceCities = [
    { "@type": "City", name: "Augsburg" },
    { "@type": "City", name: "Bobingen" },
    { "@type": "City", name: "Ulm" },
    { "@type": "City", name: "Neu-Ulm" },
    { "@type": "City", name: "Memmingen" },
    { "@type": "City", name: "Landsberg am Lech" },
    { "@type": "City", name: "Königsbrunn" },
    { "@type": "City", name: "Gersthofen" },
    { "@type": "City", name: "Neusäß" },
    { "@type": "City", name: "Stadtbergen" },
    { "@type": "City", name: "Gutenzell-Hürbel" },
    { "@type": "City", name: "Biberach an der Riß" },
    { "@type": "City", name: "Laupheim" },
    { "@type": "City", name: "Günzburg" },
    { "@type": "City", name: "Krumbach" },
  ];

  const waermepumpeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Wärmepumpen-Installation",
    name: "Wärmepumpen-Installation & Wartung",
    description:
      "Professionelle Wärmepumpen-Installation mit BEG-Förderung bis zu 70%. Luft-Wasser, Sole-Wasser und Wasser-Wasser Wärmepumpen von führenden Herstellern.",
    provider: {
      "@type": "PlumbingHeatingContractor",
      name: "HeizCenter GmbH",
      url: "https://heizcenter.de",
      telephone: "+49-8234-9665900",
    },
    areaServed: serviceCities,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wärmepumpen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Luft-Wasser-Wärmepumpe",
            description:
              "Effiziente Wärmepumpe für Außen- und Innenaufstellung. Ideal für Neubau und Bestandsgebäude.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Vaillant" },
              { "@type": "Brand", name: "Stiebel Eltron" },
              { "@type": "Brand", name: "Daikin" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "8000",
              highPrice: "25000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Sole-Wasser-Wärmepumpe (Erdwärmepumpe)",
            description:
              "Hocheffiziente Erdwärmepumpe mit Tiefenbohrung oder Flächenkollektor. Höchste Jahresarbeitszahl.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Vaillant" },
              { "@type": "Brand", name: "Stiebel Eltron" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "12000",
              highPrice: "35000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Wasser-Wasser-Wärmepumpe",
            description:
              "Grundwasser-Wärmepumpe mit höchster Effizienz. Nutzung des Grundwassers als Wärmequelle.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Stiebel Eltron" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "15000",
              highPrice: "40000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wärmepumpen-Wartung",
            description:
              "Regelmäßige Wartung für optimale Effizienz und Langlebigkeit Ihrer Wärmepumpe.",
          },
        },
      ],
    },
    termsOfService: "https://heizcenter.de/agb",
    url: "https://heizcenter.de/waermepumpe",
    audience: {
      "@type": "Audience",
      audienceType: "Hausbesitzer, Bauherren, Immobilienbesitzer",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://heizcenter.de/kontakt",
      servicePhone: "+49-8234-9665900",
    },
  };

  const heizungSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Heizungsinstallation",
    name: "Heizungsinstallation & Heizungswartung",
    description:
      "Installation moderner Heizsysteme: Gas-Brennwertkessel, Öl-Brennwertkessel, Hybridheizungen. Professionelle Wartung und 24/7 Notdienst.",
    provider: {
      "@type": "PlumbingHeatingContractor",
      name: "HeizCenter GmbH",
      url: "https://heizcenter.de",
      telephone: "+49-8234-9665900",
    },
    areaServed: serviceCities,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Heizungssysteme",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Gas-Brennwertkessel",
            description:
              "Moderne Gas-Brennwertheizung mit höchster Effizienz. Bis zu 30% Energieersparnis.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Vaillant" },
              { "@type": "Brand", name: "Buderus" },
              { "@type": "Brand", name: "Wolf" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "3500",
              highPrice: "8000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Öl-Brennwertkessel",
            description:
              "Effiziente Öl-Brennwertheizung für zuverlässige Wärmeversorgung.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Buderus" },
              { "@type": "Brand", name: "Wolf" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "4000",
              highPrice: "9000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Hybridheizung",
            description:
              "Kombination aus Wärmepumpe und Gas-Brennwertkessel für maximale Effizienz.",
            brand: [
              { "@type": "Brand", name: "Viessmann" },
              { "@type": "Brand", name: "Vaillant" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "12000",
              highPrice: "25000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Heizungswartung",
            description:
              "Jährliche Wartung für optimale Heizungsleistung und Sicherheit.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Heizung Notdienst",
            description:
              "24/7 Notdienst bei Heizungsausfall. Schnelle Hilfe innerhalb von 2-4 Stunden.",
          },
        },
      ],
    },
    termsOfService: "https://heizcenter.de/agb",
    url: "https://heizcenter.de/heizung",
    audience: {
      "@type": "Audience",
      audienceType: "Hausbesitzer, Bauherren, Immobilienbesitzer",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://heizcenter.de/kontakt",
      servicePhone: "+49-8234-9665900",
    },
  };

  const sanitaerSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Sanitärinstallation",
    name: "Sanitärinstallation & Badsanierung",
    description:
      "Professionelle Sanitär- und Badinstallationen in Augsburg, Ulm und Umgebung. Von der Planung bis zur Fertigstellung. Badsanierung, Rohrleitungsbau, Wasserleitungen.",
    provider: {
      "@type": "PlumbingHeatingContractor",
      name: "HeizCenter GmbH",
      url: "https://heizcenter.de",
      telephone: "+49-8234-9665900",
    },
    areaServed: serviceCities,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sanitär-Dienstleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Badsanierung",
            description:
              "Komplette Badsanierung vom Profi. Planung, Design und fachgerechte Ausführung aus einer Hand.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sanitärinstallation",
            description:
              "Installation von Sanitäranlagen, Armaturen, WC, Waschbecken, Duschen und Badewannen.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rohrleitungsbau",
            description:
              "Professioneller Rohrleitungsbau für Trinkwasser, Abwasser und Heizung.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wasserleitungen",
            description:
              "Installation und Reparatur von Wasserleitungen. Moderne Rohrsysteme mit langer Lebensdauer.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sanitär-Notdienst",
            description:
              "24/7 Notdienst bei Rohrbruch und Wasserschäden. Schnelle Hilfe vor Ort.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Barrierefreies Bad",
            description:
              "Umbau zu barrierefreien Bädern. Bodengleiche Duschen, unterfahrbare Waschtische.",
          },
        },
      ],
    },
    termsOfService: "https://heizcenter.de/agb",
    url: "https://heizcenter.de/sanitaer",
    audience: {
      "@type": "Audience",
      audienceType: "Hausbesitzer, Bauherren, Immobilienbesitzer",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://heizcenter.de/kontakt",
      servicePhone: "+49-8234-9665900",
    },
  };

  const klimaanlageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Klimaanlagen-Installation",
    name: "Klimaanlagen-Installation & Wartung",
    description:
      "Installation von Klimaanlagen, Lüftungssystemen und kontrollierten Wohnraumlüftungen. Split-Klimageräte, Multi-Split-Anlagen und VRF-Systeme.",
    provider: {
      "@type": "PlumbingHeatingContractor",
      name: "HeizCenter GmbH",
      url: "https://heizcenter.de",
      telephone: "+49-8234-9665900",
    },
    areaServed: serviceCities,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Klimaanlagen & Lüftungssysteme",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Split-Klimaanlage",
            description:
              "Effiziente Split-Klimaanlage für einzelne Räume. Kühlen und Heizen mit einer Anlage.",
            brand: [
              { "@type": "Brand", name: "Daikin" },
              { "@type": "Brand", name: "Mitsubishi Electric" },
              { "@type": "Brand", name: "Panasonic" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "1500",
              highPrice: "4000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Multi-Split-Klimaanlage",
            description:
              "Multi-Split-System für mehrere Räume. Ein Außengerät, mehrere Innengeräte.",
            brand: [
              { "@type": "Brand", name: "Daikin" },
              { "@type": "Brand", name: "Mitsubishi Electric" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "4000",
              highPrice: "12000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "VRF-Klimasystem",
            description:
              "Variable Refrigerant Flow System für größere Gebäude und Gewerbe.",
            brand: [
              { "@type": "Brand", name: "Daikin" },
              { "@type": "Brand", name: "Mitsubishi Electric" },
            ],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "10000",
              highPrice: "50000",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kontrollierte Wohnraumlüftung",
            description:
              "Installation von Lüftungsanlagen mit Wärmerückgewinnung für optimales Raumklima.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Klimaanlagen-Wartung",
            description:
              "Regelmäßige Wartung und Reinigung Ihrer Klimaanlage für optimale Leistung.",
          },
        },
      ],
    },
    termsOfService: "https://heizcenter.de/agb",
    url: "https://heizcenter.de/klimaanlage",
    audience: {
      "@type": "Audience",
      audienceType: "Hausbesitzer, Bauherren, Gewerbetreibende",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://heizcenter.de/kontakt",
      servicePhone: "+49-8234-9665900",
    },
  };

  const schemas = {
    waermepumpe: waermepumpeSchema,
    heizung: heizungSchema,
    sanitaer: sanitaerSchema,
    klimaanlage: klimaanlageSchema,
  };

  const schema = schemas[serviceType];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
