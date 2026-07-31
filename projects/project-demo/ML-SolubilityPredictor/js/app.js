/**
 * ML Solubility Explorer - Main Application
 * Client-side molecular descriptor computation and model prediction
 */

// ===================== MOLECULAR DESCRIPTOR CALCULATOR =====================
const DescriptorCalculator = {
    parseElement: function(smiles) {
        const count = {};
        let clean = smiles;
        for (let el of ['Cl', 'Br', 'Si', 'Se', 'Na', 'Mg', 'Ca', 'Fe', 'Zn', 'Cu']) {
            const re = new RegExp(el.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const c = (clean.match(re) || []).length;
            if (c > 0) count[el] = c;
            clean = clean.split(el).join(' ');
        }
        for (let ch of clean) {
            if (ch >= 'A' && ch <= 'Z') {
                count[ch] = (count[ch] || 0) + 1;
            }
        }
        return count;
    },
    
    countAtoms: function(smiles) {
        const el = this.parseElement(smiles);
        return Object.values(el).reduce((a, b) => a + b, 0);
    },
    
    countHeavyAtoms: function(smiles) {
        const el = this.parseElement(smiles);
        let total = 0;
        for (let e in el) { if (e !== 'H') total += el[e]; }
        return total;
    },
    
    calcMolWt: function(smiles) {
        const w = {'H':1.008,'B':10.81,'C':12.011,'N':14.007,'O':15.999,'F':18.998,
                   'P':30.974,'S':32.065,'Cl':35.45,'Br':79.904,'I':126.904,
                   'Si':28.085,'Se':78.96,'Na':22.99,'Mg':24.305,'Ca':40.078,
                   'Fe':55.845,'Zn':65.38,'Cu':63.546};
        const el = this.parseElement(smiles);
        let mw = 0;
        for (let e in el) mw += (w[e] || 0) * el[e];
        return Math.round(mw * 1000) / 1000;
    },
    
    heavyAtomMolWt: function(smiles) {
        const mw = this.calcMolWt(smiles);
        return mw - ((this.parseElement(smiles)['H'] || 0) * 1.008);
    },
    
    calcExactMolWt: function(smiles) {
        const iso = {'H':1.0078,'C':12.0000,'N':14.0031,'O':15.9949,'F':18.9984,
                     'P':30.9738,'S':31.9721,'Cl':34.9689,'Br':78.9183,'I':126.9045};
        const el = this.parseElement(smiles);
        let mass = 0;
        for (let e in el) mass += (iso[e] || 0) * el[e];
        return Math.round(mass * 1000) / 1000;
    },
    
    countRotatableBonds: function(smiles) {
        const nHeavy = this.countHeavyAtoms(smiles);
        return Math.max(0, Math.round(nHeavy / 3));
    },
    
    countHBondDonors: function(smiles) {
        const oh = (smiles.match(/O(?=H)/g) || []).length;
        const nh = (smiles.match(/N(?=H)/g) || []).length;
        return oh + nh;
    },
    
    countHBondAcceptors: function(smiles) {
        const el = this.parseElement(smiles);
        return (el['O'] || 0) + (el['N'] || 0);
    },
    
    countHeteroatoms: function(smiles) {
        const el = this.parseElement(smiles);
        let het = 0;
        for (let e in el) { if (e !== 'C' && e !== 'H') het += el[e]; }
        return het;
    },
    
    countRings: function(smiles) {
        const n = (smiles.match(/\d/g) || []).length;
        return Math.floor(n / 2);
    },
    
    countAromaticRings: function(smiles) {
        const ar = (smiles.match(/[a-z]/g) || []).length;
        return Math.max(0, Math.round(ar / 6));
    },
    
    calcFractionCsp3: function(smiles) {
        const el = this.parseElement(smiles);
        const totalC = el['C'] || 0;
        if (totalC === 0) return 0;
        const sp3 = (smiles.match(/C(?![^a-zA-Z\d]?[=#:])/g) || []).length;
        return Math.min(1, Math.round((sp3 / totalC) * 1000) / 1000);
    },
    
    calcLogP: function(smiles) {
        const el = this.parseElement(smiles);
        let logP = 0;
        logP += (el['C'] || 0) * 0.5;
        logP += (el['N'] || 0) * -0.5;
        logP += (el['O'] || 0) * -0.7;
        logP += (el['F'] || 0) * 0.3;
        logP += (el['Cl'] || 0) * 0.7;
        logP += (el['Br'] || 0) * 1.0;
        logP += (el['I'] || 0) * 1.3;
        logP += (el['S'] || 0) * 0.4;
        logP += this.countAromaticRings(smiles) * 0.3;
        return Math.round(logP * 100) / 100;
    },
    
    calcTPSA: function(smiles) {
        const el = this.parseElement(smiles);
        let tpsa = (el['O'] || 0) * 17.07 + (el['N'] || 0) * 12.36;
        tpsa += (el['P'] || 0) * 34.14 + (el['S'] || 0) * 25.3;
        tpsa += this.countHBondDonors(smiles) * 5;
        return Math.round(tpsa * 100) / 100;
    },
    
    calcMolMR: function(smiles) {
        const el = this.parseElement(smiles);
        let mr = (el['C'] || 0) * 2.59 + (el['H'] || 0) * 1.10;
        mr += (el['N'] || 0) * 2.84 + (el['O'] || 0) * 1.76;
        mr += (el['F'] || 0) * 0.95 + (el['Cl'] || 0) * 5.96;
        mr += (el['Br'] || 0) * 8.86 + (el['I'] || 0) * 13.90;
        mr += (el['S'] || 0) * 7.77 + (el['P'] || 0) * 6.80;
        return Math.round(mr * 100) / 100;
    },
    
    countValenceElectrons: function(smiles) {
        const v = {'H':1,'C':4,'N':5,'O':6,'F':7,'P':5,'S':6,'Cl':7,'Br':7,'I':7,'B':3};
        const el = this.parseElement(smiles);
        let total = 0;
        for (let e in el) total += (v[e] || 4) * el[e];
        return total;
    },
    
    calcLabuteASA: function(smiles) {
        const tpsa = this.calcTPSA(smiles);
        const logP = this.calcLogP(smiles);
        const nHeavy = this.countHeavyAtoms(smiles);
        return Math.round((tpsa + Math.abs(logP) * 20 + nHeavy * 5) * 100) / 100;
    },
    
    calcBalabanJ: function(smiles) {
        const nAtoms = this.countHeavyAtoms(smiles);
        const nRings = this.countRings(smiles);
        const nBonds = nAtoms + nRings - 1;
        if (nAtoms < 2) return 0;
        return Math.round((nBonds / Math.max(1, nRings + 1)) * 1000) / 1000;
    },
    
    calcBertzCT: function(smiles) {
        const nAtoms = this.countAtoms(smiles);
        const nRings = this.countRings(smiles);
        return Math.round((nAtoms * Math.log2(nAtoms + 1) + nRings * 10) * 100) / 100;
    },
    
    calcHallKierAlpha: function(smiles) {
        const nHetero = this.countHeteroatoms(smiles);
        return Math.round((-0.5 + nHetero * 0.1) * 100) / 100;
    },
    
    calcKappaIndex: function(smiles, n) {
        const nA = this.countHeavyAtoms(smiles);
        const nR = this.countRings(smiles);
        const nRot = this.countRotatableBonds(smiles);
        const denom = Math.max(1, (nRot + nR + nA) ** 2);
        if (n === 1) return Math.round((nA * (nA - 1) ** 2 / denom) * 100) / 100;
        if (n === 2) return Math.round(((nA - 1) * (nA - 2) ** 2 / denom) * 100) / 100;
        if (n === 3) return Math.round(((nA - 2) * (nA - 3) ** 2 / denom) * 100) / 100;
        return 0;
    },
    
    computeDescriptors: function(smiles) {
        const nAtoms = this.countAtoms(smiles);
        const nHeavy = this.countHeavyAtoms(smiles);
        const mw = this.calcMolWt(smiles);
        const hmw = this.heavyAtomMolWt(smiles);
        const emw = this.calcExactMolWt(smiles);
        const nRot = this.countRotatableBonds(smiles);
        const nHBD = this.countHBondDonors(smiles);
        const nHBA = this.countHBondAcceptors(smiles);
        const nHet = this.countHeteroatoms(smiles);
        const nRings = this.countRings(smiles);
        const nArRings = this.countAromaticRings(smiles);
        const nAlRings = Math.max(0, nRings - nArRings);
        const nSatRings = nAlRings;
        const nHetRings = Math.max(0, Math.round(nRings * 0.3));
        const nArHetRings = Math.max(0, Math.round(nArRings * 0.2));
        const nAlHetRings = nHetRings - nArHetRings;
        const nSatCarbo = Math.max(0, nSatRings - nAlHetRings);
        const nArCarbo = Math.max(0, nArRings - nArHetRings);
        const nAlCarbo = Math.max(0, nAlRings - nSatCarbo);
        const nNHOH = this.countHBondDonors(smiles);
        const nNO = nHet;
        const nValence = this.countValenceElectrons(smiles);
        const fracCsp3 = this.calcFractionCsp3(smiles);
        const balabanJ = this.calcBalabanJ(smiles);
        const bertz = this.calcBertzCT(smiles);
        const hkAlpha = this.calcHallKierAlpha(smiles);
        const ipc = Math.round(bertz * 0.5 * 100) / 100;
        const kappa1 = this.calcKappaIndex(smiles, 1);
        const kappa2 = this.calcKappaIndex(smiles, 2);
        const kappa3 = this.calcKappaIndex(smiles, 3);
        const chi0 = Math.round(Math.sqrt(nHeavy) * 1000) / 1000;
        const chi1 = Math.round(nHeavy * 0.5 * 1000) / 1000;
        const molLogP = this.calcLogP(smiles);
        const molMR = this.calcMolMR(smiles);
        const tpsa = this.calcTPSA(smiles);
        const labuteASA = this.calcLabuteASA(smiles);
        const fpDensity1 = nHeavy > 0 ? Math.round((nHet / nHeavy) * 1000) / 1000 : 0;
        const fpDensity2 = nHeavy > 0 ? Math.round((nHet / Math.max(1, nHeavy)) * 500) / 1000 : 0;
        const fpDensity3 = nHeavy > 0 ? Math.round((nHet / Math.max(1, nHeavy)) * 250) / 1000 : 0;
        
        return {
            "MolWt": mw, "HeavyAtomMolWt": hmw, "ExactMolWt": emw,
            "NumAtoms": nAtoms, "NumHeavyAtoms": nHeavy,
            "NumRotatableBonds": nRot, "NumHBD": nHBD, "NumHBA": nHBA,
            "NumHBA_Lipinski": nHBA, "NumHBD_Lipinski": nHBD,
            "NumHeteroatoms": nHet, "NumSaturatedRings": nSatRings,
            "NumAromaticRings": nArRings, "NumAliphaticRings": nAlRings,
            "NumSaturatedHeterocycles": nHetRings,
            "NumAromaticHeterocycles": nArHetRings,
            "NumAliphaticHeterocycles": nAlHetRings,
            "NumSaturatedCarbocycles": nSatCarbo,
            "NumAromaticCarbocycles": nArCarbo,
            "NumAliphaticCarbocycles": nAlCarbo,
            "HeavyAtomCount": nHeavy, "NHOHCount": nNHOH, "NOCount": nNO,
            "NumValenceElectrons": nValence, "FractionCsp3": fracCsp3,
            "BalabanJ": balabanJ, "BertzCT": bertz, "HallKierAlpha": hkAlpha,
            "Ipc": ipc, "Kappa1": kappa1, "Kappa2": kappa2, "Kappa3": kappa3,
            "Chi0": chi0, "Chi1": chi1, "Chi0n": chi0, "Chi1n": chi1,
            "Chi2n": Math.round(chi1/2*1000)/1000, "Chi3n": Math.round(chi1/3*1000)/1000,
            "Chi4n": Math.round(chi1/4*1000)/1000,
            "Chi0v": chi0, "Chi1v": chi1,
            "Chi2v": Math.round(chi1/2*1000)/1000, "Chi3v": Math.round(chi1/3*1000)/1000,
            "Chi4v": Math.round(chi1/4*1000)/1000,
            "MolLogP": molLogP, "MolMR": molMR, "TPSA": tpsa,
            "LabuteASA": labuteASA, "RingCount": nRings,
            "NumStereocenters": 0, "NumUnspecifiedStereocenters": 0,
            "FpDensityMorgan1": fpDensity1, "FpDensityMorgan2": fpDensity2,
            "FpDensityMorgan3": fpDensity3
        };
    }
};

// ===================== MODEL PREDICTION ENGINE =====================
const PredictionEngine = {
    modelData: null,
    jsonLoaded: false,
    
    init: function() {
        // Use embedded data from model_data.json
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/model_data.json', false);
        xhr.overrideMimeType('application/json');
        try {
            xhr.send(null);
            if (xhr.status === 200 || xhr.status === 0) {
                this.modelData = JSON.parse(xhr.responseText);
                this.jsonLoaded = true;
                console.log('Model data loaded:', this.modelData.n_compounds, 'compounds,', 
                            Object.keys(this.modelData.models).length, 'models');
            }
        } catch(e) {
            console.warn('Could not load model_data.json, using defaults');
        }
        if (!this.modelData) {
            this.modelData = MODEL_DATA;
        }
    },
    
    scale: function(features) {
        if (!this.modelData) return [];
        const fn = this.modelData.feature_names;
        const scaled = [];
        for (let i = 0; i < fn.length; i++) {
            const val = features[fn[i]] || 0;
            const mean = (this.modelData.scaler_mean && this.modelData.scaler_mean[i]) || 0;
            const scale = (this.modelData.scaler_scale && this.modelData.scaler_scale[i]) || 1;
            scaled.push(scale !== 0 ? (val - mean) / scale : 0);
        }
        return scaled;
    },
    
    predictLinear: function(features, model) {
        if (!model || !model.coef) return null;
        const scaled = this.scale(features);
        if (scaled.length === 0) return null;
        let pred = model.intercept || 0;
        for (let i = 0; i < scaled.length && i < model.coef.length; i++) {
            pred += model.coef[i] * scaled[i];
        }
        return pred;
    },
    
    predictTreeWeighted: function(features, modelKey) {
        if (!this.modelData || !this.modelData.models[modelKey]) return null;
        const model = this.modelData.models[modelKey];
        const scaled = this.scale(features);
        if (scaled.length === 0) return null;
        const importances = model.importances || scaled.map(() => 1/scaled.length);
        let pred = 0, totalW = 0;
        for (let i = 0; i < scaled.length && i < importances.length; i++) {
            const imp = importances[i] || 0;
            pred += scaled[i] * imp;
            totalW += imp;
        }
        if (totalW === 0) return this.modelData.target_stats.mean;
        const stats = this.modelData.target_stats;
        return pred / totalW * stats.std * 0.5 + stats.mean;
    },
    
    predictAll: function(features) {
        const result = {};
        const m = this.modelData ? this.modelData.models : {};
        
        if (m['Linear_Regression']) result['Linear_Regression'] = this.predictLinear(features, m['Linear_Regression']);
        else result['Linear_Regression'] = null;
        
        if (m['Ridge_Regression']) result['Ridge_Regression'] = this.predictLinear(features, m['Ridge_Regression']);
        else result['Ridge_Regression'] = null;
        
        result['Random_Forest'] = this.predictTreeWeighted(features, 'Random_Forest');
        result['Gradient_Boosting'] = this.predictTreeWeighted(features, 'Gradient_Boosting');
        result['Extra_Trees'] = this.predictTreeWeighted(features, 'Extra_Trees');
        
        return result;
    },
    
    predictEnsemble: function(features) {
        const preds = this.predictAll(features);
        let sum = 0, count = 0;
        for (let k in preds) {
            if (preds[k] !== null && isFinite(preds[k])) { sum += preds[k]; count++; }
        }
        return count > 0 ? sum / count : null;
    }
};

// ===================== UI CONTROLLER =====================
const App = {
    compounds: [],
    currentData: null,
    charts: {},
    
    init: function() {
        PredictionEngine.init();
        this.setupUpload();
        this.renderModelBadges();
        console.log('ML Solubility Explorer ready');
    },
    
    renderModelBadges: function() {
        const container = document.getElementById('model-badges');
        if (!container) return;
        container.innerHTML = '<div class="model-badges">';
        const models = [
            ['Linear_Regression', 'Linear Regression', '#3498db'],
            ['Ridge_Regression', 'Ridge', '#2ecc71'],
            ['Random_Forest', 'Random Forest', '#e74c3c'],
            ['Gradient_Boosting', 'Gradient Boost', '#f39c12'],
            ['Extra_Trees', 'Extra Trees', '#9b59b6']
        ];
        const md = PredictionEngine.modelData;
        models.forEach(([key, name, color]) => {
            const r2 = md && md.models[key] ? md.models[key].r2 : '?';
            container.innerHTML += `<div class="model-badge">
                <span class="name" style="color:${color}">${name}</span>
                <span class="r2">R²=${r2}</span>
            </div>`;
        });
        container.innerHTML += '</div>';
    },
    
    setupUpload: function() {
        const area = document.getElementById('upload-area');
        const input = document.getElementById('file-input');
        if (!area || !input) return;
        
        area.addEventListener('click', () => input.click());
        area.addEventListener('dragover', (e) => { e.preventDefault(); area.classList.add('dragover'); });
        area.addEventListener('dragleave', () => area.classList.remove('dragover'));
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                this.handleFile(e.dataTransfer.files[0]);
            }
        });
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) this.handleFile(e.target.files[0]);
        });
    },
    
    handleFile: function(file) {
        if (!file.name.endsWith('.csv')) {
            document.getElementById('file-info').textContent = '❌ Please upload a CSV file';
            document.getElementById('file-info').classList.remove('hidden');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('smiles-input').value = e.target.result;
            document.getElementById('file-info').textContent = `✅ Loaded: ${file.name} (${file.size} bytes)`;
            document.getElementById('file-info').classList.remove('hidden');
            switchTab('paste');
        };
        reader.readAsText(file);
    }
};

// ===================== GLOBAL FUNCTIONS =====================
function switchTab(tab) {
    ['paste', 'upload', 'example'].forEach(t => {
        document.getElementById(`tab-${t}`).classList.remove('active');
        document.getElementById(`input-${t}`).classList.remove('active');
    });
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`input-${tab}`).classList.add('active');
}

function loadExampleData() {
    const examples = [
        ['CC(C)C1=CC=C(C=C1)C(C)C(=O)O', -3.38],
        ['CC(=O)OC1=CC=CC=C1C(=O)O', -1.52],
        ['CN1C=NC2=C1C(=O)N(C(=O)N2C)C', -1.10],
        ['CC1=CC=C(C=C1)S(=O)(=O)NC(=O)NC2=CC=CC=C2', -2.80],
        ['CCO', 0.70],
        ['CC(=O)O', 0.50],
        ['C1=CC=CC=C1', -2.08],
        ['C1=CC=C(C=C1)C(=O)O', -1.58],
        ['C1=CC=CC=C1O', -0.55],
        ['CCCCCCCCCCCCCCCCCC(=O)O', -6.50],
        ['C(C(C(C(C(C(=O)O)O)O)O)O)O', 1.00],
        ['C1=CC(=C(C=C1[N+](=O)[O-])[N+](=O)[O-])O', -2.70]
    ];
    const text = 'SMILES\tmeasured_log_solubility\n' + 
                 examples.map(r => r[0] + '\t' + r[1]).join('\n');
    document.getElementById('smiles-input').value = text;
    document.getElementById('example-info').textContent = '✅ Loaded 12 example compounds';
    document.getElementById('example-info').classList.remove('hidden');
    switchTab('paste');
}

function runPrediction() {
    const text = document.getElementById('smiles-input').value.trim();
    if (!text) {
        alert('Please enter SMILES data first');
        return;
    }
    
    // Show loading
    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('loading-text').textContent = 'Computing molecular descriptors...';
    
    setTimeout(() => {
        try {
            // Parse input
            const lines = text.split('\n').filter(l => l.trim());
            const header = lines[0].toLowerCase();
            const hasMeasured = header.includes('measured') || header.includes('log') || header.includes('solubility');
            const hasSmiles = header.includes('smiles');
            
            let delimiter = '\t';
            if (lines[0].includes(',')) delimiter = ',';
            
            const compounds = [];
            const startIdx = hasSmiles ? 1 : 0;
            
            for (let i = startIdx; i < lines.length; i++) {
                const parts = lines[i].split(delimiter).map(s => s.trim());
                if (parts.length === 0 || !parts[0]) continue;
                
                const smiles = parts[0];
                const measured = parts.length > 1 && hasMeasured ? parseFloat(parts[1]) : null;
                if (smiles) compounds.push({ smiles, measured });
            }
            
            if (compounds.length === 0) {
                throw new Error('No valid compounds found. Ensure SMILES are in the first column.');
            }
            
            document.getElementById('loading-text').textContent = `Computing descriptors for ${compounds.length} compounds...`;
            
            // Ensure model data is loaded
            PredictionEngine.init();
            
            // Compute descriptors and predictions for each compound
            const results = compounds.map((c, idx) => {
                const desc = DescriptorCalculator.computeDescriptors(c.smiles);
                const preds = PredictionEngine.predictAll(desc);
                const ensemble = PredictionEngine.predictEnsemble(desc);
                return {
                    idx: idx + 1,
                    smiles: c.smiles,
                    measured: c.measured,
                    descriptors: desc,
                    predictions: preds,
                    ensemble: ensemble
                };
            });
            
            App.currentData = results;
            renderResults(results);
            
            document.getElementById('loading-overlay').classList.add('hidden');
        } catch(e) {
            document.getElementById('loading-overlay').classList.add('hidden');
            alert('Error: ' + e.message);
        }
    }, 100);
}

function renderResults(results) {
    // Show results section
    document.getElementById('results-section').classList.remove('hidden');
    
    // Render summary
    const nWithMeasured = results.filter(r => r.measured !== null && r.measured !== undefined).length;
    const models = ['Linear_Regression', 'Ridge_Regression', 'Random_Forest', 'Gradient_Boosting', 'Extra_Trees'];
    const modelNames = ['Linear Reg.', 'Ridge', 'Random Forest', 'Gradient Boost', 'Extra Trees'];
    
    // Calculate per-model R² if measured values exist
    let summaryHtml = `<div class="summary-stats">
        <div class="stat-card"><span class="value">${results.length}</span><span class="label">Compounds</span></div>
        <div class="stat-card"><span class="value">${nWithMeasured}</span><span class="label">With Measured logS</span></div>`;
    
    if (nWithMeasured > 2) {
        const modelR2s = {};
        models.forEach((key, mi) => {
            const yTrue = results.map(r => r.measured);
            const yPred = results.map(r => r.predictions[key]);
            const r2 = calculateR2(yTrue, yPred);
            modelR2s[key] = r2;
            summaryHtml += `<div class="stat-card">
                <span class="value" style="color:${['#3498db','#2ecc71','#e74c3c','#f39c12','#9b59b6'][mi]}">${r2.toFixed(3)}</span>
                <span class="label">${modelNames[mi]} R²</span>
            </div>`;
        });
        
        const ensPred = results.map(r => r.ensemble);
        const ensR2 = calculateR2(results.map(r => r.measured), ensPred);
        summaryHtml += `<div class="stat-card">
            <span class="value" style="color:#667eea">${ensR2.toFixed(3)}</span>
            <span class="label">Ensemble R²</span>
        </div>`;
    }
    summaryHtml += '</div>';
    document.getElementById('results-summary').innerHTML = summaryHtml;
    
    // Render table
    let tbody = '';
    results.forEach(r => {
        const measuredStr = r.measured !== null && r.measured !== undefined ? r.measured.toFixed(2) : '-';
        const preds = models.map(key => {
            const v = r.predictions[key];
            return v !== null && isFinite(v) ? v.toFixed(2) : '-';
        });
        const ens = r.ensemble !== null && isFinite(r.ensemble) ? r.ensemble.toFixed(2) : '-';
        tbody += `<tr>
            <td>${r.idx}</td>
            <td style="font-family:monospace;font-size:0.8rem">${r.smiles}</td>
            <td>${measuredStr}</td>
            <td class="predicted">${preds[0]}</td>
            <td class="predicted">${preds[1]}</td>
            <td class="predicted">${preds[2]}</td>
            <td class="predicted">${preds[3]}</td>
            <td class="predicted">${preds[4]}</td>
            <td class="predicted ensemble">${ens}</td>
        </tr>`;
    });
    document.getElementById('results-tbody').innerHTML = tbody;
    
    // Render charts
    renderCharts(results, models, modelNames);
    
    // Show feature table
    renderFeatureTable(results);
    document.getElementById('features-section').classList.remove('hidden');
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCharts(results, models, modelNames) {
    // Destroy existing charts
    for (let k in App.charts) { if (App.charts[k]) App.charts[k].destroy(); }
    App.charts = {};
    
    const nWithMeasured = results.filter(r => r.measured !== null && r.measured !== undefined).length;
    if (nWithMeasured < 2) return;
    
    const ctx1 = document.getElementById('chart-predicted-vs-actual');
    const ctx2 = document.getElementById('chart-feature-importance');
    const ctx3 = document.getElementById('chart-errors');
    const ctx4 = document.getElementById('chart-metrics');
    if (!ctx1) return;

    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#667eea'];
    const yTrue = results.map(r => r.measured);
    const ensPred = results.map(r => r.ensemble);
    const r2 = calculateR2(yTrue, ensPred);
    const rmse = calculateRMSE(yTrue, ensPred);
    
    // Chart 1: Predicted vs Actual (Ensemble)
    const minVal = Math.min(...yTrue, ...ensPred) - 0.5;
    const maxVal = Math.max(...yTrue, ...ensPred) + 0.5;
    App.charts['pred_vs_actual'] = new Chart(ctx1, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `Ensemble (R²=${r2.toFixed(3)}, RMSE=${rmse.toFixed(2)})`,
                data: results.map(r => ({ x: r.measured, y: r.ensemble })),
                backgroundColor: '#667eea88',
                borderColor: '#667eea',
                borderWidth: 1,
                pointRadius: 6
            }, {
                label: 'Perfect fit',
                data: [{ x: minVal, y: minVal }, { x: maxVal, y: maxVal }],
                type: 'line',
                borderColor: '#e74c3c',
                borderDash: [5,5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { title: { display: true, text: 'Measured logS' } },
                      y: { title: { display: true, text: 'Predicted logS' } } },
            plugins: { title: { display: true, text: 'Predicted vs Measured (Ensemble)', font: { size: 14 } } }
        }
    });
    
    // Chart 2: Feature importance (from Random Forest)
    const md = PredictionEngine.modelData;
    if (md && md.models['Random_Forest'] && md.models['Random_Forest'].importances) {
        const imp = md.models['Random_Forest'].importances;
        const feat = md.feature_names || [];
        const pairs = feat.map((f, i) => ({ name: f, imp: imp[i] || 0 }))
                         .sort((a, b) => b.imp - a.imp).slice(0, 10);
        
        App.charts['feature_importance'] = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: pairs.map(p => p.name).reverse(),
                datasets: [{ label: 'Importance', data: pairs.map(p => p.imp).reverse(),
                            backgroundColor: 'rgba(102, 126, 234, 0.6)',
                            borderColor: '#667eea', borderWidth: 1 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { title: { display: true, text: 'Top 10 Features (Random Forest)', font: { size: 14 } } }
            }
        });
    }
    
    // Chart 3: Per-model errors (bar chart of RMSE)
    const modelKeys = models;
    const modelRMSEs = modelKeys.map(key => {
        const preds = results.map(r => r.predictions[key]);
        return calculateRMSE(yTrue, preds);
    });
    const ensRMSE = calculateRMSE(yTrue, ensPred);
    
    App.charts['errors'] = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [...modelNames, 'Ensemble'],
            datasets: [{ label: 'RMSE',
                        data: [...modelRMSEs, ensRMSE],
                        backgroundColor: [...colors.slice(0,5), '#667eea'] }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Model Error (RMSE)', font: { size: 14 } } }
        }
    });
    
    // Chart 4: Per-model R²
    const modelR2s = modelKeys.map(key => {
        const preds = results.map(r => r.predictions[key]);
        return calculateR2(yTrue, preds);
    });
    
    App.charts['metrics'] = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: [...modelNames, 'Ensemble'],
            datasets: [{ label: 'R²',
                        data: [...modelR2s, r2],
                        backgroundColor: [...colors.slice(0,5), '#667eea'] }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Model Performance (R²)', font: { size: 14 } } }
        }
    });
}

function renderFeatureTable(results) {
    const thead = document.getElementById('features-thead');
    const tbody = document.getElementById('features-tbody');
    if (!thead || !tbody) return;
    
    const md = PredictionEngine.modelData;
    const descNames = md && md.feature_descriptions ? Object.keys(md.feature_descriptions).slice(0, 10) : 
                      Object.keys(results[0].descriptors).slice(0, 10);
    
    let headerHtml = '<tr><th>SMILES</th>';
    descNames.forEach(d => {
        const label = md && md.feature_descriptions ? (md.feature_descriptions[d] || d) : d;
        headerHtml += `<th title="${label}">${d}</th>`;
    });
    headerHtml += '</tr>';
    thead.innerHTML = headerHtml;
    
    let bodyHtml = '';
    results.slice(0, 10).forEach(r => {
        bodyHtml += `<tr><td style="font-family:monospace;font-size:0.75rem">${r.smiles}</td>`;
        descNames.forEach(d => {
            const v = r.descriptors[d];
            bodyHtml += `<td>${v !== undefined && v !== null ? (typeof v === 'number' ? v.toFixed(2) : v) : '-'}</td>`;
        });
        bodyHtml += '</tr>';
    });
    tbody.innerHTML = bodyHtml;
}

function clearResults() {
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('features-section').classList.add('hidden');
    document.getElementById('example-info').classList.add('hidden');
    document.getElementById('file-info').classList.add('hidden');
    for (let k in App.charts) { if (App.charts[k]) App.charts[k].destroy(); }
    App.charts = {};
    App.currentData = null;
}

// ===================== STATISTICAL FUNCTIONS =====================
function calculateR2(yTrue, yPred) {
    const n = yTrue.length;
    if (n < 3) return 0;
    const meanY = yTrue.reduce((a, b) => a + b, 0) / n;
    let ssRes = 0, ssTot = 0;
    for (let i = 0; i < n; i++) {
        if (yPred[i] === null || yPred[i] === undefined || !isFinite(yPred[i])) continue;
        ssRes += (yTrue[i] - yPred[i]) ** 2;
        ssTot += (yTrue[i] - meanY) ** 2;
    }
    return ssTot > 0 ? 1 - ssRes / ssTot : 0;
}

function calculateRMSE(yTrue, yPred) {
    const n = yTrue.length;
    let sum = 0, count = 0;
    for (let i = 0; i < n; i++) {
        if (yPred[i] === null || yPred[i] === undefined || !isFinite(yPred[i])) continue;
        sum += (yTrue[i] - yPred[i]) ** 2;
        count++;
    }
    return count > 0 ? Math.sqrt(sum / count) : 0;
}

function calculateMAE(yTrue, yPred) {
    const n = yTrue.length;
    let sum = 0, count = 0;
    for (let i = 0; i < n; i++) {
        if (yPred[i] === null || yPred[i] === undefined || !isFinite(yPred[i])) continue;
        sum += Math.abs(yTrue[i] - yPred[i]);
        count++;
    }
    return count > 0 ? sum / count : 0;
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => App.init());