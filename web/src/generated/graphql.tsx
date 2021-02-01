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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
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
  prompts?: Maybe<Array<PromptAndAnswer>>;
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
  prompts: Array<Scalars['String']>;
  deadlines?: Maybe<Array<Deadline>>;
};

export type Deadline = {
  __typename?: 'Deadline';
  state: Scalars['String'];
  deadline: Scalars['DateTime'];
};


export type Prompt = {
  __typename?: 'Prompt';
  id: Scalars['Float'];
  prompt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  join: PlayerResponse;
  answer: Scalars['Boolean'];
  create: GameResponse;
  startGame: Scalars['Boolean'];
  setState: StateResponse;
};


export type MutationJoinArgs = {
  options: UserGameCodeInput;
};


export type MutationAnswerArgs = {
  options: Answers;
};


export type MutationCreateArgs = {
  options: GameInput;
};


export type MutationSetStateArgs = {
  state: Scalars['String'];
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

export type Answers = {
  answer1: Scalars['String'];
  answer2: Scalars['String'];
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

export type StateResponse = {
  __typename?: 'StateResponse';
  errors?: Maybe<Array<FieldError>>;
  state?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newPlayer: Game;
};


export type SubscriptionNewPlayerArgs = {
  game_code: Scalars['String'];
};

export type AnswerMutationVariables = Exact<{
  answer1: Scalars['String'];
  answer2: Scalars['String'];
}>;


export type AnswerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'answer'>
);

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

export type StartGameMutationVariables = Exact<{ [key: string]: never; }>;


export type StartGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'startGame'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'game_code' | 'players' | 'owner' | 'state'>
    & { deadlines?: Maybe<Array<(
      { __typename?: 'Deadline' }
      & Pick<Deadline, 'state' | 'deadline'>
    )>> }
  )> }
);

export type PlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerQuery = (
  { __typename?: 'Query' }
  & { player?: Maybe<(
    { __typename?: 'Player' }
    & Pick<Player, 'username' | 'id' | 'game_code'>
    & { prompts?: Maybe<Array<(
      { __typename?: 'PromptAndAnswer' }
      & Pick<PromptAndAnswer, 'prompt' | 'answer'>
    )>> }
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


export const AnswerDocument = gql`
    mutation Answer($answer1: String!, $answer2: String!) {
  answer(options: {answer1: $answer1, answer2: $answer2})
}
    `;
export type AnswerMutationFn = Apollo.MutationFunction<AnswerMutation, AnswerMutationVariables>;
export type AnswerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AnswerMutation, AnswerMutationVariables>, 'mutation'>;

    export const AnswerComponent = (props: AnswerComponentProps) => (
      <ApolloReactComponents.Mutation<AnswerMutation, AnswerMutationVariables> mutation={AnswerDocument} {...props} />
    );
    

/**
 * __useAnswerMutation__
 *
 * To run a mutation, you first call `useAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerMutation, { data, loading, error }] = useAnswerMutation({
 *   variables: {
 *      answer1: // value for 'answer1'
 *      answer2: // value for 'answer2'
 *   },
 * });
 */
export function useAnswerMutation(baseOptions?: Apollo.MutationHookOptions<AnswerMutation, AnswerMutationVariables>) {
        return Apollo.useMutation<AnswerMutation, AnswerMutationVariables>(AnswerDocument, baseOptions);
      }
export type AnswerMutationHookResult = ReturnType<typeof useAnswerMutation>;
export type AnswerMutationResult = Apollo.MutationResult<AnswerMutation>;
export type AnswerMutationOptions = Apollo.BaseMutationOptions<AnswerMutation, AnswerMutationVariables>;
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
export const StartGameDocument = gql`
    mutation StartGame {
  startGame
}
    `;
export type StartGameMutationFn = Apollo.MutationFunction<StartGameMutation, StartGameMutationVariables>;
export type StartGameComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<StartGameMutation, StartGameMutationVariables>, 'mutation'>;

    export const StartGameComponent = (props: StartGameComponentProps) => (
      <ApolloReactComponents.Mutation<StartGameMutation, StartGameMutationVariables> mutation={StartGameDocument} {...props} />
    );
    

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: Apollo.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        return Apollo.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, baseOptions);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = Apollo.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = Apollo.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    game_code
    players
    owner
    state
    deadlines {
      state
      deadline
    }
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
    prompts {
      prompt
      answer
    }
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