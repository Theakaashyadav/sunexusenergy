const CATALOG_PRODUCTS = [
  {
    "id": "SX-INV-001",
    "name": "On-Grid & Hybrid Inverters",
    "cat": "Inverters",
    "brand": "Thea / Deye",
    "price": "On Request",
    "desc": "High-efficiency solar inverters for residential, commercial and utility-scale solar power plants. Hybrid models support battery integration and on-grid models support maximum power export with monitoring features.",
    "img": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-ACDB-002",
    "name": "Solar ACDB & DCDB",
    "cat": "Distribution Boards",
    "brand": "Sunexus",
    "price": "On Request",
    "desc": "AC and DC distribution boards for 1KW to 1000KW solar systems with protection against short circuits, overloads, surge voltages and reverse current.",
    "img": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-WIRE-003",
    "name": "Solar DC & AC Wires & Cables",
    "cat": "Wires & Cables",
    "brand": "Polycab / KEI",
    "price": "On Request",
    "desc": "UV-resistant and flame-retardant solar cables engineered for long-term outdoor performance with minimal power loss.",
    "img": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-EARTH-004",
    "name": "Earthing Kits & Lightning Arresters",
    "cat": "Earthing & Protection",
    "brand": "ESE / Copper Rod",
    "price": "On Request",
    "desc": "Earthing kits and lightning arresters available in multiple rod sizes and micron coating options for low earth resistance and operational safety.",
    "img": "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-PIT-005",
    "name": "Earth Pit Chambers",
    "cat": "Earthing & Protection",
    "brand": "6 Inch / 10 Inch",
    "price": "On Request",
    "desc": "Heavy-duty earth pit chambers for protection and easy inspection of earthing systems.",
    "img": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-GLAND-006",
    "name": "Cable Glands",
    "cat": "Cable Accessories",
    "brand": "Industrial Grade",
    "price": "On Request",
    "desc": "Dust and moisture-proof cable glands ensuring safe and secure cable entry in panels and junction boxes.",
    "img": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-MC4-007",
    "name": "MC4 Connectors",
    "cat": "Connectors",
    "brand": "Maxvolt / Elmex / Staubli",
    "price": "On Request",
    "desc": "Weather-proof, low-resistance MC4 connectors for secure and reliable DC connections in solar installations.",
    "img": "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-THIMBLE-008",
    "name": "Thimbles",
    "cat": "Cable Accessories",
    "brand": "Copper / Aluminium / Bimetallic",
    "price": "On Request",
    "desc": "High-conductivity cable termination accessories offering corrosion resistance and strong electrical connection.",
    "img": "https://images.unsplash.com/photo-1601397922721-4326ae07bbc5?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-TIE-009",
    "name": "UV/SS Cable Ties",
    "cat": "Cable Management",
    "brand": "200mm / 300mm / 400mm",
    "price": "On Request",
    "desc": "UV-stabilized cable ties suitable for outdoor solar cable management with high tensile strength.",
    "img": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-HT-010",
    "name": "HT Termination Kits",
    "cat": "Termination Kits",
    "brand": "RPG Raychem / 3M",
    "price": "On Request",
    "desc": "Reliable termination kits for medium and high voltage cable applications with insulation and moisture protection.",
    "img": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-SLEEVE-011",
    "name": "Cable Sleeves LT/HT",
    "cat": "Cable Accessories",
    "brand": "LT / HT",
    "price": "On Request",
    "desc": "Protective sleeves enhancing cable insulation, identification and mechanical protection.",
    "img": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-SS-012",
    "name": "SS Hardware",
    "cat": "Mounting Hardware",
    "brand": "All Sizes Available",
    "price": "On Request",
    "desc": "High-grade stainless steel fasteners for corrosion-resistant and durable solar mounting structures.",
    "img": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-MCB-013",
    "name": "MCB & SPD",
    "cat": "Electrical Protection",
    "brand": "Havells / Sibbass / Nano",
    "price": "On Request",
    "desc": "Electrical protection devices safeguarding solar systems against overloads and surge voltages.",
    "img": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-INS-014",
    "name": "Insulators",
    "cat": "Electrical Protection",
    "brand": "Solar Plant Grade",
    "price": "On Request",
    "desc": "High dielectric strength insulators used for safe electrical isolation in solar plants.",
    "img": "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-STRIP-015",
    "name": "Earthing Strips",
    "cat": "Earthing & Protection",
    "brand": "GI / Copper",
    "price": "On Request",
    "desc": "GI and copper earthing strips for effective grounding and long service life.",
    "img": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-TRAY-016",
    "name": "Cable Trays",
    "cat": "Cable Management",
    "brand": "Industrial Grade",
    "price": "On Request",
    "desc": "Durable cable management systems for organized routing of DC and AC cables.",
    "img": "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-STRUCT-017",
    "name": "Pre-GI & AL Structure",
    "cat": "Solar Structures",
    "brand": "Pre-GI / Aluminium",
    "price": "On Request",
    "desc": "Heavy-duty solar mounting structures designed for strength, stability and long-term use.",
    "img": "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    "id": "SX-HDPE-018",
    "name": "HDPE/DWC Conduit",
    "cat": "Conduit Pipes",
    "brand": "HDPE / DWC",
    "price": "On Request",
    "desc": "High-density polyethylene double wall corrugated pipes for advanced infrastructure and solar installation projects.",
    "img": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
  }
];
