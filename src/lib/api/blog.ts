/**
 * Blog API - Odoo CMS Integration
 *
 * This module handles fetching blog posts from Odoo CMS and transforming them
 * for use in the Next.js application.
 */

// import { odooApi } from './odoo'; // TODO: Uncomment when Odoo API is ready

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string;
  date: string;
  readingTime: number;
  image?: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
}

/**
 * Calculate reading time based on content length
 * Average reading speed: 200 words per minute
 * TODO: Use this when implementing actual content calculation
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

/**
 * Clean and transform HTML content from Odoo
 * TODO: Use this when processing actual Odoo content
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transformOdooContent(htmlContent: string): string {
  // Remove Odoo-specific classes and inline styles
  let cleaned = htmlContent
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/<o_[^>]*>/g, '')
    .replace(/<\/o_[^>]*>/g, '');

  // Ensure proper heading hierarchy
  cleaned = cleaned
    .replace(/<h1/g, '<h2')
    .replace(/<\/h1>/g, '</h2>');

  return cleaned;
}

/**
 * Fetch all blog posts from Odoo
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // TODO: Replace with actual Odoo API call
    // const response = await odooApi.searchRead('blog.post', [
    //   ['website_published', '=', true]
    // ], ['id', 'name', 'subtitle', 'content', 'blog_id', 'author_id', 'create_date', 'cover_properties', 'tag_ids']);

    // For now, return mock data
    return getMockBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts from Odoo:', error);
    // Fallback to mock data on error
    return getMockBlogPosts();
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // TODO: Replace with actual Odoo API call
    // const response = await odooApi.searchRead('blog.post', [
    //   ['website_url', 'ilike', slug],
    //   ['website_published', '=', true]
    // ], ['*']);

    const posts = getMockBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch blog posts by category
 */
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    // TODO: Replace with actual Odoo API call
    const posts = getMockBlogPosts();
    return posts.filter(post =>
      post.category.toLowerCase().replace(/\s+/g, '-').replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe') === categorySlug
    );
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Fetch all blog categories
 */
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    // TODO: Replace with actual Odoo API call
    return getMockCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return getMockCategories();
  }
}

/**
 * Get related posts based on tags and category
 */
export async function getRelatedPosts(postId: number, limit: number = 3): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts();
    const currentPost = allPosts.find(p => p.id === postId);

    if (!currentPost) return [];

    // Find posts with matching tags or category
    const related = allPosts
      .filter(post => post.id !== postId)
      .map(post => {
        let score = 0;
        if (post.category === currentPost.category) score += 2;
        const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
        score += commonTags.length;
        return { post, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);

    return related;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

/**
 * Mock data for development
 * TODO: Remove when Odoo integration is complete
 */
function getMockBlogPosts(): BlogPost[] {
  return [
    {
      id: 1,
      slug: 'waermepumpe-kosten-2025',
      title: 'Wärmepumpe Kosten 2025: Kompletter Überblick',
      excerpt: 'Was kostet eine Wärmepumpe 2025 wirklich? Alle Kosten, Förderungen und versteckte Ausgaben im Detail erklärt.',
      content: `
        <h2>Wärmepumpe Kosten 2025: Der komplette Überblick</h2>

        <p>Die Entscheidung für eine Wärmepumpe ist eine Investition in die Zukunft. Doch was kostet eine Wärmepumpe 2025 wirklich? In diesem umfassenden Ratgeber erfahren Sie alle Details zu Anschaffungskosten, Installation, Betrieb und staatlicher Förderung.</p>

        <h3>Anschaffungs- und Installationskosten im Detail</h3>

        <p>Die Gesamtkosten für eine Wärmepumpe inklusive Installation liegen 2025 zwischen <strong>27.000 und 50.000 Euro</strong>. Eine aktuelle Studie mit 160 Angeboten in Rheinland-Pfalz ergab einen durchschnittlichen Mittelwert von 36.300 Euro.</p>

        <h4>Kosten nach Wärmepumpen-Typ:</h4>

        <ul>
          <li><strong>Luft-Wasser-Wärmepumpe:</strong> 27.000 - 40.000 € (am häufigsten installiert, keine Erdarbeiten nötig)</li>
          <li><strong>Sole-Wasser-Wärmepumpe (Erdwärme):</strong> 40.000 - 50.000 € (inkl. Erdbohrung oder Erdkollektoren)</li>
          <li><strong>Wasser-Wasser-Wärmepumpe:</strong> 40.000 - 50.000 € (inkl. Brunnenbohrung)</li>
        </ul>

        <h3>Was ist in den Kosten enthalten?</h3>

        <p>Die Gesamtkosten setzen sich aus mehreren Komponenten zusammen:</p>

        <ul>
          <li>Wärmepumpen-Gerät (Außen- und Inneneinheit)</li>
          <li>Professionelle Installation durch zertifizierte Fachbetriebe</li>
          <li>Hydraulischer Abgleich des Heizsystems</li>
          <li>Demontage und fachgerechte Entsorgung der alten Heizung</li>
          <li>Inbetriebnahme und Einweisung</li>
          <li>Warmwasserspeicher (falls erforderlich)</li>
        </ul>

        <h3>BEG Förderung 2025: Bis zu 70% Zuschuss</h3>

        <p>Die Bundesförderung für effiziente Gebäude (BEG) macht Wärmepumpen deutlich erschwinglicher. Die Förderung wird über die KfW beantragt.</p>

        <h4>Fördersätze im Detail:</h4>

        <ul>
          <li><strong>30% Grundförderung:</strong> Für jeden, der eine mindestens 2 Jahre alte Heizung gegen eine Wärmepumpe tauscht</li>
          <li><strong>20% Klimageschwindigkeits-Bonus:</strong> Für selbstnutzende Eigentümer beim Austausch von Öl-, Gasetagen-, Kohle- und Nachtspeicheröfen sowie 20 Jahre alten Gas- und Biomasseheizungen (bis Ende 2028)</li>
          <li><strong>30% Einkommensbonus:</strong> Für selbstnutzende Eigentümer mit zu versteuerndem Jahreseinkommen bis 40.000 Euro</li>
          <li><strong>5% Effizienzbonus:</strong> Für Wärmepumpen mit natürlichem Kältemittel</li>
        </ul>

        <p><strong>Maximale Förderung:</strong> Bis zu 70% der Investitionskosten, maximal 21.000 Euro (bei förderfähigen Kosten von 30.000 Euro).</p>

        <h3>Kosten nach Förderung: Praxisbeispiele</h3>

        <p>Mit der BEG-Förderung reduzieren sich die Netto-Kosten erheblich:</p>

        <ul>
          <li><strong>Beispiel 1:</strong> Luft-Wasser-Wärmepumpe für 30.000 € mit 40% Förderung (Grundförderung + Geschwindigkeitsbonus) = <strong>18.000 € Eigenanteil</strong></li>
          <li><strong>Beispiel 2:</strong> Gleiche Wärmepumpe mit 70% Förderung (alle Boni) = <strong>9.000 € Eigenanteil</strong></li>
        </ul>

        <h3>Betriebskosten: Was kommt laufend auf Sie zu?</h3>

        <p>Neben den Anschaffungskosten sind die Betriebskosten entscheidend:</p>

        <ul>
          <li><strong>Stromkosten:</strong> Ca. 1.800 € pro Jahr für eine vierköpfige Familie im Einfamilienhaus</li>
          <li><strong>Wartung:</strong> 150-300 € jährlich (deutlich günstiger als bei Gas-/Ölheizungen)</li>
          <li><strong>Schornsteinfeger:</strong> Entfällt komplett</li>
        </ul>

        <p>Bei einem Strompreis von 30 Cent/kWh und einer Jahresarbeitszahl (JAZ) von 3,5 ergeben sich Heizkosten von etwa 5-6 Cent pro kWh Wärme – deutlich günstiger als Gas (10-12 Cent/kWh) oder Öl (12-15 Cent/kWh).</p>

        <h3>Versteckte Kosten, die Sie einplanen sollten</h3>

        <p>Folgende Zusatzkosten können anfallen:</p>

        <ul>
          <li><strong>Starkstromanschluss:</strong> 500-2.000 € (falls nicht vorhanden)</li>
          <li><strong>Optimierung des Heizsystems:</strong> 2.000-5.000 € (z.B. größere Heizkörper für Niedertemperaturbetrieb)</li>
          <li><strong>Dämmungsmaßnahmen:</strong> Bei Altbauten für optimale Effizienz empfohlen</li>
          <li><strong>Warmwasserspeicher:</strong> 1.000-3.000 € (falls Ersatz nötig)</li>
          <li><strong>Smart Home Integration:</strong> 500-1.500 € (optional, aber sinnvoll)</li>
        </ul>

        <h3>Langfristige Einsparungen und Wirtschaftlichkeit</h3>

        <p>Trotz höherer Anschaffungskosten amortisiert sich eine Wärmepumpe durch:</p>

        <ul>
          <li>Niedrigere Heizkosten (50-70% Ersparnis gegenüber Öl/Gas)</li>
          <li>Minimale Wartungskosten</li>
          <li>Keine Brennstoffkosten oder Preisschwankungen</li>
          <li>Wertsteigerung der Immobilie</li>
          <li>Zukunftssicherheit durch Erfüllung des GEG</li>
        </ul>

        <p><strong>Amortisationszeit:</strong> Mit Förderung in der Regel 8-12 Jahre, ohne Förderung 15-20 Jahre.</p>

        <h3>Fazit: Lohnt sich eine Wärmepumpe 2025?</h3>

        <p>Mit der aktuellen BEG-Förderung von bis zu 70% sind Wärmepumpen 2025 so attraktiv wie nie zuvor. Die Kombination aus hoher Förderung, niedrigen Betriebskosten und steigenden Preisen für fossile Brennstoffe macht die Investition wirtschaftlich sinnvoll.</p>

        <p><strong>Wichtig:</strong> Die Förderung läuft 2025 weiter, doch politische Diskussionen über mögliche Kürzungen machen schnelles Handeln ratsam. Der Klimageschwindigkeits-Bonus läuft Ende 2028 aus.</p>

        <h3>Nächste Schritte</h3>

        <p>Lassen Sie sich von HeizCenter kostenlos und unverbindlich beraten. Wir erstellen Ihnen ein individuelles Angebot und unterstützen Sie bei der Förderantragstellung – für maximale Kostentransparenz von Anfang an.</p>
      `,
      category: 'Wärmepumpe',
      author: 'Thomas Müller',
      authorBio: 'Heizungsexperte mit über 15 Jahren Erfahrung in der Wärmepumpen-Installation.',
      date: '2025-11-10',
      readingTime: 8,
      image: '/images/Waermepumpe.jpeg',
      tags: ['Wärmepumpe', 'Kosten', 'Förderung', 'BEG'],
      featured: true,
    },
    {
      id: 2,
      slug: 'heizungsgesetz-2024',
      title: 'Heizungsgesetz 2024: Das gilt jetzt für Hausbesitzer',
      excerpt: 'Alle wichtigen Änderungen durch das neue Heizungsgesetz 2024. Was müssen Sie beachten?',
      content: `
        <h2>Heizungsgesetz 2024 (GEG): Was Hausbesitzer jetzt wissen müssen</h2>

        <p>Das Gebäudeenergiegesetz (GEG), umgangssprachlich "Heizungsgesetz", ist seit dem 1. Januar 2024 in Kraft. Es regelt, unter welchen Bedingungen Heizungen ausgetauscht werden müssen und welche Anforderungen neue Heizungen erfüllen müssen. Dieser Ratgeber erklärt alle wichtigen Regelungen verständlich.</p>

        <h3>Die Kernregelung: 65% erneuerbare Energien</h3>

        <p>Ab dem 1. Januar 2024 dürfen <strong>nur noch Heizungen neu in Betrieb genommen werden, deren Wärmequellen langfristig aus mindestens 65 Prozent erneuerbaren Energien bestehen</strong>.</p>

        <p>Das bedeutet: Beim Einbau einer neuen Heizung müssen Sie künftig sicherstellen, dass mindestens 65% der erzeugten Wärme aus erneuerbaren Energiequellen stammt.</p>

        <h3>Wen betrifft das Heizungsgesetz – und ab wann?</h3>

        <h4>Sofort betroffen (seit 1. Januar 2024):</h4>

        <ul>
          <li><strong>Neubauten in Neubaugebieten:</strong> Hier gilt die 65%-Regel ab sofort ohne Übergangsfristen</li>
        </ul>

        <h4>Zeitversetzte Umsetzung für Bestandsgebäude:</h4>

        <p>Für bestehende Gebäude und andere Neubauten greift die Pflicht erst, wenn am Wohnort eine kommunale Wärmeplanung durchgeführt wurde:</p>

        <ul>
          <li><strong>Großstädte (>100.000 Einwohner):</strong> Ab Mitte 2026</li>
          <li><strong>Kleinere Kommunen:</strong> Ab Mitte 2028</li>
        </ul>

        <p>Bis dahin können Sie auch weiterhin konventionelle Gas- oder Ölheizungen einbauen – allerdings mit steigenden Anforderungen an den Anteil erneuerbarer Energien ab 2029.</p>

        <h3>Bestandsschutz: Ihre alte Heizung darf bleiben</h3>

        <p>Gute Nachrichten für Bestandsheizungen:</p>

        <ul>
          <li><strong>Keine Austauschpflicht</strong> für bestehende Heizungen unter 30 Jahren</li>
          <li>Bestehende Heizungen dürfen weiterbetrieben und <strong>repariert</strong> werden</li>
          <li>Erst bei einem Totalausfall ("Havarie") besteht Handlungsbedarf</li>
          <li>Heizungen über 30 Jahre müssen in der Regel ausgetauscht werden (Ausnahmen für selbstnutzende Eigentümer seit mindestens Februar 2002)</li>
        </ul>

        <h3>Übergangsfristen bei Heizungsausfall</h3>

        <p>Fällt Ihre Heizung komplett aus, haben Sie mehrere Optionen:</p>

        <ul>
          <li><strong>Reparatur ist weiterhin erlaubt</strong> – auch bei alten Gas-/Ölheizungen</li>
          <li><strong>Übergangsfrist von 5 Jahren</strong> für den Einbau einer 65%-EE-Heizung</li>
          <li>In dieser Zeit können auch konventionelle Heizungen als <strong>Übergangslösung</strong> eingebaut werden</li>
          <li>Bei akutem Notfall: Heizgeräte können zunächst übergangsweise installiert werden</li>
        </ul>

        <h3>Welche Heizungen erfüllen die 65%-Anforderung?</h3>

        <p>Folgende Heizsysteme sind konform mit dem GEG:</p>

        <ul>
          <li><strong>Wärmepumpen</strong> (elektrisch betrieben, nutzen Umweltwärme)</li>
          <li><strong>Anschluss an ein Wärmenetz</strong> (Fernwärme mit erneuerbaren Quellen)</li>
          <li><strong>Biomasseheizungen</strong> (Pellet-, Hackschnitzel- oder Scheitholzheizung)</li>
          <li><strong>Hybridheizungen</strong> (Kombination aus erneuerbarer und konventioneller Technik, z.B. Wärmepumpe + Gasheizung)</li>
          <li><strong>Solarthermie-Heizungen</strong> (in Kombination mit anderen Systemen)</li>
          <li><strong>Gasheizungen mit grünem Wasserstoff</strong> oder Biomethan (mindestens 65%)</li>
        </ul>

        <h3>Stufenweise Anforderungen für Gas- und Ölheizungen</h3>

        <p>Wenn Sie ab 2024 noch eine Gas- oder Ölheizung einbauen (in Gemeinden ohne Wärmeplanung), gelten stufenweise steigende Anforderungen:</p>

        <ul>
          <li><strong>Ab 1. Januar 2029:</strong> Mindestens 15% erneuerbare Energien</li>
          <li><strong>Ab 1. Januar 2035:</strong> Mindestens 30% erneuerbare Energien</li>
          <li><strong>Ab 1. Januar 2040:</strong> Mindestens 60% erneuerbare Energien</li>
          <li><strong>Ab 1. Januar 2045:</strong> 100% erneuerbare Energien (Klimaneutralität)</li>
        </ul>

        <h3>Verpflichtende Beratung vor dem Heizungstausch</h3>

        <p>Neu seit 2024: Vor dem Einbau einer Heizungsanlage, die mit flüssigen oder gasförmigen Brennstoffen betrieben wird (Gas/Öl), ist eine <strong>verpflichtende Beratung</strong> vorgeschrieben.</p>

        <p>Die Beratung muss aufklären über:</p>

        <ul>
          <li>Auswirkungen der kommunalen Wärmeplanung</li>
          <li>Verfügbare erneuerbare Alternativen</li>
          <li>Wirtschaftlichkeit verschiedener Heizsysteme</li>
          <li>Fördermöglichkeiten</li>
        </ul>

        <h3>Ausnahmen und Sonderregelungen</h3>

        <p>Das Gesetz sieht Ausnahmen vor für:</p>

        <ul>
          <li><strong>Gebäude unter Denkmalschutz:</strong> Individuelle Lösungen möglich</li>
          <li><strong>Technisch unmögliche Umsetzung:</strong> Z.B. bei Platzproblemen oder statischen Einschränkungen</li>
          <li><strong>Unbillige Härte:</strong> Wenn die Kosten in keinem Verhältnis zum Gebäudewert stehen</li>
          <li><strong>Eigentümer über 80 Jahre:</strong> Keine Austauschpflicht beim Eigentümerwechsel</li>
        </ul>

        <h3>Finanzielle Unterstützung: BEG-Förderung</h3>

        <p>Die Bundesregierung unterstützt den Umstieg mit der BEG-Förderung:</p>

        <ul>
          <li>Bis zu <strong>70% Zuschuss</strong> für den Heizungstausch</li>
          <li>Ergänzende <strong>KfW-Kredite</strong> mit Zinsverbilligungen</li>
          <li>Zusätzliche Boni für schnellen Austausch und niedrige Einkommen</li>
        </ul>

        <h3>Was sollten Hausbesitzer jetzt tun?</h3>

        <p>Unsere Empfehlungen:</p>

        <ol>
          <li><strong>Status quo prüfen:</strong> Wie alt ist Ihre Heizung? Wie ist ihr Zustand?</li>
          <li><strong>Kommunale Wärmeplanung abwarten:</strong> Informieren Sie sich bei Ihrer Gemeinde über den Stand der Wärmeplanung</li>
          <li><strong>Beratung einholen:</strong> Lassen Sie sich von Fachbetrieben wie HeizCenter über passende Lösungen beraten</li>
          <li><strong>Förderung prüfen:</strong> Nutzen Sie die aktuell hohen Fördersätze</li>
          <li><strong>Langfristig planen:</strong> Auch wenn keine unmittelbare Pflicht besteht – der Umstieg lohnt sich wirtschaftlich</li>
        </ol>

        <h3>Fazit: Ruhe bewahren und strategisch planen</h3>

        <p>Das Heizungsgesetz 2024 ist kein Grund zur Panik. Für die meisten Hausbesitzer gibt es großzügige Übergangsfristen. Bestehende Heizungen genießen Bestandsschutz und dürfen repariert werden.</p>

        <p>Wer jedoch in den nächsten Jahren ohnehin einen Heizungstausch plant, sollte die aktuell hohe BEG-Förderung nutzen und direkt auf eine zukunftssichere Lösung wie eine Wärmepumpe setzen. So erfüllen Sie nicht nur die gesetzlichen Anforderungen, sondern profitieren auch von niedrigeren Heizkosten und steigender Unabhängigkeit von fossilen Brennstoffen.</p>

        <p><strong>HeizCenter berät Sie gerne</strong> zu allen Fragen rund um das Heizungsgesetz, passende Heizsysteme und maximale Förderung. Kontaktieren Sie uns für eine kostenlose Erstberatung.</p>
      `,
      category: 'Heizung',
      author: 'Sarah Schmidt',
      authorBio: 'Energieberaterin und Expertin für Gebäudesanierung mit Fokus auf erneuerbare Energien.',
      date: '2025-11-08',
      readingTime: 7,
      image: '/images/Heizung_Modernisierung.webp',
      tags: ['Heizungsgesetz', 'GEG', 'Erneuerbare Energien'],
      featured: true,
    },
    {
      id: 3,
      slug: 'beg-foerderung-2025',
      title: 'BEG Förderung 2025: Bis zu 70% Zuschuss für Ihre Heizung',
      excerpt: 'So beantragen Sie die BEG Förderung richtig. Alle Fördersätze, Voraussetzungen und Tipps.',
      content: `
        <h2>BEG Förderung 2025: Der komplette Leitfaden</h2>

        <p>Die Bundesförderung für effiziente Gebäude (BEG) ist das wichtigste Förderprogramm für den Heizungstausch in Deutschland. Mit bis zu 70% Zuschuss macht sie moderne, klimafreundliche Heizsysteme erschwinglich. Dieser Leitfaden erklärt alle Fördersätze, Voraussetzungen und den Antragsprozess.</p>

        <h3>Was ist die BEG-Förderung?</h3>

        <p>Die BEG (Bundesförderung für effiziente Gebäude) ist ein Förderprogramm der Bundesregierung, das den Austausch alter, fossiler Heizungen gegen klimafreundliche Alternativen finanziell unterstützt. Die Förderung wird seit 2024 über die <strong>KfW (Kreditanstalt für Wiederaufbau)</strong> beantragt – nicht mehr über das BAFA.</p>

        <h3>Fördersätze 2025: Bis zu 70% sind möglich</h3>

        <p>Die BEG-Förderung setzt sich aus mehreren Komponenten zusammen, die kombiniert werden können:</p>

        <h4>1. Grundförderung (30%)</h4>

        <p>Die Basisförderung von <strong>30%</strong> erhält jeder Antragsteller, der:</p>

        <ul>
          <li>Eine mindestens 2 Jahre alte Heizung gegen eine förderfähige Wärmepumpe austauscht</li>
          <li>In einem selbstgenutzten oder vermieteten Wohngebäude installiert</li>
          <li>Alle technischen Mindestanforderungen erfüllt</li>
        </ul>

        <h4>2. Klimageschwindigkeits-Bonus (20%)</h4>

        <p>Zusätzliche <strong>20%</strong> Förderung erhalten selbstnutzende Eigentümer für den Austausch folgender Heizungen:</p>

        <ul>
          <li>Ölheizungen (unabhängig vom Alter)</li>
          <li>Gasetagen- und Gasetagenheizungen</li>
          <li>Kohleheizungen und Nachtspeicheröfen</li>
          <li>Gas- und Biomasseheizungen, die über 20 Jahre alt sind</li>
        </ul>

        <p><strong>Wichtig:</strong> Dieser Bonus läuft bis Ende 2028. Ab 2029 reduziert er sich und läuft schrittweise aus – schnelles Handeln lohnt sich!</p>

        <h4>3. Einkommensbonus (30%)</h4>

        <p>Haushalte mit einem zu versteuernden <strong>Jahreseinkommen bis 40.000 Euro</strong> erhalten weitere <strong>30% Förderung</strong>.</p>

        <p>Dieser Bonus gilt nur für selbstnutzende Eigentümer und ist auf eine Wohneinheit begrenzt.</p>

        <h4>4. Effizienzbonus (5%)</h4>

        <p>Für besonders effiziente Wärmepumpen mit <strong>natürlichem Kältemittel</strong> (z.B. Propan R290) gibt es zusätzliche <strong>5% Förderung</strong>.</p>

        <p>Dieser Bonus ist mit allen anderen Boni kombinierbar.</p>

        <h3>Maximale Förderung: Rechenbeispiele</h3>

        <p><strong>Maximale Fördersumme:</strong> Die Förderung beträgt maximal <strong>70% der förderfähigen Kosten</strong>, höchstens jedoch <strong>21.000 Euro</strong> (bei max. förderfähigen Investitionskosten von 30.000 Euro).</p>

        <h4>Beispiel 1: Standardförderung (50%)</h4>

        <ul>
          <li>Grundförderung: 30%</li>
          <li>Geschwindigkeitsbonus: 20%</li>
          <li><strong>Gesamt: 50%</strong></li>
          <li>Bei 30.000 € Investition: <strong>15.000 € Zuschuss</strong></li>
        </ul>

        <h4>Beispiel 2: Maximalförderung (70%)</h4>

        <ul>
          <li>Grundförderung: 30%</li>
          <li>Geschwindigkeitsbonus: 20%</li>
          <li>Einkommensbonus: 30%</li>
          <li>Effizienzbonus: 5% (wird begrenzt auf Gesamtförderung von 70%)</li>
          <li><strong>Gesamt: 70% (gedeckelt)</strong></li>
          <li>Bei 30.000 € Investition: <strong>21.000 € Zuschuss</strong></li>
          <li><strong>Eigenanteil: Nur 9.000 €</strong></li>
        </ul>

        <h3>Welche Heizungen werden gefördert?</h3>

        <p>Förderfähig sind:</p>

        <ul>
          <li><strong>Elektrische Wärmepumpen:</strong> Luft-Wasser, Sole-Wasser, Wasser-Wasser</li>
          <li><strong>Biomasseheizungen:</strong> Pellet-, Hackschnitzel-, Scheitholzheizungen</li>
          <li><strong>Solarthermieanlagen</strong> (als Ergänzung)</li>
          <li><strong>Innovative Heizungstechnik</strong> auf Basis erneuerbarer Energien</li>
          <li><strong>Brennstoffzellenheizungen</strong></li>
          <li><strong>Anschluss an ein Gebäudenetz/Wärmenetz</strong></li>
        </ul>

        <p><strong>Nicht förderfähig:</strong> Reine Gas- und Ölheizungen (auch nicht in Hybridlösungen mit <65% EE-Anteil)</p>

        <h3>Technische Mindestanforderungen für Wärmepumpen</h3>

        <p>Damit Ihre Wärmepumpe förderfähig ist, muss sie folgende Kriterien erfüllen:</p>

        <ul>
          <li><strong>Jahresarbeitszahl (JAZ):</strong> Mindestens 2,7 (Luft-WP) bzw. 3,8 (Sole/Wasser-WP)</li>
          <li><strong>Listen-Aufnahme:</strong> Aufführung in der BAFA-Förderliste</li>
          <li><strong>Fachbetrieb:</strong> Installation durch zertifizierten Fachbetrieb</li>
          <li><strong>Hydraulischer Abgleich:</strong> Muss durchgeführt werden</li>
          <li><strong>Energieeffizienzlabel:</strong> Mindestens A+ (bei 35°C Vorlauftemperatur)</li>
        </ul>

        <h3>Der Antragsprozess: Schritt für Schritt</h3>

        <h4>1. Vor Beginn der Maßnahme</h4>

        <ul>
          <li>Holen Sie Angebote von Fachbetrieben ein (z.B. HeizCenter)</li>
          <li>Prüfen Sie, ob das geplante System förderfähig ist</li>
          <li><strong>Wichtig:</strong> Unterschreiben Sie noch keinen Vertrag! Der Antrag muss <strong>vor</strong> Vertragsabschluss gestellt werden</li>
        </ul>

        <h4>2. Antragstellung bei der KfW</h4>

        <ul>
          <li>Registrieren Sie sich im <strong>KfW-Zuschussportal</strong></li>
          <li>Füllen Sie den Online-Antrag aus</li>
          <li>Laden Sie erforderliche Dokumente hoch (Angebote, Nachweise)</li>
          <li>Sie erhalten eine <strong>Zusage mit Fördernummer</strong></li>
        </ul>

        <h4>3. Beauftragung und Umsetzung</h4>

        <ul>
          <li><strong>Erst nach Antragsbewilligung</strong> dürfen Sie den Auftrag erteilen</li>
          <li>Der Fachbetrieb führt die Installation durch</li>
          <li>Inbetriebnahme und Abnahme der Anlage</li>
        </ul>

        <h4>4. Verwendungsnachweis und Auszahlung</h4>

        <ul>
          <li>Laden Sie Rechnungen und Nachweise im KfW-Portal hoch</li>
          <li>Fachunternehmerbestätigung über ordnungsgemäße Installation</li>
          <li>Die KfW prüft die Unterlagen</li>
          <li><strong>Auszahlung</strong> des Zuschusses auf Ihr Konto (in der Regel innerhalb von 4-8 Wochen)</li>
        </ul>

        <h3>Wichtige Fristen und Hinweise</h3>

        <ul>
          <li><strong>Antragstellung vor Vorhabenbeginn:</strong> Maßgeblich ist der Vertragsabschluss – nicht der Baubeginn</li>
          <li><strong>Planungsleistungen sind erlaubt:</strong> Angebotserstellung und Energieberatung dürfen vor Antragstellung erfolgen</li>
          <li><strong>Bewilligungszeitraum:</strong> Die Maßnahme muss innerhalb des bewilligten Zeitraums abgeschlossen werden (in der Regel 36 Monate)</li>
          <li><strong>Verwendungsnachweis:</strong> Muss innerhalb von 6 Monaten nach Abschluss der Maßnahme eingereicht werden</li>
        </ul>

        <h3>Ergänzende Förderung: KfW-Kredit 261</h3>

        <p>Zusätzlich zum Zuschuss können Sie einen <strong>zinsgünstigen Kredit (KfW 261)</strong> beantragen:</p>

        <ul>
          <li>Kreditsumme: Bis zu 150.000 € pro Wohneinheit</li>
          <li>Zinsvergünstigung durch den Bund</li>
          <li>Kombinierbar mit dem BEG-Zuschuss</li>
          <li>Ideal für umfassende Sanierungen</li>
        </ul>

        <h3>Häufige Fehler vermeiden</h3>

        <p>Folgende Fehler führen oft zur Ablehnung oder Kürzung der Förderung:</p>

        <ul>
          <li><strong>Zu früher Vertragsabschluss:</strong> Immer erst Antrag stellen, dann Vertrag unterschreiben</li>
          <li><strong>Unvollständige Unterlagen:</strong> Achten Sie auf vollständige Nachweise</li>
          <li><strong>Nicht gelistete Geräte:</strong> Prüfen Sie vorab die BAFA-Liste</li>
          <li><strong>Fehlender hydraulischer Abgleich:</strong> Ist Pflicht für die Förderung</li>
          <li><strong>Falsche Einkommen-Nachweise:</strong> Beim Einkommensbonus exakte Nachweise erbringen</li>
        </ul>

        <h3>Ausblick 2025 und darüber hinaus</h3>

        <p>Die BEG-Förderung läuft 2025 weiter, jedoch mit Unsicherheiten:</p>

        <ul>
          <li><strong>Geschwindigkeitsbonus läuft 2028 aus</strong> – jetzt profitieren!</li>
          <li>Politische Diskussionen über mögliche Kürzungen</li>
          <li>Budget-Beschränkungen können zu Antragsengpässen führen</li>
          <li><strong>Empfehlung:</strong> Nicht zu lange warten, aktuelle Fördersätze nutzen</li>
        </ul>

        <h3>Fazit: Maximale Förderung sichern</h3>

        <p>Mit der BEG-Förderung 2025 wird der Umstieg auf eine klimafreundliche Heizung deutlich erschwinglicher. Bei optimaler Ausnutzung aller Boni können Sie bis zu 70% der Investitionskosten als Zuschuss erhalten.</p>

        <p><strong>Wichtig:</strong> Eine professionelle Beratung und sorgfältige Antragstellung sind entscheidend für den Fördererfolg. HeizCenter unterstützt Sie bei jedem Schritt – von der Planung über die Antragstellung bis zur Auszahlung der Förderung.</p>

        <h3>HeizCenter: Ihr Partner für BEG-Förderung</h3>

        <p>Wir bieten:</p>

        <ul>
          <li>Kostenlose Erstberatung zur Fördermöglichkeiten</li>
          <li>Unterstützung bei der Antragstellung</li>
          <li>Fachgerechte Installation durch zertifizierte Fachbetriebe</li>
          <li>Alle erforderlichen Nachweise und Dokumentationen</li>
          <li>Garantiert förderfähige Systeme</li>
        </ul>

        <p>Kontaktieren Sie uns jetzt und sichern Sie sich Ihre maximale Förderung für 2025!</p>
      `,
      category: 'Förderung',
      author: 'Michael Weber',
      authorBio: 'Fördermittelberater mit Spezialisierung auf energetische Gebäudesanierung.',
      date: '2025-11-05',
      readingTime: 12,
      image: '/images/Heizung_Modernisierung.webp',
      tags: ['BEG', 'Förderung', 'Zuschuss', 'KfW', 'BAFA'],
      featured: false,
    },
  ];
}

function getMockCategories(): BlogCategory[] {
  return [
    {
      id: 1,
      slug: 'waermepumpe',
      name: 'Wärmepumpe',
      description: 'Alles über Wärmepumpen: Kosten, Arten, Installation, Förderung und Betrieb.',
      count: 1,
    },
    {
      id: 2,
      slug: 'heizung',
      name: 'Heizung',
      description: 'Ratgeber zu allen Heizungssystemen, Wartung, Modernisierung und Heizungsgesetz.',
      count: 1,
    },
    {
      id: 3,
      slug: 'sanitaer',
      name: 'Sanitär & Bad',
      description: 'Tipps zur Badsanierung, Sanitärinstallation und barrierefreiem Wohnen.',
      count: 0,
    },
    {
      id: 4,
      slug: 'klimaanlage',
      name: 'Klimaanlage',
      description: 'Alles über Klimaanlagen: Split-Systeme, Installation, Kosten und Energieeffizienz.',
      count: 0,
    },
    {
      id: 5,
      slug: 'foerderung',
      name: 'Förderung',
      description: 'Aktuelle Förderprogramme, BEG, KfW-Kredite und Zuschüsse für Ihre Sanierung.',
      count: 1,
    },
  ];
}
