export const generateBoxShadow = (
    hOffset,
    vOffset,
    blur,
    spread,
    color,
    inset
) => (
    `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${colorToRGBA(color)}${inset ? ' inset' : ''}`
)

export const colorToRGBA = ({ r, g, b, a = 1.0 }) => (
    `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
)
