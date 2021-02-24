const Avatar = require("avatar-builder");
const fs = require("fs");
exports.avatarGenerate = () => {
  const avatar = Avatar.builder(
    Avatar.Image.margin(
      Avatar.Image.roundedRectMask(
        Avatar.Image.compose(
          Avatar.Image.randomFillStyle(),
          Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {
            blur: 5,
            offsetX: 2.5,
            offsetY: -2.5,
            color: "rgba(0,0,0,0.75)",
          })
        ),
        32
      ),
      8
    ),
    128,
    128
  );
  const name = Date.now();
  avatar
    .create(`${name}`)
    .then((buffer) => fs.writeFileSync(`public/images/${name}.png`, buffer));
  return `${name}.png`;
};
