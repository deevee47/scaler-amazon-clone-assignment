import { NavItem } from "@/type";

export const footerData = [
  {
    _id: 2221,
    title: "Get to Know Us",
    listItem: [
      {
        _id: "001",
        listData: [
          "About Amazon",
          "Careers",
          "Press Releases",
          "Amazon Science",
        ],
      },
    ],
  },
  {
    _id: 2225,
    title: "Connect with Us",
    listItem: [
      {
        _id: "005",
        listData: ["Facebook", "Twitter", "Instagram"],
      },
    ],
  },
  {
    _id: 2222,
    title: "Make Money with Us",
    listItem: [
      {
        _id: "002",
        listData: [
          "Sell on Amazon",
          "Sell under Amazon Accelerator",
          "Protect and Build Your Brand",
          "Amazon Global Selling",
          "Supply to Amazon",
          "Become an Affiliate",
          "Fulfilment by Amazon",
          "Advertise Your Products",
          "Amazon Pay on Merchants",
        ],
      },
    ],
  },
  {
    _id: 2224,
    title: "Let Us Help You",
    listItem: [
      {
        _id: "004",
        listData: [
          "Your Account",
          "Returns Centre",
          "Recalls and Product Safety Alerts",
          "100% Purchase Protection",
          "Amazon App Download",
          "Help",
        ],
      },
    ],
  },
];

export const sidebarItems: NavItem[] = [
  {
    title: "Digital Content & Devices",
    items: ["Amazon Music", "Kindle E-readers & Books", "Amazon Appstore"],
    subItems: [
      ["Stream Music", "Free Music", "Podcasts", "Open Web Player"],
      [
        "All Kindle E-Readers",
        "Kindle Books",
        "Kindle Unlimited",
        "Prime Reading",
      ],
      ["All Apps & Games", "Games", "Amazon Coins", "Download Amazon Appstore"],
    ],
  },
  {
    title: "Shop By Department",
    items: ["Electronics", "Computers", "Smart Home", "Arts & Crafts"],
    subItems: [
      ["TV & Video", "Audio & Home Theater", "Wearable Technology", "Cameras"],
      ["Desktops", "Laptops", "Tablets", "Computer Accessories"],
      [
        "Smart Home Lighting",
        "Smart Locks and Entry",
        "Security Cameras and Systems",
        "Plugs and Outlets",
      ],
      [
        "Painting, Drawing & Art Supplies",
        "Beading & Jewelry Making",
        "Sewing",
        "Knitting & Crochet",
      ],
    ],
  },
  {
    title: "Programs & Features",
    items: ["Gift Cards", "Amazon Live", "International Shopping"],
    subItems: [
      [
        "All Gift Cards",
        "eGift Cards",
        "Gift Card Balance",
        "Corporate Gift Cards",
      ],
      ["Live Streams", "Live Deals", "Live Beauty", "Live Talk Shows"],
      [
        "Visit Amazon Global",
        "International Shipping",
        "Translation Settings",
        "Currency Settings",
      ],
    ],
  },
  {
    title: "Help & Settings",
    items: ["Your Account", "Customer Service", "Sign Out"],
    subItems: [
      ["Your Orders", "Your Addresses", "Your Lists", "Your Recommendations"],
      [
        "Help Center",
        "Contact Us",
        "Returns & Refunds",
        "Shipping Rates & Policies",
      ],
      ["", "", "", ""],
    ],
  },
];
