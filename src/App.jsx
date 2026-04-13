import { useState } from "react";

const COLORS = {
  bg: "#0a0e17",
  card: "#111827",
  cardHover: "#1a2235",
  accent1: "#f97316",
  accent2: "#3b82f6",
  accent3: "#10b981",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  border: "#1e293b",
  white: "#ffffff",
};

const EVG_DATA = {
  amsterdam: {
    emoji: "🇳🇱",
    title: "Amsterdam",
    subtitle: "Canaux, bières & clubs",
    dates: "Week-end du 26-28 novembre 2027",
    duration: "Vendredi soir → Dimanche après-midi",
    color: COLORS.accent2,
    transport: "Eurostar depuis Paris Gare du Nord — 3h20 direct",
    budget: "~230€ sur place + transport variable",
    program: [
      {
        day: "Vendredi",
        icon: "🌆",
        items: [
          { time: "18h30", label: "Arrivée groupée Amsterdam Centraal" },
          { time: "19h30", label: "Check-in + bière de bienvenue" },
          { time: "20h30", label: "Dîner indonésien — De Pijp" },
          { time: "23h", label: "Clubs : Shelter / Paradiso / Claire" },
        ],
      },
      {
        day: "Samedi",
        icon: "⚡",
        items: [
          { time: "9h30", label: "CrossFit WOD privé OU Karting Grand Prix", highlight: true },
          { time: "12h", label: "Brunch — Foodhallen" },
          { time: "14h", label: "Brewery crawl : Brouwerij 't IJ → bars craft" },
          { time: "17h30", label: "Croisière Amsterdam Light Festival", highlight: true },
          { time: "19h30", label: "Dîner" },
          { time: "22h", label: "Clubs : Shelter / Paradiso / De Marktkantine" },
        ],
      },
      {
        day: "Dimanche",
        icon: "☀️",
        items: [
          { time: "10h", label: "Brunch — Albert Cuyp Market" },
          { time: "12h", label: "Balade Jordaan / Vondelpark" },
          { time: "15h", label: "Eurostar retour" },
        ],
      },
    ],
    highlights: [
      { icon: "🏋️", text: "CrossFit ou Karting Grand Prix" },
      { icon: "🍺", text: "Brewery crawl sous un moulin" },
      { icon: "💡", text: "Light Festival sur les canaux" },
      { icon: "🎵", text: "Clubs techno légendaires" },
    ],
  },
  lanzarote: {
    emoji: "🌋",
    title: "Lanzarote",
    subtitle: "Volcans, surf & gravel",
    dates: "Un week-end entre mi-avril et mi-mai 2027",
    duration: "Vendredi soir → Lundi matin",
    color: COLORS.accent1,
    transport: "Vols directs depuis Nantes, Paris ou Bordeaux",
    budget: "~270€ sur place + transport variable",
    program: [
      {
        day: "Vendredi",
        icon: "✈️",
        items: [
          { time: "14-16h", label: "Arrivée à Arrecife — 3 sous-groupes de vol" },
          { time: "17h", label: "Récup voitures + route vers les villas à Famara" },
          { time: "19h", label: "Courses + premier BBQ sunset 🔥" },
        ],
      },
      {
        day: "Samedi",
        icon: "🚴",
        items: [
          { time: "8h-12h", label: "Gravel ride volcanique — Free Motion Bikecenter", highlight: true },
          { time: "12h30", label: "Déjeuner rapide aux villas" },
          { time: "14h-16h", label: "Cours de surf à Famara — Calima Surf", highlight: true },
          { time: "19h", label: "Restau poisson grillé" },
          { time: "21h", label: "Soirée à la villa" },
        ],
      },
      {
        day: "Dimanche",
        icon: "🌋",
        items: [
          { time: "8h-12h", label: "Rando Caldera Blanca — cratère géant", highlight: true },
          { time: "12h30", label: "Déjeuner poisson grillé — El Golfo" },
          { time: "14h-17h", label: "Chill Playa Papagayo 🏖️", highlight: true },
          { time: "18h", label: "Dernier apéro sunset + BBQ d'adieu" },
        ],
      },
      {
        day: "Lundi",
        icon: "👋",
        items: [{ time: "Matin", label: "Vols retour" }],
      },
    ],
    highlights: [
      { icon: "🚲", text: "Gravel sur pistes volcaniques" },
      { icon: "🏄", text: "Surf à Playa de Famara" },
      { icon: "🌋", text: "Trek Caldera Blanca (vue 360°)" },
      { icon: "🏖️", text: "Playa Papagayo & snorkeling" },
    ],
  },
};

const TRANSPORT_GROUPS = {
  amsterdam: [
    { from: "Cherbourg (×7)", how: "Train → Paris Saint-Lazare, puis métro → Gare du Nord", duration: "~3h" },
    { from: "Paris (×4)", how: "Sur place — RDV Gare du Nord", duration: "—" },
    { from: "Angoulême (×1)", how: "TGV → Paris Montparnasse, puis métro → Gare du Nord", duration: "~2h15" },
    { from: "Poitiers (×1)", how: "Même TGV que le participant Angoulême", duration: "~1h40" },
    { from: "Strasbourg (×1)", how: "TGV → Paris Est, puis métro → Gare du Nord", duration: "~1h50" },
    { from: "Blois (×1)", how: "TER → Paris Austerlitz, puis métro → Gare du Nord", duration: "~1h40" },
    { from: "Vancouver (×1)", how: "Vol → CDG, puis RER B → Gare du Nord", duration: "~10h" },
  ],
  lanzarote: [
    { from: "Cherbourg (×7) + Blois (×1)", how: "Covoiturage → Nantes, vol direct Nantes → Arrecife", duration: "~6h30" },
    { from: "Paris (×4) + Strasbourg (×1)", how: "Vol direct Paris CDG/Orly → Arrecife (Strasbourg : TGV → CDG)", duration: "~4-6h" },
    { from: "Angoulême (×1) + Poitiers (×1)", how: "Covoiturage → Bordeaux, vol direct Bordeaux → Arrecife", duration: "~5h30" },
    { from: "Vancouver (×1)", how: "Vol international (via Madrid ou Londres)", duration: "Variable" },
  ],
};

function Card({ children, style, className }) {
  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        padding: "24px",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, color = COLORS.accent2 }) {
  return (
    <h2
      style={{
        fontSize: 28,
        fontWeight: 800,
        color: COLORS.white,
        marginBottom: 8,
        letterSpacing: "-0.02em",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          width: 4,
          height: 32,
          background: color,
          borderRadius: 2,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </h2>
  );
}

function TabButton({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 28px",
        borderRadius: 12,
        border: active ? `2px solid ${color}` : `1px solid ${COLORS.border}`,
        background: active ? `${color}18` : "transparent",
        color: active ? color : COLORS.textMuted,
        fontWeight: 700,
        fontSize: 16,
        cursor: "pointer",
        transition: "all 0.25s ease",
        fontFamily: "inherit",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </button>
  );
}

function TimelineItem({ time, label, highlight, color }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 12 }}>
      <div
        style={{
          minWidth: 70,
          fontSize: 13,
          fontWeight: 600,
          color: highlight ? color : COLORS.textDim,
          paddingTop: 2,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: highlight ? color : COLORS.border,
            border: highlight ? `2px solid ${color}` : `2px solid ${COLORS.textDim}`,
            flexShrink: 0,
          }}
        />
        <div style={{ width: 2, flex: 1, background: COLORS.border, minHeight: 16 }} />
      </div>
      <div
        style={{
          fontSize: 14,
          color: highlight ? COLORS.white : COLORS.text,
          fontWeight: highlight ? 600 : 400,
          lineHeight: 1.5,
          paddingBottom: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function DayBlock({ day, data, color }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 20 }}>{data.icon}</span>
        {data.day}
      </div>
      {data.items.map((item, i) => (
        <TimelineItem key={i} {...item} color={color} />
      ))}
    </Card>
  );
}

function HighlightPill({ icon, text, color }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `${color}12`,
        border: `1px solid ${color}30`,
        borderRadius: 100,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 500,
        color: COLORS.text,
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {text}
    </div>
  );
}

function TransportTable({ data, color }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 4px",
          fontSize: 13,
        }}
      >
        <thead>
          <tr>
            {["Départ", "Trajet", "Durée"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  color,
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: `2px solid ${color}30`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td
                style={{
                  padding: "8px 12px",
                  fontWeight: 600,
                  color: COLORS.text,
                  background: i % 2 === 0 ? `${COLORS.border}60` : "transparent",
                  borderRadius: "8px 0 0 8px",
                  whiteSpace: "nowrap",
                }}
              >
                {row.from}
              </td>
              <td
                style={{
                  padding: "8px 12px",
                  color: COLORS.textMuted,
                  background: i % 2 === 0 ? `${COLORS.border}60` : "transparent",
                }}
              >
                {row.how}
              </td>
              <td
                style={{
                  padding: "8px 12px",
                  color: COLORS.textDim,
                  fontWeight: 500,
                  background: i % 2 === 0 ? `${COLORS.border}60` : "transparent",
                  borderRadius: "0 8px 8px 0",
                  whiteSpace: "nowrap",
                }}
              >
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BudgetBar({ label, amount, max, color }) {
  const pct = Math.min((amount / max) * 100, 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: COLORS.text }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{amount}€</span>
      </div>
      <div
        style={{
          height: 6,
          background: COLORS.border,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            borderRadius: 3,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function EVGSite() {
  const [activeTab, setActiveTab] = useState("amsterdam");
  const evg = EVG_DATA[activeTab];
  const transport = TRANSPORT_GROUPS[activeTab];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      }}
    >

      {/* HERO */}
      <div
        style={{
          padding: "48px 24px 32px",
          textAlign: "center",
          background: `radial-gradient(ellipse at 50% 0%, ${COLORS.accent2}15 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, ${COLORS.accent1}10 0%, transparent 50%)`,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.accent3, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          EVG 2027
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          Double EVG
        </h1>
        <p style={{ fontSize: 16, color: COLORS.textMuted, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.5 }}>
          Un week-end urbain à Amsterdam + un week-end sport à Lanzarote.
          <br />
          16 participants — 2 aventures inoubliables.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <TabButton active={activeTab === "amsterdam"} onClick={() => setActiveTab("amsterdam")} color={COLORS.accent2}>
            🇳🇱 Amsterdam
          </TabButton>
          <TabButton active={activeTab === "lanzarote"} onClick={() => setActiveTab("lanzarote")} color={COLORS.accent1}>
            🌋 Lanzarote
          </TabButton>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 48px" }}>
        {/* Header card */}
        <Card style={{ marginTop: 24, borderLeft: `4px solid ${evg.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>{evg.emoji}</span>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: COLORS.white, margin: 0, letterSpacing: "-0.02em" }}>
                {evg.title}
              </h2>
              <p style={{ fontSize: 14, color: evg.color, fontWeight: 600, margin: 0 }}>{evg.subtitle}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12, fontSize: 13, color: COLORS.textMuted }}>
            <span>📅 {evg.dates}</span>
            <span>⏱ {evg.duration}</span>
          </div>
        </Card>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
          {evg.highlights.map((h, i) => (
            <HighlightPill key={i} {...h} color={evg.color} />
          ))}
        </div>

        {/* Programme */}
        <div style={{ marginTop: 32 }}>
          <SectionTitle color={evg.color}>Programme</SectionTitle>
          {evg.program.map((day, i) => (
            <DayBlock key={i} day={day.day} data={day} color={evg.color} />
          ))}
        </div>

        {/* Transport */}
        <div style={{ marginTop: 32 }}>
          <SectionTitle color={evg.color}>Comment venir</SectionTitle>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>{evg.transport}</p>
          <Card>
            <TransportTable data={transport} color={evg.color} />
          </Card>
        </div>

        {/* Budget */}
        <div style={{ marginTop: 32 }}>
          <SectionTitle color={evg.color}>Budget estimé (sur place)</SectionTitle>
          <Card>
            {activeTab === "amsterdam" ? (
              <>
                <BudgetBar label="Hébergement (2 nuits)" amount={45} max={100} color={evg.color} />
                <BudgetBar label="Activité matin (CrossFit ou Karting)" amount={30} max={100} color={evg.color} />
                <BudgetBar label="Brewery crawl" amount={18} max={100} color={evg.color} />
                <BudgetBar label="Croisière Light Festival" amount={20} max={100} color={evg.color} />
                <BudgetBar label="Clubs (2 soirs)" amount={30} max={100} color={evg.color} />
                <BudgetBar label="Drinks" amount={50} max={100} color={evg.color} />
                <BudgetBar label="Bouffe" amount={45} max={100} color={evg.color} />
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, color: COLORS.white }}>Total sur place</span>
                  <span style={{ fontWeight: 800, color: evg.color, fontSize: 18 }}>~230€</span>
                </div>
                <p style={{ fontSize: 11, color: COLORS.textDim, marginTop: 8 }}>+ transport AR variable selon ville de départ (60-210€)</p>
              </>
            ) : (
              <>
                <BudgetBar label="Hébergement (3 nuits, villa piscine)" amount={55} max={100} color={evg.color} />
                <BudgetBar label="Location voiture" amount={30} max={100} color={evg.color} />
                <BudgetBar label="Gravel — Free Motion" amount={40} max={100} color={evg.color} />
                <BudgetBar label="Surf — Calima Surf" amount={40} max={100} color={evg.color} />
                <BudgetBar label="Courses + BBQ" amount={50} max={100} color={evg.color} />
                <BudgetBar label="Restau" amount={22} max={100} color={evg.color} />
                <BudgetBar label="Bières + soirées" amount={32} max={100} color={evg.color} />
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, color: COLORS.white }}>Total sur place</span>
                  <span style={{ fontWeight: 800, color: evg.color, fontSize: 18 }}>~270€</span>
                </div>
                <p style={{ fontSize: 11, color: COLORS.textDim, marginTop: 8 }}>+ transport AR variable selon ville de départ (120-240€)</p>
              </>
            )}
          </Card>
        </div>

        {/* Pratique */}
        <div style={{ marginTop: 32 }}>
          <SectionTitle color={COLORS.accent3}>Infos pratiques</SectionTitle>
          <div style={{ display: "grid", gap: 12 }}>
            <Card>
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, color: COLORS.accent3, marginBottom: 8 }}>📋 À prévoir</div>
                {activeTab === "amsterdam" ? (
                  <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.textMuted }}>
                    <li>Pièce d'identité ou passeport</li>
                    <li>Vêtements chauds (novembre !)</li>
                    <li>Chaussures confortables pour marcher</li>
                    <li>Télécharger l'app GVB (transports Amsterdam)</li>
                  </ul>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.textMuted }}>
                    <li>Pièce d'identité ou passeport</li>
                    <li>Chaussures de rando (Caldera Blanca)</li>
                    <li>Maillot de bain + crème solaire</li>
                    <li>Masque & tuba si vous avez (sinon on trouve sur place)</li>
                    <li>Cuissard vélo si vous avez</li>
                    <li>Décalage horaire : -1h vs France</li>
                  </ul>
                )}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, color: COLORS.accent3, marginBottom: 8 }}>💰 Cagnotte & paiements</div>
                <p style={{ color: COLORS.textMuted, margin: 0 }}>
                  On utilise <b>Tricount</b> pour partager les frais communs (courses, location voitures, villas).
                  Chacun paie ses propres billets de transport. Le lien Tricount sera partagé sur le groupe WhatsApp.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            padding: "24px 0",
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <p style={{ fontSize: 12, color: COLORS.textDim }}>
            EVG 2027 — Budget indicatif, prix basés sur les tarifs 2025/2026
          </p>
          <p style={{ fontSize: 20, marginTop: 8 }}>🍻🤙🎉</p>
        </div>
      </div>
    </div>
  );
}
