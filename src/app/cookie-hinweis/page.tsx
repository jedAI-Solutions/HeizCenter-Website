import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie-Hinweis | HeizCenter",
  description: "Informationen zur Verwendung von Cookies auf der HeizCenter Website.",
  robots: "noindex, nofollow",
};

export default function CookieHinweisPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold mb-8">Cookie-Hinweis</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Was sind Cookies?</h2>
          <p className="mb-4">
            Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Computer,
            Tablet oder Smartphone gespeichert werden. Cookies enthalten Informationen, die bei
            einem erneuten Besuch der Website wieder abgerufen werden können.
          </p>
          <p className="mb-4">
            Es gibt verschiedene Arten von Cookies:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              <strong>Session-Cookies:</strong> Temporäre Cookies, die nach dem Schließen des
              Browsers automatisch gelöscht werden
            </li>
            <li>
              <strong>Permanente Cookies:</strong> Cookies, die für eine bestimmte Zeitdauer auf
              Ihrem Gerät gespeichert bleiben
            </li>
            <li>
              <strong>Erstanbieter-Cookies:</strong> Cookies, die von der besuchten Website selbst
              gesetzt werden
            </li>
            <li>
              <strong>Drittanbieter-Cookies:</strong> Cookies, die von anderen Websites oder
              Diensten gesetzt werden
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Welche Cookies verwenden wir?</h2>

          <h3 className="text-xl font-bold mb-3">1. Technisch notwendige Cookies</h3>
          <p className="mb-4">
            Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht
            deaktiviert werden. Sie werden nur als Reaktion auf von Ihnen getätigte Aktionen
            gesetzt, wie z.B. das Setzen Ihrer Datenschutzeinstellungen, das Anmelden oder das
            Ausfüllen von Formularen.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie-Name</th>
                  <th className="text-left py-2">Zweck</th>
                  <th className="text-left py-2">Laufzeit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">cookie_consent</td>
                  <td className="py-2">Speichert Ihre Cookie-Einstellungen</td>
                  <td className="py-2">1 Jahr</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">session_id</td>
                  <td className="py-2">Identifiziert Ihre Browsersitzung</td>
                  <td className="py-2">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mb-3">2. Funktionale Cookies (optional)</h3>
          <p className="mb-4">
            Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung. Sie können von
            uns oder von Drittanbietern gesetzt werden, deren Dienste wir auf unseren Seiten
            verwenden. Wenn Sie diese Cookies nicht zulassen, funktionieren einige oder alle dieser
            Dienste möglicherweise nicht einwandfrei.
          </p>

          <h3 className="text-xl font-bold mb-3">3. Analyse-Cookies (optional)</h3>
          <p className="mb-4">
            Diese Cookies sammeln Informationen darüber, wie Besucher unsere Website nutzen. Alle
            Informationen, die diese Cookies sammeln, sind aggregiert und daher anonym. Wenn Sie
            diese Cookies nicht zulassen, wissen wir nicht, wann Sie unsere Website besucht haben.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2">
              <strong>Google Analytics (optional)</strong>
            </p>
            <p className="text-sm">
              Wir verwenden Google Analytics, um die Nutzung unserer Website zu analysieren. Die
              durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in
              der Regel an einen Server von Google übertragen und dort gespeichert. Ihre IP-Adresse
              wird dabei gekürzt (IP-Anonymisierung).
            </p>
          </div>

          <h3 className="text-xl font-bold mb-3">4. Marketing-Cookies (optional)</h3>
          <p className="mb-4">
            Diese Cookies können über unsere Website von unseren Werbepartnern gesetzt werden. Sie
            können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu
            erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen. Wenn Sie diese
            Cookies nicht zulassen, werden Sie nicht von zielgerichteter Werbung profitieren.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ihre Cookie-Einstellungen verwalten</h2>
          <p className="mb-4">
            Sie haben das Recht, Ihre Cookie-Einstellungen jederzeit zu ändern. Beim ersten Besuch
            unserer Website werden Sie gefragt, ob Sie der Verwendung von optionalen Cookies
            zustimmen möchten.
          </p>
          <p className="mb-4">
            <strong>Cookie-Einstellungen ändern:</strong>
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <p className="mb-4">
              Sie können Ihre Cookie-Einstellungen jederzeit über den Link "Cookie-Einstellungen" im
              Footer dieser Website ändern. Dort können Sie:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Ihre Zustimmung zu bestimmten Cookie-Kategorien widerrufen</li>
              <li>Detaillierte Informationen zu den verwendeten Cookies einsehen</li>
              <li>Ihre Einstellungen speichern und aktualisieren</li>
            </ul>
          </div>

          <p className="mb-4">
            <strong>Browser-Einstellungen:</strong>
          </p>
          <p className="mb-4">
            Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch so
            einstellen, dass er Cookies ablehnt oder Sie benachrichtigt, wenn Cookies gesendet
            werden. Bitte beachten Sie, dass einige Funktionen unserer Website möglicherweise nicht
            ordnungsgemäß funktionieren, wenn Sie Cookies deaktivieren.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2 font-bold">Cookies in verschiedenen Browsern verwalten:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Google Chrome:</strong> Einstellungen → Datenschutz und Sicherheit →
                Cookies und andere Websitedaten
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Einstellungen → Datenschutz & Sicherheit →
                Cookies und Website-Daten
              </li>
              <li>
                <strong>Safari:</strong> Einstellungen → Datenschutz → Cookies und Website-Daten
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Rechtsgrundlage</h2>
          <p className="mb-4">
            Die Verwendung technisch notwendiger Cookies erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an der Funktionsfähigkeit der Website).
          </p>
          <p className="mb-4">
            Die Verwendung optionaler Cookies (Funktional, Analyse, Marketing) erfolgt nur mit Ihrer
            ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 TTDSG. Sie können
            Ihre Einwilligung jederzeit widerrufen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Weitere Informationen</h2>
          <p className="mb-4">
            Detaillierte Informationen zum Datenschutz und zur Datenverarbeitung finden Sie in
            unserer{" "}
            <a href="/datenschutz" className="text-blue-600 hover:underline">
              Datenschutzerklärung
            </a>
            .
          </p>
          <p className="mb-4">
            Bei Fragen zur Verwendung von Cookies können Sie uns jederzeit unter{" "}
            <a href="mailto:datenschutz@heizcenter.de" className="text-blue-600 hover:underline">
              datenschutz@heizcenter.de
            </a>{" "}
            kontaktieren.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg mt-12">
          <p className="text-sm text-slate-600">
            <strong>Hinweis:</strong> Dies ist ein Muster-Cookie-Hinweis. Für den produktiven
            Einsatz muss dieser entsprechend der tatsächlich verwendeten Cookies und Dienste
            angepasst werden. Wir empfehlen die Verwendung einer Cookie-Consent-Management-Lösung.
          </p>
        </div>

        <p className="text-sm text-slate-500 mt-8">
          Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}
        </p>
      </div>
    </div>
  );
}
