// --- Internationalization (EN default · IT · RU) ---
(function () {
    const STORAGE_KEY = 'site_lang';
    const DEFAULT_LANG = 'en';
    const SUPPORTED = ['en', 'it', 'ru'];
    const LOCALES = { en: 'en-US', it: 'it-IT', ru: 'ru-RU' };

    const STRINGS = {
        en: {
            'enter.text': 'Click to Enter',
            'help.title': 'Quick guide',
            'help.aria': 'Quick guide',
            'lang.aria': 'Language',
            'volume.aria': 'Music volume',
            'volume.slider': 'Volume',
            'avatar.changeTitle': 'Change profile photo',
            'avatar.change': 'Change',
            'bio': 'Junior Web Developer | Gamer | Platinum+ Optimizer Web Dev',
            'live.aria': 'Watch the live stream',
            'live.titleDefault': 'Live right now',
            'live.subDefault': 'Click to join',
            'live.cta': 'Watch →',
            'live.watchAria': 'Watch the stream on {platform}: {title}',
            'live.viaDiscord': 'Via Discord',
            'live.manualStream': 'Manual stream',
            'live.onTwitch': 'Live on Twitch',
            'live.onYoutube': 'Live on YouTube',
            'live.onKick': 'Live on Kick',
            'live.activeStream': 'Stream active',
            'live.streaming': 'Streaming',
            'visitor.kicker': 'Unique visitors',
            'visitor.subDefault': 'Real-time count',
            'visitor.badgeLive': 'Live',
            'visitor.badgeSetup': 'Setup',
            'visitor.badgeOffline': 'Offline',
            'visitor.labelOne': '1 person has visited the site',
            'visitor.labelMany': '{count} people have visited the site',
            'visitor.error.kv': 'Connect KV VISITOR_STORE on Cloudflare Pages',
            'visitor.error.apiOk': 'API ok but visitors not responding — check KV',
            'visitor.error.deploy': 'Upload _routes.json + functions/ and redeploy on Cloudflare',
            'visitor.error.kvBinding': 'Cloudflare: add KV binding → VISITOR_STORE',
            'visitor.error.apiActive': 'API active — connect KV VISITOR_STORE on Cloudflare',
            'visitor.error.apiInactive': 'API inactive: upload _routes.json and redeploy',
            'visitor.error.unavailable': 'Counter temporarily unavailable',
            'discord.statusTitle': 'Discord status',
            'discord.connecting': 'Connecting to Discord…',
            'discord.showProfile': 'Show Discord profile',
            'discord.hideProfile': 'Hide Discord profile',
            'discord.addFriend': 'Add me as a friend',
            'discord.badgesAria': 'Discord profile badges',
            'discord.badgesUnavailable': 'Badges unavailable',
            'discord.noBadges': 'No public badges on this profile',
            'discord.connectLanyardBadges': 'Connect Lanyard to see badges',
            'discord.notOnDiscord': 'Not connected to Discord',
            'discord.noActivity': 'No activity in progress',
            'discord.listeningSpotify': 'Listening on Spotify',
            'discord.live': 'Streaming',
            'discord.playingGame': 'Playing a game',
            'discord.customStatus': 'Custom status',
            'discord.statusSuffix': ' · STATUS',
            'discord.lanyardLabel': 'LANYARD',
            'discord.lanyardActivate': 'Enable Lanyard on Discord',
            'discord.lanyardInstall': 'Install the Lanyard app and open Discord',
            'discord.lanyardError': 'Unable to reach Lanyard',
            'discord.lanyardErrorSub': 'Check your connection',
            'discord.status.online': 'ONLINE',
            'discord.status.idle': 'IDLE',
            'discord.status.dnd': 'DO NOT DISTURB',
            'discord.status.offline': 'OFFLINE',
            'music.loading': 'Loading…',
            'music.fromYoutube': 'Audio from YouTube',
            'music.youtubeBrand': 'YouTube',
            'music.error': 'Could not load YouTube player',
            'music.prev': 'Previous track',
            'music.next': 'Next track',
            'music.play': 'Play',
            'music.pause': 'Pause',
            'music.progress': 'Song progress',
            'social.twitter': 'X / Twitter',
            'social.telegram': 'Platinum+ Optimizer',
            'social.gmail': 'Contact Me',
            'social.github': 'Repo',
            'social.kofi': 'Donations',
            'social.kofi.warning': 'Warning: No payment methods are currently connected to Ko-fi.',
            'social.kofi.visit': 'Visit Ko-fi',
            'crop.title': 'Resize your photo',
            'crop.hint': 'Drag to move · Scroll / pinch to zoom',
            'crop.zoom': 'Zoom',
            'crop.cancel': 'Cancel',
            'crop.confirm': 'Confirm',
            'tutorial.kicker': 'Quick guide',
            'tutorial.step': 'Step {n} of {total}',
            'tutorial.skip': 'Skip guide',
            'tutorial.back': 'Back',
            'tutorial.next': 'Next',
            'tutorial.finish': 'Start exploring',
            'tutorial.step1.title': 'What is this page?',
            'tutorial.step1.body': 'You found IL DENTE PROIBITO\'s personal page — not a shop, forum, or app to download. It\'s a digital business card: one link to discover who\'s behind it, what they do (web development, gaming, optimization), and where to follow them online.',
            'tutorial.step2.title': 'Choose your language',
            'tutorial.step2.body': 'Use the globe selector top-left to switch between English, Italian, and Russian anytime. The entire site updates instantly — try it here or on the corner selector.',
            'tutorial.step3.title': 'Music & atmosphere',
            'tutorial.step3.body': 'Click "Click to Enter" to unlock background music. Top-right: volume control. On the card: play/pause, skip tracks, and scrub the playlist — no external apps needed.',
            'tutorial.step4.title': 'Who\'s online right now',
            'tutorial.step4.body': 'The Discord card shows in real time whether IL DENTE PROIBITO is online, offline, or away, and what they\'re doing (game, Spotify, etc.). When streaming on Twitch, a red "LIVE" banner appears. The visitor counter shows how many unique people have stopped by.',
            'tutorial.step5.title': 'Connect & interact',
            'tutorial.step5.body': 'The icons at the bottom link to X (Twitter), Telegram (Platinum+ Optimizer group), Gmail (ildenteproibito@gmail.com), and GitHub (site source code). You can change the profile photo by clicking the avatar (once only) and add them on Discord via "Show Discord profile" → "Add me as a friend".',
            'elapsed.h': '{h}h {m}m elapsed',
            'elapsed.m': '{m}m {s}s elapsed',
            'elapsed.s': '{s}s elapsed',
            'ui.toggle': 'Toggle UI visibility'
        },
        it: {
            'enter.text': 'Clicca per entrare',
            'help.title': 'Guida rapida',
            'help.aria': 'Guida rapida',
            'lang.aria': 'Lingua',
            'volume.aria': 'Volume musica',
            'volume.slider': 'Volume',
            'avatar.changeTitle': 'Cambia foto profilo',
            'avatar.change': 'Cambia',
            'bio': 'Junior Web Developer | Gamer | Platinum+ Optimizer Web Dev',
            'live.aria': 'Guarda la diretta live',
            'live.titleDefault': 'In diretta adesso',
            'live.subDefault': 'Clicca per entrare',
            'live.cta': 'Guarda →',
            'live.watchAria': 'Guarda la diretta su {platform}: {title}',
            'live.viaDiscord': 'Tramite Discord',
            'live.manualStream': 'Stream manuale',
            'live.onTwitch': 'In diretta su Twitch',
            'live.onYoutube': 'In diretta su YouTube',
            'live.onKick': 'In diretta su Kick',
            'live.activeStream': 'Stream attivo',
            'live.streaming': 'In diretta',
            'visitor.kicker': 'Visitatori unici',
            'visitor.subDefault': 'Conteggio in tempo reale',
            'visitor.badgeLive': 'Live',
            'visitor.badgeSetup': 'Setup',
            'visitor.badgeOffline': 'Offline',
            'visitor.labelOne': '1 persona ha visitato il sito',
            'visitor.labelMany': '{count} persone hanno visitato il sito',
            'visitor.error.kv': 'Collega KV VISITOR_STORE su Cloudflare Pages',
            'visitor.error.apiOk': 'API ok ma visitors non risponde — controlla KV',
            'visitor.error.deploy': 'Carica _routes.json + functions/ e rideploya su Cloudflare',
            'visitor.error.kvBinding': 'Cloudflare: aggiungi binding KV → VISITOR_STORE',
            'visitor.error.apiActive': 'API attiva — collega KV VISITOR_STORE su Cloudflare',
            'visitor.error.apiInactive': 'API non attiva: carica _routes.json e rideploya',
            'visitor.error.unavailable': 'Contatore temporaneamente non disponibile',
            'discord.statusTitle': 'Stato Discord',
            'discord.connecting': 'Connessione a Discord…',
            'discord.showProfile': 'Mostra profilo Discord',
            'discord.hideProfile': 'Nascondi profilo Discord',
            'discord.addFriend': 'Aggiungimi agli amici',
            'discord.badgesAria': 'Badge profilo Discord',
            'discord.badgesUnavailable': 'Badge non disponibili',
            'discord.noBadges': 'Nessun badge pubblico su questo profilo',
            'discord.connectLanyardBadges': 'Collega Lanyard per vedere i badge',
            'discord.notOnDiscord': 'Non connesso a Discord',
            'discord.noActivity': 'Nessuna attività in corso',
            'discord.listeningSpotify': 'In ascolto su Spotify',
            'discord.live': 'In diretta',
            'discord.playingGame': 'Sta giocando',
            'discord.customStatus': 'Stato personalizzato',
            'discord.statusSuffix': ' · STATO',
            'discord.lanyardLabel': 'LANYARD',
            'discord.lanyardActivate': 'Attiva Lanyard su Discord',
            'discord.lanyardInstall': 'Installa l\'app Lanyard e avvia Discord',
            'discord.lanyardError': 'Impossibile raggiungere Lanyard',
            'discord.lanyardErrorSub': 'Controlla la connessione',
            'discord.status.online': 'ONLINE',
            'discord.status.idle': 'INATTIVO',
            'discord.status.dnd': 'NON DISTURBARE',
            'discord.status.offline': 'OFFLINE',
            'music.loading': 'Caricamento…',
            'music.fromYoutube': 'Audio da YouTube',
            'music.youtubeBrand': 'YouTube',
            'music.error': 'Impossibile caricare il player YouTube',
            'music.prev': 'Brano precedente',
            'music.next': 'Brano successivo',
            'music.play': 'Riproduci',
            'music.pause': 'Pausa',
            'music.progress': 'Avanzamento brano',
            'social.twitter': 'X / Twitter',
            'social.telegram': 'Platinum+ Optimizer',
            'social.gmail': 'Contattami',
            'social.github': 'Repo',
            'social.kofi': 'Donazioni',
            'social.kofi.warning': 'Attenzione: attualmente non ho metodi di pagamento collegati al Ko-fi.',
            'social.kofi.visit': 'Visita Ko-fi',
            'crop.title': 'Ridimensiona la tua foto',
            'crop.hint': 'Trascina per spostare · Scorri / pizzica per zoomare',
            'crop.zoom': 'Zoom',
            'crop.cancel': 'Annulla',
            'crop.confirm': 'Conferma',
            'tutorial.kicker': 'Guida rapida',
            'tutorial.step': 'Step {n} di {total}',
            'tutorial.skip': 'Salta guida',
            'tutorial.back': 'Indietro',
            'tutorial.next': 'Avanti',
            'tutorial.finish': 'Inizia a esplorare',
            'tutorial.step1.title': 'Cos\'è questa pagina?',
            'tutorial.step1.body': 'Hai trovato la pagina personale di IL DENTE PROIBITO — non è un negozio, un forum né un\'app da scaricare. È un biglietto da visita digitale: un unico link dove scopri chi c\'è dietro, cosa fa (sviluppo web, gaming, ottimizzazione) e dove seguirlo online.',
            'tutorial.step2.title': 'Scegli la lingua',
            'tutorial.step2.body': 'Usa il selettore con il globo in alto a sinistra per passare tra inglese, italiano e russo in qualsiasi momento. Tutto il sito si aggiorna subito — prova qui sotto o sul selettore nell\'angolo.',
            'tutorial.step3.title': 'Musica e atmosfera',
            'tutorial.step3.body': 'Clicca «Clicca per entrare» per sbloccare la musica di sottofondo. In alto a destra: controllo volume. Sulla card: play/pausa, brani avanti/indietro e barra di avanzamento — senza app esterne.',
            'tutorial.step4.title': 'Chi c\'è online adesso',
            'tutorial.step4.body': 'La scheda Discord mostra in tempo reale se IL DENTE PROIBITO è online, offline o in pausa, e cosa sta facendo (gioco, Spotify, ecc.). Se è in diretta su Twitch compare un banner rosso «LIVE». Il contatore visitatori indica quante persone uniche sono passate di qua.',
            'tutorial.step5.title': 'Collegati e interagisci',
            'tutorial.step5.body': 'Le icone in basso portano a X (Twitter), Telegram (gruppo Platinum+ Optimizer), Gmail (ildenteproibito@gmail.com) e GitHub (codice sorgente del sito). Puoi cambiare la foto profilo cliccando sull\'avatar (una volta sola) e aggiungerlo su Discord con «Mostra profilo Discord» → «Aggiungimi agli amici».',
            'elapsed.h': '{h}h {m}m trascorsi',
            'elapsed.m': '{m}m {s}s trascorsi',
            'elapsed.s': '{s}s trascorsi',
            'ui.toggle': 'Mostra/Nascondi interfaccia'
        },
        ru: {
            'enter.text': 'Нажмите, чтобы войти',
            'help.title': 'Краткое руководство',
            'help.aria': 'Краткое руководство',
            'lang.aria': 'Язык',
            'volume.aria': 'Громкость музыки',
            'volume.slider': 'Громкость',
            'avatar.changeTitle': 'Сменить фото профиля',
            'avatar.change': 'Сменить',
            'bio': 'Junior Web Developer | Gamer | Platinum+ Optimizer Web Dev',
            'live.aria': 'Смотреть прямой эфир',
            'live.titleDefault': 'В эфире сейчас',
            'live.subDefault': 'Нажмите, чтобы войти',
            'live.cta': 'Смотреть →',
            'live.watchAria': 'Смотреть трансляцию на {platform}: {title}',
            'live.viaDiscord': 'Через Discord',
            'live.manualStream': 'Ручной стрим',
            'live.onTwitch': 'В эфире на Twitch',
            'live.onYoutube': 'В эфире на YouTube',
            'live.onKick': 'В эфире на Kick',
            'live.activeStream': 'Стрим активен',
            'live.streaming': 'В эфире',
            'visitor.kicker': 'Уникальные посетители',
            'visitor.subDefault': 'Подсчёт в реальном времени',
            'visitor.badgeLive': 'Live',
            'visitor.badgeSetup': 'Setup',
            'visitor.badgeOffline': 'Offline',
            'visitor.labelOne': '1 человек посетил сайт',
            'visitor.labelMany': '{count} человек посетили сайт',
            'visitor.error.kv': 'Подключите KV VISITOR_STORE на Cloudflare Pages',
            'visitor.error.apiOk': 'API работает, но visitors не отвечает — проверьте KV',
            'visitor.error.deploy': 'Загрузите _routes.json + functions/ и передеплойте на Cloudflare',
            'visitor.error.kvBinding': 'Cloudflare: добавьте binding KV → VISITOR_STORE',
            'visitor.error.apiActive': 'API активна — подключите KV VISITOR_STORE на Cloudflare',
            'visitor.error.apiInactive': 'API неактивна: загрузите _routes.json и передеплойте',
            'visitor.error.unavailable': 'Счётчик временно недоступен',
            'discord.statusTitle': 'Статус Discord',
            'discord.connecting': 'Подключение к Discord…',
            'discord.showProfile': 'Показать профиль Discord',
            'discord.hideProfile': 'Скрыть профиль Discord',
            'discord.addFriend': 'Добавить в друзья',
            'discord.badgesAria': 'Значки профиля Discord',
            'discord.badgesUnavailable': 'Значки недоступны',
            'discord.noBadges': 'Нет публичных значков в этом профиле',
            'discord.connectLanyardBadges': 'Подключите Lanyard, чтобы видеть значки',
            'discord.notOnDiscord': 'Не подключён к Discord',
            'discord.noActivity': 'Нет активности',
            'discord.listeningSpotify': 'Слушает Spotify',
            'discord.live': 'В эфире',
            'discord.playingGame': 'Играет в игру',
            'discord.customStatus': 'Пользовательский статус',
            'discord.statusSuffix': ' · СТАТУС',
            'discord.lanyardLabel': 'LANYARD',
            'discord.lanyardActivate': 'Включите Lanyard в Discord',
            'discord.lanyardInstall': 'Установите приложение Lanyard и откройте Discord',
            'discord.lanyardError': 'Не удалось подключиться к Lanyard',
            'discord.lanyardErrorSub': 'Проверьте соединение',
            'discord.status.online': 'В СЕТИ',
            'discord.status.idle': 'НЕ АКТИВЕН',
            'discord.status.dnd': 'НЕ БЕСПОКОИТЬ',
            'discord.status.offline': 'НЕ В СЕТИ',
            'music.loading': 'Загрузка…',
            'music.fromYoutube': 'Аудио с YouTube',
            'music.youtubeBrand': 'YouTube',
            'music.error': 'Не удалось загрузить плеер YouTube',
            'music.prev': 'Предыдущий трек',
            'music.next': 'Следующий трек',
            'music.play': 'Воспроизвести',
            'music.pause': 'Пауза',
            'music.progress': 'Прогресс трека',
            'social.twitter': 'X / Twitter',
            'social.telegram': 'Platinum+ Optimizer',
            'social.gmail': 'Свяжитесь со мной',
            'social.github': 'Repo',
            'social.kofi': 'Пожертвования',
            'social.kofi.warning': 'Внимание: в настоящее время к Ko-fi не подключены способы оплаты.',
            'social.kofi.visit': 'Перейти на Ko-fi',
            'crop.title': 'Изменить размер фото',
            'crop.hint': 'Перетащите · Прокрутка / щипок для масштаба',
            'crop.zoom': 'Масштаб',
            'crop.cancel': 'Отмена',
            'crop.confirm': 'Подтвердить',
            'tutorial.kicker': 'Краткое руководство',
            'tutorial.step': 'Шаг {n} из {total}',
            'tutorial.skip': 'Пропустить',
            'tutorial.back': 'Назад',
            'tutorial.next': 'Далее',
            'tutorial.finish': 'Начать',
            'tutorial.step1.title': 'Что это за страница?',
            'tutorial.step1.body': 'Вы нашли личную страницу IL DENTE PROIBITO — это не магазин, форум и не приложение для скачивания. Это цифровая визитка: одна ссылка, где можно узнать, кто стоит за проектом, чем занимается (веб-разработка, гейминг, оптимизация) и где следить за ним в сети.',
            'tutorial.step2.title': 'Выберите язык',
            'tutorial.step2.body': 'Используйте селектор с глобусом слева вверху, чтобы переключаться между английским, итальянским и русским в любой момент. Весь сайт обновляется мгновенно — попробуйте здесь или на селекторе в углу.',
            'tutorial.step3.title': 'Музыка и атмосфера',
            'tutorial.step3.body': 'Нажмите «Нажмите, чтобы войти», чтобы включить фоновую музыку. Справа вверху — громкость. На карточке: play/pause, переключение треков и полоса прогресса — без внешних приложений.',
            'tutorial.step4.title': 'Кто онлайн сейчас',
            'tutorial.step4.body': 'Карточка Discord показывает в реальном времени, онлайн ли IL DENTE PROIBITO, офлайн или отошёл, и чем занят (игра, Spotify и т.д.). При трансляции на Twitch появляется красный баннер «LIVE». Счётчик посетителей показывает, сколько уникальных людей заходило на сайт.',
            'tutorial.step5.title': 'Связаться и взаимодействовать',
            'tutorial.step5.body': 'Иконки внизу ведут на X (Twitter), Telegram (группа Platinum+ Optimizer), Gmail (ildenteproibito@gmail.com) и GitHub (исходный код сайта). Можно сменить фото профиля, нажав на аватар (только один раз), и добавить в друзья в Discord через «Показать профиль Discord» → «Добавить в друзья».',
            'elapsed.h': '{h}ч {m}м прошло',
            'elapsed.m': '{m}м {s}с прошло',
            'elapsed.s': '{s}с прошло',
            'ui.toggle': 'Показать/Скрыть интерфейс'
        }
    };

    function detectLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && SUPPORTED.includes(saved)) return saved;
        } catch {}
        const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
        return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
    }

    let lang = detectLang();

    function t(key, vars) {
        let str = STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
        if (vars) {
            Object.entries(vars).forEach(([k, v]) => {
                str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
            });
        }
        return str;
    }

    const LANG_LABELS = { en: 'English', it: 'Italiano', ru: 'Русский' };

    function syncLangUI() {
        const currentLabel = document.getElementById('langCurrentLabel');
        if (currentLabel) currentLabel.textContent = LANG_LABELS[lang] || LANG_LABELS.en;

        document.querySelectorAll('.lang-option').forEach((btn) => {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        document.querySelectorAll('.tutorial-lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        const trigger = document.getElementById('langTrigger');
        if (trigger) trigger.setAttribute('aria-label', t('lang.aria'));
    }

    function applyStatic() {
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key || el.id === 'liveTitle' || el.id === 'liveSub' || el.id === 'visitorSub' || el.id === 'musicTitle') return;
            el.textContent = t(key);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });
        document.querySelectorAll('[data-i18n-title]').forEach((el) => {
            const val = t(el.getAttribute('data-i18n-title'));
            if (val) el.title = val;
        });
        document.querySelectorAll('[data-i18n-tooltip]').forEach((el) => {
            el.setAttribute('data-tooltip', t(el.getAttribute('data-i18n-tooltip')));
        });
        syncLangUI();
    }

    function setLangMenuOpen(open) {
        const selector = document.getElementById('langSelector');
        const trigger = document.getElementById('langTrigger');
        if (!selector || !trigger) return;
        selector.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function setLang(newLang) {
        if (!SUPPORTED.includes(newLang) || newLang === lang) return;
        lang = newLang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
        document.documentElement.lang = lang;
        applyStatic();
        window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    window.i18n = {
        t,
        setLang,
        getLang: () => lang,
        locale: () => LOCALES[lang] || LOCALES.en,
        applyStatic,
        setLangMenuOpen,
        syncLangUI
    };

    document.documentElement.lang = lang;
    applyStatic();

    const langTrigger = document.getElementById('langTrigger');
    const langSelector = document.getElementById('langSelector');

    if (langTrigger && langSelector) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            setLangMenuOpen(!langSelector.classList.contains('open'));
        });

        langSelector.querySelectorAll('.lang-option').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setLang(btn.dataset.lang);
                setLangMenuOpen(false);
            });
        });

        document.addEventListener('click', (e) => {
            if (!langSelector.contains(e.target)) setLangMenuOpen(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setLangMenuOpen(false);
        });
    }

    document.querySelectorAll('.tutorial-lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
})();

let hasEntered = false;
const enterOverlay = document.getElementById('enterOverlay');
const volumeSlider = document.getElementById('globalVolume');
const volumeIcon = document.getElementById('volumeIcon');
let lastVolume = 0.45;

// --- YouTube audio-only playlist ---
(function () {
    const YT_PLAYLIST = [
        { id: 'gKfjXIdtxHQ', start: 0 },
        { id: 'zFBLz98EI6g', start: 1 },
        { id: 'KarUBsI3VHo', start: 0 },
        { id: '5EpyN_6dqyk', start: 0 },
    ];

    const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, CUED: 5 };
    const IS_FILE_ORIGIN = window.location.protocol === 'file:';
    const CAN_USE_YT_API = window.location.protocol === 'http:' || window.location.protocol === 'https:';

    const playerBox = document.getElementById('musicPlayer');
    const hostEl = document.getElementById('youtubePlayerHost');
    const thumbEl = document.getElementById('musicThumb');
    const titleEl = document.getElementById('musicTitle');
    const timeCurEl = document.getElementById('musicTimeCurrent');
    const timeTotEl = document.getElementById('musicTimeTotal');
    const progressBar = document.getElementById('musicProgressBar');
    const progressFill = document.getElementById('musicProgressFill');
    const btnPrev = document.getElementById('musicPrev');
    const btnNext = document.getElementById('musicNext');
    const btnPlay = document.getElementById('musicPlayPause');

    if (!thumbEl || !btnPlay || !hostEl) return;

    let player = null;
    let embedIframe = null;
    let trackIndex = 0;
    let playerReady = false;
    let unlocked = false;
    let pendingPlay = false;
    let apiLoading = null;
    let progressTimer = null;
    let embedPlaying = false;

    function formatTime(seconds) {
        const s = Math.max(0, Math.floor(seconds || 0));
        const m = Math.floor(s / 60);
        const r = s % 60;
        return `${m}:${r.toString().padStart(2, '0')}`;
    }

    function thumbUrl(id) {
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }

    function isPlayingState() {
        if (IS_FILE_ORIGIN) return embedPlaying;
        return playerReady && player && typeof player.getPlayerState === 'function'
            && player.getPlayerState() === YT_STATE.PLAYING;
    }

    function syncPlayPauseUi(playing) {
        btnPlay.classList.toggle('is-playing', playing);
        const key = playing ? 'music.pause' : 'music.play';
        const label = window.i18n ? window.i18n.t(key) : (playing ? 'Pause' : 'Play');
        btnPlay.setAttribute('aria-label', label);
    }

    function syncMusicAria() {
        if (!window.i18n) return;
        btnPrev.setAttribute('aria-label', window.i18n.t('music.prev'));
        btnNext.setAttribute('aria-label', window.i18n.t('music.next'));
        progressBar.setAttribute('aria-label', window.i18n.t('music.progress'));
        syncPlayPauseUi(isPlayingState());
    }

    function showError() {
        if (playerBox) playerBox.classList.add('is-error');
        titleEl.setAttribute('data-i18n', 'music.error');
        if (window.i18n) titleEl.textContent = window.i18n.t('music.error');
    }

    function buildEmbedUrl(track, autoplay) {
        const params = new URLSearchParams({
            enablejsapi: '1',
            controls: '0',
            modestbranding: '1',
            rel: '0',
            playsinline: '1',
            iv_load_policy: '3',
            start: String(track.start || 0),
        });
        if (autoplay) params.set('autoplay', '1');
        return `https://www.youtube.com/embed/${track.id}?${params.toString()}`;
    }

    function embedCommand(func, args) {
        if (!embedIframe?.contentWindow) return;
        embedIframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func, args: args ?? '' }),
            '*'
        );
    }

    async function fetchTitleForTrack(id) {
        setLoadingTitle();
        try {
            const url = `https://www.youtube.com/watch?v=${id}`;
            const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
            if (!res.ok) throw new Error('noembed');
            const data = await res.json();
            if (data.title) {
                if (playerBox) playerBox.classList.remove('is-error');
                titleEl.removeAttribute('data-i18n');
                titleEl.textContent = data.title;
                return;
            }
        } catch (_) {}
        titleEl.removeAttribute('data-i18n');
        titleEl.textContent = 'YouTube';
    }

    function initEmbedPlayer() {
        if (embedIframe) return Promise.resolve();
        return new Promise((resolve, reject) => {
            embedIframe = document.createElement('iframe');
            embedIframe.width = '320';
            embedIframe.height = '180';
            embedIframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
            embedIframe.setAttribute('title', 'YouTube');
            embedIframe.addEventListener('load', () => {
                playerReady = true;
                embedCommand('addEventListener', 'onStateChange');
                resolve();
            }, { once: true });
            embedIframe.addEventListener('error', () => reject(new Error('embed')));
            hostEl.appendChild(embedIframe);
            embedIframe.src = buildEmbedUrl(YT_PLAYLIST[trackIndex], false);
        });
    }

    function embedLoadTrack(index, autoplay) {
        trackIndex = ((index % YT_PLAYLIST.length) + YT_PLAYLIST.length) % YT_PLAYLIST.length;
        const track = YT_PLAYLIST[trackIndex];
        updateTrackUi(trackIndex);
        fetchTitleForTrack(track.id);
        if (!embedIframe) return;
        embedIframe.src = buildEmbedUrl(track, autoplay);
        embedPlaying = !!autoplay;
        syncPlayPauseUi(embedPlaying);
        if (autoplay) startProgressTimer();
    }

    function embedPlayCurrent() {
        if (!playerReady) return;
        if (embedPlaying) {
            embedCommand('pauseVideo');
            embedPlaying = false;
            syncPlayPauseUi(false);
            stopProgressTimer();
            return;
        }
        embedLoadTrack(trackIndex, true);
    }

    function loadYouTubeApi() {
        if (window.YT && window.YT.Player) return Promise.resolve();
        if (apiLoading) return apiLoading;
        apiLoading = new Promise((resolve, reject) => {
            const done = () => {
                if (window.YT && window.YT.Player) resolve();
                else reject(new Error('YouTube API unavailable'));
            };
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function () {
                if (typeof prev === 'function') prev();
                done();
            };
            if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                const wait = setInterval(() => {
                    if (window.YT && window.YT.Player) {
                        clearInterval(wait);
                        resolve();
                    }
                }, 100);
                setTimeout(() => {
                    clearInterval(wait);
                    if (window.YT && window.YT.Player) resolve();
                    else reject(new Error('YouTube API timeout'));
                }, 15000);
                return;
            }
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;
            tag.onerror = () => reject(new Error('YouTube API blocked'));
            document.head.appendChild(tag);
        });
        return apiLoading;
    }

    function playerVars() {
        const vars = {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            iv_load_policy: 3,
            enablejsapi: 1,
        };
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            vars.origin = window.location.origin;
        }
        return vars;
    }

    function applyVolume() {
        const v = Math.round(parseFloat(volumeSlider.value || '0') * 100);
        if (IS_FILE_ORIGIN) {
            if (playerReady) embedCommand('setVolume', String(v));
        } else if (playerReady && player) {
            try { player.setVolume(v); } catch (_) {}
        }
        volumeIcon.classList.toggle('muted', v === 0);
    }

    function refreshTitle() {
        if (IS_FILE_ORIGIN) return;
        if (!playerReady || !player || !player.getVideoData) return;
        try {
            const data = player.getVideoData();
            if (data && data.title) {
                if (playerBox) playerBox.classList.remove('is-error');
                titleEl.removeAttribute('data-i18n');
                titleEl.textContent = data.title;
            }
        } catch (_) {}
    }

    function setLoadingTitle() {
        titleEl.setAttribute('data-i18n', 'music.loading');
        if (window.i18n) titleEl.textContent = window.i18n.t('music.loading');
    }

    function updateTrackUi(index) {
        const track = YT_PLAYLIST[index];
        thumbEl.src = thumbUrl(track.id);
        if (IS_FILE_ORIGIN) fetchTitleForTrack(track.id);
        else if (!playerReady || titleEl.getAttribute('data-i18n') === 'music.loading') setLoadingTitle();
    }

    function updateProgressUi() {
        if (!playerReady || !player) return;
        const cur = player.getCurrentTime() || 0;
        const dur = player.getDuration() || 0;
        timeCurEl.textContent = formatTime(cur);
        timeTotEl.textContent = formatTime(dur);
        const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;
        progressFill.style.width = `${pct}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(pct)));
    }

    function stopProgressTimer() {
        if (progressTimer) clearInterval(progressTimer);
        progressTimer = null;
    }

    function startProgressTimer() {
        stopProgressTimer();
        if (IS_FILE_ORIGIN) {
            progressTimer = setInterval(() => {
                embedCommand('getCurrentTime');
                embedCommand('getDuration');
            }, 400);
            return;
        }
        progressTimer = setInterval(updateProgressUi, 300);
    }

    function startPlayback() {
        if (IS_FILE_ORIGIN) {
            embedLoadTrack(trackIndex, true);
            return;
        }
        if (!playerReady || !player) return;
        const track = YT_PLAYLIST[trackIndex];
        player.loadVideoById({ videoId: track.id, startSeconds: track.start });
        player.playVideo();
        applyVolume();
    }

    function loadTrack(index, autoplay) {
        if (IS_FILE_ORIGIN) {
            embedLoadTrack(index, autoplay);
            return;
        }
        trackIndex = ((index % YT_PLAYLIST.length) + YT_PLAYLIST.length) % YT_PLAYLIST.length;
        updateTrackUi(trackIndex);
        if (!playerReady) return;
        const track = YT_PLAYLIST[trackIndex];
        const opts = { videoId: track.id, startSeconds: track.start };
        if (autoplay) player.loadVideoById(opts);
        else player.cueVideoById(opts);
    }

    function playCurrent() {
        if (IS_FILE_ORIGIN) {
            embedPlayCurrent();
            return;
        }
        if (!playerReady || !player) return;
        const state = player.getPlayerState();
        if (state === YT_STATE.PLAYING) {
            player.pauseVideo();
            syncPlayPauseUi(false);
            stopProgressTimer();
            return;
        }
        if (state === YT_STATE.PAUSED || state === YT_STATE.CUED) {
            player.playVideo();
            return;
        }
        startPlayback();
    }

    function nextTrack(auto) {
        loadTrack(trackIndex + 1, auto || unlocked);
    }

    function prevTrack() {
        loadTrack(trackIndex - 1, unlocked);
    }

    function onPlayerReady() {
        playerReady = true;
        applyVolume();
        if (unlocked && pendingPlay) startPlayback();
        else loadTrack(trackIndex, false);
        pendingPlay = false;
    }

    function onPlayerStateChange(event) {
        if (event.data === YT_STATE.PLAYING) {
            syncPlayPauseUi(true);
            refreshTitle();
            startProgressTimer();
            updateProgressUi();
        } else if (event.data === YT_STATE.PAUSED) {
            syncPlayPauseUi(false);
            stopProgressTimer();
            updateProgressUi();
        } else if (event.data === YT_STATE.ENDED) {
            nextTrack(true);
        } else if (event.data === YT_STATE.CUED) {
            refreshTitle();
            updateProgressUi();
        }
    }

    function initPlayer() {
        if (player) return;
        player = new YT.Player('youtubePlayerHost', {
            width: 320,
            height: 180,
            videoId: YT_PLAYLIST[0].id,
            host: 'https://www.youtube-nocookie.com',
            playerVars: playerVars(),
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: () => showError(),
            },
        });
    }

    function ensurePlayer() {
        if (IS_FILE_ORIGIN) {
            return initEmbedPlayer().catch(() => {
                showError();
                throw new Error('yt-embed');
            });
        }
        if (!CAN_USE_YT_API) {
            showError();
            return Promise.reject(new Error('yt-origin'));
        }
        return loadYouTubeApi().then(() => {
            if (!player) initPlayer();
        }).catch(() => {
            showError();
            throw new Error('yt-api');
        });
    }

    function requestPlayback() {
        unlocked = true;
        pendingPlay = true;
        setLoadingTitle();
        return ensurePlayer().then(() => {
            if (playerReady) {
                playCurrent();
                pendingPlay = false;
            }
        }).catch(() => {});
    }

    btnPlay.addEventListener('click', () => requestPlayback());
    btnNext.addEventListener('click', () => {
        unlocked = true;
        ensurePlayer().then(() => nextTrack(true)).catch(() => {});
    });
    btnPrev.addEventListener('click', () => {
        unlocked = true;
        ensurePlayer().then(() => prevTrack()).catch(() => {});
    });

    progressBar.addEventListener('click', (e) => {
        if (!playerReady || !unlocked) return;
        const rect = progressBar.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        if (IS_FILE_ORIGIN) {
            const dur = parseFloat(progressBar.dataset.duration || '0');
            if (dur > 0) embedCommand('seekTo', `${dur * ratio},true`);
            return;
        }
        const dur = player.getDuration() || 0;
        if (dur > 0) player.seekTo(dur * ratio, true);
    });

    progressBar.addEventListener('keydown', (e) => {
        if (!playerReady || !unlocked) return;
        const step = e.key === 'ArrowRight' ? 5 : e.key === 'ArrowLeft' ? -5 : 0;
        if (!step) return;
        e.preventDefault();
        if (IS_FILE_ORIGIN) {
            const cur = parseFloat(progressBar.dataset.current || '0');
            const dur = parseFloat(progressBar.dataset.duration || '0');
            if (dur > 0) embedCommand('seekTo', `${Math.min(dur, Math.max(0, cur + step))},true`);
            return;
        }
        const dur = player.getDuration() || 0;
        if (!dur) return;
        player.seekTo(Math.min(dur, Math.max(0, (player.getCurrentTime() || 0) + step)), true);
    });

    window.addEventListener('message', (e) => {
        if (!IS_FILE_ORIGIN || !/^https:\/\/(www\.)?youtube\.com$/.test(e.origin)) return;
        let data;
        try {
            data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        } catch (_) {
            return;
        }
        if (data.event === 'onStateChange') {
            if (data.info === YT_STATE.PLAYING) {
                embedPlaying = true;
                syncPlayPauseUi(true);
                startProgressTimer();
            } else if (data.info === YT_STATE.PAUSED) {
                embedPlaying = false;
                syncPlayPauseUi(false);
                stopProgressTimer();
            } else if (data.info === YT_STATE.ENDED) {
                nextTrack(true);
            }
        }
        if (data.info && typeof data.info === 'object') {
            if (data.info.currentTime != null) {
                progressBar.dataset.current = String(data.info.currentTime);
                timeCurEl.textContent = formatTime(data.info.currentTime);
            }
            if (data.info.duration != null) {
                progressBar.dataset.duration = String(data.info.duration);
                timeTotEl.textContent = formatTime(data.info.duration);
                const cur = parseFloat(progressBar.dataset.current || '0');
                const pct = data.info.duration > 0 ? Math.min(100, (cur / data.info.duration) * 100) : 0;
                progressFill.style.width = `${pct}%`;
            }
        }
    });

    volumeSlider.addEventListener('input', () => {
        lastVolume = parseFloat(volumeSlider.value);
        applyVolume();
    });

    volumeIcon.addEventListener('click', () => {
        const current = parseFloat(volumeSlider.value);
        if (current > 0) {
            volumeSlider.dataset.stored = String(current);
            volumeSlider.value = '0';
        } else {
            volumeSlider.value = volumeSlider.dataset.stored || String(lastVolume || 0.45);
        }
        lastVolume = parseFloat(volumeSlider.value);
        applyVolume();
    });

    window.addEventListener('langchange', () => {
        syncMusicAria();
        const key = titleEl.getAttribute('data-i18n');
        if (key && window.i18n) titleEl.textContent = window.i18n.t(key);
    });

    syncMusicAria();
    updateTrackUi(0);

    if (IS_FILE_ORIGIN) {
        initEmbedPlayer().then(() => applyVolume()).catch(() => showError());
    } else if (CAN_USE_YT_API) {
        loadYouTubeApi().then(() => { if (!player) initPlayer(); }).catch(() => showError());
    } else {
        showError();
    }

    window.musicPlayer = {
        unlock() {
            if (unlocked && playerReady) return;
            requestPlayback();
        },
    };
})();

function enterSite() {
    if (hasEntered) return;
    hasEntered = true;
    enterOverlay.classList.add('hidden');
    
    // Qui sblocchiamo il cursore custom togliendo quello nativo solo ora
    document.body.classList.add('entered'); 

    if (window.musicPlayer && typeof window.musicPlayer.unlock === 'function') {
        window.musicPlayer.unlock();
    }

    if (typeof window.showTutorialIfNeeded === 'function') {
        window.showTutorialIfNeeded();
    }
}

enterOverlay.addEventListener('click', enterSite);


// --- PFP Uploader & Cropper --- (disabled: photo is locked)
(function () {
    // Upload disabled — avatar is permanently locked
})();

// --- Custom Cursor ---
(function () {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let rafId;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
        
        // Mostra il cursore animato SOLO dopo che l'utente è "entrato" cliccando
        if (hasEntered && dot.style.opacity === '0') {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    });

    // Ring follows with smooth lerp
    function animateRing() {
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;
        ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
        rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    const hoverTargets = 'a, button, input[type="range"], .volume-icon, .control-btn, .crop-btn';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));

    // Hide cursors when mouse leaves window
    document.addEventListener('mouseleave', () => { 
        dot.style.opacity = '0'; 
        ring.style.opacity = '0'; 
    });
    document.addEventListener('mouseenter', () => { 
        if (hasEntered) {
            dot.style.opacity = '1'; 
            ring.style.opacity = '1'; 
        }
    });
})();


// --- Typing Effect ---
(function () {
    const USERNAME = 'IL DENTE PROIBITO';

    const usernameEl = document.querySelector('.username');
    const bioEl      = document.querySelector('.bio');

    usernameEl.textContent = '';
    bioEl.textContent      = '';
    const uCursor = document.createElement('span');
    uCursor.className = 'typing-cursor';
    const bCursor = document.createElement('span');
    bCursor.className = 'typing-cursor';
    let bioTyped = false;

    function typeText(el, text, cursor, delay, speed, onDone) {
        el.appendChild(cursor);
        let i = 0;
        setTimeout(() => {
            const iv = setInterval(() => {
                el.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
                if (i >= text.length) {
                    clearInterval(iv);
                    setTimeout(() => {
                        cursor.style.transition = 'opacity 0.4s ease';
                        cursor.style.opacity = '0';
                        setTimeout(() => cursor.remove(), 450);
                    }, 900);
                    if (onDone) onDone();
                }
            }, speed);
        }, delay);
    }

    typeText(usernameEl, USERNAME, uCursor, 600, 75, null);
    typeText(bioEl, window.i18n.t('bio'), bCursor, 600 + USERNAME.length * 75 + 300, 45, () => { bioTyped = true; });

    window.addEventListener('langchange', () => {
        if (bioTyped) bioEl.textContent = window.i18n.t('bio');
    });
})();

// --- Block Copy, Cut, Paste, Context Menu, Drag & Drop ---
(function () {
    const block = (e) => e.preventDefault();
    ['contextmenu','copy','cut','selectstart',
     'dragstart','dragover','dragenter','dragleave','drop'
    ].forEach(ev => document.addEventListener(ev, block, true));
})();

// --- Discord presence via Lanyard (RPC bridge) ---
(function () {
    const DISCORD_USER_ID = '1233950558184800297';
    const LANYARD_REST = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
    const LANYARD_WS = 'wss://api.lanyard.rest/socket';

    const STREAM_CHANNELS = {
        twitch: 'markgattu',
        youtube: null,
        kick: null,
    };

    const card           = document.getElementById('nowPlaying');
    const npLabel        = document.getElementById('npLabel');
    const npGame         = document.getElementById('npGame');
    const npSub          = document.getElementById('npSub');
    const npElapsed      = document.getElementById('npElapsed');
    const npIconWrap     = document.getElementById('npIconWrap');
    const statusRing     = document.getElementById('discordStatusRing');
    const avatarImg      = document.getElementById('avatarImg');
    const discordExpand  = document.getElementById('discordExpand');
    const discordToggle  = document.getElementById('discordToggleBtn');
    const discordNameEl  = document.getElementById('discordDisplayName');
    const discordHandle  = document.getElementById('discordHandle');
    const discordBadges  = document.getElementById('discordBadges');
    const discordFriend  = document.getElementById('discordFriendBtn');
    const liveBanner     = document.getElementById('liveBanner');
    const livePlatform   = document.getElementById('livePlatform');
    const liveTitle      = document.getElementById('liveTitle');
    const liveSub        = document.getElementById('liveSub');
    const liveBannerIcon = document.getElementById('liveBannerIcon');
    const DEFAULT_NP_SVG = npIconWrap.innerHTML;
    const DEFAULT_LIVE_ICON = liveBannerIcon.innerHTML;

    let externalLiveCache = null;
    let lastLanyardData = null;
    let lanyardMissing = false;
    let lanyardFetchFailed = false;

    const BADGE_CDN = 'https://raw.githubusercontent.com/mezotv/discord-badges/main/badges';
    const PUBLIC_FLAG_BADGES = [
        { bit: 1 << 0,  slug: 'staff',               title: 'Discord Staff' },
        { bit: 1 << 1,  slug: 'partner',             title: 'Partnered Server Owner' },
        { bit: 1 << 2,  slug: 'hypesquad_events',    title: 'HypeSquad Events' },
        { bit: 1 << 3,  slug: 'bug_hunter_level_1',  title: 'Bug Hunter' },
        { bit: 1 << 6,  slug: 'bravery',             title: 'HypeSquad Bravery' },
        { bit: 1 << 7,  slug: 'brilliance',          title: 'HypeSquad Brilliance' },
        { bit: 1 << 8,  slug: 'balance',             title: 'HypeSquad Balance' },
        { bit: 1 << 9,  slug: 'early_supporter',     title: 'Early Supporter' },
        { bit: 1 << 14, slug: 'bug_hunter_level_2',  title: 'Bug Hunter Gold' },
        { bit: 1 << 17, slug: 'verified_developer',  title: 'Verified Developer' },
        { bit: 1 << 18, slug: 'certified_moderator', title: 'Moderator Alumni' }
    ];

    discordFriend.href = `https://discord.com/users/${DISCORD_USER_ID}`;

    discordToggle.addEventListener('click', () => {
        const open = discordExpand.hasAttribute('hidden');
        discordExpand.toggleAttribute('hidden', !open);
        discordToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        const label = discordToggle.querySelector('[data-i18n]');
        if (label) label.textContent = window.i18n.t(open ? 'discord.hideProfile' : 'discord.showProfile');
    });

    function statusLabel(status) {
        return window.i18n.t(`discord.status.${status}`) || window.i18n.t('discord.status.offline');
    }

    let elapsedInterval = null;
    let ws = null;
    let heartbeatTimer = null;
    let reconnectDelay = 2000;
    let pfpLockedByUser = false;

    try { pfpLockedByUser = !!localStorage.getItem('pfp_data'); } catch {}

    function escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatElapsed(ms) {
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        if (h > 0) return window.i18n.t('elapsed.h', { h, m: m % 60 });
        if (m > 0) return window.i18n.t('elapsed.m', { m, s: s % 60 });
        return window.i18n.t('elapsed.s', { s });
    }

    function clearTimers() {
        clearInterval(elapsedInterval);
        elapsedInterval = null;
    }

    function startElapsedTimer(fromMs) {
        clearInterval(elapsedInterval);
        if (!fromMs) {
            npElapsed.textContent = '';
            return;
        }
        elapsedInterval = setInterval(() => {
            npElapsed.textContent = formatElapsed(Date.now() - fromMs);
        }, 1000);
        npElapsed.textContent = formatElapsed(Date.now() - fromMs);
    }

    function setNpIcon(url, alt) {
        if (url) {
            npIconWrap.innerHTML = `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt || '')}" loading="lazy">`;
        } else {
            npIconWrap.innerHTML = DEFAULT_NP_SVG;
        }
    }

    function activityImage(activity) {
        if (!activity?.assets?.large_image) return null;
        const img = activity.assets.large_image;
        if (img.startsWith('mp:external/')) {
            const parts = img.split('/');
            if (parts.length > 2) {
                return `https://${parts.slice(2).join('/')}`;
            }
            return null;
        }
        if (img.startsWith('spotify:')) return null;
        if (activity.application_id) {
            return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
        }
        return null;
    }

    function discordAvatarUrl(user) {
        if (user.avatar) {
            const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
        }
        const defaultIndex = user.discriminator && user.discriminator !== '0'
            ? Number(user.discriminator) % 5
            : Number((BigInt(user.id) >> 22n) % 6n);
        return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
    }

    function customStatusText(activity) {
        if (!activity) return '';
        const emoji = activity.emoji;
        const prefix = emoji
            ? (emoji.id
                ? `<img class="np-emoji" src="https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}" alt="">`
                : (emoji.name || ''))
            : '';
        const state = activity.state || activity.name || '';
        return `${prefix}${state}`.trim();
    }

    function findActivity(activities, type) {
        return (activities || []).find((a) => a.type === type) || null;
    }

    function normalizePlatform(name) {
        const n = String(name || '').toLowerCase();
        if (n.includes('twitch')) return 'Twitch';
        if (n.includes('youtube')) return 'YouTube';
        if (n.includes('kick')) return 'Kick';
        if (n.includes('discord')) return 'Discord';
        return name || 'Live';
    }

    function streamFromLanyardActivity(activity) {
        if (!activity || activity.type !== 1) return null;
        const platform = normalizePlatform(activity.name);
        const title = activity.details || activity.state || window.i18n.t('live.titleDefault');
        const subtitle = [activity.state, activity.details].filter(Boolean)
            .filter((v, i, arr) => arr.indexOf(v) === i && v !== title)
            .join(' · ');
        let url = activity.url || '';
        if (!url) {
            const name = String(activity.name || '').toLowerCase();
            if (name.includes('twitch') && STREAM_CHANNELS.twitch) {
                url = `https://twitch.tv/${STREAM_CHANNELS.twitch}`;
            }
        }
        if (!url) return null;
        return {
            platform,
            title,
            subtitle: subtitle || window.i18n.t('live.viaDiscord'),
            url,
            thumb: activityImage(activity),
            source: 'discord'
        };
    }

    function streamFromLanyardKv(kv) {
        if (!kv || typeof kv !== 'object') return null;
        const live = kv.live === true || kv.live === 'true' || kv.is_live === true || kv.is_live === 'true';
        const url = kv.live_url || kv.stream_url || kv.url;
        if (!live && !url) return null;
        if (!url) return null;
        return {
            platform: normalizePlatform(kv.live_platform || kv.platform || 'Live'),
            title: kv.live_title || kv.title || window.i18n.t('live.titleDefault'),
            subtitle: kv.live_sub || kv.subtitle || window.i18n.t('live.manualStream'),
            url: String(url),
            thumb: kv.live_thumb || null,
            source: 'kv'
        };
    }

    function setLiveIcon(thumbUrl, platform) {
        if (thumbUrl) {
            liveBannerIcon.innerHTML = `<img src="${escapeHtml(thumbUrl)}" alt="" loading="lazy">`;
            return;
        }
        const p = String(platform || '').toLowerCase();
        if (p.includes('twitch')) {
            liveBannerIcon.innerHTML = '<svg viewBox="0 0 24 24"><path fill="#9146FF" d="M11.64 5.93 9.43 8.14 7.21 5.93 4.5 8.64v6.72l2.71 2.71 2.22-2.22 2.21 2.22L19.5 15.36V8.64L16.79 5.93l-2.22 2.21-2.21-2.21-1.72 1.72zm1.72 3.07 2.21-2.21 1.72 1.72v4.98l-1.72 1.72-2.21-2.21-2.22 2.21-1.72-1.72V8.64l1.72-1.72 2.22 2.21 2.21-2.21 1.72 1.72v4.98l-1.72 1.72-2.21-2.21z"/></svg>';
        } else if (p.includes('youtube')) {
            liveBannerIcon.innerHTML = '<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>';
        } else if (p.includes('kick')) {
            liveBannerIcon.innerHTML = '<svg viewBox="0 0 24 24"><path fill="#53FC18" d="M3 3h7v4H8v10H3V3zm11 0h7v7h-4v1h4v7h-7v-4h3v-1h-3V3z"/></svg>';
        } else {
            liveBannerIcon.innerHTML = DEFAULT_LIVE_ICON;
        }
    }

    function renderLiveBanner(info) {
        if (!info?.url) {
            liveBanner.hidden = true;
            liveBanner.href = '#';
            return;
        }
        liveBanner.hidden = false;
        liveBanner.href = info.url;
        livePlatform.textContent = info.platform || 'Live';
        liveTitle.textContent = info.title || window.i18n.t('live.titleDefault');
        liveSub.textContent = info.subtitle || window.i18n.t('live.subDefault');
        liveBanner.setAttribute('aria-label', window.i18n.t('live.watchAria', {
            platform: info.platform || 'Live',
            title: info.title || window.i18n.t('live.titleDefault')
        }));
        const ctaEl = document.getElementById('liveBannerCta');
        if (ctaEl) ctaEl.textContent = window.i18n.t('live.cta');
        setLiveIcon(info.thumb, info.platform);
    }

    function resolveLiveStatus(data) {
        const kvStream = streamFromLanyardKv(data?.kv);
        if (kvStream) return kvStream;

        const streamActivity = findActivity(data?.activities || [], 1);
        const discordStream = streamFromLanyardActivity(streamActivity);
        if (discordStream) return discordStream;

        if (externalLiveCache?.url) return externalLiveCache;
        return null;
    }

    function updateLiveBanner(data) {
        lastLanyardData = data;
        renderLiveBanner(resolveLiveStatus(data));
    }

    async function fetchText(url) {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('fetch_failed');
        return (await res.text()).trim();
    }

    async function checkTwitchLive(username) {
        const text = await fetchText(`https://decapi.me/twitch/uptime/${encodeURIComponent(username)}`);
        if (/offline|not live|does not exist|invalid/i.test(text)) return null;
        return {
            platform: 'Twitch',
            title: window.i18n.t('live.onTwitch'),
            subtitle: text.length < 80 ? text : window.i18n.t('live.activeStream'),
            url: `https://twitch.tv/${username}`,
            thumb: null,
            source: 'twitch'
        };
    }

    async function checkYoutubeLive(channel) {
        const text = await fetchText(`https://decapi.me/youtube/live?channel=${encodeURIComponent(channel)}`);
        if (!text || /offline|not live|invalid|error/i.test(text)) return null;
        const url = text.startsWith('http') ? text : `https://youtube.com/watch?v=${text}`;
        return {
            platform: 'YouTube',
            title: window.i18n.t('live.onYoutube'),
            subtitle: window.i18n.t('live.activeStream'),
            url,
            thumb: null,
            source: 'youtube'
        };
    }

    async function checkKickLive(username) {
        const text = await fetchText(`https://decapi.me/kick/uptime/${encodeURIComponent(username)}`);
        if (/offline|not live|does not exist|invalid/i.test(text)) return null;
        return {
            platform: 'Kick',
            title: window.i18n.t('live.onKick'),
            subtitle: text.length < 80 ? text : window.i18n.t('live.activeStream'),
            url: `https://kick.com/${username}`,
            thumb: null,
            source: 'kick'
        };
    }

    async function pollExternalStreams() {
        const hasChannels = STREAM_CHANNELS.twitch || STREAM_CHANNELS.youtube || STREAM_CHANNELS.kick;
        if (!hasChannels) return;

        let found = null;
        try {
            if (STREAM_CHANNELS.twitch) {
                found = await checkTwitchLive(STREAM_CHANNELS.twitch);
            }
            if (!found && STREAM_CHANNELS.youtube) {
                found = await checkYoutubeLive(STREAM_CHANNELS.youtube);
            }
            if (!found && STREAM_CHANNELS.kick) {
                found = await checkKickLive(STREAM_CHANNELS.kick);
            }
        } catch {
            // mantieni cache precedente se la rete fallisce
            return;
        }

        externalLiveCache = found;
        if (lastLanyardData) {
            renderLiveBanner(resolveLiveStatus(lastLanyardData));
        } else if (found) {
            renderLiveBanner(found);
        } else if (!lastLanyardData) {
            renderLiveBanner(null);
        }
    }

    function setStatusRing(status) {
        statusRing.className = `discord-status-ring ${status || 'offline'}`;
        statusRing.title = statusLabel(status);
    }

    function setCardStatusClass(status) {
        card.classList.remove('status-idle', 'status-dnd', 'status-offline', 'spotify-theme', 'idle');
        if (status === 'idle') card.classList.add('status-idle');
        else if (status === 'dnd') card.classList.add('status-dnd');
        else if (status === 'offline') card.classList.add('status-offline');
    }

    function discordHandleText(user) {
        if (!user) return '@…';
        const name = user.username || 'user';
        if (user.discriminator && user.discriminator !== '0') {
            return `@${name}#${user.discriminator}`;
        }
        return `@${name}`;
    }

    function renderDiscordBadges(user) {
        if (!user) {
            discordBadges.innerHTML = `<span class="discord-badges-empty">${window.i18n.t('discord.badgesUnavailable')}</span>`;
            return;
        }

        const flags = Number(user.public_flags) || 0;
        const badges = PUBLIC_FLAG_BADGES.filter((b) => (flags & b.bit) === b.bit);

        if (user.avatar && user.avatar.startsWith('a_')) {
            badges.push({ slug: 'nitro', title: 'Nitro (avatar animato)' });
        }
        if (user.avatar_decoration_data) {
            badges.push({ slug: 'nitro', title: 'Nitro (decorazione avatar)' });
        }

        const unique = [];
        const seen = new Set();
        badges.forEach((b) => {
            if (seen.has(b.slug)) return;
            seen.add(b.slug);
            unique.push(b);
        });

        if (!unique.length) {
            discordBadges.innerHTML = `<span class="discord-badges-empty">${window.i18n.t('discord.noBadges')}</span>`;
            return;
        }

        discordBadges.innerHTML = unique.map((b) =>
            `<img src="${BADGE_CDN}/${escapeHtml(b.slug)}.svg" alt="${escapeHtml(b.title)}" title="${escapeHtml(b.title)}" loading="lazy" width="22" height="22">`
        ).join('');
    }

    function renderDiscordProfile(user) {
        if (!user) return;
        discordNameEl.textContent = user.global_name || user.username || 'Discord';
        discordHandle.textContent = discordHandleText(user);
        renderDiscordBadges(user);
    }

    function renderPresence(data) {
        if (!data) return;

        lanyardMissing = false;
        lanyardFetchFailed = false;
        lastLanyardData = data;
        updateLiveBanner(data);

        const status = data.discord_status || 'offline';
        const user = data.discord_user;
        const activities = data.activities || [];
        const custom = findActivity(activities, 4);
        const game = findActivity(activities, 0);
        const spotify = data.listening_to_spotify ? data.spotify : null;

        setStatusRing(status);
        setCardStatusClass(status);
        npLabel.textContent = statusLabel(status);

        if (user) {
            renderDiscordProfile(user);
            if (!pfpLockedByUser) {
                avatarImg.src = discordAvatarUrl(user);
                avatarImg.alt = user.global_name || user.username || 'Discord avatar';
            }
        }

        if (spotify) {
            card.classList.remove('idle');
            card.classList.add('spotify-theme');
            npGame.textContent = spotify.song || window.i18n.t('discord.listeningSpotify');
            npSub.textContent = [spotify.artist, spotify.album].filter(Boolean).join(' · ');
            setNpIcon(spotify.album_art_url, spotify.album);
            startElapsedTimer(spotify.timestamps?.start);
            return;
        }

        card.classList.remove('spotify-theme');

        const streaming = findActivity(activities, 1);
        if (streaming) {
            card.classList.remove('idle');
            npLabel.textContent = 'LIVE';
            npGame.textContent = streaming.details || streaming.state || streaming.name || window.i18n.t('live.streaming');
            npSub.textContent = [streaming.state, streaming.name].filter(Boolean)
                .filter((v) => v !== npGame.textContent).join(' · ');
            setNpIcon(activityImage(streaming), streaming.name);
            startElapsedTimer(streaming.timestamps?.start || streaming.created_at);
            return;
        }

        if (game) {
            card.classList.remove('idle');
            npGame.textContent = game.name || window.i18n.t('discord.playingGame');
            const details = [game.details, game.state].filter(Boolean).join(' — ');
            npSub.textContent = details;
            if (custom) {
                const customLine = customStatusText(custom).replace(/<[^>]+>/g, '').trim();
                if (customLine) npSub.textContent = (npSub.textContent ? npSub.textContent + ' · ' : '') + customLine;
            }
            setNpIcon(activityImage(game), game.name);
            startElapsedTimer(game.timestamps?.start || game.created_at);
            return;
        }

        if (custom) {
            card.classList.remove('idle');
            npGame.innerHTML = customStatusText(custom) || window.i18n.t('discord.customStatus');
            npSub.textContent = '';
            setNpIcon(null);
            startElapsedTimer(custom.created_at);
            npLabel.textContent = statusLabel(status) + window.i18n.t('discord.statusSuffix');
            return;
        }

        card.classList.add('idle');
        npGame.textContent = status === 'offline'
            ? window.i18n.t('discord.notOnDiscord')
            : window.i18n.t('discord.noActivity');
        npSub.textContent = custom ? customStatusText(custom).replace(/<[^>]+>/g, '') : '';
        setNpIcon(null);
        clearTimers();
        npElapsed.textContent = '';
    }

    function renderNotOnLanyard() {
        lanyardMissing = true;
        lastLanyardData = null;
        setStatusRing('offline');
        setCardStatusClass('offline');
        card.classList.add('idle');
        card.classList.remove('spotify-theme');
        npLabel.textContent = window.i18n.t('discord.lanyardLabel');
        npGame.textContent = window.i18n.t('discord.lanyardActivate');
        npSub.textContent = window.i18n.t('discord.lanyardInstall');
        npElapsed.textContent = '';
        setNpIcon(null);
        clearTimers();
        discordBadges.innerHTML = `<span class="discord-badges-empty">${window.i18n.t('discord.connectLanyardBadges')}</span>`;
        renderLiveBanner(externalLiveCache);
    }

    function handleLanyardPayload(payload) {
        if (payload?.discord_user) {
            renderPresence(payload);
        }
    }

    async function fetchInitial() {
        try {
            const res = await fetch(LANYARD_REST);
            const json = await res.json();
            if (!json.success) {
                renderNotOnLanyard();
                return;
            }
            handleLanyardPayload(json.data);
        } catch {
            lanyardFetchFailed = true;
            npGame.textContent = window.i18n.t('discord.lanyardError');
            npSub.textContent = window.i18n.t('discord.lanyardErrorSub');
        }
    }

    function connectWebSocket() {
        if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;

        clearInterval(heartbeatTimer);
        ws = new WebSocket(LANYARD_WS);

        ws.addEventListener('message', (event) => {
            let msg;
            try { msg = JSON.parse(event.data); } catch { return; }

            if (msg.op === 1) {
                reconnectDelay = 2000;
                clearInterval(heartbeatTimer);
                heartbeatTimer = setInterval(() => {
                    if (ws?.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ op: 3 }));
                    }
                }, msg.d.heartbeat_interval);

                ws.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_id: DISCORD_USER_ID }
                }));
                return;
            }

            if (msg.op === 0 && (msg.t === 'INIT' || msg.t === 'PRESENCE_UPDATE')) {
                handleLanyardPayload(msg.d);
            }
        });

        ws.addEventListener('close', () => {
            clearInterval(heartbeatTimer);
            ws = null;
            setTimeout(connectWebSocket, reconnectDelay);
            reconnectDelay = Math.min(reconnectDelay * 1.5, 30000);
        });

        ws.addEventListener('error', () => {
            ws?.close();
        });
    }

    fetchInitial();
    connectWebSocket();
    pollExternalStreams();
    setInterval(pollExternalStreams, 90000);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            fetchInitial();
            pollExternalStreams();
        }
    });

    window.addEventListener('langchange', () => {
        const label = discordToggle.querySelector('[data-i18n]');
        if (label) {
            const open = !discordExpand.hasAttribute('hidden');
            label.textContent = window.i18n.t(open ? 'discord.hideProfile' : 'discord.showProfile');
        }
        if (lastLanyardData) renderPresence(lastLanyardData);
        else if (lanyardMissing) renderNotOnLanyard();
        else if (lanyardFetchFailed) {
            npGame.textContent = window.i18n.t('discord.lanyardError');
            npSub.textContent = window.i18n.t('discord.lanyardErrorSub');
        } else {
            npGame.textContent = window.i18n.t('discord.connecting');
            if (externalLiveCache) renderLiveBanner(externalLiveCache);
        }
    });
})();

// --- Visitatori unici (Cloudflare Pages + KV) ---
(function () {
    // FIXATO L'ERRORE FATALE DI SINTASSI QUI:
    // Assicurati che questo URL sia corretto e che il Worker sia attivo su Cloudflare
    const API = 'https://visitor-counter.mikimiki-dm68.workers.dev';
    const POLL_MS = 2000;
    const STORAGE_KEY = 'site_visitor_id';

    const cardEl = document.getElementById('visitorLive');
    const countEl = document.getElementById('visitorCount');
    const subEl = document.getElementById('visitorSub');
    const badgeEl = document.getElementById('visitorBadge');

    let lastTotal = null;
    let lastLive = true;
    let lastError = null;
    let registerSent = false;
    let pollTimer = null;

    function getVisitorId() {
        let id = localStorage.getItem(STORAGE_KEY);
        if (!id) {
            id = (crypto.randomUUID && crypto.randomUUID()) ||
                `v-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
            localStorage.setItem(STORAGE_KEY, id);
        }
        return id;
    }

    function visitorLabel(total) {
        return total === 1
            ? window.i18n.t('visitor.labelOne')
            : window.i18n.t('visitor.labelMany', { count: total.toLocaleString(window.i18n.locale()) });
    }

    function showError(messageKey) {
        lastError = messageKey;
        cardEl.classList.add('offline');
        badgeEl.textContent = window.i18n.t('visitor.badgeOffline');
        subEl.textContent = window.i18n.t(messageKey);
    }

    function renderCount(total, live) {
        const safeTotal = Number.isFinite(total) ? Math.max(0, total) : 0;
        const changed = lastTotal !== null && lastTotal !== safeTotal;
        lastTotal = safeTotal;
        lastLive = live;
        lastError = null;

        countEl.textContent = String(safeTotal);
        subEl.textContent = visitorLabel(safeTotal);

        if (changed) {
            countEl.classList.remove('count-bump');
            void countEl.offsetWidth;
            countEl.classList.add('count-bump');
        }

        cardEl.classList.toggle('offline', !live);
        badgeEl.textContent = live ? window.i18n.t('visitor.badgeLive') : window.i18n.t('visitor.badgeSetup');
    }

    async function readApi(res) {
        const type = res.headers.get('content-type') || '';
        if (!type.includes('application/json')) {
            throw new Error('api_missing');
        }
        return res.json();
    }

    async function diagnoseApi() {
        try {
            const health = await fetch('/api/health', { cache: 'no-store' });
            const type = health.headers.get('content-type') || '';
            return type.includes('application/json');
        } catch {
            return false;
        }
    }

    async function registerVisit() {
        if (registerSent) return;
        registerSent = true;

        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ visitorId: getVisitorId() }),
                keepalive: true
            });
            const data = await readApi(res);
            if (!res.ok) throw new Error('register_failed');
            if (data.configured === false) {
                renderCount(0, false);
                showError('visitor.error.kv');
                return;
            }
            renderCount(data.total, true);
        } catch (err) {
            if (err.message === 'api_missing') {
                const ok = await diagnoseApi();
                showError(ok ? 'visitor.error.apiOk' : 'visitor.error.deploy');
            }
        }
    }

    async function fetchCount() {
        try {
            const res = await fetch(API, { cache: 'no-store' });
            const data = await readApi(res);
            if (!res.ok) throw new Error('fetch_failed');
            if (data.configured === false) {
                renderCount(0, false);
                showError('visitor.error.kvBinding');
                return;
            }
            renderCount(data.total, true);
        } catch (err) {
            if (err.message === 'api_missing') {
                const ok = await diagnoseApi();
                showError(ok ? 'visitor.error.apiActive' : 'visitor.error.apiInactive');
            } else {
                showError('visitor.error.unavailable');
            }
        }
    }

    function startPolling() {
        clearInterval(pollTimer);
        pollTimer = setInterval(fetchCount, POLL_MS);
    }

    registerVisit().then(() => {
        fetchCount();
        startPolling();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') fetchCount();
    });

    window.addEventListener('langchange', () => {
        if (lastError) {
            badgeEl.textContent = window.i18n.t('visitor.badgeOffline');
            subEl.textContent = window.i18n.t(lastError);
        } else if (lastTotal !== null) {
            renderCount(lastTotal, lastLive);
        }
    });
})();



// --- Ko-fi Alert Modal Logic ---
(function() {
    const kofiLink = document.getElementById('kofiLink');
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertClose = document.getElementById('customAlertClose');

    if (kofiLink && customAlert && customAlertMessage && customAlertClose) {
        kofiLink.addEventListener('click', (e) => {
            e.preventDefault();
            customAlertMessage.textContent = window.i18n.t('social.kofi.warning');
            customAlert.classList.remove('hidden');
        });

        const closeAlert = () => {
            customAlert.classList.add('hidden');
        };

        customAlertClose.addEventListener('click', closeAlert);
        const customAlertVisit = document.getElementById('customAlertVisit');
        if (customAlertVisit) {
            customAlertVisit.addEventListener('click', closeAlert);
        }
        customAlert.addEventListener('click', (e) => {
            if (e.target === customAlert) closeAlert();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !customAlert.classList.contains('hidden')) closeAlert();
        });
    }
})();

// --- Guida rapida (5 step) ---
(function () {
    const STORAGE_KEY = 'tutorial_completed';
    const STEP_KEYS = [
        { title: 'tutorial.step1.title', body: 'tutorial.step1.body', highlights: [] },
        { title: 'tutorial.step2.title', body: 'tutorial.step2.body', highlights: ['#langSelector'], showLangPick: true, openLangMenu: true },
        { title: 'tutorial.step3.title', body: 'tutorial.step3.body', highlights: ['.volume-container', '.music-player'] },
        { title: 'tutorial.step4.title', body: 'tutorial.step4.body', highlights: ['#nowPlaying', '#visitorLive'] },
        { title: 'tutorial.step5.title', body: 'tutorial.step5.body', highlights: ['#avatarWrapper', '.social-links'] }
    ];

    const modal     = document.getElementById('tutorialModal');
    const stepLabel = document.getElementById('tutorialStepLabel');
    const titleEl   = document.getElementById('tutorialTitle');
    const bodyEl    = document.getElementById('tutorialBody');
    const langPick  = document.getElementById('tutorialLangPick');
    const dotsEl    = document.getElementById('tutorialDots');
    const btnBack   = document.getElementById('tutorialBack');
    const btnNext   = document.getElementById('tutorialNext');
    const btnSkip   = document.getElementById('tutorialSkip');
    const helpBtn   = document.getElementById('tutorialHelpBtn');
    const topTools  = document.querySelector('.top-left-tools');

    let currentStep = 0;
    let highlighted = [];

    dotsEl.innerHTML = STEP_KEYS.map((_, i) =>
        `<span class="tutorial-dot${i === 0 ? ' active' : ''}"></span>`
    ).join('');

    function clearHighlights() {
        highlighted.forEach(el => el.classList.remove('tutorial-highlight'));
        highlighted = [];
    }

    function applyHighlights(selectors) {
        clearHighlights();
        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (el && !el.hidden) {
                el.classList.add('tutorial-highlight');
                highlighted.push(el);
            }
        });
    }

    function renderStep(index) {
        currentStep = index;
        const step = STEP_KEYS[index];
        stepLabel.textContent = window.i18n.t('tutorial.step', { n: index + 1, total: STEP_KEYS.length });
        titleEl.textContent = window.i18n.t(step.title);
        bodyEl.textContent = window.i18n.t(step.body);
        btnBack.classList.toggle('hidden', index === 0);
        btnNext.textContent = index === STEP_KEYS.length - 1
            ? window.i18n.t('tutorial.finish')
            : window.i18n.t('tutorial.next');
        dotsEl.querySelectorAll('.tutorial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        langPick.classList.toggle('visible', !!step.showLangPick);
        if (topTools) topTools.classList.toggle('lang-step-active', !!step.showLangPick);
        if (step.showLangPick) window.i18n.syncLangUI();
        if (step.openLangMenu) window.i18n.setLangMenuOpen(true);
        else window.i18n.setLangMenuOpen(false);
        applyHighlights(step.highlights);
    }

    function openTutorial(fromStart) {
        renderStep(fromStart ? 0 : currentStep);
        modal.classList.remove('hidden');
    }

    function closeTutorial(markDone) {
        modal.classList.add('hidden');
        clearHighlights();
        langPick.classList.remove('visible');
        if (topTools) topTools.classList.remove('lang-step-active');
        window.i18n.setLangMenuOpen(false);
        if (markDone) localStorage.setItem(STORAGE_KEY, '1');
    }

    btnNext.addEventListener('click', () => {
        if (currentStep < STEP_KEYS.length - 1) {
            renderStep(currentStep + 1);
        } else {
            closeTutorial(true);
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 0) renderStep(currentStep - 1);
    });

    btnSkip.addEventListener('click', () => closeTutorial(true));

    helpBtn.addEventListener('click', () => openTutorial(true));

    window.addEventListener('langchange', () => {
        if (!modal.classList.contains('hidden')) renderStep(currentStep);
    });

    window.showTutorialIfNeeded = function () {
        helpBtn.classList.add('visible');
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTimeout(() => openTutorial(true), 700);
        }
    };
})();

// --- Mostra/Nascondi UI Logic ---
(function() {
    const hideUiBtn = document.getElementById('hideUiBtn');
    const blurCard = document.querySelector('.blur-card');
    const eyeOpenIcon = document.getElementById('eyeOpenIcon');
    const eyeClosedIcon = document.getElementById('eyeClosedIcon');
    
    let isUiHidden = false;

    if (hideUiBtn && blurCard) {
        hideUiBtn.addEventListener('click', () => {
            isUiHidden = !isUiHidden;
            
            if (isUiHidden) {
                blurCard.classList.add('hidden-ui');
                eyeOpenIcon.style.display = 'none';
                eyeClosedIcon.style.display = 'block';
            } else {
                blurCard.classList.remove('hidden-ui');
                eyeOpenIcon.style.display = 'block';
                eyeClosedIcon.style.display = 'none';
            }
        });
    }
})();
