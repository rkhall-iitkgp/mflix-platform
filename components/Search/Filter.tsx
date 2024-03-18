'use client';

import { useState } from 'react';
import { Select, Stack, Text, Group } from '@mantine/core';
import { IoChevronDownOutline } from 'react-icons/io5';
import themeOptions from '@/utils/colors';

import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  return (
    <Stack gap={0}>
        <Text pos="relative" top="2rem" left={10}>Hmm : <Text span inherit c={themeOptions.color.textColorNormal}>{value}</Text></Text>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
              setValue(val);
              combobox.closeDropdown();
          }}
        >
        <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<IoChevronDownOutline color={themeOptions.color.textColorNormal} />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              radius={10}
              h={44}
              styles={{
                  input: {
                      background: 'transparent',
                      borderColor: themeOptions.color.insideTextColor,
                  },
              }}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
            <Combobox.Group label="Fruits">
                <Combobox.Option value="🍎 Apples">🍎 Apples</Combobox.Option>
                <Combobox.Option value="🍌 Bananas">🍌 Bananas</Combobox.Option>
                <Combobox.Option value="🍇 Grape">🍇 Grape</Combobox.Option>
            </Combobox.Group>

            <Combobox.Group label="Vegetables">
                <Combobox.Option value="🥦 Broccoli">🥦 Broccoli</Combobox.Option>
                <Combobox.Option value="🥕 Carrots">🥕 Carrots</Combobox.Option>
                <Combobox.Option value="🥬 Lettuce">🥬 Lettuce</Combobox.Option>
            </Combobox.Group>
            </Combobox.Options>
        </Combobox.Dropdown>
        </Combobox>
    </Stack>
  );
}

export default function Filter() {
    const [value, setValue] = useState<string>('');

    return (
        <Stack>
            <Text>Filter uwu</Text>
            <Demo />
            {/* <Group>
                <Select
                  h="1rem"
                  radius={10}
                  fz={themeOptions.fontSize.s}
                  rightSection={<IoChevronDownOutline color={themeOptions.color.textColorNormal} />}
                  label={`Hmm : ${value}`}
                  value={value}
                  data={['helo', 'ho', 'hi']}
                  styles={{
                    input: {
                        background: 'transparent',
                    },
                    label: {
                        position: 'relative',
                        left: '5%',
                        top: '2rem',
                    },
                  }}
                />
            </Group> */}
        </Stack>
    );
}
