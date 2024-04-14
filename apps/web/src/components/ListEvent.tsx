import {
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Card,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function ListEvent() {
  return (
    <Box px={{ base: 4, sm: 16 }} py={16}>
      <Select
        borderColor={'#A0153E'}
        color={'#5D0E41'}
        width={200}
        placeholder="Select option"
      >
        <option value="most-update">Most Update</option>
        <option value="most-longest">Most Longest</option>
        <option value="most-expensive">Most Expensive</option>
        <option value="most-low-price">Most Low price</option>
      </Select>
      <Tabs mt={10} color={'#5D0E41'} variant="unstyled" colorScheme="green">
        <TabList flexWrap={'wrap'}>
          <Tab _selected={{ fontWeight: 'bold' }}>
            <Text fontSize="sm">All</Text>
          </Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Upcoming</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Promotion</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Music</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Nightlife</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Performing & Visual Arts</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Holidays</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Hobbies</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Food & Drink</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack mt={8} gap={8} flexWrap={'wrap'}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </HStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
