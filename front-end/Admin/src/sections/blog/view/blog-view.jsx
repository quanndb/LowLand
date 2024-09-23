import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Card, Tab } from "@mui/material";
import { useState } from "react";
import PostList from "../post-list";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PostEditor from "../post-editor";

// ----------------------------------------------------------------------

export default function BlogView() {
  const [value, setValue] = useState("new-blog");
  return (
    <Container>
      <TabContext value={value}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Blog</Typography>
        </Stack>
        <Stack sx={{ mb: 5 }}>
          <Card>
            <TabList
              onChange={(event, newValue) => setValue(newValue)}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              <Tab label="Blogs" value={"blogs"} />
              <Tab label="New blog" value={"new-blog"} />
            </TabList>
          </Card>
        </Stack>

        <TabPanel value="blogs" sx={{ p: 0 }}>
          <PostList />
        </TabPanel>
        <TabPanel value="new-blog" sx={{ p: 0 }}>
          <PostEditor />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
