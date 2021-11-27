const path = require("path");

module.exports = {
  rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:4000/graphql",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "xmsqkvkebvaxwqybxbti.supabase.co",
      "xmsqkvkebvaxwqybxbti.supabase.in",
    ],
  },
};
