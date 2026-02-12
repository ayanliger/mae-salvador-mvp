
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Gestante
 * 
 */
export type Gestante = $Result.DefaultSelection<Prisma.$GestantePayload>
/**
 * Model Profissional
 * 
 */
export type Profissional = $Result.DefaultSelection<Prisma.$ProfissionalPayload>
/**
 * Model Consulta
 * 
 */
export type Consulta = $Result.DefaultSelection<Prisma.$ConsultaPayload>
/**
 * Model Exame
 * 
 */
export type Exame = $Result.DefaultSelection<Prisma.$ExamePayload>
/**
 * Model Vacina
 * 
 */
export type Vacina = $Result.DefaultSelection<Prisma.$VacinaPayload>
/**
 * Model Medicacao
 * 
 */
export type Medicacao = $Result.DefaultSelection<Prisma.$MedicacaoPayload>
/**
 * Model CondicaoClinica
 * 
 */
export type CondicaoClinica = $Result.DefaultSelection<Prisma.$CondicaoClinicaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Gestantes
 * const gestantes = await prisma.gestante.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Gestantes
   * const gestantes = await prisma.gestante.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.gestante`: Exposes CRUD operations for the **Gestante** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gestantes
    * const gestantes = await prisma.gestante.findMany()
    * ```
    */
  get gestante(): Prisma.GestanteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profissional`: Exposes CRUD operations for the **Profissional** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profissionals
    * const profissionals = await prisma.profissional.findMany()
    * ```
    */
  get profissional(): Prisma.ProfissionalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consulta`: Exposes CRUD operations for the **Consulta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultas
    * const consultas = await prisma.consulta.findMany()
    * ```
    */
  get consulta(): Prisma.ConsultaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exame`: Exposes CRUD operations for the **Exame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exames
    * const exames = await prisma.exame.findMany()
    * ```
    */
  get exame(): Prisma.ExameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vacina`: Exposes CRUD operations for the **Vacina** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vacinas
    * const vacinas = await prisma.vacina.findMany()
    * ```
    */
  get vacina(): Prisma.VacinaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicacao`: Exposes CRUD operations for the **Medicacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medicacaos
    * const medicacaos = await prisma.medicacao.findMany()
    * ```
    */
  get medicacao(): Prisma.MedicacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.condicaoClinica`: Exposes CRUD operations for the **CondicaoClinica** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CondicaoClinicas
    * const condicaoClinicas = await prisma.condicaoClinica.findMany()
    * ```
    */
  get condicaoClinica(): Prisma.CondicaoClinicaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Gestante: 'Gestante',
    Profissional: 'Profissional',
    Consulta: 'Consulta',
    Exame: 'Exame',
    Vacina: 'Vacina',
    Medicacao: 'Medicacao',
    CondicaoClinica: 'CondicaoClinica'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "gestante" | "profissional" | "consulta" | "exame" | "vacina" | "medicacao" | "condicaoClinica"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Gestante: {
        payload: Prisma.$GestantePayload<ExtArgs>
        fields: Prisma.GestanteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GestanteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GestanteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          findFirst: {
            args: Prisma.GestanteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GestanteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          findMany: {
            args: Prisma.GestanteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>[]
          }
          create: {
            args: Prisma.GestanteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          createMany: {
            args: Prisma.GestanteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GestanteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>[]
          }
          delete: {
            args: Prisma.GestanteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          update: {
            args: Prisma.GestanteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          deleteMany: {
            args: Prisma.GestanteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GestanteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GestanteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>[]
          }
          upsert: {
            args: Prisma.GestanteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GestantePayload>
          }
          aggregate: {
            args: Prisma.GestanteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGestante>
          }
          groupBy: {
            args: Prisma.GestanteGroupByArgs<ExtArgs>
            result: $Utils.Optional<GestanteGroupByOutputType>[]
          }
          count: {
            args: Prisma.GestanteCountArgs<ExtArgs>
            result: $Utils.Optional<GestanteCountAggregateOutputType> | number
          }
        }
      }
      Profissional: {
        payload: Prisma.$ProfissionalPayload<ExtArgs>
        fields: Prisma.ProfissionalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfissionalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfissionalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          findFirst: {
            args: Prisma.ProfissionalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfissionalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          findMany: {
            args: Prisma.ProfissionalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          create: {
            args: Prisma.ProfissionalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          createMany: {
            args: Prisma.ProfissionalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfissionalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          delete: {
            args: Prisma.ProfissionalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          update: {
            args: Prisma.ProfissionalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          deleteMany: {
            args: Prisma.ProfissionalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfissionalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfissionalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>[]
          }
          upsert: {
            args: Prisma.ProfissionalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfissionalPayload>
          }
          aggregate: {
            args: Prisma.ProfissionalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfissional>
          }
          groupBy: {
            args: Prisma.ProfissionalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfissionalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfissionalCountArgs<ExtArgs>
            result: $Utils.Optional<ProfissionalCountAggregateOutputType> | number
          }
        }
      }
      Consulta: {
        payload: Prisma.$ConsultaPayload<ExtArgs>
        fields: Prisma.ConsultaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          findFirst: {
            args: Prisma.ConsultaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          findMany: {
            args: Prisma.ConsultaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>[]
          }
          create: {
            args: Prisma.ConsultaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          createMany: {
            args: Prisma.ConsultaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>[]
          }
          delete: {
            args: Prisma.ConsultaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          update: {
            args: Prisma.ConsultaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          deleteMany: {
            args: Prisma.ConsultaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>[]
          }
          upsert: {
            args: Prisma.ConsultaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultaPayload>
          }
          aggregate: {
            args: Prisma.ConsultaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsulta>
          }
          groupBy: {
            args: Prisma.ConsultaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultaCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultaCountAggregateOutputType> | number
          }
        }
      }
      Exame: {
        payload: Prisma.$ExamePayload<ExtArgs>
        fields: Prisma.ExameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          findFirst: {
            args: Prisma.ExameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          findMany: {
            args: Prisma.ExameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>[]
          }
          create: {
            args: Prisma.ExameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          createMany: {
            args: Prisma.ExameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>[]
          }
          delete: {
            args: Prisma.ExameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          update: {
            args: Prisma.ExameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          deleteMany: {
            args: Prisma.ExameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>[]
          }
          upsert: {
            args: Prisma.ExameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          aggregate: {
            args: Prisma.ExameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExame>
          }
          groupBy: {
            args: Prisma.ExameGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExameGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExameCountArgs<ExtArgs>
            result: $Utils.Optional<ExameCountAggregateOutputType> | number
          }
        }
      }
      Vacina: {
        payload: Prisma.$VacinaPayload<ExtArgs>
        fields: Prisma.VacinaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VacinaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VacinaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          findFirst: {
            args: Prisma.VacinaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VacinaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          findMany: {
            args: Prisma.VacinaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>[]
          }
          create: {
            args: Prisma.VacinaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          createMany: {
            args: Prisma.VacinaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VacinaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>[]
          }
          delete: {
            args: Prisma.VacinaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          update: {
            args: Prisma.VacinaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          deleteMany: {
            args: Prisma.VacinaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VacinaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VacinaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>[]
          }
          upsert: {
            args: Prisma.VacinaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VacinaPayload>
          }
          aggregate: {
            args: Prisma.VacinaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVacina>
          }
          groupBy: {
            args: Prisma.VacinaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VacinaGroupByOutputType>[]
          }
          count: {
            args: Prisma.VacinaCountArgs<ExtArgs>
            result: $Utils.Optional<VacinaCountAggregateOutputType> | number
          }
        }
      }
      Medicacao: {
        payload: Prisma.$MedicacaoPayload<ExtArgs>
        fields: Prisma.MedicacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          findFirst: {
            args: Prisma.MedicacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          findMany: {
            args: Prisma.MedicacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>[]
          }
          create: {
            args: Prisma.MedicacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          createMany: {
            args: Prisma.MedicacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>[]
          }
          delete: {
            args: Prisma.MedicacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          update: {
            args: Prisma.MedicacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          deleteMany: {
            args: Prisma.MedicacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>[]
          }
          upsert: {
            args: Prisma.MedicacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicacaoPayload>
          }
          aggregate: {
            args: Prisma.MedicacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicacao>
          }
          groupBy: {
            args: Prisma.MedicacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicacaoCountArgs<ExtArgs>
            result: $Utils.Optional<MedicacaoCountAggregateOutputType> | number
          }
        }
      }
      CondicaoClinica: {
        payload: Prisma.$CondicaoClinicaPayload<ExtArgs>
        fields: Prisma.CondicaoClinicaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CondicaoClinicaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CondicaoClinicaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          findFirst: {
            args: Prisma.CondicaoClinicaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CondicaoClinicaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          findMany: {
            args: Prisma.CondicaoClinicaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>[]
          }
          create: {
            args: Prisma.CondicaoClinicaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          createMany: {
            args: Prisma.CondicaoClinicaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CondicaoClinicaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>[]
          }
          delete: {
            args: Prisma.CondicaoClinicaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          update: {
            args: Prisma.CondicaoClinicaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          deleteMany: {
            args: Prisma.CondicaoClinicaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CondicaoClinicaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CondicaoClinicaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>[]
          }
          upsert: {
            args: Prisma.CondicaoClinicaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CondicaoClinicaPayload>
          }
          aggregate: {
            args: Prisma.CondicaoClinicaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCondicaoClinica>
          }
          groupBy: {
            args: Prisma.CondicaoClinicaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CondicaoClinicaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CondicaoClinicaCountArgs<ExtArgs>
            result: $Utils.Optional<CondicaoClinicaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    gestante?: GestanteOmit
    profissional?: ProfissionalOmit
    consulta?: ConsultaOmit
    exame?: ExameOmit
    vacina?: VacinaOmit
    medicacao?: MedicacaoOmit
    condicaoClinica?: CondicaoClinicaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GestanteCountOutputType
   */

  export type GestanteCountOutputType = {
    consultas: number
    exames: number
    vacinas: number
    medicacoes: number
    condicoes: number
  }

  export type GestanteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultas?: boolean | GestanteCountOutputTypeCountConsultasArgs
    exames?: boolean | GestanteCountOutputTypeCountExamesArgs
    vacinas?: boolean | GestanteCountOutputTypeCountVacinasArgs
    medicacoes?: boolean | GestanteCountOutputTypeCountMedicacoesArgs
    condicoes?: boolean | GestanteCountOutputTypeCountCondicoesArgs
  }

  // Custom InputTypes
  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GestanteCountOutputType
     */
    select?: GestanteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeCountConsultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultaWhereInput
  }

  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeCountExamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExameWhereInput
  }

  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeCountVacinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VacinaWhereInput
  }

  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeCountMedicacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicacaoWhereInput
  }

  /**
   * GestanteCountOutputType without action
   */
  export type GestanteCountOutputTypeCountCondicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CondicaoClinicaWhereInput
  }


  /**
   * Count Type ProfissionalCountOutputType
   */

  export type ProfissionalCountOutputType = {
    consultas: number
  }

  export type ProfissionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultas?: boolean | ProfissionalCountOutputTypeCountConsultasArgs
  }

  // Custom InputTypes
  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfissionalCountOutputType
     */
    select?: ProfissionalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfissionalCountOutputType without action
   */
  export type ProfissionalCountOutputTypeCountConsultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Gestante
   */

  export type AggregateGestante = {
    _count: GestanteCountAggregateOutputType | null
    _min: GestanteMinAggregateOutputType | null
    _max: GestanteMaxAggregateOutputType | null
  }

  export type GestanteMinAggregateOutputType = {
    id: string | null
    cpf: string | null
    cns: string | null
    nome: string | null
    nomeSocial: string | null
    dataNascimento: Date | null
    telefone: string | null
    email: string | null
    endereco: string | null
    bairro: string | null
    cep: string | null
    ubsVinculada: string | null
    dataUltimaMenstruacao: Date | null
    dataProvavelParto: Date | null
    tipoGravidez: string | null
    riscoGestacional: string | null
    senha: string | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type GestanteMaxAggregateOutputType = {
    id: string | null
    cpf: string | null
    cns: string | null
    nome: string | null
    nomeSocial: string | null
    dataNascimento: Date | null
    telefone: string | null
    email: string | null
    endereco: string | null
    bairro: string | null
    cep: string | null
    ubsVinculada: string | null
    dataUltimaMenstruacao: Date | null
    dataProvavelParto: Date | null
    tipoGravidez: string | null
    riscoGestacional: string | null
    senha: string | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type GestanteCountAggregateOutputType = {
    id: number
    cpf: number
    cns: number
    nome: number
    nomeSocial: number
    dataNascimento: number
    telefone: number
    email: number
    endereco: number
    bairro: number
    cep: number
    ubsVinculada: number
    dataUltimaMenstruacao: number
    dataProvavelParto: number
    tipoGravidez: number
    riscoGestacional: number
    senha: number
    ativo: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type GestanteMinAggregateInputType = {
    id?: true
    cpf?: true
    cns?: true
    nome?: true
    nomeSocial?: true
    dataNascimento?: true
    telefone?: true
    email?: true
    endereco?: true
    bairro?: true
    cep?: true
    ubsVinculada?: true
    dataUltimaMenstruacao?: true
    dataProvavelParto?: true
    tipoGravidez?: true
    riscoGestacional?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type GestanteMaxAggregateInputType = {
    id?: true
    cpf?: true
    cns?: true
    nome?: true
    nomeSocial?: true
    dataNascimento?: true
    telefone?: true
    email?: true
    endereco?: true
    bairro?: true
    cep?: true
    ubsVinculada?: true
    dataUltimaMenstruacao?: true
    dataProvavelParto?: true
    tipoGravidez?: true
    riscoGestacional?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type GestanteCountAggregateInputType = {
    id?: true
    cpf?: true
    cns?: true
    nome?: true
    nomeSocial?: true
    dataNascimento?: true
    telefone?: true
    email?: true
    endereco?: true
    bairro?: true
    cep?: true
    ubsVinculada?: true
    dataUltimaMenstruacao?: true
    dataProvavelParto?: true
    tipoGravidez?: true
    riscoGestacional?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type GestanteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gestante to aggregate.
     */
    where?: GestanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gestantes to fetch.
     */
    orderBy?: GestanteOrderByWithRelationInput | GestanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GestanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gestantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gestantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gestantes
    **/
    _count?: true | GestanteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GestanteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GestanteMaxAggregateInputType
  }

  export type GetGestanteAggregateType<T extends GestanteAggregateArgs> = {
        [P in keyof T & keyof AggregateGestante]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGestante[P]>
      : GetScalarType<T[P], AggregateGestante[P]>
  }




  export type GestanteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GestanteWhereInput
    orderBy?: GestanteOrderByWithAggregationInput | GestanteOrderByWithAggregationInput[]
    by: GestanteScalarFieldEnum[] | GestanteScalarFieldEnum
    having?: GestanteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GestanteCountAggregateInputType | true
    _min?: GestanteMinAggregateInputType
    _max?: GestanteMaxAggregateInputType
  }

  export type GestanteGroupByOutputType = {
    id: string
    cpf: string
    cns: string | null
    nome: string
    nomeSocial: string | null
    dataNascimento: Date
    telefone: string
    email: string | null
    endereco: string
    bairro: string | null
    cep: string | null
    ubsVinculada: string | null
    dataUltimaMenstruacao: Date | null
    dataProvavelParto: Date | null
    tipoGravidez: string
    riscoGestacional: string
    senha: string
    ativo: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: GestanteCountAggregateOutputType | null
    _min: GestanteMinAggregateOutputType | null
    _max: GestanteMaxAggregateOutputType | null
  }

  type GetGestanteGroupByPayload<T extends GestanteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GestanteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GestanteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GestanteGroupByOutputType[P]>
            : GetScalarType<T[P], GestanteGroupByOutputType[P]>
        }
      >
    >


  export type GestanteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    cns?: boolean
    nome?: boolean
    nomeSocial?: boolean
    dataNascimento?: boolean
    telefone?: boolean
    email?: boolean
    endereco?: boolean
    bairro?: boolean
    cep?: boolean
    ubsVinculada?: boolean
    dataUltimaMenstruacao?: boolean
    dataProvavelParto?: boolean
    tipoGravidez?: boolean
    riscoGestacional?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    consultas?: boolean | Gestante$consultasArgs<ExtArgs>
    exames?: boolean | Gestante$examesArgs<ExtArgs>
    vacinas?: boolean | Gestante$vacinasArgs<ExtArgs>
    medicacoes?: boolean | Gestante$medicacoesArgs<ExtArgs>
    condicoes?: boolean | Gestante$condicoesArgs<ExtArgs>
    _count?: boolean | GestanteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gestante"]>

  export type GestanteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    cns?: boolean
    nome?: boolean
    nomeSocial?: boolean
    dataNascimento?: boolean
    telefone?: boolean
    email?: boolean
    endereco?: boolean
    bairro?: boolean
    cep?: boolean
    ubsVinculada?: boolean
    dataUltimaMenstruacao?: boolean
    dataProvavelParto?: boolean
    tipoGravidez?: boolean
    riscoGestacional?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["gestante"]>

  export type GestanteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    cns?: boolean
    nome?: boolean
    nomeSocial?: boolean
    dataNascimento?: boolean
    telefone?: boolean
    email?: boolean
    endereco?: boolean
    bairro?: boolean
    cep?: boolean
    ubsVinculada?: boolean
    dataUltimaMenstruacao?: boolean
    dataProvavelParto?: boolean
    tipoGravidez?: boolean
    riscoGestacional?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["gestante"]>

  export type GestanteSelectScalar = {
    id?: boolean
    cpf?: boolean
    cns?: boolean
    nome?: boolean
    nomeSocial?: boolean
    dataNascimento?: boolean
    telefone?: boolean
    email?: boolean
    endereco?: boolean
    bairro?: boolean
    cep?: boolean
    ubsVinculada?: boolean
    dataUltimaMenstruacao?: boolean
    dataProvavelParto?: boolean
    tipoGravidez?: boolean
    riscoGestacional?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type GestanteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cpf" | "cns" | "nome" | "nomeSocial" | "dataNascimento" | "telefone" | "email" | "endereco" | "bairro" | "cep" | "ubsVinculada" | "dataUltimaMenstruacao" | "dataProvavelParto" | "tipoGravidez" | "riscoGestacional" | "senha" | "ativo" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["gestante"]>
  export type GestanteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultas?: boolean | Gestante$consultasArgs<ExtArgs>
    exames?: boolean | Gestante$examesArgs<ExtArgs>
    vacinas?: boolean | Gestante$vacinasArgs<ExtArgs>
    medicacoes?: boolean | Gestante$medicacoesArgs<ExtArgs>
    condicoes?: boolean | Gestante$condicoesArgs<ExtArgs>
    _count?: boolean | GestanteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GestanteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GestanteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GestantePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gestante"
    objects: {
      consultas: Prisma.$ConsultaPayload<ExtArgs>[]
      exames: Prisma.$ExamePayload<ExtArgs>[]
      vacinas: Prisma.$VacinaPayload<ExtArgs>[]
      medicacoes: Prisma.$MedicacaoPayload<ExtArgs>[]
      condicoes: Prisma.$CondicaoClinicaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cpf: string
      cns: string | null
      nome: string
      nomeSocial: string | null
      dataNascimento: Date
      telefone: string
      email: string | null
      endereco: string
      bairro: string | null
      cep: string | null
      ubsVinculada: string | null
      dataUltimaMenstruacao: Date | null
      dataProvavelParto: Date | null
      tipoGravidez: string
      riscoGestacional: string
      senha: string
      ativo: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["gestante"]>
    composites: {}
  }

  type GestanteGetPayload<S extends boolean | null | undefined | GestanteDefaultArgs> = $Result.GetResult<Prisma.$GestantePayload, S>

  type GestanteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GestanteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GestanteCountAggregateInputType | true
    }

  export interface GestanteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gestante'], meta: { name: 'Gestante' } }
    /**
     * Find zero or one Gestante that matches the filter.
     * @param {GestanteFindUniqueArgs} args - Arguments to find a Gestante
     * @example
     * // Get one Gestante
     * const gestante = await prisma.gestante.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GestanteFindUniqueArgs>(args: SelectSubset<T, GestanteFindUniqueArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gestante that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GestanteFindUniqueOrThrowArgs} args - Arguments to find a Gestante
     * @example
     * // Get one Gestante
     * const gestante = await prisma.gestante.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GestanteFindUniqueOrThrowArgs>(args: SelectSubset<T, GestanteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gestante that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteFindFirstArgs} args - Arguments to find a Gestante
     * @example
     * // Get one Gestante
     * const gestante = await prisma.gestante.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GestanteFindFirstArgs>(args?: SelectSubset<T, GestanteFindFirstArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gestante that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteFindFirstOrThrowArgs} args - Arguments to find a Gestante
     * @example
     * // Get one Gestante
     * const gestante = await prisma.gestante.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GestanteFindFirstOrThrowArgs>(args?: SelectSubset<T, GestanteFindFirstOrThrowArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gestantes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gestantes
     * const gestantes = await prisma.gestante.findMany()
     * 
     * // Get first 10 Gestantes
     * const gestantes = await prisma.gestante.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gestanteWithIdOnly = await prisma.gestante.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GestanteFindManyArgs>(args?: SelectSubset<T, GestanteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gestante.
     * @param {GestanteCreateArgs} args - Arguments to create a Gestante.
     * @example
     * // Create one Gestante
     * const Gestante = await prisma.gestante.create({
     *   data: {
     *     // ... data to create a Gestante
     *   }
     * })
     * 
     */
    create<T extends GestanteCreateArgs>(args: SelectSubset<T, GestanteCreateArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gestantes.
     * @param {GestanteCreateManyArgs} args - Arguments to create many Gestantes.
     * @example
     * // Create many Gestantes
     * const gestante = await prisma.gestante.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GestanteCreateManyArgs>(args?: SelectSubset<T, GestanteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gestantes and returns the data saved in the database.
     * @param {GestanteCreateManyAndReturnArgs} args - Arguments to create many Gestantes.
     * @example
     * // Create many Gestantes
     * const gestante = await prisma.gestante.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gestantes and only return the `id`
     * const gestanteWithIdOnly = await prisma.gestante.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GestanteCreateManyAndReturnArgs>(args?: SelectSubset<T, GestanteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gestante.
     * @param {GestanteDeleteArgs} args - Arguments to delete one Gestante.
     * @example
     * // Delete one Gestante
     * const Gestante = await prisma.gestante.delete({
     *   where: {
     *     // ... filter to delete one Gestante
     *   }
     * })
     * 
     */
    delete<T extends GestanteDeleteArgs>(args: SelectSubset<T, GestanteDeleteArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gestante.
     * @param {GestanteUpdateArgs} args - Arguments to update one Gestante.
     * @example
     * // Update one Gestante
     * const gestante = await prisma.gestante.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GestanteUpdateArgs>(args: SelectSubset<T, GestanteUpdateArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gestantes.
     * @param {GestanteDeleteManyArgs} args - Arguments to filter Gestantes to delete.
     * @example
     * // Delete a few Gestantes
     * const { count } = await prisma.gestante.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GestanteDeleteManyArgs>(args?: SelectSubset<T, GestanteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gestantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gestantes
     * const gestante = await prisma.gestante.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GestanteUpdateManyArgs>(args: SelectSubset<T, GestanteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gestantes and returns the data updated in the database.
     * @param {GestanteUpdateManyAndReturnArgs} args - Arguments to update many Gestantes.
     * @example
     * // Update many Gestantes
     * const gestante = await prisma.gestante.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gestantes and only return the `id`
     * const gestanteWithIdOnly = await prisma.gestante.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GestanteUpdateManyAndReturnArgs>(args: SelectSubset<T, GestanteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gestante.
     * @param {GestanteUpsertArgs} args - Arguments to update or create a Gestante.
     * @example
     * // Update or create a Gestante
     * const gestante = await prisma.gestante.upsert({
     *   create: {
     *     // ... data to create a Gestante
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gestante we want to update
     *   }
     * })
     */
    upsert<T extends GestanteUpsertArgs>(args: SelectSubset<T, GestanteUpsertArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gestantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteCountArgs} args - Arguments to filter Gestantes to count.
     * @example
     * // Count the number of Gestantes
     * const count = await prisma.gestante.count({
     *   where: {
     *     // ... the filter for the Gestantes we want to count
     *   }
     * })
    **/
    count<T extends GestanteCountArgs>(
      args?: Subset<T, GestanteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GestanteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gestante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GestanteAggregateArgs>(args: Subset<T, GestanteAggregateArgs>): Prisma.PrismaPromise<GetGestanteAggregateType<T>>

    /**
     * Group by Gestante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GestanteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GestanteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GestanteGroupByArgs['orderBy'] }
        : { orderBy?: GestanteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GestanteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGestanteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gestante model
   */
  readonly fields: GestanteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gestante.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GestanteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultas<T extends Gestante$consultasArgs<ExtArgs> = {}>(args?: Subset<T, Gestante$consultasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exames<T extends Gestante$examesArgs<ExtArgs> = {}>(args?: Subset<T, Gestante$examesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vacinas<T extends Gestante$vacinasArgs<ExtArgs> = {}>(args?: Subset<T, Gestante$vacinasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicacoes<T extends Gestante$medicacoesArgs<ExtArgs> = {}>(args?: Subset<T, Gestante$medicacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    condicoes<T extends Gestante$condicoesArgs<ExtArgs> = {}>(args?: Subset<T, Gestante$condicoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gestante model
   */
  interface GestanteFieldRefs {
    readonly id: FieldRef<"Gestante", 'String'>
    readonly cpf: FieldRef<"Gestante", 'String'>
    readonly cns: FieldRef<"Gestante", 'String'>
    readonly nome: FieldRef<"Gestante", 'String'>
    readonly nomeSocial: FieldRef<"Gestante", 'String'>
    readonly dataNascimento: FieldRef<"Gestante", 'DateTime'>
    readonly telefone: FieldRef<"Gestante", 'String'>
    readonly email: FieldRef<"Gestante", 'String'>
    readonly endereco: FieldRef<"Gestante", 'String'>
    readonly bairro: FieldRef<"Gestante", 'String'>
    readonly cep: FieldRef<"Gestante", 'String'>
    readonly ubsVinculada: FieldRef<"Gestante", 'String'>
    readonly dataUltimaMenstruacao: FieldRef<"Gestante", 'DateTime'>
    readonly dataProvavelParto: FieldRef<"Gestante", 'DateTime'>
    readonly tipoGravidez: FieldRef<"Gestante", 'String'>
    readonly riscoGestacional: FieldRef<"Gestante", 'String'>
    readonly senha: FieldRef<"Gestante", 'String'>
    readonly ativo: FieldRef<"Gestante", 'Boolean'>
    readonly criadoEm: FieldRef<"Gestante", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Gestante", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gestante findUnique
   */
  export type GestanteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter, which Gestante to fetch.
     */
    where: GestanteWhereUniqueInput
  }

  /**
   * Gestante findUniqueOrThrow
   */
  export type GestanteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter, which Gestante to fetch.
     */
    where: GestanteWhereUniqueInput
  }

  /**
   * Gestante findFirst
   */
  export type GestanteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter, which Gestante to fetch.
     */
    where?: GestanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gestantes to fetch.
     */
    orderBy?: GestanteOrderByWithRelationInput | GestanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gestantes.
     */
    cursor?: GestanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gestantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gestantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gestantes.
     */
    distinct?: GestanteScalarFieldEnum | GestanteScalarFieldEnum[]
  }

  /**
   * Gestante findFirstOrThrow
   */
  export type GestanteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter, which Gestante to fetch.
     */
    where?: GestanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gestantes to fetch.
     */
    orderBy?: GestanteOrderByWithRelationInput | GestanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gestantes.
     */
    cursor?: GestanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gestantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gestantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gestantes.
     */
    distinct?: GestanteScalarFieldEnum | GestanteScalarFieldEnum[]
  }

  /**
   * Gestante findMany
   */
  export type GestanteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter, which Gestantes to fetch.
     */
    where?: GestanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gestantes to fetch.
     */
    orderBy?: GestanteOrderByWithRelationInput | GestanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gestantes.
     */
    cursor?: GestanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gestantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gestantes.
     */
    skip?: number
    distinct?: GestanteScalarFieldEnum | GestanteScalarFieldEnum[]
  }

  /**
   * Gestante create
   */
  export type GestanteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * The data needed to create a Gestante.
     */
    data: XOR<GestanteCreateInput, GestanteUncheckedCreateInput>
  }

  /**
   * Gestante createMany
   */
  export type GestanteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gestantes.
     */
    data: GestanteCreateManyInput | GestanteCreateManyInput[]
  }

  /**
   * Gestante createManyAndReturn
   */
  export type GestanteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * The data used to create many Gestantes.
     */
    data: GestanteCreateManyInput | GestanteCreateManyInput[]
  }

  /**
   * Gestante update
   */
  export type GestanteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * The data needed to update a Gestante.
     */
    data: XOR<GestanteUpdateInput, GestanteUncheckedUpdateInput>
    /**
     * Choose, which Gestante to update.
     */
    where: GestanteWhereUniqueInput
  }

  /**
   * Gestante updateMany
   */
  export type GestanteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gestantes.
     */
    data: XOR<GestanteUpdateManyMutationInput, GestanteUncheckedUpdateManyInput>
    /**
     * Filter which Gestantes to update
     */
    where?: GestanteWhereInput
    /**
     * Limit how many Gestantes to update.
     */
    limit?: number
  }

  /**
   * Gestante updateManyAndReturn
   */
  export type GestanteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * The data used to update Gestantes.
     */
    data: XOR<GestanteUpdateManyMutationInput, GestanteUncheckedUpdateManyInput>
    /**
     * Filter which Gestantes to update
     */
    where?: GestanteWhereInput
    /**
     * Limit how many Gestantes to update.
     */
    limit?: number
  }

  /**
   * Gestante upsert
   */
  export type GestanteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * The filter to search for the Gestante to update in case it exists.
     */
    where: GestanteWhereUniqueInput
    /**
     * In case the Gestante found by the `where` argument doesn't exist, create a new Gestante with this data.
     */
    create: XOR<GestanteCreateInput, GestanteUncheckedCreateInput>
    /**
     * In case the Gestante was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GestanteUpdateInput, GestanteUncheckedUpdateInput>
  }

  /**
   * Gestante delete
   */
  export type GestanteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
    /**
     * Filter which Gestante to delete.
     */
    where: GestanteWhereUniqueInput
  }

  /**
   * Gestante deleteMany
   */
  export type GestanteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gestantes to delete
     */
    where?: GestanteWhereInput
    /**
     * Limit how many Gestantes to delete.
     */
    limit?: number
  }

  /**
   * Gestante.consultas
   */
  export type Gestante$consultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    where?: ConsultaWhereInput
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    cursor?: ConsultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * Gestante.exames
   */
  export type Gestante$examesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    where?: ExameWhereInput
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    cursor?: ExameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Gestante.vacinas
   */
  export type Gestante$vacinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    where?: VacinaWhereInput
    orderBy?: VacinaOrderByWithRelationInput | VacinaOrderByWithRelationInput[]
    cursor?: VacinaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VacinaScalarFieldEnum | VacinaScalarFieldEnum[]
  }

  /**
   * Gestante.medicacoes
   */
  export type Gestante$medicacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    where?: MedicacaoWhereInput
    orderBy?: MedicacaoOrderByWithRelationInput | MedicacaoOrderByWithRelationInput[]
    cursor?: MedicacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicacaoScalarFieldEnum | MedicacaoScalarFieldEnum[]
  }

  /**
   * Gestante.condicoes
   */
  export type Gestante$condicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    where?: CondicaoClinicaWhereInput
    orderBy?: CondicaoClinicaOrderByWithRelationInput | CondicaoClinicaOrderByWithRelationInput[]
    cursor?: CondicaoClinicaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CondicaoClinicaScalarFieldEnum | CondicaoClinicaScalarFieldEnum[]
  }

  /**
   * Gestante without action
   */
  export type GestanteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gestante
     */
    select?: GestanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gestante
     */
    omit?: GestanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GestanteInclude<ExtArgs> | null
  }


  /**
   * Model Profissional
   */

  export type AggregateProfissional = {
    _count: ProfissionalCountAggregateOutputType | null
    _min: ProfissionalMinAggregateOutputType | null
    _max: ProfissionalMaxAggregateOutputType | null
  }

  export type ProfissionalMinAggregateOutputType = {
    id: string | null
    cpf: string | null
    nome: string | null
    cargo: string | null
    registroConselho: string | null
    ubs: string | null
    senha: string | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ProfissionalMaxAggregateOutputType = {
    id: string | null
    cpf: string | null
    nome: string | null
    cargo: string | null
    registroConselho: string | null
    ubs: string | null
    senha: string | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ProfissionalCountAggregateOutputType = {
    id: number
    cpf: number
    nome: number
    cargo: number
    registroConselho: number
    ubs: number
    senha: number
    ativo: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type ProfissionalMinAggregateInputType = {
    id?: true
    cpf?: true
    nome?: true
    cargo?: true
    registroConselho?: true
    ubs?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ProfissionalMaxAggregateInputType = {
    id?: true
    cpf?: true
    nome?: true
    cargo?: true
    registroConselho?: true
    ubs?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ProfissionalCountAggregateInputType = {
    id?: true
    cpf?: true
    nome?: true
    cargo?: true
    registroConselho?: true
    ubs?: true
    senha?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type ProfissionalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profissional to aggregate.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profissionals
    **/
    _count?: true | ProfissionalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfissionalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfissionalMaxAggregateInputType
  }

  export type GetProfissionalAggregateType<T extends ProfissionalAggregateArgs> = {
        [P in keyof T & keyof AggregateProfissional]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfissional[P]>
      : GetScalarType<T[P], AggregateProfissional[P]>
  }




  export type ProfissionalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfissionalWhereInput
    orderBy?: ProfissionalOrderByWithAggregationInput | ProfissionalOrderByWithAggregationInput[]
    by: ProfissionalScalarFieldEnum[] | ProfissionalScalarFieldEnum
    having?: ProfissionalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfissionalCountAggregateInputType | true
    _min?: ProfissionalMinAggregateInputType
    _max?: ProfissionalMaxAggregateInputType
  }

  export type ProfissionalGroupByOutputType = {
    id: string
    cpf: string
    nome: string
    cargo: string
    registroConselho: string | null
    ubs: string
    senha: string
    ativo: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: ProfissionalCountAggregateOutputType | null
    _min: ProfissionalMinAggregateOutputType | null
    _max: ProfissionalMaxAggregateOutputType | null
  }

  type GetProfissionalGroupByPayload<T extends ProfissionalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfissionalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfissionalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfissionalGroupByOutputType[P]>
            : GetScalarType<T[P], ProfissionalGroupByOutputType[P]>
        }
      >
    >


  export type ProfissionalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    nome?: boolean
    cargo?: boolean
    registroConselho?: boolean
    ubs?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    consultas?: boolean | Profissional$consultasArgs<ExtArgs>
    _count?: boolean | ProfissionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    nome?: boolean
    cargo?: boolean
    registroConselho?: boolean
    ubs?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    nome?: boolean
    cargo?: boolean
    registroConselho?: boolean
    ubs?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["profissional"]>

  export type ProfissionalSelectScalar = {
    id?: boolean
    cpf?: boolean
    nome?: boolean
    cargo?: boolean
    registroConselho?: boolean
    ubs?: boolean
    senha?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type ProfissionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cpf" | "nome" | "cargo" | "registroConselho" | "ubs" | "senha" | "ativo" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["profissional"]>
  export type ProfissionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultas?: boolean | Profissional$consultasArgs<ExtArgs>
    _count?: boolean | ProfissionalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfissionalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfissionalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfissionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profissional"
    objects: {
      consultas: Prisma.$ConsultaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cpf: string
      nome: string
      cargo: string
      registroConselho: string | null
      ubs: string
      senha: string
      ativo: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["profissional"]>
    composites: {}
  }

  type ProfissionalGetPayload<S extends boolean | null | undefined | ProfissionalDefaultArgs> = $Result.GetResult<Prisma.$ProfissionalPayload, S>

  type ProfissionalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfissionalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfissionalCountAggregateInputType | true
    }

  export interface ProfissionalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profissional'], meta: { name: 'Profissional' } }
    /**
     * Find zero or one Profissional that matches the filter.
     * @param {ProfissionalFindUniqueArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfissionalFindUniqueArgs>(args: SelectSubset<T, ProfissionalFindUniqueArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profissional that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfissionalFindUniqueOrThrowArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfissionalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfissionalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindFirstArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfissionalFindFirstArgs>(args?: SelectSubset<T, ProfissionalFindFirstArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindFirstOrThrowArgs} args - Arguments to find a Profissional
     * @example
     * // Get one Profissional
     * const profissional = await prisma.profissional.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfissionalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfissionalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profissionals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profissionals
     * const profissionals = await prisma.profissional.findMany()
     * 
     * // Get first 10 Profissionals
     * const profissionals = await prisma.profissional.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profissionalWithIdOnly = await prisma.profissional.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfissionalFindManyArgs>(args?: SelectSubset<T, ProfissionalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profissional.
     * @param {ProfissionalCreateArgs} args - Arguments to create a Profissional.
     * @example
     * // Create one Profissional
     * const Profissional = await prisma.profissional.create({
     *   data: {
     *     // ... data to create a Profissional
     *   }
     * })
     * 
     */
    create<T extends ProfissionalCreateArgs>(args: SelectSubset<T, ProfissionalCreateArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profissionals.
     * @param {ProfissionalCreateManyArgs} args - Arguments to create many Profissionals.
     * @example
     * // Create many Profissionals
     * const profissional = await prisma.profissional.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfissionalCreateManyArgs>(args?: SelectSubset<T, ProfissionalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profissionals and returns the data saved in the database.
     * @param {ProfissionalCreateManyAndReturnArgs} args - Arguments to create many Profissionals.
     * @example
     * // Create many Profissionals
     * const profissional = await prisma.profissional.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profissionals and only return the `id`
     * const profissionalWithIdOnly = await prisma.profissional.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfissionalCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfissionalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profissional.
     * @param {ProfissionalDeleteArgs} args - Arguments to delete one Profissional.
     * @example
     * // Delete one Profissional
     * const Profissional = await prisma.profissional.delete({
     *   where: {
     *     // ... filter to delete one Profissional
     *   }
     * })
     * 
     */
    delete<T extends ProfissionalDeleteArgs>(args: SelectSubset<T, ProfissionalDeleteArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profissional.
     * @param {ProfissionalUpdateArgs} args - Arguments to update one Profissional.
     * @example
     * // Update one Profissional
     * const profissional = await prisma.profissional.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfissionalUpdateArgs>(args: SelectSubset<T, ProfissionalUpdateArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profissionals.
     * @param {ProfissionalDeleteManyArgs} args - Arguments to filter Profissionals to delete.
     * @example
     * // Delete a few Profissionals
     * const { count } = await prisma.profissional.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfissionalDeleteManyArgs>(args?: SelectSubset<T, ProfissionalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profissionals
     * const profissional = await prisma.profissional.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfissionalUpdateManyArgs>(args: SelectSubset<T, ProfissionalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissionals and returns the data updated in the database.
     * @param {ProfissionalUpdateManyAndReturnArgs} args - Arguments to update many Profissionals.
     * @example
     * // Update many Profissionals
     * const profissional = await prisma.profissional.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profissionals and only return the `id`
     * const profissionalWithIdOnly = await prisma.profissional.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfissionalUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfissionalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profissional.
     * @param {ProfissionalUpsertArgs} args - Arguments to update or create a Profissional.
     * @example
     * // Update or create a Profissional
     * const profissional = await prisma.profissional.upsert({
     *   create: {
     *     // ... data to create a Profissional
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profissional we want to update
     *   }
     * })
     */
    upsert<T extends ProfissionalUpsertArgs>(args: SelectSubset<T, ProfissionalUpsertArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profissionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalCountArgs} args - Arguments to filter Profissionals to count.
     * @example
     * // Count the number of Profissionals
     * const count = await prisma.profissional.count({
     *   where: {
     *     // ... the filter for the Profissionals we want to count
     *   }
     * })
    **/
    count<T extends ProfissionalCountArgs>(
      args?: Subset<T, ProfissionalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfissionalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profissional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfissionalAggregateArgs>(args: Subset<T, ProfissionalAggregateArgs>): Prisma.PrismaPromise<GetProfissionalAggregateType<T>>

    /**
     * Group by Profissional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfissionalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfissionalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfissionalGroupByArgs['orderBy'] }
        : { orderBy?: ProfissionalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfissionalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfissionalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profissional model
   */
  readonly fields: ProfissionalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profissional.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfissionalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultas<T extends Profissional$consultasArgs<ExtArgs> = {}>(args?: Subset<T, Profissional$consultasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profissional model
   */
  interface ProfissionalFieldRefs {
    readonly id: FieldRef<"Profissional", 'String'>
    readonly cpf: FieldRef<"Profissional", 'String'>
    readonly nome: FieldRef<"Profissional", 'String'>
    readonly cargo: FieldRef<"Profissional", 'String'>
    readonly registroConselho: FieldRef<"Profissional", 'String'>
    readonly ubs: FieldRef<"Profissional", 'String'>
    readonly senha: FieldRef<"Profissional", 'String'>
    readonly ativo: FieldRef<"Profissional", 'Boolean'>
    readonly criadoEm: FieldRef<"Profissional", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Profissional", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profissional findUnique
   */
  export type ProfissionalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional findUniqueOrThrow
   */
  export type ProfissionalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional findFirst
   */
  export type ProfissionalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profissionals.
     */
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional findFirstOrThrow
   */
  export type ProfissionalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissional to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profissionals.
     */
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional findMany
   */
  export type ProfissionalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter, which Profissionals to fetch.
     */
    where?: ProfissionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profissionals to fetch.
     */
    orderBy?: ProfissionalOrderByWithRelationInput | ProfissionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profissionals.
     */
    cursor?: ProfissionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profissionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profissionals.
     */
    skip?: number
    distinct?: ProfissionalScalarFieldEnum | ProfissionalScalarFieldEnum[]
  }

  /**
   * Profissional create
   */
  export type ProfissionalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The data needed to create a Profissional.
     */
    data: XOR<ProfissionalCreateInput, ProfissionalUncheckedCreateInput>
  }

  /**
   * Profissional createMany
   */
  export type ProfissionalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profissionals.
     */
    data: ProfissionalCreateManyInput | ProfissionalCreateManyInput[]
  }

  /**
   * Profissional createManyAndReturn
   */
  export type ProfissionalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * The data used to create many Profissionals.
     */
    data: ProfissionalCreateManyInput | ProfissionalCreateManyInput[]
  }

  /**
   * Profissional update
   */
  export type ProfissionalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The data needed to update a Profissional.
     */
    data: XOR<ProfissionalUpdateInput, ProfissionalUncheckedUpdateInput>
    /**
     * Choose, which Profissional to update.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional updateMany
   */
  export type ProfissionalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profissionals.
     */
    data: XOR<ProfissionalUpdateManyMutationInput, ProfissionalUncheckedUpdateManyInput>
    /**
     * Filter which Profissionals to update
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to update.
     */
    limit?: number
  }

  /**
   * Profissional updateManyAndReturn
   */
  export type ProfissionalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * The data used to update Profissionals.
     */
    data: XOR<ProfissionalUpdateManyMutationInput, ProfissionalUncheckedUpdateManyInput>
    /**
     * Filter which Profissionals to update
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to update.
     */
    limit?: number
  }

  /**
   * Profissional upsert
   */
  export type ProfissionalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * The filter to search for the Profissional to update in case it exists.
     */
    where: ProfissionalWhereUniqueInput
    /**
     * In case the Profissional found by the `where` argument doesn't exist, create a new Profissional with this data.
     */
    create: XOR<ProfissionalCreateInput, ProfissionalUncheckedCreateInput>
    /**
     * In case the Profissional was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfissionalUpdateInput, ProfissionalUncheckedUpdateInput>
  }

  /**
   * Profissional delete
   */
  export type ProfissionalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
    /**
     * Filter which Profissional to delete.
     */
    where: ProfissionalWhereUniqueInput
  }

  /**
   * Profissional deleteMany
   */
  export type ProfissionalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profissionals to delete
     */
    where?: ProfissionalWhereInput
    /**
     * Limit how many Profissionals to delete.
     */
    limit?: number
  }

  /**
   * Profissional.consultas
   */
  export type Profissional$consultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    where?: ConsultaWhereInput
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    cursor?: ConsultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * Profissional without action
   */
  export type ProfissionalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional
     */
    select?: ProfissionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profissional
     */
    omit?: ProfissionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfissionalInclude<ExtArgs> | null
  }


  /**
   * Model Consulta
   */

  export type AggregateConsulta = {
    _count: ConsultaCountAggregateOutputType | null
    _avg: ConsultaAvgAggregateOutputType | null
    _sum: ConsultaSumAggregateOutputType | null
    _min: ConsultaMinAggregateOutputType | null
    _max: ConsultaMaxAggregateOutputType | null
  }

  export type ConsultaAvgAggregateOutputType = {
    semanaGestacional: number | null
    pesoKg: number | null
    alturaUterina: number | null
    batimentoCardiacoFetal: number | null
  }

  export type ConsultaSumAggregateOutputType = {
    semanaGestacional: number | null
    pesoKg: number | null
    alturaUterina: number | null
    batimentoCardiacoFetal: number | null
  }

  export type ConsultaMinAggregateOutputType = {
    id: string | null
    data: Date | null
    tipo: string | null
    semanaGestacional: number | null
    pesoKg: number | null
    pressaoArterial: string | null
    alturaUterina: number | null
    batimentoCardiacoFetal: number | null
    notas: string | null
    ubs: string | null
    gestanteId: string | null
    profissionalId: string | null
    criadoEm: Date | null
  }

  export type ConsultaMaxAggregateOutputType = {
    id: string | null
    data: Date | null
    tipo: string | null
    semanaGestacional: number | null
    pesoKg: number | null
    pressaoArterial: string | null
    alturaUterina: number | null
    batimentoCardiacoFetal: number | null
    notas: string | null
    ubs: string | null
    gestanteId: string | null
    profissionalId: string | null
    criadoEm: Date | null
  }

  export type ConsultaCountAggregateOutputType = {
    id: number
    data: number
    tipo: number
    semanaGestacional: number
    pesoKg: number
    pressaoArterial: number
    alturaUterina: number
    batimentoCardiacoFetal: number
    notas: number
    ubs: number
    gestanteId: number
    profissionalId: number
    criadoEm: number
    _all: number
  }


  export type ConsultaAvgAggregateInputType = {
    semanaGestacional?: true
    pesoKg?: true
    alturaUterina?: true
    batimentoCardiacoFetal?: true
  }

  export type ConsultaSumAggregateInputType = {
    semanaGestacional?: true
    pesoKg?: true
    alturaUterina?: true
    batimentoCardiacoFetal?: true
  }

  export type ConsultaMinAggregateInputType = {
    id?: true
    data?: true
    tipo?: true
    semanaGestacional?: true
    pesoKg?: true
    pressaoArterial?: true
    alturaUterina?: true
    batimentoCardiacoFetal?: true
    notas?: true
    ubs?: true
    gestanteId?: true
    profissionalId?: true
    criadoEm?: true
  }

  export type ConsultaMaxAggregateInputType = {
    id?: true
    data?: true
    tipo?: true
    semanaGestacional?: true
    pesoKg?: true
    pressaoArterial?: true
    alturaUterina?: true
    batimentoCardiacoFetal?: true
    notas?: true
    ubs?: true
    gestanteId?: true
    profissionalId?: true
    criadoEm?: true
  }

  export type ConsultaCountAggregateInputType = {
    id?: true
    data?: true
    tipo?: true
    semanaGestacional?: true
    pesoKg?: true
    pressaoArterial?: true
    alturaUterina?: true
    batimentoCardiacoFetal?: true
    notas?: true
    ubs?: true
    gestanteId?: true
    profissionalId?: true
    criadoEm?: true
    _all?: true
  }

  export type ConsultaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consulta to aggregate.
     */
    where?: ConsultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultas to fetch.
     */
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultas
    **/
    _count?: true | ConsultaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultaMaxAggregateInputType
  }

  export type GetConsultaAggregateType<T extends ConsultaAggregateArgs> = {
        [P in keyof T & keyof AggregateConsulta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsulta[P]>
      : GetScalarType<T[P], AggregateConsulta[P]>
  }




  export type ConsultaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultaWhereInput
    orderBy?: ConsultaOrderByWithAggregationInput | ConsultaOrderByWithAggregationInput[]
    by: ConsultaScalarFieldEnum[] | ConsultaScalarFieldEnum
    having?: ConsultaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultaCountAggregateInputType | true
    _avg?: ConsultaAvgAggregateInputType
    _sum?: ConsultaSumAggregateInputType
    _min?: ConsultaMinAggregateInputType
    _max?: ConsultaMaxAggregateInputType
  }

  export type ConsultaGroupByOutputType = {
    id: string
    data: Date
    tipo: string
    semanaGestacional: number | null
    pesoKg: number | null
    pressaoArterial: string | null
    alturaUterina: number | null
    batimentoCardiacoFetal: number | null
    notas: string | null
    ubs: string | null
    gestanteId: string
    profissionalId: string
    criadoEm: Date
    _count: ConsultaCountAggregateOutputType | null
    _avg: ConsultaAvgAggregateOutputType | null
    _sum: ConsultaSumAggregateOutputType | null
    _min: ConsultaMinAggregateOutputType | null
    _max: ConsultaMaxAggregateOutputType | null
  }

  type GetConsultaGroupByPayload<T extends ConsultaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultaGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultaGroupByOutputType[P]>
        }
      >
    >


  export type ConsultaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    data?: boolean
    tipo?: boolean
    semanaGestacional?: boolean
    pesoKg?: boolean
    pressaoArterial?: boolean
    alturaUterina?: boolean
    batimentoCardiacoFetal?: boolean
    notas?: boolean
    ubs?: boolean
    gestanteId?: boolean
    profissionalId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type ConsultaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    data?: boolean
    tipo?: boolean
    semanaGestacional?: boolean
    pesoKg?: boolean
    pressaoArterial?: boolean
    alturaUterina?: boolean
    batimentoCardiacoFetal?: boolean
    notas?: boolean
    ubs?: boolean
    gestanteId?: boolean
    profissionalId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type ConsultaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    data?: boolean
    tipo?: boolean
    semanaGestacional?: boolean
    pesoKg?: boolean
    pressaoArterial?: boolean
    alturaUterina?: boolean
    batimentoCardiacoFetal?: boolean
    notas?: boolean
    ubs?: boolean
    gestanteId?: boolean
    profissionalId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type ConsultaSelectScalar = {
    id?: boolean
    data?: boolean
    tipo?: boolean
    semanaGestacional?: boolean
    pesoKg?: boolean
    pressaoArterial?: boolean
    alturaUterina?: boolean
    batimentoCardiacoFetal?: boolean
    notas?: boolean
    ubs?: boolean
    gestanteId?: boolean
    profissionalId?: boolean
    criadoEm?: boolean
  }

  export type ConsultaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "data" | "tipo" | "semanaGestacional" | "pesoKg" | "pressaoArterial" | "alturaUterina" | "batimentoCardiacoFetal" | "notas" | "ubs" | "gestanteId" | "profissionalId" | "criadoEm", ExtArgs["result"]["consulta"]>
  export type ConsultaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }
  export type ConsultaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }
  export type ConsultaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
    profissional?: boolean | ProfissionalDefaultArgs<ExtArgs>
  }

  export type $ConsultaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consulta"
    objects: {
      gestante: Prisma.$GestantePayload<ExtArgs>
      profissional: Prisma.$ProfissionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      data: Date
      tipo: string
      semanaGestacional: number | null
      pesoKg: number | null
      pressaoArterial: string | null
      alturaUterina: number | null
      batimentoCardiacoFetal: number | null
      notas: string | null
      ubs: string | null
      gestanteId: string
      profissionalId: string
      criadoEm: Date
    }, ExtArgs["result"]["consulta"]>
    composites: {}
  }

  type ConsultaGetPayload<S extends boolean | null | undefined | ConsultaDefaultArgs> = $Result.GetResult<Prisma.$ConsultaPayload, S>

  type ConsultaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultaCountAggregateInputType | true
    }

  export interface ConsultaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consulta'], meta: { name: 'Consulta' } }
    /**
     * Find zero or one Consulta that matches the filter.
     * @param {ConsultaFindUniqueArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultaFindUniqueArgs>(args: SelectSubset<T, ConsultaFindUniqueArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consulta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultaFindUniqueOrThrowArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultaFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consulta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaFindFirstArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultaFindFirstArgs>(args?: SelectSubset<T, ConsultaFindFirstArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consulta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaFindFirstOrThrowArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultaFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultas
     * const consultas = await prisma.consulta.findMany()
     * 
     * // Get first 10 Consultas
     * const consultas = await prisma.consulta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultaWithIdOnly = await prisma.consulta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultaFindManyArgs>(args?: SelectSubset<T, ConsultaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consulta.
     * @param {ConsultaCreateArgs} args - Arguments to create a Consulta.
     * @example
     * // Create one Consulta
     * const Consulta = await prisma.consulta.create({
     *   data: {
     *     // ... data to create a Consulta
     *   }
     * })
     * 
     */
    create<T extends ConsultaCreateArgs>(args: SelectSubset<T, ConsultaCreateArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultas.
     * @param {ConsultaCreateManyArgs} args - Arguments to create many Consultas.
     * @example
     * // Create many Consultas
     * const consulta = await prisma.consulta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultaCreateManyArgs>(args?: SelectSubset<T, ConsultaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultas and returns the data saved in the database.
     * @param {ConsultaCreateManyAndReturnArgs} args - Arguments to create many Consultas.
     * @example
     * // Create many Consultas
     * const consulta = await prisma.consulta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultas and only return the `id`
     * const consultaWithIdOnly = await prisma.consulta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultaCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consulta.
     * @param {ConsultaDeleteArgs} args - Arguments to delete one Consulta.
     * @example
     * // Delete one Consulta
     * const Consulta = await prisma.consulta.delete({
     *   where: {
     *     // ... filter to delete one Consulta
     *   }
     * })
     * 
     */
    delete<T extends ConsultaDeleteArgs>(args: SelectSubset<T, ConsultaDeleteArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consulta.
     * @param {ConsultaUpdateArgs} args - Arguments to update one Consulta.
     * @example
     * // Update one Consulta
     * const consulta = await prisma.consulta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultaUpdateArgs>(args: SelectSubset<T, ConsultaUpdateArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultas.
     * @param {ConsultaDeleteManyArgs} args - Arguments to filter Consultas to delete.
     * @example
     * // Delete a few Consultas
     * const { count } = await prisma.consulta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultaDeleteManyArgs>(args?: SelectSubset<T, ConsultaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultas
     * const consulta = await prisma.consulta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultaUpdateManyArgs>(args: SelectSubset<T, ConsultaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultas and returns the data updated in the database.
     * @param {ConsultaUpdateManyAndReturnArgs} args - Arguments to update many Consultas.
     * @example
     * // Update many Consultas
     * const consulta = await prisma.consulta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultas and only return the `id`
     * const consultaWithIdOnly = await prisma.consulta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsultaUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consulta.
     * @param {ConsultaUpsertArgs} args - Arguments to update or create a Consulta.
     * @example
     * // Update or create a Consulta
     * const consulta = await prisma.consulta.upsert({
     *   create: {
     *     // ... data to create a Consulta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consulta we want to update
     *   }
     * })
     */
    upsert<T extends ConsultaUpsertArgs>(args: SelectSubset<T, ConsultaUpsertArgs<ExtArgs>>): Prisma__ConsultaClient<$Result.GetResult<Prisma.$ConsultaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaCountArgs} args - Arguments to filter Consultas to count.
     * @example
     * // Count the number of Consultas
     * const count = await prisma.consulta.count({
     *   where: {
     *     // ... the filter for the Consultas we want to count
     *   }
     * })
    **/
    count<T extends ConsultaCountArgs>(
      args?: Subset<T, ConsultaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consulta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultaAggregateArgs>(args: Subset<T, ConsultaAggregateArgs>): Prisma.PrismaPromise<GetConsultaAggregateType<T>>

    /**
     * Group by Consulta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultaGroupByArgs['orderBy'] }
        : { orderBy?: ConsultaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consulta model
   */
  readonly fields: ConsultaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consulta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gestante<T extends GestanteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GestanteDefaultArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profissional<T extends ProfissionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfissionalDefaultArgs<ExtArgs>>): Prisma__ProfissionalClient<$Result.GetResult<Prisma.$ProfissionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consulta model
   */
  interface ConsultaFieldRefs {
    readonly id: FieldRef<"Consulta", 'String'>
    readonly data: FieldRef<"Consulta", 'DateTime'>
    readonly tipo: FieldRef<"Consulta", 'String'>
    readonly semanaGestacional: FieldRef<"Consulta", 'Int'>
    readonly pesoKg: FieldRef<"Consulta", 'Float'>
    readonly pressaoArterial: FieldRef<"Consulta", 'String'>
    readonly alturaUterina: FieldRef<"Consulta", 'Float'>
    readonly batimentoCardiacoFetal: FieldRef<"Consulta", 'Int'>
    readonly notas: FieldRef<"Consulta", 'String'>
    readonly ubs: FieldRef<"Consulta", 'String'>
    readonly gestanteId: FieldRef<"Consulta", 'String'>
    readonly profissionalId: FieldRef<"Consulta", 'String'>
    readonly criadoEm: FieldRef<"Consulta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consulta findUnique
   */
  export type ConsultaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter, which Consulta to fetch.
     */
    where: ConsultaWhereUniqueInput
  }

  /**
   * Consulta findUniqueOrThrow
   */
  export type ConsultaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter, which Consulta to fetch.
     */
    where: ConsultaWhereUniqueInput
  }

  /**
   * Consulta findFirst
   */
  export type ConsultaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter, which Consulta to fetch.
     */
    where?: ConsultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultas to fetch.
     */
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultas.
     */
    cursor?: ConsultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultas.
     */
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * Consulta findFirstOrThrow
   */
  export type ConsultaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter, which Consulta to fetch.
     */
    where?: ConsultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultas to fetch.
     */
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultas.
     */
    cursor?: ConsultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultas.
     */
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * Consulta findMany
   */
  export type ConsultaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter, which Consultas to fetch.
     */
    where?: ConsultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultas to fetch.
     */
    orderBy?: ConsultaOrderByWithRelationInput | ConsultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultas.
     */
    cursor?: ConsultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultas.
     */
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * Consulta create
   */
  export type ConsultaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * The data needed to create a Consulta.
     */
    data: XOR<ConsultaCreateInput, ConsultaUncheckedCreateInput>
  }

  /**
   * Consulta createMany
   */
  export type ConsultaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultas.
     */
    data: ConsultaCreateManyInput | ConsultaCreateManyInput[]
  }

  /**
   * Consulta createManyAndReturn
   */
  export type ConsultaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * The data used to create many Consultas.
     */
    data: ConsultaCreateManyInput | ConsultaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consulta update
   */
  export type ConsultaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * The data needed to update a Consulta.
     */
    data: XOR<ConsultaUpdateInput, ConsultaUncheckedUpdateInput>
    /**
     * Choose, which Consulta to update.
     */
    where: ConsultaWhereUniqueInput
  }

  /**
   * Consulta updateMany
   */
  export type ConsultaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultas.
     */
    data: XOR<ConsultaUpdateManyMutationInput, ConsultaUncheckedUpdateManyInput>
    /**
     * Filter which Consultas to update
     */
    where?: ConsultaWhereInput
    /**
     * Limit how many Consultas to update.
     */
    limit?: number
  }

  /**
   * Consulta updateManyAndReturn
   */
  export type ConsultaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * The data used to update Consultas.
     */
    data: XOR<ConsultaUpdateManyMutationInput, ConsultaUncheckedUpdateManyInput>
    /**
     * Filter which Consultas to update
     */
    where?: ConsultaWhereInput
    /**
     * Limit how many Consultas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consulta upsert
   */
  export type ConsultaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * The filter to search for the Consulta to update in case it exists.
     */
    where: ConsultaWhereUniqueInput
    /**
     * In case the Consulta found by the `where` argument doesn't exist, create a new Consulta with this data.
     */
    create: XOR<ConsultaCreateInput, ConsultaUncheckedCreateInput>
    /**
     * In case the Consulta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultaUpdateInput, ConsultaUncheckedUpdateInput>
  }

  /**
   * Consulta delete
   */
  export type ConsultaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
    /**
     * Filter which Consulta to delete.
     */
    where: ConsultaWhereUniqueInput
  }

  /**
   * Consulta deleteMany
   */
  export type ConsultaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultas to delete
     */
    where?: ConsultaWhereInput
    /**
     * Limit how many Consultas to delete.
     */
    limit?: number
  }

  /**
   * Consulta without action
   */
  export type ConsultaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consulta
     */
    select?: ConsultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consulta
     */
    omit?: ConsultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultaInclude<ExtArgs> | null
  }


  /**
   * Model Exame
   */

  export type AggregateExame = {
    _count: ExameCountAggregateOutputType | null
    _min: ExameMinAggregateOutputType | null
    _max: ExameMaxAggregateOutputType | null
  }

  export type ExameMinAggregateOutputType = {
    id: string | null
    tipo: string | null
    data: Date | null
    resultado: string | null
    status: string | null
    observacao: string | null
    unidade: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type ExameMaxAggregateOutputType = {
    id: string | null
    tipo: string | null
    data: Date | null
    resultado: string | null
    status: string | null
    observacao: string | null
    unidade: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type ExameCountAggregateOutputType = {
    id: number
    tipo: number
    data: number
    resultado: number
    status: number
    observacao: number
    unidade: number
    gestanteId: number
    criadoEm: number
    _all: number
  }


  export type ExameMinAggregateInputType = {
    id?: true
    tipo?: true
    data?: true
    resultado?: true
    status?: true
    observacao?: true
    unidade?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type ExameMaxAggregateInputType = {
    id?: true
    tipo?: true
    data?: true
    resultado?: true
    status?: true
    observacao?: true
    unidade?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type ExameCountAggregateInputType = {
    id?: true
    tipo?: true
    data?: true
    resultado?: true
    status?: true
    observacao?: true
    unidade?: true
    gestanteId?: true
    criadoEm?: true
    _all?: true
  }

  export type ExameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exame to aggregate.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exames
    **/
    _count?: true | ExameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExameMaxAggregateInputType
  }

  export type GetExameAggregateType<T extends ExameAggregateArgs> = {
        [P in keyof T & keyof AggregateExame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExame[P]>
      : GetScalarType<T[P], AggregateExame[P]>
  }




  export type ExameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExameWhereInput
    orderBy?: ExameOrderByWithAggregationInput | ExameOrderByWithAggregationInput[]
    by: ExameScalarFieldEnum[] | ExameScalarFieldEnum
    having?: ExameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExameCountAggregateInputType | true
    _min?: ExameMinAggregateInputType
    _max?: ExameMaxAggregateInputType
  }

  export type ExameGroupByOutputType = {
    id: string
    tipo: string
    data: Date
    resultado: string | null
    status: string
    observacao: string | null
    unidade: string | null
    gestanteId: string
    criadoEm: Date
    _count: ExameCountAggregateOutputType | null
    _min: ExameMinAggregateOutputType | null
    _max: ExameMaxAggregateOutputType | null
  }

  type GetExameGroupByPayload<T extends ExameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExameGroupByOutputType[P]>
            : GetScalarType<T[P], ExameGroupByOutputType[P]>
        }
      >
    >


  export type ExameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    data?: boolean
    resultado?: boolean
    status?: boolean
    observacao?: boolean
    unidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exame"]>

  export type ExameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    data?: boolean
    resultado?: boolean
    status?: boolean
    observacao?: boolean
    unidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exame"]>

  export type ExameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    data?: boolean
    resultado?: boolean
    status?: boolean
    observacao?: boolean
    unidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exame"]>

  export type ExameSelectScalar = {
    id?: boolean
    tipo?: boolean
    data?: boolean
    resultado?: boolean
    status?: boolean
    observacao?: boolean
    unidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
  }

  export type ExameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "data" | "resultado" | "status" | "observacao" | "unidade" | "gestanteId" | "criadoEm", ExtArgs["result"]["exame"]>
  export type ExameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type ExameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type ExameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }

  export type $ExamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exame"
    objects: {
      gestante: Prisma.$GestantePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipo: string
      data: Date
      resultado: string | null
      status: string
      observacao: string | null
      unidade: string | null
      gestanteId: string
      criadoEm: Date
    }, ExtArgs["result"]["exame"]>
    composites: {}
  }

  type ExameGetPayload<S extends boolean | null | undefined | ExameDefaultArgs> = $Result.GetResult<Prisma.$ExamePayload, S>

  type ExameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExameCountAggregateInputType | true
    }

  export interface ExameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exame'], meta: { name: 'Exame' } }
    /**
     * Find zero or one Exame that matches the filter.
     * @param {ExameFindUniqueArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExameFindUniqueArgs>(args: SelectSubset<T, ExameFindUniqueArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExameFindUniqueOrThrowArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExameFindUniqueOrThrowArgs>(args: SelectSubset<T, ExameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindFirstArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExameFindFirstArgs>(args?: SelectSubset<T, ExameFindFirstArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindFirstOrThrowArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExameFindFirstOrThrowArgs>(args?: SelectSubset<T, ExameFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exames
     * const exames = await prisma.exame.findMany()
     * 
     * // Get first 10 Exames
     * const exames = await prisma.exame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exameWithIdOnly = await prisma.exame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExameFindManyArgs>(args?: SelectSubset<T, ExameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exame.
     * @param {ExameCreateArgs} args - Arguments to create a Exame.
     * @example
     * // Create one Exame
     * const Exame = await prisma.exame.create({
     *   data: {
     *     // ... data to create a Exame
     *   }
     * })
     * 
     */
    create<T extends ExameCreateArgs>(args: SelectSubset<T, ExameCreateArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exames.
     * @param {ExameCreateManyArgs} args - Arguments to create many Exames.
     * @example
     * // Create many Exames
     * const exame = await prisma.exame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExameCreateManyArgs>(args?: SelectSubset<T, ExameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exames and returns the data saved in the database.
     * @param {ExameCreateManyAndReturnArgs} args - Arguments to create many Exames.
     * @example
     * // Create many Exames
     * const exame = await prisma.exame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exames and only return the `id`
     * const exameWithIdOnly = await prisma.exame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExameCreateManyAndReturnArgs>(args?: SelectSubset<T, ExameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exame.
     * @param {ExameDeleteArgs} args - Arguments to delete one Exame.
     * @example
     * // Delete one Exame
     * const Exame = await prisma.exame.delete({
     *   where: {
     *     // ... filter to delete one Exame
     *   }
     * })
     * 
     */
    delete<T extends ExameDeleteArgs>(args: SelectSubset<T, ExameDeleteArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exame.
     * @param {ExameUpdateArgs} args - Arguments to update one Exame.
     * @example
     * // Update one Exame
     * const exame = await prisma.exame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExameUpdateArgs>(args: SelectSubset<T, ExameUpdateArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exames.
     * @param {ExameDeleteManyArgs} args - Arguments to filter Exames to delete.
     * @example
     * // Delete a few Exames
     * const { count } = await prisma.exame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExameDeleteManyArgs>(args?: SelectSubset<T, ExameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exames
     * const exame = await prisma.exame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExameUpdateManyArgs>(args: SelectSubset<T, ExameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exames and returns the data updated in the database.
     * @param {ExameUpdateManyAndReturnArgs} args - Arguments to update many Exames.
     * @example
     * // Update many Exames
     * const exame = await prisma.exame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exames and only return the `id`
     * const exameWithIdOnly = await prisma.exame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExameUpdateManyAndReturnArgs>(args: SelectSubset<T, ExameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exame.
     * @param {ExameUpsertArgs} args - Arguments to update or create a Exame.
     * @example
     * // Update or create a Exame
     * const exame = await prisma.exame.upsert({
     *   create: {
     *     // ... data to create a Exame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exame we want to update
     *   }
     * })
     */
    upsert<T extends ExameUpsertArgs>(args: SelectSubset<T, ExameUpsertArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameCountArgs} args - Arguments to filter Exames to count.
     * @example
     * // Count the number of Exames
     * const count = await prisma.exame.count({
     *   where: {
     *     // ... the filter for the Exames we want to count
     *   }
     * })
    **/
    count<T extends ExameCountArgs>(
      args?: Subset<T, ExameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExameAggregateArgs>(args: Subset<T, ExameAggregateArgs>): Prisma.PrismaPromise<GetExameAggregateType<T>>

    /**
     * Group by Exame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExameGroupByArgs['orderBy'] }
        : { orderBy?: ExameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exame model
   */
  readonly fields: ExameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gestante<T extends GestanteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GestanteDefaultArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exame model
   */
  interface ExameFieldRefs {
    readonly id: FieldRef<"Exame", 'String'>
    readonly tipo: FieldRef<"Exame", 'String'>
    readonly data: FieldRef<"Exame", 'DateTime'>
    readonly resultado: FieldRef<"Exame", 'String'>
    readonly status: FieldRef<"Exame", 'String'>
    readonly observacao: FieldRef<"Exame", 'String'>
    readonly unidade: FieldRef<"Exame", 'String'>
    readonly gestanteId: FieldRef<"Exame", 'String'>
    readonly criadoEm: FieldRef<"Exame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exame findUnique
   */
  export type ExameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame findUniqueOrThrow
   */
  export type ExameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame findFirst
   */
  export type ExameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exames.
     */
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame findFirstOrThrow
   */
  export type ExameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exames.
     */
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame findMany
   */
  export type ExameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exames to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame create
   */
  export type ExameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The data needed to create a Exame.
     */
    data: XOR<ExameCreateInput, ExameUncheckedCreateInput>
  }

  /**
   * Exame createMany
   */
  export type ExameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exames.
     */
    data: ExameCreateManyInput | ExameCreateManyInput[]
  }

  /**
   * Exame createManyAndReturn
   */
  export type ExameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * The data used to create many Exames.
     */
    data: ExameCreateManyInput | ExameCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exame update
   */
  export type ExameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The data needed to update a Exame.
     */
    data: XOR<ExameUpdateInput, ExameUncheckedUpdateInput>
    /**
     * Choose, which Exame to update.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame updateMany
   */
  export type ExameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exames.
     */
    data: XOR<ExameUpdateManyMutationInput, ExameUncheckedUpdateManyInput>
    /**
     * Filter which Exames to update
     */
    where?: ExameWhereInput
    /**
     * Limit how many Exames to update.
     */
    limit?: number
  }

  /**
   * Exame updateManyAndReturn
   */
  export type ExameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * The data used to update Exames.
     */
    data: XOR<ExameUpdateManyMutationInput, ExameUncheckedUpdateManyInput>
    /**
     * Filter which Exames to update
     */
    where?: ExameWhereInput
    /**
     * Limit how many Exames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exame upsert
   */
  export type ExameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The filter to search for the Exame to update in case it exists.
     */
    where: ExameWhereUniqueInput
    /**
     * In case the Exame found by the `where` argument doesn't exist, create a new Exame with this data.
     */
    create: XOR<ExameCreateInput, ExameUncheckedCreateInput>
    /**
     * In case the Exame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExameUpdateInput, ExameUncheckedUpdateInput>
  }

  /**
   * Exame delete
   */
  export type ExameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter which Exame to delete.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame deleteMany
   */
  export type ExameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exames to delete
     */
    where?: ExameWhereInput
    /**
     * Limit how many Exames to delete.
     */
    limit?: number
  }

  /**
   * Exame without action
   */
  export type ExameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
  }


  /**
   * Model Vacina
   */

  export type AggregateVacina = {
    _count: VacinaCountAggregateOutputType | null
    _min: VacinaMinAggregateOutputType | null
    _max: VacinaMaxAggregateOutputType | null
  }

  export type VacinaMinAggregateOutputType = {
    id: string | null
    codigoVacina: string | null
    nome: string | null
    data: Date | null
    dose: string | null
    lote: string | null
    fabricante: string | null
    localAplicacao: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type VacinaMaxAggregateOutputType = {
    id: string | null
    codigoVacina: string | null
    nome: string | null
    data: Date | null
    dose: string | null
    lote: string | null
    fabricante: string | null
    localAplicacao: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type VacinaCountAggregateOutputType = {
    id: number
    codigoVacina: number
    nome: number
    data: number
    dose: number
    lote: number
    fabricante: number
    localAplicacao: number
    gestanteId: number
    criadoEm: number
    _all: number
  }


  export type VacinaMinAggregateInputType = {
    id?: true
    codigoVacina?: true
    nome?: true
    data?: true
    dose?: true
    lote?: true
    fabricante?: true
    localAplicacao?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type VacinaMaxAggregateInputType = {
    id?: true
    codigoVacina?: true
    nome?: true
    data?: true
    dose?: true
    lote?: true
    fabricante?: true
    localAplicacao?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type VacinaCountAggregateInputType = {
    id?: true
    codigoVacina?: true
    nome?: true
    data?: true
    dose?: true
    lote?: true
    fabricante?: true
    localAplicacao?: true
    gestanteId?: true
    criadoEm?: true
    _all?: true
  }

  export type VacinaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vacina to aggregate.
     */
    where?: VacinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vacinas to fetch.
     */
    orderBy?: VacinaOrderByWithRelationInput | VacinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VacinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vacinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vacinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vacinas
    **/
    _count?: true | VacinaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VacinaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VacinaMaxAggregateInputType
  }

  export type GetVacinaAggregateType<T extends VacinaAggregateArgs> = {
        [P in keyof T & keyof AggregateVacina]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVacina[P]>
      : GetScalarType<T[P], AggregateVacina[P]>
  }




  export type VacinaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VacinaWhereInput
    orderBy?: VacinaOrderByWithAggregationInput | VacinaOrderByWithAggregationInput[]
    by: VacinaScalarFieldEnum[] | VacinaScalarFieldEnum
    having?: VacinaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VacinaCountAggregateInputType | true
    _min?: VacinaMinAggregateInputType
    _max?: VacinaMaxAggregateInputType
  }

  export type VacinaGroupByOutputType = {
    id: string
    codigoVacina: string
    nome: string
    data: Date
    dose: string
    lote: string | null
    fabricante: string | null
    localAplicacao: string | null
    gestanteId: string
    criadoEm: Date
    _count: VacinaCountAggregateOutputType | null
    _min: VacinaMinAggregateOutputType | null
    _max: VacinaMaxAggregateOutputType | null
  }

  type GetVacinaGroupByPayload<T extends VacinaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VacinaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VacinaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VacinaGroupByOutputType[P]>
            : GetScalarType<T[P], VacinaGroupByOutputType[P]>
        }
      >
    >


  export type VacinaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoVacina?: boolean
    nome?: boolean
    data?: boolean
    dose?: boolean
    lote?: boolean
    fabricante?: boolean
    localAplicacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vacina"]>

  export type VacinaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoVacina?: boolean
    nome?: boolean
    data?: boolean
    dose?: boolean
    lote?: boolean
    fabricante?: boolean
    localAplicacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vacina"]>

  export type VacinaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoVacina?: boolean
    nome?: boolean
    data?: boolean
    dose?: boolean
    lote?: boolean
    fabricante?: boolean
    localAplicacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vacina"]>

  export type VacinaSelectScalar = {
    id?: boolean
    codigoVacina?: boolean
    nome?: boolean
    data?: boolean
    dose?: boolean
    lote?: boolean
    fabricante?: boolean
    localAplicacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
  }

  export type VacinaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigoVacina" | "nome" | "data" | "dose" | "lote" | "fabricante" | "localAplicacao" | "gestanteId" | "criadoEm", ExtArgs["result"]["vacina"]>
  export type VacinaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type VacinaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type VacinaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }

  export type $VacinaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vacina"
    objects: {
      gestante: Prisma.$GestantePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigoVacina: string
      nome: string
      data: Date
      dose: string
      lote: string | null
      fabricante: string | null
      localAplicacao: string | null
      gestanteId: string
      criadoEm: Date
    }, ExtArgs["result"]["vacina"]>
    composites: {}
  }

  type VacinaGetPayload<S extends boolean | null | undefined | VacinaDefaultArgs> = $Result.GetResult<Prisma.$VacinaPayload, S>

  type VacinaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VacinaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VacinaCountAggregateInputType | true
    }

  export interface VacinaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vacina'], meta: { name: 'Vacina' } }
    /**
     * Find zero or one Vacina that matches the filter.
     * @param {VacinaFindUniqueArgs} args - Arguments to find a Vacina
     * @example
     * // Get one Vacina
     * const vacina = await prisma.vacina.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VacinaFindUniqueArgs>(args: SelectSubset<T, VacinaFindUniqueArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vacina that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VacinaFindUniqueOrThrowArgs} args - Arguments to find a Vacina
     * @example
     * // Get one Vacina
     * const vacina = await prisma.vacina.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VacinaFindUniqueOrThrowArgs>(args: SelectSubset<T, VacinaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vacina that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaFindFirstArgs} args - Arguments to find a Vacina
     * @example
     * // Get one Vacina
     * const vacina = await prisma.vacina.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VacinaFindFirstArgs>(args?: SelectSubset<T, VacinaFindFirstArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vacina that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaFindFirstOrThrowArgs} args - Arguments to find a Vacina
     * @example
     * // Get one Vacina
     * const vacina = await prisma.vacina.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VacinaFindFirstOrThrowArgs>(args?: SelectSubset<T, VacinaFindFirstOrThrowArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vacinas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vacinas
     * const vacinas = await prisma.vacina.findMany()
     * 
     * // Get first 10 Vacinas
     * const vacinas = await prisma.vacina.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vacinaWithIdOnly = await prisma.vacina.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VacinaFindManyArgs>(args?: SelectSubset<T, VacinaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vacina.
     * @param {VacinaCreateArgs} args - Arguments to create a Vacina.
     * @example
     * // Create one Vacina
     * const Vacina = await prisma.vacina.create({
     *   data: {
     *     // ... data to create a Vacina
     *   }
     * })
     * 
     */
    create<T extends VacinaCreateArgs>(args: SelectSubset<T, VacinaCreateArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vacinas.
     * @param {VacinaCreateManyArgs} args - Arguments to create many Vacinas.
     * @example
     * // Create many Vacinas
     * const vacina = await prisma.vacina.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VacinaCreateManyArgs>(args?: SelectSubset<T, VacinaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vacinas and returns the data saved in the database.
     * @param {VacinaCreateManyAndReturnArgs} args - Arguments to create many Vacinas.
     * @example
     * // Create many Vacinas
     * const vacina = await prisma.vacina.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vacinas and only return the `id`
     * const vacinaWithIdOnly = await prisma.vacina.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VacinaCreateManyAndReturnArgs>(args?: SelectSubset<T, VacinaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vacina.
     * @param {VacinaDeleteArgs} args - Arguments to delete one Vacina.
     * @example
     * // Delete one Vacina
     * const Vacina = await prisma.vacina.delete({
     *   where: {
     *     // ... filter to delete one Vacina
     *   }
     * })
     * 
     */
    delete<T extends VacinaDeleteArgs>(args: SelectSubset<T, VacinaDeleteArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vacina.
     * @param {VacinaUpdateArgs} args - Arguments to update one Vacina.
     * @example
     * // Update one Vacina
     * const vacina = await prisma.vacina.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VacinaUpdateArgs>(args: SelectSubset<T, VacinaUpdateArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vacinas.
     * @param {VacinaDeleteManyArgs} args - Arguments to filter Vacinas to delete.
     * @example
     * // Delete a few Vacinas
     * const { count } = await prisma.vacina.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VacinaDeleteManyArgs>(args?: SelectSubset<T, VacinaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vacinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vacinas
     * const vacina = await prisma.vacina.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VacinaUpdateManyArgs>(args: SelectSubset<T, VacinaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vacinas and returns the data updated in the database.
     * @param {VacinaUpdateManyAndReturnArgs} args - Arguments to update many Vacinas.
     * @example
     * // Update many Vacinas
     * const vacina = await prisma.vacina.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vacinas and only return the `id`
     * const vacinaWithIdOnly = await prisma.vacina.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VacinaUpdateManyAndReturnArgs>(args: SelectSubset<T, VacinaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vacina.
     * @param {VacinaUpsertArgs} args - Arguments to update or create a Vacina.
     * @example
     * // Update or create a Vacina
     * const vacina = await prisma.vacina.upsert({
     *   create: {
     *     // ... data to create a Vacina
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vacina we want to update
     *   }
     * })
     */
    upsert<T extends VacinaUpsertArgs>(args: SelectSubset<T, VacinaUpsertArgs<ExtArgs>>): Prisma__VacinaClient<$Result.GetResult<Prisma.$VacinaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vacinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaCountArgs} args - Arguments to filter Vacinas to count.
     * @example
     * // Count the number of Vacinas
     * const count = await prisma.vacina.count({
     *   where: {
     *     // ... the filter for the Vacinas we want to count
     *   }
     * })
    **/
    count<T extends VacinaCountArgs>(
      args?: Subset<T, VacinaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VacinaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vacina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VacinaAggregateArgs>(args: Subset<T, VacinaAggregateArgs>): Prisma.PrismaPromise<GetVacinaAggregateType<T>>

    /**
     * Group by Vacina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VacinaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VacinaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VacinaGroupByArgs['orderBy'] }
        : { orderBy?: VacinaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VacinaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVacinaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vacina model
   */
  readonly fields: VacinaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vacina.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VacinaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gestante<T extends GestanteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GestanteDefaultArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vacina model
   */
  interface VacinaFieldRefs {
    readonly id: FieldRef<"Vacina", 'String'>
    readonly codigoVacina: FieldRef<"Vacina", 'String'>
    readonly nome: FieldRef<"Vacina", 'String'>
    readonly data: FieldRef<"Vacina", 'DateTime'>
    readonly dose: FieldRef<"Vacina", 'String'>
    readonly lote: FieldRef<"Vacina", 'String'>
    readonly fabricante: FieldRef<"Vacina", 'String'>
    readonly localAplicacao: FieldRef<"Vacina", 'String'>
    readonly gestanteId: FieldRef<"Vacina", 'String'>
    readonly criadoEm: FieldRef<"Vacina", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vacina findUnique
   */
  export type VacinaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter, which Vacina to fetch.
     */
    where: VacinaWhereUniqueInput
  }

  /**
   * Vacina findUniqueOrThrow
   */
  export type VacinaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter, which Vacina to fetch.
     */
    where: VacinaWhereUniqueInput
  }

  /**
   * Vacina findFirst
   */
  export type VacinaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter, which Vacina to fetch.
     */
    where?: VacinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vacinas to fetch.
     */
    orderBy?: VacinaOrderByWithRelationInput | VacinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vacinas.
     */
    cursor?: VacinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vacinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vacinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vacinas.
     */
    distinct?: VacinaScalarFieldEnum | VacinaScalarFieldEnum[]
  }

  /**
   * Vacina findFirstOrThrow
   */
  export type VacinaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter, which Vacina to fetch.
     */
    where?: VacinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vacinas to fetch.
     */
    orderBy?: VacinaOrderByWithRelationInput | VacinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vacinas.
     */
    cursor?: VacinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vacinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vacinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vacinas.
     */
    distinct?: VacinaScalarFieldEnum | VacinaScalarFieldEnum[]
  }

  /**
   * Vacina findMany
   */
  export type VacinaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter, which Vacinas to fetch.
     */
    where?: VacinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vacinas to fetch.
     */
    orderBy?: VacinaOrderByWithRelationInput | VacinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vacinas.
     */
    cursor?: VacinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vacinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vacinas.
     */
    skip?: number
    distinct?: VacinaScalarFieldEnum | VacinaScalarFieldEnum[]
  }

  /**
   * Vacina create
   */
  export type VacinaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * The data needed to create a Vacina.
     */
    data: XOR<VacinaCreateInput, VacinaUncheckedCreateInput>
  }

  /**
   * Vacina createMany
   */
  export type VacinaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vacinas.
     */
    data: VacinaCreateManyInput | VacinaCreateManyInput[]
  }

  /**
   * Vacina createManyAndReturn
   */
  export type VacinaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * The data used to create many Vacinas.
     */
    data: VacinaCreateManyInput | VacinaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vacina update
   */
  export type VacinaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * The data needed to update a Vacina.
     */
    data: XOR<VacinaUpdateInput, VacinaUncheckedUpdateInput>
    /**
     * Choose, which Vacina to update.
     */
    where: VacinaWhereUniqueInput
  }

  /**
   * Vacina updateMany
   */
  export type VacinaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vacinas.
     */
    data: XOR<VacinaUpdateManyMutationInput, VacinaUncheckedUpdateManyInput>
    /**
     * Filter which Vacinas to update
     */
    where?: VacinaWhereInput
    /**
     * Limit how many Vacinas to update.
     */
    limit?: number
  }

  /**
   * Vacina updateManyAndReturn
   */
  export type VacinaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * The data used to update Vacinas.
     */
    data: XOR<VacinaUpdateManyMutationInput, VacinaUncheckedUpdateManyInput>
    /**
     * Filter which Vacinas to update
     */
    where?: VacinaWhereInput
    /**
     * Limit how many Vacinas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vacina upsert
   */
  export type VacinaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * The filter to search for the Vacina to update in case it exists.
     */
    where: VacinaWhereUniqueInput
    /**
     * In case the Vacina found by the `where` argument doesn't exist, create a new Vacina with this data.
     */
    create: XOR<VacinaCreateInput, VacinaUncheckedCreateInput>
    /**
     * In case the Vacina was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VacinaUpdateInput, VacinaUncheckedUpdateInput>
  }

  /**
   * Vacina delete
   */
  export type VacinaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
    /**
     * Filter which Vacina to delete.
     */
    where: VacinaWhereUniqueInput
  }

  /**
   * Vacina deleteMany
   */
  export type VacinaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vacinas to delete
     */
    where?: VacinaWhereInput
    /**
     * Limit how many Vacinas to delete.
     */
    limit?: number
  }

  /**
   * Vacina without action
   */
  export type VacinaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vacina
     */
    select?: VacinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vacina
     */
    omit?: VacinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VacinaInclude<ExtArgs> | null
  }


  /**
   * Model Medicacao
   */

  export type AggregateMedicacao = {
    _count: MedicacaoCountAggregateOutputType | null
    _min: MedicacaoMinAggregateOutputType | null
    _max: MedicacaoMaxAggregateOutputType | null
  }

  export type MedicacaoMinAggregateOutputType = {
    id: string | null
    medicamento: string | null
    dosagem: string | null
    via: string | null
    dataInicio: Date | null
    dataFim: Date | null
    ativo: boolean | null
    observacao: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type MedicacaoMaxAggregateOutputType = {
    id: string | null
    medicamento: string | null
    dosagem: string | null
    via: string | null
    dataInicio: Date | null
    dataFim: Date | null
    ativo: boolean | null
    observacao: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type MedicacaoCountAggregateOutputType = {
    id: number
    medicamento: number
    dosagem: number
    via: number
    dataInicio: number
    dataFim: number
    ativo: number
    observacao: number
    gestanteId: number
    criadoEm: number
    _all: number
  }


  export type MedicacaoMinAggregateInputType = {
    id?: true
    medicamento?: true
    dosagem?: true
    via?: true
    dataInicio?: true
    dataFim?: true
    ativo?: true
    observacao?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type MedicacaoMaxAggregateInputType = {
    id?: true
    medicamento?: true
    dosagem?: true
    via?: true
    dataInicio?: true
    dataFim?: true
    ativo?: true
    observacao?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type MedicacaoCountAggregateInputType = {
    id?: true
    medicamento?: true
    dosagem?: true
    via?: true
    dataInicio?: true
    dataFim?: true
    ativo?: true
    observacao?: true
    gestanteId?: true
    criadoEm?: true
    _all?: true
  }

  export type MedicacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medicacao to aggregate.
     */
    where?: MedicacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicacaos to fetch.
     */
    orderBy?: MedicacaoOrderByWithRelationInput | MedicacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Medicacaos
    **/
    _count?: true | MedicacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicacaoMaxAggregateInputType
  }

  export type GetMedicacaoAggregateType<T extends MedicacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicacao[P]>
      : GetScalarType<T[P], AggregateMedicacao[P]>
  }




  export type MedicacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicacaoWhereInput
    orderBy?: MedicacaoOrderByWithAggregationInput | MedicacaoOrderByWithAggregationInput[]
    by: MedicacaoScalarFieldEnum[] | MedicacaoScalarFieldEnum
    having?: MedicacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicacaoCountAggregateInputType | true
    _min?: MedicacaoMinAggregateInputType
    _max?: MedicacaoMaxAggregateInputType
  }

  export type MedicacaoGroupByOutputType = {
    id: string
    medicamento: string
    dosagem: string
    via: string | null
    dataInicio: Date
    dataFim: Date | null
    ativo: boolean
    observacao: string | null
    gestanteId: string
    criadoEm: Date
    _count: MedicacaoCountAggregateOutputType | null
    _min: MedicacaoMinAggregateOutputType | null
    _max: MedicacaoMaxAggregateOutputType | null
  }

  type GetMedicacaoGroupByPayload<T extends MedicacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicacaoGroupByOutputType[P]>
            : GetScalarType<T[P], MedicacaoGroupByOutputType[P]>
        }
      >
    >


  export type MedicacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicamento?: boolean
    dosagem?: boolean
    via?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    ativo?: boolean
    observacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicacao"]>

  export type MedicacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicamento?: boolean
    dosagem?: boolean
    via?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    ativo?: boolean
    observacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicacao"]>

  export type MedicacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicamento?: boolean
    dosagem?: boolean
    via?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    ativo?: boolean
    observacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicacao"]>

  export type MedicacaoSelectScalar = {
    id?: boolean
    medicamento?: boolean
    dosagem?: boolean
    via?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    ativo?: boolean
    observacao?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
  }

  export type MedicacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "medicamento" | "dosagem" | "via" | "dataInicio" | "dataFim" | "ativo" | "observacao" | "gestanteId" | "criadoEm", ExtArgs["result"]["medicacao"]>
  export type MedicacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type MedicacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type MedicacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }

  export type $MedicacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Medicacao"
    objects: {
      gestante: Prisma.$GestantePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      medicamento: string
      dosagem: string
      via: string | null
      dataInicio: Date
      dataFim: Date | null
      ativo: boolean
      observacao: string | null
      gestanteId: string
      criadoEm: Date
    }, ExtArgs["result"]["medicacao"]>
    composites: {}
  }

  type MedicacaoGetPayload<S extends boolean | null | undefined | MedicacaoDefaultArgs> = $Result.GetResult<Prisma.$MedicacaoPayload, S>

  type MedicacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicacaoCountAggregateInputType | true
    }

  export interface MedicacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Medicacao'], meta: { name: 'Medicacao' } }
    /**
     * Find zero or one Medicacao that matches the filter.
     * @param {MedicacaoFindUniqueArgs} args - Arguments to find a Medicacao
     * @example
     * // Get one Medicacao
     * const medicacao = await prisma.medicacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicacaoFindUniqueArgs>(args: SelectSubset<T, MedicacaoFindUniqueArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medicacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicacaoFindUniqueOrThrowArgs} args - Arguments to find a Medicacao
     * @example
     * // Get one Medicacao
     * const medicacao = await prisma.medicacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoFindFirstArgs} args - Arguments to find a Medicacao
     * @example
     * // Get one Medicacao
     * const medicacao = await prisma.medicacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicacaoFindFirstArgs>(args?: SelectSubset<T, MedicacaoFindFirstArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoFindFirstOrThrowArgs} args - Arguments to find a Medicacao
     * @example
     * // Get one Medicacao
     * const medicacao = await prisma.medicacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medicacaos
     * const medicacaos = await prisma.medicacao.findMany()
     * 
     * // Get first 10 Medicacaos
     * const medicacaos = await prisma.medicacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicacaoWithIdOnly = await prisma.medicacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicacaoFindManyArgs>(args?: SelectSubset<T, MedicacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medicacao.
     * @param {MedicacaoCreateArgs} args - Arguments to create a Medicacao.
     * @example
     * // Create one Medicacao
     * const Medicacao = await prisma.medicacao.create({
     *   data: {
     *     // ... data to create a Medicacao
     *   }
     * })
     * 
     */
    create<T extends MedicacaoCreateArgs>(args: SelectSubset<T, MedicacaoCreateArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medicacaos.
     * @param {MedicacaoCreateManyArgs} args - Arguments to create many Medicacaos.
     * @example
     * // Create many Medicacaos
     * const medicacao = await prisma.medicacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicacaoCreateManyArgs>(args?: SelectSubset<T, MedicacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Medicacaos and returns the data saved in the database.
     * @param {MedicacaoCreateManyAndReturnArgs} args - Arguments to create many Medicacaos.
     * @example
     * // Create many Medicacaos
     * const medicacao = await prisma.medicacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Medicacaos and only return the `id`
     * const medicacaoWithIdOnly = await prisma.medicacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Medicacao.
     * @param {MedicacaoDeleteArgs} args - Arguments to delete one Medicacao.
     * @example
     * // Delete one Medicacao
     * const Medicacao = await prisma.medicacao.delete({
     *   where: {
     *     // ... filter to delete one Medicacao
     *   }
     * })
     * 
     */
    delete<T extends MedicacaoDeleteArgs>(args: SelectSubset<T, MedicacaoDeleteArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medicacao.
     * @param {MedicacaoUpdateArgs} args - Arguments to update one Medicacao.
     * @example
     * // Update one Medicacao
     * const medicacao = await prisma.medicacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicacaoUpdateArgs>(args: SelectSubset<T, MedicacaoUpdateArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medicacaos.
     * @param {MedicacaoDeleteManyArgs} args - Arguments to filter Medicacaos to delete.
     * @example
     * // Delete a few Medicacaos
     * const { count } = await prisma.medicacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicacaoDeleteManyArgs>(args?: SelectSubset<T, MedicacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medicacaos
     * const medicacao = await prisma.medicacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicacaoUpdateManyArgs>(args: SelectSubset<T, MedicacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicacaos and returns the data updated in the database.
     * @param {MedicacaoUpdateManyAndReturnArgs} args - Arguments to update many Medicacaos.
     * @example
     * // Update many Medicacaos
     * const medicacao = await prisma.medicacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Medicacaos and only return the `id`
     * const medicacaoWithIdOnly = await prisma.medicacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Medicacao.
     * @param {MedicacaoUpsertArgs} args - Arguments to update or create a Medicacao.
     * @example
     * // Update or create a Medicacao
     * const medicacao = await prisma.medicacao.upsert({
     *   create: {
     *     // ... data to create a Medicacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medicacao we want to update
     *   }
     * })
     */
    upsert<T extends MedicacaoUpsertArgs>(args: SelectSubset<T, MedicacaoUpsertArgs<ExtArgs>>): Prisma__MedicacaoClient<$Result.GetResult<Prisma.$MedicacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medicacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoCountArgs} args - Arguments to filter Medicacaos to count.
     * @example
     * // Count the number of Medicacaos
     * const count = await prisma.medicacao.count({
     *   where: {
     *     // ... the filter for the Medicacaos we want to count
     *   }
     * })
    **/
    count<T extends MedicacaoCountArgs>(
      args?: Subset<T, MedicacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medicacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicacaoAggregateArgs>(args: Subset<T, MedicacaoAggregateArgs>): Prisma.PrismaPromise<GetMedicacaoAggregateType<T>>

    /**
     * Group by Medicacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicacaoGroupByArgs['orderBy'] }
        : { orderBy?: MedicacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Medicacao model
   */
  readonly fields: MedicacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Medicacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gestante<T extends GestanteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GestanteDefaultArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Medicacao model
   */
  interface MedicacaoFieldRefs {
    readonly id: FieldRef<"Medicacao", 'String'>
    readonly medicamento: FieldRef<"Medicacao", 'String'>
    readonly dosagem: FieldRef<"Medicacao", 'String'>
    readonly via: FieldRef<"Medicacao", 'String'>
    readonly dataInicio: FieldRef<"Medicacao", 'DateTime'>
    readonly dataFim: FieldRef<"Medicacao", 'DateTime'>
    readonly ativo: FieldRef<"Medicacao", 'Boolean'>
    readonly observacao: FieldRef<"Medicacao", 'String'>
    readonly gestanteId: FieldRef<"Medicacao", 'String'>
    readonly criadoEm: FieldRef<"Medicacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Medicacao findUnique
   */
  export type MedicacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter, which Medicacao to fetch.
     */
    where: MedicacaoWhereUniqueInput
  }

  /**
   * Medicacao findUniqueOrThrow
   */
  export type MedicacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter, which Medicacao to fetch.
     */
    where: MedicacaoWhereUniqueInput
  }

  /**
   * Medicacao findFirst
   */
  export type MedicacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter, which Medicacao to fetch.
     */
    where?: MedicacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicacaos to fetch.
     */
    orderBy?: MedicacaoOrderByWithRelationInput | MedicacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicacaos.
     */
    cursor?: MedicacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicacaos.
     */
    distinct?: MedicacaoScalarFieldEnum | MedicacaoScalarFieldEnum[]
  }

  /**
   * Medicacao findFirstOrThrow
   */
  export type MedicacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter, which Medicacao to fetch.
     */
    where?: MedicacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicacaos to fetch.
     */
    orderBy?: MedicacaoOrderByWithRelationInput | MedicacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicacaos.
     */
    cursor?: MedicacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicacaos.
     */
    distinct?: MedicacaoScalarFieldEnum | MedicacaoScalarFieldEnum[]
  }

  /**
   * Medicacao findMany
   */
  export type MedicacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter, which Medicacaos to fetch.
     */
    where?: MedicacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicacaos to fetch.
     */
    orderBy?: MedicacaoOrderByWithRelationInput | MedicacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Medicacaos.
     */
    cursor?: MedicacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicacaos.
     */
    skip?: number
    distinct?: MedicacaoScalarFieldEnum | MedicacaoScalarFieldEnum[]
  }

  /**
   * Medicacao create
   */
  export type MedicacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Medicacao.
     */
    data: XOR<MedicacaoCreateInput, MedicacaoUncheckedCreateInput>
  }

  /**
   * Medicacao createMany
   */
  export type MedicacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Medicacaos.
     */
    data: MedicacaoCreateManyInput | MedicacaoCreateManyInput[]
  }

  /**
   * Medicacao createManyAndReturn
   */
  export type MedicacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Medicacaos.
     */
    data: MedicacaoCreateManyInput | MedicacaoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Medicacao update
   */
  export type MedicacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Medicacao.
     */
    data: XOR<MedicacaoUpdateInput, MedicacaoUncheckedUpdateInput>
    /**
     * Choose, which Medicacao to update.
     */
    where: MedicacaoWhereUniqueInput
  }

  /**
   * Medicacao updateMany
   */
  export type MedicacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Medicacaos.
     */
    data: XOR<MedicacaoUpdateManyMutationInput, MedicacaoUncheckedUpdateManyInput>
    /**
     * Filter which Medicacaos to update
     */
    where?: MedicacaoWhereInput
    /**
     * Limit how many Medicacaos to update.
     */
    limit?: number
  }

  /**
   * Medicacao updateManyAndReturn
   */
  export type MedicacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * The data used to update Medicacaos.
     */
    data: XOR<MedicacaoUpdateManyMutationInput, MedicacaoUncheckedUpdateManyInput>
    /**
     * Filter which Medicacaos to update
     */
    where?: MedicacaoWhereInput
    /**
     * Limit how many Medicacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Medicacao upsert
   */
  export type MedicacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Medicacao to update in case it exists.
     */
    where: MedicacaoWhereUniqueInput
    /**
     * In case the Medicacao found by the `where` argument doesn't exist, create a new Medicacao with this data.
     */
    create: XOR<MedicacaoCreateInput, MedicacaoUncheckedCreateInput>
    /**
     * In case the Medicacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicacaoUpdateInput, MedicacaoUncheckedUpdateInput>
  }

  /**
   * Medicacao delete
   */
  export type MedicacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
    /**
     * Filter which Medicacao to delete.
     */
    where: MedicacaoWhereUniqueInput
  }

  /**
   * Medicacao deleteMany
   */
  export type MedicacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medicacaos to delete
     */
    where?: MedicacaoWhereInput
    /**
     * Limit how many Medicacaos to delete.
     */
    limit?: number
  }

  /**
   * Medicacao without action
   */
  export type MedicacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicacao
     */
    select?: MedicacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medicacao
     */
    omit?: MedicacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicacaoInclude<ExtArgs> | null
  }


  /**
   * Model CondicaoClinica
   */

  export type AggregateCondicaoClinica = {
    _count: CondicaoClinicaCountAggregateOutputType | null
    _min: CondicaoClinicaMinAggregateOutputType | null
    _max: CondicaoClinicaMaxAggregateOutputType | null
  }

  export type CondicaoClinicaMinAggregateOutputType = {
    id: string | null
    codigoCid: string | null
    descricao: string | null
    dataInicio: Date | null
    dataFim: Date | null
    status: string | null
    gravidade: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type CondicaoClinicaMaxAggregateOutputType = {
    id: string | null
    codigoCid: string | null
    descricao: string | null
    dataInicio: Date | null
    dataFim: Date | null
    status: string | null
    gravidade: string | null
    gestanteId: string | null
    criadoEm: Date | null
  }

  export type CondicaoClinicaCountAggregateOutputType = {
    id: number
    codigoCid: number
    descricao: number
    dataInicio: number
    dataFim: number
    status: number
    gravidade: number
    gestanteId: number
    criadoEm: number
    _all: number
  }


  export type CondicaoClinicaMinAggregateInputType = {
    id?: true
    codigoCid?: true
    descricao?: true
    dataInicio?: true
    dataFim?: true
    status?: true
    gravidade?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type CondicaoClinicaMaxAggregateInputType = {
    id?: true
    codigoCid?: true
    descricao?: true
    dataInicio?: true
    dataFim?: true
    status?: true
    gravidade?: true
    gestanteId?: true
    criadoEm?: true
  }

  export type CondicaoClinicaCountAggregateInputType = {
    id?: true
    codigoCid?: true
    descricao?: true
    dataInicio?: true
    dataFim?: true
    status?: true
    gravidade?: true
    gestanteId?: true
    criadoEm?: true
    _all?: true
  }

  export type CondicaoClinicaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CondicaoClinica to aggregate.
     */
    where?: CondicaoClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CondicaoClinicas to fetch.
     */
    orderBy?: CondicaoClinicaOrderByWithRelationInput | CondicaoClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CondicaoClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CondicaoClinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CondicaoClinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CondicaoClinicas
    **/
    _count?: true | CondicaoClinicaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CondicaoClinicaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CondicaoClinicaMaxAggregateInputType
  }

  export type GetCondicaoClinicaAggregateType<T extends CondicaoClinicaAggregateArgs> = {
        [P in keyof T & keyof AggregateCondicaoClinica]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCondicaoClinica[P]>
      : GetScalarType<T[P], AggregateCondicaoClinica[P]>
  }




  export type CondicaoClinicaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CondicaoClinicaWhereInput
    orderBy?: CondicaoClinicaOrderByWithAggregationInput | CondicaoClinicaOrderByWithAggregationInput[]
    by: CondicaoClinicaScalarFieldEnum[] | CondicaoClinicaScalarFieldEnum
    having?: CondicaoClinicaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CondicaoClinicaCountAggregateInputType | true
    _min?: CondicaoClinicaMinAggregateInputType
    _max?: CondicaoClinicaMaxAggregateInputType
  }

  export type CondicaoClinicaGroupByOutputType = {
    id: string
    codigoCid: string
    descricao: string
    dataInicio: Date
    dataFim: Date | null
    status: string
    gravidade: string | null
    gestanteId: string
    criadoEm: Date
    _count: CondicaoClinicaCountAggregateOutputType | null
    _min: CondicaoClinicaMinAggregateOutputType | null
    _max: CondicaoClinicaMaxAggregateOutputType | null
  }

  type GetCondicaoClinicaGroupByPayload<T extends CondicaoClinicaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CondicaoClinicaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CondicaoClinicaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CondicaoClinicaGroupByOutputType[P]>
            : GetScalarType<T[P], CondicaoClinicaGroupByOutputType[P]>
        }
      >
    >


  export type CondicaoClinicaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoCid?: boolean
    descricao?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    status?: boolean
    gravidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condicaoClinica"]>

  export type CondicaoClinicaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoCid?: boolean
    descricao?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    status?: boolean
    gravidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condicaoClinica"]>

  export type CondicaoClinicaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoCid?: boolean
    descricao?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    status?: boolean
    gravidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condicaoClinica"]>

  export type CondicaoClinicaSelectScalar = {
    id?: boolean
    codigoCid?: boolean
    descricao?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    status?: boolean
    gravidade?: boolean
    gestanteId?: boolean
    criadoEm?: boolean
  }

  export type CondicaoClinicaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigoCid" | "descricao" | "dataInicio" | "dataFim" | "status" | "gravidade" | "gestanteId" | "criadoEm", ExtArgs["result"]["condicaoClinica"]>
  export type CondicaoClinicaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type CondicaoClinicaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }
  export type CondicaoClinicaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gestante?: boolean | GestanteDefaultArgs<ExtArgs>
  }

  export type $CondicaoClinicaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CondicaoClinica"
    objects: {
      gestante: Prisma.$GestantePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigoCid: string
      descricao: string
      dataInicio: Date
      dataFim: Date | null
      status: string
      gravidade: string | null
      gestanteId: string
      criadoEm: Date
    }, ExtArgs["result"]["condicaoClinica"]>
    composites: {}
  }

  type CondicaoClinicaGetPayload<S extends boolean | null | undefined | CondicaoClinicaDefaultArgs> = $Result.GetResult<Prisma.$CondicaoClinicaPayload, S>

  type CondicaoClinicaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CondicaoClinicaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CondicaoClinicaCountAggregateInputType | true
    }

  export interface CondicaoClinicaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CondicaoClinica'], meta: { name: 'CondicaoClinica' } }
    /**
     * Find zero or one CondicaoClinica that matches the filter.
     * @param {CondicaoClinicaFindUniqueArgs} args - Arguments to find a CondicaoClinica
     * @example
     * // Get one CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CondicaoClinicaFindUniqueArgs>(args: SelectSubset<T, CondicaoClinicaFindUniqueArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CondicaoClinica that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CondicaoClinicaFindUniqueOrThrowArgs} args - Arguments to find a CondicaoClinica
     * @example
     * // Get one CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CondicaoClinicaFindUniqueOrThrowArgs>(args: SelectSubset<T, CondicaoClinicaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CondicaoClinica that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaFindFirstArgs} args - Arguments to find a CondicaoClinica
     * @example
     * // Get one CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CondicaoClinicaFindFirstArgs>(args?: SelectSubset<T, CondicaoClinicaFindFirstArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CondicaoClinica that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaFindFirstOrThrowArgs} args - Arguments to find a CondicaoClinica
     * @example
     * // Get one CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CondicaoClinicaFindFirstOrThrowArgs>(args?: SelectSubset<T, CondicaoClinicaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CondicaoClinicas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CondicaoClinicas
     * const condicaoClinicas = await prisma.condicaoClinica.findMany()
     * 
     * // Get first 10 CondicaoClinicas
     * const condicaoClinicas = await prisma.condicaoClinica.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const condicaoClinicaWithIdOnly = await prisma.condicaoClinica.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CondicaoClinicaFindManyArgs>(args?: SelectSubset<T, CondicaoClinicaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CondicaoClinica.
     * @param {CondicaoClinicaCreateArgs} args - Arguments to create a CondicaoClinica.
     * @example
     * // Create one CondicaoClinica
     * const CondicaoClinica = await prisma.condicaoClinica.create({
     *   data: {
     *     // ... data to create a CondicaoClinica
     *   }
     * })
     * 
     */
    create<T extends CondicaoClinicaCreateArgs>(args: SelectSubset<T, CondicaoClinicaCreateArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CondicaoClinicas.
     * @param {CondicaoClinicaCreateManyArgs} args - Arguments to create many CondicaoClinicas.
     * @example
     * // Create many CondicaoClinicas
     * const condicaoClinica = await prisma.condicaoClinica.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CondicaoClinicaCreateManyArgs>(args?: SelectSubset<T, CondicaoClinicaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CondicaoClinicas and returns the data saved in the database.
     * @param {CondicaoClinicaCreateManyAndReturnArgs} args - Arguments to create many CondicaoClinicas.
     * @example
     * // Create many CondicaoClinicas
     * const condicaoClinica = await prisma.condicaoClinica.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CondicaoClinicas and only return the `id`
     * const condicaoClinicaWithIdOnly = await prisma.condicaoClinica.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CondicaoClinicaCreateManyAndReturnArgs>(args?: SelectSubset<T, CondicaoClinicaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CondicaoClinica.
     * @param {CondicaoClinicaDeleteArgs} args - Arguments to delete one CondicaoClinica.
     * @example
     * // Delete one CondicaoClinica
     * const CondicaoClinica = await prisma.condicaoClinica.delete({
     *   where: {
     *     // ... filter to delete one CondicaoClinica
     *   }
     * })
     * 
     */
    delete<T extends CondicaoClinicaDeleteArgs>(args: SelectSubset<T, CondicaoClinicaDeleteArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CondicaoClinica.
     * @param {CondicaoClinicaUpdateArgs} args - Arguments to update one CondicaoClinica.
     * @example
     * // Update one CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CondicaoClinicaUpdateArgs>(args: SelectSubset<T, CondicaoClinicaUpdateArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CondicaoClinicas.
     * @param {CondicaoClinicaDeleteManyArgs} args - Arguments to filter CondicaoClinicas to delete.
     * @example
     * // Delete a few CondicaoClinicas
     * const { count } = await prisma.condicaoClinica.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CondicaoClinicaDeleteManyArgs>(args?: SelectSubset<T, CondicaoClinicaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CondicaoClinicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CondicaoClinicas
     * const condicaoClinica = await prisma.condicaoClinica.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CondicaoClinicaUpdateManyArgs>(args: SelectSubset<T, CondicaoClinicaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CondicaoClinicas and returns the data updated in the database.
     * @param {CondicaoClinicaUpdateManyAndReturnArgs} args - Arguments to update many CondicaoClinicas.
     * @example
     * // Update many CondicaoClinicas
     * const condicaoClinica = await prisma.condicaoClinica.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CondicaoClinicas and only return the `id`
     * const condicaoClinicaWithIdOnly = await prisma.condicaoClinica.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CondicaoClinicaUpdateManyAndReturnArgs>(args: SelectSubset<T, CondicaoClinicaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CondicaoClinica.
     * @param {CondicaoClinicaUpsertArgs} args - Arguments to update or create a CondicaoClinica.
     * @example
     * // Update or create a CondicaoClinica
     * const condicaoClinica = await prisma.condicaoClinica.upsert({
     *   create: {
     *     // ... data to create a CondicaoClinica
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CondicaoClinica we want to update
     *   }
     * })
     */
    upsert<T extends CondicaoClinicaUpsertArgs>(args: SelectSubset<T, CondicaoClinicaUpsertArgs<ExtArgs>>): Prisma__CondicaoClinicaClient<$Result.GetResult<Prisma.$CondicaoClinicaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CondicaoClinicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaCountArgs} args - Arguments to filter CondicaoClinicas to count.
     * @example
     * // Count the number of CondicaoClinicas
     * const count = await prisma.condicaoClinica.count({
     *   where: {
     *     // ... the filter for the CondicaoClinicas we want to count
     *   }
     * })
    **/
    count<T extends CondicaoClinicaCountArgs>(
      args?: Subset<T, CondicaoClinicaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CondicaoClinicaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CondicaoClinica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CondicaoClinicaAggregateArgs>(args: Subset<T, CondicaoClinicaAggregateArgs>): Prisma.PrismaPromise<GetCondicaoClinicaAggregateType<T>>

    /**
     * Group by CondicaoClinica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CondicaoClinicaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CondicaoClinicaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CondicaoClinicaGroupByArgs['orderBy'] }
        : { orderBy?: CondicaoClinicaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CondicaoClinicaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCondicaoClinicaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CondicaoClinica model
   */
  readonly fields: CondicaoClinicaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CondicaoClinica.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CondicaoClinicaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gestante<T extends GestanteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GestanteDefaultArgs<ExtArgs>>): Prisma__GestanteClient<$Result.GetResult<Prisma.$GestantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CondicaoClinica model
   */
  interface CondicaoClinicaFieldRefs {
    readonly id: FieldRef<"CondicaoClinica", 'String'>
    readonly codigoCid: FieldRef<"CondicaoClinica", 'String'>
    readonly descricao: FieldRef<"CondicaoClinica", 'String'>
    readonly dataInicio: FieldRef<"CondicaoClinica", 'DateTime'>
    readonly dataFim: FieldRef<"CondicaoClinica", 'DateTime'>
    readonly status: FieldRef<"CondicaoClinica", 'String'>
    readonly gravidade: FieldRef<"CondicaoClinica", 'String'>
    readonly gestanteId: FieldRef<"CondicaoClinica", 'String'>
    readonly criadoEm: FieldRef<"CondicaoClinica", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CondicaoClinica findUnique
   */
  export type CondicaoClinicaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter, which CondicaoClinica to fetch.
     */
    where: CondicaoClinicaWhereUniqueInput
  }

  /**
   * CondicaoClinica findUniqueOrThrow
   */
  export type CondicaoClinicaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter, which CondicaoClinica to fetch.
     */
    where: CondicaoClinicaWhereUniqueInput
  }

  /**
   * CondicaoClinica findFirst
   */
  export type CondicaoClinicaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter, which CondicaoClinica to fetch.
     */
    where?: CondicaoClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CondicaoClinicas to fetch.
     */
    orderBy?: CondicaoClinicaOrderByWithRelationInput | CondicaoClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CondicaoClinicas.
     */
    cursor?: CondicaoClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CondicaoClinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CondicaoClinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CondicaoClinicas.
     */
    distinct?: CondicaoClinicaScalarFieldEnum | CondicaoClinicaScalarFieldEnum[]
  }

  /**
   * CondicaoClinica findFirstOrThrow
   */
  export type CondicaoClinicaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter, which CondicaoClinica to fetch.
     */
    where?: CondicaoClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CondicaoClinicas to fetch.
     */
    orderBy?: CondicaoClinicaOrderByWithRelationInput | CondicaoClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CondicaoClinicas.
     */
    cursor?: CondicaoClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CondicaoClinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CondicaoClinicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CondicaoClinicas.
     */
    distinct?: CondicaoClinicaScalarFieldEnum | CondicaoClinicaScalarFieldEnum[]
  }

  /**
   * CondicaoClinica findMany
   */
  export type CondicaoClinicaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter, which CondicaoClinicas to fetch.
     */
    where?: CondicaoClinicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CondicaoClinicas to fetch.
     */
    orderBy?: CondicaoClinicaOrderByWithRelationInput | CondicaoClinicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CondicaoClinicas.
     */
    cursor?: CondicaoClinicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CondicaoClinicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CondicaoClinicas.
     */
    skip?: number
    distinct?: CondicaoClinicaScalarFieldEnum | CondicaoClinicaScalarFieldEnum[]
  }

  /**
   * CondicaoClinica create
   */
  export type CondicaoClinicaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * The data needed to create a CondicaoClinica.
     */
    data: XOR<CondicaoClinicaCreateInput, CondicaoClinicaUncheckedCreateInput>
  }

  /**
   * CondicaoClinica createMany
   */
  export type CondicaoClinicaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CondicaoClinicas.
     */
    data: CondicaoClinicaCreateManyInput | CondicaoClinicaCreateManyInput[]
  }

  /**
   * CondicaoClinica createManyAndReturn
   */
  export type CondicaoClinicaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * The data used to create many CondicaoClinicas.
     */
    data: CondicaoClinicaCreateManyInput | CondicaoClinicaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CondicaoClinica update
   */
  export type CondicaoClinicaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * The data needed to update a CondicaoClinica.
     */
    data: XOR<CondicaoClinicaUpdateInput, CondicaoClinicaUncheckedUpdateInput>
    /**
     * Choose, which CondicaoClinica to update.
     */
    where: CondicaoClinicaWhereUniqueInput
  }

  /**
   * CondicaoClinica updateMany
   */
  export type CondicaoClinicaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CondicaoClinicas.
     */
    data: XOR<CondicaoClinicaUpdateManyMutationInput, CondicaoClinicaUncheckedUpdateManyInput>
    /**
     * Filter which CondicaoClinicas to update
     */
    where?: CondicaoClinicaWhereInput
    /**
     * Limit how many CondicaoClinicas to update.
     */
    limit?: number
  }

  /**
   * CondicaoClinica updateManyAndReturn
   */
  export type CondicaoClinicaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * The data used to update CondicaoClinicas.
     */
    data: XOR<CondicaoClinicaUpdateManyMutationInput, CondicaoClinicaUncheckedUpdateManyInput>
    /**
     * Filter which CondicaoClinicas to update
     */
    where?: CondicaoClinicaWhereInput
    /**
     * Limit how many CondicaoClinicas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CondicaoClinica upsert
   */
  export type CondicaoClinicaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * The filter to search for the CondicaoClinica to update in case it exists.
     */
    where: CondicaoClinicaWhereUniqueInput
    /**
     * In case the CondicaoClinica found by the `where` argument doesn't exist, create a new CondicaoClinica with this data.
     */
    create: XOR<CondicaoClinicaCreateInput, CondicaoClinicaUncheckedCreateInput>
    /**
     * In case the CondicaoClinica was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CondicaoClinicaUpdateInput, CondicaoClinicaUncheckedUpdateInput>
  }

  /**
   * CondicaoClinica delete
   */
  export type CondicaoClinicaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
    /**
     * Filter which CondicaoClinica to delete.
     */
    where: CondicaoClinicaWhereUniqueInput
  }

  /**
   * CondicaoClinica deleteMany
   */
  export type CondicaoClinicaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CondicaoClinicas to delete
     */
    where?: CondicaoClinicaWhereInput
    /**
     * Limit how many CondicaoClinicas to delete.
     */
    limit?: number
  }

  /**
   * CondicaoClinica without action
   */
  export type CondicaoClinicaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CondicaoClinica
     */
    select?: CondicaoClinicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CondicaoClinica
     */
    omit?: CondicaoClinicaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CondicaoClinicaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GestanteScalarFieldEnum: {
    id: 'id',
    cpf: 'cpf',
    cns: 'cns',
    nome: 'nome',
    nomeSocial: 'nomeSocial',
    dataNascimento: 'dataNascimento',
    telefone: 'telefone',
    email: 'email',
    endereco: 'endereco',
    bairro: 'bairro',
    cep: 'cep',
    ubsVinculada: 'ubsVinculada',
    dataUltimaMenstruacao: 'dataUltimaMenstruacao',
    dataProvavelParto: 'dataProvavelParto',
    tipoGravidez: 'tipoGravidez',
    riscoGestacional: 'riscoGestacional',
    senha: 'senha',
    ativo: 'ativo',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type GestanteScalarFieldEnum = (typeof GestanteScalarFieldEnum)[keyof typeof GestanteScalarFieldEnum]


  export const ProfissionalScalarFieldEnum: {
    id: 'id',
    cpf: 'cpf',
    nome: 'nome',
    cargo: 'cargo',
    registroConselho: 'registroConselho',
    ubs: 'ubs',
    senha: 'senha',
    ativo: 'ativo',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type ProfissionalScalarFieldEnum = (typeof ProfissionalScalarFieldEnum)[keyof typeof ProfissionalScalarFieldEnum]


  export const ConsultaScalarFieldEnum: {
    id: 'id',
    data: 'data',
    tipo: 'tipo',
    semanaGestacional: 'semanaGestacional',
    pesoKg: 'pesoKg',
    pressaoArterial: 'pressaoArterial',
    alturaUterina: 'alturaUterina',
    batimentoCardiacoFetal: 'batimentoCardiacoFetal',
    notas: 'notas',
    ubs: 'ubs',
    gestanteId: 'gestanteId',
    profissionalId: 'profissionalId',
    criadoEm: 'criadoEm'
  };

  export type ConsultaScalarFieldEnum = (typeof ConsultaScalarFieldEnum)[keyof typeof ConsultaScalarFieldEnum]


  export const ExameScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    data: 'data',
    resultado: 'resultado',
    status: 'status',
    observacao: 'observacao',
    unidade: 'unidade',
    gestanteId: 'gestanteId',
    criadoEm: 'criadoEm'
  };

  export type ExameScalarFieldEnum = (typeof ExameScalarFieldEnum)[keyof typeof ExameScalarFieldEnum]


  export const VacinaScalarFieldEnum: {
    id: 'id',
    codigoVacina: 'codigoVacina',
    nome: 'nome',
    data: 'data',
    dose: 'dose',
    lote: 'lote',
    fabricante: 'fabricante',
    localAplicacao: 'localAplicacao',
    gestanteId: 'gestanteId',
    criadoEm: 'criadoEm'
  };

  export type VacinaScalarFieldEnum = (typeof VacinaScalarFieldEnum)[keyof typeof VacinaScalarFieldEnum]


  export const MedicacaoScalarFieldEnum: {
    id: 'id',
    medicamento: 'medicamento',
    dosagem: 'dosagem',
    via: 'via',
    dataInicio: 'dataInicio',
    dataFim: 'dataFim',
    ativo: 'ativo',
    observacao: 'observacao',
    gestanteId: 'gestanteId',
    criadoEm: 'criadoEm'
  };

  export type MedicacaoScalarFieldEnum = (typeof MedicacaoScalarFieldEnum)[keyof typeof MedicacaoScalarFieldEnum]


  export const CondicaoClinicaScalarFieldEnum: {
    id: 'id',
    codigoCid: 'codigoCid',
    descricao: 'descricao',
    dataInicio: 'dataInicio',
    dataFim: 'dataFim',
    status: 'status',
    gravidade: 'gravidade',
    gestanteId: 'gestanteId',
    criadoEm: 'criadoEm'
  };

  export type CondicaoClinicaScalarFieldEnum = (typeof CondicaoClinicaScalarFieldEnum)[keyof typeof CondicaoClinicaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type GestanteWhereInput = {
    AND?: GestanteWhereInput | GestanteWhereInput[]
    OR?: GestanteWhereInput[]
    NOT?: GestanteWhereInput | GestanteWhereInput[]
    id?: StringFilter<"Gestante"> | string
    cpf?: StringFilter<"Gestante"> | string
    cns?: StringNullableFilter<"Gestante"> | string | null
    nome?: StringFilter<"Gestante"> | string
    nomeSocial?: StringNullableFilter<"Gestante"> | string | null
    dataNascimento?: DateTimeFilter<"Gestante"> | Date | string
    telefone?: StringFilter<"Gestante"> | string
    email?: StringNullableFilter<"Gestante"> | string | null
    endereco?: StringFilter<"Gestante"> | string
    bairro?: StringNullableFilter<"Gestante"> | string | null
    cep?: StringNullableFilter<"Gestante"> | string | null
    ubsVinculada?: StringNullableFilter<"Gestante"> | string | null
    dataUltimaMenstruacao?: DateTimeNullableFilter<"Gestante"> | Date | string | null
    dataProvavelParto?: DateTimeNullableFilter<"Gestante"> | Date | string | null
    tipoGravidez?: StringFilter<"Gestante"> | string
    riscoGestacional?: StringFilter<"Gestante"> | string
    senha?: StringFilter<"Gestante"> | string
    ativo?: BoolFilter<"Gestante"> | boolean
    criadoEm?: DateTimeFilter<"Gestante"> | Date | string
    atualizadoEm?: DateTimeFilter<"Gestante"> | Date | string
    consultas?: ConsultaListRelationFilter
    exames?: ExameListRelationFilter
    vacinas?: VacinaListRelationFilter
    medicacoes?: MedicacaoListRelationFilter
    condicoes?: CondicaoClinicaListRelationFilter
  }

  export type GestanteOrderByWithRelationInput = {
    id?: SortOrder
    cpf?: SortOrder
    cns?: SortOrderInput | SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrderInput | SortOrder
    dataNascimento?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    endereco?: SortOrder
    bairro?: SortOrderInput | SortOrder
    cep?: SortOrderInput | SortOrder
    ubsVinculada?: SortOrderInput | SortOrder
    dataUltimaMenstruacao?: SortOrderInput | SortOrder
    dataProvavelParto?: SortOrderInput | SortOrder
    tipoGravidez?: SortOrder
    riscoGestacional?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    consultas?: ConsultaOrderByRelationAggregateInput
    exames?: ExameOrderByRelationAggregateInput
    vacinas?: VacinaOrderByRelationAggregateInput
    medicacoes?: MedicacaoOrderByRelationAggregateInput
    condicoes?: CondicaoClinicaOrderByRelationAggregateInput
  }

  export type GestanteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    AND?: GestanteWhereInput | GestanteWhereInput[]
    OR?: GestanteWhereInput[]
    NOT?: GestanteWhereInput | GestanteWhereInput[]
    cns?: StringNullableFilter<"Gestante"> | string | null
    nome?: StringFilter<"Gestante"> | string
    nomeSocial?: StringNullableFilter<"Gestante"> | string | null
    dataNascimento?: DateTimeFilter<"Gestante"> | Date | string
    telefone?: StringFilter<"Gestante"> | string
    email?: StringNullableFilter<"Gestante"> | string | null
    endereco?: StringFilter<"Gestante"> | string
    bairro?: StringNullableFilter<"Gestante"> | string | null
    cep?: StringNullableFilter<"Gestante"> | string | null
    ubsVinculada?: StringNullableFilter<"Gestante"> | string | null
    dataUltimaMenstruacao?: DateTimeNullableFilter<"Gestante"> | Date | string | null
    dataProvavelParto?: DateTimeNullableFilter<"Gestante"> | Date | string | null
    tipoGravidez?: StringFilter<"Gestante"> | string
    riscoGestacional?: StringFilter<"Gestante"> | string
    senha?: StringFilter<"Gestante"> | string
    ativo?: BoolFilter<"Gestante"> | boolean
    criadoEm?: DateTimeFilter<"Gestante"> | Date | string
    atualizadoEm?: DateTimeFilter<"Gestante"> | Date | string
    consultas?: ConsultaListRelationFilter
    exames?: ExameListRelationFilter
    vacinas?: VacinaListRelationFilter
    medicacoes?: MedicacaoListRelationFilter
    condicoes?: CondicaoClinicaListRelationFilter
  }, "id" | "cpf">

  export type GestanteOrderByWithAggregationInput = {
    id?: SortOrder
    cpf?: SortOrder
    cns?: SortOrderInput | SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrderInput | SortOrder
    dataNascimento?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    endereco?: SortOrder
    bairro?: SortOrderInput | SortOrder
    cep?: SortOrderInput | SortOrder
    ubsVinculada?: SortOrderInput | SortOrder
    dataUltimaMenstruacao?: SortOrderInput | SortOrder
    dataProvavelParto?: SortOrderInput | SortOrder
    tipoGravidez?: SortOrder
    riscoGestacional?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: GestanteCountOrderByAggregateInput
    _max?: GestanteMaxOrderByAggregateInput
    _min?: GestanteMinOrderByAggregateInput
  }

  export type GestanteScalarWhereWithAggregatesInput = {
    AND?: GestanteScalarWhereWithAggregatesInput | GestanteScalarWhereWithAggregatesInput[]
    OR?: GestanteScalarWhereWithAggregatesInput[]
    NOT?: GestanteScalarWhereWithAggregatesInput | GestanteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Gestante"> | string
    cpf?: StringWithAggregatesFilter<"Gestante"> | string
    cns?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    nome?: StringWithAggregatesFilter<"Gestante"> | string
    nomeSocial?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    dataNascimento?: DateTimeWithAggregatesFilter<"Gestante"> | Date | string
    telefone?: StringWithAggregatesFilter<"Gestante"> | string
    email?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    endereco?: StringWithAggregatesFilter<"Gestante"> | string
    bairro?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    cep?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    ubsVinculada?: StringNullableWithAggregatesFilter<"Gestante"> | string | null
    dataUltimaMenstruacao?: DateTimeNullableWithAggregatesFilter<"Gestante"> | Date | string | null
    dataProvavelParto?: DateTimeNullableWithAggregatesFilter<"Gestante"> | Date | string | null
    tipoGravidez?: StringWithAggregatesFilter<"Gestante"> | string
    riscoGestacional?: StringWithAggregatesFilter<"Gestante"> | string
    senha?: StringWithAggregatesFilter<"Gestante"> | string
    ativo?: BoolWithAggregatesFilter<"Gestante"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Gestante"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Gestante"> | Date | string
  }

  export type ProfissionalWhereInput = {
    AND?: ProfissionalWhereInput | ProfissionalWhereInput[]
    OR?: ProfissionalWhereInput[]
    NOT?: ProfissionalWhereInput | ProfissionalWhereInput[]
    id?: StringFilter<"Profissional"> | string
    cpf?: StringFilter<"Profissional"> | string
    nome?: StringFilter<"Profissional"> | string
    cargo?: StringFilter<"Profissional"> | string
    registroConselho?: StringNullableFilter<"Profissional"> | string | null
    ubs?: StringFilter<"Profissional"> | string
    senha?: StringFilter<"Profissional"> | string
    ativo?: BoolFilter<"Profissional"> | boolean
    criadoEm?: DateTimeFilter<"Profissional"> | Date | string
    atualizadoEm?: DateTimeFilter<"Profissional"> | Date | string
    consultas?: ConsultaListRelationFilter
  }

  export type ProfissionalOrderByWithRelationInput = {
    id?: SortOrder
    cpf?: SortOrder
    nome?: SortOrder
    cargo?: SortOrder
    registroConselho?: SortOrderInput | SortOrder
    ubs?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    consultas?: ConsultaOrderByRelationAggregateInput
  }

  export type ProfissionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    AND?: ProfissionalWhereInput | ProfissionalWhereInput[]
    OR?: ProfissionalWhereInput[]
    NOT?: ProfissionalWhereInput | ProfissionalWhereInput[]
    nome?: StringFilter<"Profissional"> | string
    cargo?: StringFilter<"Profissional"> | string
    registroConselho?: StringNullableFilter<"Profissional"> | string | null
    ubs?: StringFilter<"Profissional"> | string
    senha?: StringFilter<"Profissional"> | string
    ativo?: BoolFilter<"Profissional"> | boolean
    criadoEm?: DateTimeFilter<"Profissional"> | Date | string
    atualizadoEm?: DateTimeFilter<"Profissional"> | Date | string
    consultas?: ConsultaListRelationFilter
  }, "id" | "cpf">

  export type ProfissionalOrderByWithAggregationInput = {
    id?: SortOrder
    cpf?: SortOrder
    nome?: SortOrder
    cargo?: SortOrder
    registroConselho?: SortOrderInput | SortOrder
    ubs?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: ProfissionalCountOrderByAggregateInput
    _max?: ProfissionalMaxOrderByAggregateInput
    _min?: ProfissionalMinOrderByAggregateInput
  }

  export type ProfissionalScalarWhereWithAggregatesInput = {
    AND?: ProfissionalScalarWhereWithAggregatesInput | ProfissionalScalarWhereWithAggregatesInput[]
    OR?: ProfissionalScalarWhereWithAggregatesInput[]
    NOT?: ProfissionalScalarWhereWithAggregatesInput | ProfissionalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profissional"> | string
    cpf?: StringWithAggregatesFilter<"Profissional"> | string
    nome?: StringWithAggregatesFilter<"Profissional"> | string
    cargo?: StringWithAggregatesFilter<"Profissional"> | string
    registroConselho?: StringNullableWithAggregatesFilter<"Profissional"> | string | null
    ubs?: StringWithAggregatesFilter<"Profissional"> | string
    senha?: StringWithAggregatesFilter<"Profissional"> | string
    ativo?: BoolWithAggregatesFilter<"Profissional"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Profissional"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Profissional"> | Date | string
  }

  export type ConsultaWhereInput = {
    AND?: ConsultaWhereInput | ConsultaWhereInput[]
    OR?: ConsultaWhereInput[]
    NOT?: ConsultaWhereInput | ConsultaWhereInput[]
    id?: StringFilter<"Consulta"> | string
    data?: DateTimeFilter<"Consulta"> | Date | string
    tipo?: StringFilter<"Consulta"> | string
    semanaGestacional?: IntNullableFilter<"Consulta"> | number | null
    pesoKg?: FloatNullableFilter<"Consulta"> | number | null
    pressaoArterial?: StringNullableFilter<"Consulta"> | string | null
    alturaUterina?: FloatNullableFilter<"Consulta"> | number | null
    batimentoCardiacoFetal?: IntNullableFilter<"Consulta"> | number | null
    notas?: StringNullableFilter<"Consulta"> | string | null
    ubs?: StringNullableFilter<"Consulta"> | string | null
    gestanteId?: StringFilter<"Consulta"> | string
    profissionalId?: StringFilter<"Consulta"> | string
    criadoEm?: DateTimeFilter<"Consulta"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
  }

  export type ConsultaOrderByWithRelationInput = {
    id?: SortOrder
    data?: SortOrder
    tipo?: SortOrder
    semanaGestacional?: SortOrderInput | SortOrder
    pesoKg?: SortOrderInput | SortOrder
    pressaoArterial?: SortOrderInput | SortOrder
    alturaUterina?: SortOrderInput | SortOrder
    batimentoCardiacoFetal?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    ubs?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    profissionalId?: SortOrder
    criadoEm?: SortOrder
    gestante?: GestanteOrderByWithRelationInput
    profissional?: ProfissionalOrderByWithRelationInput
  }

  export type ConsultaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsultaWhereInput | ConsultaWhereInput[]
    OR?: ConsultaWhereInput[]
    NOT?: ConsultaWhereInput | ConsultaWhereInput[]
    data?: DateTimeFilter<"Consulta"> | Date | string
    tipo?: StringFilter<"Consulta"> | string
    semanaGestacional?: IntNullableFilter<"Consulta"> | number | null
    pesoKg?: FloatNullableFilter<"Consulta"> | number | null
    pressaoArterial?: StringNullableFilter<"Consulta"> | string | null
    alturaUterina?: FloatNullableFilter<"Consulta"> | number | null
    batimentoCardiacoFetal?: IntNullableFilter<"Consulta"> | number | null
    notas?: StringNullableFilter<"Consulta"> | string | null
    ubs?: StringNullableFilter<"Consulta"> | string | null
    gestanteId?: StringFilter<"Consulta"> | string
    profissionalId?: StringFilter<"Consulta"> | string
    criadoEm?: DateTimeFilter<"Consulta"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
    profissional?: XOR<ProfissionalScalarRelationFilter, ProfissionalWhereInput>
  }, "id">

  export type ConsultaOrderByWithAggregationInput = {
    id?: SortOrder
    data?: SortOrder
    tipo?: SortOrder
    semanaGestacional?: SortOrderInput | SortOrder
    pesoKg?: SortOrderInput | SortOrder
    pressaoArterial?: SortOrderInput | SortOrder
    alturaUterina?: SortOrderInput | SortOrder
    batimentoCardiacoFetal?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    ubs?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    profissionalId?: SortOrder
    criadoEm?: SortOrder
    _count?: ConsultaCountOrderByAggregateInput
    _avg?: ConsultaAvgOrderByAggregateInput
    _max?: ConsultaMaxOrderByAggregateInput
    _min?: ConsultaMinOrderByAggregateInput
    _sum?: ConsultaSumOrderByAggregateInput
  }

  export type ConsultaScalarWhereWithAggregatesInput = {
    AND?: ConsultaScalarWhereWithAggregatesInput | ConsultaScalarWhereWithAggregatesInput[]
    OR?: ConsultaScalarWhereWithAggregatesInput[]
    NOT?: ConsultaScalarWhereWithAggregatesInput | ConsultaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consulta"> | string
    data?: DateTimeWithAggregatesFilter<"Consulta"> | Date | string
    tipo?: StringWithAggregatesFilter<"Consulta"> | string
    semanaGestacional?: IntNullableWithAggregatesFilter<"Consulta"> | number | null
    pesoKg?: FloatNullableWithAggregatesFilter<"Consulta"> | number | null
    pressaoArterial?: StringNullableWithAggregatesFilter<"Consulta"> | string | null
    alturaUterina?: FloatNullableWithAggregatesFilter<"Consulta"> | number | null
    batimentoCardiacoFetal?: IntNullableWithAggregatesFilter<"Consulta"> | number | null
    notas?: StringNullableWithAggregatesFilter<"Consulta"> | string | null
    ubs?: StringNullableWithAggregatesFilter<"Consulta"> | string | null
    gestanteId?: StringWithAggregatesFilter<"Consulta"> | string
    profissionalId?: StringWithAggregatesFilter<"Consulta"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Consulta"> | Date | string
  }

  export type ExameWhereInput = {
    AND?: ExameWhereInput | ExameWhereInput[]
    OR?: ExameWhereInput[]
    NOT?: ExameWhereInput | ExameWhereInput[]
    id?: StringFilter<"Exame"> | string
    tipo?: StringFilter<"Exame"> | string
    data?: DateTimeFilter<"Exame"> | Date | string
    resultado?: StringNullableFilter<"Exame"> | string | null
    status?: StringFilter<"Exame"> | string
    observacao?: StringNullableFilter<"Exame"> | string | null
    unidade?: StringNullableFilter<"Exame"> | string | null
    gestanteId?: StringFilter<"Exame"> | string
    criadoEm?: DateTimeFilter<"Exame"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }

  export type ExameOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    data?: SortOrder
    resultado?: SortOrderInput | SortOrder
    status?: SortOrder
    observacao?: SortOrderInput | SortOrder
    unidade?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    gestante?: GestanteOrderByWithRelationInput
  }

  export type ExameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExameWhereInput | ExameWhereInput[]
    OR?: ExameWhereInput[]
    NOT?: ExameWhereInput | ExameWhereInput[]
    tipo?: StringFilter<"Exame"> | string
    data?: DateTimeFilter<"Exame"> | Date | string
    resultado?: StringNullableFilter<"Exame"> | string | null
    status?: StringFilter<"Exame"> | string
    observacao?: StringNullableFilter<"Exame"> | string | null
    unidade?: StringNullableFilter<"Exame"> | string | null
    gestanteId?: StringFilter<"Exame"> | string
    criadoEm?: DateTimeFilter<"Exame"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }, "id">

  export type ExameOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    data?: SortOrder
    resultado?: SortOrderInput | SortOrder
    status?: SortOrder
    observacao?: SortOrderInput | SortOrder
    unidade?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    _count?: ExameCountOrderByAggregateInput
    _max?: ExameMaxOrderByAggregateInput
    _min?: ExameMinOrderByAggregateInput
  }

  export type ExameScalarWhereWithAggregatesInput = {
    AND?: ExameScalarWhereWithAggregatesInput | ExameScalarWhereWithAggregatesInput[]
    OR?: ExameScalarWhereWithAggregatesInput[]
    NOT?: ExameScalarWhereWithAggregatesInput | ExameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exame"> | string
    tipo?: StringWithAggregatesFilter<"Exame"> | string
    data?: DateTimeWithAggregatesFilter<"Exame"> | Date | string
    resultado?: StringNullableWithAggregatesFilter<"Exame"> | string | null
    status?: StringWithAggregatesFilter<"Exame"> | string
    observacao?: StringNullableWithAggregatesFilter<"Exame"> | string | null
    unidade?: StringNullableWithAggregatesFilter<"Exame"> | string | null
    gestanteId?: StringWithAggregatesFilter<"Exame"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Exame"> | Date | string
  }

  export type VacinaWhereInput = {
    AND?: VacinaWhereInput | VacinaWhereInput[]
    OR?: VacinaWhereInput[]
    NOT?: VacinaWhereInput | VacinaWhereInput[]
    id?: StringFilter<"Vacina"> | string
    codigoVacina?: StringFilter<"Vacina"> | string
    nome?: StringFilter<"Vacina"> | string
    data?: DateTimeFilter<"Vacina"> | Date | string
    dose?: StringFilter<"Vacina"> | string
    lote?: StringNullableFilter<"Vacina"> | string | null
    fabricante?: StringNullableFilter<"Vacina"> | string | null
    localAplicacao?: StringNullableFilter<"Vacina"> | string | null
    gestanteId?: StringFilter<"Vacina"> | string
    criadoEm?: DateTimeFilter<"Vacina"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }

  export type VacinaOrderByWithRelationInput = {
    id?: SortOrder
    codigoVacina?: SortOrder
    nome?: SortOrder
    data?: SortOrder
    dose?: SortOrder
    lote?: SortOrderInput | SortOrder
    fabricante?: SortOrderInput | SortOrder
    localAplicacao?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    gestante?: GestanteOrderByWithRelationInput
  }

  export type VacinaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VacinaWhereInput | VacinaWhereInput[]
    OR?: VacinaWhereInput[]
    NOT?: VacinaWhereInput | VacinaWhereInput[]
    codigoVacina?: StringFilter<"Vacina"> | string
    nome?: StringFilter<"Vacina"> | string
    data?: DateTimeFilter<"Vacina"> | Date | string
    dose?: StringFilter<"Vacina"> | string
    lote?: StringNullableFilter<"Vacina"> | string | null
    fabricante?: StringNullableFilter<"Vacina"> | string | null
    localAplicacao?: StringNullableFilter<"Vacina"> | string | null
    gestanteId?: StringFilter<"Vacina"> | string
    criadoEm?: DateTimeFilter<"Vacina"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }, "id">

  export type VacinaOrderByWithAggregationInput = {
    id?: SortOrder
    codigoVacina?: SortOrder
    nome?: SortOrder
    data?: SortOrder
    dose?: SortOrder
    lote?: SortOrderInput | SortOrder
    fabricante?: SortOrderInput | SortOrder
    localAplicacao?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    _count?: VacinaCountOrderByAggregateInput
    _max?: VacinaMaxOrderByAggregateInput
    _min?: VacinaMinOrderByAggregateInput
  }

  export type VacinaScalarWhereWithAggregatesInput = {
    AND?: VacinaScalarWhereWithAggregatesInput | VacinaScalarWhereWithAggregatesInput[]
    OR?: VacinaScalarWhereWithAggregatesInput[]
    NOT?: VacinaScalarWhereWithAggregatesInput | VacinaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vacina"> | string
    codigoVacina?: StringWithAggregatesFilter<"Vacina"> | string
    nome?: StringWithAggregatesFilter<"Vacina"> | string
    data?: DateTimeWithAggregatesFilter<"Vacina"> | Date | string
    dose?: StringWithAggregatesFilter<"Vacina"> | string
    lote?: StringNullableWithAggregatesFilter<"Vacina"> | string | null
    fabricante?: StringNullableWithAggregatesFilter<"Vacina"> | string | null
    localAplicacao?: StringNullableWithAggregatesFilter<"Vacina"> | string | null
    gestanteId?: StringWithAggregatesFilter<"Vacina"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Vacina"> | Date | string
  }

  export type MedicacaoWhereInput = {
    AND?: MedicacaoWhereInput | MedicacaoWhereInput[]
    OR?: MedicacaoWhereInput[]
    NOT?: MedicacaoWhereInput | MedicacaoWhereInput[]
    id?: StringFilter<"Medicacao"> | string
    medicamento?: StringFilter<"Medicacao"> | string
    dosagem?: StringFilter<"Medicacao"> | string
    via?: StringNullableFilter<"Medicacao"> | string | null
    dataInicio?: DateTimeFilter<"Medicacao"> | Date | string
    dataFim?: DateTimeNullableFilter<"Medicacao"> | Date | string | null
    ativo?: BoolFilter<"Medicacao"> | boolean
    observacao?: StringNullableFilter<"Medicacao"> | string | null
    gestanteId?: StringFilter<"Medicacao"> | string
    criadoEm?: DateTimeFilter<"Medicacao"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }

  export type MedicacaoOrderByWithRelationInput = {
    id?: SortOrder
    medicamento?: SortOrder
    dosagem?: SortOrder
    via?: SortOrderInput | SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrderInput | SortOrder
    ativo?: SortOrder
    observacao?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    gestante?: GestanteOrderByWithRelationInput
  }

  export type MedicacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicacaoWhereInput | MedicacaoWhereInput[]
    OR?: MedicacaoWhereInput[]
    NOT?: MedicacaoWhereInput | MedicacaoWhereInput[]
    medicamento?: StringFilter<"Medicacao"> | string
    dosagem?: StringFilter<"Medicacao"> | string
    via?: StringNullableFilter<"Medicacao"> | string | null
    dataInicio?: DateTimeFilter<"Medicacao"> | Date | string
    dataFim?: DateTimeNullableFilter<"Medicacao"> | Date | string | null
    ativo?: BoolFilter<"Medicacao"> | boolean
    observacao?: StringNullableFilter<"Medicacao"> | string | null
    gestanteId?: StringFilter<"Medicacao"> | string
    criadoEm?: DateTimeFilter<"Medicacao"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }, "id">

  export type MedicacaoOrderByWithAggregationInput = {
    id?: SortOrder
    medicamento?: SortOrder
    dosagem?: SortOrder
    via?: SortOrderInput | SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrderInput | SortOrder
    ativo?: SortOrder
    observacao?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    _count?: MedicacaoCountOrderByAggregateInput
    _max?: MedicacaoMaxOrderByAggregateInput
    _min?: MedicacaoMinOrderByAggregateInput
  }

  export type MedicacaoScalarWhereWithAggregatesInput = {
    AND?: MedicacaoScalarWhereWithAggregatesInput | MedicacaoScalarWhereWithAggregatesInput[]
    OR?: MedicacaoScalarWhereWithAggregatesInput[]
    NOT?: MedicacaoScalarWhereWithAggregatesInput | MedicacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Medicacao"> | string
    medicamento?: StringWithAggregatesFilter<"Medicacao"> | string
    dosagem?: StringWithAggregatesFilter<"Medicacao"> | string
    via?: StringNullableWithAggregatesFilter<"Medicacao"> | string | null
    dataInicio?: DateTimeWithAggregatesFilter<"Medicacao"> | Date | string
    dataFim?: DateTimeNullableWithAggregatesFilter<"Medicacao"> | Date | string | null
    ativo?: BoolWithAggregatesFilter<"Medicacao"> | boolean
    observacao?: StringNullableWithAggregatesFilter<"Medicacao"> | string | null
    gestanteId?: StringWithAggregatesFilter<"Medicacao"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Medicacao"> | Date | string
  }

  export type CondicaoClinicaWhereInput = {
    AND?: CondicaoClinicaWhereInput | CondicaoClinicaWhereInput[]
    OR?: CondicaoClinicaWhereInput[]
    NOT?: CondicaoClinicaWhereInput | CondicaoClinicaWhereInput[]
    id?: StringFilter<"CondicaoClinica"> | string
    codigoCid?: StringFilter<"CondicaoClinica"> | string
    descricao?: StringFilter<"CondicaoClinica"> | string
    dataInicio?: DateTimeFilter<"CondicaoClinica"> | Date | string
    dataFim?: DateTimeNullableFilter<"CondicaoClinica"> | Date | string | null
    status?: StringFilter<"CondicaoClinica"> | string
    gravidade?: StringNullableFilter<"CondicaoClinica"> | string | null
    gestanteId?: StringFilter<"CondicaoClinica"> | string
    criadoEm?: DateTimeFilter<"CondicaoClinica"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }

  export type CondicaoClinicaOrderByWithRelationInput = {
    id?: SortOrder
    codigoCid?: SortOrder
    descricao?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrderInput | SortOrder
    status?: SortOrder
    gravidade?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    gestante?: GestanteOrderByWithRelationInput
  }

  export type CondicaoClinicaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CondicaoClinicaWhereInput | CondicaoClinicaWhereInput[]
    OR?: CondicaoClinicaWhereInput[]
    NOT?: CondicaoClinicaWhereInput | CondicaoClinicaWhereInput[]
    codigoCid?: StringFilter<"CondicaoClinica"> | string
    descricao?: StringFilter<"CondicaoClinica"> | string
    dataInicio?: DateTimeFilter<"CondicaoClinica"> | Date | string
    dataFim?: DateTimeNullableFilter<"CondicaoClinica"> | Date | string | null
    status?: StringFilter<"CondicaoClinica"> | string
    gravidade?: StringNullableFilter<"CondicaoClinica"> | string | null
    gestanteId?: StringFilter<"CondicaoClinica"> | string
    criadoEm?: DateTimeFilter<"CondicaoClinica"> | Date | string
    gestante?: XOR<GestanteScalarRelationFilter, GestanteWhereInput>
  }, "id">

  export type CondicaoClinicaOrderByWithAggregationInput = {
    id?: SortOrder
    codigoCid?: SortOrder
    descricao?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrderInput | SortOrder
    status?: SortOrder
    gravidade?: SortOrderInput | SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
    _count?: CondicaoClinicaCountOrderByAggregateInput
    _max?: CondicaoClinicaMaxOrderByAggregateInput
    _min?: CondicaoClinicaMinOrderByAggregateInput
  }

  export type CondicaoClinicaScalarWhereWithAggregatesInput = {
    AND?: CondicaoClinicaScalarWhereWithAggregatesInput | CondicaoClinicaScalarWhereWithAggregatesInput[]
    OR?: CondicaoClinicaScalarWhereWithAggregatesInput[]
    NOT?: CondicaoClinicaScalarWhereWithAggregatesInput | CondicaoClinicaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CondicaoClinica"> | string
    codigoCid?: StringWithAggregatesFilter<"CondicaoClinica"> | string
    descricao?: StringWithAggregatesFilter<"CondicaoClinica"> | string
    dataInicio?: DateTimeWithAggregatesFilter<"CondicaoClinica"> | Date | string
    dataFim?: DateTimeNullableWithAggregatesFilter<"CondicaoClinica"> | Date | string | null
    status?: StringWithAggregatesFilter<"CondicaoClinica"> | string
    gravidade?: StringNullableWithAggregatesFilter<"CondicaoClinica"> | string | null
    gestanteId?: StringWithAggregatesFilter<"CondicaoClinica"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"CondicaoClinica"> | Date | string
  }

  export type GestanteCreateInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutGestanteInput
    exames?: ExameCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutGestanteInput
    exames?: ExameUncheckedCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaUncheckedCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoUncheckedCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutGestanteNestedInput
    exames?: ExameUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutGestanteNestedInput
    exames?: ExameUncheckedUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUncheckedUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteCreateManyInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type GestanteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GestanteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalCreateInput = {
    id?: string
    cpf: string
    nome: string
    cargo: string
    registroConselho?: string | null
    ubs: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalUncheckedCreateInput = {
    id?: string
    cpf: string
    nome: string
    cargo: string
    registroConselho?: string | null
    ubs: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutProfissionalInput
  }

  export type ProfissionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutProfissionalNestedInput
  }

  export type ProfissionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutProfissionalNestedInput
  }

  export type ProfissionalCreateManyInput = {
    id?: string
    cpf: string
    nome: string
    cargo: string
    registroConselho?: string | null
    ubs: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProfissionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaCreateInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutConsultasInput
    profissional: ProfissionalCreateNestedOneWithoutConsultasInput
  }

  export type ConsultaUncheckedCreateInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    gestanteId: string
    profissionalId: string
    criadoEm?: Date | string
  }

  export type ConsultaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutConsultasNestedInput
    profissional?: ProfissionalUpdateOneRequiredWithoutConsultasNestedInput
  }

  export type ConsultaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaCreateManyInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    gestanteId: string
    profissionalId: string
    criadoEm?: Date | string
  }

  export type ConsultaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    profissionalId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameCreateInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutExamesInput
  }

  export type ExameUncheckedCreateInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type ExameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutExamesNestedInput
  }

  export type ExameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameCreateManyInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type ExameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaCreateInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutVacinasInput
  }

  export type VacinaUncheckedCreateInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type VacinaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutVacinasNestedInput
  }

  export type VacinaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaCreateManyInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type VacinaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoCreateInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutMedicacoesInput
  }

  export type MedicacaoUncheckedCreateInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type MedicacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutMedicacoesNestedInput
  }

  export type MedicacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoCreateManyInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type MedicacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaCreateInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutCondicoesInput
  }

  export type CondicaoClinicaUncheckedCreateInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type CondicaoClinicaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutCondicoesNestedInput
  }

  export type CondicaoClinicaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaCreateManyInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type CondicaoClinicaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ConsultaListRelationFilter = {
    every?: ConsultaWhereInput
    some?: ConsultaWhereInput
    none?: ConsultaWhereInput
  }

  export type ExameListRelationFilter = {
    every?: ExameWhereInput
    some?: ExameWhereInput
    none?: ExameWhereInput
  }

  export type VacinaListRelationFilter = {
    every?: VacinaWhereInput
    some?: VacinaWhereInput
    none?: VacinaWhereInput
  }

  export type MedicacaoListRelationFilter = {
    every?: MedicacaoWhereInput
    some?: MedicacaoWhereInput
    none?: MedicacaoWhereInput
  }

  export type CondicaoClinicaListRelationFilter = {
    every?: CondicaoClinicaWhereInput
    some?: CondicaoClinicaWhereInput
    none?: CondicaoClinicaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConsultaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VacinaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CondicaoClinicaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GestanteCountOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    cns?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    dataNascimento?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    endereco?: SortOrder
    bairro?: SortOrder
    cep?: SortOrder
    ubsVinculada?: SortOrder
    dataUltimaMenstruacao?: SortOrder
    dataProvavelParto?: SortOrder
    tipoGravidez?: SortOrder
    riscoGestacional?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type GestanteMaxOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    cns?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    dataNascimento?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    endereco?: SortOrder
    bairro?: SortOrder
    cep?: SortOrder
    ubsVinculada?: SortOrder
    dataUltimaMenstruacao?: SortOrder
    dataProvavelParto?: SortOrder
    tipoGravidez?: SortOrder
    riscoGestacional?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type GestanteMinOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    cns?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    dataNascimento?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    endereco?: SortOrder
    bairro?: SortOrder
    cep?: SortOrder
    ubsVinculada?: SortOrder
    dataUltimaMenstruacao?: SortOrder
    dataProvavelParto?: SortOrder
    tipoGravidez?: SortOrder
    riscoGestacional?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProfissionalCountOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    nome?: SortOrder
    cargo?: SortOrder
    registroConselho?: SortOrder
    ubs?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ProfissionalMaxOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    nome?: SortOrder
    cargo?: SortOrder
    registroConselho?: SortOrder
    ubs?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ProfissionalMinOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    nome?: SortOrder
    cargo?: SortOrder
    registroConselho?: SortOrder
    ubs?: SortOrder
    senha?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type GestanteScalarRelationFilter = {
    is?: GestanteWhereInput
    isNot?: GestanteWhereInput
  }

  export type ProfissionalScalarRelationFilter = {
    is?: ProfissionalWhereInput
    isNot?: ProfissionalWhereInput
  }

  export type ConsultaCountOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    tipo?: SortOrder
    semanaGestacional?: SortOrder
    pesoKg?: SortOrder
    pressaoArterial?: SortOrder
    alturaUterina?: SortOrder
    batimentoCardiacoFetal?: SortOrder
    notas?: SortOrder
    ubs?: SortOrder
    gestanteId?: SortOrder
    profissionalId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ConsultaAvgOrderByAggregateInput = {
    semanaGestacional?: SortOrder
    pesoKg?: SortOrder
    alturaUterina?: SortOrder
    batimentoCardiacoFetal?: SortOrder
  }

  export type ConsultaMaxOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    tipo?: SortOrder
    semanaGestacional?: SortOrder
    pesoKg?: SortOrder
    pressaoArterial?: SortOrder
    alturaUterina?: SortOrder
    batimentoCardiacoFetal?: SortOrder
    notas?: SortOrder
    ubs?: SortOrder
    gestanteId?: SortOrder
    profissionalId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ConsultaMinOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    tipo?: SortOrder
    semanaGestacional?: SortOrder
    pesoKg?: SortOrder
    pressaoArterial?: SortOrder
    alturaUterina?: SortOrder
    batimentoCardiacoFetal?: SortOrder
    notas?: SortOrder
    ubs?: SortOrder
    gestanteId?: SortOrder
    profissionalId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ConsultaSumOrderByAggregateInput = {
    semanaGestacional?: SortOrder
    pesoKg?: SortOrder
    alturaUterina?: SortOrder
    batimentoCardiacoFetal?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ExameCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    data?: SortOrder
    resultado?: SortOrder
    status?: SortOrder
    observacao?: SortOrder
    unidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ExameMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    data?: SortOrder
    resultado?: SortOrder
    status?: SortOrder
    observacao?: SortOrder
    unidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ExameMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    data?: SortOrder
    resultado?: SortOrder
    status?: SortOrder
    observacao?: SortOrder
    unidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type VacinaCountOrderByAggregateInput = {
    id?: SortOrder
    codigoVacina?: SortOrder
    nome?: SortOrder
    data?: SortOrder
    dose?: SortOrder
    lote?: SortOrder
    fabricante?: SortOrder
    localAplicacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type VacinaMaxOrderByAggregateInput = {
    id?: SortOrder
    codigoVacina?: SortOrder
    nome?: SortOrder
    data?: SortOrder
    dose?: SortOrder
    lote?: SortOrder
    fabricante?: SortOrder
    localAplicacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type VacinaMinOrderByAggregateInput = {
    id?: SortOrder
    codigoVacina?: SortOrder
    nome?: SortOrder
    data?: SortOrder
    dose?: SortOrder
    lote?: SortOrder
    fabricante?: SortOrder
    localAplicacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type MedicacaoCountOrderByAggregateInput = {
    id?: SortOrder
    medicamento?: SortOrder
    dosagem?: SortOrder
    via?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    ativo?: SortOrder
    observacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type MedicacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    medicamento?: SortOrder
    dosagem?: SortOrder
    via?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    ativo?: SortOrder
    observacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type MedicacaoMinOrderByAggregateInput = {
    id?: SortOrder
    medicamento?: SortOrder
    dosagem?: SortOrder
    via?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    ativo?: SortOrder
    observacao?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type CondicaoClinicaCountOrderByAggregateInput = {
    id?: SortOrder
    codigoCid?: SortOrder
    descricao?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    status?: SortOrder
    gravidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type CondicaoClinicaMaxOrderByAggregateInput = {
    id?: SortOrder
    codigoCid?: SortOrder
    descricao?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    status?: SortOrder
    gravidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type CondicaoClinicaMinOrderByAggregateInput = {
    id?: SortOrder
    codigoCid?: SortOrder
    descricao?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    status?: SortOrder
    gravidade?: SortOrder
    gestanteId?: SortOrder
    criadoEm?: SortOrder
  }

  export type ConsultaCreateNestedManyWithoutGestanteInput = {
    create?: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput> | ConsultaCreateWithoutGestanteInput[] | ConsultaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutGestanteInput | ConsultaCreateOrConnectWithoutGestanteInput[]
    createMany?: ConsultaCreateManyGestanteInputEnvelope
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
  }

  export type ExameCreateNestedManyWithoutGestanteInput = {
    create?: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput> | ExameCreateWithoutGestanteInput[] | ExameUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutGestanteInput | ExameCreateOrConnectWithoutGestanteInput[]
    createMany?: ExameCreateManyGestanteInputEnvelope
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
  }

  export type VacinaCreateNestedManyWithoutGestanteInput = {
    create?: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput> | VacinaCreateWithoutGestanteInput[] | VacinaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: VacinaCreateOrConnectWithoutGestanteInput | VacinaCreateOrConnectWithoutGestanteInput[]
    createMany?: VacinaCreateManyGestanteInputEnvelope
    connect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
  }

  export type MedicacaoCreateNestedManyWithoutGestanteInput = {
    create?: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput> | MedicacaoCreateWithoutGestanteInput[] | MedicacaoUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: MedicacaoCreateOrConnectWithoutGestanteInput | MedicacaoCreateOrConnectWithoutGestanteInput[]
    createMany?: MedicacaoCreateManyGestanteInputEnvelope
    connect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
  }

  export type CondicaoClinicaCreateNestedManyWithoutGestanteInput = {
    create?: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput> | CondicaoClinicaCreateWithoutGestanteInput[] | CondicaoClinicaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: CondicaoClinicaCreateOrConnectWithoutGestanteInput | CondicaoClinicaCreateOrConnectWithoutGestanteInput[]
    createMany?: CondicaoClinicaCreateManyGestanteInputEnvelope
    connect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
  }

  export type ConsultaUncheckedCreateNestedManyWithoutGestanteInput = {
    create?: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput> | ConsultaCreateWithoutGestanteInput[] | ConsultaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutGestanteInput | ConsultaCreateOrConnectWithoutGestanteInput[]
    createMany?: ConsultaCreateManyGestanteInputEnvelope
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
  }

  export type ExameUncheckedCreateNestedManyWithoutGestanteInput = {
    create?: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput> | ExameCreateWithoutGestanteInput[] | ExameUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutGestanteInput | ExameCreateOrConnectWithoutGestanteInput[]
    createMany?: ExameCreateManyGestanteInputEnvelope
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
  }

  export type VacinaUncheckedCreateNestedManyWithoutGestanteInput = {
    create?: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput> | VacinaCreateWithoutGestanteInput[] | VacinaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: VacinaCreateOrConnectWithoutGestanteInput | VacinaCreateOrConnectWithoutGestanteInput[]
    createMany?: VacinaCreateManyGestanteInputEnvelope
    connect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
  }

  export type MedicacaoUncheckedCreateNestedManyWithoutGestanteInput = {
    create?: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput> | MedicacaoCreateWithoutGestanteInput[] | MedicacaoUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: MedicacaoCreateOrConnectWithoutGestanteInput | MedicacaoCreateOrConnectWithoutGestanteInput[]
    createMany?: MedicacaoCreateManyGestanteInputEnvelope
    connect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
  }

  export type CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput = {
    create?: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput> | CondicaoClinicaCreateWithoutGestanteInput[] | CondicaoClinicaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: CondicaoClinicaCreateOrConnectWithoutGestanteInput | CondicaoClinicaCreateOrConnectWithoutGestanteInput[]
    createMany?: CondicaoClinicaCreateManyGestanteInputEnvelope
    connect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConsultaUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput> | ConsultaCreateWithoutGestanteInput[] | ConsultaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutGestanteInput | ConsultaCreateOrConnectWithoutGestanteInput[]
    upsert?: ConsultaUpsertWithWhereUniqueWithoutGestanteInput | ConsultaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: ConsultaCreateManyGestanteInputEnvelope
    set?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    disconnect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    delete?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    update?: ConsultaUpdateWithWhereUniqueWithoutGestanteInput | ConsultaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: ConsultaUpdateManyWithWhereWithoutGestanteInput | ConsultaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
  }

  export type ExameUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput> | ExameCreateWithoutGestanteInput[] | ExameUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutGestanteInput | ExameCreateOrConnectWithoutGestanteInput[]
    upsert?: ExameUpsertWithWhereUniqueWithoutGestanteInput | ExameUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: ExameCreateManyGestanteInputEnvelope
    set?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    disconnect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    delete?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    update?: ExameUpdateWithWhereUniqueWithoutGestanteInput | ExameUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: ExameUpdateManyWithWhereWithoutGestanteInput | ExameUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: ExameScalarWhereInput | ExameScalarWhereInput[]
  }

  export type VacinaUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput> | VacinaCreateWithoutGestanteInput[] | VacinaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: VacinaCreateOrConnectWithoutGestanteInput | VacinaCreateOrConnectWithoutGestanteInput[]
    upsert?: VacinaUpsertWithWhereUniqueWithoutGestanteInput | VacinaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: VacinaCreateManyGestanteInputEnvelope
    set?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    disconnect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    delete?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    connect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    update?: VacinaUpdateWithWhereUniqueWithoutGestanteInput | VacinaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: VacinaUpdateManyWithWhereWithoutGestanteInput | VacinaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: VacinaScalarWhereInput | VacinaScalarWhereInput[]
  }

  export type MedicacaoUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput> | MedicacaoCreateWithoutGestanteInput[] | MedicacaoUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: MedicacaoCreateOrConnectWithoutGestanteInput | MedicacaoCreateOrConnectWithoutGestanteInput[]
    upsert?: MedicacaoUpsertWithWhereUniqueWithoutGestanteInput | MedicacaoUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: MedicacaoCreateManyGestanteInputEnvelope
    set?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    disconnect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    delete?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    connect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    update?: MedicacaoUpdateWithWhereUniqueWithoutGestanteInput | MedicacaoUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: MedicacaoUpdateManyWithWhereWithoutGestanteInput | MedicacaoUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: MedicacaoScalarWhereInput | MedicacaoScalarWhereInput[]
  }

  export type CondicaoClinicaUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput> | CondicaoClinicaCreateWithoutGestanteInput[] | CondicaoClinicaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: CondicaoClinicaCreateOrConnectWithoutGestanteInput | CondicaoClinicaCreateOrConnectWithoutGestanteInput[]
    upsert?: CondicaoClinicaUpsertWithWhereUniqueWithoutGestanteInput | CondicaoClinicaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: CondicaoClinicaCreateManyGestanteInputEnvelope
    set?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    disconnect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    delete?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    connect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    update?: CondicaoClinicaUpdateWithWhereUniqueWithoutGestanteInput | CondicaoClinicaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: CondicaoClinicaUpdateManyWithWhereWithoutGestanteInput | CondicaoClinicaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: CondicaoClinicaScalarWhereInput | CondicaoClinicaScalarWhereInput[]
  }

  export type ConsultaUncheckedUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput> | ConsultaCreateWithoutGestanteInput[] | ConsultaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutGestanteInput | ConsultaCreateOrConnectWithoutGestanteInput[]
    upsert?: ConsultaUpsertWithWhereUniqueWithoutGestanteInput | ConsultaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: ConsultaCreateManyGestanteInputEnvelope
    set?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    disconnect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    delete?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    update?: ConsultaUpdateWithWhereUniqueWithoutGestanteInput | ConsultaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: ConsultaUpdateManyWithWhereWithoutGestanteInput | ConsultaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
  }

  export type ExameUncheckedUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput> | ExameCreateWithoutGestanteInput[] | ExameUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutGestanteInput | ExameCreateOrConnectWithoutGestanteInput[]
    upsert?: ExameUpsertWithWhereUniqueWithoutGestanteInput | ExameUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: ExameCreateManyGestanteInputEnvelope
    set?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    disconnect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    delete?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    update?: ExameUpdateWithWhereUniqueWithoutGestanteInput | ExameUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: ExameUpdateManyWithWhereWithoutGestanteInput | ExameUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: ExameScalarWhereInput | ExameScalarWhereInput[]
  }

  export type VacinaUncheckedUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput> | VacinaCreateWithoutGestanteInput[] | VacinaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: VacinaCreateOrConnectWithoutGestanteInput | VacinaCreateOrConnectWithoutGestanteInput[]
    upsert?: VacinaUpsertWithWhereUniqueWithoutGestanteInput | VacinaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: VacinaCreateManyGestanteInputEnvelope
    set?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    disconnect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    delete?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    connect?: VacinaWhereUniqueInput | VacinaWhereUniqueInput[]
    update?: VacinaUpdateWithWhereUniqueWithoutGestanteInput | VacinaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: VacinaUpdateManyWithWhereWithoutGestanteInput | VacinaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: VacinaScalarWhereInput | VacinaScalarWhereInput[]
  }

  export type MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput> | MedicacaoCreateWithoutGestanteInput[] | MedicacaoUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: MedicacaoCreateOrConnectWithoutGestanteInput | MedicacaoCreateOrConnectWithoutGestanteInput[]
    upsert?: MedicacaoUpsertWithWhereUniqueWithoutGestanteInput | MedicacaoUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: MedicacaoCreateManyGestanteInputEnvelope
    set?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    disconnect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    delete?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    connect?: MedicacaoWhereUniqueInput | MedicacaoWhereUniqueInput[]
    update?: MedicacaoUpdateWithWhereUniqueWithoutGestanteInput | MedicacaoUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: MedicacaoUpdateManyWithWhereWithoutGestanteInput | MedicacaoUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: MedicacaoScalarWhereInput | MedicacaoScalarWhereInput[]
  }

  export type CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput = {
    create?: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput> | CondicaoClinicaCreateWithoutGestanteInput[] | CondicaoClinicaUncheckedCreateWithoutGestanteInput[]
    connectOrCreate?: CondicaoClinicaCreateOrConnectWithoutGestanteInput | CondicaoClinicaCreateOrConnectWithoutGestanteInput[]
    upsert?: CondicaoClinicaUpsertWithWhereUniqueWithoutGestanteInput | CondicaoClinicaUpsertWithWhereUniqueWithoutGestanteInput[]
    createMany?: CondicaoClinicaCreateManyGestanteInputEnvelope
    set?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    disconnect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    delete?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    connect?: CondicaoClinicaWhereUniqueInput | CondicaoClinicaWhereUniqueInput[]
    update?: CondicaoClinicaUpdateWithWhereUniqueWithoutGestanteInput | CondicaoClinicaUpdateWithWhereUniqueWithoutGestanteInput[]
    updateMany?: CondicaoClinicaUpdateManyWithWhereWithoutGestanteInput | CondicaoClinicaUpdateManyWithWhereWithoutGestanteInput[]
    deleteMany?: CondicaoClinicaScalarWhereInput | CondicaoClinicaScalarWhereInput[]
  }

  export type ConsultaCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput> | ConsultaCreateWithoutProfissionalInput[] | ConsultaUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutProfissionalInput | ConsultaCreateOrConnectWithoutProfissionalInput[]
    createMany?: ConsultaCreateManyProfissionalInputEnvelope
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
  }

  export type ConsultaUncheckedCreateNestedManyWithoutProfissionalInput = {
    create?: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput> | ConsultaCreateWithoutProfissionalInput[] | ConsultaUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutProfissionalInput | ConsultaCreateOrConnectWithoutProfissionalInput[]
    createMany?: ConsultaCreateManyProfissionalInputEnvelope
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
  }

  export type ConsultaUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput> | ConsultaCreateWithoutProfissionalInput[] | ConsultaUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutProfissionalInput | ConsultaCreateOrConnectWithoutProfissionalInput[]
    upsert?: ConsultaUpsertWithWhereUniqueWithoutProfissionalInput | ConsultaUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: ConsultaCreateManyProfissionalInputEnvelope
    set?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    disconnect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    delete?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    update?: ConsultaUpdateWithWhereUniqueWithoutProfissionalInput | ConsultaUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: ConsultaUpdateManyWithWhereWithoutProfissionalInput | ConsultaUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
  }

  export type ConsultaUncheckedUpdateManyWithoutProfissionalNestedInput = {
    create?: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput> | ConsultaCreateWithoutProfissionalInput[] | ConsultaUncheckedCreateWithoutProfissionalInput[]
    connectOrCreate?: ConsultaCreateOrConnectWithoutProfissionalInput | ConsultaCreateOrConnectWithoutProfissionalInput[]
    upsert?: ConsultaUpsertWithWhereUniqueWithoutProfissionalInput | ConsultaUpsertWithWhereUniqueWithoutProfissionalInput[]
    createMany?: ConsultaCreateManyProfissionalInputEnvelope
    set?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    disconnect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    delete?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    connect?: ConsultaWhereUniqueInput | ConsultaWhereUniqueInput[]
    update?: ConsultaUpdateWithWhereUniqueWithoutProfissionalInput | ConsultaUpdateWithWhereUniqueWithoutProfissionalInput[]
    updateMany?: ConsultaUpdateManyWithWhereWithoutProfissionalInput | ConsultaUpdateManyWithWhereWithoutProfissionalInput[]
    deleteMany?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
  }

  export type GestanteCreateNestedOneWithoutConsultasInput = {
    create?: XOR<GestanteCreateWithoutConsultasInput, GestanteUncheckedCreateWithoutConsultasInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutConsultasInput
    connect?: GestanteWhereUniqueInput
  }

  export type ProfissionalCreateNestedOneWithoutConsultasInput = {
    create?: XOR<ProfissionalCreateWithoutConsultasInput, ProfissionalUncheckedCreateWithoutConsultasInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutConsultasInput
    connect?: ProfissionalWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GestanteUpdateOneRequiredWithoutConsultasNestedInput = {
    create?: XOR<GestanteCreateWithoutConsultasInput, GestanteUncheckedCreateWithoutConsultasInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutConsultasInput
    upsert?: GestanteUpsertWithoutConsultasInput
    connect?: GestanteWhereUniqueInput
    update?: XOR<XOR<GestanteUpdateToOneWithWhereWithoutConsultasInput, GestanteUpdateWithoutConsultasInput>, GestanteUncheckedUpdateWithoutConsultasInput>
  }

  export type ProfissionalUpdateOneRequiredWithoutConsultasNestedInput = {
    create?: XOR<ProfissionalCreateWithoutConsultasInput, ProfissionalUncheckedCreateWithoutConsultasInput>
    connectOrCreate?: ProfissionalCreateOrConnectWithoutConsultasInput
    upsert?: ProfissionalUpsertWithoutConsultasInput
    connect?: ProfissionalWhereUniqueInput
    update?: XOR<XOR<ProfissionalUpdateToOneWithWhereWithoutConsultasInput, ProfissionalUpdateWithoutConsultasInput>, ProfissionalUncheckedUpdateWithoutConsultasInput>
  }

  export type GestanteCreateNestedOneWithoutExamesInput = {
    create?: XOR<GestanteCreateWithoutExamesInput, GestanteUncheckedCreateWithoutExamesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutExamesInput
    connect?: GestanteWhereUniqueInput
  }

  export type GestanteUpdateOneRequiredWithoutExamesNestedInput = {
    create?: XOR<GestanteCreateWithoutExamesInput, GestanteUncheckedCreateWithoutExamesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutExamesInput
    upsert?: GestanteUpsertWithoutExamesInput
    connect?: GestanteWhereUniqueInput
    update?: XOR<XOR<GestanteUpdateToOneWithWhereWithoutExamesInput, GestanteUpdateWithoutExamesInput>, GestanteUncheckedUpdateWithoutExamesInput>
  }

  export type GestanteCreateNestedOneWithoutVacinasInput = {
    create?: XOR<GestanteCreateWithoutVacinasInput, GestanteUncheckedCreateWithoutVacinasInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutVacinasInput
    connect?: GestanteWhereUniqueInput
  }

  export type GestanteUpdateOneRequiredWithoutVacinasNestedInput = {
    create?: XOR<GestanteCreateWithoutVacinasInput, GestanteUncheckedCreateWithoutVacinasInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutVacinasInput
    upsert?: GestanteUpsertWithoutVacinasInput
    connect?: GestanteWhereUniqueInput
    update?: XOR<XOR<GestanteUpdateToOneWithWhereWithoutVacinasInput, GestanteUpdateWithoutVacinasInput>, GestanteUncheckedUpdateWithoutVacinasInput>
  }

  export type GestanteCreateNestedOneWithoutMedicacoesInput = {
    create?: XOR<GestanteCreateWithoutMedicacoesInput, GestanteUncheckedCreateWithoutMedicacoesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutMedicacoesInput
    connect?: GestanteWhereUniqueInput
  }

  export type GestanteUpdateOneRequiredWithoutMedicacoesNestedInput = {
    create?: XOR<GestanteCreateWithoutMedicacoesInput, GestanteUncheckedCreateWithoutMedicacoesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutMedicacoesInput
    upsert?: GestanteUpsertWithoutMedicacoesInput
    connect?: GestanteWhereUniqueInput
    update?: XOR<XOR<GestanteUpdateToOneWithWhereWithoutMedicacoesInput, GestanteUpdateWithoutMedicacoesInput>, GestanteUncheckedUpdateWithoutMedicacoesInput>
  }

  export type GestanteCreateNestedOneWithoutCondicoesInput = {
    create?: XOR<GestanteCreateWithoutCondicoesInput, GestanteUncheckedCreateWithoutCondicoesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutCondicoesInput
    connect?: GestanteWhereUniqueInput
  }

  export type GestanteUpdateOneRequiredWithoutCondicoesNestedInput = {
    create?: XOR<GestanteCreateWithoutCondicoesInput, GestanteUncheckedCreateWithoutCondicoesInput>
    connectOrCreate?: GestanteCreateOrConnectWithoutCondicoesInput
    upsert?: GestanteUpsertWithoutCondicoesInput
    connect?: GestanteWhereUniqueInput
    update?: XOR<XOR<GestanteUpdateToOneWithWhereWithoutCondicoesInput, GestanteUpdateWithoutCondicoesInput>, GestanteUncheckedUpdateWithoutCondicoesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ConsultaCreateWithoutGestanteInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    criadoEm?: Date | string
    profissional: ProfissionalCreateNestedOneWithoutConsultasInput
  }

  export type ConsultaUncheckedCreateWithoutGestanteInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    profissionalId: string
    criadoEm?: Date | string
  }

  export type ConsultaCreateOrConnectWithoutGestanteInput = {
    where: ConsultaWhereUniqueInput
    create: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput>
  }

  export type ConsultaCreateManyGestanteInputEnvelope = {
    data: ConsultaCreateManyGestanteInput | ConsultaCreateManyGestanteInput[]
  }

  export type ExameCreateWithoutGestanteInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    criadoEm?: Date | string
  }

  export type ExameUncheckedCreateWithoutGestanteInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    criadoEm?: Date | string
  }

  export type ExameCreateOrConnectWithoutGestanteInput = {
    where: ExameWhereUniqueInput
    create: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput>
  }

  export type ExameCreateManyGestanteInputEnvelope = {
    data: ExameCreateManyGestanteInput | ExameCreateManyGestanteInput[]
  }

  export type VacinaCreateWithoutGestanteInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    criadoEm?: Date | string
  }

  export type VacinaUncheckedCreateWithoutGestanteInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    criadoEm?: Date | string
  }

  export type VacinaCreateOrConnectWithoutGestanteInput = {
    where: VacinaWhereUniqueInput
    create: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput>
  }

  export type VacinaCreateManyGestanteInputEnvelope = {
    data: VacinaCreateManyGestanteInput | VacinaCreateManyGestanteInput[]
  }

  export type MedicacaoCreateWithoutGestanteInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    criadoEm?: Date | string
  }

  export type MedicacaoUncheckedCreateWithoutGestanteInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    criadoEm?: Date | string
  }

  export type MedicacaoCreateOrConnectWithoutGestanteInput = {
    where: MedicacaoWhereUniqueInput
    create: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput>
  }

  export type MedicacaoCreateManyGestanteInputEnvelope = {
    data: MedicacaoCreateManyGestanteInput | MedicacaoCreateManyGestanteInput[]
  }

  export type CondicaoClinicaCreateWithoutGestanteInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    criadoEm?: Date | string
  }

  export type CondicaoClinicaUncheckedCreateWithoutGestanteInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    criadoEm?: Date | string
  }

  export type CondicaoClinicaCreateOrConnectWithoutGestanteInput = {
    where: CondicaoClinicaWhereUniqueInput
    create: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput>
  }

  export type CondicaoClinicaCreateManyGestanteInputEnvelope = {
    data: CondicaoClinicaCreateManyGestanteInput | CondicaoClinicaCreateManyGestanteInput[]
  }

  export type ConsultaUpsertWithWhereUniqueWithoutGestanteInput = {
    where: ConsultaWhereUniqueInput
    update: XOR<ConsultaUpdateWithoutGestanteInput, ConsultaUncheckedUpdateWithoutGestanteInput>
    create: XOR<ConsultaCreateWithoutGestanteInput, ConsultaUncheckedCreateWithoutGestanteInput>
  }

  export type ConsultaUpdateWithWhereUniqueWithoutGestanteInput = {
    where: ConsultaWhereUniqueInput
    data: XOR<ConsultaUpdateWithoutGestanteInput, ConsultaUncheckedUpdateWithoutGestanteInput>
  }

  export type ConsultaUpdateManyWithWhereWithoutGestanteInput = {
    where: ConsultaScalarWhereInput
    data: XOR<ConsultaUpdateManyMutationInput, ConsultaUncheckedUpdateManyWithoutGestanteInput>
  }

  export type ConsultaScalarWhereInput = {
    AND?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
    OR?: ConsultaScalarWhereInput[]
    NOT?: ConsultaScalarWhereInput | ConsultaScalarWhereInput[]
    id?: StringFilter<"Consulta"> | string
    data?: DateTimeFilter<"Consulta"> | Date | string
    tipo?: StringFilter<"Consulta"> | string
    semanaGestacional?: IntNullableFilter<"Consulta"> | number | null
    pesoKg?: FloatNullableFilter<"Consulta"> | number | null
    pressaoArterial?: StringNullableFilter<"Consulta"> | string | null
    alturaUterina?: FloatNullableFilter<"Consulta"> | number | null
    batimentoCardiacoFetal?: IntNullableFilter<"Consulta"> | number | null
    notas?: StringNullableFilter<"Consulta"> | string | null
    ubs?: StringNullableFilter<"Consulta"> | string | null
    gestanteId?: StringFilter<"Consulta"> | string
    profissionalId?: StringFilter<"Consulta"> | string
    criadoEm?: DateTimeFilter<"Consulta"> | Date | string
  }

  export type ExameUpsertWithWhereUniqueWithoutGestanteInput = {
    where: ExameWhereUniqueInput
    update: XOR<ExameUpdateWithoutGestanteInput, ExameUncheckedUpdateWithoutGestanteInput>
    create: XOR<ExameCreateWithoutGestanteInput, ExameUncheckedCreateWithoutGestanteInput>
  }

  export type ExameUpdateWithWhereUniqueWithoutGestanteInput = {
    where: ExameWhereUniqueInput
    data: XOR<ExameUpdateWithoutGestanteInput, ExameUncheckedUpdateWithoutGestanteInput>
  }

  export type ExameUpdateManyWithWhereWithoutGestanteInput = {
    where: ExameScalarWhereInput
    data: XOR<ExameUpdateManyMutationInput, ExameUncheckedUpdateManyWithoutGestanteInput>
  }

  export type ExameScalarWhereInput = {
    AND?: ExameScalarWhereInput | ExameScalarWhereInput[]
    OR?: ExameScalarWhereInput[]
    NOT?: ExameScalarWhereInput | ExameScalarWhereInput[]
    id?: StringFilter<"Exame"> | string
    tipo?: StringFilter<"Exame"> | string
    data?: DateTimeFilter<"Exame"> | Date | string
    resultado?: StringNullableFilter<"Exame"> | string | null
    status?: StringFilter<"Exame"> | string
    observacao?: StringNullableFilter<"Exame"> | string | null
    unidade?: StringNullableFilter<"Exame"> | string | null
    gestanteId?: StringFilter<"Exame"> | string
    criadoEm?: DateTimeFilter<"Exame"> | Date | string
  }

  export type VacinaUpsertWithWhereUniqueWithoutGestanteInput = {
    where: VacinaWhereUniqueInput
    update: XOR<VacinaUpdateWithoutGestanteInput, VacinaUncheckedUpdateWithoutGestanteInput>
    create: XOR<VacinaCreateWithoutGestanteInput, VacinaUncheckedCreateWithoutGestanteInput>
  }

  export type VacinaUpdateWithWhereUniqueWithoutGestanteInput = {
    where: VacinaWhereUniqueInput
    data: XOR<VacinaUpdateWithoutGestanteInput, VacinaUncheckedUpdateWithoutGestanteInput>
  }

  export type VacinaUpdateManyWithWhereWithoutGestanteInput = {
    where: VacinaScalarWhereInput
    data: XOR<VacinaUpdateManyMutationInput, VacinaUncheckedUpdateManyWithoutGestanteInput>
  }

  export type VacinaScalarWhereInput = {
    AND?: VacinaScalarWhereInput | VacinaScalarWhereInput[]
    OR?: VacinaScalarWhereInput[]
    NOT?: VacinaScalarWhereInput | VacinaScalarWhereInput[]
    id?: StringFilter<"Vacina"> | string
    codigoVacina?: StringFilter<"Vacina"> | string
    nome?: StringFilter<"Vacina"> | string
    data?: DateTimeFilter<"Vacina"> | Date | string
    dose?: StringFilter<"Vacina"> | string
    lote?: StringNullableFilter<"Vacina"> | string | null
    fabricante?: StringNullableFilter<"Vacina"> | string | null
    localAplicacao?: StringNullableFilter<"Vacina"> | string | null
    gestanteId?: StringFilter<"Vacina"> | string
    criadoEm?: DateTimeFilter<"Vacina"> | Date | string
  }

  export type MedicacaoUpsertWithWhereUniqueWithoutGestanteInput = {
    where: MedicacaoWhereUniqueInput
    update: XOR<MedicacaoUpdateWithoutGestanteInput, MedicacaoUncheckedUpdateWithoutGestanteInput>
    create: XOR<MedicacaoCreateWithoutGestanteInput, MedicacaoUncheckedCreateWithoutGestanteInput>
  }

  export type MedicacaoUpdateWithWhereUniqueWithoutGestanteInput = {
    where: MedicacaoWhereUniqueInput
    data: XOR<MedicacaoUpdateWithoutGestanteInput, MedicacaoUncheckedUpdateWithoutGestanteInput>
  }

  export type MedicacaoUpdateManyWithWhereWithoutGestanteInput = {
    where: MedicacaoScalarWhereInput
    data: XOR<MedicacaoUpdateManyMutationInput, MedicacaoUncheckedUpdateManyWithoutGestanteInput>
  }

  export type MedicacaoScalarWhereInput = {
    AND?: MedicacaoScalarWhereInput | MedicacaoScalarWhereInput[]
    OR?: MedicacaoScalarWhereInput[]
    NOT?: MedicacaoScalarWhereInput | MedicacaoScalarWhereInput[]
    id?: StringFilter<"Medicacao"> | string
    medicamento?: StringFilter<"Medicacao"> | string
    dosagem?: StringFilter<"Medicacao"> | string
    via?: StringNullableFilter<"Medicacao"> | string | null
    dataInicio?: DateTimeFilter<"Medicacao"> | Date | string
    dataFim?: DateTimeNullableFilter<"Medicacao"> | Date | string | null
    ativo?: BoolFilter<"Medicacao"> | boolean
    observacao?: StringNullableFilter<"Medicacao"> | string | null
    gestanteId?: StringFilter<"Medicacao"> | string
    criadoEm?: DateTimeFilter<"Medicacao"> | Date | string
  }

  export type CondicaoClinicaUpsertWithWhereUniqueWithoutGestanteInput = {
    where: CondicaoClinicaWhereUniqueInput
    update: XOR<CondicaoClinicaUpdateWithoutGestanteInput, CondicaoClinicaUncheckedUpdateWithoutGestanteInput>
    create: XOR<CondicaoClinicaCreateWithoutGestanteInput, CondicaoClinicaUncheckedCreateWithoutGestanteInput>
  }

  export type CondicaoClinicaUpdateWithWhereUniqueWithoutGestanteInput = {
    where: CondicaoClinicaWhereUniqueInput
    data: XOR<CondicaoClinicaUpdateWithoutGestanteInput, CondicaoClinicaUncheckedUpdateWithoutGestanteInput>
  }

  export type CondicaoClinicaUpdateManyWithWhereWithoutGestanteInput = {
    where: CondicaoClinicaScalarWhereInput
    data: XOR<CondicaoClinicaUpdateManyMutationInput, CondicaoClinicaUncheckedUpdateManyWithoutGestanteInput>
  }

  export type CondicaoClinicaScalarWhereInput = {
    AND?: CondicaoClinicaScalarWhereInput | CondicaoClinicaScalarWhereInput[]
    OR?: CondicaoClinicaScalarWhereInput[]
    NOT?: CondicaoClinicaScalarWhereInput | CondicaoClinicaScalarWhereInput[]
    id?: StringFilter<"CondicaoClinica"> | string
    codigoCid?: StringFilter<"CondicaoClinica"> | string
    descricao?: StringFilter<"CondicaoClinica"> | string
    dataInicio?: DateTimeFilter<"CondicaoClinica"> | Date | string
    dataFim?: DateTimeNullableFilter<"CondicaoClinica"> | Date | string | null
    status?: StringFilter<"CondicaoClinica"> | string
    gravidade?: StringNullableFilter<"CondicaoClinica"> | string | null
    gestanteId?: StringFilter<"CondicaoClinica"> | string
    criadoEm?: DateTimeFilter<"CondicaoClinica"> | Date | string
  }

  export type ConsultaCreateWithoutProfissionalInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    criadoEm?: Date | string
    gestante: GestanteCreateNestedOneWithoutConsultasInput
  }

  export type ConsultaUncheckedCreateWithoutProfissionalInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type ConsultaCreateOrConnectWithoutProfissionalInput = {
    where: ConsultaWhereUniqueInput
    create: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput>
  }

  export type ConsultaCreateManyProfissionalInputEnvelope = {
    data: ConsultaCreateManyProfissionalInput | ConsultaCreateManyProfissionalInput[]
  }

  export type ConsultaUpsertWithWhereUniqueWithoutProfissionalInput = {
    where: ConsultaWhereUniqueInput
    update: XOR<ConsultaUpdateWithoutProfissionalInput, ConsultaUncheckedUpdateWithoutProfissionalInput>
    create: XOR<ConsultaCreateWithoutProfissionalInput, ConsultaUncheckedCreateWithoutProfissionalInput>
  }

  export type ConsultaUpdateWithWhereUniqueWithoutProfissionalInput = {
    where: ConsultaWhereUniqueInput
    data: XOR<ConsultaUpdateWithoutProfissionalInput, ConsultaUncheckedUpdateWithoutProfissionalInput>
  }

  export type ConsultaUpdateManyWithWhereWithoutProfissionalInput = {
    where: ConsultaScalarWhereInput
    data: XOR<ConsultaUpdateManyMutationInput, ConsultaUncheckedUpdateManyWithoutProfissionalInput>
  }

  export type GestanteCreateWithoutConsultasInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    exames?: ExameCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateWithoutConsultasInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    exames?: ExameUncheckedCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaUncheckedCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoUncheckedCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteCreateOrConnectWithoutConsultasInput = {
    where: GestanteWhereUniqueInput
    create: XOR<GestanteCreateWithoutConsultasInput, GestanteUncheckedCreateWithoutConsultasInput>
  }

  export type ProfissionalCreateWithoutConsultasInput = {
    id?: string
    cpf: string
    nome: string
    cargo: string
    registroConselho?: string | null
    ubs: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProfissionalUncheckedCreateWithoutConsultasInput = {
    id?: string
    cpf: string
    nome: string
    cargo: string
    registroConselho?: string | null
    ubs: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProfissionalCreateOrConnectWithoutConsultasInput = {
    where: ProfissionalWhereUniqueInput
    create: XOR<ProfissionalCreateWithoutConsultasInput, ProfissionalUncheckedCreateWithoutConsultasInput>
  }

  export type GestanteUpsertWithoutConsultasInput = {
    update: XOR<GestanteUpdateWithoutConsultasInput, GestanteUncheckedUpdateWithoutConsultasInput>
    create: XOR<GestanteCreateWithoutConsultasInput, GestanteUncheckedCreateWithoutConsultasInput>
    where?: GestanteWhereInput
  }

  export type GestanteUpdateToOneWithWhereWithoutConsultasInput = {
    where?: GestanteWhereInput
    data: XOR<GestanteUpdateWithoutConsultasInput, GestanteUncheckedUpdateWithoutConsultasInput>
  }

  export type GestanteUpdateWithoutConsultasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    exames?: ExameUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateWithoutConsultasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    exames?: ExameUncheckedUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUncheckedUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type ProfissionalUpsertWithoutConsultasInput = {
    update: XOR<ProfissionalUpdateWithoutConsultasInput, ProfissionalUncheckedUpdateWithoutConsultasInput>
    create: XOR<ProfissionalCreateWithoutConsultasInput, ProfissionalUncheckedCreateWithoutConsultasInput>
    where?: ProfissionalWhereInput
  }

  export type ProfissionalUpdateToOneWithWhereWithoutConsultasInput = {
    where?: ProfissionalWhereInput
    data: XOR<ProfissionalUpdateWithoutConsultasInput, ProfissionalUncheckedUpdateWithoutConsultasInput>
  }

  export type ProfissionalUpdateWithoutConsultasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfissionalUncheckedUpdateWithoutConsultasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargo?: StringFieldUpdateOperationsInput | string
    registroConselho?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GestanteCreateWithoutExamesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateWithoutExamesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaUncheckedCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoUncheckedCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteCreateOrConnectWithoutExamesInput = {
    where: GestanteWhereUniqueInput
    create: XOR<GestanteCreateWithoutExamesInput, GestanteUncheckedCreateWithoutExamesInput>
  }

  export type GestanteUpsertWithoutExamesInput = {
    update: XOR<GestanteUpdateWithoutExamesInput, GestanteUncheckedUpdateWithoutExamesInput>
    create: XOR<GestanteCreateWithoutExamesInput, GestanteUncheckedCreateWithoutExamesInput>
    where?: GestanteWhereInput
  }

  export type GestanteUpdateToOneWithWhereWithoutExamesInput = {
    where?: GestanteWhereInput
    data: XOR<GestanteUpdateWithoutExamesInput, GestanteUncheckedUpdateWithoutExamesInput>
  }

  export type GestanteUpdateWithoutExamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateWithoutExamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUncheckedUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteCreateWithoutVacinasInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutGestanteInput
    exames?: ExameCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateWithoutVacinasInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutGestanteInput
    exames?: ExameUncheckedCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoUncheckedCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteCreateOrConnectWithoutVacinasInput = {
    where: GestanteWhereUniqueInput
    create: XOR<GestanteCreateWithoutVacinasInput, GestanteUncheckedCreateWithoutVacinasInput>
  }

  export type GestanteUpsertWithoutVacinasInput = {
    update: XOR<GestanteUpdateWithoutVacinasInput, GestanteUncheckedUpdateWithoutVacinasInput>
    create: XOR<GestanteCreateWithoutVacinasInput, GestanteUncheckedCreateWithoutVacinasInput>
    where?: GestanteWhereInput
  }

  export type GestanteUpdateToOneWithWhereWithoutVacinasInput = {
    where?: GestanteWhereInput
    data: XOR<GestanteUpdateWithoutVacinasInput, GestanteUncheckedUpdateWithoutVacinasInput>
  }

  export type GestanteUpdateWithoutVacinasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutGestanteNestedInput
    exames?: ExameUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateWithoutVacinasInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutGestanteNestedInput
    exames?: ExameUncheckedUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteCreateWithoutMedicacoesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutGestanteInput
    exames?: ExameCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateWithoutMedicacoesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutGestanteInput
    exames?: ExameUncheckedCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaUncheckedCreateNestedManyWithoutGestanteInput
    condicoes?: CondicaoClinicaUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteCreateOrConnectWithoutMedicacoesInput = {
    where: GestanteWhereUniqueInput
    create: XOR<GestanteCreateWithoutMedicacoesInput, GestanteUncheckedCreateWithoutMedicacoesInput>
  }

  export type GestanteUpsertWithoutMedicacoesInput = {
    update: XOR<GestanteUpdateWithoutMedicacoesInput, GestanteUncheckedUpdateWithoutMedicacoesInput>
    create: XOR<GestanteCreateWithoutMedicacoesInput, GestanteUncheckedCreateWithoutMedicacoesInput>
    where?: GestanteWhereInput
  }

  export type GestanteUpdateToOneWithWhereWithoutMedicacoesInput = {
    where?: GestanteWhereInput
    data: XOR<GestanteUpdateWithoutMedicacoesInput, GestanteUncheckedUpdateWithoutMedicacoesInput>
  }

  export type GestanteUpdateWithoutMedicacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutGestanteNestedInput
    exames?: ExameUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateWithoutMedicacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutGestanteNestedInput
    exames?: ExameUncheckedUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUncheckedUpdateManyWithoutGestanteNestedInput
    condicoes?: CondicaoClinicaUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteCreateWithoutCondicoesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaCreateNestedManyWithoutGestanteInput
    exames?: ExameCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoCreateNestedManyWithoutGestanteInput
  }

  export type GestanteUncheckedCreateWithoutCondicoesInput = {
    id?: string
    cpf: string
    cns?: string | null
    nome: string
    nomeSocial?: string | null
    dataNascimento: Date | string
    telefone: string
    email?: string | null
    endereco: string
    bairro?: string | null
    cep?: string | null
    ubsVinculada?: string | null
    dataUltimaMenstruacao?: Date | string | null
    dataProvavelParto?: Date | string | null
    tipoGravidez?: string
    riscoGestacional?: string
    senha: string
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    consultas?: ConsultaUncheckedCreateNestedManyWithoutGestanteInput
    exames?: ExameUncheckedCreateNestedManyWithoutGestanteInput
    vacinas?: VacinaUncheckedCreateNestedManyWithoutGestanteInput
    medicacoes?: MedicacaoUncheckedCreateNestedManyWithoutGestanteInput
  }

  export type GestanteCreateOrConnectWithoutCondicoesInput = {
    where: GestanteWhereUniqueInput
    create: XOR<GestanteCreateWithoutCondicoesInput, GestanteUncheckedCreateWithoutCondicoesInput>
  }

  export type GestanteUpsertWithoutCondicoesInput = {
    update: XOR<GestanteUpdateWithoutCondicoesInput, GestanteUncheckedUpdateWithoutCondicoesInput>
    create: XOR<GestanteCreateWithoutCondicoesInput, GestanteUncheckedCreateWithoutCondicoesInput>
    where?: GestanteWhereInput
  }

  export type GestanteUpdateToOneWithWhereWithoutCondicoesInput = {
    where?: GestanteWhereInput
    data: XOR<GestanteUpdateWithoutCondicoesInput, GestanteUncheckedUpdateWithoutCondicoesInput>
  }

  export type GestanteUpdateWithoutCondicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUpdateManyWithoutGestanteNestedInput
    exames?: ExameUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUpdateManyWithoutGestanteNestedInput
  }

  export type GestanteUncheckedUpdateWithoutCondicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    cns?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: StringFieldUpdateOperationsInput | string
    bairro?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    ubsVinculada?: NullableStringFieldUpdateOperationsInput | string | null
    dataUltimaMenstruacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataProvavelParto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipoGravidez?: StringFieldUpdateOperationsInput | string
    riscoGestacional?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    consultas?: ConsultaUncheckedUpdateManyWithoutGestanteNestedInput
    exames?: ExameUncheckedUpdateManyWithoutGestanteNestedInput
    vacinas?: VacinaUncheckedUpdateManyWithoutGestanteNestedInput
    medicacoes?: MedicacaoUncheckedUpdateManyWithoutGestanteNestedInput
  }

  export type ConsultaCreateManyGestanteInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    profissionalId: string
    criadoEm?: Date | string
  }

  export type ExameCreateManyGestanteInput = {
    id?: string
    tipo: string
    data: Date | string
    resultado?: string | null
    status?: string
    observacao?: string | null
    unidade?: string | null
    criadoEm?: Date | string
  }

  export type VacinaCreateManyGestanteInput = {
    id?: string
    codigoVacina: string
    nome: string
    data: Date | string
    dose: string
    lote?: string | null
    fabricante?: string | null
    localAplicacao?: string | null
    criadoEm?: Date | string
  }

  export type MedicacaoCreateManyGestanteInput = {
    id?: string
    medicamento: string
    dosagem: string
    via?: string | null
    dataInicio: Date | string
    dataFim?: Date | string | null
    ativo?: boolean
    observacao?: string | null
    criadoEm?: Date | string
  }

  export type CondicaoClinicaCreateManyGestanteInput = {
    id?: string
    codigoCid: string
    descricao: string
    dataInicio: Date | string
    dataFim?: Date | string | null
    status?: string
    gravidade?: string | null
    criadoEm?: Date | string
  }

  export type ConsultaUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    profissional?: ProfissionalUpdateOneRequiredWithoutConsultasNestedInput
  }

  export type ConsultaUncheckedUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaUncheckedUpdateManyWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    profissionalId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateManyWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    unidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaUncheckedUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VacinaUncheckedUpdateManyWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoVacina?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    dose?: StringFieldUpdateOperationsInput | string
    lote?: NullableStringFieldUpdateOperationsInput | string | null
    fabricante?: NullableStringFieldUpdateOperationsInput | string | null
    localAplicacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoUncheckedUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicacaoUncheckedUpdateManyWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    dosagem?: StringFieldUpdateOperationsInput | string
    via?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaUncheckedUpdateWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CondicaoClinicaUncheckedUpdateManyWithoutGestanteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigoCid?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gravidade?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaCreateManyProfissionalInput = {
    id?: string
    data: Date | string
    tipo: string
    semanaGestacional?: number | null
    pesoKg?: number | null
    pressaoArterial?: string | null
    alturaUterina?: number | null
    batimentoCardiacoFetal?: number | null
    notas?: string | null
    ubs?: string | null
    gestanteId: string
    criadoEm?: Date | string
  }

  export type ConsultaUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    gestante?: GestanteUpdateOneRequiredWithoutConsultasNestedInput
  }

  export type ConsultaUncheckedUpdateWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultaUncheckedUpdateManyWithoutProfissionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    tipo?: StringFieldUpdateOperationsInput | string
    semanaGestacional?: NullableIntFieldUpdateOperationsInput | number | null
    pesoKg?: NullableFloatFieldUpdateOperationsInput | number | null
    pressaoArterial?: NullableStringFieldUpdateOperationsInput | string | null
    alturaUterina?: NullableFloatFieldUpdateOperationsInput | number | null
    batimentoCardiacoFetal?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    ubs?: NullableStringFieldUpdateOperationsInput | string | null
    gestanteId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}