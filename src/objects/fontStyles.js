import { WIDTH } from "@/modules/constants.js";

/**
 * @type {Phaser.Types.GameObjects.Text.TextStyle}
 */
export const baseFontStyle = {
  fontFamily: "EnterCommand",
  fontSize: 64,
  stroke: "#551199",
  strokeThickness: 8,
  shadow: {
    offsetX: 4,
    offsetY: 4,
    color: "#00000033",
    blur: 0,
    stroke: true,
    fill: false
  },
  align: "center",
  fixedWidth: WIDTH
};

export const titleFontStyle = {
  ...baseFontStyle,
  fontSize: 32,
  strokeThickness: 6,
  stroke: "#d31850"
};
