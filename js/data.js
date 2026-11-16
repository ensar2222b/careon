/* Careon – field data, keywords, prompts. Loaded as a classic script (works from file://). */
window.Careon = window.Careon || {};

Careon.EXPERIENCE = [
  { key: "entry", label: "Berufseinstieg", hint: "Berufseinstieg oder Ausbildung/Studium" },
  { key: "junior", label: "1–3 Jahre", hint: "1–3 Jahre Berufserfahrung" },
  { key: "mid", label: "3–7 Jahre", hint: "3–7 Jahre Berufserfahrung" },
  { key: "senior", label: "7+ Jahre", hint: "mehr als sieben Jahre Erfahrung" },
  { key: "lead", label: "Führungsrolle", hint: "Führungserfahrung" }
];

Careon.REMOTE = [
  { key: "onsite", label: "Vor Ort" },
  { key: "hybrid", label: "Hybrid" },
  { key: "remote", label: "Remote" },
  { key: "flex", label: "Flexibel" }
];

Careon.CITIES = [
  "Berlin", "München", "Hamburg", "Köln", "Frankfurt",
  "Stuttgart", "Düsseldorf", "Leipzig", "Deutschlandweit"
];

/**
 * Each field: label, keywords (DE/EN, stems), suggested skills,
 * role titles with base score + relevant skills, CV tips, interview questions,
 * a short hook for the cover letter, and a salary orientation (Germany, gross).
 */
Careon.FIELDS = {
  it: {
    label: "IT & Software",
    keywords: ["it", "software", "entwickl", "programmier", "developer", "frontend", "backend", "fullstack", "full-stack", "informatik", "java", "python", "javascript", "typescript", "react", "angular", "vue", "node", "devops", "cloud", "aws", "azure", "kubernetes", "linux", "php", "dotnet", "c#", "golang", "app entwick", "webentwick"],
    skills: ["JavaScript", "TypeScript", "Python", "Java", "React", "SQL", "Cloud", "Git", "Testing"],
    titles: [
      { title: "Softwareentwickler/in", skills: ["javascript", "python", "java", "typescript", "react", "sql", "git"], base: 84, salary: "55–80 Tsd. €" },
      { title: "Frontend-Entwickler/in", skills: ["javascript", "typescript", "react", "angular", "vue", "css", "html"], base: 82, salary: "52–75 Tsd. €" },
      { title: "Backend-Entwickler/in", skills: ["java", "python", "node", "sql", "kotlin", "go", "c#"], base: 82, salary: "55–80 Tsd. €" },
      { title: "DevOps / Cloud Engineer", skills: ["devops", "aws", "azure", "kubernetes", "docker", "linux", "terraform"], base: 80, salary: "60–85 Tsd. €" },
      { title: "QA / Test Engineer", skills: ["testing", "cypress", "selenium", "qa", "automatisier"], base: 76, salary: "48–70 Tsd. €" }
    ],
    cvTips: [
      "Nenne konkrete Tech-Stacks und den eigenen Anteil an Produkten oder Tickets – nicht nur Aufgabenlisten.",
      "Quantifiziere, wo möglich: Lieferzeit, Fehlerrate, Last, Teamgröße.",
      "GitHub, Portfolio oder kurze Fallbeschreibungen sind oft hilfreicher als ein allgemeiner Fließtext.",
      "Zertifizierungen (Cloud, Sicherheit) nur anführen, wenn sie aktuell und zur Zielrolle passen."
    ],
    interview: [
      "Erzählen Sie von einem Vorhaben, das technisch schwierig war. Wie sind Sie vorgegangen?",
      "Wie stellen Sie die Qualität Ihres Codes sicher?",
      "Wie priorisieren Sie technische Schulden gegenüber neuen Funktionen?",
      "Beschreiben Sie eine Situation, in der Sie mit unklaren Anforderungen umgehen mussten."
    ],
    coverHook: "die Weiterentwicklung und den Betrieb belastbarer Software"
  },
  data: {
    label: "Daten & Analyse",
    keywords: ["data", "daten", "analyst", "analytics", "business intelligence", "bi ", "sql", "tableau", "power bi", "machine learning", "ml ", "ki", "künstliche intelligenz", "statistik", "data science", "data engineer", "etl", "spark", "warehouse"],
    skills: ["SQL", "Python", "Excel", "Power BI", "Tableau", "Statistik", "ETL"],
    titles: [
      { title: "Data Analyst", skills: ["sql", "excel", "tableau", "power bi", "python"], base: 84, salary: "50–72 Tsd. €" },
      { title: "Business Intelligence Analyst", skills: ["power bi", "tableau", "sql", "dax", "etl"], base: 82, salary: "52–75 Tsd. €" },
      { title: "Data Scientist", skills: ["python", "machine learning", "statistik", "sql", "ml"], base: 80, salary: "60–85 Tsd. €" },
      { title: "Data Engineer", skills: ["etl", "sql", "python", "spark", "airflow", "cloud"], base: 80, salary: "60–85 Tsd. €" }
    ],
    cvTips: [
      "Beschreibe Datensätze, Werkzeuge und die Entscheidung, die aus der Analyse folgte.",
      "Kennzahlen und Wirkung (Umsatz, Kosten, Prozesszeit) sind überzeugender als Tool-Listen allein.",
      "Dokumentiere Datenqualität, Datenschutz und Nachvollziehbarkeit, wenn sie zu deiner Arbeit gehörten.",
      "Für Data Science: trenne Experimente klar von produktiv eingesetzten Modellen."
    ],
    interview: [
      "Wie gehen Sie vor, wenn die Datenlage unvollständig oder widersprüchlich ist?",
      "Erklären Sie eine Analyse, die eine konkrete Entscheidung im Unternehmen beeinflusst hat.",
      "Wie stellen Sie sicher, dass Auswertungen nachvollziehbar und wiederholbar sind?",
      "Welche typischen Fehler sehen Sie in Dashboards oder Modellen?"
    ],
    coverHook: "die Auswertung und Aufbereitung von Daten für belastbare Entscheidungen"
  },
  product: {
    label: "Produktmanagement",
    keywords: ["produktmanager", "product manager", "product owner", "po ", "roadmap", "backlog", "scrum", "agile", "discovery", "produktmanagement"],
    skills: ["Roadmapping", "Stakeholder", "Discovery", "Agil", "Priorisierung", "Analytics"],
    titles: [
      { title: "Product Manager", skills: ["roadmap", "stakeholder", "discovery", "analytics"], base: 84, salary: "60–85 Tsd. €" },
      { title: "Product Owner", skills: ["backlog", "scrum", "agile", "user stories"], base: 82, salary: "55–80 Tsd. €" },
      { title: "Associate Product Manager", skills: ["research", "roadmap", "agile"], base: 76, salary: "48–65 Tsd. €" }
    ],
    cvTips: [
      "Zeige den Weg von der Problemstellung zur Entscheidung und zum Ergebnis – nicht nur die Feature-Liste.",
      "Nenne Zusammenarbeit mit Design, Technik und Vertrieb sowie den eigenen Entscheidungsrahmen.",
      "Wirkung in Nutzungs-, Umsatz- oder Effizienzkennzahlen festhalten.",
      "Methoden (Interviews, A/B-Tests) nur erwähnen, wenn du sie selbst angewendet hast."
    ],
    interview: [
      "Wie priorisieren Sie, wenn Vertrieb, Technik und Kunden gegensätzliche Wünsche haben?",
      "Beschreiben Sie ein Produkt, das Sie eingestellt oder deutlich geändert haben – und warum.",
      "Wie messen Sie, ob eine Funktion den gewünschten Nutzen erreicht?",
      "Wie arbeiten Sie mit Entwicklungsteams, wenn der Termin unter Druck steht?"
    ],
    coverHook: "die Weiterentwicklung von Produkten entlang klarer Nutzer- und Geschäftsziele"
  },
  design: {
    label: "Design & UX",
    keywords: ["design", "ux", "ui", "ux/ui", "user experience", "user research", "figma", "prototyp", "interaktionsdesign", "produktdesign", "visual design", "interface"],
    skills: ["Figma", "Research", "Prototyping", "Usability", "Design Systems", "Workshops"],
    titles: [
      { title: "UX Designer/in", skills: ["figma", "ux", "prototyp", "usability", "research"], base: 84, salary: "50–72 Tsd. €" },
      { title: "UI / Product Designer/in", skills: ["ui", "figma", "visual", "design system"], base: 82, salary: "50–75 Tsd. €" },
      { title: "UX Researcher/in", skills: ["research", "interviews", "usability", "auswertung"], base: 80, salary: "52–75 Tsd. €" },
      { title: "UX Writer / Content Designer", skills: ["content", "ux writing", "sprache", "microcopy"], base: 74, salary: "48–68 Tsd. €" }
    ],
    cvTips: [
      "Ein knappes Portfolio mit Problem, Vorgehen und Ergebnis reicht oft mehr als viele Einzelbilder.",
      "Beschreibe deine Rolle im Team und den Umgang mit Einschränkungen (Technik, Zeit, Richtlinien).",
      "Forschung und Gestaltung nicht vermischen: mach kenntlich, was du selbst erhoben oder gestaltet hast.",
      "Wirkung: Abschlussraten, Supportanfragen, Testhinweise – wenn belastbar."
    ],
    interview: [
      "Führen Sie uns durch ein Projekt, bei dem die erste Lösung nicht funktioniert hat.",
      "Wie beziehen Sie Forschung in enge Zeitpläne ein?",
      "Wie gehen Sie mit Widerspruch aus Entwicklung oder Geschäft um?",
      "Woran erkennen Sie, dass eine Oberfläche unnötig kompliziert ist?"
    ],
    coverHook: "die Gestaltung nachvollziehbarer, gut nutzbarer digitaler Produkte"
  },
  marketing: {
    label: "Marketing",
    keywords: ["marketing", "performance", "seo", "sea", "content marketing", "social media", "kampagne", "brand", "marke", "newsletter", "crm marketing", "growth"],
    skills: ["SEO", "SEA", "Content", "Analytics", "Kampagnen", "Social Media"],
    titles: [
      { title: "Marketing Manager/in", skills: ["kampagne", "analytics", "content", "budget"], base: 82, salary: "48–70 Tsd. €" },
      { title: "Performance Marketing Manager/in", skills: ["sea", "google ads", "meta", "analytics", "roi"], base: 84, salary: "50–75 Tsd. €" },
      { title: "Content Marketing Manager/in", skills: ["content", "seo", "redaktion", "storytelling"], base: 80, salary: "45–68 Tsd. €" },
      { title: "SEO-Manager/in", skills: ["seo", "search", "onpage", "technik", "content"], base: 80, salary: "48–70 Tsd. €" }
    ],
    cvTips: [
      "Ergebnisse mit Zeitraum, Kanal und Vergleichsbasis angeben (nicht nur „Kampagnen betreut“).",
      "Budgetverantwortung, Zielgruppen und typische Kanäle klar machen.",
      "Trenne Strategie, Umsetzung und Reporting, damit die eigene Rolle sichtbar wird.",
      "Beispiele für Tests (Texte, Zielseiten, Gebote) zeigen, wie du lernst und nachsteuerst."
    ],
    interview: [
      "Wie setzen Sie ein Budget auf, wenn die Datenlage dünn ist?",
      "Beschreiben Sie eine Kampagne, die hinter den Erwartungen blieb – und was Sie geändert haben.",
      "Wie stimmen Sie Markenbotschaft und Performance-Ziele aufeinander ab?",
      "Welche Kennzahlen sind für Sie entscheidend, welche eher irreführend?"
    ],
    coverHook: "die Planung und Auswertung von Marketingmaßnahmen mit messbarem Beitrag"
  },
  sales: {
    label: "Vertrieb",
    keywords: ["vertrieb", "sales", "account manager", "key account", "geschäftsabschluss", "akquise", "inside sales", "field sales", "b2b", "b2c", "customer success", "kundenerfolg"],
    skills: ["Akquise", "Verhandlung", "CRM", "Abschluss", "Kundenbetreuung", "Pipeline"],
    titles: [
      { title: "Account Manager/in", skills: ["kundenbetreuung", "crm", "upsell", "verhandlung"], base: 84, salary: "48–75 Tsd. € plus variabel" },
      { title: "Sales Manager/in (B2B)", skills: ["akquise", "abschluss", "pipeline", "b2b"], base: 84, salary: "50–80 Tsd. € plus variabel" },
      { title: "Customer Success Manager/in", skills: ["kundenerfolg", "onboarding", "retention", "crm"], base: 80, salary: "48–70 Tsd. €" },
      { title: "Business Development Manager/in", skills: ["akquise", "markt", "partnerschaft", "pipeline"], base: 78, salary: "55–80 Tsd. € plus variabel" }
    ],
    cvTips: [
      "Zahlen nennen: Zielerreichung, typische Deal-Größe, Länge des Verkaufszyklus, Region oder Segment.",
      "Beschreibe deinen Vertriebsweg (Inbound, Outbound, Bestandskunden) und die Werkzeuge (CRM).",
      "Komplexe Abschlüsse: Entscheider, Einwände, eigenes Vorgehen kurz schildern.",
      "Variable Anteile und Team- oder Einzelverantwortung getrennt aufführen."
    ],
    interview: [
      "Wie strukturieren Sie Ihre Pipeline, wenn mehrere Chancen gleichzeitig reif werden?",
      "Erzählen Sie von einem verlorenen Abschluss und dem Lernen daraus.",
      "Wie bereiten Sie ein Gespräch mit mehreren Entscheidern vor?",
      "Wie gehen Sie mit langen Entscheidungsprozessen um, ohne den Kontakt zu verlieren?"
    ],
    coverHook: "den Aufbau und die Pflege von Kundenbeziehungen mit klaren Umsatzzielen"
  },
  finance: {
    label: "Finanzen & Controlling",
    keywords: ["finanz", "controlling", "controller", "buchhaltung", "bilanz", "steuerfach", "accountant", "fp&a", "treasury", "jahresabschluss", "datev", "ifrs", "hgb"],
    skills: ["Excel", "DATEV", "HGB", "Reporting", "Budget", "SAP"],
    titles: [
      { title: "Controller/in", skills: ["controlling", "excel", "reporting", "budget", "sap"], base: 84, salary: "50–75 Tsd. €" },
      { title: "Buchhalter/in / Accountant", skills: ["buchhaltung", "datev", "hgb", "jahresabschluss"], base: 82, salary: "42–62 Tsd. €" },
      { title: "Finanzanalyst/in (FP&A)", skills: ["planung", "forecast", "excel", "reporting"], base: 80, salary: "55–80 Tsd. €" },
      { title: "Steuerfachangestellte/r", skills: ["steuer", "datev", "erklärung", "mandat"], base: 78, salary: "36–55 Tsd. €" }
    ],
    cvTips: [
      "Systeme (SAP, DATEV, LucaNet) und Abschlussarten (HGB, IFRS) klar benennen.",
      "Verantwortung: Monatsabschluss, Budgetrunden, Prüfungsbegleitung, Teamgröße.",
      "Prozessverbesserungen (Fristen, Fehlerquoten, Automatisierung) sind gute Belege.",
      "Branche und Unternehmensgröße helfen Einordnenden, deine Erfahrung einzuordnen."
    ],
    interview: [
      "Wie gehen Sie vor, wenn Zahlen und Fachbereich nicht zusammenpassen?",
      "Beschreiben Sie einen Abschluss unter Zeitdruck.",
      "Welche Kontrollen halten Sie in der monatlichen Berichterstattung für unverzichtbar?",
      "Wie erklären Sie finanzielle Abweichungen einem nicht-kaufmännischen Gegenüber?"
    ],
    coverHook: "eine belastbare Finanzplanung, Berichterstattung und Ordnungsmäßigkeit der Bücher"
  },
  hr: {
    label: "Personalwesen",
    keywords: ["hr", "personal", "recruiter", "recruiting", "talent acquisition", "people", "personalreferent", "personalentwicklung", "payroll", "entgelt", "employer branding", "arbeitsrecht"],
    skills: ["Recruiting", "Interviews", "Arbeitsrecht", "Onboarding", "HR-Software", "Beratung"],
    titles: [
      { title: "HR Generalist / Personalreferent/in", skills: ["betreuung", "arbeitsrecht", "onboarding", "personalverwaltung"], base: 84, salary: "48–68 Tsd. €" },
      { title: "Recruiter/in", skills: ["recruiting", "sourcing", "interviews", "talent"], base: 82, salary: "45–65 Tsd. €" },
      { title: "People Business Partner", skills: ["beratung", "führungskräfte", "entwicklung", "organisationsentwicklung"], base: 80, salary: "60–80 Tsd. €" },
      { title: "HR Operations / Payroll", skills: ["payroll", "entgelt", "verwaltung", "sap"], base: 76, salary: "42–62 Tsd. €" }
    ],
    cvTips: [
      "Volumina nennen: Einstellungen, betreute Mitarbeitende, Zeit-bis-Besetzung, Standorte.",
      "Trenne operative Personalarbeit, Recruiting und strategische Beratung.",
      "Systeme und Tarif- oder Betriebsratsbezug erwähnen, wenn relevant.",
      "Beispiele für schwierige Fälle (Konflikte, Kündigungen) nur sachlich und ohne Details zu Personen."
    ],
    interview: [
      "Wie beraten Sie eine Führungskraft, deren Anforderungen an eine Stelle unklar sind?",
      "Beschreiben Sie einen Auswahlprozess, den Sie verbessert haben.",
      "Wie gehen Sie mit internen Spannungen um, ohne Partei zu ergreifen?",
      "Welche Kennzahlen nutzen Sie im Recruiting – und wo greifen sie zu kurz?"
    ],
    coverHook: "eine verlässliche Personalarbeit von der Gewinnung bis zur Betreuung der Mitarbeitenden"
  },
  engineering: {
    label: "Ingenieurwesen",
    keywords: ["ingenieur", "engineer", "maschinenbau", "elektrotechnik", "mechatronik", "konstruktion", "cad", "solidworks", "fertigung", "automatisierung", "verfahrenstechnik", "bauingenieur", "fahrzeugtechnik"],
    skills: ["CAD", "Konstruktion", "Projektleitung", "Normen", "FMEA", "SPS"],
    titles: [
      { title: "Konstruktionsingenieur/in", skills: ["cad", "konstruktion", "solidworks", "fertigung"], base: 84, salary: "55–78 Tsd. €" },
      { title: "Projektingenieur/in", skills: ["projekt", "abstimmung", "termin", "budget"], base: 82, salary: "55–80 Tsd. €" },
      { title: "Automatisierungsingenieur/in", skills: ["sps", "automatisierung", "plc", "inbetriebnahme"], base: 82, salary: "55–80 Tsd. €" },
      { title: "Bauingenieur/in", skills: ["bau", "ausschreibung", "bauleitung", "statik"], base: 80, salary: "50–75 Tsd. €" }
    ],
    cvTips: [
      "Projekte mit Rolle, technischer Aufgabe, Normen und Ergebnis beschreiben.",
      "Werkzeuge (CAD, CAE, SPS-Welten) und Branchenbezug (Maschinenbau, Energie, Bau) angeben.",
      "Schnittstellen zu Fertigung, Einkauf oder Baustelle sichtbar machen.",
      "Verantwortung für Budget, Termine oder Sicherheit klar benennen."
    ],
    interview: [
      "Schildern Sie ein technisches Problem, das sich erst in der Umsetzung zeigte.",
      "Wie dokumentieren Sie Entscheidungen, damit andere damit weiterarbeiten können?",
      "Wie wägen Sie Kosten, Termine und technische Sauberkeit ab?",
      "Wie arbeiten Sie mit Werkstatt, Baustelle oder Lieferanten zusammen, wenn Pläne geändert werden?"
    ],
    coverHook: "die Planung und Umsetzung technischer Lösungen unter realen Projektbedingungen"
  },
  consulting: {
    label: "Beratung",
    keywords: ["beratung", "consultant", "consulting", "unternehmensberatung", "strategie", "it-berater", "managementberater", "implementierung", "transformation"],
    skills: ["Analyse", "Workshops", "Präsentation", "Projektarbeit", "Stakeholder"],
    titles: [
      { title: "Consultant", skills: ["analyse", "workshop", "präsentation", "projekt"], base: 84, salary: "52–75 Tsd. €" },
      { title: "Senior Consultant", skills: ["steuerung", "stakeholder", "konzeption", "verantwortung"], base: 80, salary: "65–90 Tsd. €" },
      { title: "IT-Consultant", skills: ["anforderung", "implementierung", "prozess", "it"], base: 82, salary: "55–80 Tsd. €" }
    ],
    cvTips: [
      "Mandate anonymisiert: Branche, Fragestellung, deine Rolle, Ergebnis.",
      "Mache kenntlich, was du selbst erarbeitet hast und was das Team geliefert hat.",
      "Reise-, Kunden- und Branchenbezug helfen bei der Einordnung.",
      "Methoden nur anführen, wenn du sie in der Praxis genutzt hast."
    ],
    interview: [
      "Wie strukturieren Sie ein Vorhaben, wenn das eigentliche Problem noch unscharf ist?",
      "Beschreiben Sie einen Auftrag, in dem der Auftraggeber unsicher oder uneinig war.",
      "Wie gehen Sie mit Widerstand in der Umsetzung um?",
      "Wie halten Sie Qualität, wenn mehrere Mandate parallel laufen?"
    ],
    coverHook: "die strukturierte Bearbeitung komplexer Fragestellungen mit greifbarem Nutzen für den Auftraggeber"
  },
  health: {
    label: "Gesundheitswesen",
    keywords: ["gesundheit", "klinik", "krankenhaus", "arzt", "ärztin", "medizinisch", "therapeut", "physiotherapie", "mtd", "mta", "mfa", "praxis", "gesundheitsmanager", "public health", "pharma", "medizintechnik"],
    skills: ["Patientenversorgung", "Dokumentation", "Hygiene", "Teamwork", "Fachsprache"],
    titles: [
      { title: "Medizinische/r Fachangestellte/r", skills: ["praxis", "dokumentation", "anmeldung", "versorgung"], base: 82, salary: "32–45 Tsd. €" },
      { title: "Therapeut/in (z. B. Physiotherapie)", skills: ["therapie", "befund", "behandlung", "patient"], base: 82, salary: "36–52 Tsd. €" },
      { title: "Gesundheitsmanager/in", skills: ["organisation", "qualität", "prozesse", "gesundheit"], base: 78, salary: "48–68 Tsd. €" },
      { title: "Clinical Research Associate", skills: ["studie", "monitoring", "gcp", "dokumentation"], base: 80, salary: "50–72 Tsd. €" }
    ],
    cvTips: [
      "Fachrichtung, Einrichtungstyp und typische Fallzahlen oder Schwerpunkte angeben.",
      "Zusatzqualifikationen und Schicht- oder Bereitschaftserfahrung kenntlich machen.",
      "Dokumentation, Qualität und interprofessionelle Zusammenarbeit kurz belegen.",
      "Auf vertrauliche Patientendetails verzichten; Abläufe und Verantwortung reichen."
    ],
    interview: [
      "Wie priorisieren Sie, wenn mehrere Patientinnen oder Patienten gleichzeitig Unterstützung brauchen?",
      "Beschreiben Sie eine Situation mit unsicherer Lage und wie Sie abgesichert haben.",
      "Wie sprechen Sie unangenehme Themen gegenüber Kollegium oder Angehörigen an?",
      "Welche Routinen nutzen Sie, um Fehler in der Dokumentation zu vermeiden?"
    ],
    coverHook: "eine sorgfältige, gut abgestimmte Arbeit im Gesundheitswesen"
  },
  nursing: {
    label: "Pflege",
    keywords: ["pflege", "krankenpflege", "altenpflege", "gesundheits- und krankenpfleger", "examinierte", "pflegefachkraft", "stationsleitung", "intensivpflege", "ambulant", "pflegeberatung"],
    skills: ["Grundpflege", "Behandlungspflege", "Dokumentation", "Angehörigenarbeit", "Schichtdienst"],
    titles: [
      { title: "Pflegefachkraft", skills: ["pflege", "dokumentation", "behandlungspflege", "schicht"], base: 86, salary: "38–52 Tsd. € (je nach Tarif)" },
      { title: "Stationsleitung / Wohnbereichsleitung", skills: ["leitung", "dienstplan", "qualität", "team"], base: 80, salary: "48–62 Tsd. €" },
      { title: "Pflegefachkraft Intensiv / Spezialbereich", skills: ["intensiv", "monitoring", "spezial", "akut"], base: 82, salary: "45–60 Tsd. €" },
      { title: "Ambulante Pflegefachkraft", skills: ["ambulant", "tour", "angehörige", "eigenverantwortlich"], base: 80, salary: "36–50 Tsd. €" }
    ],
    cvTips: [
      "Einrichtung, Bereich (Station, Intensiv, ambulant, Wohngruppe) und Trägerform nennen.",
      "Tarif, Fortbildungen und evtl. Praxisanleitung oder Mentoring angeben.",
      "Beispiele für Verantwortung (Übergabe, Notfallsituationen, Angehörigengespräche) sachlich halten.",
      "Wünsche zu Dienstmodell und Pensum früh klar formulieren."
    ],
    interview: [
      "Wie organisieren Sie eine Schicht, wenn Kolleginnen oder Kollegen kurzfristig ausfallen?",
      "Wie dokumentieren Sie so, dass der nächste Dienst sicher weiterarbeiten kann?",
      "Beschreiben Sie ein schwieriges Gespräch mit Angehörigen.",
      "Wie achten Sie auf Ihre eigene Belastung im Schichtdienst?"
    ],
    coverHook: "eine fachlich saubere, zugewandte Pflege in einem belastbaren Team"
  },
  logistics: {
    label: "Logistik & Einkauf",
    keywords: ["logistik", "einkauf", "procurement", "supply chain", "lager", "disposition", "spedition", "fuhrpark", " sap ewm", "wareneingang", "materialwirtschaft", "disponent"],
    skills: ["Disposition", "SAP", "Einkauf", "Lager", "Verhandlung", "Planung"],
    titles: [
      { title: "Disponent/in", skills: ["disposition", "planung", "tour", "termine"], base: 84, salary: "40–58 Tsd. €" },
      { title: "Einkäufer/in", skills: ["einkauf", "verhandlung", "lieferant", "vertrag"], base: 84, salary: "48–70 Tsd. €" },
      { title: "Supply-Chain-Manager/in", skills: ["supply chain", "planung", "bestand", "risiko"], base: 80, salary: "55–80 Tsd. €" },
      { title: "Lagerleitung / Shift Lead Logistik", skills: ["lager", "führung", "kennzahlen", "sicherheit"], base: 78, salary: "45–65 Tsd. €" }
    ],
    cvTips: [
      "Volumina, Regionen, Incoterms oder Lagertechnik nennen, soweit sie deine Arbeit geprägt haben.",
      "Systeme (SAP MM/EWM, TMS) und Kennzahlen (Lieferzeit, Bestand, Kosten) belegen die Wirkung.",
      "Störungen (Lieferverzug, Qualitätsmängel) und dein konkretes Handeln sind gute Beispiele.",
      "Führungsverantwortung im Schichtbetrieb getrennt von Fachaufgaben darstellen."
    ],
    interview: [
      "Wie reagieren Sie, wenn eine kritische Lieferung ausfällt?",
      "Beschreiben Sie eine Verhandlung oder Abstimmung mit einem schwierigen Lieferanten.",
      "Welche Bestände halten Sie für vertretbar – und woran machen Sie das fest?",
      "Wie arbeiten Sie mit Produktion, Vertrieb und Lager zusammen, wenn die Pläne auseinanderlaufen?"
    ],
    coverHook: "stabile Liefer- und Beschaffungsprozesse mit Blick auf Kosten, Termine und Qualität"
  },
  education: {
    label: "Bildung & Training",
    keywords: ["lehrer", "lehrerin", "lehramt", "dozent", "trainer", "weiterbildung", "schulung", "pädagogik", "erwachsenenbildung", "unterricht", "ausbilder", "referendar"],
    skills: ["Unterricht", "Didaktik", "Konzeption", "Feedback", "Klassenführung"],
    titles: [
      { title: "Lehrkraft", skills: ["unterricht", "didaktik", "beurteilung", "elternarbeit"], base: 84, salary: "nach Besoldung / Tarif" },
      { title: "Dozent/in / Trainer/in", skills: ["schulung", "konzeption", "moderation", "erwachsenenbildung"], base: 82, salary: "40–65 Tsd. €" },
      { title: "Ausbilder/in", skills: ["ausbildung", "prüfung", "begleitung", "handwerk"], base: 80, salary: "42–60 Tsd. €" },
      { title: "Bildungsreferent/in", skills: ["konzeption", "programme", "förderung", "organisation"], base: 78, salary: "45–65 Tsd. €" }
    ],
    cvTips: [
      "Fächer, Zielgruppen, Schulform oder Trainingsformate klar angeben.",
      "Konzeption, Durchführung und Auswertung von Lerneinheiten getrennt darstellen.",
      "Digitale Formate, Inklusion oder Prüfungsbegleitung nur mit konkreten Beispielen.",
      "Für den Schuldienst: Referendariat, Lehrbefähigung und Bundesland nicht vergessen."
    ],
    interview: [
      "Wie gehen Sie vor, wenn eine Gruppe sehr unterschiedlich vorbereitet ist?",
      "Beschreiben Sie eine Stunde oder ein Training, das nicht wie geplant verlief.",
      "Wie geben Sie Rückmeldung, die sachlich und dennoch klar ist?",
      "Wie halten Sie Ihre Unterlagen und Methoden aktuell?"
    ],
    coverHook: "eine klare, gut vorbereitete Bildungsarbeit mit nachvollziehbaren Lernzielen"
  },
  legal: {
    label: "Recht",
    keywords: ["recht", "jurist", "rechtsanwalt", "anwaltsgehilfe", "legal counsel", "compliance", "datenschutz", "dpo", "vertrag", "legal operations", "notar"],
    skills: ["Vertragsrecht", "Schreiben", "Prüfung", "Datenschutz", "Verhandlung"],
    titles: [
      { title: "Syndikusrechtsanwalt / Legal Counsel", skills: ["vertrag", "beratung", "gesellschaftsrecht", "compliance"], base: 84, salary: "70–100 Tsd. €" },
      { title: "Rechtsanwaltsfachangestellte/r", skills: ["akten", "fristen", "korrespondenz", "mandat"], base: 82, salary: "32–48 Tsd. €" },
      { title: "Datenschutzbeauftragte/r", skills: ["datenschutz", "dsgvo", "schulung", "audit"], base: 80, salary: "55–80 Tsd. €" },
      { title: "Legal Operations / Paralegal (Unternehmen)", skills: ["vertrag", "prozesse", "clm", "koordination"], base: 78, salary: "45–70 Tsd. €" }
    ],
    cvTips: [
      "Rechtsgebiete, Mandanten- oder Branchenbezug und typische Vorgänge nennen.",
      "Eigenständige Entwürfe und abgestimmte Prüfungen unterscheiden.",
      "Sprachen, Zulassung und etwaige Fachanwaltschaft oder Schwerpunkte angeben.",
      "Keine vertraulichen Mandatsdetails; abstrahierte Falltypen genügen."
    ],
    interview: [
      "Wie priorisieren Sie, wenn mehrere Fristen gleichzeitig laufen?",
      "Beschreiben Sie eine rechtliche Einschätzung, die Sie gegenüber dem Fachbereich vertreten mussten.",
      "Wie halten Sie sich in einem dynamischen Rechtsgebiet auf dem aktuellen Stand?",
      "Wie erklären Sie ein Risiko so, dass eine fachfremde Leitung entscheiden kann?"
    ],
    coverHook: "eine sorgfältige rechtliche Prüfung und praxisnahe Beratung"
  },
  media: {
    label: "Medien & Kommunikation",
    keywords: ["redaktion", "journalist", "kommunikation", "presse", "pr ", "öffentlichkeitsarbeit", "content", "social-redaktion", "corporate communications", "sprecher", "lektorat"],
    skills: ["Schreiben", "Redaktion", "Pressearbeit", "Social", "Abstimmung"],
    titles: [
      { title: "Referent/in Unternehmenskommunikation", skills: ["kommunikation", "presse", "texte", "interne kommunikation"], base: 84, salary: "48–70 Tsd. €" },
      { title: "Redakteur/in", skills: ["redaktion", "recherchieren", "texte", "themenplanung"], base: 82, salary: "38–60 Tsd. €" },
      { title: "PR-Manager/in", skills: ["presse", "kampagne", "medienarbeit", "storytelling"], base: 80, salary: "45–68 Tsd. €" },
      { title: "Social-Media-Redakteur/in", skills: ["social", "community", "content", "planung"], base: 78, salary: "38–55 Tsd. €" }
    ],
    cvTips: [
      "Formate, Kanäle und Reichweiten oder typische Veröffentlichungsrhythmen angeben.",
      "Krisenkommunikation, interne Formate und redaktionelle Unabhängigkeit sauber trennen.",
      "Arbeitsproben oder ein knappes Portfolio ersetzen lange Tätigkeitslisten.",
      "Abstimmung mit Fachbereichen und Freigabeprozessen kurz schildern."
    ],
    interview: [
      "Wie prüfen Sie Fakten, wenn die Zeit knapp ist?",
      "Beschreiben Sie eine schwierige Freigabe oder eine Korrektur nach Veröffentlichung.",
      "Wie steuern Sie Ton und Kanal abhängig von der Zielgruppe?",
      "Wie bereiten Sie sich auf Anfragen der Presse vor?"
    ],
    coverHook: "klare, korrekte Kommunikation – intern wie nach außen"
  },
  service: {
    label: "Kundenservice",
    keywords: ["kundenservice", "customer support", "customer care", "servicecenter", "helpdesk", "first level", "second level", "beschwerde", "support"],
    skills: ["Gesprächsführung", "Tickets", "Produktkenntnis", "Beschwerden", "CRM"],
    titles: [
      { title: "Customer-Service-Mitarbeiter/in", skills: ["telefon", "tickets", "crm", "beratung"], base: 84, salary: "32–45 Tsd. €" },
      { title: "Teamleitung Kundenservice", skills: ["führung", "qualität", "kennzahlen", "coaching"], base: 80, salary: "42–60 Tsd. €" },
      { title: "Technical Support / 2nd Level", skills: ["technik", "tickets", "analyse", "dokumentation"], base: 82, salary: "38–55 Tsd. €" }
    ],
    cvTips: [
      "Kanäle, Sprachen, Ticketvolumen und typische Anliegen angeben.",
      "Kennzahlen (Erstlösungsquote, Qualität) nur mit Kontext verwenden.",
      "Beispiele für deeskalierte Gespräche sachlich und ohne Kundendaten schildern.",
      "Produkt- oder Branchenkenntnis sichtbar machen."
    ],
    interview: [
      "Wie bleiben Sie sachlich, wenn ein Gegenüber sehr verärgert ist?",
      "Beschreiben Sie einen Fall, den Sie nicht im ersten Kontakt lösen konnten.",
      "Wie dokumentieren Sie so, dass Kolleginnen und Kollegen anschließen können?",
      "Welche typischen Ursachen stecken hinter wiederkehrenden Anfragen?"
    ],
    coverHook: "einen verlässlichen, klaren Service, der Anliegen zügig und nachvollziehbar klärt"
  },
  admin: {
    label: "Verwaltung & Öffentlicher Dienst",
    keywords: ["verwaltung", "sachbearbeiter", "öffentlicher dienst", "kommunal", "behörde", "amt", "büromanagement", "office manager", "assistenz", "sekretariat", "verwaltungswirt", "verwaltungsfachangestellte"],
    skills: ["Aktenführung", "Vorschriften", "Organisation", "Bürgerkontakt", "Office"],
    titles: [
      { title: "Sachbearbeiter/in", skills: ["akten", "bescheide", "recht", "sachverhalt"], base: 84, salary: "38–55 Tsd. € / EG typisch" },
      { title: "Verwaltungsfachangestellte/r", skills: ["verwaltung", "bürger", "verfahren", "organisation"], base: 82, salary: "36–50 Tsd. €" },
      { title: "Office Manager / Managementassistenz", skills: ["organisation", "termine", "korrespondenz", "abstimmung"], base: 80, salary: "38–58 Tsd. €" },
      { title: "Sachbearbeitung Finanzen / Zuwendungen", skills: ["zuwendung", "haushalt", "prüfung", "verwendungsnachweis"], base: 78, salary: "42–60 Tsd. €" }
    ],
    cvTips: [
      "Behörde oder Organisationsform, Rechtsgrundlagen und typische Verfahren nennen.",
      "Digitale Akten, Fachverfahren und Sprachen angeben.",
      "Bürgerkontakt, Gremienarbeit oder interne Steuerung kenntlich trennen.",
      "Im öffentlichen Dienst: Laufbahn, Entgeltgruppe und befristete Stellen transparent halten."
    ],
    interview: [
      "Wie arbeiten Sie, wenn Vorschriften und der Einzelfall nicht leicht zusammenpassen?",
      "Beschreiben Sie einen Vorgang mit unvollständigen Unterlagen.",
      "Wie halten Sie Fristen, wenn das Aufkommen stark schwankt?",
      "Wie erklären Sie eine Ablehnung nachvollziehbar und respektvoll?"
    ],
    coverHook: "eine korrekte, gut organisierte Sachbearbeitung im Sinne klarer Verfahren"
  },
  trades: {
    label: "Handwerk & Technik",
    keywords: ["handwerk", "elektriker", "elektroniker", "mechatroniker", "anlagenmechaniker", "sanitär", "heizung", "klima", "shk", "tischler", "schreiner", "kfz", "werkstatt", "meister", "geselle", "industriemechaniker"],
    skills: ["Facharbeit", "Fehlerdiagnose", "Kundentermin", "Zeichnungen", "Sicherheit"],
    titles: [
      { title: "Elektroniker/in", skills: ["elektro", "installation", "diagnose", "normen"], base: 84, salary: "36–52 Tsd. €" },
      { title: "Anlagenmechaniker/in SHK", skills: ["shk", "installation", "heizung", "service"], base: 84, salary: "36–52 Tsd. €" },
      { title: "Mechatroniker/in / Industriemechaniker/in", skills: ["mechanik", "instandhaltung", "anlage", "diagnose"], base: 82, salary: "38–55 Tsd. €" },
      { title: "Meister/in / Werkstattleitung", skills: ["meister", "führung", "kalkulation", "ausbildung"], base: 80, salary: "48–68 Tsd. €" }
    ],
    cvTips: [
      "Gewerk, Meisterbrief oder Gesellenbrief, typische Anlagen oder Fahrzeuge angeben.",
      "Baustellen-, Kunden- oder Schichtbetrieb sichtbar machen.",
      "Zusatzqualifikationen (Schaltberechtigung, Kälteschein, Führerscheine) auflisten.",
      "Beispiele für schwierige Diagnosen oder termintreue Projekte helfen mehr als Tool-Listen."
    ],
    interview: [
      "Wie gehen Sie vor, wenn eine Störung vor Ort anders aussieht als beschrieben?",
      "Beschreiben Sie einen Termin, bei dem Material oder Zeit knapp waren.",
      "Wie erklären Sie Kundinnen und Kunden eine notwendige, aber teure Reparatur?",
      "Welche Sicherheitsregeln halten Sie auch unter Zeitdruck ein?"
    ],
    coverHook: "saubere fachliche Arbeit, termingerecht und mit Blick auf Sicherheit"
  },
  science: {
    label: "Wissenschaft & Forschung",
    keywords: ["forschung", "wissenschaft", "promotion", "labor", "wissenschaftlicher mitarbeiter", "postdoc", "forschungskoordination", "laborant", "r&d", "fuE", "publikation"],
    skills: ["Methodik", "Auswertung", "Schreiben", "Labor", "Drittmittel"],
    titles: [
      { title: "Wissenschaftliche/r Mitarbeiter/in", skills: ["forschung", "publikation", "lehre", "methodik"], base: 84, salary: "TV-L E13 typisch" },
      { title: "Laborant/in / Technical Assistant", skills: ["labor", "protokolle", "geräte", "qualität"], base: 82, salary: "36–52 Tsd. €" },
      { title: "Research & Development Engineer", skills: ["entwicklung", "versuche", "auswertung", "dokumentation"], base: 80, salary: "55–80 Tsd. €" },
      { title: "Forschungskoordination", skills: ["drittmittel", "koordination", "reporting", "konsortium"], base: 78, salary: "48–70 Tsd. €" }
    ],
    cvTips: [
      "Methoden, Themenfeld und deine konkrete Rolle in Publikationen oder Patenten klar machen.",
      "Drittmittel, Laborverantwortung oder Betreuung von Abschlussarbeiten erwähnen.",
      "Zwischen akademischer und industrieller Forschung unterscheiden.",
      "Eine kurze Auswahl relevanter Veröffentlichungen reicht; die vollständige Liste gehört in den Anhang."
    ],
    interview: [
      "Wie strukturieren Sie ein Vorhaben, dessen Ausgang offen ist?",
      "Beschreiben Sie ein Experiment oder eine Studie, die nicht das erwartete Ergebnis brachte.",
      "Wie teilen Sie Arbeit in einem mehrköpfigen Forschungsprojekt auf?",
      "Wie erklären Sie ein komplexes Ergebnis einem fachfremden Geldgeber?"
    ],
    coverHook: "eine methodisch saubere Forschungs- oder Entwicklungsarbeit mit nachvollziehbaren Ergebnissen"
  },
  sustainability: {
    label: "Umwelt & Nachhaltigkeit",
    keywords: ["nachhaltigkeit", "esg", "umwelt", "klimaschutz", "csr", "sustainability", "umweltmanagement", "iso 14001", "kreislauf", "energieberatung", "dekarbonisierung"],
    skills: ["Reporting", "Bilanzen", "Stakeholder", "Standards", "Projektarbeit"],
    titles: [
      { title: "Nachhaltigkeitsmanager/in", skills: ["esg", "reporting", "strategie", "stakeholder"], base: 84, salary: "55–80 Tsd. €" },
      { title: "Umweltbeauftragte/r", skills: ["umweltmanagement", "iso", "audit", "genehmigung"], base: 82, salary: "50–72 Tsd. €" },
      { title: "ESG-Analyst/in / Reporting", skills: ["csrd", "daten", "bericht", "kennzahlen"], base: 80, salary: "52–75 Tsd. €" }
    ],
    cvTips: [
      "Standards (CSRD, GRI, ISO 14001) und den eigenen Beitrag am Bericht oder Managementsystem nennen.",
      "Wirkung in messbaren Größen, wo seriös möglich (Energie, Emissionen, Lieferkette).",
      "Abstimmung mit Finanzen, Einkauf und Technik sichtbar machen.",
      "Keine übertriebenen Wirkungsversprechen; den eigenen Zuständigkeitsrahmen offenlegen."
    ],
    interview: [
      "Wie gewinnen Sie belastbare Daten, wenn Fachbereiche noch keine Routine haben?",
      "Beschreiben Sie einen Zielkonflikt zwischen Klimaziel und operativem Geschäft.",
      "Wie prüfen Sie Angaben aus der Lieferkette?",
      "Welche Kennzahl halten Sie für überbewertet – und warum?"
    ],
    coverHook: "eine seriöse Nachhaltigkeitsarbeit, die Vorgaben erfüllt und intern anschlussfähig ist"
  },
  realestate: {
    label: "Immobilien",
    keywords: ["immobilien", "property", "asset management", "hausverwaltung", "makler", "objektbetreuer", "facility", "projektentwicklung", "wohnungswirtschaft"],
    skills: ["Objektbetreuung", "Verträge", "Mietrecht", "Kalkulation", "Ansprechpartner"],
    titles: [
      { title: "Immobilienverwalter/in", skills: ["verwaltung", "mietrecht", "abrechnung", "eigentümer"], base: 84, salary: "40–60 Tsd. €" },
      { title: "Property / Asset Manager/in", skills: ["portfolio", "rendite", "verträge", "maßnahme"], base: 82, salary: "55–80 Tsd. €" },
      { title: "Immobilienkaufmann/-frau / Objektbetreuung", skills: ["objekt", "vermietung", "kunden", "technik"], base: 80, salary: "38–55 Tsd. €" }
    ],
    cvTips: [
      "Assetklasse, Flächen oder Einheiten und Region angeben.",
      "Umgang mit Mietvertragsrecht, Abrechnung und Dienstleistern belegen.",
      "Sanierungen oder ESG-Maßnahmen mit deiner Rolle beschreiben.",
      "Wirtschaftliche und technische Verantwortung getrennt darstellen."
    ],
    interview: [
      "Wie priorisieren Sie Instandhaltung, wenn das Budget begrenzt ist?",
      "Beschreiben Sie ein schwieriges Gespräch mit Mieterschaft oder Eigentümern.",
      "Wie prüfen Sie Angebote von Dienstleistern?",
      "Wie gehen Sie mit einer unerwarteten technischen Störung im Bestand um?"
    ],
    coverHook: "eine zuverlässige Bewirtschaftung und Weiterentwicklung von Immobilienbeständen"
  },
  hospitality: {
    label: "Gastronomie & Tourismus",
    keywords: ["gastronomie", "hotellerie", "tourismus", "küche", "servicekraft", "restaurant", "rezeption", "event", "hotelfach", "koch", "köchin", "concierge"],
    skills: ["Service", "Schicht", "Gäste", "Organisation", "HACCP"],
    titles: [
      { title: "Hotelfachfrau/-mann / Rezeption", skills: ["rezeption", "pms", "gäste", "reservierung"], base: 84, salary: "28–42 Tsd. €" },
      { title: "Restaurantfachkraft / Serviceleitung", skills: ["service", "schicht", "team", "gäste"], base: 82, salary: "28–45 Tsd. €" },
      { title: "Koch / Köchin", skills: ["küche", "kalkulation", "hygiene", "menü"], base: 82, salary: "30–48 Tsd. €" },
      { title: "Event- oder Tourismusmanager/in", skills: ["event", "planung", "budget", "gäste"], base: 78, salary: "38–58 Tsd. €" }
    ],
    cvTips: [
      "Häuser, Kategorie, typische Auslastung oder Küchenstil nennen.",
      "Sprachen, Schichtsysteme und Führungsverantwortung angeben.",
      "Qualität, Hygiene und Beschwerden sachlich belegen.",
      "Saisonarbeit und Stammhaus-Erfahrung klar unterscheiden."
    ],
    interview: [
      "Wie bleiben Sie freundlich und klar, wenn der Betrieb voll und das Team knapp ist?",
      "Beschreiben Sie eine Beschwerde, die Sie vor Ort gelöst haben.",
      "Wie organisieren Sie Übergaben zwischen Schichten?",
      "Welche Standards halten Sie auch in Stoßzeiten ein?"
    ],
    coverHook: "einen aufmerksamen, gut organisierten Betrieb mit Blick auf Qualität und Gäste"
  },
  social: {
    label: "Soziales & Erziehung",
    keywords: ["sozialpädagog", "sozialarbeit", "erzieher", "erzieherin", "kita", "jugendhilfe", "teilhabe", "beratung", "case management", "heilerziehung", "schulsozialarbeit"],
    skills: ["Beziehungsarbeit", "Dokumentation", "Beratung", "Netzwerk", "Gruppendienst"],
    titles: [
      { title: "Erzieher/in", skills: ["gruppe", "entwicklung", "elternarbeit", "kita"], base: 86, salary: "38–52 Tsd. € (Tarif)" },
      { title: "Sozialarbeiter/in / Sozialpädagog/in", skills: ["beratung", "fallarbeit", "netzwerk", "hilfeplan"], base: 84, salary: "42–58 Tsd. €" },
      { title: "Schulsozialarbeit / Jugendhilfe", skills: ["schule", "jugend", "prävention", "beratung"], base: 80, salary: "42–56 Tsd. €" }
    ],
    cvTips: [
      "Träger, Zielgruppe, Setting (Kita, stationär, ambulant, Schule) angeben.",
      "Methoden und Dokumentation (Hilfeplanung, Beobachtung) konkret beschreiben.",
      "Multiprofessionelle Zusammenarbeit und Elterngespräche belegen.",
      "Auf vertrauliche Falldetails verzichten."
    ],
    interview: [
      "Wie setzen Sie Grenzen, ohne die Beziehung abzubrechen?",
      "Beschreiben Sie eine Situation mit hohem Konfliktanteil im Team oder mit Angehörigen.",
      "Wie dokumentieren Sie so, dass der Vorgang rechtlich und fachlich tragfähig bleibt?",
      "Wie achten Sie auf Ihre eigene Belastung in der Fallarbeit?"
    ],
    coverHook: "eine fachlich begründete, respektvolle Arbeit mit klaren Aufträgen und gutem Teamabgleich"
  },
  production: {
    label: "Produktion & Fertigung",
    keywords: ["produktion", "fertigung", "schichtleitung", "industriemeister", "werke", "montage", "cnc", "qualität in der linie", "lean", "oee", "fertigungstechnik"],
    skills: ["Schicht", "Kennzahlen", "Sicherheit", "Lean", "Führung"],
    titles: [
      { title: "Schichtleiter/in Produktion", skills: ["schicht", "führung", "kennzahlen", "sicherheit"], base: 84, salary: "48–68 Tsd. €" },
      { title: "Produktionsplaner/in", skills: ["planung", "kapazität", "termin", "sap"], base: 82, salary: "48–68 Tsd. €" },
      { title: "Fachkraft Fertigung / CNC", skills: ["cnc", "zeichnung", "toleranz", "maschine"], base: 80, salary: "38–55 Tsd. €" }
    ],
    cvTips: [
      "Erzeugnisse, Stückzahlen, Schichtmodell und Automatisierungsgrad angeben.",
      "Kennzahlen (OEE, Ausschuss, Unfälle) mit deinem Beitrag verbinden.",
      "Lean- oder Verbesserungsprojekte nur mit greifbarem Ergebnis erwähnen.",
      "Führungs- und Fachverantwortung getrennt halten."
    ],
    interview: [
      "Wie reagieren Sie, wenn die Linie steht und die Ursache unklar ist?",
      "Beschreiben Sie eine Verbesserung, die Sie mit dem Team umgesetzt haben.",
      "Wie sprechen Sie Sicherheitsregeln an, die umgangen werden?",
      "Wie planen Sie, wenn Personal oder Material kurzfristig fehlen?"
    ],
    coverHook: "eine sichere, termintreue Fertigung mit nachvollziehbaren Kennzahlen"
  },
  quality: {
    label: "Qualitätsmanagement",
    keywords: ["qualität", "qm", "qmb", "iso 9001", "audit", "qualitätsmanagement", "qs", "reclama", "reklamation", "capa", "iats", "six sigma"],
    skills: ["Audits", "ISO 9001", "Reklamationen", "Prozesse", "Maßnahmen"],
    titles: [
      { title: "Qualitätsmanager/in / QMB", skills: ["iso", "audit", "prozesse", "managementbewertung"], base: 84, salary: "52–75 Tsd. €" },
      { title: "Qualitätssicherung / QS-Ingenieur/in", skills: ["prüfung", "reklamation", "messmittel", "fertigung"], base: 82, salary: "50–72 Tsd. €" },
      { title: "Auditor/in (intern / Lieferant)", skills: ["audit", "norm", "lieferant", "bericht"], base: 78, salary: "50–72 Tsd. €" }
    ],
    cvTips: [
      "Normen, Auditarten und den Reifegrad des Managementsystems nennen.",
      "Reklamationsquoten oder Maßnahmenwirksamkeit nur mit Kontext angeben.",
      "Schnittstelle zu Fertigung, Einkauf und Entwicklung sichtbar machen.",
      "Eigene Auditorenqualifikation und Branchen (IATF, Medizin, Lebensmittel) anführen."
    ],
    interview: [
      "Wie gehen Sie vor, wenn ein Audit eine Abweichung zeigt, deren Ursache umstritten ist?",
      "Beschreiben Sie eine wirksame Korrekturmaßnahme – und eine, die nicht gegriffen hat.",
      "Wie vermeiden Sie, dass Qualität nur auf dem Papier existiert?",
      "Wie sprechen Sie wiederkehrende Fehler gegenüber der Leitung an?"
    ],
    coverHook: "ein funktionierendes Qualitätsmanagement, das Abweichungen findet und wirksam schließt"
  }
};

Careon.GENERIC = {
  label: "Allgemeine Fach- und Büroarbeit",
  skills: ["Organisation", "Kommunikation", "MS Office", "Projektarbeit"],
  titles: [
    { title: "Sachbearbeitung / Fachkraft", skills: ["organisation", "sachbearbeitung", "office"], base: 74, salary: "38–55 Tsd. €" },
    { title: "Projektreferent/in", skills: ["projekt", "koordination", "kommunikation"], base: 72, salary: "45–65 Tsd. €" },
    { title: "Assistenz der Geschäftsführung / Teamassistenz", skills: ["assistenz", "organisation", "termine"], base: 70, salary: "36–55 Tsd. €" }
  ],
  cvTips: [
    "Beschreibe Zuständigkeit, typische Vorgänge und mit wem du regelmäßig arbeitest.",
    "Werkzeuge, Sprachen und etwaige Budget- oder Terminverantwortung angeben.",
    "Ergebnisse (eingeführte Abläufe, kürzere Durchlaufzeiten, entlastete Teams) sind hilfreicher als allgemeine Stärken.",
    "Pass den Schwerpunkt des Lebenslaufs an die jeweilige Ausschreibung an, statt eine Version für alles zu nutzen."
  ],
  interview: [
    "Wie organisieren Sie Ihre Arbeit, wenn viele Anfragen gleichzeitig eintreffen?",
    "Beschreiben Sie eine Aufgabe, die Sie selbständig neu aufgesetzt haben.",
    "Wie gehen Sie vor, wenn Informationen fehlen, die Frist aber bleibt?",
    "Woran merken Ihre Kolleginnen und Kollegen, dass sie sich auf Ihre Arbeit verlassen können?"
  ],
  coverHook: "eine zuverlässige, gut abgestimmte Arbeit in einem klaren Verantwortungsbereich"
};

Careon.MENU = [
  { id: "cv", label: "Lebenslauf-Tipps" },
  { id: "cover", label: "Anschreiben erstellen" },
  { id: "interview", label: "Interview üben" },
  { id: "search", label: "Jobs suchen" },
  { id: "reset", label: "Neue Suche" }
];
