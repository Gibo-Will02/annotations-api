//allows jest to transform .svg image files
module.exports = {
    process() {
      return {
        code: `module.exports = {};`,
      };
    },
    getCacheKey() {
      // The output is always the same.
      return "svgTransform";
    },
  };