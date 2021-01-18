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
  me?: Maybe<Game>;
};


export type QueryMeArgs = {
  code: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  game_code: Scalars['String'];
  players: Array<Scalars['String']>;
  owner: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: GameResponse;
  join: PlayerResponse;
};


export type MutationCreateArgs = {
  options: GameInput;
};


export type MutationJoinArgs = {
  options: UserGameCodeInput;
};

export type GameResponse = {
  __typename?: 'GameResponse';
  errors?: Maybe<Array<FieldError>>;
  game?: Maybe<Game>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GameInput = {
  game_code: Scalars['String'];
  owner: Scalars['String'];
};

export type PlayerResponse = {
  __typename?: 'PlayerResponse';
  errors?: Maybe<Array<FieldError>>;
  player?: Maybe<Player>;
};

export type Player = {
  __typename?: 'Player';
  username: Scalars['String'];
  game_code: Scalars['String'];
};

export type UserGameCodeInput = {
  username: Scalars['String'];
  game_code: Scalars['String'];
};

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