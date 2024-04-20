//allows jest to transform .svg image files
//THIS IS NEEDED or else NO tests will run
//This File is for jest testing purposes only no modification needed
//DO NOT DELETE
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