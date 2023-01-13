import { styled } from "..";

export const ProductConatiner = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  margin: "0 auto",
  maxWidth: 1180,
});

export const ImageCoonatiner = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
  background: "linear-gradient(188deg, #1ea483 0%, #7465d4 100%);",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    background: "$green500",
    border: 0,
    color: "$withe",
    fontSize: "$md",
    fontWeight: "bold",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    transition: "filter 0.2s",

    "&:hover": {
      filter: "brightness(0.7)",
    },
  },
});
