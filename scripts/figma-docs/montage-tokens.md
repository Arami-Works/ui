# Montage Design Token Reference

Extracted from `wanteddev/montage-web` on 2026-04-16. Source of truth for the aramiworks/ui visual redesign.

## Color Palette — Primary Blue

| Step | Hex     |
| ---- | ------- |
| 10   | #001536 |
| 20   | #002966 |
| 30   | #003E9C |
| 40   | #0054D1 |
| 45   | #005EEB |
| 50   | #0066FF |
| 55   | #1A75FF |
| 60   | #3385FF |
| 65   | #4F95FF |
| 70   | #69A5FF |
| 80   | #9EC5FF |
| 90   | #C9DEFE |
| 95   | #EAF2FE |
| 99   | #F7FBFF |

## Color Palette — Cool Neutral (Primary Gray)

| Step | Hex     |
| ---- | ------- |
| 5    | #0F0F10 |
| 7    | #141415 |
| 10   | #171719 |
| 15   | #1B1C1E |
| 17   | #212225 |
| 20   | #292A2D |
| 22   | #2E2F33 |
| 23   | #333438 |
| 25   | #37383C |
| 30   | #46474C |
| 40   | #5A5C63 |
| 50   | #70737C |
| 60   | #878A93 |
| 70   | #989BA2 |
| 80   | #AEB0B6 |
| 90   | #C2C4C8 |
| 95   | #DBDCDF |
| 96   | #E1E2E4 |
| 97   | #EAEBEC |
| 98   | #F4F4F5 |
| 99   | #F7F7F8 |

## Semantic Colors — Light Theme

| Token                           | Hex             |
| ------------------------------- | --------------- |
| primary.normal                  | #0066FF         |
| primary.strong                  | #005EEB         |
| primary.heavy                   | #0054D1         |
| label.normal                    | #171719         |
| label.strong                    | #000000         |
| label.neutral                   | #2E2F33E0 (88%) |
| label.alternative               | #37383C9C (61%) |
| label.assistive                 | #37383C47 (28%) |
| label.disable                   | #37383C29 (16%) |
| background.normal.normal        | #FFFFFF         |
| background.normal.alternative   | #F7F7F8         |
| background.elevated.normal      | #FFFFFF         |
| background.elevated.alternative | #F7F7F8         |
| interaction.inactive            | #989BA2         |
| interaction.disable             | #F4F4F5         |
| line.normal.normal              | #70737C38 (22%) |
| line.normal.neutral             | #70737C29 (16%) |
| line.normal.alternative         | #70737C14 (8%)  |
| line.solid.normal               | #E1E2E4         |
| line.solid.neutral              | #EAEBEC         |
| line.solid.alternative          | #F4F4F5         |
| status.positive                 | #00BF40         |
| status.cautionary               | #FF9200         |
| status.negative                 | #FF4242         |
| fill.normal                     | #70737C14 (8%)  |
| fill.strong                     | #70737C29 (16%) |
| fill.alternative                | #70737C0D (5%)  |
| material.dimmer                 | #17171985 (52%) |
| inverse.primary                 | #3385FF         |
| inverse.background              | #1B1C1E         |
| inverse.label                   | #F7F7F8         |

## Semantic Colors — Dark Theme

| Token                           | Hex             |
| ------------------------------- | --------------- |
| primary.normal                  | #3385FF         |
| primary.strong                  | #1A75FF         |
| primary.heavy                   | #0066FF         |
| label.normal                    | #F7F7F8         |
| label.strong                    | #FFFFFF         |
| label.neutral                   | #C2C4C8E0 (88%) |
| label.alternative               | #AEB0B69C (61%) |
| label.assistive                 | #AEB0B647 (28%) |
| label.disable                   | #989BA229 (16%) |
| background.normal.normal        | #1B1C1E         |
| background.normal.alternative   | #0F0F10         |
| background.elevated.normal      | #212225         |
| background.elevated.alternative | #141415         |
| interaction.inactive            | #5A5C63         |
| interaction.disable             | #2E2F33         |
| line.normal.normal              | #70737C52 (32%) |
| line.solid.normal               | #37383C         |
| line.solid.neutral              | #333438         |
| line.solid.alternative          | #2E2F33         |
| status.positive                 | #1ED45A         |
| status.cautionary               | #FFA938         |
| status.negative                 | #FF6363         |
| fill.normal                     | #70737C38 (22%) |
| fill.strong                     | #70737C47 (28%) |
| fill.alternative                | #70737C1F (12%) |
| material.dimmer                 | #171719BD (74%) |
| inverse.primary                 | #0066FF         |
| inverse.background              | #FFFFFF         |
| inverse.label                   | #171719         |

## MD3 Role -> Montage Mapping

| MD3 Role                | Montage Token                 | Light Hex  | Dark Hex   |
| ----------------------- | ----------------------------- | ---------- | ---------- |
| primary                 | primary.normal                | #0066FF    | #3385FF    |
| onPrimary               | static.white                  | #FFFFFF    | #FFFFFF    |
| primaryContainer        | fill.strong                   | #70737C29  | #70737C47  |
| onPrimaryContainer      | primary.normal                | #0066FF    | #3385FF    |
| secondary               | label.alternative             | #37383C9C  | #AEB0B69C  |
| secondaryContainer      | fill.normal                   | #70737C14  | #70737C38  |
| onSecondaryContainer    | label.normal                  | #171719    | #F7F7F8    |
| tertiary                | interaction.inactive          | #989BA2    | #5A5C63    |
| tertiaryContainer       | fill.alternative              | #70737C0D  | #70737C1F  |
| onTertiaryContainer     | label.neutral                 | #2E2F33E0  | #C2C4C8E0  |
| error                   | status.negative               | #FF4242    | #FF6363    |
| onError                 | static.white                  | #FFFFFF    | #FFFFFF    |
| errorContainer          | (status.negative @ 12%)       | ~#FF424229 | ~#FF636329 |
| onErrorContainer        | status.negative               | #FF4242    | #FF6363    |
| surface                 | background.normal.normal      | #FFFFFF    | #1B1C1E    |
| onSurface               | label.normal                  | #171719    | #F7F7F8    |
| surfaceVariant          | background.normal.alternative | #F7F7F8    | #0F0F10    |
| onSurfaceVariant        | label.neutral                 | #2E2F33E0  | #C2C4C8E0  |
| surfaceContainerLowest  | static.white                  | #FFFFFF    | #0F0F10    |
| surfaceContainerLow     | background.normal.alternative | #F7F7F8    | #141415    |
| surfaceContainer        | fill.alternative              | #70737C0D  | #70737C1F  |
| surfaceContainerHigh    | background.elevated.normal    | #FFFFFF    | #212225    |
| surfaceContainerHighest | fill.normal                   | #70737C14  | #70737C38  |
| outline                 | line.solid.normal             | #E1E2E4    | #37383C    |
| outlineVariant          | line.solid.neutral            | #EAEBEC    | #333438    |
| inverseSurface          | inverse.background            | #1B1C1E    | #FFFFFF    |
| inverseOnSurface        | inverse.label                 | #F7F7F8    | #171719    |
| inversePrimary          | inverse.primary               | #3385FF    | #0066FF    |
| scrim                   | material.dimmer               | #17171985  | #171719BD  |
| shadow                  | static.black                  | #000000    | #000000    |

## Typography

| Montage Variant | Size (px) | Line Height (px) | Letter Spacing (em) | -> MD3 Role    |
| --------------- | --------- | ---------------- | ------------------- | -------------- |
| display1        | 56        | 72               | -0.0319             | displayLarge   |
| display2        | 40        | 52               | -0.0282             | displayMedium  |
| display3        | 36        | 48               | -0.027              | displaySmall   |
| title1          | 32        | 44               | -0.0253             | headlineLarge  |
| title2          | 28        | 38               | -0.0236             | headlineMedium |
| title3          | 24        | 32               | -0.023              | headlineSmall  |
| heading1        | 22        | 30               | -0.0194             | titleLarge     |
| heading2        | 20        | 28               | -0.012              | titleMedium    |
| headline1       | 18        | 26               | -0.002              | titleSmall     |
| headline2       | 17        | 24               | 0                   | bodyLarge      |
| body1           | 16        | 24               | 0.0057              | bodyMedium     |
| body2           | 15        | 22               | 0.0096              | bodySmall      |
| label1          | 14        | 20               | 0.0145              | labelLarge     |
| label2          | 13        | 18               | 0.0194              | labelMedium    |
| caption1        | 12        | 16               | 0.0252              | labelSmall     |

Font weights: Regular (400), Medium (500), SemiBold (600), Bold (700)

## Border Radius

| Component       | Size         | Radius       |
| --------------- | ------------ | ------------ |
| Button          | large        | 12px         |
| Button          | medium       | 10px         |
| Button          | small        | 8px          |
| Chip            | xsmall       | 6px          |
| Chip            | small-medium | 8px          |
| Chip            | large        | 10px         |
| TextField       | all          | 12px         |
| Card/Thumbnail  | all          | 12px         |
| Modal           | small-medium | 12px         |
| Modal           | large-xlarge | 20px         |
| Tooltip         | small        | 6px          |
| Tooltip         | medium       | 8px          |
| Avatar (circle) | all          | 9999px       |
| Switch          | all          | 100px (pill) |

## Shadows

| Level  | Box Shadow                                                                      |
| ------ | ------------------------------------------------------------------------------- |
| xsmall | 0px 1px 2px -1px rgba(23,23,23,0.10)                                            |
| small  | 0px 2px 4px -2px rgba(23,23,23,0.06), 0px 4px 6px -1px rgba(23,23,23,0.06)      |
| medium | 0px 4px 6px -2px rgba(23,23,23,0.07), 0px 10px 15px -3px rgba(23,23,23,0.07)    |
| large  | 0px 6px 10px -4px rgba(23,23,23,0.08), 0px 16px 24px -6px rgba(23,23,23,0.08)   |
| xlarge | 0px 10px 15px -5px rgba(23,23,23,0.10), 0px 24px 38px -10px rgba(23,23,23,0.12) |

## Interaction States

| State                   | Opacity                                  |
| ----------------------- | ---------------------------------------- |
| Hover (normal)          | 0.05                                     |
| Hover (light)           | 0.0375                                   |
| Hover (strong)          | 0.075                                    |
| Active (normal)         | 0.12                                     |
| Active (light)          | 0.09                                     |
| Active (strong)         | 0.18                                     |
| Disabled (switch/input) | opacity 0.43                             |
| Focus                   | 2px solid outline                        |
| Transition              | opacity 0.15s ease, transform 0.15s ease |
