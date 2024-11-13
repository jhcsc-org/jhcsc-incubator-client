import UnderConstruction from '@/components/under-construction';
import { TOPICS } from '@/lib/constants';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { createFileRoute } from '@tanstack/react-router';
import { Hub } from 'aws-amplify/utils';

export const Route = createFileRoute('/relays')({
  component: () => <UnderConstruction />,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Hub.listen(TOPICS.shadows.getAccepted.topic, (data: any) => {
  const { payload } = data;
  console.log(payload);
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState as ConnectionState;
    console.log(connectionState);
  }
});