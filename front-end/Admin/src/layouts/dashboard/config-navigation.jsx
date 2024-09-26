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
];

export default navConfig;
