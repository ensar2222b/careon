/* Matching, cover letters, job-board links, interview feedback. No network calls. */
window.Careon = window.Careon || {};

(function (C) {
  "use strict";

  var UMLAUTS = { ä: "ae", ö: "oe", ü: "ue", ß: "ss", é: "e", è: "e", à: "a" };

  C.normalize = function (text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[äöüßéèà]/g, function (ch) { return UMLAUTS[ch] || ch; })
      .replace(/[^a-z0-9+#.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  C.tokens = function (text) {
    return C.normalize(text).split(" ").filter(function (t) { return t.length > 1; });
  };

  /** Split a free-text skill answer into individual items. */
  C.parseSkills = function (text) {
    return String(text || "")
      .split(/[,;/]|\bund\b|\s{2,}/i)
      .map(function (s) { return s.replace(/^[-–•]\s*/, "").trim(); })
      .filter(function (s) { return s.length > 1 && s.length < 48; })
      .slice(0, 12);
  };

  C.detectField = function (text) {
    var n = C.normalize(text);
    var best = null;
    var bestScore = 0;
    Object.keys(C.FIELDS).forEach(function (key) {
      var field = C.FIELDS[key];
      var score = 0;
      field.keywords.forEach(function (kw) {
        var k = C.normalize(kw);
        if (!k) return;
        if (n.indexOf(k) !== -1) score += k.length > 4 ? 3 : 2;
      });
      if (score > bestScore) {
        bestScore = score;
        best = key;
      }
    });
    if (best && bestScore >= 2) return best;
    return null;
  };

  function experienceBoost(expKey, title) {
    var t = title.toLowerCase();
    if (expKey === "entry") {
      if (/junior|associate|assistenz|fachangestellte|ausbilder/.test(t)) return 6;
      if (/leitung|lead|senior|head|director/.test(t)) return -10;
      return 0;
    }
    if (expKey === "junior") {
      if (/senior|leitung|lead|head/.test(t)) return -4;
      return 2;
    }
    if (expKey === "mid") return 3;
    if (expKey === "senior") {
      if (/senior|lead|leitung|manager/.test(t)) return 6;
      return 2;
    }
    if (expKey === "lead") {
      if (/leitung|lead|manager|head|meister|business partner/.test(t)) return 8;
      if (/junior|associate/.test(t)) return -8;
      return 1;
    }
    return 0;
  }

  C.scoreRoles = function (profile) {
    var fieldKey = profile.fieldKey;
    var field = (fieldKey && C.FIELDS[fieldKey]) || C.GENERIC;
    var skillNorm = (profile.skills || []).map(C.normalize);
    var allText = C.normalize(
      [profile.rawField, profile.skillsText, (profile.skills || []).join(" ")].join(" ")
    );

    var roles = field.titles.map(function (row) {
      var score = row.base;
      var hits = [];
      (row.skills || []).forEach(function (sk) {
        var s = C.normalize(sk);
        var matched = skillNorm.some(function (u) { return u.indexOf(s) !== -1 || s.indexOf(u) !== -1; })
          || allText.indexOf(s) !== -1;
        if (matched) {
          score += 4;
          hits.push(sk);
        }
      });
      score += experienceBoost(profile.experienceKey, row.title);
      if (profile.remoteKey === "remote" && /vor ort|schicht|station|küche|lager|bauleiter/.test(row.title.toLowerCase())) {
        score -= 3;
      }
      score = Math.max(58, Math.min(96, Math.round(score)));
      var why;
      if (hits.length) {
        why = "Passung über " + hits.slice(0, 3).join(", ") + " und dein angegebenes Feld.";
      } else {
        why = "Passt zum Feld " + field.label + " und zu deiner angegebenen Erfahrung.";
      }
      return {
        title: row.title,
        score: score,
        salary: row.salary,
        why: why
      };
    });

    // If the user typed a specific title, add it as a leading candidate.
    var typed = (profile.rawField || "").trim();
    if (typed && typed.length < 60 && !roles.some(function (r) {
      return C.normalize(r.title).indexOf(C.normalize(typed)) !== -1;
    })) {
      roles.push({
        title: typed,
        score: 88,
        salary: "je nach Ausschreibung",
        why: "Übernommen aus deiner Formulierung, als konkretes Suchziel."
      });
    }

    roles.sort(function (a, b) { return b.score - a.score; });
    return roles.slice(0, 5);
  };

  C.coverLetter = function (profile, roleTitle) {
    var field = (profile.fieldKey && C.FIELDS[profile.fieldKey]) || C.GENERIC;
    var exp = C.EXPERIENCE.find(function (e) { return e.key === profile.experienceKey; });
    var expHint = exp ? exp.hint : "berufliche Erfahrung";
    var skills = (profile.skills || []).slice(0, 4);
    var skillPart = skills.length
      ? "Besonders bringe ich Kenntnisse in " + skills.join(", ") + " mit."
      : "Die im Profil genannten Schwerpunkte möchte ich gezielt einbringen.";
    var loc = profile.location || "Deutschland";
    var remote = C.REMOTE.find(function (r) { return r.key === profile.remoteKey; });
    var place;
    if (profile.remoteKey === "remote") {
      place = "im Remote-Modell";
    } else if (profile.remoteKey === "hybrid") {
      place = "in " + loc + " (hybrid)";
    } else if (profile.remoteKey === "onsite") {
      place = "vor Ort in " + loc;
    } else {
      place = "in " + loc;
    }
    var title = roleTitle || (profile.suggestions && profile.suggestions[0] && profile.suggestions[0].title) || field.label;

    var hookExtra = "";
    if (profile.adHighlights && profile.adHighlights.length) {
      hookExtra = " In Ihrer Ausschreibung spreche ich besonders auf " +
        profile.adHighlights.slice(0, 3).join(", ") + " an.";
    }
    var signOff = (profile.personName || "").trim() || "[Dein Name]";

    return [
      "Sehr geehrte Damen und Herren,",
      "",
      "mit Interesse bewerbe ich mich um eine Position als " + title + " " + place + ".",
      "",
      "In meiner bisherigen Laufbahn habe ich " + expHint + " im Bereich " + field.label + " gesammelt. " + skillPart + " Dabei liegt mein Fokus auf " + field.coverHook + "." + hookExtra,
      "",
      "Gerne erläutere ich in einem Gespräch, wie ich zu Ihren Aufgaben beitrage, und passe diesen Entwurf an die konkrete Ausschreibung an.",
      "",
      "Mit freundlichen Grüßen",
      signOff
    ].join("\n");
  };

  C.searchLinks = function (query, location, remoteKey) {
    var q = (query || "").trim() || "Stelle";
    var loc = (location || "").trim();
    if (!loc || /^deutschlandweit|remote$/i.test(loc)) loc = "Deutschland";
    var qEnc = encodeURIComponent(q);
    var lEnc = encodeURIComponent(loc);
    var indeedQ = encodeURIComponent(remoteKey === "remote" ? q + " Remote" : q);
    var linkedinLoc = encodeURIComponent(/deutschland/i.test(loc) ? "Germany" : loc + ", Germany");
    return [
      { name: "StepStone", hint: "Suche in Deutschland", url: "https://www.stepstone.de/jobs?ke=" + qEnc + "&l=" + lEnc },
      { name: "Indeed", hint: "de.indeed.com", url: "https://de.indeed.com/jobs?q=" + indeedQ + "&l=" + lEnc },
      { name: "LinkedIn Jobs", hint: "Jobsuche", url: "https://www.linkedin.com/jobs/search/?keywords=" + qEnc + "&location=" + linkedinLoc },
      { name: "Jobbörse der BA", hint: "Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de/jobsuche/suche?angebotsart=1&was=" + qEnc + "&wo=" + lEnc }
    ];
  };

  C.interviewFeedback = function (answer, profile) {
    var t = String(answer || "").trim();
    var words = t ? t.split(/\s+/).length : 0;
    var star = /situation|aufgabe|task|action|handlung|vorgehen|resultat|ergebnis|danach|beispiel|projekt|konkret/i.test(t);
    var skillHit = (profile.skills || []).some(function (s) {
      return s && t.toLowerCase().indexOf(s.toLowerCase()) !== -1;
    });

    if (words < 20) {
      return "Das ist ein Anfang, aber noch knapp. Versuch die STAR-Methode: Situation, Aufgabe, Aktion, Resultat. Ein konkretes Beispiel mit deinem eigenen Beitrag reicht oft schon.";
    }
    var parts = ["Danke, das lässt sich schon nachvollziehen."];
    if (star) parts.push("Gut, dass du ein konkretes Beispiel nutzt.");
    else parts.push("Noch klarer wird die Antwort, wenn du ein Beispiel nach der STAR-Methode aufbaust (Situation, Aufgabe, Aktion, Resultat).");
    if (skillHit) parts.push("Dass du deine Fachkenntnisse einbeziehst, hilft der einordnenden Person.");
    if (words > 180) parts.push("Du kannst etwas straffen: etwa zwei Minuten Sprechzeit sind meist ein guter Rahmen.");
    return parts.join(" ");
  };

  C.fieldOf = function (profile) {
    return (profile.fieldKey && C.FIELDS[profile.fieldKey]) || C.GENERIC;
  };

  C.classifyPaste = function (text) {
    var n = C.normalize(text);
    var adScore = 0, cvScore = 0;
    ["wir suchen", "wir bieten", "aufgaben", "anforderungen", "qualifikation", "stellenbeschreibung", "job description", "your profile", "about the role", "bewerben sie sich", "vollzeit", "teilzeit", "unbefristet", "das erwarten wir", "sie bringen mit"].forEach(function (k) {
      if (n.indexOf(C.normalize(k)) !== -1) adScore += 2;
    });
    ["lebenslauf", "berufserfahrung", "ausbildung", "schulbildung", "kenntnisse", "work experience", "education", "referenzen", "studium", "zeugnis"].forEach(function (k) {
      if (n.indexOf(C.normalize(k)) !== -1) cvScore += 2;
    });
    if (adScore === 0 && cvScore === 0) {
      if (text.length > 280) adScore = 1;
    }
    if (adScore >= cvScore) return "ad";
    return "cv";
  };

  function collectSkillPool() {
    var pool = [];
    Object.keys(C.FIELDS).forEach(function (key) {
      var f = C.FIELDS[key];
      (f.skills || []).forEach(function (s) { pool.push(s); });
      (f.titles || []).forEach(function (row) {
        (row.skills || []).forEach(function (s) { pool.push(s); });
      });
    });
    return pool;
  }

  C.extractHighlights = function (text) {
    var n = C.normalize(text);
    var found = [];
    var seen = {};
    collectSkillPool().forEach(function (s) {
      var k = C.normalize(s);
      if (k && n.indexOf(k) !== -1 && !seen[k]) {
        seen[k] = true;
        found.push(s);
      }
    });
    return found.slice(0, 10);
  };

  C.guessTitleFromAd = function (text) {
    var lines = String(text || "").split(/\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    var first = lines[0] || "";
    if (first.length > 8 && first.length < 80 && !/wir suchen|aufgaben|anforderungen/i.test(first)) return first;
    var m = String(text).match(/(?:als|position(?: als)?|stelle als)\s+([^,.\n]{4,70})/i);
    if (m) return m[1].trim();
    return "";
  };

  C.analyzeJobAd = function (text, profile) {
    var fieldKey = C.detectField(text) || profile.fieldKey;
    var title = C.guessTitleFromAd(text) || (profile.desiredTitle || "") || (profile.suggestions && profile.suggestions[0] && profile.suggestions[0].title) || (fieldKey && C.FIELDS[fieldKey].label) || "die ausgeschriebene Position";
    var required = C.extractHighlights(text);
    var have = (profile.skills || []).map(C.normalize);
    var overlap = [];
    var gaps = [];
    required.forEach(function (s) {
      var k = C.normalize(s);
      var ok = have.some(function (u) { return u.indexOf(k) !== -1 || k.indexOf(u) !== -1; });
      if (ok) overlap.push(s);
      else gaps.push(s);
    });
    var score = 62;
    if (fieldKey && profile.fieldKey && fieldKey === profile.fieldKey) score += 12;
    else if (fieldKey && !profile.fieldKey) score += 6;
    score += Math.min(16, overlap.length * 5);
    score -= Math.min(10, gaps.length * 2);
    if (profile.experienceKey === "senior" || profile.experienceKey === "lead") score += 4;
    if (profile.experienceKey === "entry") score -= 2;
    score = Math.max(48, Math.min(96, Math.round(score)));
    var fieldLabel = (fieldKey && C.FIELDS[fieldKey] && C.FIELDS[fieldKey].label) || profile.fieldLabel || "Allgemein";
    var lines = [];
    lines.push("Ausgeschriebene Rolle (erkannt): " + title + ".");
    lines.push("Feld: " + fieldLabel + ". Geschätzte Passung zu deinem Profil: " + score + " % (Orientierung).");
    if (overlap.length) lines.push("Vorhandene Überschneidungen: " + overlap.slice(0, 6).join(", ") + ".");
    if (gaps.length) lines.push("In der Anzeige genannt, in deinem Profil noch nicht: " + gaps.slice(0, 6).join(", ") + ".");
    if (!required.length) lines.push("Es ließen sich nur wenige konkrete Anforderungen automatisch erkennen. Prüfe die Anzeige selbst auf Pflichtqualifikationen.");
    return {
      title: title,
      fieldKey: fieldKey,
      fieldLabel: fieldLabel,
      score: score,
      overlap: overlap,
      gaps: gaps,
      highlights: overlap.concat(gaps).slice(0, 5),
      summary: lines.join(" ")
    };
  };

  C.extractFromCv = function (text) {
    var fieldKey = C.detectField(text);
    var skills = C.extractHighlights(text);
    var years = text.match(/(\d{1,2})\s*(?:\+\s*)?(?:jahre|jährig|years)/i);
    var expKey = "mid";
    if (years) {
      var n = parseInt(years[1], 10);
      if (n <= 1) expKey = "entry";
      else if (n <= 3) expKey = "junior";
      else if (n <= 7) expKey = "mid";
      else expKey = "senior";
    } else {
      expKey = C.detectExperience(text) || "mid";
    }
    var loc = "";
    var cities = C.CITIES || [];
    cities.forEach(function (c) {
      if (!loc && new RegExp("\\b" + c + "\\b", "i").test(text)) loc = c;
    });
    return {
      fieldKey: fieldKey,
      fieldLabel: fieldKey && C.FIELDS[fieldKey] ? C.FIELDS[fieldKey].label : "",
      skills: skills,
      experienceKey: expKey,
      location: loc
    };
  };
})(window.Careon);

