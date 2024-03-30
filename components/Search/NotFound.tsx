import { Group, Stack, Text, List, Textarea, Button, UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PiSmileySadFill } from 'react-icons/pi';
import sadFace from '@/assets/images/sadFace.png'
import themeOptions from '@/utils/colors';

const NotFound: React.FC<{ search: string | null }> = ({ search }) => {
	const [value, setValue] = useState<string>('');
	return (
		<Stack>
			<Group pos="absolute" right={-75}>
				<Image alt='sad' height={50} width={50} src={sadFace}/>
			</Group>
			<Text fz={themeOptions.fontSize.xl} fw={600}>
				Hmm, we didn't find anything for : {' '}
				<Text span inherit c={themeOptions.color.textColorNormal}>{search}</Text>
			</Text>
			<List withPadding fz={themeOptions.fontSize.md}>
				<List.Item>Check for typos and spelling errors</List.Item>
				<List.Item>Try more general keywords</List.Item>
				<List.Item>The movie that you’re searching for might be removed from our site</List.Item>
			</List>
			<Text fz={themeOptions.fontSize.md}>
				If you didn’t find what you were looking for, send us some 
				<Text span inherit c={themeOptions.color.smallBox}> feedback </Text>
				to help improve our site
			</Text>
			<Textarea
			  radius={12}
			  autosize
			  minRows={5}
			  value={value}
			  onChange={(e) => setValue(e.currentTarget.value)}
			  fz={themeOptions.fontSize.md}
			  w="70vw"
			  placeholder={"Enter your comments here..."}
			  styles={{
				root: {
				},
				input: {
					backgroundColor: "#D9D9D91A",
					borderColor: themeOptions.color.smallBox,
					color: themeOptions.color.normalTextColor,
					padding: '15px',
				}
			}}
			/>
			<Group w="70vw" justify="flex-end" mt={20}>
				<UnstyledButton  fz={themeOptions.fontSize.md} onClick={() => setValue('')}>Cancel</UnstyledButton>
				<Button radius={12} ml={20} size="lg" pl={45} pr={45} bg={themeOptions.color.smallBox} p={10}>Submit</Button>
			</Group>
		</Stack>
	)
};

export default NotFound;
