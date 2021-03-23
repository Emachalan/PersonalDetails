import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import configureStore from './store/configStore';
const { store } = configureStore();

 const httpsLink: any = new HttpLink({
  uri: 'https://fileupload-cloud.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': "iuvT4KdYjFELpe7x0teyWjK7wDsxLu9VjTQ46OGzm1v9tvpRZNpbNo4FEPjaS26i"
  }
});

const wssLink = new WebSocketLink({
  uri: "wss://fileupload-cloud.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': "iuvT4KdYjFELpe7x0teyWjK7wDsxLu9VjTQ46OGzm1v9tvpRZNpbNo4FEPjaS26i"
      }
    }
  }
});

const link: any = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wssLink,
  httpsLink
);

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
};

const client = createApolloClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
