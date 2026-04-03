import React, { useState } from "react";
import { YStack } from "tamagui";
import { TimePicker } from "../../time-picker";
import { Button } from "../../../atoms/button";
import { Text } from "../../../atoms/text";

export const TimePickerOverview = () => {
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);

  const display = `${String(hour % 12 || 12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;

  return (
    <YStack gap={16} padding={32} alignItems="center">
      <Text variant="bodyMedium">Selected: {display}</Text>
      <Button variant="filled" onPress={() => setVisible(true)}>
        Pick a Time
      </Button>
      <TimePicker
        visible={visible}
        hour={hour}
        minute={minute}
        onConfirm={(h, m) => { setHour(h); setMinute(m); setVisible(false); }}
        onDismiss={() => setVisible(false)}
        testID="time-picker"
      />
    </YStack>
  );
};

TimePickerOverview.storyName = "TimePicker/Overview";
