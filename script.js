// ==========================================
// ÜBERSETZUNGEN (UI)
// ==========================================
const translations = {
    de: {
        title: "🦇 Moonlight Peaks - Vampster Tracker",
        progress: "GESAMMELT",
        collected: "Gesammelt",
        noImage: "Kein Bild vorhanden",
        zoom: "Bild vergrößern",
        credits: "Informationen & Bilder stammen teilweise von",
        creditsCompany: "Alle Rechte der verwendeten Icons der Vampster liegen bei <strong>Little Chicken Game Company</strong>, dem Entwickler von Moonlight Peaks.",
        wip: "🎉 <strong>Erfolg:</strong> Alle 100 Vampster des Spiels sind jetzt in der Datenbank registriert! Nicht gefundene Fundorte zeigen ein Platzhalter-Bild. Wenn du einen fehlenden Screenshot hast, sende ihn mir gerne per Discord an meinen Account: <strong>foxyfire</strong> (ID: <code>1524903125264240802</code>).",
        regions: {
            "Cave of Echoes": "Echohöhle",
            "Town": "Stadt",
            "Moonlit Pines": "Mondscheinwald",
            "Misty Shores": "Nebelküste",
            "Home": "Zuhause",
            "Howling Marshes": "Heulender Sumpf",
            "Khazan Temple": "Khazan-Tempel",
            "Twilight Catacombs": "Katakomben der Dämmerung",
            "Crystal Cave": "Kristallhöhle",
            "Luna Bay": "Lunabucht"
        },
        dummyBadge: "Screenshot gesucht",
        dummyDesc: "Fundort noch unbekannt. Sende gerne einen Screenshot per Discord an <strong>foxyfire</strong>!"
    },
    en: {
        title: "🦇 Moonlight Peaks - Vampster Tracker",
        progress: "COLLECTED",
        collected: "Collected",
        noImage: "No image available",
        zoom: "Zoom image",
        credits: "Information & images partly sourced from",
        creditsCompany: "All rights of the used Vampster icons belong to <strong>Little Chicken Game Company</strong>, the developer of Moonlight Peaks.",
        wip: "🎉 <strong>Success:</strong> All 100 Vampsters in the game are now registered in the database! Missing locations show a placeholder icon. If you have a missing screenshot, feel free to send it to me via Discord private message to my account: <strong>foxyfire</strong> (ID: <code>1524903125264240802</code>).",
        regions: {
            "Cave of Echoes": "Cave of Echoes",
            "Town": "Town",
            "Moonlit Pines": "Moonlit Pines",
            "Misty Shores": "Misty Shores",
            "Home": "Home",
            "Howling Marshes": "Howling Marshes",
            "Khazan Temple": "Khazan Temple",
            "Twilight Catacombs": "Twilight Catacombs",
            "Crystal Cave": "Crystal Cave",
            "Luna Bay": "Luna Bay"
        },
        dummyBadge: "Missing Screenshot",
        dummyDesc: "Location unknown. Feel free to send a screenshot to me on Discord to <strong>foxyfire</strong>!"
    }
};

// ==========================================
// VAMPSTER DATEN - GELADEN AUS EXTERNER JS-DATEI (vampsters_data.js)
// ==========================================
let vampstersData = VAMPSTERS_DATA;

let totalVampsters = 0;
let collectedVampsters = 0;
let currentLang = 'de';

// --- SPRACHE & UI ---
// --- MIGRATION ALTER CHECKMARKS ---
function migrateOldCheckmarks() {
    const oldToNewMapping = {
        "vamp_coe_01": "vamp_016",
        "vamp_coe_02": "vamp_017",
        "vamp_coe_03": "vamp_019",
        "vamp_coe_04": "vamp_015",
        "vamp_coe_05": "vamp_018",
        "vamp_town_01": "vamp_082",
        "vamp_town_02": "vamp_091",
        "vamp_town_03": "vamp_092",
        "vamp_town_04": "vamp_093",
        "vamp_town_05": "vamp_023",
        "vamp_town_06": "vamp_083",
        "vamp_town_07": "vamp_021",
        "vamp_town_08": "vamp_020",
        "vamp_town_09": "vamp_022",
        "vamp_town_10": "vamp_086",
        "vamp_town_11": "vamp_099",
        "vamp_town_12": "vamp_100",
        "vamp_town_13": "vamp_008",
        "vamp_town_14": "vamp_010",
        "vamp_town_15": "vamp_009",
        "vamp_town_16": "vamp_050",
        "vamp_town_17": "vamp_043",
        "vamp_town_18": "vamp_044",
        "vamp_town_19": "vamp_051",
        "vamp_town_20": "vamp_052",
        "vamp_town_21": "vamp_093",
        "vamp_town_22": "vamp_079",
        "vamp_town_23": "vamp_080",
        "vamp_town_24": "vamp_081",
        "vamp_town_25": "vamp_094",
        "vamp_town_26": "vamp_042",
        "vamp_town_27": "vamp_047",
        "vamp_town_28": "vamp_048",
        "vamp_mp_01": "vamp_033",
        "vamp_mp_02": "vamp_029",
        "vamp_mp_03": "vamp_032",
        "vamp_mp_04": "vamp_027",
        "vamp_mp_05": "vamp_036",
        "vamp_mp_06": "vamp_045",
        "vamp_mp_07": "vamp_026",
        "vamp_mp_08": "vamp_025",
        "vamp_ms_01": "vamp_004",
        "vamp_ms_02": "vamp_064",
        "vamp_ms_03": "vamp_005",
        "vamp_ms_04": "vamp_006",
        "vamp_ms_05": "vamp_007",
        "vamp_ms_06": "vamp_040",
        "vamp_gg_01": "vamp_076",
        "vamp_gg_02": "vamp_077",
        "vamp_gg_03": "vamp_075",
        "vamp_gg_04": "vamp_024",
        "vamp_hm_01": "vamp_062",
        "vamp_hm_02": "vamp_061",
        "vamp_hm_03": "vamp_098",
        "vamp_hm_04": "vamp_063",
        "vamp_kt_01": "vamp_053",
        "vamp_kt_02": "vamp_054"
    };

    for (const [oldId, newId] of Object.entries(oldToNewMapping)) {
        const oldVal = localStorage.getItem(`vampster_${oldId}`);
        if (oldVal !== null) {
            localStorage.setItem(`vampster_${newId}`, oldVal);
            localStorage.removeItem(`vampster_${oldId}`);
        }
    }
}

// --- BILD-LADEFEHLER BEHANDELN (FALLBACK) ---
function handleCardImageError(imgElement, fallbackUrl) {
    imgElement.src = fallbackUrl;
    const card = imgElement.closest('.card');
    if (card) {
        card.classList.add('is-dummy');
        const descPara = card.querySelector('.card-desc');
        if (descPara && descPara.dataset.hasRealDesc !== 'true') {
            const uiStrings = translations[currentLang];
            const id = card.id.replace('card-', '');
            descPara.innerHTML = uiStrings.dummyDesc.replace('{id}', id);
        }
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vampster_lang', lang);

    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    document.title = translations[lang].title;
    document.getElementById('page-title').innerText = translations[lang].title;
    document.getElementById('progress-label').innerText = translations[lang].progress;
    document.getElementById('credits-label').innerText = translations[lang].credits;
    document.getElementById('credits-company').innerHTML = translations[lang].creditsCompany;

    renderTracker();
}

// --- FORTSCHRITT ---
function updateProgress() {
    document.getElementById('progress-text').innerText = `${collectedVampsters} / ${totalVampsters}`;
    const percentage = totalVampsters === 0 ? 0 : (collectedVampsters / totalVampsters) * 100;
    document.getElementById('progress-bar').style.width = percentage + '%';
}

// --- KARTEN-KLICK ---
function handleCardClick(event, id) {
    if (event.target.tagName.toLowerCase() === 'input') {
        event.target.checked = !event.target.checked;
    }

    const card = document.getElementById(`card-${id}`);
    const checkbox = document.getElementById(`checkbox-${id}`);

    const isNowChecked = !checkbox.checked;
    checkbox.checked = isNowChecked;

    if (isNowChecked) {
        localStorage.setItem(`vampster_${id}`, 'true');
        card.classList.add('completed');
        collectedVampsters++;

        // Klick-Koordinaten ermitteln
        let x = event.clientX;
        let y = event.clientY;

        // Fallback auf die Mitte der Kachel, falls kein gültiger Klick (z.B. Tastatur-Aktivierung)
        if (!x || !y) {
            const rect = card.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        // Sparkle-Effekt auslösen
        createSparkleBurst(x, y);

        // Pop-Animation auf der Kachel ausführen
        card.classList.remove('pop-animation');
        void card.offsetWidth; // Reflow triggern, um die Animation zurückzusetzen
        card.classList.add('pop-animation');
        card.addEventListener('animationend', () => {
            card.classList.remove('pop-animation');
        }, {once: true});
    } else {
        localStorage.removeItem(`vampster_${id}`);
        card.classList.remove('completed');
        collectedVampsters--;
    }

    updateProgress();

    // Region-Zähler aktualisieren und Completion prüfen
    const regionName = card.dataset.region;
    if (regionName) {
        const isCompleted = updateRegionHeader(regionName);
        const regionId = regionName.replace(/\s+/g, '-').toLowerCase();
        const grid = document.getElementById(`grid-${regionId}`);
        const header = document.getElementById(`header-${regionId}`);

        if (isCompleted && grid && !grid.classList.contains('collapsed')) {
            // Kurze Verzögerung, damit die Kachel-Animation beendet werden kann
            setTimeout(() => {
                if (header) {
                    const headerRect = header.getBoundingClientRect();
                    const isHeaderVisible = headerRect.top >= 0 && headerRect.bottom <= window.innerHeight;

                    // Sparkle + Collapse auslösen (nach optionalem Scroll)
                    const fireAndCollapse = () => {
                        const rect = header.getBoundingClientRect();
                        createMassiveSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
                        header.classList.add('collapsed');
                        grid.classList.add('collapsed');
                    };

                    if (isHeaderVisible) {
                        // Header ist sichtbar → sofort Sparkle + Collapse
                        fireAndCollapse();
                    } else {
                        // Header ist außerhalb des sichtbaren Bereichs → erst hinscrollen
                        header.scrollIntoView({behavior: 'smooth', block: 'start'});

                        // Warten bis das Scrollen abgeschlossen ist
                        let lastY = -1;
                        let stableFrames = 0;
                        const check = () => {
                            const currentY = header.getBoundingClientRect().top;
                            if (Math.abs(currentY - lastY) < 1) {
                                stableFrames++;
                            } else {
                                stableFrames = 0;
                            }
                            lastY = currentY;
                            if (stableFrames >= 5) {
                                fireAndCollapse();
                            } else {
                                requestAnimationFrame(check);
                            }
                        };
                        requestAnimationFrame(check);
                    }
                } else {
                    grid.classList.add('collapsed');
                }
            }, 600);
        } else if (!isCompleted && grid && grid.classList.contains('collapsed')) {
            grid.classList.remove('collapsed');
            if (header) {
                header.classList.remove('collapsed');
            }
        }
    }
}

// --- REGION ÜBERSCHRIFT AKTUALISIEREN ---
// --- REGION ÜBERSCHRIFT AKTUALISIEREN ---
function updateRegionHeader(regionName) {
    const vampsters = vampstersData.filter(v => v.regionEN === regionName);
    let regionTotal = vampsters.length;
    let regionCollected = 0;
    vampsters.forEach(v => {
        if (localStorage.getItem(`vampster_${v.id}`) === 'true') {
            regionCollected++;
        }
    });

    const regionId = regionName.replace(/\s+/g, '-').toLowerCase();
    const titleElement = document.getElementById(`header-${regionId}`);
    if (titleElement) {
        const uiStrings = translations[currentLang];
        const baseName = uiStrings.regions[regionName] || regionName;
        titleElement.innerText = `${baseName} (${regionCollected} / ${regionTotal})`;
    }

    return regionCollected === regionTotal;
}

// --- REGION MANUAL EINKLAPPEN/AUSKLAPPEN ---
function toggleRegion(regionId) {
    const grid = document.getElementById(`grid-${regionId}`);
    const header = document.getElementById(`header-${regionId}`);
    if (grid && header) {
        const isCollapsed = grid.classList.toggle('collapsed');
        header.classList.toggle('collapsed', isCollapsed);
    }
}

// --- MASSIVER SPARKLE EFFEKT (Completion Celebration) ---
function createMassiveSparkleBurst(x, y) {
    const particleCount = 80; // Deutlich mehr Partikel für eine magische Feier
    const colors = [
        '#ff4757', '#ff2e44', '#ff7675', '#ff79ff', '#ff6b81',
        '#f368e0', '#b15eff', '#a55eea', '#be2edd'
    ];
    const shapes = [
        `M12 0 C12 8 16 12 24 12 C16 12 12 16 12 24 C12 16 8 12 0 12 C8 12 12 8 12 0 Z`,
        `M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z`,
        `circle`
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';

        // Mix aus kleinen und großen Partikeln für visuelle Tiefe
        const size = Math.random() * 14 + 8; // 8px bis 22px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.filter = `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 10px ${color})`;
        particle.style.opacity = '0.95';

        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const shape = shapes[shapeIndex];

        if (shape === 'circle') {
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="8" fill="${color}" /></svg>`;
        } else {
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="${color}" d="${shape}" /></svg>`;
        }

        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;

        // Radiär in alle Richtungen ausbreiten (360 Grad)
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 60; // 60px bis 260px Flugradius
        const tx = Math.cos(angle) * distance;

        // Schwerkraft-Effekt: Partikel sinken am Ende der Animation leicht ab (Regen-Effekt)
        const gravity = Math.random() * 80 + 40;
        const ty = Math.sin(angle) * distance + gravity;
        const rotate = Math.random() * 540 + 360;

        document.body.appendChild(particle);

        particle.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 0
            },
            {
                transform: `translate(${tx * 0.25}px, ${ty * 0.25}px) scale(1.4) rotate(${rotate * 0.25}deg)`,
                opacity: 0.95,
                offset: 0.15
            },
            {
                transform: `translate(${tx * 0.7}px, ${ty * 0.7}px) scale(1) rotate(${rotate * 0.7}deg)`,
                opacity: 0.85,
                offset: 0.6
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${rotate}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 1000 + 1200, // 1.2s bis 2.2s
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)', // Sehr weiches Abklingen
            fill: 'forwards'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// --- SPARKLE EFFEKT (Vampir-Theme) ---
function createSparkleBurst(x, y) {
    const particleCount = 35; // Mehr Partikel für ein sattes, magisches Gefühl

    // Magische Symbole (Sterne und Orbs)
    const shapes = [
        // 4-zackiger gotischer Funkelstern
        `M12 0 C12 8 16 12 24 12 C16 12 12 16 12 24 C12 16 8 12 0 12 C8 12 12 8 12 0 Z`,
        // Klassischer spitzer Stern
        `M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z`,
        // Kreis/Orb (wird als SVG-Kreis gerendert)
        `circle`
    ];

    // Farbschema: Lila, Rötlich und Pink (ausschließlich!)
    const colors = [
        '#ff4757', // Rötlich (Akzent)
        '#ff2e44', // Kräftiges Rot
        '#ff7675', // Helles Rot/Rosa
        '#ff79ff', // Hellpink
        '#ff6b81', // Pink
        '#f368e0', // Magisches Pink
        '#b15eff', // Neon-Lila
        '#a55eea', // Violett
        '#be2edd'  // Dunkles Magisches Lila
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';

        // Unterschiedliche Größen für räumliche Tiefe
        const size = Math.random() * 10 + 8; // 8px bis 18px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const color = colors[Math.floor(Math.random() * colors.length)];

        // Intensiver doppelter Leuchteffekt für den magischen Glow
        particle.style.filter = `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 8px ${color})`;
        particle.style.opacity = '0.95';

        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const shape = shapes[shapeIndex];

        if (shape === 'circle') {
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="8" fill="${color}" /></svg>`;
        } else {
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="${color}" d="${shape}" /></svg>`;
        }

        // Startpunkt am Klick-Ort zentrieren
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;

        // Physik für kreisförmige Ausbreitung (360 Grad) um den Klickpunkt
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 90 + 40; // Flugdistanz kreisförmig nach außen (40px bis 130px)

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        const rotate = Math.random() * 270 + 90; // Rotation

        document.body.appendChild(particle);

        // Shimmer und Ausbreitung im Kreis
        particle.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 0
            },
            {
                transform: `translate(${tx * 0.3}px, ${ty * 0.3}px) scale(1.3) rotate(${rotate * 0.3}deg)`,
                opacity: 0.95,
                offset: 0.2
            },
            {
                transform: `translate(${tx * 0.7}px, ${ty * 0.7}px) scale(0.9) rotate(${rotate * 0.65}deg)`,
                opacity: 0.8,
                offset: 0.6
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${rotate}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 800 + 1300, // Längere Sichtbarkeit (1300ms bis 2100ms)
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Weicher Verlauf
            fill: 'forwards'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// --- RENDER GRID ---
// --- RENDER GRID ---
function renderTracker() {
    const container = document.getElementById('tracker-container');
    container.innerHTML = '';

    totalVampsters = 0;
    collectedVampsters = 0;

    const uiStrings = translations[currentLang];

    // Group the 100 vampsters by their English region name
    const grouped = {};
    vampstersData.forEach(v => {
        const region = v.regionEN;
        if (!grouped[region]) {
            grouped[region] = [];
        }
        grouped[region].push(v);
    });

    // The order of regions in the Almanac
    const regionOrder = [
        "Misty Shores",
        "Moonlit Pines",
        "Khazan Temple",
        "Luna Bay",
        "Howling Marshes",
        "Home",
        "Town",
        "Twilight Catacombs",
        "Cave of Echoes",
        "Crystal Cave"
    ];

    regionOrder.forEach(region => {
        const vampsters = grouped[region];
        if (!vampsters) return;

        const regionId = region.replace(/\s+/g, '-').toLowerCase();

        const section = document.createElement('div');
        section.className = 'region-section';

        // Count collected
        let regionTotal = vampsters.length;
        let regionCollected = 0;
        vampsters.forEach(v => {
            if (localStorage.getItem(`vampster_${v.id}`) === 'true') {
                regionCollected++;
            }
        });

        const title = document.createElement('h2');
        title.className = 'region-title';
        title.id = `header-${regionId}`;
        const baseName = uiStrings.regions[region] || region;
        title.innerText = `${baseName} (${regionCollected} / ${regionTotal})`;
        title.onclick = () => toggleRegion(regionId);

        const grid = document.createElement('div');
        grid.className = 'grid';
        grid.id = `grid-${regionId}`;

        // If all collected, collapse by default
        if (regionCollected === regionTotal) {
            title.classList.add('collapsed');
            grid.classList.add('collapsed');
        }

        vampsters.forEach((vampster) => {
            totalVampsters++;

            const uniqueId = vampster.id;
            const isCollected = localStorage.getItem(`vampster_${uniqueId}`) === 'true';

            if (isCollected) {
                collectedVampsters++;
            }

            // Try screenshot first, if error -> fallback to Almanac Icon
            const screenshotUrl = `assets/screenshots/${uniqueId}.png`;

            // Dynamisch generierte Thumbnails via Image-CDN (nur wenn online)
            const isLocal = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const liveBaseUrl = 'https://entchen66.github.io/vampsters/';
            const thumbUrl = isLocal
                ? screenshotUrl
                : `https://wsrv.nl/?url=${encodeURIComponent(liveBaseUrl + screenshotUrl)}&w=350&output=webp&q=70`;

            const almanacUrl = vampster.image;

            const hasRealDesc = vampster.desc && vampster.desc[currentLang];
            const displayDesc = hasRealDesc
                ? vampster.desc[currentLang]
                : uiStrings.dummyDesc.replace('{id}', uniqueId);

            const almanacText = currentLang === 'de' ? vampster.almanacTextDE : vampster.almanacTextEN;

            const cardHtml = `
                        <div class="card ${isCollected ? 'completed' : ''}" id="card-${uniqueId}" data-region="${region}" onclick="handleCardClick(event, '${uniqueId}')">
                            <div class="image-container">
                                <img class="card-img" src="${thumbUrl}" alt="${vampster.name}" loading="lazy" decoding="async"
                                     onerror="handleCardImageError(this, '${almanacUrl}')">
                                <div class="zoom-icon" onclick="openModal('${screenshotUrl}', event)" title="${uiStrings.zoom}">🔍</div>
                                <div class="dummy-badge">${uiStrings.dummyBadge}</div>
                            </div>
                            <div class="card-content">
                                <div>
                                    <h4 class="vampster-name">
                                        ${vampster.name}
                                    </h4>
                                    <div class="vampster-almanac-text">
                                        ${almanacText}
                                    </div>
                                    <p class="card-desc" data-has-real-desc="${hasRealDesc ? 'true' : 'false'}">${displayDesc}</p>
                                </div>
                                <div class="card-footer" style="margin-top: 10px;">
                                    <label class="checkbox-container">
                                        <input type="checkbox" id="checkbox-${uniqueId}" ${isCollected ? 'checked' : ''}>
                                        ${uiStrings.collected}
                                    </label>
                                </div>
                                <img class="vampster-card-icon" src="${almanacUrl}" alt="${vampster.name}" loading="lazy" decoding="async">
                            </div>
                        </div>
                    `;

            grid.insertAdjacentHTML('beforeend', cardHtml);
        });

        section.appendChild(title);
        section.appendChild(grid);
        container.appendChild(section);
    });

    updateProgress();
}

// --- CUSTOM PINCH TO ZOOM & PAN FÜR DAS MODAL BILD ---
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

let scale = 1;
let pointX = 0, pointY = 0;
let startX = 0, startY = 0;
let startDistance = 0;
let isPinching = false;
let isPanning = false;

function openModal(imgSrc, event) {
    event.stopPropagation();
    modalImg.src = imgSrc;
    modal.classList.add('show');

    // Reset Zoom/Pan Werte
    scale = 1;
    pointX = 0;
    pointY = 0;
    modalImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function closeModal() {
    modal.classList.remove('show');
}

// Touch-Start
modalImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        isPinching = true;
        isPanning = false;
        startDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    } else if (e.touches.length === 1 && scale > 1) {
        isPanning = true;
        isPinching = false;
        startX = e.touches[0].clientX - pointX;
        startY = e.touches[0].clientY - pointY;
    }
});

// Touch-Move (Zoom & Wischen)
modalImg.addEventListener('touchmove', (e) => {
    if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        let currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        let distanceDiff = currentDistance - startDistance;
        scale += distanceDiff * 0.01;

        scale = Math.min(Math.max(1, scale), 4);
        startDistance = currentDistance;

        if (scale === 1) {
            pointX = 0;
            pointY = 0;
        }

        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;

    } else if (isPanning && e.touches.length === 1) {
        e.preventDefault();
        pointX = e.touches[0].clientX - startX;
        pointY = e.touches[0].clientY - startY;
        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }
}, {passive: false});

// Touch-End
modalImg.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) isPinching = false;
    if (e.touches.length === 0) isPanning = false;

    if (scale < 1) {
        scale = 1;
        pointX = 0;
        pointY = 0;
        modalImg.style.transform = `translate(0px, 0px) scale(1)`;
    }
});

// --- INIT BEIM START ---
window.onload = function () {
    // 1. Migration ausführen
    migrateOldCheckmarks();

    // 2. Sprache setzen
    let savedLang = localStorage.getItem('vampster_lang');
    if (!savedLang) {
        const browserLang = navigator.language.slice(0, 2);
        savedLang = (browserLang === 'de') ? 'de' : 'en';
    }
    setLanguage(savedLang);

    // 3. Magische Hintergrund-Partikel erzeugen
    const particleContainer = document.getElementById('magic-bg-particles');
    const particleColors = ['rgba(138, 43, 226, 0.3)', 'rgba(255, 71, 87, 0.2)', 'rgba(177, 94, 255, 0.25)', 'rgba(255, 121, 255, 0.15)', 'rgba(88, 28, 135, 0.3)'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.style.boxShadow = `0 0 ${size * 3}px ${p.style.backgroundColor}`;
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 15) + 's';
        particleContainer.appendChild(p);
    }
};

// --- CUSTOM BAT CURSOR ANIMATION ---
if (window.matchMedia('(pointer: fine)').matches) {
    const crystal = document.getElementById('crystal');
    const bat = document.getElementById('bat');
    const leftWing = document.getElementById('left-wing');
    const rightWing = document.getElementById('right-wing');

    let mouse = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    let cPos = {x: mouse.x, y: mouse.y, angle: 0};
    let bPos = {x: mouse.x, y: mouse.y, scaleX: 1};
    let mouseOnScreen = true;
    let wingPhase = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    window.addEventListener('mousemove', (e) => {
        // Ignoriere Events ganz am Bildschirmrand beim Verlassen
        if (e.clientX < 3 || e.clientY < 3 || e.clientX > window.innerWidth - 3 || e.clientY > window.innerHeight - 3) {
            mouseOnScreen = false;
            return;
        }
        mouseOnScreen = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseOnScreen = false;
    });

    document.addEventListener('mouseenter', (e) => {
        mouseOnScreen = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animateCursor() {
        const oldCX = cPos.x;
        const oldCY = cPos.y;
        const oldBX = bPos.x;
        const oldBY = bPos.y;

        // Ziel-Position bestimmen (Maus oder Ruheposition)
        let targetX = mouse.x;
        let targetY = mouse.y;

        if (!mouseOnScreen) {
            // Ruheposition: Direkt rechts neben der Fortschritts-Anzeige
            const progressText = document.getElementById('progress-text');
            if (progressText) {
                const rect = progressText.getBoundingClientRect();
                targetX = rect.right + 25; // Platziert den Kristall rechts neben die Zahlen
                targetY = rect.top + rect.height / 2;
            } else {
                // Fallback (z.B. oben rechts)
                targetX = window.innerWidth - 80;
                targetY = 60;
            }
        }

        // Weicheres Hingleiten zur Ruheposition
        const lerpFactor = mouseOnScreen ? 0.35 : 0.05;
        cPos.x = lerp(cPos.x, targetX, lerpFactor);
        cPos.y = lerp(cPos.y, targetY, lerpFactor);

        const vx = cPos.x - oldCX;
        const vy = cPos.y - oldCY;
        const speed = Math.sqrt(vx * vx + vy * vy);

        if (speed > 0.5) {
            let targetAngle = Math.atan2(vy, vx);
            let deltaAngle = targetAngle - cPos.angle;
            while (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
            while (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
            cPos.angle += deltaAngle * 0.04; // Deutlich langsamerer Richtungswechsel (vorher 0.3)
        }

        crystal.style.transform = `translate3d(${cPos.x}px, ${cPos.y}px, 0) rotate(${cPos.angle}rad)`;

        const targetDistance = Math.min(40 + speed * 2, 120);
        const targetBatX = cPos.x - Math.cos(cPos.angle) * targetDistance;
        const targetBatY = cPos.y - Math.sin(cPos.angle) * targetDistance;

        bPos.x = lerp(bPos.x, targetBatX, 0.1);
        bPos.y = lerp(bPos.y, targetBatY, 0.1);

        if (Math.abs(Math.cos(cPos.angle)) > 0.1) {
            bPos.scaleX = Math.cos(cPos.angle) > 0 ? 1 : -1;
        }

        bat.style.transform = `translate3d(${bPos.x}px, ${bPos.y}px, 0) scaleX(${bPos.scaleX})`;

        // Flattern-Geschwindigkeit und Ausschlag (Amplitude) der Flügel dynamisch berechnen
        const batVx = bPos.x - oldBX;
        const batVy = bPos.y - oldBY;
        const batSpeed = Math.sqrt(batVx * batVx + batVy * batVy);

        // Phase erhöhen: Basis-Geschwindigkeit + geschwindigkeitsabhängiger Anteil
        const freq = 0.08 + Math.min(0.4, batSpeed * 0.08);
        wingPhase += freq;

        // Amplitude (Stärke): Im Ruhezustand 15 Grad, bei schneller Bewegung schlagen die Flügel weit aus (bis zu 50 Grad)
        const amp = 15 + Math.min(35, batSpeed * 7);

        // Flügelwinkel berechnen
        const angleDeg = Math.sin(wingPhase) * amp;

        // Rotationen auf die Flügel-Gruppen anwenden
        if (leftWing && rightWing) {
            leftWing.style.transform = `rotate(${angleDeg}deg)`;
            rightWing.style.transform = `rotate(${-angleDeg}deg)`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}
