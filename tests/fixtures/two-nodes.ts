export const nodes = [
  {
    id: "Quality",
    group: "quality",
    critical: true,
    complete: true,
  },
  {
    id: "Naming",
    group: "quality",
    critical: false,
    complete: false,
  },
];

export const links = [
  {
    source: "Quality",
    target: "Naming",
  },
];
export const groups = [
  {
    id: "quality",
    label: "Quality Concepts",
    "background-color": "hsla(120, 50%, 50%, 0.1)",
    "foreground-color": "hsla(120, 50%, 50%, 0.4)",
  },
];
