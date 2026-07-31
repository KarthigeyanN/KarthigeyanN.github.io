---
layout: post
title: "Predicting Solubility with Machine Learning"
date: 2026-07-30
---

In this post I'll walk through my ML Model Explorer project — a solubility prediction tool built with RDKit and machine learning.

## Why Solubility?

Aqueous solubility is one of the most important physicochemical properties in drug discovery. It affects absorption, distribution, and formulation. Being able to predict it from molecular structure alone can save a lot of time and cost in early-stage screening.

## Approach

1. **Data** — A dataset of molecules labeled with experimental solubility values
2. **Features** — Computed RDKit fingerprints and molecular descriptors
3. **Model** — Trained regression models (Random Forest, Gradient Boosting) to map structure to solubility
4. **Evaluation** — Root mean squared error and R² on a held-out test set

## Demo

The interactive demo lets you draw or paste a SMILES string, compute descriptors on the fly, and get an instant solubility prediction.

Check out the live demo and the source code from the [Projects page](/projects).