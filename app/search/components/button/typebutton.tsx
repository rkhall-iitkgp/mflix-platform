import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
// import images from './images';
import classes from './typebutton.module.css';


// interface TypeButtonProps {
//     data: ItemType[];
// }
export function TypeButton({ value, data }: { value: string, data: string[] }) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(data[0]);
    const items = data.map((item) => (
        <Menu.Item
            // leftSection={<Image src={item.image} width={18} height={18} />}
            onClick={() => setSelected(item)}
            key={item}
        >
            {item}
        </Menu.Item>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                    <Group gap="xs">
                        {/* <Image src={selected.image} width={22} height={22} /> */}
                        <span style={{ "fontFamily": "Poppins", "fontSize": "20px", "fontWeight": "500", "lineHeight": "30px", "letterSpacing": "0em", "textAlign": "left", "color": "#ffffff" }} >{value}:</span>
                        <span style={{ "fontFamily": "Poppins", "fontSize": "20px", "fontWeight": "500", "lineHeight": "30px", "letterSpacing": "0em", "textAlign": "left", "color": "#9441d0" }}>{selected}</span>
                    </Group>
                    <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown className={classes.type}>{items}</Menu.Dropdown>
        </Menu>
    );
}