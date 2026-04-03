import React from "react";
import { YStack } from "tamagui";
import { Card } from "../../card";
import { Text } from "../../../text";

export const CardOverview = () => (
  <YStack gap={16} padding={16}>
    <Card variant="elevated">
      <Text variant="titleMedium">Elevated Card</Text>
      <Text variant="bodyMedium">Surface container low background with shadow.</Text>
    </Card>
    <Card variant="filled">
      <Text variant="titleMedium">Filled Card</Text>
      <Text variant="bodyMedium">Surface container highest background, no shadow.</Text>
    </Card>
    <Card variant="outlined">
      <Text variant="titleMedium">Outlined Card</Text>
      <Text variant="bodyMedium">Surface background with outline border.</Text>
    </Card>
    <Card variant="elevated" onPress={() => {}}>
      <Text variant="titleMedium">Interactive Card</Text>
      <Text variant="bodyMedium">Press me — scale feedback on tap.</Text>
    </Card>
    <Card variant="filled" disabled>
      <Text variant="titleMedium">Disabled Card</Text>
      <Text variant="bodyMedium">Opacity 0.38.</Text>
    </Card>
  </YStack>
);

CardOverview.storyName = "Card/Overview";
