"use client"

import { Text, Container, ActionIcon, Group, rem, } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import themeOptions from '@/utils/colors';

const data = [
  {
    title: 'INFO',
    links: [
      { label: 'Catalog', link: '#' },
      { label: 'About us', link: '#' },
      { label: 'For customers', link: '#' },
      { label: 'Contacts', link: '#' },
    ],
  },
  {
    title: 'CONTACT US',
    links: [
      { label: '+1 980 971-24-19', link: '#' },
      { label: 'hello@logoipsum.con', link: '#' },
      // { label: 'Changelog', link: '#' },
      // { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'FIND US',
    links: [
      { label: '1901 Thornridge Cir. Shiloh, Hawaii 81063', link: '#' },
      { label: 'Everyday from 10am to 8pm', link: '#' },
      // { label: 'Email newsletter', link: '#' },
      // { label: 'GitHub discussions', link: '#' },
    ],
  },
];

export default function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        component="a"
        style={{display:"block", color:"#fff", opacity:"80%",
        fontSize:"var(--mantine-font-size-sm)",
        paddingTop:"3px", paddingBottom:"3px", transition:"0.8s",
        marginInline:"100px"}}
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div style={{ width: "rem(160px" }}>
        <Text style={{
          fontSize: "var(--mantine-font-size-lg)",
          fontWeight: "700", fontFamily: "sans-serif", marginBottom: "calc(var(--mantine-spacing-xs) / 2);",
          color: "#fff", opacity: "40%", marginInline:"100px"
        }}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer style={{
      marginTop: "rem(50px)", width: "100%",
      paddingTop: "calc(var(--mantine-spacing-xl) * 2)",
      paddingBottom: "calc(var(--mantine-spacing-xl) * 2)",
      backgroundColor: "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
      borderTop: "rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))"
    }}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Container style={{ marginLeft: "0px", display: "flex", justifyContent: "space-between" }}>
          <div>
            <Text c={themeOptions.color.button} style={{
              fontSize: "50px", fontWeight: "500",
              marginLeft: "30px", lineHeight: "61px", letterSpacing: "0em",
              textAlign: "left"
            }}>
              Logo
            </Text>
          </div>
        </Container>
        <div style={{ marginLeft: "0px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>{groups}</div>
        </div>
      </div>
      <div style={{
        marginLeft: "0px", display: "flex", justifyContent: "space-between",
        alignItems: "center", marginTop: "var(--mantine-spacing-xl)",
        paddingTop: "var(--mantine-spacing-xl)", paddingInline:"30px",
        borderTop: "rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))"
      }}>
        <Text c="#fff" opacity="40%" size="sm">
          © 2023 - Copyright
        </Text>
        <Text c="#fff" opacity="40%" size="sm">
          Privacy
        </Text>
        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </footer>
  );
}