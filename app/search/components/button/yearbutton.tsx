'use client'
import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
// import images from './images';
import classes from './typebutton.module.css';


// interface TypeButtonProps {
//     data: ItemType[];
// }
export function YearButton() {
    const [selected, setSelected] = useState('');
    const handleInputChange = (event: any) => {
        setSelected(event.target.value);
    };

    return (
        <Menu
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={classes.control} >
                    <Group gap="xs">
                        {/* <Image src={selected.image} width={22} height={22} /> */}
                        <div style={{ "paddingRight": "1000px", display: "flex", alignItems: "start" }}>
                            <span style={{ "fontFamily": "Poppins", "fontSize": "20px", "fontWeight": "500", "lineHeight": "30px", "letterSpacing": "0em", "textAlign": "left", "color": "#ffffff" }}>Year:</span>
                            <input style={{ "fontFamily": "Poppins", "width": "230px", "fontSize": "20px", "fontWeight": "500", "lineHeight": "30px", "letterSpacing": "0em", "textAlign": "left", "color": "#9441d0", "backgroundColor": "black", flex: "1" }}
                                type="text"
                                value={selected}
                                onChange={handleInputChange}
                            />
                        </div>

                    </Group>
                </UnstyledButton>
            </Menu.Target>
        </Menu>
    );
}
