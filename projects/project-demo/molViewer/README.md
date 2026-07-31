# BioVisualizer Pro (PyMOL-Lite Viewer)

A browser-based 3D molecular visualization tool built with [Three.js](https://threejs.org/). Load and explore protein structures from the [RCSB Protein Data Bank](https://www.rcsb.org/) or upload your own `.pdb` files directly.

![Screenshot](https://img.shields.io/badge/3D-Molecular%20Viewer-blue)

## Features

- **PDB Loading** – Fetch protein structures by PDB ID from RCSB.org or upload local `.pdb` files
- **3D Rendering** – Interactive 3D scene with orbit controls (rotate, pan, zoom)
- **Atom Visualization** – Color-coded spheres for each element (C, O, N, S, H, P)
- **Bond Visualization** – Cylindrical bonds between nearby atoms within the same or adjacent residues
- **Secondary Structure** – Color-coded backbone rendering:
  - 🔴 **Helices** (red)
  - 🟡 **Sheets** (yellow)
  - 🔵 **Loops** (blue)
- **Toggle Controls** – Show/hide atoms, bonds, hydrogens, and secondary structure independently
- **Hydrogen Support** – Optional display of hydrogen atoms and bonds

## Getting Started

### Prerequisites

A modern web browser (Chrome, Firefox, Edge, or Safari) with JavaScript enabled.

### Running Locally

Simply serve the project directory with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your browser.

### Usage

1. **Load by PDB ID** – Enter a 4-character PDB ID (e.g., `1A8M`) in the input field and click **Load** or press Enter
2. **Upload a file** – Click the **Choose .pdb File** button to select a local PDB file
3. **Toggle display** – Use the checkboxes to show/hide atoms, bonds, hydrogens, and secondary structure

A default structure (`1A8M`) loads automatically on startup.

## Project Structure

```
├── index.html      # Single-page application (HTML + CSS + JavaScript)
├── package.json    # Project metadata
└── README.md       # This file
```

## Technical Overview

- **Rendering Engine**: Three.js (r160) via CDN
- **Controls**: OrbitControls for camera manipulation
- **PDB Parsing**: Custom parser for ATOM, HETATM, HELIX, and SHEET records
- **Instanced Rendering**: Uses `InstancedMesh` for efficient rendering of atoms and bonds
- **Backbone Extrusion**: `ExtrudeGeometry` along Catmull-Rom curves for secondary structure visualization

## Dependencies

All dependencies are loaded via CDN (no build step required):

| Library | Version | CDN |
|---------|---------|-----|
| Three.js | r160 | [unpkg](https://unpkg.com/three@0.160.0/) |
| OrbitControls | r160 | [unpkg](https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js) |

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [RCSB Protein Data Bank](https://www.rcsb.org/) for providing protein structure data
- [Three.js](https://threejs.org/) for the 3D rendering library