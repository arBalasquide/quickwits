import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  player?: Maybe<Player>;
  me?: Maybe<Game>;
  prompt?: Maybe<Prompt>;
};


export type QueryPromptArgs = {
  id: Scalars['Float'];
};

export type Player = {
  __typename?: 'Player';
  username: Scalars['String'];
  game_code: Scalars['String'];
  id: Scalars['String'];
  prompts: PromptAndAnswer;
};

export type PromptAndAnswer = {
  __typename?: 'PromptAndAnswer';
  prompt: Scalars['String'];
  answer: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  game_code: Scalars['String'];
  players: Array<Scalars['String']>;
  owner: Scalars['String'];
  state: Scalars['String'];
  currentRound: Scalars['Float'];
};

export type Prompt = {
  __typename?: 'Prompt';
  id: Scalars['Float'];
  prompt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  join: PlayerResponse;
  create: GameResponse;
  gameLoop?: Maybe<Game>;
};


export type MutationJoinArgs = {
  options: UserGameCodeInput;
};


export type MutationCreateArgs = {
  options: GameInput;
};


export type MutationGameLoopArgs = {
  game_code: Scalars['String'];
};

export type PlayerResponse = {
  __typename?: 'PlayerResponse';
  errors?: Maybe<Array<FieldError>>;
  player?: Maybe<Player>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserGameCodeInput = {
  username: Scalars['String'];
  game_code: Scalars['String'];
};

export type GameResponse = {
  __typename?: 'GameResponse';
  errors?: Maybe<Array<FieldError>>;
  game?: Maybe<Game>;
};

export type GameInput = {
  game_code: Scalars['String'];
  owner: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPlayer: Game;
};


export type SubscriptionNewPlayerArgs = {
  game_code: Scalars['String'];
};

export type CreateMutationVariables = Exact<{
  game_code: Scalars['String'];
  owner: Scalars['String'];
}>;


export type CreateMutation = (
  { __typename?: 'Mutation' }
  & { create: (
    { __typename?: 'GameResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, game?: Maybe<(
      { __typename?: 'Game' }
      & Pick<Game, 'game_code' | 'owner' | 'players'>
    )> }
  ) }
);

export type JoinMutationVariables = Exact<{
  username: Scalars['String'];
  game_code: Scalars['String'];
}>;


export type JoinMutation = (
  { __typename?: 'Mutation' }
  & { join: (
    { __typename?: 'PlayerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, player?: Maybe<(
      { __typename?: 'Player' }
      & Pick<Player, 'username' | 'game_code'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'game_code' | 'players' | 'owner' | 'state'>
  )> }
);

export type PlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerQuery = (
  { __typename?: 'Query' }
  & { player?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'username' | 'id' | 'game_code'>
  )> }
);

export type OnNewPlayerSubscriptionVariables = Exact<{
  game_code: Scalars['String'];
}>;


export type OnNewPlayerSubscription = (
  { __typename?: 'Subscription' }
  & { newPlayer: (
    { __typename?: 'Game' }
    & Pick<Game, 'players'>
  ) }
);


export const CreateDocument = gql`
    mutation Create($game_code: String!, $owner: String!) {
  create(options: {game_code: $game_code, owner: $owner}) {
    errors {
      field
      message
    }
    game {
      game_code
      owner
      players
    }
  }
}
    `;
export type CreateMutationFn = Apollo.MutationFunction<CreateMutation, CreateMutationVariables>;
export type CreateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateMutation, CreateMutationVariables>, 'mutation'>;

    export const CreateComponent = (props: CreateComponentProps) => (
      <ApolloReactComponents.Mutation<CreateMutation, CreateMutationVariables> mutation={CreateDocument} {...props} />
    );
    

/**
 * __useCreateMutation__
 *
 * To run a mutation, you first call `useCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMutation, { data, loading, error }] = useCreateMutation({
 *   variables: {
 *      game_code: // value for 'game_code'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useCreateMutation(baseOptions?: Apollo.MutationHookOptions<CreateMutation, CreateMutationVariables>) {
        return Apollo.useMutation<CreateMutation, CreateMutationVariables>(CreateDocument, baseOptions);
      }
export type CreateMutationHookResult = ReturnType<typeof useCreateMutation>;
export type CreateMutationResult = Apollo.MutationResult<CreateMutation>;
export type CreateMutationOptions = Apollo.BaseMutationOptions<CreateMutation, CreateMutationVariables>;
export const JoinDocument = gql`
    mutation Join($username: String!, $game_code: String!) {
  join(options: {username: $username, game_code: $game_code}) {
    errors {
      field
      message
    }
    player {
      username
      game_code
    }
  }
}
    `;
export type JoinMutationFn = Apollo.MutationFunction<JoinMutation, JoinMutationVariables>;
export type JoinComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinMutation, JoinMutationVariables>, 'mutation'>;

    export const JoinComponent = (props: JoinComponentProps) => (
      <ApolloReactComponents.Mutation<JoinMutation, JoinMutationVariables> mutation={JoinDocument} {...props} />
    );
    

/**
 * __useJoinMutation__
 *
 * To run a mutation, you first call `useJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMutation, { data, loading, error }] = useJoinMutation({
 *   variables: {
 *      username: // value for 'username'
 *      game_code: // value for 'game_code'
 *   },
 * });
 */
export function useJoinMutation(baseOptions?: Apollo.MutationHookOptions<JoinMutation, JoinMutationVariables>) {
        return Apollo.useMutation<JoinMutation, JoinMutationVariables>(JoinDocument, baseOptions);
      }
export type JoinMutationHookResult = ReturnType<typeof useJoinMutation>;
export type JoinMutationResult = Apollo.MutationResult<JoinMutation>;
export type JoinMutationOptions = Apollo.BaseMutationOptions<JoinMutation, JoinMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    game_code
    players
    owner
    state
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PlayerDocument = gql`
    query Player {
  player {
    username
    id
    game_code
  }
}
    `;
export type PlayerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PlayerQuery, PlayerQueryVariables>, 'query'>;

    export const PlayerComponent = (props: PlayerComponentProps) => (
      <ApolloReactComponents.Query<PlayerQuery, PlayerQueryVariables> query={PlayerDocument} {...props} />
    );
    

/**
 * __usePlayerQuery__
 *
 * To run a query within a React component, call `usePlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayerQuery(baseOptions?: Apollo.QueryHookOptions<PlayerQuery, PlayerQueryVariables>) {
        return Apollo.useQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, baseOptions);
      }
export function usePlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerQuery, PlayerQueryVariables>) {
          return Apollo.useLazyQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, baseOptions);
        }
export type PlayerQueryHookResult = ReturnType<typeof usePlayerQuery>;
export type PlayerLazyQueryHookResult = ReturnType<typeof usePlayerLazyQuery>;
export type PlayerQueryResult = Apollo.QueryResult<PlayerQuery, PlayerQueryVariables>;
export const OnNewPlayerDocument = gql`
    subscription onNewPlayer($game_code: String!) {
  newPlayer(game_code: $game_code) {
    players
  }
}
    `;
export type OnNewPlayerComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<OnNewPlayerSubscription, OnNewPlayerSubscriptionVariables>, 'subscription'>;

    export const OnNewPlayerComponent = (props: OnNewPlayerComponentProps) => (
      <ApolloReactComponents.Subscription<OnNewPlayerSubscription, OnNewPlayerSubscriptionVariables> subscription={OnNewPlayerDocument} {...props} />
    );
    

/**
 * __useOnNewPlayerSubscription__
 *
 * To run a query within a React component, call `useOnNewPlayerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewPlayerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewPlayerSubscription({
 *   variables: {
 *      game_code: // value for 'game_code'
 *   },
 * });
 */
export function useOnNewPlayerSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewPlayerSubscription, OnNewPlayerSubscriptionVariables>) {
        return Apollo.useSubscription<OnNewPlayerSubscription, OnNewPlayerSubscriptionVariables>(OnNewPlayerDocument, baseOptions);
      }
export type OnNewPlayerSubscriptionHookResult = ReturnType<typeof useOnNewPlayerSubscription>;
export type OnNewPlayerSubscriptionResult = Apollo.SubscriptionResult<OnNewPlayerSubscription>;