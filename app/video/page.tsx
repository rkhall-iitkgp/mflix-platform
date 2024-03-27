'use client';

import usePlayerStore from '@/Stores/PlayerStore';
import PartyChat from '@/components/PartyChat/PartyChat';
import VideoPlayer from '@/components/VideoPlayer';
import React, { useEffect, useState } from 'react';

const page = () => {
  const { activeChat } = usePlayerStore();

  return (
    <div style={{ display: 'flex' }}>
      <VideoPlayer />
      {activeChat && <PartyChat />}
    </div>
  );
};

export default page;
