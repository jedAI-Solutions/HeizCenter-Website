import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB - Allgemeine Geschäftsbedingungen | HeizCenter",
  description: "Allgemeine Geschäftsbedingungen von HeizCenter für Wärmepumpen, Heizung, Sanitär und Klimaanlagen.",
  robots: "noindex, nofollow",
};

export default function AGBPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Geltungsbereich</h2>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Lieferungen
            und Leistungen zwischen der HeizCenter GmbH (nachfolgend „Auftragnehmer") und ihren
            Kunden (nachfolgend „Auftraggeber").
          </p>
          <p className="mb-4">
            Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der
            Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu. Die AGB gelten auch
            dann, wenn der Auftragnehmer in Kenntnis entgegenstehender oder von diesen AGB
            abweichender Bedingungen des Auftraggebers die Leistung an den Auftraggeber
            vorbehaltlos ausführt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Angebote und Vertragsabschluss</h2>
          <p className="mb-4">
            Alle Angebote des Auftragnehmers sind freibleibend und unverbindlich, soweit sie nicht
            ausdrücklich als verbindlich gekennzeichnet sind. Ein Vertrag kommt erst durch die
            schriftliche Auftragsbestätigung des Auftragnehmers oder durch Ausführung der Leistung
            zustande.
          </p>
          <p className="mb-4">
            Nebenabreden, Änderungen und Ergänzungen bedürfen zu ihrer Wirksamkeit der Schriftform.
            Dies gilt auch für die Aufhebung dieses Schriftformerfordernisses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Preise und Zahlungsbedingungen</h2>
          <p className="mb-4">
            <strong>3.1 Preise</strong>
            <br />
            Soweit nichts anderes schriftlich vereinbart ist, gelten die Preise des Auftragnehmers
            ab Firmensitz zuzüglich der gesetzlichen Mehrwertsteuer. Kosten für Transport,
            Verpackung und Versicherung werden gesondert berechnet, sofern nicht anders vereinbart.
          </p>
          <p className="mb-4">
            <strong>3.2 Zahlungsbedingungen</strong>
            <br />
            Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig,
            sofern nichts anderes vereinbart ist. Bei Verzug gelten die gesetzlichen Regelungen.
          </p>
          <p className="mb-4">
            <strong>3.3 Anzahlung</strong>
            <br />
            Der Auftragnehmer ist berechtigt, bei Auftragserteilung eine Anzahlung in Höhe von bis
            zu 40% des Auftragswerts zu verlangen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Lieferung und Leistung</h2>
          <p className="mb-4">
            <strong>4.1 Liefertermine</strong>
            <br />
            Liefertermine sind nur verbindlich, wenn sie schriftlich als solche vereinbart wurden.
            Die Einhaltung von Lieferfristen setzt die rechtzeitige Erfüllung der
            Vertragspflichten durch den Auftraggeber voraus.
          </p>
          <p className="mb-4">
            <strong>4.2 Höhere Gewalt</strong>
            <br />
            Bei Eintritt höherer Gewalt, Arbeitskampfmaßnahmen, Unruhen, behördlichen Maßnahmen und
            sonstigen unvorhersehbaren, unabwendbaren und schwerwiegenden Ereignissen ist der
            Auftragnehmer berechtigt, die Leistung um die Dauer der Behinderung zuzüglich einer
            angemessenen Anlaufzeit hinauszuschieben.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Gewährleistung</h2>
          <p className="mb-4">
            <strong>5.1 Mängelanzeige</strong>
            <br />
            Der Auftraggeber hat die Leistung unverzüglich nach Abnahme auf offensichtliche Mängel
            zu untersuchen und diese unverzüglich schriftlich anzuzeigen. Nicht rechtzeitig
            angezeigte Mängel gelten als genehmigt.
          </p>
          <p className="mb-4">
            <strong>5.2 Gewährleistungsfrist</strong>
            <br />
            Die Gewährleistungsfrist beträgt 2 Jahre ab Abnahme der Leistung, sofern nicht
            gesetzlich längere Fristen zwingend vorgeschrieben sind.
          </p>
          <p className="mb-4">
            <strong>5.3 Nacherfüllung</strong>
            <br />
            Der Auftragnehmer ist bei berechtigten Mängelrügen zunächst zur Nacherfüllung nach
            seiner Wahl berechtigt. Schlägt die Nacherfüllung fehl, kann der Auftraggeber nach seiner
            Wahl Minderung verlangen oder vom Vertrag zurücktreten.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Haftung</h2>
          <p className="mb-4">
            <strong>6.1 Haftungsausschluss</strong>
            <br />
            Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für die
            Verletzung von Leben, Körper und Gesundheit. Bei leichter Fahrlässigkeit haftet der
            Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalspflichten).
          </p>
          <p className="mb-4">
            <strong>6.2 Haftungsbeschränkung</strong>
            <br />
            Die Haftung für leichte Fahrlässigkeit ist der Höhe nach begrenzt auf den
            vorhersehbaren, vertragstypischen Schaden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Eigentumsvorbehalt</h2>
          <p className="mb-4">
            Gelieferte Waren bleiben bis zur vollständigen Bezahlung aller Forderungen aus der
            Geschäftsbeziehung Eigentum des Auftragnehmers. Der Auftraggeber ist verpflichtet, die
            Vorbehaltsware pfleglich zu behandeln.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Wartungsverträge</h2>
          <p className="mb-4">
            <strong>8.1 Leistungsumfang</strong>
            <br />
            Der Umfang der Wartungsleistungen ergibt sich aus der jeweils gültigen
            Wartungsvereinbarung. Nicht im Wartungsvertrag enthaltene Leistungen werden gesondert
            nach Aufwand berechnet.
          </p>
          <p className="mb-4">
            <strong>8.2 Laufzeit</strong>
            <br />
            Wartungsverträge werden in der Regel für die Dauer von einem Jahr abgeschlossen und
            verlängern sich automatisch um jeweils ein weiteres Jahr, sofern sie nicht 3 Monate vor
            Ablauf gekündigt werden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Notdienst</h2>
          <p className="mb-4">
            Notdiensteinsätze werden nach Aufwand berechnet. Für Einsätze außerhalb der regulären
            Geschäftszeiten (werktags 8-17 Uhr) sowie an Sonn- und Feiertagen gelten erhöhte Sätze
            gemäß Preisliste.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Datenschutz</h2>
          <p className="mb-4">
            Der Auftragnehmer verpflichtet sich, alle im Rahmen der Geschäftsbeziehung bekannt
            gewordenen personenbezogenen Daten gemäß den geltenden Datenschutzbestimmungen zu
            behandeln. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Schlussbestimmungen</h2>
          <p className="mb-4">
            <strong>11.1 Gerichtsstand</strong>
            <br />
            Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit
            diesem Vertrag ist Augsburg, sofern der Auftraggeber Kaufmann, juristische Person des
            öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
          </p>
          <p className="mb-4">
            <strong>11.2 Anwendbares Recht</strong>
            <br />
            Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des
            UN-Kaufrechts.
          </p>
          <p className="mb-4">
            <strong>11.3 Salvatorische Klausel</strong>
            <br />
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
            Wirksamkeit der übrigen Bestimmungen hiervon unberührt. Die unwirksame Bestimmung ist
            durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen
            Bestimmung am nächsten kommt.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg mt-12">
          <p className="text-sm text-slate-600">
            <strong>Hinweis:</strong> Dies sind Muster-AGB. Für den produktiven Einsatz müssen diese
            durch einen Fachanwalt für Handels- und Gesellschaftsrecht geprüft und an die
            spezifischen Geschäftsprozesse des Unternehmens angepasst werden.
          </p>
        </div>

        <p className="text-sm text-slate-500 mt-8">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </div>
    </div>
  );
}
