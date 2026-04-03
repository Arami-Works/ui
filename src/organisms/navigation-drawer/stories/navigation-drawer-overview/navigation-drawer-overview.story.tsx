import React, { useState } from "react";
import { View } from "tamagui";
import { NavigationDrawer } from "../../navigation-drawer";
import { Button } from "../../../atoms/button";

const sections = [
  {
    header: "Discover",
    destinations: [
      { key: "home", icon: "home", activeIcon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search", badgeCount: 5 },
      { key: "bookmarks", icon: "bookmark_border", activeIcon: "bookmark", label: "Bookmarks" },
    ],
  },
  {
    header: "Account",
    destinations: [
      { key: "profile", icon: "person_outline", activeIcon: "person", label: "Profile" },
      { key: "settings", icon: "settings", label: "Settings" },
      { key: "help", icon: "help_outline", label: "Help" },
    ],
  },
];

export const NavigationDrawerOverview = () => {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("home");

  return (
    <View flex={1} padding={32}>
      <Button variant="filled" onPress={() => setOpen(true)}>
        Open Drawer
      </Button>
      <NavigationDrawer
        open={open}
        onClose={() => setOpen(false)}
        sections={sections}
        activeKey={activeKey}
        onDestinationPress={(key) => {
          setActiveKey(key);
          setOpen(false);
        }}
        testID="drawer"
      />
    </View>
  );
};

NavigationDrawerOverview.storyName = "NavigationDrawer/Overview";
