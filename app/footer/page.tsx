"use client"

import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'INFO',
    links: [
      { label: 'Catalog',  div: '#' },
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
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text className={classes.description}>
            Logo
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="#fff" opacity="40%" size="sm">
          © 2023 - Copyright
        </Text>
        <Text c="#fff" opacity="40%" size="sm">
          Privacy
        </Text>
        {/* <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group> */}
      </Container>
    </footer>
  );
}