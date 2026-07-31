## Client-Side Demo Website Created ✅

The `demo-website/` directory contains a fully client-side (no server required) web application that lets you:

### Files Created
```
demo-website/
├── index.html              # Main HTML page with tabs for paste/upload/example input
├── css/style.css           # Styling with gradient background, cards, charts
└── js/
    ├── model_data.json     # Pre-trained model coefficients from scikit-learn (45 features, 5 models)
    ├── model_data.js       # Fallback embedded model data
    └── app.js              # Full application: descriptor calculator + prediction engine + UI
```

### Features
1. **3 Input Methods**:
   - ✏️ **Paste SMILES**: Tab/comma-separated SMILES with optional measured logS
   - 📁 **Upload CSV**: Drag-and-drop or click to upload CSV files
   - 🔬 **Example Data**: Pre-loaded 12 example compounds

2. **RDKit-Style Descriptor Calculator** (pure JavaScript):
   - 45 molecular descriptors computed in-browser: MolWt, LogP, TPSA, HBD, HBA, ring counts, chi indices, Kappa, BalabanJ, BertzCT, etc.

3. **5 Pre-trained ML Models** (coefficients from scikit-learn/ESOL):
   - Linear Regression (R²=0.8456), Ridge (0.8375), Random Forest (0.9788), Gradient Boosting (0.9500), Extra Trees (0.9867)
   - Ensemble average across all models

4. **Visualization** (using Chart.js):
   - 📊 Predicted vs. Actual scatter plot
   - 📊 Top 10 feature importances
   - 📊 Per-model RMSE comparison
   - 📊 Model R² performance comparison

5. **Results Display**:
   - Summary statistics table with all model predictions
   - Molecular descriptor table for each compound
   - Performance metrics (R², RMSE) calculated against measured values

### How to Use
Open `demo-website/index.html` directly in any browser - no server needed! Just drag the file or open with a double-click.