(function(){
  "use strict";

  var SHOTS = [
    {f:"nappali-1", hu:"Nappali a kertre néző ablakokkal", en:"Living room with windows onto the garden"},
    {f:"nappali-2", hu:"Nappali, étkező és közlekedő egy térben", en:"Living room, dining area and hallway in one space"},
    {f:"etkezo-1", hu:"Étkező a beépített tálalóval", en:"Dining area with the fitted sideboard"},
    {f:"etkezo-2", hu:"Étkezősarok", en:"Dining corner", tall:true},
    {f:"konyha-1", hu:"Konyha közvetlenül az étkező mellett", en:"Kitchen right next to the dining area", tall:true},
    {f:"konyha-2", hu:"AEG gépesített konyha, mosogatógéppel", en:"Fitted AEG kitchen with dishwasher", tall:true},
    {f:"szoba-1", hu:"A nagyobbik szoba, 15,21 m²", en:"The larger bedroom, 15.21 m²"},
    {f:"szoba-2", hu:"Szoba a beépített komóddal", en:"Bedroom with the fitted chest of drawers"},
    {f:"szoba-3", hu:"Beépített szekrénysor a szobában", en:"Fitted wardrobe wall in the bedroom"},
    {f:"szoba-4", hu:"A szoba bejárati oldala", en:"The bedroom seen from the door"},
    {f:"furdo-1", hu:"Kádas fürdőszoba zuhanyfallal", en:"Bathroom with tub and shower screen", tall:true},
    {f:"furdo-2", hu:"Fürdőszoba, mosdó és tükrös szekrény", en:"Bathroom, washbasin and mirror cabinet", tall:true},
    {f:"terasz-1", hu:"A terasz, 11,09 m², bútorozva", en:"The terrace, 11.09 m², furnished", tall:true},
    {f:"terasz-2", hu:"A terasz végigfut a lakás kertre néző oldalán", en:"The terrace runs along the garden side of the flat", tall:true},
    {f:"terasz-3", hu:"A terasz a klímaburkolattal", en:"The terrace with the air conditioning enclosure", tall:true},
    {f:"terasz-4", hu:"A terasz a lakás felé", en:"The terrace looking back towards the flat", tall:true},
    {f:"wpc-1", hu:"WPC teraszburkolat, gondozásmentes", en:"WPC terrace decking, maintenance free", tall:true},
    {f:"kert-1", hu:"A belső kert a teraszról", en:"The inner garden from the terrace"},
    {f:"kert-2", hu:"A belső kert tavasszal", en:"The inner garden in spring"},
    {f:"haz-1", hu:"Tágas lift, küszöb nélkül a lakásajtóig", en:"A spacious lift, step free to the door", tall:true},
    {f:"haz-2", hu:"Két lift szolgálja az épületet", en:"Two lifts serve the building"},
    {f:"haz-3", hu:"Park Residence, a ház előtere", en:"Park Residence, the building lobby"},
    {f:"haz-5", hu:"Az előtér az utca felől", en:"The lobby from the street side"},
    {f:"haz-4", hu:"A ház a sétány felől, kávézókkal", en:"The building from the promenade, with cafés"},
    {f:"setany-1", hu:"A Corvin sétány üzletekkel, száz méterre", en:"Corvin sétány with its shops, a hundred metres away"},
    {f:"setany-2", hu:"Fasor a sétányon", en:"The tree lined promenade"},
    {f:"setany-6", hu:"A sétány a ház előtt", en:"The promenade in front of the building", tall:true},
    {f:"setany-7", hu:"Üzletek és kerékpártárolók a sétányon", en:"Shops and bike racks on the promenade", tall:true},
    {f:"setany-4", hu:"A negyed utcái", en:"The streets of the quarter", tall:true},
    {f:"setany-3", hu:"Falfestmény a szomszéd utcában", en:"A mural in the next street"},
    {f:"setany-5", hu:"Séta a Corvin negyedben", en:"A walk in the Corvin quarter", tall:true},
    {f:"setany-8", hu:"A környék régi és új házai", en:"The old and new buildings of the area", tall:true}
  ];

  var PLANS = [
    {f:"alaprajz-most", hu:"Ahogy most használjuk a lakást", en:"How we use the flat today"},
    {f:"alaprajz-terv", hu:"Három önálló szobaként", en:"As three separate rooms"}
  ];

  var MAIL_USER = "balazs.csaba";
  var MAIL_HOST = "gmail.com";
  function mailAddress(){ return MAIL_USER + "@" + MAIL_HOST; }

  var lang = "hu";
  var strip = document.getElementById("strip");

  function track(name){
    try { if (typeof window.fbq === "function") window.fbq("track", name); } catch(e){}
  }

  /* gallery ------------------------------------------------------- */
  SHOTS.forEach(function(s, i){
    var fig = document.createElement("figure");
    if (s.tall) fig.className = "tall";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shot";
    btn.setAttribute("data-i", String(i));
    var img = document.createElement("img");
    img.src = "img/" + s.f + ".jpg";
    img.srcset = "img/" + s.f + "-sm.jpg 800w, img/" + s.f + ".jpg 1600w";
    img.sizes = s.tall ? "(max-width: 900px) 58vw, 420px" : "(max-width: 900px) 90vw, 860px";
    img.alt = s.hu;
    img.loading = i < 2 ? "eager" : "lazy";
    img.decoding = "async";
    btn.appendChild(img);
    var cap = document.createElement("figcaption");
    var b = document.createElement("b");
    b.textContent = (i + 1) + " / " + SHOTS.length;
    var sp = document.createElement("span");
    sp.textContent = s.hu;
    sp.setAttribute("data-shotcap", String(i));
    cap.appendChild(b);
    cap.appendChild(sp);
    fig.appendChild(btn);
    fig.appendChild(cap);
    strip.appendChild(fig);
  });

  /* language ------------------------------------------------------ */
  function setLang(next){
    lang = next;
    document.documentElement.setAttribute("lang", next);
    var nodes = document.querySelectorAll("[data-hu]");
    for (var i = 0; i < nodes.length; i++){
      var v = nodes[i].getAttribute("data-" + next);
      if (v !== null) nodes[i].textContent = v;
    }
    var ta = document.getElementById("f-msg");
    ta.placeholder = ta.getAttribute("data-ph-" + next) || "";
    var caps = document.querySelectorAll("[data-shotcap]");
    for (var j = 0; j < caps.length; j++){
      caps[j].textContent = SHOTS[+caps[j].getAttribute("data-shotcap")][next];
    }
    var trk = document.getElementById("tour-en");
    if (trk && trk.track) {
      try { trk.track.mode = (next === "en") ? "showing" : "disabled"; } catch(e){}
    }
    document.getElementById("lang-hu").setAttribute("aria-pressed", String(next === "hu"));
    document.getElementById("lang-en").setAttribute("aria-pressed", String(next === "en"));
    try { history.replaceState(null, "", next === "en" ? "?lang=en" : location.pathname); } catch(e){}
    if (openList) showCap();
  }
  document.getElementById("lang-hu").addEventListener("click", function(){ setLang("hu"); });
  document.getElementById("lang-en").addEventListener("click", function(){ setLang("en"); });

  /* lightbox ------------------------------------------------------ */
  var lb = document.getElementById("lb");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var openList = null;
  var open = -1;
  var lastFocus = null;

  function showCap(){
    if (!openList) return;
    lbCap.textContent = (open + 1) + " / " + openList.length + "  ·  " + openList[open][lang];
  }
  function openAt(list, i){
    openList = list;
    open = (i + list.length) % list.length;
    lbImg.src = "img/" + list[open].f + ".jpg";
    lbImg.alt = list[open][lang];
    showCap();
    lb.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    document.getElementById("lb-x").focus();
  }
  function closeLb(){
    openList = null;
    open = -1;
    lb.removeAttribute("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  strip.addEventListener("click", function(e){
    var t = e.target.closest ? e.target.closest("button.shot") : null;
    if (!t) return;
    lastFocus = t;
    openAt(SHOTS, +t.getAttribute("data-i"));
  });
  var planImgs = document.querySelectorAll("[data-plan]");
  for (var p = 0; p < planImgs.length; p++){
    planImgs[p].addEventListener("click", function(e){
      lastFocus = e.currentTarget;
      openAt(PLANS, +e.currentTarget.getAttribute("data-plan"));
    });
  }
  document.getElementById("lb-x").addEventListener("click", closeLb);
  document.getElementById("lb-prev").addEventListener("click", function(){ if (openList) openAt(openList, open - 1); });
  document.getElementById("lb-next").addEventListener("click", function(){ if (openList) openAt(openList, open + 1); });
  lb.addEventListener("click", function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function(e){
    if (!openList) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") openAt(openList, open + 1);
    else if (e.key === "ArrowLeft") openAt(openList, open - 1);
  });

  /* hero video ---------------------------------------------------- */
  var hv = document.getElementById("herovid");
  if (hv) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      hv.removeAttribute("autoplay");
      hv.pause();
    } else {
      var play = function(){ var pr = hv.play(); if (pr && pr.catch) pr.catch(function(){}); };
      play();
      document.addEventListener("visibilitychange", function(){
        if (document.hidden) hv.pause(); else play();
      });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function(ent){
          ent.forEach(function(en){ if (en.isIntersecting) play(); else hv.pause(); });
        }, {threshold: 0.05}).observe(hv);
      }
    }
  }

  /* video tour ---------------------------------------------------- */
  var tour = document.getElementById("tour");
  if (tour) {
    var fired = {};
    tour.addEventListener("play", function(){
      if (!fired.play) { fired.play = 1; track("ViewContent"); }
      if (hv) hv.pause();
    });
  }

  /* contact ------------------------------------------------------- */
  function buildMail(){
    var name = document.getElementById("f-name").value.trim();
    var phone = document.getElementById("f-phone").value.trim();
    var mail = document.getElementById("f-email").value.trim();
    var msg = document.getElementById("f-msg").value.trim();
    var L = lang === "hu"
      ? { sub: "Érdeklődés: Corvin sétány lakás", n: "Név", p: "Telefon", m: "E-mail", t: "Üzenet" }
      : { sub: "Enquiry: Corvin sétány apartment", n: "Name", p: "Phone", m: "Email", t: "Message" };
    var body = L.n + ": " + (name || "-") + "\n" +
               L.p + ": " + (phone || "-") + "\n" +
               L.m + ": " + (mail || "-") + "\n\n" +
               L.t + ":\n" + (msg || "-") + "\n";
    return { subject: L.sub, body: body };
  }

  document.getElementById("mailbtn").addEventListener("click", function(e){
    e.preventDefault();
    var m = buildMail();
    track("Contact");
    window.location.href = "mailto:" + mailAddress() +
      "?subject=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.body);
  });

  document.getElementById("callbtn").addEventListener("click", function(){ track("Contact"); });

  var TXT = {
    hu: {
      need: "Add meg a neved és legalább egy elérhetőséget.",
      ok: "A levél megnyílt a levelezőprogramodban, a szöveg a vágólapon is ott van.",
      okNoClip: "A levél megnyílt a levelezőprogramodban."
    },
    en: {
      need: "Please give your name and at least one way to reach you.",
      ok: "The email opened in your mail app and the text is on the clipboard too.",
      okNoClip: "The email opened in your mail app."
    }
  };

  document.getElementById("inq").addEventListener("submit", function(e){
    e.preventDefault();
    var status = document.getElementById("f-status");
    var name = document.getElementById("f-name").value.trim();
    var phone = document.getElementById("f-phone").value.trim();
    var mail = document.getElementById("f-email").value.trim();

    if (!name || (!phone && !mail)) {
      status.textContent = TXT[lang].need;
      return;
    }

    var m = buildMail();
    track("Lead");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(m.body).then(function(){
        status.textContent = TXT[lang].ok;
      }, function(){
        status.textContent = TXT[lang].okNoClip;
      });
    } else {
      status.textContent = TXT[lang].okNoClip;
    }
    window.location.href = "mailto:" + mailAddress() +
      "?subject=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.body);
  });

  /* init ---------------------------------------------------------- */
  var qs = new RegExp("[?&]lang=(hu|en)").exec(location.search);
  setLang(qs ? qs[1] : "hu");
})();
