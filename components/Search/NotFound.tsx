import { Group, Stack, Text, List, Textarea, Button, UnstyledButton, Space, Center, Loader } from '@mantine/core';
import Image from 'next/image';
import Carousel from './Carousel';
import { MovieCard, MovieCardSpace } from './MovieCard';
import { useState, useEffect } from 'react';
import { PiSmileySadFill } from 'react-icons/pi';
import sadFace from '@/assets/images/sadFace.png'
import themeOptions from '@/utils/colors';
import searchMsApiUrls from '@/app/api/searchMsApi';

const NotFound: React.FC<{ search: string | null }> = ({ search }) => {
	const [value, setValue] = useState<string>('');
	const [trending, setTrending] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(0);
    const [hasNext, setHasNext] = useState(true);

	const nextPage = () => {
        if (hasNext) setPage(page+1);
        console.log(page);
    }

    useEffect(() => {
        if (page >= 2) getData(page);
    }, [page]);

	const getData = async (page: number) => {
		const res = await (await fetch(
			`${searchMsApiUrls()}search/fuzzy?query=&start=2015&end=2023&low=8&high=10&language=&country=&genre=&type=&page=${page}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
			}
		)).json();
		setTrending(trending.concat(res.results));
        if (!res.hasNext) setHasNext(false);
	}

	useEffect(() => {
		const fetchData = async () => {
			const res = await (await fetch(
				`${searchMsApiUrls()}search/fuzzy?query=&start=2015&end=2023&low=8&high=10&language=&country=&genre=&type=&page=1`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					  },
				}
			)).json();
			setTrending(res.results);
			setPage(1)
		}
		fetchData()
	}, [])

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
			  minRows={7}
			  value={value}
			  onChange={(e) => setValue(e.currentTarget.value)}
			  fz={themeOptions.fontSize.md}
			  w="min(1000px, 70vw)"
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
			<Group w="min(1000px, 70vw)" justify="flex-end" mt={20}>
				<UnstyledButton  fz={themeOptions.fontSize.md} onClick={() => setValue('')}>Cancel</UnstyledButton>
				<Button radius={12} ml={20} size="lg" pl={45} pr={45} bg={themeOptions.color.smallBox} p={10}>Submit</Button>
			</Group>
			<Space h={themeOptions.fontSize.l}/>
			<Text fz={themeOptions.fontSize.xl}>You may also like:</Text>
			{trending.length ?
			<Carousel nextPage={nextPage}>
				{trending.map((data, index) => <MovieCard key={index} {...data} />)}
				{ hasNext ?
				<MovieCardSpace>
					<Center h="100%">
						<Loader color="gray" type="dots" size={100} />
					</Center>
				</MovieCardSpace>
				:
				null
				}
			</Carousel>
			:
			null
			}
        	<Space h="lg" />
		</Stack>
	)
};

export default NotFound;
