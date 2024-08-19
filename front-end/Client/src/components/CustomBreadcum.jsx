import { Breadcrumbs, Chip, emphasize } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

import { useRouter } from "src/routes/hooks";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
export const BreadcrumItem = ({ component, icon, href, label, sx }) => {
  const router = useRouter();
  return (
    <StyledBreadcrumb
      component={component}
      icon={icon}
      href={href}
      label={label}
      onClick={(event) => {
        event.preventDefault();
        router.replace(href);
      }}
      sx={{
        ...sx,
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
      }}
    />
  );
};
export const CustomizedBreadcrumbs = ({ sx, children }) => {
  return (
    <Box role="presentation" sx={{ ...sx }}>
      <Breadcrumbs aria-label="breadcrumb">{children}</Breadcrumbs>
    </Box>
  );
};
