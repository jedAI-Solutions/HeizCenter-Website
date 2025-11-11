import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | HeizCenter",
  description: "Impressum und Kontaktdaten von HeizCenter - Ihr Experte für Wärmepumpen, Heizung, Sanitär und Klimaanlagen in Augsburg, Ulm und Memmingen.",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="mb-2">
            <strong>HeizCenter GmbH</strong>
            <br />
            Musterstraße 123
            <br />
            86150 Augsburg
            <br />
            Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
          <p className="mb-2">
            <strong>Telefon:</strong>{" "}
            <a href="tel:+498211234560" className="text-blue-600 hover:underline">
              +49 821 123456-0
            </a>
            <br />
            <strong>E-Mail:</strong>{" "}
            <a href="mailto:info@heizcenter.de" className="text-blue-600 hover:underline">
              info@heizcenter.de
            </a>
            <br />
            <strong>Website:</strong>{" "}
            <a href="https://heizcenter.de" className="text-blue-600 hover:underline">
              www.heizcenter.de
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Vertretungsberechtigte</h2>
          <p className="mb-2">
            Geschäftsführer: Max Mustermann
            <br />
            Prokuristen: Maria Musterfrau
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Registereintrag</h2>
          <p className="mb-2">
            <strong>Handelsregister:</strong> Amtsgericht Augsburg
            <br />
            <strong>Registernummer:</strong> HRB 12345
            <br />
            <strong>Umsatzsteuer-ID:</strong> DE123456789
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Berufsbezeichnung und Kammerzugehörigkeit</h2>
          <p className="mb-2">
            <strong>Berufsbezeichnung:</strong> Installateur- und Heizungsbauermeister
            <br />
            <strong>Zuständige Kammer:</strong> Handwerkskammer für Schwaben
            <br />
            <strong>Verliehen in:</strong> Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Versicherung</h2>
          <p className="mb-2">
            <strong>Betriebshaftpflichtversicherung:</strong>
            <br />
            Muster Versicherung AG
            <br />
            Versicherungsstraße 1
            <br />
            80331 München
            <br />
            <strong>Geltungsbereich:</strong> Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="mb-2">
            Max Mustermann
            <br />
            HeizCenter GmbH
            <br />
            Musterstraße 123
            <br />
            86150 Augsburg
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
          <p className="mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p className="mb-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
          <p className="mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
          <p className="mb-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
            erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
            entfernen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
          <p className="mb-4">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
            Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
            Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p className="mb-4">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Urheberrecht</h2>
          <p className="mb-4">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
            dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="mb-4">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
            bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg mt-12">
          <p className="text-sm text-slate-600">
            <strong>Hinweis:</strong> Dies ist ein Muster-Impressum. Für den produktiven Einsatz
            müssen alle Platzhalter (Firmendaten, Registernummern, etc.) durch die korrekten
            Unternehmensdaten ersetzt werden. Bei Unsicherheiten empfehlen wir die Konsultation
            eines Rechtsanwalts.
          </p>
        </div>
      </div>
    </div>
  );
}
