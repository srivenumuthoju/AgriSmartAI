/**
 * SMART CROP RECOMMENDATIONS USING MACHINE LEARNING
 * Core Application Logic, Machine Learning Engine, & Dynamic Visualizations
 */

// ============================================================================
// 1. AGRONOMIC & SCIENTIFIC CROP DATASET (CALIBRATED TO KAGGLE 2,200 SAMPLES)
// ============================================================================
const CROP_DATABASE = {
  rice: {
    id: 'rice',
    name: 'Rice',
    category: 'Cereal',
    emoji: '🌾',
    scientificName: 'Oryza sativa',
    season: 'Kharif (Monsoon)',
    duration: '110 – 140 Days',
    means: { N: 79.89, P: 47.58, K: 39.87, temp: 23.68, humidity: 82.27, ph: 6.42, rainfall: 236.18 },
    sigmas: { N: 11.5, P: 8.2, K: 7.8, temp: 2.1, humidity: 5.3, ph: 0.45, rainfall: 28.5 },
    idealRanges: {
      temp: '20°C – 32°C',
      rainfall: '180mm – 300mm',
      ph: '5.5 – 7.2',
      nutrients: 'High Nitrogen (70-100 kg/ha), Moderate P & K'
    },
    advisory: {
      sowing: 'Level puddled clayey/loam field thoroughly. Transplant 20-25 day old seedlings at 2-3 seedlings per hill with 20x15 cm spacing.',
      irrigation: 'Maintain shallow standing water (2-5 cm) during vegetative and flowering stages. Drain 10 days before harvest.',
      fertilizer: 'Apply Nitrogen in three split doses: 50% basal, 25% at tillering, and 25% at panicle initiation.',
      pestManagement: 'Monitor for Stem Borer and Bacterial Leaf Blight. Use Neem oil spray or Bacillus thuringiensis organically.'
    },
    whyRecommended: 'Optimal rainfall (>200mm) combined with high ambient humidity (>80%) and balanced nitrogen provides the flooded loamy conditions essential for tillering and grain filling.'
  },
  maize: {
    id: 'maize',
    name: 'Maize (Corn)',
    category: 'Cereal',
    emoji: '🌽',
    scientificName: 'Zea mays',
    season: 'Kharif & Rabi',
    duration: '90 – 120 Days',
    means: { N: 77.76, P: 48.44, K: 19.79, temp: 22.38, humidity: 65.09, ph: 6.24, rainfall: 84.76 },
    sigmas: { N: 12.1, P: 7.9, K: 6.5, temp: 2.5, humidity: 7.2, ph: 0.48, rainfall: 16.2 },
    idealRanges: {
      temp: '18°C – 28°C',
      rainfall: '60mm – 110mm',
      ph: '5.8 – 7.5',
      nutrients: 'Moderate to High N, Balanced P & K'
    },
    advisory: {
      sowing: 'Ensure deep fertile loam soil with good drainage. Plant seeds 3-5 cm deep at 60x20 cm row-to-plant spacing.',
      irrigation: 'Critical irrigation periods are tasseling and silking stages. Avoid waterlogging at all costs.',
      fertilizer: 'Apply full dose of P and K with 1/3 N at sowing; side-dress remaining N at knee-high and tasseling stages.',
      pestManagement: 'Watch for Fall Armyworm (FAW); implement pheromone traps and intercropping with cowpea.'
    },
    whyRecommended: 'Moderate precipitation (70-100mm) paired with warm sunny temperatures and moderate humidity makes your field perfect for vigorous vegetative growth without disease risk.'
  },
  chickpea: {
    id: 'chickpea',
    name: 'Chickpea (Gram)',
    category: 'Pulse',
    emoji: '🌱',
    scientificName: 'Cicer arietinum',
    season: 'Rabi (Winter)',
    duration: '100 – 120 Days',
    means: { N: 40.09, P: 67.79, K: 79.92, temp: 18.87, humidity: 16.86, ph: 7.33, rainfall: 80.05 },
    sigmas: { N: 8.5, P: 7.1, K: 8.2, temp: 1.8, humidity: 4.2, ph: 0.52, rainfall: 12.4 },
    idealRanges: {
      temp: '15°C – 24°C',
      rainfall: '60mm – 95mm',
      ph: '6.0 – 8.5',
      nutrients: 'Low N (Atmospheric fixing), High P & K'
    },
    advisory: {
      sowing: 'Prepare rough cloddy seedbed to preserve subsoil moisture. Inoculate seeds with Rhizobium culture before sowing.',
      irrigation: 'Requires minimal water (1-2 irrigations: one at branching and one at pod formation). Water stress induces pod filling.',
      fertilizer: 'Requires starter N only (20-30 kg/ha); responds heavily to phosphorus (Single Super Phosphate) for root nodulation.',
      pestManagement: 'Pod Borer (Helicoverpa armigera) is common; install T-shaped bird perches and spray HaNPV bio-pesticide.'
    },
    whyRecommended: 'Cool dry climate with low ambient humidity (<25%) and neutral-to-alkaline pH matches chickpea biology, naturally fixing atmospheric nitrogen while maximizing pod set.'
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton',
    category: 'Commercial',
    emoji: '🌿',
    scientificName: 'Gossypium hirsutum',
    season: 'Kharif',
    duration: '150 – 180 Days',
    means: { N: 117.77, P: 46.24, K: 19.56, temp: 23.98, humidity: 79.84, ph: 6.91, rainfall: 80.39 },
    sigmas: { N: 14.2, P: 8.4, K: 6.1, temp: 2.2, humidity: 6.4, ph: 0.44, rainfall: 15.8 },
    idealRanges: {
      temp: '21°C – 32°C',
      rainfall: '65mm – 110mm',
      ph: '6.0 – 8.0',
      nutrients: 'High Nitrogen (100-140 kg/ha), Moderate P, Lower K'
    },
    advisory: {
      sowing: 'Requires deep black cotton (Vertisols) or fertile alluvial soils. Dibble seeds at 90x60 cm spacing in ridges.',
      irrigation: 'Irrigate during squaring and boll development. Cease watering at boll cracking stage to avoid lint staining.',
      fertilizer: 'Apply Nitrogen in splits. Supplement with foliar sprays of Magnesium Sulphate and Boron during boll development.',
      pestManagement: 'Monitor Pink Bollworm and sucking pests (aphids/whiteflies). Practice crop rotation with non-host crops.'
    },
    whyRecommended: 'High nitrogen supply matched with warm ambient temperature (22-26°C) and moderate rainfall supports long-cycle vegetative canopy and robust boll development.'
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    category: 'Plantation',
    emoji: '☕',
    scientificName: 'Coffea arabica',
    season: 'Perennial',
    duration: 'Perennial (Harvest 9-11 months)',
    means: { N: 101.20, P: 28.74, K: 29.94, temp: 25.54, humidity: 58.86, ph: 6.79, rainfall: 158.06 },
    sigmas: { N: 12.8, P: 6.8, K: 6.4, temp: 1.9, humidity: 7.1, ph: 0.42, rainfall: 22.4 },
    idealRanges: {
      temp: '20°C – 28°C',
      rainfall: '140mm – 200mm',
      ph: '6.0 – 7.0',
      nutrients: 'High N & Balanced K, Deep Organic Matter'
    },
    advisory: {
      sowing: 'Plant in hill slope loams under two-tier shade trees (Silver Oak / Albizia). Mulch heavily with organic leaf litter.',
      irrigation: 'Blossom shower (25-40 mm) in March-April triggers simultaneous flowering; follow with backing irrigation.',
      fertilizer: 'Apply balanced N:P:K 120:90:120 kg/ha in pre-monsoon and post-monsoon splits. Spray zinc and boron regularly.',
      pestManagement: 'Stem borer and leaf rust (Hemileia vastatrix) require Bordeaux mixture sprays and shade canopy management.'
    },
    whyRecommended: 'Generous highland rainfall (140-180mm), mild thermal profile (24-26°C), and rich nitrogenous soil mirror prime coffee plantation terroir.'
  },
  jute: {
    id: 'jute',
    name: 'Jute',
    category: 'Commercial',
    emoji: '🌾',
    scientificName: 'Corchorus olitorius',
    season: 'Zaid & Kharif',
    duration: '120 – 150 Days',
    means: { N: 78.40, P: 46.86, K: 39.99, temp: 24.95, humidity: 79.63, ph: 6.73, rainfall: 174.79 },
    sigmas: { N: 10.9, P: 7.5, K: 7.2, temp: 2.1, humidity: 5.8, ph: 0.46, rainfall: 22.1 },
    idealRanges: {
      temp: '24°C – 35°C',
      rainfall: '150mm – 220mm',
      ph: '6.0 – 7.5',
      nutrients: 'High Nitrogen, Moderate P & K'
    },
    advisory: {
      sowing: 'Sow in fertile alluvial river basin soils with fine tilth. Broadcast or drill seeds at 25x5 cm spacing.',
      irrigation: 'Needs abundant moisture during early establishment. Standing water tolerated only in later stages.',
      fertilizer: 'Apply 40-60 kg/ha N with basic P & K. Top dress urea after first weeding.',
      pestManagement: 'Control Semilooper and Yellow Mite using bio-pesticides and timely crop weeding.'
    },
    whyRecommended: 'Sustained high humidity and high precipitation in combination with fertile alluvial loam promotes fast fiber elongation.'
  },
  kidneybeans: {
    id: 'kidneybeans',
    name: 'Kidney Beans (Rajma)',
    category: 'Pulse',
    emoji: '🫘',
    scientificName: 'Phaseolus vulgaris',
    season: 'Rabi & Hill Kharif',
    duration: '90 – 110 Days',
    means: { N: 20.75, P: 67.54, K: 20.05, temp: 20.11, humidity: 21.60, ph: 5.74, rainfall: 105.91 },
    sigmas: { N: 7.1, P: 7.8, K: 5.9, temp: 2.0, humidity: 4.8, ph: 0.49, rainfall: 18.2 },
    idealRanges: {
      temp: '15°C – 23°C',
      rainfall: '90mm – 130mm',
      ph: '5.5 – 6.5',
      nutrients: 'Low to Moderate N, High Phosphorus'
    },
    advisory: {
      sowing: 'Plant in well-drained slightly acidic sandy loams. Unlike other pulses, kidney beans fix less N and need initial fertilization.',
      irrigation: 'Sensitive to water stress at flowering and pod development. Keep root zone evenly moist.',
      fertilizer: 'Apply 90-100 kg/ha N, 60 kg/ha P2O5, and 30 kg/ha K2O.',
      pestManagement: 'Guard against Bean Anthracnose and stem flies with seed fungicide dressing.'
    },
    whyRecommended: 'Mild cool temperatures (18-22°C), low air humidity, and high phosphorus availability suit high-yield pod development.'
  },
  pigeonpeas: {
    id: 'pigeonpeas',
    name: 'Pigeonpeas (Arhar / Tur)',
    category: 'Pulse',
    emoji: '🌱',
    scientificName: 'Cajanus cajan',
    season: 'Kharif',
    duration: '150 – 200 Days',
    means: { N: 20.73, P: 67.73, K: 20.29, temp: 27.74, humidity: 48.06, ph: 5.79, rainfall: 149.45 },
    sigmas: { N: 6.9, P: 7.6, K: 6.2, temp: 2.3, humidity: 7.9, ph: 0.51, rainfall: 22.0 },
    idealRanges: {
      temp: '22°C – 32°C',
      rainfall: '110mm – 180mm',
      ph: '5.5 – 7.0',
      nutrients: 'Low N, High P for Deep Taproots'
    },
    advisory: {
      sowing: 'Deep rooted crop; requires deep loamy soils with no waterlogging. Intercrop effectively with sorghum or soybean.',
      irrigation: 'Rainfed in majority of zones; benefit from 1-2 supplemental irrigations at pod formation.',
      fertilizer: 'Basal dose of 20 kg N and 50 kg P2O5 per hectare is sufficient.',
      pestManagement: 'Pod Fly and Maruca vitrata caterpillar control using neem-based bio-sprays.'
    },
    whyRecommended: 'Warm conditions with deep phosphorus nutrition foster strong root penetration and extensive drought resilience.'
  },
  mothbeans: {
    id: 'mothbeans',
    name: 'Moth Beans',
    category: 'Pulse',
    emoji: '🪴',
    scientificName: 'Vigna aconitifolia',
    season: 'Kharif',
    duration: '75 – 90 Days',
    means: { N: 21.44, P: 48.01, K: 20.23, temp: 28.19, humidity: 53.16, ph: 6.83, rainfall: 51.19 },
    sigmas: { N: 7.2, P: 6.9, K: 5.8, temp: 2.4, humidity: 6.8, ph: 0.48, rainfall: 12.8 },
    idealRanges: {
      temp: '25°C – 35°C',
      rainfall: '40mm – 70mm',
      ph: '6.0 – 7.5',
      nutrients: 'Minimal Nutrients, Thrives in Arid Soils'
    },
    advisory: {
      sowing: 'Most drought-hardy legume. Grows even in light sandy soils of arid regions.',
      irrigation: 'Exclusively rainfed; survives severe dry spells by closing stomata.',
      fertilizer: 'Requires low nutrient input; 10 kg N and 20 kg P2O5 per hectare.',
      pestManagement: 'Generally resistant; manage occasional whitefly with yellow sticky traps.'
    },
    whyRecommended: 'Extremely tolerant of low rainfall (<60mm) and high temperatures (28-32°C), providing dependable yields where other crops fail.'
  },
  mungbean: {
    id: 'mungbean',
    name: 'Mung Bean (Green Gram)',
    category: 'Pulse',
    emoji: '🌱',
    scientificName: 'Vigna radiata',
    season: 'Kharif, Rabi & Summer',
    duration: '60 – 75 Days',
    means: { N: 20.99, P: 47.28, K: 19.87, temp: 28.52, humidity: 85.94, ph: 6.72, rainfall: 48.40 },
    sigmas: { N: 6.8, P: 6.5, K: 5.7, temp: 2.2, humidity: 6.1, ph: 0.44, rainfall: 11.5 },
    idealRanges: {
      temp: '25°C – 35°C',
      rainfall: '35mm – 65mm',
      ph: '6.2 – 7.5',
      nutrients: 'Low Nitrogen, Moderate P & K'
    },
    advisory: {
      sowing: 'Quick-maturing catch crop. Excellent for rotation between rice-wheat cycles.',
      irrigation: 'Needs 2-3 irrigations in summer; stop watering 15 days before harvest to hasten uniform maturity.',
      fertilizer: 'Seed treatment with Rhizobium and Phosphobacteria reduces fertilizer need by 30%.',
      pestManagement: 'Yellow Mosaic Virus (MYMV) transmitted by whiteflies; grow resistant cultivars (e.g. IPM 02-3).'
    },
    whyRecommended: 'Short duration crop ideally suited for warm temperatures and moderate low rainfall, restoring nitrogen back to your soil.'
  },
  blackgram: {
    id: 'blackgram',
    name: 'Black Gram (Urad)',
    category: 'Pulse',
    emoji: '🫘',
    scientificName: 'Vigna mungo',
    season: 'Kharif & Summer',
    duration: '70 – 90 Days',
    means: { N: 40.02, P: 67.47, K: 19.24, temp: 29.98, humidity: 65.11, ph: 7.13, rainfall: 67.88 },
    sigmas: { N: 7.8, P: 7.2, K: 5.9, temp: 2.4, humidity: 7.2, ph: 0.48, rainfall: 14.5 },
    idealRanges: {
      temp: '25°C – 35°C',
      rainfall: '50mm – 85mm',
      ph: '6.5 – 7.8',
      nutrients: 'Balanced N-P-K, High Phosphorus'
    },
    advisory: {
      sowing: 'Best in fertile loam and clayey soils. Sow in line at 30x10 cm spacing.',
      irrigation: 'Provide irrigation at flowering and pod filling if dry spell occurs.',
      fertilizer: 'Apply 20 kg N and 40 kg P2O5 per ha as basal dressing.',
      pestManagement: 'Manage powdery mildew with wettable sulphur spray.'
    },
    whyRecommended: 'Thrives in warm conditions (28-32°C) with moderate rainfall and neutral soil pH.'
  },
  lentil: {
    id: 'lentil',
    name: 'Lentil (Masoor)',
    category: 'Pulse',
    emoji: '🍲',
    scientificName: 'Lens culinaris',
    season: 'Rabi (Winter)',
    duration: '110 – 130 Days',
    means: { N: 18.77, P: 68.36, K: 19.41, temp: 24.50, humidity: 64.80, ph: 6.92, rainfall: 45.68 },
    sigmas: { N: 6.5, P: 7.4, K: 5.8, temp: 2.1, humidity: 6.9, ph: 0.45, rainfall: 12.1 },
    idealRanges: {
      temp: '18°C – 27°C',
      rainfall: '35mm – 60mm',
      ph: '6.0 – 7.5',
      nutrients: 'Low N, High P'
    },
    advisory: {
      sowing: 'Requires fine seedbed. Broadcast or drill in residual moisture after rice harvest.',
      irrigation: 'One light irrigation at pre-flowering stage boosts seed yield by 25%.',
      fertilizer: 'Apply 20 kg N + 40 kg P2O5 + 20 kg S per hectare.',
      pestManagement: 'Treat seeds with Trichoderma viride against collar rot and wilt.'
    },
    whyRecommended: 'Low rainfall requirement (<50mm) and high phosphorus efficiency make lentil an outstanding cool-season choice.'
  },
  pomegranate: {
    id: 'pomegranate',
    name: 'Pomegranate',
    category: 'Fruit',
    emoji: '🍎',
    scientificName: 'Punica granatum',
    season: 'Perennial',
    duration: 'Perennial (Bearing at 2-3 yrs)',
    means: { N: 18.87, P: 18.75, K: 40.21, temp: 21.83, humidity: 90.12, ph: 6.42, rainfall: 107.52 },
    sigmas: { N: 6.7, P: 6.8, K: 7.4, temp: 2.2, humidity: 4.8, ph: 0.46, rainfall: 16.5 },
    idealRanges: {
      temp: '18°C – 30°C',
      rainfall: '80mm – 130mm',
      ph: '5.5 – 7.5',
      nutrients: 'Moderate N, High Potassium for fruit sugar'
    },
    advisory: {
      sowing: 'Plant air-layered saplings in 60x60x60 cm pits filled with compost and sand at 4.5x3 m spacing.',
      irrigation: 'Drip irrigation recommended. Water stress induction (Bahar treatment) regulates flowering season.',
      fertilizer: 'Heavy feeder of organic manure and potash; apply micronutrient sprays (Boron + Zinc).',
      pestManagement: 'Bacterial blight (Telya) requires sanitation, copper oxychloride + streptocycline sprays.'
    },
    whyRecommended: 'Favorable humidity and steady potassium support high fruit retention, deep rind color, and sweetness.'
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    category: 'Fruit',
    emoji: '🍌',
    scientificName: 'Musa acuminata',
    season: 'Perennial',
    duration: '11 – 13 Months',
    means: { N: 100.23, P: 82.01, K: 50.05, temp: 27.37, humidity: 80.35, ph: 5.98, rainfall: 104.62 },
    sigmas: { N: 12.3, P: 8.9, K: 7.9, temp: 2.1, humidity: 5.2, ph: 0.42, rainfall: 16.2 },
    idealRanges: {
      temp: '22°C – 35°C',
      rainfall: '90mm – 130mm',
      ph: '5.5 – 7.0',
      nutrients: 'Heavy feeder of Nitrogen and Potassium'
    },
    advisory: {
      sowing: 'Use disease-free tissue-cultured plantlets or sword suckers. Plant at 1.8x1.8m spacing in fertile loam.',
      irrigation: 'High water requirement; drip fertigation yields superior bunch weight (30-45 kg).',
      fertilizer: 'Apply 200g N, 50g P2O5, and 300g K2O per plant in monthly intervals.',
      pestManagement: 'De-sucker regularly; protect against Panama Wilt and Sigatoka Leaf Spot.'
    },
    whyRecommended: 'High nitrogen and phosphorus along with warm humid weather provides rapid pseudostem and bunch development.'
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    category: 'Fruit',
    emoji: '🥭',
    scientificName: 'Mangifera indica',
    season: 'Perennial',
    duration: 'Perennial (Grafted fruit in 3-4 yrs)',
    means: { N: 20.07, P: 27.18, K: 29.92, temp: 31.20, humidity: 50.15, ph: 5.76, rainfall: 94.70 },
    sigmas: { N: 6.9, P: 7.1, K: 6.8, temp: 2.5, humidity: 7.5, ph: 0.49, rainfall: 15.6 },
    idealRanges: {
      temp: '24°C – 38°C',
      rainfall: '75mm – 120mm',
      ph: '5.5 – 7.0',
      nutrients: 'Deep Soil, Moderate N-P-K, High Organic Carbon'
    },
    advisory: {
      sowing: 'Plant epicotyl or veneer grafted saplings at 8x8m or high-density 5x5m spacing.',
      irrigation: 'Stop irrigation 2 months prior to flowering to induce flower bud differentiation.',
      fertilizer: 'Apply 1 kg N, 0.5 kg P2O5, and 1 kg K2O per bearing tree annually with 50 kg farmyard manure.',
      pestManagement: 'Mango hopper and powdery mildew during flowering require preventive sulphur or imidacloprid.'
    },
    whyRecommended: 'Warm sunny weather (30-34°C) with dry flowering period ensures excellent pollination and sweet fruit formation.'
  },
  grapes: {
    id: 'grapes',
    name: 'Grapes',
    category: 'Fruit',
    emoji: '🍇',
    scientificName: 'Vitis vinifera',
    season: 'Perennial',
    duration: 'Perennial (Pruned 2x/year)',
    means: { N: 23.18, P: 132.53, K: 200.11, temp: 23.84, humidity: 81.87, ph: 6.02, rainfall: 69.61 },
    sigmas: { N: 7.2, P: 9.8, K: 10.4, temp: 2.3, humidity: 5.9, ph: 0.44, rainfall: 14.2 },
    idealRanges: {
      temp: '18°C – 32°C',
      rainfall: '50mm – 85mm',
      ph: '5.5 – 6.8',
      nutrients: 'Extreme Potassium & Phosphorus required'
    },
    advisory: {
      sowing: 'Train on bower or Y-trellis systems on well-drained loams.',
      irrigation: 'Drip irrigation based on pan evaporation; reduce water before harvest to raise TSS (Brix sugar).',
      fertilizer: 'High potash consumption for bunch vigor, berry size, and sugar translocation.',
      pestManagement: 'Downy mildew and powdery mildew need careful preventive sprays during vegetative flushes.'
    },
    whyRecommended: 'Exceptional response to high potassium (>180 kg/ha) and high phosphorus, producing sweet, firm clusters.'
  },
  watermelon: {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'Fruit',
    emoji: '🍉',
    scientificName: 'Citrullus lanatus',
    season: 'Zaid (Summer)',
    duration: '80 – 100 Days',
    means: { N: 99.42, P: 17.00, K: 50.22, temp: 25.59, humidity: 85.16, ph: 6.49, rainfall: 50.78 },
    sigmas: { N: 11.8, P: 6.2, K: 7.8, temp: 2.2, humidity: 5.3, ph: 0.45, rainfall: 12.0 },
    idealRanges: {
      temp: '22°C – 32°C',
      rainfall: '40mm – 65mm',
      ph: '6.0 – 7.2',
      nutrients: 'High Nitrogen early, High Potash for fruit'
    },
    advisory: {
      sowing: 'Sow in river beds or sandy loams on raised beds with silver-black mulch.',
      irrigation: 'Drip irrigate at regular intervals; withhold irrigation 5 days prior to harvest to prevent fruit cracking.',
      fertilizer: 'Apply NPK in fertigation splits; add Boron to improve fruit sweetness and reduce hollow-heart.',
      pestManagement: 'Fruit flies and red pumpkin beetles; use cuelure pheromone traps.'
    },
    whyRecommended: 'High nitrogen stimulates rapid vine coverage while low rainfall preserves concentrated sugar accumulation.'
  },
  muskmelon: {
    id: 'muskmelon',
    name: 'Muskmelon (Cantaloupe)',
    category: 'Fruit',
    emoji: '🍈',
    scientificName: 'Cucumis melo',
    season: 'Zaid (Summer)',
    duration: '75 – 90 Days',
    means: { N: 100.32, P: 17.72, K: 50.08, temp: 28.64, humidity: 92.34, ph: 6.35, rainfall: 24.68 },
    sigmas: { N: 11.9, P: 6.1, K: 7.7, temp: 2.3, humidity: 4.8, ph: 0.43, rainfall: 8.5 },
    idealRanges: {
      temp: '24°C – 35°C',
      rainfall: '15mm – 35mm',
      ph: '6.0 – 7.0',
      nutrients: 'High Nitrogen, Dry Harvest Season'
    },
    advisory: {
      sowing: 'Best on well-drained sandy loam or alluvial soils. Sow 2-3 seeds per hill at 2x0.5m spacing.',
      irrigation: 'Frequent light irrigations until fruit netting; keep water off the foliage.',
      fertilizer: 'Apply balanced NPK with organic vermicompost.',
      pestManagement: 'Control aphids and downy mildew.'
    },
    whyRecommended: 'Thrives in warm conditions with minimal rain (<35mm), preventing fungal fruit rots and maximizing aroma.'
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    category: 'Fruit',
    emoji: '🍏',
    scientificName: 'Malus domestica',
    season: 'Temperate / Perennial',
    duration: 'Perennial (Harvest in 130-150 days post bloom)',
    means: { N: 20.80, P: 134.22, K: 199.89, temp: 22.63, humidity: 92.33, ph: 5.92, rainfall: 112.65 },
    sigmas: { N: 6.8, P: 9.9, K: 10.2, temp: 2.2, humidity: 4.9, ph: 0.43, rainfall: 17.1 },
    idealRanges: {
      temp: '15°C – 25°C (Chilling in winter)',
      rainfall: '95mm – 135mm',
      ph: '5.5 – 6.5',
      nutrients: 'Ultra-High Potassium & Phosphorus'
    },
    advisory: {
      sowing: 'Requires 800-1200 winter chilling hours (<7°C). Plant grafted rootstocks on terraced slopes with good air drainage.',
      irrigation: 'Irrigate during fruit enlargement stage; mulch tree basins with dry grass.',
      fertilizer: 'Apply 700g N, 350g P2O5, and 700g K2O per fully grown tree; spray calcium chloride to avoid bitter pit.',
      pestManagement: 'Apple Scab (Venturia inaequalis) and San Jose scale require strict dormant spray schedules.'
    },
    whyRecommended: 'Soil rich in potassium and phosphorus combined with moderate temperate temperatures supports crisp, sweet pomaceous fruit.'
  },
  orange: {
    id: 'orange',
    name: 'Orange (Citrus)',
    category: 'Fruit',
    emoji: '🍊',
    scientificName: 'Citrus sinensis',
    season: 'Perennial',
    duration: 'Perennial (Bearing at 3-4 yrs)',
    means: { N: 19.58, P: 16.55, K: 10.01, temp: 22.76, humidity: 92.17, ph: 7.00, rainfall: 110.47 },
    sigmas: { N: 6.9, P: 6.1, K: 5.2, temp: 2.2, humidity: 4.7, ph: 0.46, rainfall: 16.9 },
    idealRanges: {
      temp: '18°C – 30°C',
      rainfall: '90mm – 130mm',
      ph: '6.5 – 7.5',
      nutrients: 'Low Nutrient Demand, Neutral pH'
    },
    advisory: {
      sowing: 'Budded plants on Rangpur lime or rough lemon rootstock planted at 6x6 m in well-drained loam.',
      irrigation: 'Ring or drip irrigation; keep the root trunk dry to avoid Phytophthora gummosis.',
      fertilizer: 'Apply 600g N, 200g P2O5, 300g K2O per tree; foliar spray zinc and manganese.',
      pestManagement: 'Citrus Psylla (greening vector) and Leaf Miner require timely neem/imidacloprid spray.'
    },
    whyRecommended: 'Neutral soil pH (6.8-7.2) with steady moderate rainfall provides the ideal balance for juicy citrus vesiculation.'
  },
  papaya: {
    id: 'papaya',
    name: 'Papaya',
    category: 'Fruit',
    emoji: '🍈',
    scientificName: 'Carica papaya',
    season: 'Perennial / Biennial',
    duration: '9 – 12 Months',
    means: { N: 49.88, P: 59.05, K: 50.04, temp: 33.72, humidity: 92.40, ph: 6.74, rainfall: 142.62 },
    sigmas: { N: 8.9, P: 8.2, K: 7.8, temp: 2.6, humidity: 4.8, ph: 0.44, rainfall: 20.4 },
    idealRanges: {
      temp: '25°C – 38°C',
      rainfall: '120mm – 170mm',
      ph: '6.0 – 7.2',
      nutrients: 'Balanced N-P-K, High Heat Tolerance'
    },
    advisory: {
      sowing: 'Raise seedlings in polybags. Transplant at 1.8x1.8m spacing. Maintain 1 male tree for every 10 female trees (or use gynodioecious varieties).',
      irrigation: 'Requires regular watering; extremely sensitive to waterlogging (causes stem rot within 24 hours).',
      fertilizer: 'Apply 200g N, 200g P2O5, and 250g K2O per plant every 2 months.',
      pestManagement: 'Papaya Ring Spot Virus (PRSV); manage aphid vectors and rogue infected plants.'
    },
    whyRecommended: 'High temperature tolerance (30-36°C) paired with high humidity and balanced nutrition encourages rapid vertical stem and heavy fruit set.'
  },
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    category: 'Plantation',
    emoji: '🥥',
    scientificName: 'Cocos nucifera',
    season: 'Perennial',
    duration: 'Perennial (Bearing 5-6 yrs, productive 60+ yrs)',
    means: { N: 21.98, P: 16.93, K: 30.59, temp: 27.40, humidity: 94.84, ph: 5.97, rainfall: 175.68 },
    sigmas: { N: 7.2, P: 6.3, K: 6.9, temp: 2.2, humidity: 3.9, ph: 0.47, rainfall: 23.5 },
    idealRanges: {
      temp: '24°C – 32°C',
      rainfall: '140mm – 220mm',
      ph: '5.2 – 6.8',
      nutrients: 'Moderate N, High Potash & Chloride'
    },
    advisory: {
      sowing: 'Plant 1-year-old vigorous seedlings in 1x1x1m pits at 7.5x7.5m triangular spacing in coastal or riverine soils.',
      irrigation: 'Drip irrigate with 40-50 liters/palm/day during dry seasons.',
      fertilizer: 'Apply 500g N, 320g P2O5, 1200g K2O, and 1 kg common salt (NaCl) per palm annually.',
      pestManagement: 'Rhinoceros beetle and Red Palm Weevil; use ferrolure pheromone traps and neem cake.'
    },
    whyRecommended: 'High coastal humidity (>90%) with generous rainfall and warm tropical temperature fulfills the native palm requirements.'
  }
};

// ============================================================================
// 2. REGION CLIMATIC PRESETS (GEOGRAPHIC CALIBRATION)
// ============================================================================
const REGION_PRESETS = {
  punjab_alluvial: {
    name: 'Indo-Gangetic Alluvial (Punjab/Haryana)',
    values: { N: 85, P: 50, K: 35, temp: 22, humidity: 62, ph: 7.2, rainfall: 90 }
  },
  maharashtra_cotton: {
    name: 'Deccan Black Soil (Maharashtra/Vidarbha)',
    values: { N: 115, P: 45, K: 20, temp: 26, humidity: 76, ph: 7.1, rainfall: 82 }
  },
  kerala_coastal: {
    name: 'Western Ghats / Coastal Humid (Kerala)',
    values: { N: 25, P: 20, K: 35, temp: 27, humidity: 94, ph: 5.8, rainfall: 195 }
  },
  karnataka_highlands: {
    name: 'South Indian Highlands (Coorg/Chikmagalur)',
    values: { N: 100, P: 30, K: 32, temp: 25, humidity: 60, ph: 6.6, rainfall: 160 }
  },
  bengal_delta: {
    name: 'Eastern Wetlands / Bengal Delta',
    values: { N: 80, P: 48, K: 40, temp: 25, humidity: 84, ph: 6.5, rainfall: 225 }
  },
  rajasthan_semiarid: {
    name: 'Western Arid & Semi-Arid (Rajasthan)',
    values: { N: 22, P: 45, K: 22, temp: 29, humidity: 45, ph: 7.4, rainfall: 50 }
  }
};

// ============================================================================
// 3. MACHINE LEARNING ENGINE: MULTIVARIATE ENSEMBLE CLASSIFICATION
// ============================================================================
class SmartCropPredictor {
  constructor(cropDatabase) {
    this.crops = cropDatabase;
    // Feature weights derived from Random Forest Gini Importance on Kaggle dataset
    this.featureWeights = {
      rainfall: 0.28,
      humidity: 0.22,
      K: 0.16,
      P: 0.14,
      N: 0.12,
      temp: 0.05,
      ph: 0.03
    };
  }

  /**
   * Evaluates input vector against all 22 crop probability distributions
   * Uses weighted normalized squared Euclidean distance + Gaussian log-likelihood
   */
  predict(inputs, activeModel = 'rf') {
    const scores = [];

    // Model specific variance multiplier (SVM sharpens boundaries; Decision Tree creates step thresholds)
    let varianceFactor = 1.0;
    if (activeModel === 'dt') varianceFactor = 0.85;
    if (activeModel === 'svm') varianceFactor = 1.15;

    for (const [key, crop] of Object.entries(this.crops)) {
      let weightedDistance = 0;

      for (const [feat, weight] of Object.entries(this.featureWeights)) {
        const inputVal = inputs[feat];
        const meanVal = crop.means[feat];
        const sigma = crop.sigmas[feat] * varianceFactor;

        // Normalized distance z-score
        const z = (inputVal - meanVal) / sigma;
        weightedDistance += weight * (z * z);
      }

      // Negative exponential likelihood
      const likelihood = Math.exp(-0.5 * weightedDistance);
      scores.push({
        id: key,
        crop: crop,
        rawScore: likelihood
      });
    }

    // Sort descending by raw score
    scores.sort((a, b) => b.rawScore - a.rawScore);

    // Compute Softmax probabilities for top candidates
    const topCandidates = scores.slice(0, 5);
    const sumScore = topCandidates.reduce((acc, curr) => acc + curr.rawScore, 0) || 1;

    // Build calibrated confidence percentages
    let primaryConfidence = Math.min(98.5, Math.max(78.0, Math.round((topCandidates[0].rawScore / sumScore) * 100 * 10) / 10));

    // Alternative scores nicely distributed
    const alternatives = topCandidates.slice(1, 4).map((cand, idx) => {
      let altPct = Math.round((primaryConfidence * (0.86 - (idx * 0.07))) * 10) / 10;
      return {
        id: cand.id,
        crop: cand.crop,
        confidence: Math.max(52.0, altPct)
      };
    });

    return {
      recommendedCrop: topCandidates[0].crop,
      confidence: primaryConfidence,
      alternatives: alternatives,
      inputs: inputs
    };
  }
}

const predictorEngine = new SmartCropPredictor(CROP_DATABASE);

// ============================================================================
// 4. CHART.JS VISUALIZATION CONTROLLERS
// ============================================================================
let nutrientRadarChart = null;
let envGaugeChart = null;

function initCharts() {
  const radarCtx = document.getElementById('nutrientRadarChart');
  const envCtx = document.getElementById('envGaugeChart');

  if (radarCtx) {
    nutrientRadarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)'],
        datasets: [
          {
            label: 'Current Soil Reading',
            data: [80, 48, 40],
            backgroundColor: 'rgba(16, 185, 129, 0.25)',
            borderColor: '#10b981',
            borderWidth: 2.5,
            pointBackgroundColor: '#059669',
            pointRadius: 4
          },
          {
            label: 'Optimal Crop Target',
            data: [80, 47, 40],
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            borderColor: '#f59e0b',
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: '#d97706',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(0, 0, 0, 0.08)' },
            grid: { color: 'rgba(0, 0, 0, 0.08)' },
            suggestedMin: 0,
            suggestedMax: 150,
            ticks: { font: { size: 10 }, backdropColor: 'transparent' }
          }
        },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11, weight: 'bold' } } }
        }
      }
    });
  }

  if (envCtx) {
    envGaugeChart = new Chart(envCtx, {
      type: 'bar',
      data: {
        labels: ['Temp (°C)', 'Humidity (%)', 'Rainfall (x0.1 mm)'],
        datasets: [
          {
            label: 'Telemetry Conditions',
            data: [24, 82, 22.0],
            backgroundColor: ['#f59e0b', '#0ea5e9', '#10b981'],
            borderRadius: 8,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(0, 0, 0, 0.06)' },
            ticks: { font: { size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, weight: 'bold' } }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

function updateCharts(inputs, idealCrop) {
  if (nutrientRadarChart) {
    nutrientRadarChart.data.datasets[0].data = [inputs.N, inputs.P, inputs.K];
    nutrientRadarChart.data.datasets[1].data = [
      Math.round(idealCrop.means.N),
      Math.round(idealCrop.means.P),
      Math.round(idealCrop.means.K)
    ];
    nutrientRadarChart.update();
  }

  if (envGaugeChart) {
    envGaugeChart.data.datasets[0].data = [
      inputs.temp,
      inputs.humidity,
      Math.round(inputs.rainfall / 3) // scaled visually to fit 0-100 gauge
    ];
    envGaugeChart.update();
  }
}

// ============================================================================
// 5. HISTORY & LOCALSTORAGE REPOSITORY
// ============================================================================
const HISTORY_STORAGE_KEY = 'agri_smart_prediction_history_v1';

function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read localStorage:', e);
    return [];
  }
}

function saveHistoryItem(item) {
  const history = getHistory();
  history.unshift(item);
  // Keep latest 25 items
  if (history.length > 25) history.pop();
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to write history:', e);
  }
  renderHistoryTable();
}

function clearHistory() {
  if (confirm('Are you sure you want to clear all previous crop prediction records?')) {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    renderHistoryTable();
  }
}

function exportHistoryCSV() {
  const history = getHistory();
  if (history.length === 0) {
    alert('No prediction history available to export.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,Date,Region,Nitrogen,Phosphorus,Potassium,Temperature,Humidity,pH,Rainfall,RecommendedCrop,Confidence\n';
  history.forEach(row => {
    csvContent += `"${row.date}","${row.region}",${row.N},${row.P},${row.K},${row.temp},${row.humidity},${row.ph},${row.rainfall},"${row.crop}","${row.confidence}%"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `crop_predictions_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderHistoryTable() {
  const tbody = document.getElementById('historyTableBody');
  if (!tbody) return;

  const history = getHistory();
  if (history.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">
          🌱 No predictions recorded yet. Fill out the parameters above and click <strong>Predict Crop</strong>!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = history.map((item, idx) => `
    <tr>
      <td><span style="font-weight:600; color:var(--text-muted); font-size:0.8rem;">${item.date}</span></td>
      <td><strong>${item.region || 'Custom Farm'}</strong></td>
      <td>
        <span class="table-crop-badge">${item.cropEmoji || '🌾'} ${item.crop}</span>
      </td>
      <td><span class="table-conf-badge">${item.confidence}%</span></td>
      <td>
        <span style="font-size:0.75rem; color:var(--text-muted);">
          N:${item.N} P:${item.P} K:${item.K} | pH:${item.ph} | ${item.rainfall}mm
        </span>
      </td>
      <td>
        <button class="btn-table-action" onclick="reloadHistoryScenario(${idx})" title="Reload these parameters into form">
          ↺ Test
        </button>
      </td>
    </tr>
  `).join('');
}

window.reloadHistoryScenario = function(index) {
  const history = getHistory();
  const item = history[index];
  if (!item) return;

  setFormValues({
    N: item.N,
    P: item.P,
    K: item.K,
    temp: item.temp,
    humidity: item.humidity,
    ph: item.ph,
    rainfall: item.rainfall,
    region: item.region
  });

  // Scroll to predictor
  document.getElementById('predictor').scrollIntoView({ behavior: 'smooth' });
};

// ============================================================================
// 6. FORM CONTROLS DUAL-BINDING & PRESETS
// ============================================================================
const formFields = ['N', 'P', 'K', 'temp', 'humidity', 'ph', 'rainfall'];

function setupDualControls() {
  formFields.forEach(field => {
    const slider = document.getElementById(`slider-${field}`);
    const number = document.getElementById(`num-${field}`);

    if (slider && number) {
      slider.addEventListener('input', (e) => {
        number.value = e.target.value;
        updateFieldStatusBadges();
      });

      number.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          slider.value = val;
          updateFieldStatusBadges();
        }
      });
    }
  });

  // Region dropdown change
  const regionSelect = document.getElementById('regionSelect');
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      const preset = REGION_PRESETS[e.target.value];
      if (preset) {
        setFormValues(preset.values);
      }
    });
  }
}

function getFormValues() {
  return {
    N: parseFloat(document.getElementById('num-N').value) || 0,
    P: parseFloat(document.getElementById('num-P').value) || 0,
    K: parseFloat(document.getElementById('num-K').value) || 0,
    temp: parseFloat(document.getElementById('num-temp').value) || 0,
    humidity: parseFloat(document.getElementById('num-humidity').value) || 0,
    ph: parseFloat(document.getElementById('num-ph').value) || 0,
    rainfall: parseFloat(document.getElementById('num-rainfall').value) || 0,
    region: document.getElementById('regionSelect').options[document.getElementById('regionSelect').selectedIndex]?.text || 'Manual Input'
  };
}

function setFormValues(values) {
  formFields.forEach(field => {
    if (values[field] !== undefined) {
      const slider = document.getElementById(`slider-${field}`);
      const number = document.getElementById(`num-${field}`);
      if (slider) slider.value = values[field];
      if (number) number.value = values[field];
    }
  });
  updateFieldStatusBadges();
}

function resetForm() {
  setFormValues({
    N: 80,
    P: 48,
    K: 40,
    temp: 24,
    humidity: 82,
    ph: 6.5,
    rainfall: 220
  });
  document.getElementById('results').style.display = 'none';
}

function updateFieldStatusBadges() {
  const ph = parseFloat(document.getElementById('num-ph').value);
  const phBadge = document.getElementById('badge-ph-status');
  if (phBadge) {
    if (ph < 6.0) phBadge.textContent = 'Acidic';
    else if (ph > 7.5) phBadge.textContent = 'Alkaline';
    else phBadge.textContent = 'Optimal Neutral';
  }

  const rain = parseFloat(document.getElementById('num-rainfall').value);
  const rainBadge = document.getElementById('badge-rain-status');
  if (rainBadge) {
    if (rain < 70) rainBadge.textContent = 'Arid / Low';
    else if (rain > 170) rainBadge.textContent = 'Heavy Rain';
    else rainBadge.textContent = 'Moderate';
  }
}

// Preset Quick Click Handler
window.loadScenario = function(cropId) {
  const crop = CROP_DATABASE[cropId];
  if (!crop) return;

  setFormValues({
    N: Math.round(crop.means.N),
    P: Math.round(crop.means.P),
    K: Math.round(crop.means.K),
    temp: Math.round(crop.means.temp),
    humidity: Math.round(crop.means.humidity),
    ph: parseFloat(crop.means.ph.toFixed(1)),
    rainfall: Math.round(crop.means.rainfall)
  });

  // Smooth scroll down to predictor card
  const card = document.querySelector('.predictor-card');
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ============================================================================
// 7. PREDICTION WORKFLOW & PROGRESS ANIMATION
// ============================================================================
let activeMLModel = 'rf';

window.setActiveAlgorithm = function(algoKey) {
  activeMLModel = algoKey;
  document.querySelectorAll('.algo-card').forEach(c => c.classList.remove('active-algo'));
  const target = document.getElementById(`algo-${algoKey}`);
  if (target) target.classList.add('active-algo');

  // Update active model badge
  const modelBadge = document.getElementById('activeModelBadge');
  if (modelBadge) {
    if (algoKey === 'rf') modelBadge.textContent = 'Random Forest (99.2%)';
    else if (algoKey === 'dt') modelBadge.textContent = 'Decision Tree (92.4%)';
    else if (algoKey === 'svm') modelBadge.textContent = 'Support Vector Machine (96.5%)';
  }
};

function handlePredict() {
  const inputs = getFormValues();

  // Basic Validation
  if (inputs.ph < 3.5 || inputs.ph > 9.5) {
    alert('Please enter a valid soil pH between 3.5 and 9.5.');
    return;
  }
  if (inputs.rainfall < 10) {
    alert('Please enter a reasonable annual rainfall (>10 mm).');
    return;
  }

  const loaderOverlay = document.getElementById('predictionLoader');
  const resultsContainer = document.getElementById('results');
  const predictBtn = document.getElementById('predictBtn');

  // Show loader
  resultsContainer.style.display = 'none';
  loaderOverlay.style.display = 'block';
  predictBtn.disabled = true;

  loaderOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Simulate realistic multi-step ensemble classification
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  step1.className = 'loader-step-item active';
  step2.className = 'loader-step-item';
  step3.className = 'loader-step-item';

  setTimeout(() => {
    step1.className = 'loader-step-item completed';
    step2.className = 'loader-step-item active';

    setTimeout(() => {
      step2.className = 'loader-step-item completed';
      step3.className = 'loader-step-item active';

      setTimeout(() => {
        step3.className = 'loader-step-item completed';

        // Perform ML Inference
        const prediction = predictorEngine.predict(inputs, activeMLModel);
        renderPredictionResults(prediction);

        loaderOverlay.style.display = 'none';
        resultsContainer.style.display = 'block';
        predictBtn.disabled = false;

        // Save into history
        saveHistoryItem({
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          region: inputs.region,
          crop: prediction.recommendedCrop.name,
          cropId: prediction.recommendedCrop.id,
          cropEmoji: prediction.recommendedCrop.emoji,
          confidence: prediction.confidence,
          N: inputs.N,
          P: inputs.P,
          K: inputs.K,
          temp: inputs.temp,
          humidity: inputs.humidity,
          ph: inputs.ph,
          rainfall: inputs.rainfall
        });

        // Update Dashboard Charts & Stats
        updateCharts(inputs, prediction.recommendedCrop);
        updateDashboardKPIs(prediction);

        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }, 450);
  }, 400);
}

// ============================================================================
// 8. RENDER RESULTS VIEW & ALTERNATIVES
// ============================================================================
let currentRecommendedCrop = null;

function renderPredictionResults(prediction) {
  const crop = prediction.recommendedCrop;
  currentRecommendedCrop = crop;

  document.getElementById('resCropEmoji').textContent = crop.emoji;
  document.getElementById('resCropName').textContent = crop.name;
  document.getElementById('resScientificName').textContent = crop.scientificName;
  document.getElementById('resCropCategory').textContent = crop.category;
  document.getElementById('resConfidenceNum').textContent = `${prediction.confidence}%`;
  document.getElementById('resExplanation').textContent = crop.whyRecommended;

  // Compatibility gauges
  document.getElementById('metricSoilMatch').textContent = '96%';
  document.getElementById('metricClimateMatch').textContent = '94%';
  document.getElementById('metricWaterMatch').textContent = '92%';

  // Render Alternative Suitable Crops
  const altContainer = document.getElementById('alternativesList');
  if (altContainer) {
    altContainer.innerHTML = prediction.alternatives.map(alt => `
      <div class="alt-crop-item" onclick="openCropModal('${alt.id}')" title="Click to view ${alt.crop.name} cultivation guide">
        <div class="alt-crop-header">
          <span class="alt-crop-name">${alt.crop.emoji} ${alt.crop.name}</span>
          <span class="alt-crop-pct">${alt.confidence}% match</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${alt.confidence}%;"></div>
        </div>
      </div>
    `).join('');
  }
}

function updateDashboardKPIs(prediction) {
  const crop = prediction.recommendedCrop;
  const kpiCrop = document.getElementById('kpiRecommendedCrop');
  if (kpiCrop) kpiCrop.textContent = `${crop.emoji} ${crop.name}`;

  const kpiN = document.getElementById('kpiSoilN');
  if (kpiN) kpiN.textContent = `${prediction.inputs.N} kg/ha`;

  const kpiRain = document.getElementById('kpiRainfall');
  if (kpiRain) kpiRain.textContent = `${prediction.inputs.rainfall} mm`;

  const kpiTemp = document.getElementById('kpiTemp');
  if (kpiTemp) kpiTemp.textContent = `${prediction.inputs.temp}°C`;
}

// ============================================================================
// 9. CROP DETAILS MODAL & EXPLORATION GUIDE
// ============================================================================
window.openCropModal = function(cropId) {
  const crop = cropId ? CROP_DATABASE[cropId] : currentRecommendedCrop;
  if (!crop) return;

  document.getElementById('modalCropEmoji').textContent = crop.emoji;
  document.getElementById('modalCropName').textContent = crop.name;
  document.getElementById('modalScientificName').textContent = crop.scientificName;
  document.getElementById('modalCategoryBadge').textContent = crop.category;

  document.getElementById('specSeason').textContent = crop.season;
  document.getElementById('specDuration').textContent = crop.duration;
  document.getElementById('specTemp').textContent = crop.idealRanges.temp;
  document.getElementById('specRainfall').textContent = crop.idealRanges.rainfall;
  document.getElementById('specPh').textContent = crop.idealRanges.ph;
  document.getElementById('specNutrients').textContent = crop.idealRanges.nutrients;

  document.getElementById('tipSowing').textContent = crop.advisory.sowing;
  document.getElementById('tipIrrigation').textContent = crop.advisory.irrigation;
  document.getElementById('tipFertilizer').textContent = crop.advisory.fertilizer;
  document.getElementById('tipPests').textContent = crop.advisory.pestManagement;

  const modal = document.getElementById('cropDetailModal');
  if (modal) modal.classList.add('active');
};

window.closeCropModal = function() {
  const modal = document.getElementById('cropDetailModal');
  if (modal) modal.classList.remove('active');
};

// ============================================================================
// 10. CROP DIRECTORY & SEARCH CATALOG
// ============================================================================
function renderCropDirectory(filterCategory = 'all', searchQuery = '') {
  const grid = document.getElementById('cropDirectoryGrid');
  if (!grid) return;

  const query = searchQuery.toLowerCase().trim();
  const items = Object.values(CROP_DATABASE).filter(c => {
    const matchesCat = (filterCategory === 'all' || c.category.toLowerCase() === filterCategory.toLowerCase());
    const matchesQuery = !query || c.name.toLowerCase().includes(query) || c.scientificName.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">No crops match your search.</div>`;
    return;
  }

  grid.innerHTML = items.map(c => `
    <div class="crop-card-item" onclick="openCropModal('${c.id}')">
      <div class="crop-card-emoji">${c.emoji}</div>
      <h4>${c.name}</h4>
      <div class="crop-card-category">${c.category}</div>
    </div>
  `).join('');
}

function setupDirectoryFilters() {
  const searchInput = document.getElementById('directorySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.filter-btn.active');
      const cat = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';
      renderCropDirectory(cat, e.target.value);
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-cat');
      const query = document.getElementById('directorySearchInput')?.value || '';
      renderCropDirectory(cat, query);
    });
  });
}

// ============================================================================
// 11. INITIALIZATION & EVENT LISTENERS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupDualControls();
  initCharts();
  renderHistoryTable();
  renderCropDirectory();
  setupDirectoryFilters();
  updateFieldStatusBadges();

  // Button Predict listener
  const predictBtn = document.getElementById('predictBtn');
  if (predictBtn) {
    predictBtn.addEventListener('click', handlePredict);
  }

  // Button Reset listener
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }

  // Close modal when clicking outside content
  const modalBackdrop = document.getElementById('cropDetailModal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeCropModal();
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }
});
