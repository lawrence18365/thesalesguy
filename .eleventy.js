module.exports = function(eleventyConfig) {
  const buildDate = new Date();

  // Passthrough copy all non-blog static content
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/components");
  eleventyConfig.ignores.add("src/components/**");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Blog post collection sorted by date descending
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .filter((post) => post.date <= buildDate)
      .sort((a, b) => {
        return b.date - a.date;
      });
  });

  // Date formatting filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) {
      return "";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(new Date(dateObj));
  });

  // ISO date filter for schema/meta tags
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) {
      return "";
    }

    const d = new Date(dateObj);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  // Normalize wrapped HTML generated from mixed Markdown/HTML blog content.
  eleventyConfig.addFilter("cleanArticleHtml", (htmlContent) => {
    if (!htmlContent) {
      return "";
    }

    return htmlContent
      .replace(/<p>\s*<p>/g, "<p>")
      .replace(/<\/p>\s*<\/p>/g, "</p>")
      .replace(/<p>\s*(<(?:h[1-6]|div|ul|ol|blockquote|section|article|figure|figcaption|pre|table)[^>]*>)/gi, "$1")
      .replace(/(<\/(?:h[1-6]|div|ul|ol|blockquote|section|article|figure|figcaption|pre|table)>)\s*<\/p>/gi, "$1");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
