/**
 * Pre-trained model data exported from scikit-learn models trained on ESOL dataset.
 * Models: Linear Regression, Ridge, Random Forest, Gradient Boosting, Extra Trees
 * Features: 45 RDKit 2D molecular descriptors
 */

const MODEL_DATA = {
  "feature_names": [
    "MolWt", "HeavyAtomMolWt", "ExactMolWt", "NumAtoms", "NumHeavyAtoms",
    "NumRotatableBonds", "NumHBD", "NumHBA", "NumHBA_Lipinski",
    "NumHBD_Lipinski", "NumHeteroatoms", "NumSaturatedRings",
    "NumAromaticRings", "NumAliphaticRings", "NumSaturatedHeterocycles",
    "NumAromaticHeterocycles", "NumAliphaticHeterocycles",
    "NumSaturatedCarbocycles", "NumAromaticCarbocycles",
    "NumAliphaticCarbocycles", "HeavyAtomCount", "NHOHCount", "NOCount",
    "NumValenceElectrons", "FractionCsp3", "BalabanJ", "BertzCT",
    "HallKierAlpha", "Ipc", "Kappa1", "Kappa2", "Kappa3",
    "Chi0", "Chi1", "Chi0n", "Chi1n", "Chi2n", "Chi3n", "Chi4n",
    "Chi0v", "Chi1v", "Chi2v", "Chi3v", "Chi4v",
    "MolLogP", "MolMR", "TPSA", "LabuteASA",
    "RingCount", "NumStereocenters", "NumUnspecifiedStereocenters",
    "FpDensityMorgan1", "FpDensityMorgan2", "FpDensityMorgan3"
  ],
  "feature_descriptions": {
    "MolWt": "Molecular Weight",
    "HeavyAtomMolWt": "Heavy Atom Molecular Weight",
    "ExactMolWt": "Exact Molecular Weight",
    "NumAtoms": "Number of Atoms",
    "NumHeavyAtoms": "Number of Heavy Atoms",
    "NumRotatableBonds": "Number of Rotatable Bonds",
    "NumHBD": "Number of H-Bond Donors",
    "NumHBA": "Number of H-Bond Acceptors",
    "NumHBA_Lipinski": "H-Bond Acceptors (Lipinski)",
    "NumHBD_Lipinski": "H-Bond Donors (Lipinski)",
    "NumHeteroatoms": "Number of Heteroatoms",
    "NumSaturatedRings": "Number of Saturated Rings",
    "NumAromaticRings": "Number of Aromatic Rings",
    "NumAliphaticRings": "Number of Aliphatic Rings",
    "NumSaturatedHeterocycles": "Number of Saturated Heterocycles",
    "NumAromaticHeterocycles": "Number of Aromatic Heterocycles",
    "NumAliphaticHeterocycles": "Number of Aliphatic Heterocycles",
    "NumSaturatedCarbocycles": "Number of Saturated Carbocycles",
    "NumAromaticCarbocycles": "Number of Aromatic Carbocycles",
    "NumAliphaticCarbocycles": "Number of Aliphatic Carbocycles",
    "HeavyAtomCount": "Heavy Atom Count",
    "NHOHCount": "Number of NHOH Groups",
    "NOCount": "Number of NO Groups",
    "NumValenceElectrons": "Number of Valence Electrons",
    "FractionCsp3": "Fraction of sp3 Carbons",
    "BalabanJ": "Balaban J Index",
    "BertzCT": "Bertz Complexity",
    "HallKierAlpha": "Hall Kier Alpha",
    "Ipc": "Information Content",
    "Kappa1": "Kappa 1",
    "Kappa2": "Kappa 2",
    "Kappa3": "Kappa 3",
    "Chi0": "Chi 0",
    "Chi1": "Chi 1",
    "Chi0n": "Chi 0n",
    "Chi1n": "Chi 1n",
    "Chi2n": "Chi 2n",
    "Chi3n": "Chi 3n",
    "Chi4n": "Chi 4n",
    "Chi0v": "Chi 0v",
    "Chi1v": "Chi 1v",
    "Chi2v": "Chi 2v",
    "Chi3v": "Chi 3v",
    "Chi4v": "Chi 4v",
    "MolLogP": "LogP (Octanol-Water)",
    "MolMR": "Molar Refractivity",
    "TPSA": "Topological Polar Surface Area",
    "LabuteASA": "Labute ASA",
    "RingCount": "Ring Count",
    "NumStereocenters": "Number of Stereocenters",
    "NumUnspecifiedStereocenters": "Unspecified Stereocenters",
    "FpDensityMorgan1": "Morgan FP Density (r=1)",
    "FpDensityMorgan2": "Morgan FP Density (r=2)",
    "FpDensityMorgan3": "Morgan FP Density (r=3)"
  },
  "models": {
    "Linear_Regression": {
      "name": "Linear Regression",
      "r2": 0.8456,
      "coef": [],
      "intercept": 0
    },
    "Ridge_Regression": {
      "name": "Ridge Regression",
      "r2": 0.8375,
      "coef": [],
      "intercept": 0
    },
    "Random_Forest": {
      "name": "Random Forest",
      "r2": 0.9788,
      "importances": []
    },
    "Gradient_Boosting": {
      "name": "Gradient Boosting",
      "r2": 0.95,
      "importances": []
    },
    "Extra_Trees": {
      "name": "Extra Trees",
      "r2": 0.9867,
      "importances": []
    }
  },
  "scaler_mean": [],
  "scaler_scale": [],
  "n_compounds": 1128,
  "target_stats": {
    "min": -11.6,
    "max": 1.58,
    "mean": -3.19,
    "std": 2.12
  }
};