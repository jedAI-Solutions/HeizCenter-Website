import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Droplet, Wind, Zap, Star, Award, Users } from "lucide-react";

const services = [
  {
    title: "Wärmepumpe",
    description: "Moderne & effiziente Wärmepumpen-Systeme für Ihr Zuhause",
    href: "/waermepumpe",
    icon: Zap,
    badge: "Umweltfreundlich",
  },
  {
    title: "Heizung",
    description: "Installation & Wartung modernster Heizungsanlagen",
    href: "/heizung",
    icon: Flame,
    badge: "Energieeffizient",
  },
  {
    title: "Sanitär",
    description: "Professionelle Badsanierung & Sanitärinstallationen",
    href: "/sanitaer",
    icon: Droplet,
    badge: "Komplettservice",
  },
  {
    title: "Klimaanlage",
    description: "Klimaanlagen für perfekte Raumtemperatur das ganze Jahr",
    href: "/klimaanlage",
    icon: Wind,
    badge: "Komfortabel",
  },
];

const locations = [
  { name: "Augsburg", phone: "+49 821 123456" },
  { name: "Ulm", phone: "+49 731 123456" },
  { name: "Memmingen", phone: "+49 8331 123456" },
];

const stats = [
  { icon: Star, number: "60+", label: "Kundenbewertungen" },
  { icon: Award, number: "20+", label: "Jahre Erfahrung" },
  { icon: Users, number: "3", label: "Standorte" },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Ihr Experte für moderne
            <span className="text-blue-600"> Heizungslösungen</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Wärmepumpen, Heizung, Sanitär & Klimaanlagen in Augsburg, Ulm und
            Memmingen. Über 20 Jahre Erfahrung und 60+ zufriedene Kunden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/kontakt">Kostenlose Beratung anfragen</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/waermepumpe">Mehr über Wärmepumpen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Unsere Dienstleistungen
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} href={service.href}>
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <Badge variant="secondary">{service.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="container py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Unsere Standorte</CardTitle>
            <CardDescription>
              Wir sind für Sie in drei Standorten in Bayern verfügbar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location) => (
                <div key={location.name} className="text-center p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {location.name}
                  </h3>
                  <a
                    href={`tel:${location.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {location.phone}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Ihre neue Heizung?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Lassen Sie sich kostenlos und unverbindlich beraten!
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/kontakt">Jetzt Beratungstermin vereinbaren</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
