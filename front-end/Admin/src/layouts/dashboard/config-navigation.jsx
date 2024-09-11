import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/users",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/blogs",
    icon: icon("ic_blog"),
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: icon("ic_lock"),
  // },
  {
    title: "size",
    path: "/sizes",
    icon: icon("ic_analytics"),
  },
  {
    title: "order",
    path: "/orders",
    icon: icon("ic_order"),
  },
  {
    title: "material",
    path: "/materials",
    icon: icon("ic_import"),
  },
  {
    title: "importStock",
    path: "/importStocks",
    icon: icon("ic_import"),
  },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic_disabled"),
  // },
];

export default navConfig;
