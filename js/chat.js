/* Careon assistant – guided, client-side conversation UI. */
window.Careon = window.Careon || {};

(function (C) {
  "use strict";

  var root, logEl, formEl, inputEl, sendEl, progressEl, progressBarEl, appEl;
  var typing = false;
  var queue = Promise.resolve();

  var STORE_KEY = "careon-session-v1";
  var messages = [];
  var persistTimer = null;
  var restoring = false;

  var state = {
    step: "welcome",
    profile: blankProfile(),
    interviewIndex: 0
  };

  function blankProfile() {
    return {
      fieldKey: null,
      fieldLabel: "",
      rawField: "",
      skills: [],
      skillsText: "",
      experienceKey: "",
      experienceLabel: "",
      location: "",
      remoteKey: "",
      remoteLabel: "",
      suggestions: [],
      personName: "",
      email: "",
      desiredTitle: "",
      adHighlights: []
    };
  }

  var FIELD_CHIPS = [
    "IT & Software", "Daten & Analyse", "Design & UX", "Marketing", "Vertrieb",
    "Finanzen & Controlling", "Personalwesen", "Ingenieurwesen", "Pflege",
    "Handwerk & Technik", "Verwaltung & Öffentlicher Dienst", "Bildung & Training"
  ];

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function setIdle(idle) {
    if (appEl) appEl.setAttribute("data-chat-idle", idle ? "true" : "false");
    if (sendEl) sendEl.disabled = typing;
  }

  function scrollToEnd() {
    if (!logEl) return;
    logEl.scrollTop = logEl.scrollHeight;
  }

  function updateProgress() {
    var steps = ["field", "skills", "experience", "location", "remote"];
    var idx = steps.indexOf(state.step);
    if (!progressEl || !progressBarEl) return;
    if (idx === -1) {
      progressEl.hidden = true;
      progressBarEl.hidden = true;
      progressBarEl.classList.remove("is-on");
      return;
    }
    var n = idx + 1;
    progressEl.hidden = false;
    progressEl.textContent = "Schritt " + n + " von 5";
    progressBarEl.hidden = false;
    progressBarEl.classList.add("is-on");
    progressBarEl.firstElementChild.style.width = (n / 5) * 100 + "%";
  }

  function addUser(text) {
    var wrap = el("div", "msg msg-user");
    wrap.appendChild(el("div", "bubble", text));
    logEl.appendChild(wrap);
    scrollToEnd();
    messages.push({ role: "user", text: text });
    schedulePersist();
  }

  function addBotShell() {
    var wrap = el("div", "msg msg-bot");
    var bubble = el("div", "bubble");
    wrap.appendChild(bubble);
    logEl.appendChild(wrap);
    return bubble;
  }

  function typeText(bubble, text) {
    if (prefersReducedMotion() || text.length > 420) {
      bubble.textContent = text;
      scrollToEnd();
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      var i = 0;
      var skip = false;
      function finish() {
        bubble.textContent = text;
        bubble.removeEventListener("click", onSkip);
        scrollToEnd();
        resolve();
      }
      function onSkip() { skip = true; }
      bubble.addEventListener("click", onSkip);
      function tick() {
        if (skip) return finish();
        i += 2;
        bubble.textContent = text.slice(0, i);
        scrollToEnd();
        if (i >= text.length) return finish();
        setTimeout(tick, 10);
      }
      tick();
    });
  }

  function showTyping() {
    var wrap = el("div", "msg msg-bot");
    wrap.dataset.typing = "1";
    var bubble = el("div", "bubble typing");
    bubble.setAttribute("aria-label", "Assistent schreibt");
    bubble.appendChild(el("span"));
    bubble.appendChild(el("span"));
    bubble.appendChild(el("span"));
    wrap.appendChild(bubble);
    logEl.appendChild(wrap);
    scrollToEnd();
    return wrap;
  }

  function speak(text, options) {
    options = options || {};
    queue = queue.then(function () {
      typing = true;
      setIdle(false);
      var dots = showTyping();
      var delay = prefersReducedMotion() ? 0 : 420 + Math.min(400, text.length * 2);
      return wait(delay).then(function () {
        dots.remove();
        var bubble = addBotShell();
        return typeText(bubble, text).then(function () { return bubble; });
      }).then(function (bubble) {
        var rec = { role: "bot", text: text };
        messages.push(rec);
        if (options.after) options.after(bubble, rec);
        schedulePersist();
        typing = false;
        setIdle(true);
        scrollToEnd();
      });
    });
    return queue;
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function addChips(items, onPick, extraClass) {
    var box = el("div", "chips");
    items.forEach(function (item) {
      var label = typeof item === "string" ? item : item.label;
      var value = typeof item === "string" ? item : item.value;
      var btn = el("button", "chip" + (extraClass ? " " + extraClass : ""), label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (typing) return;
        box.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
        onPick(value, label);
      });
      box.appendChild(btn);
    });
    logEl.appendChild(box);
    scrollToEnd();
  }

  function renderJobs(bubble, roles) {
    var list = el("div", "job-list");
    roles.forEach(function (role) {
      var card = el("article", "job-card");
      var top = el("div", "job-card-top");
      top.appendChild(el("h3", null, role.title));
      top.appendChild(el("span", "match", role.score + " % Passung"));
      card.appendChild(top);
      card.appendChild(el("p", "why", role.why));
      var meta = "Orientierung Gehalt: " + role.salary;
      if (state.profile.remoteLabel) meta += " · " + state.profile.remoteLabel;
      if (state.profile.location) meta += " · " + state.profile.location;
      card.appendChild(el("p", "meta", meta));
      list.appendChild(card);
    });
    bubble.appendChild(list);
  }

  function renderTips(bubble, tips) {
    var box = el("div", "tips-box");
    var list = document.createElement("ul");
    tips.forEach(function (t) {
      list.appendChild(el("li", null, t));
    });
    box.appendChild(list);
    bubble.appendChild(box);
  }

  function renderLetter(bubble, letter, rec) {
    if (rec) rec.letter = letter;
    var box = el("div", "letter-box");
    var pre = document.createElement("pre");
    pre.textContent = letter;
    box.appendChild(pre);
    var row = el("div", "copy-row");
    var btn = el("button", "btn btn-primary", "Anschreiben kopieren");
    btn.type = "button";
    btn.addEventListener("click", function () {
      copyText(letter).then(function () {
        btn.textContent = "Kopiert";
        setTimeout(function () { btn.textContent = "Anschreiben kopieren"; }, 1600);
      }).catch(function () {
        btn.textContent = "Kopieren nicht möglich";
      });
    });
    row.appendChild(btn);
    if (navigator.share) {
      var share = el("button", "btn btn-ghost", "Teilen");
      share.type = "button";
      share.addEventListener("click", function () {
        navigator.share({ title: "Anschreiben", text: letter }).catch(function () {});
      });
      row.appendChild(share);
    }
    box.appendChild(row);
    bubble.appendChild(box);
  }

  function renderLinks(bubble, links) {
    var list = el("div", "link-list");
    links.forEach(function (item) {
      var a = el("a", "job-link");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.appendChild(document.createTextNode(item.name));
      a.appendChild(el("small", null, item.hint));
      list.appendChild(a);
    });
    bubble.appendChild(list);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function showMenu() {
    addChips(C.MENU.map(function (m) {
      return { label: m.label, value: m.id };
    }), handleMenu, "is-accent");
  }

  function handleMenu(id) {
    var labels = { cv: "Lebenslauf-Tipps", cover: "Anschreiben erstellen", interview: "Interview üben", search: "Jobs suchen", reset: "Neue Suche" };
    addUser(labels[id] || id);
    if (id === "cv") return offerCv();
    if (id === "cover") return offerCover();
    if (id === "interview") return startInterview();
    if (id === "search") return offerSearch();
    if (id === "reset") return resetConversation();
  }

  function offerCv() {
    state.step = "menu";
    var tips = C.fieldOf(state.profile).cvTips;
    return speak("Hier sind konkrete Hinweise für deinen Lebenslauf – angepasst an " + (state.profile.fieldLabel || "dein Profil") + ".", {
      after: function (bubble, rec) {
        if (rec) rec.tips = tips;
        renderTips(bubble, tips);
      }
    }).then(function () {
      speak("Möchtest du als Nächstes einen Anschreiben-Entwurf, Interviewfragen oder Suchlinks?");
      showMenu();
    });
  }

  function offerCover() {
    state.step = "cover-pick";
    var roles = state.profile.suggestions || [];
    if (!roles.length) {
      applyIdentityToProfile();
      var letter = C.coverLetter(state.profile);
      return speak("Hier ist ein kurzer formeller Entwurf. Bitte passe ihn an die jeweilige Ausschreibung an und ersetze den Namensplatzhalter.", {
        after: function (bubble, rec) { renderLetter(bubble, letter, rec); }
      }).then(function () { showMenu(); });
    }
    return speak("Für welche Rolle soll der Entwurf gelten?").then(function () {
      addChips(roles.map(function (r) { return r.title; }), function (title) {
        addUser(title);
        applyIdentityToProfile();
        var letter = C.coverLetter(state.profile, title);
        speak("Hier ist ein kurzer formeller Entwurf für „" + title + "“. Bitte prüfe ihn und ersetze [Dein Name].", {
          after: function (bubble, rec) { renderLetter(bubble, letter, rec); }
        }).then(function () {
          state.step = "menu";
          showMenu();
        });
      });
    });
  }

  function startInterview() {
    state.step = "interview";
    state.interviewIndex = 0;
    var qs = C.fieldOf(state.profile).interview;
    return speak("Gut. Ich stelle typische Fragen zum Feld " + (state.profile.fieldLabel || "deiner Richtung") + ". Antworte in deinen Worten, danach bekommst du eine kurze Rückmeldung.\n\n" + qs[0]);
  }

  function offerSearch() {
    state.step = "menu";
    var top = (state.profile.suggestions[0] && state.profile.suggestions[0].title) || state.profile.fieldLabel || "Stelle";
    var links = C.searchLinks(top, state.profile.location, state.profile.remoteKey);
    return speak("Diese Links öffnen eine Suche nach „" + top + "“ in " + (state.profile.location || "Deutschland") + " auf den großen Jobbörsen. Die Angebote selbst kommen von den jeweiligen Seiten.", {
      after: function (bubble, rec) { if (rec) rec.links = links; renderLinks(bubble, links); }
    }).then(function () {
      if (state.profile.suggestions.length > 1) {
        var extra = state.profile.suggestions[1].title;
        var more = C.searchLinks(extra, state.profile.location, state.profile.remoteKey);
        speak("Zusätzlich eine Suche nach „" + extra + "“.", {
          after: function (bubble, rec) { if (rec) rec.links = more; renderLinks(bubble, more); }
        }).then(function () { showMenu(); });
      } else {
        showMenu();
      }
    });
  }

  function presentResults() {
    var roles = C.scoreRoles(state.profile);
    state.profile.suggestions = roles;
    state.step = "menu";
    updateProgress();
    var intro = "Auf Grundlage deiner Angaben – " +
      (state.profile.fieldLabel || "dein Profil") +
      ", " + (state.profile.experienceLabel || "angegebene Erfahrung") +
      (state.profile.location ? ", " + state.profile.location : "") +
      (state.profile.remoteLabel ? ", " + state.profile.remoteLabel : "") +
      " – schlage ich diese Rollen vor. Die Passung ist eine Orientierung, kein Ranking einer echten Ausschreibung.";
    return speak(intro, {
      after: function (bubble, rec) { if (rec) rec.jobs = roles; renderJobs(bubble, roles); }
    }).then(function () {
      speak("Was möchtest du als Nächstes tun?");
      showMenu();
    });
  }

  function askField() {
    state.step = "field";
    updateProgress();
    return speak("In welchem Bereich möchtest du suchen? Du kannst ein Feld wählen oder deine Richtung frei beschreiben – auch ein konkreter Jobtitel ist in Ordnung.").then(function () {
      addChips(FIELD_CHIPS, function (label) {
        acceptField(label);
      });
    });
  }

  function acceptField(text) {
    addUser(text);
    state.profile.rawField = text;
    var key = C.detectField(text);
    state.profile.fieldKey = key;
    state.profile.fieldLabel = key ? C.FIELDS[key].label : text;
    askSkills();
  }

  function askSkills() {
    state.step = "skills";
    updateProgress();
    var field = C.fieldOf(state.profile);
    var intro = keyKnown()
      ? "Danke. Ich ordne das dem Feld „" + field.label + "“ zu. Welche Kenntnisse oder Schwerpunkte bringst du mit? Du kannst mehrere nennen."
      : "Danke. Welche Kenntnisse, Werkzeuge oder Schwerpunkte bringst du mit? Du kannst mehrere nennen, getrennt durch Kommas.";
    return speak(intro).then(function () {
      if (field.skills && field.skills.length) {
        addChips(field.skills, function (skill) {
          // Allow multiple? For simplicity, picking a chip submits that skill
          // but users often want several. We'll accept the chip as part of the answer
          // and also keep the field open... Better: toggle is complex.
          // If they tap one skill, treat it as the answer but they can type more.
          acceptSkills(skill);
        });
      }
    });
  }

  function keyKnown() {
    return !!state.profile.fieldKey;
  }

  function acceptSkills(text) {
    addUser(text);
    state.profile.skillsText = text;
    var parsed = C.parseSkills(text);
    if (!parsed.length) parsed = [text.trim()];
    state.profile.skills = parsed;
    askExperience();
  }

  function askExperience() {
    state.step = "experience";
    updateProgress();
    return speak("Wie viel Berufserfahrung bringst du in diesem Feld mit?").then(function () {
      addChips(C.EXPERIENCE.map(function (e) {
        return { label: e.label, value: e.key };
      }), function (key, label) {
        addUser(label);
        state.profile.experienceKey = key;
        state.profile.experienceLabel = label;
        askLocation();
      });
    });
  }

  function askLocation() {
    state.step = "location";
    updateProgress();
    return speak("Wo möchtest du arbeiten? Wähle einen Ort oder tippe Stadt, Region oder „Remote“.").then(function () {
      addChips(C.CITIES, function (city) {
        acceptLocation(city);
      });
    });
  }

  function acceptLocation(text) {
    addUser(text);
    state.profile.location = text.trim();
    var city = document.getElementById("field-city");
    if (city && !city.value && !/deutschlandweit|remote/i.test(text)) city.value = text.trim();
    askRemote();
  }

  function askRemote() {
    state.step = "remote";
    updateProgress();
    return speak("Wie soll das Arbeitsmodell aussehen?").then(function () {
      addChips(C.REMOTE.map(function (r) {
        return { label: r.label, value: r.key };
      }), function (key, label) {
        addUser(label);
        state.profile.remoteKey = key;
        state.profile.remoteLabel = label;
        presentResults();
      });
    });
  }

  function resetConversation() {
    state.step = "welcome";
    state.profile = blankProfile();
    state.interviewIndex = 0;
    messages = [];
    try { localStorage.removeItem(STORE_KEY); } catch (err) {}
    logEl.innerHTML = "";
    updateProgress();
    welcome(true);
  }

  function welcome(again) {
    var text = again
      ? "Alles klar, wir beginnen erneut. Womit sollen wir starten?"
      : "Hallo, ich bin der Careon-Assistent. In wenigen Schritten klären wir dein Profil. Danach bekommst du Rollenvorschläge, Hinweise zum Lebenslauf, einen Anschreiben-Entwurf und Links zu Jobbörsen.\n\nWomit sollen wir beginnen?";
    return speak(text).then(function () {
      addChips([
        { label: "Los geht's", value: "start" },
        { label: "Was kannst du?", value: "about" }
      ], function (value, label) {
        addUser(label);
        if (value === "about") {
          speak("Ich arbeite regelbasiert in deinem Browser: Ich ordne deine Angaben einem Berufsfeld zu, schlage passende Jobtitel vor, formuliere einen kurzen Anschreiben-Entwurf, stelle typische Interviewfragen und öffne Suchen auf StepStone, Indeed, LinkedIn und der Jobbörse der Bundesagentur für Arbeit. Es werden keine Daten an einen Server geschickt.\n\nWenn du soweit bist, starten wir mit dem Berufsfeld.").then(function () {
            addChips([{ label: "Los geht's", value: "start" }], function (v, l) {
              addUser(l);
              askField();
            });
          });
        } else {
          askField();
        }
      });
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    if (typing) return;
    var value = (inputEl.value || "").trim();
    if (!value) return;
    inputEl.value = "";
    handleText(value);
  }

  function handleText(value) {
    var step = state.step;
    if (step === "welcome") {
      addUser(value);
      if (/was kannst|hilfe|funktionen/i.test(value)) {
        speak("Ich helfe bei Rollenvorschlägen, Lebenslauf, Anschreiben, Interviewfragen und Suchlinks. Lass uns mit deinem Berufsfeld beginnen.").then(askField);
      } else {
        acceptField(value);
      }
      return;
    }
    if (step === "field") return acceptField(value);
    if (step === "skills") return acceptSkills(value);
    if (step === "experience") {
      addUser(value);
      var key = C.detectExperience(value);
      state.profile.experienceKey = key || "mid";
      var found = C.EXPERIENCE.find(function (e) { return e.key === state.profile.experienceKey; });
      state.profile.experienceLabel = found ? found.label : value;
      return askLocation();
    }
    if (step === "location") return acceptLocation(value);
    if (step === "remote") {
      addUser(value);
      var n = C.normalize(value);
      var key = "flex";
      if (/remote|homeoffice|home office/.test(n)) key = "remote";
      else if (/hybrid/.test(n)) key = "hybrid";
      else if (/vor ort|praesenz|büro|buero/.test(n)) key = "onsite";
      var found = C.REMOTE.find(function (r) { return r.key === key; });
      state.profile.remoteKey = key;
      state.profile.remoteLabel = found ? found.label : value;
      return presentResults();
    }
    if (step === "cover-pick") {
      addUser(value);
      var letter = C.coverLetter(state.profile, value);
      return speak("Hier ist ein Entwurf, angelehnt an „" + value + "“. Bitte prüfe ihn vor dem Versand.", {
        after: function (bubble, rec) { renderLetter(bubble, letter, rec); }
      }).then(function () {
        state.step = "menu";
        showMenu();
      });
    }
    if (step === "interview") {
      addUser(value);
      var qs = C.fieldOf(state.profile).interview;
      var feedback = C.interviewFeedback(value, state.profile);
      state.interviewIndex += 1;
      return speak(feedback).then(function () {
        if (state.interviewIndex < qs.length) {
          return speak("Nächste Frage:\n\n" + qs[state.interviewIndex]).then(function () {
            addChips([{ label: "Zurück zur Übersicht", value: "menu" }], function (v, l) {
              addUser(l);
              state.step = "menu";
              speak("Gern. Womit möchtest du weitermachen?");
              showMenu();
            });
          });
        }
        state.step = "menu";
        speak("Das waren die vorbereiteten Fragen zu diesem Feld. Womit möchtest du weitermachen?");
        showMenu();
      });
    }
    // menu / fallback intents
    addUser(value);
    var n = C.normalize(value);
    if (/lebenslauf|cv|resume/.test(n)) return offerCv();
    if (/anschreiben|cover|bewerbungsschreiben/.test(n)) return offerCover();
    if (/interview|gespraech|vorstellungs/.test(n)) return startInterview();
    if (/job|suche|stepstone|indeed|boerse|börse/.test(n)) return offerSearch();
    if (/neu|nochmal|reset|von vorn/.test(n)) return resetConversation();
    speak("Ich kann Lebenslauf-Tipps, einen Anschreiben-Entwurf, Interviewfragen oder Suchlinks anbieten. Du kannst auch eine neue Suche starten.").then(showMenu);
  }

  C.detectExperience = function (text) {
    var n = C.normalize(text);
    if (/fuehrung|leitung|lead|chef|head/.test(n)) return "lead";
    if (/einstieg|absolvent|ausbildung|studium|werkstudent|berufsanfang|0-?1/.test(n)) return "entry";
    if (/\b(1|2|3)\b|1-3|junior/.test(n)) return "junior";
    if (/7\+|mehr als 7|ueber 7|senior|zehn|10/.test(n)) return "senior";
    if (/3-7|4|5|6|mid/.test(n)) return "mid";
    return "mid";
  };

  function identityFields() {
    return {
      name: document.getElementById("field-name"),
      email: document.getElementById("field-email"),
      city: document.getElementById("field-city"),
      title: document.getElementById("field-title")
    };
  }

  function readIdentity() {
    var f = identityFields();
    return {
      personName: f.name ? f.name.value.trim() : "",
      email: f.email ? f.email.value.trim() : "",
      city: f.city ? f.city.value.trim() : "",
      desiredTitle: f.title ? f.title.value.trim() : ""
    };
  }

  function applyIdentityToProfile() {
    var id = readIdentity();
    if (id.personName) state.profile.personName = id.personName;
    if (id.email) state.profile.email = id.email;
    if (id.desiredTitle) state.profile.desiredTitle = id.desiredTitle;
    if (id.city) state.profile.location = state.profile.location || id.city;
  }

  function writeIdentity() {
    var f = identityFields();
    if (f.name && state.profile.personName) f.name.value = state.profile.personName;
    if (f.email && state.profile.email) f.email.value = state.profile.email;
    if (f.city && (state.profile.location || "")) {
      if (!/deutschlandweit|remote/i.test(state.profile.location)) f.city.value = state.profile.location;
    }
    if (f.title && state.profile.desiredTitle) f.title.value = state.profile.desiredTitle;
  }

  function schedulePersist() {
    if (restoring) return;
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(persist, 80);
  }

  function persist() {
    try {
      applyIdentityToProfile();
      var payload = {
        version: 1,
        step: state.step,
        profile: state.profile,
        interviewIndex: state.interviewIndex,
        identity: readIdentity(),
        messages: messages
      };
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
    } catch (err) {}
  }

  function loadSession() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.version !== 1 || !Array.isArray(data.messages) || !data.messages.length) return null;
      return data;
    } catch (err) {
      return null;
    }
  }

  function renderRecord(rec) {
    if (rec.role === "user") {
      var wrap = el("div", "msg msg-user");
      wrap.appendChild(el("div", "bubble", rec.text || ""));
      logEl.appendChild(wrap);
      return;
    }
    var wrap = el("div", "msg msg-bot");
    var bubble = el("div", "bubble", rec.text || "");
    wrap.appendChild(bubble);
    logEl.appendChild(wrap);
    if (rec.jobs) renderJobs(bubble, rec.jobs);
    if (rec.tips) renderTips(bubble, rec.tips);
    if (rec.letter) renderLetter(bubble, rec.letter);
    if (rec.links) renderLinks(bubble, rec.links);
  }

  function showChipsForStep() {
    var step = state.step;
    if (step === "welcome") {
      addChips([
        { label: "Los geht's", value: "start" },
        { label: "Was kannst du?", value: "about" }
      ], function (value, label) {
        addUser(label);
        if (value === "about") {
          speak("Ich arbeite regelbasiert in deinem Browser: Ich ordne deine Angaben einem Berufsfeld zu, schlage passende Jobtitel vor, formuliere einen kurzen Anschreiben-Entwurf, stelle typische Interviewfragen und öffne Suchen auf StepStone, Indeed, LinkedIn und der Jobbörse der Bundesagentur für Arbeit. Es werden keine Daten an einen Server geschickt.\n\nWenn du soweit bist, starten wir mit dem Berufsfeld.").then(function () {
            addChips([{ label: "Los geht's", value: "start" }], function (v, l) {
              addUser(l);
              askField();
            });
          });
        } else {
          askField();
        }
      });
      return;
    }
    if (step === "field") return addChips(FIELD_CHIPS, function (label) { acceptField(label); });
    if (step === "skills") {
      var field = C.fieldOf(state.profile);
      if (field.skills && field.skills.length) addChips(field.skills, function (skill) { acceptSkills(skill); });
      return;
    }
    if (step === "experience") {
      return addChips(C.EXPERIENCE.map(function (e) { return { label: e.label, value: e.key }; }), function (key, label) {
        addUser(label);
        state.profile.experienceKey = key;
        state.profile.experienceLabel = label;
        askLocation();
      });
    }
    if (step === "location") return addChips(C.CITIES, function (city) { acceptLocation(city); });
    if (step === "remote") {
      return addChips(C.REMOTE.map(function (r) { return { label: r.label, value: r.key }; }), function (key, label) {
        addUser(label);
        state.profile.remoteKey = key;
        state.profile.remoteLabel = label;
        presentResults();
      });
    }
    if (step === "cover-pick") {
      var roles = state.profile.suggestions || [];
      if (roles.length) addChips(roles.map(function (r) { return r.title; }), function (title) {
        addUser(title);
        applyIdentityToProfile();
        var letter = C.coverLetter(state.profile, title);
        speak("Hier ist ein kurzer formeller Entwurf für „" + title + "“. Bitte prüfe ihn und ersetze den Namensplatzhalter, falls er noch fehlt.", {
          after: function (bubble, rec) { renderLetter(bubble, letter, rec); }
        }).then(function () {
          state.step = "menu";
          showMenu();
        });
      });
      return;
    }
    if (step === "interview") {
      addChips([{ label: "Zurück zur Übersicht", value: "menu" }], function (v, l) {
        addUser(l);
        state.step = "menu";
        speak("Gern. Womit möchtest du weitermachen?");
        showMenu();
      });
      return;
    }
    if (step === "menu" || step === "cover" || step === "search") showMenu();
  }

  function restoreSession(data) {
    restoring = true;
    state.step = data.step || "welcome";
    state.profile = Object.assign(blankProfile(), data.profile || {});
    state.interviewIndex = data.interviewIndex || 0;
    messages = data.messages.slice();
    if (data.identity) {
      var f = identityFields();
      if (f.name) f.name.value = data.identity.personName || "";
      if (f.email) f.email.value = data.identity.email || "";
      if (f.city) f.city.value = data.identity.city || "";
      if (f.title) f.title.value = data.identity.desiredTitle || "";
    } else {
      writeIdentity();
    }
    logEl.innerHTML = "";
    messages.forEach(renderRecord);
    updateProgress();
    showChipsForStep();
    restoring = false;
    setIdle(true);
    scrollToEnd();
  }

  function openPastePanel() {
    var panel = document.getElementById("paste-panel");
    var area = document.getElementById("paste-fallback");
    if (!panel) return;
    panel.hidden = false;
    panel.classList.add("is-open");
    if (area) {
      area.value = "";
      area.focus();
    }
  }

  function closePastePanel() {
    var panel = document.getElementById("paste-panel");
    if (!panel) return;
    panel.hidden = true;
    panel.classList.remove("is-open");
  }

  function handlePastedText(text) {
    text = String(text || "").trim();
    if (!text) return;
    applyIdentityToProfile();
    var kind = C.classifyPaste(text);
    var preview = text.length > 90 ? text.slice(0, 90).replace(/\s+/g, " ") + "…" : text;
    addUser((kind === "ad" ? "Stellenanzeige eingefügt: " : "Lebenslauf eingefügt: ") + preview);

    if (kind === "ad") {
      var analysis = C.analyzeJobAd(text, state.profile);
      state.profile.adHighlights = analysis.highlights || [];
      if (analysis.fieldKey && !state.profile.fieldKey) {
        state.profile.fieldKey = analysis.fieldKey;
        state.profile.fieldLabel = analysis.fieldLabel;
      }
      var roleTitle = analysis.title || state.profile.desiredTitle;
      var letter = C.coverLetter(state.profile, roleTitle);
      return speak(analysis.summary).then(function () {
        return speak("Hier ist ein Anschreiben, das auf diese Anzeige eingeht. Bitte prüfe es vor dem Versand.", {
          after: function (bubble, rec) { renderLetter(bubble, letter, rec); }
        });
      }).then(function () {
        if (state.step === "welcome" || state.step === "field") {
          speak("Du kannst das Gespräch weiterführen oder eine der Funktionen wählen.");
          showMenu();
          state.step = state.profile.experienceKey ? "menu" : state.step;
        } else {
          showMenu();
          state.step = "menu";
        }
      });
    }

    var extracted = C.extractFromCv(text);
    var parts = ["Ich habe aus dem eingefügten Lebenslauf folgende Angaben gelesen."];
    if (extracted.fieldLabel) parts.push("Feld: " + extracted.fieldLabel + ".");
    if (extracted.skills.length) parts.push("Kenntnisse: " + extracted.skills.slice(0, 8).join(", ") + ".");
    if (extracted.experienceKey) {
      var exp = C.EXPERIENCE.find(function (e) { return e.key === extracted.experienceKey; });
      if (exp) parts.push("Erfahrung: " + exp.label + ".");
    }
    if (extracted.location) parts.push("Ort: " + extracted.location + ".");
    parts.push("Soll ich das in dein Profil übernehmen?");
    return speak(parts.join(" ")).then(function () {
      addChips([
        { label: "Übernehmen", value: "apply" },
        { label: "Nicht übernehmen", value: "skip" }
      ], function (value, label) {
        addUser(label);
        if (value === "apply") {
          if (extracted.fieldKey) {
            state.profile.fieldKey = extracted.fieldKey;
            state.profile.fieldLabel = extracted.fieldLabel;
            state.profile.rawField = state.profile.rawField || extracted.fieldLabel;
          }
          if (extracted.skills.length) {
            state.profile.skills = extracted.skills;
            state.profile.skillsText = extracted.skills.join(", ");
          }
          if (extracted.experienceKey) {
            state.profile.experienceKey = extracted.experienceKey;
            var exp = C.EXPERIENCE.find(function (e) { return e.key === extracted.experienceKey; });
            if (exp) state.profile.experienceLabel = exp.label;
          }
          if (extracted.location) {
            state.profile.location = extracted.location;
            var city = document.getElementById("field-city");
            if (city && !city.value) city.value = extracted.location;
          }
          schedulePersist();
          speak("Übernommen. Wir können das Gespräch fortsetzen oder die Vorschläge aktualisieren.").then(function () {
            if (state.profile.fieldKey && state.profile.experienceKey && state.profile.location) {
              presentResults();
            } else if (!state.profile.fieldKey) {
              askField();
            } else if (!state.profile.skills.length) {
              askSkills();
            } else if (!state.profile.experienceKey) {
              askExperience();
            } else if (!state.profile.location) {
              askLocation();
            } else {
              askRemote();
            }
          });
        } else {
          speak("Alles klar, der eingefügte Text bleibt unberücksichtigt.");
          showChipsForStep();
        }
      });
    });
  }

  function bindChrome() {
    var pasteBtn = document.getElementById("paste-btn");
    var pasteApply = document.getElementById("paste-apply");
    var pasteCancel = document.getElementById("paste-cancel");
    var pasteArea = document.getElementById("paste-fallback");
    if (pasteBtn) {
      pasteBtn.addEventListener("click", function () {
        if (typing) return;
        if (navigator.clipboard && typeof navigator.clipboard.readText === "function") {
          navigator.clipboard.readText().then(function (text) {
            if (text && text.trim()) handlePastedText(text);
            else openPastePanel();
          }).catch(function () {
            openPastePanel();
          });
        } else {
          openPastePanel();
        }
      });
    }
    if (pasteApply) {
      pasteApply.addEventListener("click", function () {
        var text = pasteArea ? pasteArea.value : "";
        closePastePanel();
        handlePastedText(text);
      });
    }
    if (pasteCancel) pasteCancel.addEventListener("click", closePastePanel);
    Object.keys(identityFields()).forEach(function (key) {
      var node = identityFields()[key];
      if (!node) return;
      node.addEventListener("change", function () {
        applyIdentityToProfile();
        schedulePersist();
      });
    });
  }

  C.chat = {
    init: function (mount) {
      root = mount;
      appEl = mount;
      logEl = mount.querySelector("#chat-log");
      formEl = mount.querySelector("#chat-form");
      inputEl = mount.querySelector("#chat-input");
      sendEl = mount.querySelector("#chat-send");
      progressEl = mount.querySelector("#chat-progress");
      progressBarEl = mount.querySelector("#chat-progress-bar");
      formEl.addEventListener("submit", onSubmit);
      bindChrome();
      var session = loadSession();
      if (session) restoreSession(session);
      else welcome(false);
    },
    focusInput: function () {
      if (inputEl) inputEl.focus();
    },
    reset: resetConversation
  };
})(window.Careon);
