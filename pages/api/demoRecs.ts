import { RecommendationsList } from "./recs";

export const DEMO_REC: RecommendationsList = {
  id: "test",
  title: "NYC News",
  subscriptions: [
    {
      color: {
        light: { r: 0, g: 0, b: 0 },
        dark: {
          r: 0.71260000000000001,
          g: 0.68499999999999994,
          b: 0.71260000000000001,
        },
      },
      id: "F5C05A2D-688D-4EB2-9126-54A5F0E69970",
      data: {
        feed: {
          palette: {
            colors: [{ hue: 0, saturation: 0, brightness: 0, alpha: 1 }],
          },
          title: "NYT > Top Stories",
          url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
          batchedView: false,
          color: "red",
        },
      },
      displayTitle: "NYT > Top Stories – nytimes.com",
      preview: {
        title: 
          "Investigators Seize More Classified Documents From Biden’s Home",
        subtitle: "NYT > Top Stories – nytimes.com",
        url: "https://www.nytimes.com/2023/01/21/us/politics/biden-documents.html",
      },
      displaySubtitle: "RSS Feed",
      webLink: "https://www.nytimes.com",
      asRss: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    },
    {
      id: "88CA7ADF-C621-4118-B2DF-D72ED4968AEF",
      preview: {
        title: "Sharing HTML5 video with SublimeVideo",
        subtitle: "feedburner.com",
        url: "http://5thirtyone.com/software/sharing-html5-video-with-sublimevideo/",
      },
      data: { feed: { url: "http://feeds.feedburner.com/5thirtyone" } },
      displayTitle: "feedburner.com",
      webLink: "http://5thirtyone.com",
      displaySubtitle: "RSS Feed",
      asRss: "http://feeds.feedburner.com/5thirtyone",
    },
    {
      id: "8B074E63-9717-46E8-A078-0414F3E8063E",
      preview: {
        title:
          "Ask HN: Those making $500+/month on side projects in 2023 – Show and tell",
        subtitle: "Hacker News",
        url: "https://news.ycombinator.com/item?id=34482433",
      },
      data: { hackerNews: { topStoriesCount: 20 } },
      displayTitle: "Hacker News",
      webLink: "https://news.ycombinator.com",
      displaySubtitle: "Hacker News",
      asRss: "https://hnrss.org/frontpage",
    },
    {
      id: "4AC2C5C7-6A01-4B69-833B-587332C16403",
      preview: {
        title:
          "TIL Scans have revealed there’s a large unexplored void in the Great Pyramid of Giza",
        subtitle: "r/TodayILearned",
        url: "https://www.thearchaeologist.org/blog/new-scans-of-the-great-pyramid-confirm-major-discovery-inside?format=amp",
      },
      data: {
        reddit: {
          allowedPostTypes: ["link", "text", "photo", "video"],
          subreddit: "TodayILearned",
        },
      },
      displayTitle: "r/TodayILearned",
      webLink: "https://reddit.com/r/TodayILearned",
      displaySubtitle: "Reddit",
      asRss: "https://reddit.com/r/TodayILearned.rss",
    },
    {
      color: {
        light: {
          r: 0.64411764705882357,
          g: 0.032352941176470619,
          b: 0.64411764705882346,
        },
        dark: {
          r: 0.95210084033613451,
          g: 0.42773109243697471,
          b: 0.9521008403361344,
        },
      },
      id: "9F108D78-CEF5-44A3-95E0-FB2D25DB05DA",
      data: {
        twitter: {
          color: "red",
          username: "theEconomist",
          palette: {
            colors: [
              {
                hue: 0.0061728395061728504,
                saturation: 0.95154185022026438,
                brightness: 0.8901960784313725,
                alpha: 1,
              },
              {
                hue: 0.83333333333333337,
                saturation: 0.02352941176470591,
                brightness: 1,
                alpha: 1,
              },
              {
                hue: 0.02450980392156854,
                saturation: 0.1333333333333333,
                brightness: 1,
                alpha: 1,
              },
              {
                hue: 0.0062388591800356585,
                saturation: 0.90338164251207731,
                brightness: 0.81176470588235294,
                alpha: 1,
              },
              {
                hue: 0.014367816091953978,
                saturation: 0.22745098039215683,
                brightness: 1,
                alpha: 1,
              },
            ],
          },
        },
      },
      displayTitle: "theEconomist",
      preview: {
        title: "The Turkish economy is in pressing need of reform and repair",
        imageUrl:
          "https://pbs.twimg.com/news_img/1615555015841546240/UTSTKXRE?format=jpg&name=150x150",
        subtitle: "The Economist",
        url: "https://econ.st/3wgLF7Q",
      },
      displaySubtitle: "Twitter",
      webLink: "https://twitter.com/theEconomist",
      asRss: "https://openrss.org/twitter.comtheEconomist",
    },
    {
      id: "F951F555-DC9E-47F8-99F0-34C58A80718F",
      preview: {
        title:
          "Heres a fluffy Dino in under 60 seconds 😁🦖 #blender #blender3d #design #Dinosaur #cute",
        subtitle: "YouTube Video",
        imageUrl: "https://img.youtube.com/vi/DOK6eJZLDe0/hqdefault.jpg",
      },
      data: {
        youtube: {
          channel: {
            thumbnailURL:
              "https://yt3.ggpht.com/LaY_AuKuWAmdkkLjmLJ0e98zC0n4ackBOt-IhPi1DhfDKwllgUpPW2hOd7xQFyQkumRc2UwsWg=s240-c-k-c0xffffffff-no-rj-mo",
            title: "Keelan Jon",
            description:
              "Hi, I'm Keelan, by day I'm a coffee-drinking web developer but here on my channel, I upload my latest Blender insights, project, ...",
            channelId: "UCsx6kQZt0y3Ie5ob_cwQ5cQ",
          },
        },
      },
      displayTitle: "Keelan Jon",
      webLink: "https://youtube.com/channel/UCsx6kQZt0y3Ie5ob_cwQ5cQ",
      displaySubtitle: "YouTube",
      asRss:
        "https://www.youtube.com/feeds/videos.xml?channel_id=UCsx6kQZt0y3Ie5ob_cwQ5cQ",
    },
    {
      id: "9F0FE593-6F48-4A8B-B8E1-B938779AFB0C",
      preview: {
        title: "videofile_: we stopped shipping?!",
        subtitle: "YouTube Video",
        imageUrl: "https://img.youtube.com/vi/QVIMuNz1IRY/hqdefault.jpg",
      },
      data: {
        youtube: {
          channel: {
            thumbnailURL:
              "https://yt3.ggpht.com/qSqmb9GaIyvWgVGFYGOJKIZ3SFHuUxeP9O5-4VkGReaIv4pYNkJiFPjAppvps0hyQ9JfUVBFQ5s=s240-c-k-c0xffffffff-no-rj-mo",
            title: "The Browser Company",
            description:
              "We're building Arc — a better way to use the internet. Stay tuned for new content from The Browser Company team, coming your ...",
            channelId: "UCT5qXmLacW_a4DE-3EgeOiQ",
          },
        },
      },
      displayTitle: "The Browser Company",
      webLink: "https://youtube.com/channel/UCT5qXmLacW_a4DE-3EgeOiQ",
      displaySubtitle: "YouTube",
      asRss:
        "https://www.youtube.com/feeds/videos.xml?channel_id=UCT5qXmLacW_a4DE-3EgeOiQ",
    },
    {
      color: {
        light: {
          r: 0.12549019607843137,
          g: 0.078431372549019593,
          b: 0.12549019607843132,
        },
        dark: {
          r: 0.62999999999999989,
          g: 0.48999999999999982,
          b: 0.62999999999999978,
        },
      },
      id: "78930B76-08CC-4BB2-AEC7-825BD4F60CF0",
      data: {
        twitter: {
          color: "green",
          username: "atlasobscura",
          palette: {
            colors: [
              {
                hue: 0.11111111111111112,
                saturation: 0.6428571428571429,
                brightness: 0.2196078431372549,
                alpha: 1,
              },
              {
                hue: 0.10370370370370374,
                saturation: 0.3435114503816793,
                brightness: 0.51372549019607838,
                alpha: 1,
              },
              {
                hue: 0.16666666666666666,
                saturation: 0.019607843137254947,
                brightness: 1,
                alpha: 1,
              },
              {
                hue: 0.1037037037037037,
                saturation: 0.52941176470588236,
                brightness: 0.33333333333333331,
                alpha: 1,
              },
              {
                hue: 0.10638297872340426,
                saturation: 0.29375000000000001,
                brightness: 0.62745098039215685,
                alpha: 1,
              },
            ],
          },
        },
      },
      displayTitle: "atlasobscura",
      preview: {
        title: "Il Giardino Fantastico di Fiorenzo Pilia",
        imageUrl:
          "https://pbs.twimg.com/news_img/1615788324525850632/BkVMsACm?format=jpg&name=150x150",
        subtitle: "Atlas Obscura",
        url: "https://www.atlasobscura.com/places/il-giardino-fantastico-di-fiorenzo-pilia?utm_medium=atlas-page&utm_source=twitter",
      },
      displaySubtitle: "Twitter",
      webLink: "https://twitter.com/atlasobscura",
      asRss: "https://openrss.org/twitter.comatlasobscura",
    },
    {
      id: "A9932067-5B4A-44A5-9185-A0B8D319634F",
      preview: {
        title: "✚ Why start small: Delight, to duty, back to delight again",
        subtitle: "shawnblanc.net",
        url: "https://shawnblanc.net/2022/12/why-start-small-delight-to-duty-back-to-delight-again/",
      },
      data: { feed: { url: "http://shawnblanc.net/feed" } },
      displayTitle: "shawnblanc.net",
      webLink: "http://shawnblanc.net/feed",
      displaySubtitle: "RSS Feed",
      asRss: "http://shawnblanc.net/feed",
    },
    {
      asRss: "http://feeds.feedburner.com/thebignoob",
      id: "79E3A310-0885-4356-8798-B7140C8D3C1D",
      data: { feed: { url: "http://feeds.feedburner.com/thebignoob" } },
      displayTitle: "feedburner.com",
      webLink: "http://feeds.feedburner.com/thebignoob",
      displaySubtitle: "RSS Feed",
    },
  ],
  description: "Some of my faves...",
  creator: "Nate P",
};
