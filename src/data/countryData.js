// ══════════════════════════════════════════════════════════════
// FinanceOS — Geopolitical Country Intelligence Data
// ══════════════════════════════════════════════════════════════

export const countryData = {
    'United States': {
        code: 'US', flag: '🇺🇸',
        politics: {
            headOfState: 'Donald Trump', title: 'President',
            party: 'Republican Party', ideology: 'Conservative',
            lastElection: 'Nov 2024', nextElection: 'Nov 2028',
            result: 'Won 312 EC votes (R+4.8%)',
            opposition: 'Democratic Party',
            democracyIndex: 7.85, freedomHouse: 83,
            govType: 'Federal Presidential Republic',
            parliament: { ruling: 55, opposition: 45 }
        },
        geopolitics: {
            alignment: 85, // 0=East, 50=Neutral, 100=West
            alignmentTrend: 'stable',
            alliances: ['NATO', 'AUKUS', 'Quad', 'Five Eyes', 'G7'],
            allies: ['United Kingdom', 'Japan', 'Australia', 'South Korea', 'Israel'],
            adversaries: ['Russia', 'China', 'Iran', 'North Korea'],
            nuclearStatus: 'Armed (5,500+ warheads)',
            unVoting: { us: 100, china: 15, russia: 12 },
            disputes: ['South China Sea FON ops', 'Taiwan support'],
            sanctions: 'None (Issuer)'
        },
        economy: {
            gdp: '$28.78T', gdpPerCapita: '$85,370',
            tradeBalance: '-$773B (deficit)',
            topExports: [{ partner: 'Canada', pct: 17 }, { partner: 'Mexico', pct: 16 }, { partner: 'China', pct: 7 }],
            topImports: [{ partner: 'China', pct: 14 }, { partner: 'Mexico', pct: 15 }, { partner: 'Canada', pct: 13 }],
            resources: ['Oil/Gas (net exporter)', 'Tech/IP', 'Agriculture'],
            currency: 'USD', centralBankRate: '4.50%',
            debtToGdp: '123%', creditRating: 'AA+/Aaa'
        },
        risk: {
            stability: 7, conflictLevel: 'LOW',
            corruptionRank: 24, pressFreedom: 45,
            overallRisk: 'LOW'
        }
    },
    'China': {
        code: 'CN', flag: '🇨🇳',
        politics: {
            headOfState: 'Xi Jinping', title: 'President / General Secretary',
            party: 'Chinese Communist Party', ideology: 'Authoritarian / State Capitalist',
            lastElection: 'Mar 2023 (NPC)', nextElection: 'Mar 2028 (NPC)',
            result: 'Unanimous — single-party state',
            opposition: 'None (single-party)',
            democracyIndex: 1.94, freedomHouse: 9,
            govType: 'Single-Party Socialist Republic',
            parliament: { ruling: 100, opposition: 0 }
        },
        geopolitics: {
            alignment: 15,
            alignmentTrend: 'east',
            alliances: ['SCO', 'BRICS+'],
            allies: ['Russia', 'Pakistan', 'North Korea', 'Iran'],
            adversaries: ['United States', 'Japan', 'India', 'Taiwan'],
            nuclearStatus: 'Armed (500+ warheads, expanding)',
            unVoting: { us: 15, china: 100, russia: 78 },
            disputes: ['Taiwan', 'South China Sea', 'India border (LAC)', 'Senkaku Islands'],
            sanctions: 'Partial (tech export controls)'
        },
        economy: {
            gdp: '$18.53T', gdpPerCapita: '$13,140',
            tradeBalance: '+$823B (surplus)',
            topExports: [{ partner: 'United States', pct: 16 }, { partner: 'EU', pct: 15 }, { partner: 'ASEAN', pct: 15 }],
            topImports: [{ partner: 'ASEAN', pct: 15 }, { partner: 'EU', pct: 11 }, { partner: 'Australia', pct: 8 }],
            resources: ['Rare Earths (dominant)', 'Manufacturing', 'Solar/EV'],
            currency: 'CNY', centralBankRate: '3.10%',
            debtToGdp: '83%', creditRating: 'A+/A1'
        },
        risk: {
            stability: 8, conflictLevel: 'MED',
            corruptionRank: 76, pressFreedom: 179,
            overallRisk: 'MED'
        }
    },
    'Russia': {
        code: 'RU', flag: '🇷🇺',
        politics: {
            headOfState: 'Vladimir Putin', title: 'President',
            party: 'United Russia', ideology: 'Authoritarian Nationalist',
            lastElection: 'Mar 2024', nextElection: 'Mar 2030',
            result: 'Won 87.3% (contested)',
            opposition: 'Suppressed',
            democracyIndex: 2.22, freedomHouse: 16,
            govType: 'Federal Semi-Presidential Republic',
            parliament: { ruling: 72, opposition: 28 }
        },
        geopolitics: {
            alignment: 10,
            alignmentTrend: 'east',
            alliances: ['CSTO', 'SCO', 'BRICS+'],
            allies: ['China', 'Iran', 'North Korea', 'Belarus', 'Syria'],
            adversaries: ['United States', 'NATO', 'Ukraine', 'EU'],
            nuclearStatus: 'Armed (6,200+ warheads — largest arsenal)',
            unVoting: { us: 12, china: 78, russia: 100 },
            disputes: ['Ukraine (active war)', 'Crimea', 'Kuril Islands', 'Georgia'],
            sanctions: 'Heavy (Western coalition)'
        },
        economy: {
            gdp: '$2.24T', gdpPerCapita: '$15,350',
            tradeBalance: '+$120B (surplus)',
            topExports: [{ partner: 'China', pct: 22 }, { partner: 'India', pct: 18 }, { partner: 'Turkey', pct: 7 }],
            topImports: [{ partner: 'China', pct: 38 }, { partner: 'Turkey', pct: 6 }, { partner: 'Belarus', pct: 5 }],
            resources: ['Oil/Gas (major exporter)', 'Wheat', 'Metals'],
            currency: 'RUB', centralBankRate: '21.00%',
            debtToGdp: '22%', creditRating: 'NR (sanctioned)'
        },
        risk: {
            stability: 5, conflictLevel: 'HIGH',
            corruptionRank: 141, pressFreedom: 164,
            overallRisk: 'HIGH'
        }
    },
    'United Kingdom': {
        code: 'GB', flag: '🇬🇧',
        politics: {
            headOfState: 'Keir Starmer', title: 'Prime Minister',
            party: 'Labour Party', ideology: 'Centre-Left / Social Democrat',
            lastElection: 'Jul 2024', nextElection: 'Jul 2029',
            result: 'Won 411/650 seats (landslide)',
            opposition: 'Conservative Party',
            democracyIndex: 8.54, freedomHouse: 91,
            govType: 'Constitutional Monarchy / Parliamentary',
            parliament: { ruling: 63, opposition: 37 }
        },
        geopolitics: {
            alignment: 90,
            alignmentTrend: 'stable',
            alliances: ['NATO', 'AUKUS', 'Five Eyes', 'G7', 'CPTPP'],
            allies: ['United States', 'France', 'Australia', 'Japan'],
            adversaries: ['Russia'],
            nuclearStatus: 'Armed (225 warheads)',
            unVoting: { us: 82, china: 18, russia: 14 },
            disputes: ['Gibraltar', 'Falklands'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$3.34T', gdpPerCapita: '$49,400',
            tradeBalance: '-$44B',
            topExports: [{ partner: 'United States', pct: 20 }, { partner: 'EU', pct: 42 }, { partner: 'China', pct: 5 }],
            topImports: [{ partner: 'EU', pct: 40 }, { partner: 'China', pct: 12 }, { partner: 'United States', pct: 9 }],
            resources: ['Financial Services', 'Pharma', 'North Sea Oil'],
            currency: 'GBP', centralBankRate: '4.50%',
            debtToGdp: '101%', creditRating: 'AA/Aa3'
        },
        risk: {
            stability: 8, conflictLevel: 'LOW',
            corruptionRank: 18, pressFreedom: 26,
            overallRisk: 'LOW'
        }
    },
    'Germany': {
        code: 'DE', flag: '🇩🇪',
        politics: {
            headOfState: 'Friedrich Merz', title: 'Chancellor',
            party: 'CDU/CSU', ideology: 'Centre-Right / Christian Democrat',
            lastElection: 'Feb 2025', nextElection: '2029',
            result: 'CDU/CSU 28.5% — coalition forming',
            opposition: 'SPD / AfD / Greens',
            democracyIndex: 8.67, freedomHouse: 94,
            govType: 'Federal Parliamentary Republic',
            parliament: { ruling: 52, opposition: 48 }
        },
        geopolitics: {
            alignment: 82,
            alignmentTrend: 'stable',
            alliances: ['NATO', 'EU', 'G7'],
            allies: ['France', 'United States', 'Poland'],
            adversaries: ['Russia'],
            nuclearStatus: 'None (NATO nuclear sharing)',
            unVoting: { us: 65, china: 22, russia: 18 },
            disputes: ['None active'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$4.46T', gdpPerCapita: '$53,100',
            tradeBalance: '+$211B (surplus)',
            topExports: [{ partner: 'United States', pct: 9 }, { partner: 'France', pct: 8 }, { partner: 'China', pct: 7 }],
            topImports: [{ partner: 'China', pct: 12 }, { partner: 'Netherlands', pct: 9 }, { partner: 'Poland', pct: 6 }],
            resources: ['Auto Industry', 'Engineering', 'Chemical'],
            currency: 'EUR', centralBankRate: '2.90%',
            debtToGdp: '64%', creditRating: 'AAA/Aaa'
        },
        risk: {
            stability: 8, conflictLevel: 'LOW',
            corruptionRank: 9, pressFreedom: 21,
            overallRisk: 'LOW'
        }
    },
    'India': {
        code: 'IN', flag: '🇮🇳',
        politics: {
            headOfState: 'Narendra Modi', title: 'Prime Minister',
            party: 'BJP (NDA coalition)', ideology: 'Hindu Nationalist / Right',
            lastElection: 'Jun 2024', nextElection: '2029',
            result: 'NDA 293 seats (reduced majority)',
            opposition: 'INDIA Alliance (Congress-led)',
            democracyIndex: 7.18, freedomHouse: 66,
            govType: 'Federal Parliamentary Republic',
            parliament: { ruling: 54, opposition: 46 }
        },
        geopolitics: {
            alignment: 50,
            alignmentTrend: 'stable',
            alliances: ['Quad', 'BRICS+', 'SCO'],
            allies: ['France', 'Japan', 'Israel', 'United States'],
            adversaries: ['Pakistan', 'China'],
            nuclearStatus: 'Armed (170+ warheads)',
            unVoting: { us: 35, china: 40, russia: 45 },
            disputes: ['Kashmir (Pakistan)', 'LAC (China)', 'Aksai Chin'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$3.94T', gdpPerCapita: '$2,730',
            tradeBalance: '-$242B (deficit)',
            topExports: [{ partner: 'United States', pct: 18 }, { partner: 'UAE', pct: 7 }, { partner: 'Netherlands', pct: 4 }],
            topImports: [{ partner: 'China', pct: 15 }, { partner: 'UAE', pct: 7 }, { partner: 'Saudi Arabia', pct: 7 }],
            resources: ['IT Services', 'Pharma', 'Textiles'],
            currency: 'INR', centralBankRate: '6.25%',
            debtToGdp: '83%', creditRating: 'BBB-/Baa3'
        },
        risk: {
            stability: 6, conflictLevel: 'MED',
            corruptionRank: 93, pressFreedom: 161,
            overallRisk: 'MED'
        }
    },
    'Iran': {
        code: 'IR', flag: '🇮🇷',
        politics: {
            headOfState: 'Masoud Pezeshkian', title: 'President',
            party: 'Reformist', ideology: 'Islamic Republic / Theocratic',
            lastElection: 'Jul 2024', nextElection: '2028',
            result: 'Won runoff 53.6% (reformist upset)',
            opposition: 'Principlist faction',
            democracyIndex: 1.96, freedomHouse: 14,
            govType: 'Theocratic Presidential Republic',
            parliament: { ruling: 45, opposition: 55 }
        },
        geopolitics: {
            alignment: 15,
            alignmentTrend: 'east',
            alliances: ['BRICS+', 'SCO'],
            allies: ['Russia', 'China', 'Syria', 'Hezbollah', 'Houthis'],
            adversaries: ['United States', 'Israel', 'Saudi Arabia'],
            nuclearStatus: 'Threshold (enriching to 60%+)',
            unVoting: { us: 8, china: 72, russia: 75 },
            disputes: ['Nuclear program', 'Strait of Hormuz', 'Proxy wars (Yemen, Lebanon)'],
            sanctions: 'Heavy (US/EU)'
        },
        economy: {
            gdp: '$0.40T', gdpPerCapita: '$4,600',
            tradeBalance: '+$15B',
            topExports: [{ partner: 'China', pct: 30 }, { partner: 'Turkey', pct: 10 }, { partner: 'UAE', pct: 9 }],
            topImports: [{ partner: 'China', pct: 32 }, { partner: 'UAE', pct: 15 }, { partner: 'Turkey', pct: 10 }],
            resources: ['Oil/Gas (massive reserves)', 'Petrochemicals'],
            currency: 'IRR', centralBankRate: '23.00%',
            debtToGdp: '42%', creditRating: 'NR'
        },
        risk: {
            stability: 3, conflictLevel: 'HIGH',
            corruptionRank: 149, pressFreedom: 176,
            overallRisk: 'CRIT'
        }
    },
    'Japan': {
        code: 'JP', flag: '🇯🇵',
        politics: {
            headOfState: 'Shigeru Ishiba', title: 'Prime Minister',
            party: 'Liberal Democratic Party (LDP)', ideology: 'Conservative / Centre-Right',
            lastElection: 'Oct 2024', nextElection: '2027',
            result: 'LDP lost majority — minority gov',
            opposition: 'Constitutional Democratic Party',
            democracyIndex: 8.33, freedomHouse: 96,
            govType: 'Constitutional Monarchy / Parliamentary',
            parliament: { ruling: 48, opposition: 52 }
        },
        geopolitics: {
            alignment: 88,
            alignmentTrend: 'west',
            alliances: ['US-Japan Alliance', 'Quad', 'G7'],
            allies: ['United States', 'Australia', 'India', 'South Korea'],
            adversaries: ['North Korea', 'China', 'Russia'],
            nuclearStatus: 'None (latent capability)',
            unVoting: { us: 78, china: 20, russia: 15 },
            disputes: ['Senkaku/Diaoyu Islands (China)', 'Kuril Islands (Russia)', 'Dokdo (Korea)'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$4.19T', gdpPerCapita: '$33,950',
            tradeBalance: '-$46B',
            topExports: [{ partner: 'United States', pct: 20 }, { partner: 'China', pct: 18 }, { partner: 'South Korea', pct: 7 }],
            topImports: [{ partner: 'China', pct: 21 }, { partner: 'Australia', pct: 10 }, { partner: 'United States', pct: 9 }],
            resources: ['Auto/Electronics', 'Robotics', 'Semiconductor equipment'],
            currency: 'JPY', centralBankRate: '0.50%',
            debtToGdp: '264%', creditRating: 'A+/A1'
        },
        risk: {
            stability: 9, conflictLevel: 'LOW',
            corruptionRank: 16, pressFreedom: 68,
            overallRisk: 'LOW'
        }
    },
    'Saudi Arabia': {
        code: 'SA', flag: '🇸🇦',
        politics: {
            headOfState: 'Mohammed bin Salman (MBS)', title: 'Crown Prince / PM',
            party: 'Absolute Monarchy', ideology: 'Authoritarian / Modernizing',
            lastElection: 'N/A (monarchy)', nextElection: 'N/A',
            result: 'N/A — hereditary succession',
            opposition: 'None (banned)',
            democracyIndex: 2.08, freedomHouse: 7,
            govType: 'Absolute Monarchy',
            parliament: { ruling: 100, opposition: 0 }
        },
        geopolitics: {
            alignment: 55,
            alignmentTrend: 'neutral',
            alliances: ['GCC', 'OPEC+', 'BRICS+'],
            allies: ['United States', 'UAE', 'Egypt', 'Pakistan'],
            adversaries: ['Iran', 'Houthis (Yemen)'],
            nuclearStatus: 'None (civilian program planned)',
            unVoting: { us: 42, china: 38, russia: 35 },
            disputes: ['Yemen civil war', 'Iran rivalry', 'Qatar (resolved)'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$1.07T', gdpPerCapita: '$30,450',
            tradeBalance: '+$175B (surplus)',
            topExports: [{ partner: 'China', pct: 18 }, { partner: 'India', pct: 12 }, { partner: 'Japan', pct: 10 }],
            topImports: [{ partner: 'China', pct: 22 }, { partner: 'United States', pct: 8 }, { partner: 'UAE', pct: 6 }],
            resources: ['Oil (world\'s largest exporter)', 'Petrochemicals'],
            currency: 'SAR', centralBankRate: '5.50%',
            debtToGdp: '26%', creditRating: 'A/A1'
        },
        risk: {
            stability: 7, conflictLevel: 'MED',
            corruptionRank: 52, pressFreedom: 170,
            overallRisk: 'MED'
        }
    },
    'Ukraine': {
        code: 'UA', flag: '🇺🇦',
        politics: {
            headOfState: 'Volodymyr Zelenskyy', title: 'President',
            party: 'Servant of the People', ideology: 'Centrist / Pro-EU',
            lastElection: 'Apr 2019', nextElection: 'Postponed (martial law)',
            result: 'Won 73% in 2019 runoff',
            opposition: 'Multi-party (elections suspended)',
            democracyIndex: 5.42, freedomHouse: 50,
            govType: 'Semi-Presidential Republic (Wartime)',
            parliament: { ruling: 58, opposition: 42 }
        },
        geopolitics: {
            alignment: 92,
            alignmentTrend: 'west',
            alliances: ['EU Candidate', 'NATO aspirant'],
            allies: ['United States', 'EU/NATO members', 'United Kingdom'],
            adversaries: ['Russia', 'Belarus'],
            nuclearStatus: 'None (surrendered 1994)',
            unVoting: { us: 88, china: 12, russia: 5 },
            disputes: ['Russian invasion (active war)', 'Crimea', 'Donbas'],
            sanctions: 'None (recipient of aid)'
        },
        economy: {
            gdp: '$0.18T', gdpPerCapita: '$4,530',
            tradeBalance: '-$25B',
            topExports: [{ partner: 'EU', pct: 60 }, { partner: 'China', pct: 8 }, { partner: 'Turkey', pct: 5 }],
            topImports: [{ partner: 'EU', pct: 52 }, { partner: 'China', pct: 16 }, { partner: 'Turkey', pct: 3 }],
            resources: ['Agriculture (grain)', 'Metals', 'IT outsourcing'],
            currency: 'UAH', centralBankRate: '14.50%',
            debtToGdp: '85%', creditRating: 'CC (selective default risk)'
        },
        risk: {
            stability: 2, conflictLevel: 'CRIT',
            corruptionRank: 104, pressFreedom: 79,
            overallRisk: 'CRIT'
        }
    },
    'Israel': {
        code: 'IL', flag: '🇮🇱',
        politics: {
            headOfState: 'Benjamin Netanyahu', title: 'Prime Minister',
            party: 'Likud (coalition)', ideology: 'Right-Wing / Nationalist',
            lastElection: 'Nov 2022', nextElection: '2026',
            result: 'Right-religious bloc 64/120 seats',
            opposition: 'Yesh Atid / National Unity',
            democracyIndex: 7.97, freedomHouse: 74,
            govType: 'Parliamentary Republic',
            parliament: { ruling: 53, opposition: 47 }
        },
        geopolitics: {
            alignment: 82,
            alignmentTrend: 'stable',
            alliances: ['US Strategic Ally', 'Abraham Accords'],
            allies: ['United States', 'UAE', 'Bahrain', 'India'],
            adversaries: ['Iran', 'Hezbollah', 'Hamas', 'Syria'],
            nuclearStatus: 'Undeclared (est. 90 warheads)',
            unVoting: { us: 88, china: 12, russia: 10 },
            disputes: ['Gaza conflict (active)', 'West Bank', 'Golan Heights', 'Lebanon border'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$0.53T', gdpPerCapita: '$55,500',
            tradeBalance: '-$18B',
            topExports: [{ partner: 'United States', pct: 26 }, { partner: 'EU', pct: 20 }, { partner: 'China', pct: 8 }],
            topImports: [{ partner: 'China', pct: 12 }, { partner: 'United States', pct: 11 }, { partner: 'EU', pct: 30 }],
            resources: ['Tech/Cyber', 'Diamonds', 'Pharma', 'Natural Gas'],
            currency: 'ILS', centralBankRate: '4.50%',
            debtToGdp: '62%', creditRating: 'A+/A1'
        },
        risk: {
            stability: 4, conflictLevel: 'HIGH',
            corruptionRank: 31, pressFreedom: 101,
            overallRisk: 'HIGH'
        }
    },
    'Turkey': {
        code: 'TR', flag: '🇹🇷',
        politics: {
            headOfState: 'Recep Tayyip Erdoğan', title: 'President',
            party: 'AKP', ideology: 'Conservative / Islamist',
            lastElection: 'May 2023', nextElection: '2028',
            result: 'Won runoff 52.2%',
            opposition: 'CHP (Kemal Kılıçdaroğlu)',
            democracyIndex: 4.35, freedomHouse: 32,
            govType: 'Presidential Republic',
            parliament: { ruling: 55, opposition: 45 }
        },
        geopolitics: {
            alignment: 50,
            alignmentTrend: 'neutral',
            alliances: ['NATO', 'OIC'],
            allies: ['Azerbaijan', 'Pakistan', 'Qatar'],
            adversaries: ['PKK/YPG', 'Greece (tensions)'],
            nuclearStatus: 'None (NATO nuclear sharing)',
            unVoting: { us: 35, china: 30, russia: 30 },
            disputes: ['Cyprus', 'Aegean Sea (Greece)', 'Syria/Kurdish issue'],
            sanctions: 'Partial (CAATSA — S-400 purchase)'
        },
        economy: {
            gdp: '$1.11T', gdpPerCapita: '$12,800',
            tradeBalance: '-$96B',
            topExports: [{ partner: 'Germany', pct: 10 }, { partner: 'United States', pct: 7 }, { partner: 'Iraq', pct: 6 }],
            topImports: [{ partner: 'Russia', pct: 12 }, { partner: 'China', pct: 12 }, { partner: 'Germany', pct: 8 }],
            resources: ['Manufacturing', 'Agriculture', 'Tourism', 'Drones (defense)'],
            currency: 'TRY', centralBankRate: '45.00%',
            debtToGdp: '34%', creditRating: 'B+/B3'
        },
        risk: {
            stability: 5, conflictLevel: 'MED',
            corruptionRank: 115, pressFreedom: 165,
            overallRisk: 'MED'
        }
    },
    'France': {
        code: 'FR', flag: '🇫🇷',
        politics: {
            headOfState: 'Emmanuel Macron', title: 'President',
            party: 'Renaissance (centrist)', ideology: 'Liberal Centrist',
            lastElection: 'Jul 2024 (legislative)', nextElection: '2027 (presidential)',
            result: 'Hung parliament — no majority',
            opposition: 'RN (far-right) / NFP (left)',
            democracyIndex: 8.07, freedomHouse: 89,
            govType: 'Semi-Presidential Republic',
            parliament: { ruling: 35, opposition: 65 }
        },
        geopolitics: {
            alignment: 78,
            alignmentTrend: 'stable',
            alliances: ['NATO', 'EU', 'G7', 'P5 (UNSC)'],
            allies: ['Germany', 'United Kingdom', 'United States', 'India'],
            adversaries: ['Russia'],
            nuclearStatus: 'Armed (290 warheads)',
            unVoting: { us: 62, china: 25, russia: 20 },
            disputes: ['None active (overseas territories)'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$3.05T', gdpPerCapita: '$45,000',
            tradeBalance: '-$84B',
            topExports: [{ partner: 'Germany', pct: 14 }, { partner: 'Italy', pct: 8 }, { partner: 'United States', pct: 8 }],
            topImports: [{ partner: 'Germany', pct: 14 }, { partner: 'Belgium', pct: 9 }, { partner: 'China', pct: 9 }],
            resources: ['Aerospace (Airbus)', 'Luxury Goods', 'Nuclear Energy', 'Agriculture'],
            currency: 'EUR', centralBankRate: '2.90%',
            debtToGdp: '112%', creditRating: 'AA-/Aa2'
        },
        risk: {
            stability: 6, conflictLevel: 'LOW',
            corruptionRank: 21, pressFreedom: 24,
            overallRisk: 'LOW'
        }
    },
    'North Korea': {
        code: 'KP', flag: '🇰🇵',
        politics: {
            headOfState: 'Kim Jong Un', title: 'Supreme Leader',
            party: "Workers' Party of Korea", ideology: 'Totalitarian / Juche',
            lastElection: 'N/A (single-party)', nextElection: 'N/A',
            result: 'N/A — hereditary dictatorship',
            opposition: 'None',
            democracyIndex: 1.08, freedomHouse: 3,
            govType: 'Single-Party Totalitarian State',
            parliament: { ruling: 100, opposition: 0 }
        },
        geopolitics: {
            alignment: 5,
            alignmentTrend: 'east',
            alliances: ['Mutual aid with Russia (2024 pact)'],
            allies: ['Russia', 'China'],
            adversaries: ['United States', 'South Korea', 'Japan'],
            nuclearStatus: 'Armed (50+ warheads, ICBM capable)',
            unVoting: { us: 2, china: 85, russia: 88 },
            disputes: ['Korean Peninsula (active standoff)', 'Nuclear weapons program'],
            sanctions: 'Maximum (UN/US/EU)'
        },
        economy: {
            gdp: '$0.03T (est.)', gdpPerCapita: '$1,300 (est.)',
            tradeBalance: 'Negligible',
            topExports: [{ partner: 'China', pct: 90 }],
            topImports: [{ partner: 'China', pct: 95 }],
            resources: ['Coal', 'Textiles', 'Arms exports (illicit)'],
            currency: 'KPW', centralBankRate: 'N/A',
            debtToGdp: 'N/A', creditRating: 'NR'
        },
        risk: {
            stability: 6, conflictLevel: 'HIGH',
            corruptionRank: 172, pressFreedom: 180,
            overallRisk: 'CRIT'
        }
    },
    'Brazil': {
        code: 'BR', flag: '🇧🇷',
        politics: {
            headOfState: 'Luiz Inácio Lula da Silva', title: 'President',
            party: 'PT (Workers Party)', ideology: 'Centre-Left / Social Democrat',
            lastElection: 'Oct 2022', nextElection: 'Oct 2026',
            result: 'Won runoff 50.9% (narrow)',
            opposition: 'PL (Bolsonaro faction)',
            democracyIndex: 6.68, freedomHouse: 72,
            govType: 'Federal Presidential Republic',
            parliament: { ruling: 45, opposition: 55 }
        },
        geopolitics: {
            alignment: 45,
            alignmentTrend: 'neutral',
            alliances: ['BRICS+', 'Mercosur', 'UNASUR'],
            allies: ['Argentina', 'China', 'India'],
            adversaries: ['None formal'],
            nuclearStatus: 'None',
            unVoting: { us: 30, china: 42, russia: 38 },
            disputes: ['None active'],
            sanctions: 'None'
        },
        economy: {
            gdp: '$2.13T', gdpPerCapita: '$9,920',
            tradeBalance: '+$80B (surplus)',
            topExports: [{ partner: 'China', pct: 31 }, { partner: 'United States', pct: 11 }, { partner: 'Argentina', pct: 4 }],
            topImports: [{ partner: 'China', pct: 22 }, { partner: 'United States', pct: 18 }, { partner: 'Germany', pct: 5 }],
            resources: ['Soybeans', 'Iron Ore', 'Oil (pre-salt)', 'Beef'],
            currency: 'BRL', centralBankRate: '13.25%',
            debtToGdp: '74%', creditRating: 'BB/Ba2'
        },
        risk: {
            stability: 6, conflictLevel: 'LOW',
            corruptionRank: 104, pressFreedom: 92,
            overallRisk: 'MED'
        }
    },
};

// ─── Country Name → Lat/Lng (center points for click detection) ───
export const countryCoords = {
    'United States': { lat: 39.8, lng: -98.6 },
    'China': { lat: 35.0, lng: 105.0 },
    'Russia': { lat: 60.0, lng: 100.0 },
    'United Kingdom': { lat: 54.0, lng: -2.0 },
    'Germany': { lat: 51.2, lng: 10.5 },
    'India': { lat: 22.0, lng: 78.0 },
    'Iran': { lat: 32.4, lng: 53.7 },
    'Japan': { lat: 36.2, lng: 138.3 },
    'Saudi Arabia': { lat: 24.7, lng: 45.1 },
    'Ukraine': { lat: 48.4, lng: 31.2 },
    'Israel': { lat: 31.0, lng: 34.8 },
    'Turkey': { lat: 39.9, lng: 32.9 },
    'France': { lat: 46.6, lng: 2.2 },
    'North Korea': { lat: 40.3, lng: 127.5 },
    'Brazil': { lat: -14.2, lng: -51.9 },
};
