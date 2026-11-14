import { MapEmbed } from './MapEmbed.jsx'

/**
 * Convert a post title to a URL-safe slug ("dashed title").
 * Lowercases, strips punctuation, collapses whitespace to single dashes.
 * @param {string} s
 * @returns {string}
 */
export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** @type {Array<{
 *   title: string,
 *   slug: string,
 *   description: string,
 *   date: string,
 *   excerpt: string,
 *   mapParams: string,
 *   Body: () => JSX.Element,
 * }>} */
const RAW_POSTS = [
  {
    title: 'Hinduism: A Religion of Essentially Two Countries',
    description:
      'Hinduism has about 1.2 billion adherents — the third-largest religion in the world — but is the majority faith in only India, Nepal, and arguably Mauritius. Compare that to Christianity or Islam on the map.',
    date: '2026-05-26',
    excerpt:
      'Hinduism is the third-largest religion in the world, with around 1.2 billion adherents. So how is it the majority faith of essentially two countries? The geographic concentration tells a story about how religions do and do not spread.',
    mapParams: 'r=Hd',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Hinduism is the world&apos;s third-largest religion, with
          roughly 1.2 billion adherents — comparable in raw numbers to
          all of Catholicism. And yet on a map of majority religion by
          country, Hinduism appears in only two clearly Hindu-majority
          places (India and Nepal) plus the small island state of
          Mauritius. The contrast with Christianity or Islam — each the
          majority in dozens of countries — is striking, and revealing.
        </p>
        <MapEmbed
          params="r=Hd"
          title="Countries where Hinduism is the majority religion"
        />
        <h2>The two and a half Hindu-majority countries</h2>
        <ul>
          <li>
            <strong>India</strong> — about 79.8% Hindu (~1.1 billion
            people). The home of Hinduism and the source of essentially
            all the world&apos;s Hindus by absolute number.
          </li>
          <li>
            <strong>Nepal</strong> — about 81% Hindu. The world&apos;s
            only country that was officially a Hindu state until 2008,
            when it became a secular republic.
          </li>
          <li>
            <strong>Mauritius</strong> — about 48% Hindu, a legacy of
            19th-century Indian indentured labor brought by the British
            after the abolition of slavery. The plurality, just under a
            majority.
          </li>
        </ul>
        <h2>Where Hindus live as minorities</h2>
        <p>
          Beyond the two-and-a-half majority countries, significant
          Hindu populations exist as minorities in:
        </p>
        <ul>
          <li>
            <strong>Bangladesh</strong> — about 8% (~13 million people)
            despite being the world&apos;s third-largest Muslim country.
          </li>
          <li>
            <strong>Sri Lanka</strong> — about 12%, primarily the Tamil
            community in the north and east.
          </li>
          <li>
            <strong>Indonesia</strong> — about 1.7% nationally, but the
            island of <em>Bali</em> is roughly 87% Hindu — the only
            Hindu-majority province in Southeast Asia, a survival from
            the pre-Islamic Hindu kingdoms that once dominated the
            archipelago.
          </li>
          <li>
            <strong>The Caribbean (Trinidad, Guyana, Suriname)</strong>{' '}
            — descendants of indentured laborers brought from India in
            the 1800s; in each case 18–25% Hindu.
          </li>
          <li>
            <strong>Fiji</strong> — about 28%, also a legacy of Indian
            indenture.
          </li>
        </ul>
        <h2>Why didn&apos;t Hinduism spread further?</h2>
        <p>
          Three reasons stand out. First, Hinduism never developed an
          organized missionary tradition the way Christianity and Islam
          did. There is no equivalent of evangelism or
          <em> da&apos;wah</em> — no doctrinal injunction to convert
          others. Second, classical Hinduism is closely tied to caste,
          which is inherited at birth, not joined. For most of history a
          person was simply <em>born</em> Hindu rather than recruited.
          Third, the geography of Hindu kingdoms was always the South
          Asian subcontinent — they did not pursue overseas conquest,
          and most foreign conquerors of India (Muslims, then British)
          actively promoted other faiths.
        </p>
        <h2>The Buddhist contrast</h2>
        <p>
          Buddhism is a useful counterpoint. Both religions originated
          in roughly the same place at roughly the same time. Buddhism
          actively missionized and spread across most of Asia (see our{' '}
          <a href="/blog/where-buddhism-is-the-majority-religion">
            Buddhism post
          </a>
          ); Hinduism did not. The result: Buddhism is the majority
          religion of several countries thousands of kilometers from
          India, while Hinduism remains concentrated within South Asia.
          Same starting point, very different geographic outcomes.
        </p>
        <h2>Hindu civilization vs Hindu religion</h2>
        <p>
          The map of religion understates Hindu cultural influence.
          Almost all of mainland Southeast Asia — Thailand, Cambodia,
          Vietnam, Burma — was Hindu or Hindu-Buddhist before Buddhism
          and Islam took over. The temple complex at Angkor Wat is a
          Vishnu temple. Thai royal ceremonies still incorporate
          Brahmin priests. The Indonesian national airline is named
          Garuda after the mount of Vishnu. Hindu religion contracted;
          Hindu civilizational influence quietly persists across a much
          wider region than the religion overlay would suggest.
        </p>
        <h2>What the modern map remembers</h2>
        <p>
          Looking at the map you can almost trace the boundary of the
          historical subcontinent. The remaining Hindu population is
          either in South Asia or in places British colonialism moved
          Indians to in the 19th century. It is a religion that did not
          export itself by conviction but was occasionally exported by
          ship — and the map shows exactly where.
        </p>
      </>
    ),
  },

  {
    title: 'The Persian Empire: Three Different Empires by the Same Name',
    description:
      'When historians say "the Persian Empire," they could mean any of three: Achaemenid, Parthian, or Sasanian. Each ruled roughly the same Iranian heartland — but their reach, rivals, and legacies were very different.',
    date: '2026-05-26',
    excerpt:
      'The Persian Empire is shorthand for at least three distinct empires across 1200 years. The single overlay shows their shared heartland — but flattens what made each one distinct.',
    mapParams: 'e=Pe',
    Body: () => (
      <>
        <p className="blog-post__lead">
          When someone says &quot;the Persian Empire,&quot; ask which
          one. There were at least three major ones across more than a
          millennium — Achaemenid, Parthian, and Sasanian — each
          ruling roughly the same Iranian plateau core but with very
          different reaches, rivalries, and contributions. The single
          empire overlay on the map captures their shared heartland;
          what follows is what it flattens.
        </p>
        <MapEmbed
          params="e=Pe"
          title="The Persian Empire heartland"
        />
        <h2>1. The Achaemenid (c. 550–330 BCE) — the original</h2>
        <p>
          Founded by Cyrus the Great around 550 BCE and consolidated by
          Darius I, the Achaemenid Empire is the one most people picture
          when they say &quot;Persian.&quot; At its peak it stretched
          from the Balkans and Egypt in the west to the Indus river in
          the east — roughly 5.5 million square kilometers and an
          estimated 50 million people, about 44% of the world&apos;s
          total population at the time. By that measure it was the
          largest empire the world had yet seen.
        </p>
        <p>
          The Achaemenids invented several things modern states still
          rely on: a road network with relay messengers (the Royal
          Road), a coined silver currency (the daric), a postal system,
          and a bureaucracy that ran in multiple languages. They also
          pioneered a relatively tolerant model of imperial rule,
          allowing conquered peoples to keep their religions and local
          customs in exchange for tribute. The empire ended abruptly in
          330 BCE when Alexander the Great defeated Darius III.
        </p>
        <h2>2. The Parthian (247 BCE – 224 CE) — Rome&apos;s rival</h2>
        <p>
          After Alexander, the Seleucid Greeks held the area for a
          century until a steppe people called the Parni founded the
          Parthian Empire in 247 BCE. The Parthians ruled for nearly
          five hundred years and became Rome&apos;s permanent rival on
          its eastern frontier. At the Battle of Carrhae in 53 BCE,
          Parthian horse archers annihilated a Roman army of 35,000 —
          one of the worst defeats in Roman military history.
        </p>
        <p>
          The Parthians spoke an Iranian language but largely preserved
          Greek as an administrative language and adopted Hellenistic
          culture. Their empire was a confederation rather than a
          tightly centralized state, which made it harder for outsiders
          to defeat permanently — every Roman emperor who tried, from
          Crassus onward, came home with less than they started.
        </p>
        <h2>3. The Sasanian (224–651 CE) — the last pre-Islamic Persia</h2>
        <p>
          The Sasanians overthrew the Parthians in 224 CE and reasserted
          Persian identity over Greek influence. They formalized
          Zoroastrianism as the state religion, codified Middle Persian
          as the administrative language, and continued the Roman
          rivalry with such intensity that the centuries-long Roman–
          Sasanian wars exhausted both empires and arguably set the
          stage for the Islamic conquests that ended them both.
        </p>
        <p>
          The Sasanian Empire fell in 651 CE to the Rashidun Caliphate
          (see our{' '}
          <a href="/blog/five-great-islamic-empires-compared-on-the-map">
            Islamic empires post
          </a>
          ) in one of the fastest collapses of a major empire in history
          — just twenty years from first Arab contact to total
          conquest.
        </p>
        <h2>What the three empires share</h2>
        <ul>
          <li>
            <strong>The same heartland.</strong> All three were centered
            on the Iranian plateau (modern Iran), with capitals at Susa,
            Persepolis, Ctesiphon, or Pasargadae depending on the era.
          </li>
          <li>
            <strong>A common rival.</strong> Greek city-states fought
            the Achaemenids; Rome fought the Parthians and Sasanians.
            For roughly 700 years there was a single great east–west
            fault line on the map, with Persia on one side.
          </li>
          <li>
            <strong>A multi-ethnic governing model.</strong> Each ruled
            dozens of peoples and integrated them through provincial
            governors (satraps), tax bureaucracy, and tolerance of local
            religions — well ahead of European feudal practice.
          </li>
          <li>
            <strong>An influence that outlasted the politics.</strong>{' '}
            Persian administrative vocabulary, art, gardens, and poetry
            later shaped the Islamic caliphates that conquered them —
            and through them, the Ottoman and Mughal worlds.
          </li>
        </ul>
        <h2>What the single overlay flattens</h2>
        <p>
          The map shows roughly the maximum extent reached at any point
          — a useful starting frame, but one that combines three
          different political worlds. The Achaemenid empire reached the
          Balkans and Egypt; the Parthians did not. The Sasanians lost
          Egypt for good but pushed deeper into Central Asia. Toggle the
          Roman and Byzantine empires alongside this one and the western
          half of the map tells a complementary story: for most of
          antiquity, Persia and Rome together defined the political
          geography from the Atlantic to the Indus.
        </p>
        <h2>What the modern map remembers</h2>
        <p>
          Iran today occupies the same plateau, with borders that
          approximate the Persian core throughout all three empires.
          Persian (Farsi) is the official language of Iran, Afghanistan
          (as Dari), and Tajikistan — a linguistic footprint that
          quietly echoes the empires across roughly the same geographic
          band. The empire ended in 651; the cultural sphere is still on
          the map.
        </p>
      </>
    ),
  },

  {
    title: 'The French Empire and the Francophone World Today',
    description:
      'The French Empire was scattered across four continents. Today French is the official language of 29 countries — most of them in Africa. The map links the two more cleanly than you might expect.',
    date: '2026-05-26',
    excerpt:
      'The French Empire never controlled territory as concentrated as the Spanish in Latin America or the British in India. But it left behind the second most geographically widespread official language in the world.',
    mapParams: 'e=Fc&l=Fr',
    Body: () => (
      <>
        <p className="blog-post__lead">
          At its 1920s peak the French colonial empire was the second-
          largest in the world — about 13 million square kilometers,
          behind only Britain. Today French is the official or
          co-official language of 29 countries on four continents.
          Overlay the empire with the modern language and the connection
          becomes obvious — with a handful of revealing exceptions.
        </p>
        <MapEmbed
          params="e=Fc&l=Fr"
          title="French Empire combined with French-speaking countries today"
        />
        <h2>The empire on its own</h2>
        <p>
          France&apos;s overseas reach came in two waves. The first
          colonial empire (1500s–1814) was centered on the Americas and
          India — most of it lost to Britain or the independence wars.
          The second empire (1830–1962) was almost entirely African plus
          Indochina, and it is this later footprint that left the
          deepest linguistic legacy.
        </p>
        <MapEmbed params="e=Fc" title="French Empire at its peak" />
        <h2>The language on its own</h2>
        <p>
          Today French is an official language of 29 countries — second
          only to English. Roughly 320 million people speak it as a
          first or working language, and the number is growing rapidly
          because most of the Francophone population now lives in
          sub-Saharan Africa — the world&apos;s fastest-growing region.
        </p>
        <MapEmbed params="l=Fr" title="Countries where French is official today" />
        <h2>Africa carries the legacy</h2>
        <p>
          Of the 29 official-French countries, 21 are in Africa — a
          near-continuous band running from Senegal across the Sahel
          through Central Africa to Madagascar and Djibouti. In most of
          these countries French is not the most-spoken language at home
          — that is usually a local lingua franca like Wolof, Bambara,
          or Lingala — but it is the language of government, higher
          education, and inter-ethnic communication.
        </p>
        <h2>The notable exceptions and surprises</h2>
        <ul>
          <li>
            <strong>Quebec and Acadia.</strong> The only large French-
            speaking population in North America survived 250+ years of
            English rule after the French lost Canada in 1763.
          </li>
          <li>
            <strong>Haiti.</strong> The first independent Black republic
            (1804) kept French as an official language alongside Haitian
            Creole.
          </li>
          <li>
            <strong>Switzerland and Belgium.</strong> Both list French
            as an official language despite never having been part of
            the French Empire — these are pre-colonial linguistic
            regions, not colonial legacies.
          </li>
          <li>
            <strong>Vietnam, Cambodia, Laos.</strong> All three were
            French Indochina until 1954, but French is no longer
            official in any of them — Vietnamese, Khmer, and Lao
            replaced it almost entirely.
          </li>
          <li>
            <strong>Algeria.</strong> French is widely used in business
            and education but is officially repudiated — Arabic and
            Tamazight are the constitutional languages.
          </li>
        </ul>
        <h2>How the pattern compares to Spain and Britain</h2>
        <p>
          The French case sits between the Spanish and British patterns.
          Spanish tracks its empire almost one-to-one — 21 Spanish-
          speaking countries, almost all former colonies (see our{' '}
          <a href="/blog/the-spanish-empire-and-the-spanish-speaking-world-today">
            Spanish Empire post
          </a>
          ). English is much more diffuse — official in 50+ countries,
          many of which speak it as a working second language rather
          than a true native one. French sits closer to the English
          pattern: official across a wide band of African countries
          where it serves as a unifying administrative language rather
          than the dominant mother tongue.
        </p>
        <h2>Why the language outlasted the empire</h2>
        <p>
          France actively cultivated a post-colonial linguistic
          community — La Francophonie, founded in 1970 — that today has
          88 member states and governments. Combined with
          French-language schools, media, and African higher education
          still operating largely in French, the map you see above is
          closer to a coordinated institutional project than a passive
          colonial residue.
        </p>
      </>
    ),
  },

  {
    title: 'Five Great Islamic Empires Compared on the Map',
    description:
      'From the Rashidun caliphate to the Mughals, five Islamic empires shaped 1400 years of history across three continents. Mapped together, the patterns and surprises become obvious.',
    date: '2026-05-26',
    excerpt:
      'Islamic political history is not one empire but at least five great ones — separated by centuries, capitals, and continents. See how Rashidun, Umayyad, Abbasid, Ottoman, and Mughal territory compares on a single map.',
    mapParams: 'e=Ra,Um,Ab,Ot,Mg',
    Body: () => (
      <>
        <p className="blog-post__lead">
          When people say &quot;the Islamic Empire,&quot; they are usually
          collapsing fourteen centuries of distinct political states into
          one phrase. In reality there were many — and at least five
          stand out for their scale, longevity, or cultural impact. Put
          them all on one map and the differences become instantly
          legible.
        </p>
        <MapEmbed
          params="e=Ra,Um,Ab,Ot,Mg"
          title="Five major Islamic empires combined"
        />
        <h2>The five at a glance</h2>
        <ul>
          <li>
            <strong>Rashidun Caliphate</strong> (632–661) — the first 30
            years after Muhammad ﷺ; capital at Medina then Kufa.
          </li>
          <li>
            <strong>Umayyad Caliphate</strong> (661–750) — capital at
            Damascus; reached from Spain to the Indus.
          </li>
          <li>
            <strong>Abbasid Caliphate</strong> (750–1258) — capital at
            Baghdad; the Islamic Golden Age.
          </li>
          <li>
            <strong>Ottoman Empire</strong> (1299–1922) — capital at
            Constantinople / Istanbul; lasted 623 years.
          </li>
          <li>
            <strong>Mughal Empire</strong> (1526–1857) — capital at Delhi
            and Agra; ruled most of the Indian subcontinent.
          </li>
        </ul>

        <h2>1. Rashidun — the founding generation</h2>
        <p>
          Tiny in duration but enormous in significance, the Rashidun
          (&quot;Rightly Guided&quot;) caliphs ruled for just 29 years
          after Muhammad ﷺ&apos;s death in 632. In that single generation
          their armies took the entire Arabian peninsula, the whole of
          Sasanian Persia, and the southern half of the Byzantine Empire
          (Syria, Palestine, Egypt). Few empires in history have expanded
          so fast.
        </p>
        <MapEmbed params="e=Ra" title="Rashidun Caliphate" />
        <p>
          The map shows a compact, predominantly Arabian and Levantine
          footprint. North Africa west of Egypt and the Iberian peninsula
          had not yet been touched.
        </p>

        <h2>2. Umayyad — the great expansion</h2>
        <p>
          The Umayyads moved the capital from Medina to Damascus and turned
          the caliphate into a true world empire. At their peak in the
          early 700s they ruled from the Atlantic coast of Morocco and
          most of the Iberian peninsula (al-Andalus) all the way east to
          the Indus river in modern Pakistan — roughly 11 million square
          kilometers, briefly the largest empire the world had yet seen.
        </p>
        <MapEmbed params="e=Um" title="Umayyad Caliphate at its peak" />
        <p>
          Two things jump out on the map: the Mediterranean has become an
          Islamic-majority sea on three of its four sides, and the empire
          stretches across a single contiguous band — North Africa is the
          land bridge holding Spain and the Middle East together.
        </p>

        <h2>3. Abbasid — the golden-age plateau</h2>
        <p>
          The Abbasids overthrew the Umayyads in 750 and shifted the
          center of gravity east, founding Baghdad as the new capital.
          Iberia broke away almost immediately (becoming the independent
          Emirate of Córdoba) and over the following centuries the
          Abbasids gradually lost direct control of North Africa, Egypt,
          and parts of the east. But for roughly 200 years Baghdad was
          the largest city in the world and the center of the Islamic
          Golden Age of science, medicine, and philosophy.
        </p>
        <MapEmbed params="e=Ab" title="Abbasid Caliphate" />
        <p>
          The map captures the Abbasid heartland: Mesopotamia, the Levant,
          Persia, Khorasan, and parts of Central Asia and the Caucasus.
          The empire lasted until the Mongol sack of Baghdad in 1258 — a
          political ending so abrupt it ranks among the great historical
          ruptures.
        </p>

        <h2>4. Ottoman — the longest-lived</h2>
        <p>
          Founded around 1299 in northwestern Anatolia, the Ottoman
          Empire outlasted every other Islamic empire by centuries. Its
          1453 capture of Constantinople ended the Byzantine Empire and
          gave the Ottomans an imperial capital they would hold for 469
          years. At their peak under Suleiman the Magnificent in the
          1500s they ruled three continents: southeastern Europe up to
          the gates of Vienna, all of Anatolia and the Levant, the
          Arabian peninsula, Egypt, and the North African coast.
        </p>
        <MapEmbed params="e=Ot" title="Ottoman Empire" />
        <p>
          The Ottoman map highlights a key contrast with earlier
          caliphates: they pushed deep into <em>Europe</em> rather than
          into Persia or Central Asia. The Balkans, Hungary, and southern
          Ukraine were Ottoman provinces for centuries.
        </p>

        <h2>5. Mughal — the Indian dynasty</h2>
        <p>
          Of these five, the Mughals are the geographic outlier. Founded
          by Babur in 1526 — a descendant of both Timur and Genghis Khan
          — the empire was based in northern India and at its peak under
          Aurangzeb (late 1600s) ruled almost the entire subcontinent.
          The Mughals built the Taj Mahal, the Red Fort, and a Persian-
          influenced court culture that still shapes South Asian art,
          food, and architecture.
        </p>
        <MapEmbed params="e=Mg" title="Mughal Empire" />
        <p>
          Notice the map: unlike the Arab-led caliphates, the Mughal
          footprint sits entirely east of Persia. It is the only empire
          on this list that does not include any Arab territory.
        </p>

        <h2>Patterns across the five</h2>
        <ul>
          <li>
            <strong>Three different center of gravity.</strong> Rashidun
            and Umayyad were Arab-centered (Medina, Damascus). Abbasid
            shifted to Iraq (Baghdad). Ottoman to Anatolia (Istanbul).
            Mughal to South Asia (Delhi). Each move reflects who was
            ruling, not just where.
          </li>
          <li>
            <strong>None of them ruled all Muslim land at once.</strong>{' '}
            By the time the Abbasids took over, Iberia had already broken
            away. The Ottoman and Mughal empires were contemporaries — for
            300+ years there were two parallel Sunni Muslim empires, each
            with its own emperor, neither subordinate to the other.
          </li>
          <li>
            <strong>The Mediterranean did not stay Islamic forever.</strong>{' '}
            Compare the Umayyad map with the Ottoman one: Spain and Sicily
            are gone, but Greece, the Balkans, and Hungary appear.
          </li>
          <li>
            <strong>Longevity does not equal cultural impact.</strong> The
            Rashidun lasted 29 years and reshaped a quarter of the
            inhabited world. The Ottomans lasted 623 years and left
            arguably less religious doctrine but vastly more
            administrative legacy.
          </li>
        </ul>

        <h2>What the maps deliberately flatten</h2>
        <p>
          Empire-shaped maps are useful for seeing reach and rivalry, but
          they hide internal diversity. Most of these empires ruled large
          non-Muslim populations — Christians, Jews, Zoroastrians, Hindus
          — through systems of religious autonomy
          (<em>millets</em>, the <em>dhimma</em> framework, Mughal
          religious tolerance under Akbar). The colored block on the map
          says nothing about the millions of non-Muslims governed inside
          it. Treat the empire overlay as a starting point, not the whole
          story.
        </p>
      </>
    ),
  },

  {
    title: 'How the Mongol Empire Got So Big So Fast',
    description:
      'At its peak the Mongol Empire covered 24 million square kilometers — still the largest contiguous land empire in history. See it on a modern map and the scale becomes hard to dismiss.',
    date: '2026-05-26',
    excerpt:
      'A nomadic confederation from the Mongolian steppe assembled the largest contiguous land empire ever recorded — in roughly 70 years. The map makes the achievement legible.',
    mapParams: 'e=Mo',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Founded by Genghis Khan in 1206 and consolidated by his sons and
          grandsons, the Mongol Empire reached its peak by the 1270s. At
          its largest it stretched from the Sea of Japan to the
          Carpathian mountains in central Europe — roughly 24 million
          square kilometers, or about 16% of the world&apos;s total land
          area.
        </p>
        <MapEmbed
          params="e=Mo"
          title="Mongol Empire at its peak"
        />
        <h2>The numbers are extreme</h2>
        <p>
          To put 24 million square kilometers in context: that is bigger
          than modern Russia (17 million) plus modern India (3 million)
          plus modern Mexico (2 million) combined. Unlike the British
          Empire — also enormous, but a maritime patchwork — every
          Mongol-ruled territory was reachable on horseback from every
          other.
        </p>
        <h2>How did it expand so fast?</h2>
        <ul>
          <li>
            <strong>Cavalry, not infantry.</strong> Every Mongol soldier
            had multiple horses and could cover up to 100 km in a day —
            far faster than the agrarian armies they faced.
          </li>
          <li>
            <strong>Steppe logistics.</strong> The Eurasian grasslands
            run uninterrupted from Manchuria to Hungary, giving a horse
            army a natural highway with built-in fodder.
          </li>
          <li>
            <strong>Ruthless deterrence.</strong> Cities that surrendered
            were largely spared; those that resisted were destroyed. The
            reputation alone often did the work.
          </li>
          <li>
            <strong>Talent over birth.</strong> Genghis promoted by
            competence — defectors and conquered specialists ran much of
            the administration.
          </li>
        </ul>
        <h2>What the map hides</h2>
        <p>
          The unified empire lasted barely a generation. By 1271 it had
          split into four khanates — the Yuan Dynasty in China, the
          Chagatai in Central Asia, the Ilkhanate in Persia, and the
          Golden Horde in the Russian steppes — each functionally
          independent. The single-color empire shown on this map is a
          peak-period snapshot, not a 200-year condition.
        </p>
        <h2>The lasting legacy</h2>
        <p>
          The Mongol-enforced peace (<em>Pax Mongolica</em>) reopened the
          Silk Road and made overland trade between China and Europe
          safe for the first time in centuries. Marco Polo&apos;s
          journey, the transmission of paper and gunpowder west, and the
          eventual integration of Eurasian economies all trace back to
          the world this map depicts.
        </p>
      </>
    ),
  },

  {
    title: 'The Spanish Empire and the Spanish-Speaking World Today',
    description:
      'Spanish is the official language of 21 countries. Overlay them with the historical Spanish Empire and the connection is almost one-to-one — with a few revealing exceptions.',
    date: '2026-05-26',
    excerpt:
      'Few language maps trace a single empire as cleanly as Spanish does. Here is the empire, here is the language today, and here is what the overlap (and the gaps) reveal.',
    mapParams: 'e=Sp&l=Sp',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Spanish is spoken natively by roughly 500 million people across
          more than 20 countries on four continents. Almost every one of
          those countries was, at some point, part of the Spanish Empire.
          Layered on a single map, the empire and the modern language
          almost trace each other.
        </p>
        <MapEmbed
          params="e=Sp&l=Sp"
          title="Spanish Empire combined with Spanish-speaking countries today"
        />
        <h2>The empire on its own</h2>
        <p>
          The Spanish Empire grew rapidly after 1492 and at its 18th-
          century peak ruled most of the Americas from the southwestern
          United States down to Tierra del Fuego, plus the Philippines,
          parts of the East Indies, and footholds in North Africa.
        </p>
        <MapEmbed params="e=Sp" title="Spanish Empire at its peak" />
        <h2>The language on its own</h2>
        <p>
          Today Spanish is the official or co-official language of: Spain,
          Mexico, all of Central America except Belize, all of South
          America except Brazil and the Guianas, Cuba, the Dominican
          Republic, and Equatorial Guinea in Africa.
        </p>
        <MapEmbed params="l=Sp" title="Countries where Spanish is official today" />
        <h2>The revealing exceptions</h2>
        <ul>
          <li>
            <strong>The Philippines.</strong> Ruled by Spain for over
            three centuries, but English (under later US rule) and
            Filipino displaced Spanish as official languages. Spanish
            survives only in some loanwords and surnames.
          </li>
          <li>
            <strong>The American Southwest.</strong> California, Texas,
            New Mexico, Arizona — all Spanish territory before US
            annexation. Spanish is widely spoken there, but the US is
            officially English-only at the federal level.
          </li>
          <li>
            <strong>Equatorial Guinea.</strong> The lone Spanish-
            speaking country in sub-Saharan Africa — a small former
            colony that kept the language.
          </li>
          <li>
            <strong>Brazil.</strong> Surrounded on every land border by
            Spanish-speaking countries — but Portuguese, because of the
            1494 Treaty of Tordesillas dividing the New World between
            Spain and Portugal.
          </li>
        </ul>
        <h2>Why the match is so clean</h2>
        <p>
          Unlike the British Empire — which kept English as a working
          administrative language across very diverse colonies — the
          Spanish Empire pursued aggressive language and religious
          standardization for centuries. By the time the Latin American
          countries became independent in the early 1800s, Spanish was
          deeply rooted as the prestige and administrative language. The
          map you see today is what that policy produced.
        </p>
      </>
    ),
  },

  {
    title: 'The Byzantine Empire and the Other Half of Rome',
    description:
      'When the Western Roman Empire fell in 476 CE, the Eastern half kept going — for nearly another thousand years. See where it ruled and what borders it still echoes.',
    date: '2026-05-26',
    excerpt:
      'The Byzantine Empire is what happens when half of Rome refuses to fall. It outlasted its western counterpart by 977 years and quietly shaped most of Eastern Europe.',
    mapParams: 'e=Bz',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Most people think of the Roman Empire as ending in 476 CE.
          That date refers only to the Western half. The Eastern Roman
          Empire — what historians now call Byzantine — kept calling
          itself <em>Romaioi</em> (Romans) and ruled from
          Constantinople until 1453. That is nearly a millennium of
          continuous Roman political continuity that most school
          histories quietly skip.
        </p>
        <MapEmbed
          params="e=Bz"
          title="Byzantine Empire at its peak"
        />
        <h2>What you are looking at</h2>
        <p>
          The map shows roughly the empire&apos;s peak extent under
          Justinian in the 540s, when Byzantine armies briefly retook
          Italy, North Africa, and southern Spain in an ambitious attempt
          to restore the old Roman world. After Justinian the empire
          contracted steadily for the next 900 years.
        </p>
        <h2>Three things that distinguished it from the Roman west</h2>
        <ul>
          <li>
            <strong>Greek, not Latin.</strong> By the 7th century the
            empire had dropped Latin entirely and operated in Greek —
            the language of its eastern provinces and the New Testament.
          </li>
          <li>
            <strong>Orthodox, not Catholic.</strong> The 1054 Great
            Schism formalized the split between the Constantinople-
            centered Eastern Orthodox Church and the Rome-centered
            Catholic Church. The map of Orthodox Christianity today
            (Greece, Bulgaria, Romania, Serbia, Russia, Ukraine,
            Georgia) is largely a Byzantine-shaped map.
          </li>
          <li>
            <strong>Continuity of bureaucracy.</strong> The empire ran on
            a sophisticated paper-trail bureaucracy and a gold coin
            (the <em>solidus</em>) so reliable that it served as
            international currency for 700 years.
          </li>
        </ul>
        <h2>The 1000-year contraction</h2>
        <p>
          From Justinian&apos;s peak the empire lost Italy and Africa to
          rising powers, the Levant and Egypt to the early Islamic
          caliphates (see our{' '}
          <a href="/blog/five-great-islamic-empires-compared-on-the-map">
            Islamic empires post
          </a>
          ), and most of Anatolia to the Seljuks and later the Ottomans.
          By 1453 only Constantinople and a few nearby slivers remained.
          The Ottoman conquest that year is conventionally treated as
          the end of the Middle Ages.
        </p>
        <h2>Compare with the Roman overlay</h2>
        <p>
          Toggle the Roman Empire overlay alongside this one and you will
          see how cleanly the empires divided the Mediterranean: the
          Roman map dominates the western half, the Byzantine map the
          eastern. For centuries they were a single state. The map shows
          that even after the political split, the institutional shadow
          of Rome lived on along the eastern Mediterranean for a very
          long time.
        </p>
      </>
    ),
  },

  {
    title: 'Countries That Span Two Continents',
    description:
      'A handful of countries straddle continental boundaries — Russia, Turkey, Egypt, Kazakhstan, and more. See them all highlighted at once and the geography starts to feel less tidy.',
    date: '2026-05-26',
    excerpt:
      'Continental borders look neat in textbooks. In reality a handful of countries refuse to sit on one side, and they are some of the most strategically important places in the world.',
    mapParams: 'tcx=1',
    Body: () => (
      <>
        <p className="blog-post__lead">
          We teach continents as if they were discrete things. In
          practice, several countries have territory on more than one of
          them — and the list is more interesting than you might expect.
        </p>
        <MapEmbed
          params="tcx=1"
          title="Transcontinental countries highlighted"
        />
        <h2>The classic transcontinental cases</h2>
        <ul>
          <li>
            <strong>Russia</strong> — by far the biggest. About 23% of
            its land area is in Europe (west of the Urals), the rest in
            Asia. Most Russians live on the European side.
          </li>
          <li>
            <strong>Turkey</strong> — about 3% of its territory (Eastern
            Thrace, including the European side of Istanbul) is in
            Europe; the other 97% is Anatolia, in Asia. Yet Istanbul,
            the largest city, sits across both.
          </li>
          <li>
            <strong>Egypt</strong> — the Sinai peninsula lies in Asia,
            the rest of the country in Africa, divided by the Suez
            Canal.
          </li>
          <li>
            <strong>Kazakhstan</strong> — a small slice west of the Ural
            River is technically European; the rest is Central Asian.
          </li>
          <li>
            <strong>Azerbaijan and Georgia</strong> — the Caucasus is a
            contested continental boundary; both countries straddle it
            depending on the convention used.
          </li>
        </ul>
        <h2>The edge cases</h2>
        <ul>
          <li>
            <strong>Panama</strong> — North America by convention, but
            geologically South America begins right at its border with
            Colombia, and the country sits at the boundary.
          </li>
          <li>
            <strong>Indonesia</strong> — most of it is in Asia, but
            western New Guinea (the Indonesian half of the island) is
            geographically part of Oceania.
          </li>
          <li>
            <strong>France, Spain, the UK, the Netherlands, Denmark</strong>{' '}
            — all have overseas territories on other continents (French
            Guiana, Canary Islands, etc.). Whether that counts as
            transcontinental depends on your definition.
          </li>
        </ul>
        <h2>Why this matters more than a trivia answer</h2>
        <p>
          Transcontinental countries tend to sit on the most important
          chokepoints in world geography: Istanbul controls the Bosporus,
          the only sea route between the Black Sea and the
          Mediterranean. Egypt controls the Suez Canal. Panama controls
          the canal between the Atlantic and Pacific. Their dual
          identity is not an accident of map-drawing — it usually
          reflects centuries of being where two worlds meet.
        </p>
        <h2>The convention is fuzzy on purpose</h2>
        <p>
          There is no single authority that defines continent boundaries.
          The Ural mountains as the Europe / Asia divide is a 16th-
          century convention; the Caucasus boundary is even more
          contested. Treat the highlighted countries as the conventional
          list rather than a hard fact, and notice how many of the
          world&apos;s most influential places sit on the seam.
        </p>
      </>
    ),
  },

  {
    title: 'Where Buddhism Is the Majority Religion',
    description:
      'Buddhism originated in India but is barely practiced there today. Map the countries where it is now the dominant tradition and the geography tells a striking migration story.',
    date: '2026-05-26',
    excerpt:
      'Buddhism began in India around 500 BCE and is the majority religion of essentially none of South Asia today. So where did it go? The map gives a clean answer.',
    mapParams: 'r=Bd',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Buddhism was founded by Siddhartha Gautama in what is now
          northern India and southern Nepal roughly 2,500 years ago. It
          spread across most of Asia in the centuries that followed —
          and then, surprisingly, almost disappeared from the country of
          its birth. The map of Buddhist-majority countries today shows
          where it ended up sticking.
        </p>
        <MapEmbed
          params="r=Bd"
          title="Countries where Buddhism is the majority religion"
        />
        <h2>The Buddhist-majority countries</h2>
        <ul>
          <li>
            <strong>Mainland Southeast Asia</strong> — Thailand,
            Cambodia, Laos, and Myanmar are all over 80% Buddhist,
            mostly the Theravada school.
          </li>
          <li>
            <strong>Sri Lanka</strong> — about 70% Buddhist, also
            Theravada, one of the oldest continuous Buddhist
            traditions in the world.
          </li>
          <li>
            <strong>Bhutan</strong> — the only country in the world with
            Vajrayana (Tibetan) Buddhism as the official state
            religion.
          </li>
          <li>
            <strong>Mongolia</strong> — predominantly Tibetan Buddhist,
            despite its geographic and cultural distance from Tibet.
          </li>
        </ul>
        <h2>Where Buddhism is huge but not the majority</h2>
        <ul>
          <li>
            <strong>China</strong> — perhaps the largest Buddhist
            population in absolute terms, but most surveys classify
            China as predominantly &quot;folk religion / no religion,&quot;
            with Buddhism as one important strand among several.
          </li>
          <li>
            <strong>Japan</strong> — Buddhism and Shinto coexist, with
            most Japanese practicing elements of both rather than
            identifying exclusively with either.
          </li>
          <li>
            <strong>Korea and Vietnam</strong> — significant Buddhist
            traditions but officially classified as
            majority-Christian (South Korea) or majority-irreligious /
            folk (Vietnam) in modern surveys.
          </li>
        </ul>
        <h2>The India mystery</h2>
        <p>
          India today is less than 1% Buddhist. The decline took place
          gradually between roughly 500 and 1200 CE through a mix of
          Hindu philosophical revival, Muslim conquest of the major
          northern Buddhist centers (notably Nalanda University, destroyed
          in the 1190s), and the absorption of Buddhist practices into
          Hinduism. The 20th-century <em>Navayana</em> movement led by
          B. R. Ambedkar reintroduced Buddhism to parts of India, but it
          remains a small minority faith.
        </p>
        <h2>What the map gets right and wrong</h2>
        <p>
          Coloring countries by majority religion captures the obvious
          pattern (Theravada southeast Asia, Tibetan-Buddhist Himalayas
          and Mongolia) but flattens the most interesting place on the
          map. East Asia — China, Japan, Korea, Vietnam — is home to
          most of the world&apos;s Buddhists by raw number, but none of
          those countries shows up as Buddhist-majority. Use the map for
          the easy answer, then look past it to see where the religion
          actually lives.
        </p>
      </>
    ),
  },

  {
    title: 'Tracing the Roman Empire on a Modern Map',
    description:
      'See the full reach of Rome at its height — overlaid on the political borders of today — and notice which modern countries sat entirely inside its frontier.',
    date: '2026-05-25',
    excerpt:
      'Two thousand years on, the outline of Rome at its peak still maps onto the Mediterranean basin with surprising precision. Here is what jumps out when you put it on a modern world map.',
    mapParams: 'e=Ro',
    Body: () => (
      <>
        <p className="blog-post__lead">
          At its territorial peak under Trajan in 117 CE, the Roman Empire
          enclosed the entire Mediterranean — Romans called it{' '}
          <em>Mare Nostrum</em>, &quot;our sea.&quot; Drape that footprint
          over modern political borders and the geography of the empire
          stops feeling abstract.
        </p>
        <MapEmbed
          params="e=Ro"
          title="Roman Empire territory at its peak"
        />
        <h2>What the map shows</h2>
        <p>
          The highlighted regions are the provinces Rome administered at
          its largest extent: all of modern France, Spain, Portugal, Italy,
          Greece, Turkey, the Levant, Egypt, the Maghreb coast, and most
          of England and Wales. Notice how the empire stops cleanly at the
          Rhine and Danube — the rivers that defined Rome&apos;s northern
          frontier for centuries.
        </p>
        <h2>Surprises on a modern overlay</h2>
        <ul>
          <li>
            <strong>Romania kept the name</strong> — it is the only modern
            country whose name explicitly preserves the Roman identity,
            despite Dacia being one of the shorter-held provinces.
          </li>
          <li>
            <strong>Scotland was never Rome.</strong> Hadrian&apos;s Wall
            shows up clearly when you zoom into Britain — the empire never
            crossed it permanently.
          </li>
          <li>
            <strong>Germany and central Europe stay blank.</strong> The
            Roman world ended at the Rhine; the lands beyond were
            <em>Germania Magna</em>, never absorbed.
          </li>
        </ul>
        <h2>Try it yourself</h2>
        <p>
          Click any country in the embed above to see its Roman-era
          province name. Toggle on additional empires from the sidebar to
          compare reach — the Roman footprint is striking next to the
          Ottoman or Byzantine successor states that later occupied parts
          of the same ground.
        </p>
      </>
    ),
  },

  {
    title: 'Why Some Countries Drive on the Left',
    description:
      'About one in three countries drives on the left. The pattern on a world map is not random — it traces the reach of one empire more than anything else.',
    date: '2026-05-25',
    excerpt:
      'Roughly 70 countries — about a third of the world — keep traffic on the left. Map them all at once and a clear historical pattern emerges.',
    mapParams: 't=lht',
    Body: () => (
      <>
        <p className="blog-post__lead">
          Why does the UK drive on the left while continental Europe drives
          on the right? Why does Japan share the British convention but
          Korea does not? The world map of left-hand traffic answers most
          of these questions at a glance.
        </p>
        <MapEmbed
          params="t=lht"
          title="Countries that drive on the left"
        />
        <h2>The British Empire pattern</h2>
        <p>
          The single biggest driver (pun intended) is the British Empire.
          Most former British colonies kept the left-hand convention after
          independence — India, Pakistan, Bangladesh, Sri Lanka, most of
          southern and eastern Africa, Australia, New Zealand, Malaysia,
          Singapore, the Caribbean. Toggle the British Empire overlay
          alongside this one and the overlap is unmistakable.
        </p>
        <h2>The notable exceptions</h2>
        <ul>
          <li>
            <strong>Japan</strong> never was a British colony but adopted
            left-hand traffic for railways during the Meiji era — and the
            convention stuck for roads.
          </li>
          <li>
            <strong>Thailand</strong> drives on the left despite never
            being colonized, largely due to British influence on its early
            road and rail systems.
          </li>
          <li>
            <strong>Canada and the US</strong> are the giant exceptions on
            the British side — both switched to the right under early
            French and Spanish influence.
          </li>
          <li>
            <strong>Sweden</strong> drove on the left until 1967, when it
            switched overnight in the famous{' '}
            <em>Dagen H</em> changeover to align with its neighbors.
          </li>
        </ul>
        <h2>The bigger picture</h2>
        <p>
          Right-hand traffic spread with Napoleon (who standardized it
          across his conquered territories), and later with American car
          exports. Left-hand traffic is essentially a colonial-British
          fingerprint plus a handful of independent holdouts. The map
          makes a complicated history feel obvious.
        </p>
      </>
    ),
  },

  {
    title: 'Mapping the British Empire at Its Peak',
    description:
      'At its largest in the 1920s, the British Empire covered nearly a quarter of the planet. See exactly where on an interactive world map.',
    date: '2026-05-25',
    excerpt:
      'The sun famously never set on it. Mapped onto modern borders, the British Empire still touches every inhabited continent.',
    mapParams: 'e=Br',
    Body: () => (
      <>
        <p className="blog-post__lead">
          By the 1920s the British Empire covered around 35.5 million
          square kilometers and ruled roughly a quarter of the world&apos;s
          population. Mapping it on modern borders gives you an instant
          sense of why so much of today&apos;s world still operates in
          English.
        </p>
        <MapEmbed
          params="e=Br"
          title="British Empire territory at its peak"
        />
        <h2>What the highlighted regions cover</h2>
        <p>
          The shaded countries include the British Isles, all of present
          Canada, most of the Caribbean, Belize and Guyana in the
          Americas, a vertical spine through eastern and southern Africa,
          the Indian subcontinent, Burma, Malaysia, Singapore, Hong Kong,
          and Australia plus New Zealand and a long string of Pacific
          territories. A handful of Middle Eastern mandates (Palestine,
          Transjordan, Iraq) round it out.
        </p>
        <h2>Three things the map makes obvious</h2>
        <ul>
          <li>
            <strong>The empire was not contiguous.</strong> Unlike the
            Roman or Mongol cases, Britain&apos;s reach was maritime — a
            network of ports, trade routes, and strategic islands rather
            than one connected landmass.
          </li>
          <li>
            <strong>South Asia is the demographic core.</strong> Roughly
            two-thirds of the empire&apos;s subjects lived in British
            India alone. The map&apos;s biggest shaded block was also its
            most populous.
          </li>
          <li>
            <strong>Africa was the late acquisition.</strong> Most of the
            African territories were added during the &quot;Scramble for
            Africa&quot; in the late 19th century, very late in the
            empire&apos;s life.
          </li>
        </ul>
        <h2>Try the combination overlay</h2>
        <p>
          Add the English-language overlay on top of this one to see the
          linguistic legacy. The match is not perfect — many former
          colonies use English administratively rather than natively —
          but the correlation is striking.
        </p>
      </>
    ),
  },

  {
    title: 'The Worlds Major Religions on One Map',
    description:
      'Christianity, Islam, Hinduism, and Buddhism cover most of the inhabited world. See them all at once and notice the boundaries you would never spot in a textbook.',
    date: '2026-05-25',
    excerpt:
      'Four religions account for the dominant tradition in the vast majority of countries. Layered together, they tell a story about migration, conquest, and trade.',
    mapParams: 'r=Xt,Mu,Hd,Bd',
    Body: () => (
      <>
        <p className="blog-post__lead">
          A simple way to grasp the religious geography of the world is to
          color in every country by its predominant faith. The patterns
          are not subtle: each tradition occupies a recognizable
          geographic zone, and the borders between them are often the
          most historically interesting places on earth.
        </p>
        <MapEmbed
          params="r=Xt,Mu,Hd,Bd"
          title="Four major religions by dominant country"
        />
        <h2>What you are looking at</h2>
        <p>
          The map highlights every country whose largest religious group
          is Christianity, Islam, Hinduism, or Buddhism. The Americas,
          Europe, sub-Saharan Africa, and Oceania are predominantly
          Christian. A continuous Islamic belt runs from Morocco across
          North Africa, through the Middle East, into Central Asia and
          Indonesia. Hinduism dominates India and Nepal. Buddhism is the
          plurality faith across mainland Southeast Asia and parts of
          East Asia.
        </p>
        <h2>The borders are the story</h2>
        <ul>
          <li>
            <strong>Sahel transition zone.</strong> A jagged east-west
            line across Africa marks where Islam meets Christianity —
            countries like Nigeria, Sudan, and Ethiopia sit on that
            boundary and reflect it internally.
          </li>
          <li>
            <strong>Bangladesh / India / Myanmar.</strong> Three countries
            sharing borders, three different majority religions — a
            living artifact of partition and colonial mapping.
          </li>
          <li>
            <strong>Indonesia.</strong> The world&apos;s most populous
            Muslim country sits on the eastern edge of the Islamic belt,
            geographically closer to Buddhist mainland Southeast Asia.
          </li>
        </ul>
        <h2>What the map deliberately hides</h2>
        <p>
          Country-level coloring is a useful starting point but it
          flattens enormous internal diversity. A single color for India
          erases hundreds of millions of Muslims, Sikhs, Christians, and
          Jains. Use the map to spot the big patterns, then dig into the
          countries on the boundaries — that is where the interesting
          religious geography actually lives.
        </p>
      </>
    ),
  },

  {
    title: 'Where English Is Spoken Around the World',
    description:
      'English is the official or working language of dozens of countries on every continent. Map it and the colonial fingerprint is unmistakable.',
    date: '2026-05-25',
    excerpt:
      'English is the most geographically distributed language on earth. Mapping the countries where it is an official or de-facto working language tells a clear historical story.',
    mapParams: 'l=En',
    Body: () => (
      <>
        <p className="blog-post__lead">
          More than 50 countries list English as an official or co-official
          language, and many more use it as the de-facto language of
          government, business, or higher education. Mapped onto a single
          view, the spread of English is one of the clearest illustrations
          of how empire and globalization reshape language.
        </p>
        <MapEmbed
          params="l=En"
          title="Countries where English is an official or working language"
        />
        <h2>Three clusters</h2>
        <ul>
          <li>
            <strong>The Anglosphere core.</strong> UK, Ireland, US,
            Canada, Australia, New Zealand — the historic native-speaker
            heartland.
          </li>
          <li>
            <strong>The African belt.</strong> A long vertical stripe down
            eastern and southern Africa, plus Nigeria and Ghana — almost
            all former British colonies that kept English as a neutral
            inter-ethnic lingua franca after independence.
          </li>
          <li>
            <strong>The South and Southeast Asian arc.</strong> India,
            Pakistan, Bangladesh, Sri Lanka, Singapore, Malaysia, the
            Philippines (the last via American rather than British rule).
          </li>
        </ul>
        <h2>Compare with the British Empire overlay</h2>
        <p>
          Layer the British Empire overlay on top of this one and the
          match is almost one-to-one — with two famous exceptions. The
          Philippines was a US colony, not a British one. And many former
          British colonies (Cyprus, Israel, Egypt, the Gulf states) do not
          list English as official today, even though it remains widely
          spoken in business.
        </p>
        <h2>The biggest takeaway</h2>
        <p>
          English is not the most-spoken native language — Mandarin and
          Spanish both have more native speakers. What English has is
          unmatched geographic spread. The map shows the result: a
          language with footholds on every inhabited continent,
          maintained largely by the institutional inertia of former
          empires plus the gravitational pull of contemporary global
          business and the internet.
        </p>
      </>
    ),
  },
]

/** Posts with slugs derived from titles. Sorted newest first by date. */
export const POSTS = RAW_POSTS
  .map((p) => ({ ...p, slug: slugify(p.title) }))
  .sort((a, b) => b.date.localeCompare(a.date))

/** @param {string} slug */
export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug) || null
}
