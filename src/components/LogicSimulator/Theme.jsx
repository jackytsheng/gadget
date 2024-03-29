export const theme = {
  color: {
    AntiqueBrass: "#cb997e",
    DesertSand: "#ddbea9",
    ChampagnePink: "#ffe8d6",
    AshGray: "#b7b7a4",
    Artichoke: "#a5a58d",
    Ebony: "#6b705c",
    DarkEdge: "#53564ad1",
  },
  height: {
    large: 500,
  },
  width: {
    large: 700,
  },
  font: {
    large: "48px",
  },
  dimension: {
    circleRaidus: 10,
    inputWidth: 50,
    outputWidth: 50,
    canvasWidth: 600,
  },
  opacity: {
    placeholder: 0.5,
  },
};

export const BasicShapeProps = {
  shadowBlur: 3,
  stroke: theme.color.DarkEdge,
  strokeWidth: 2,
  cornerRadius: 2,
};

export const BaseLineProps = {
  stroke: theme.color.DarkEdge,
  strokeWidth: 2,
  shadowBlur: 3,
  lineCap: "round",
  lineJoin: "round",
};
