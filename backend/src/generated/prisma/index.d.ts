
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Practitioner
 * 
 */
export type Practitioner = $Result.DefaultSelection<Prisma.$PractitionerPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model WeeklyAvailability
 * 
 */
export type WeeklyAvailability = $Result.DefaultSelection<Prisma.$WeeklyAvailabilityPayload>
/**
 * Model AvailabilityException
 * 
 */
export type AvailabilityException = $Result.DefaultSelection<Prisma.$AvailabilityExceptionPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  CLIENT: 'CLIENT',
  PRACTITIONER: 'PRACTITIONER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]


export const ExceptionType: {
  CLOSED: 'CLOSED',
  CUSTOM_HOURS: 'CUSTOM_HOURS'
};

export type ExceptionType = (typeof ExceptionType)[keyof typeof ExceptionType]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  NO_SHOW: 'NO_SHOW'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

export type ExceptionType = $Enums.ExceptionType

export const ExceptionType: typeof $Enums.ExceptionType

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.practitioner`: Exposes CRUD operations for the **Practitioner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Practitioners
    * const practitioners = await prisma.practitioner.findMany()
    * ```
    */
  get practitioner(): Prisma.PractitionerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weeklyAvailability`: Exposes CRUD operations for the **WeeklyAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyAvailabilities
    * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany()
    * ```
    */
  get weeklyAvailability(): Prisma.WeeklyAvailabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availabilityException`: Exposes CRUD operations for the **AvailabilityException** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailabilityExceptions
    * const availabilityExceptions = await prisma.availabilityException.findMany()
    * ```
    */
  get availabilityException(): Prisma.AvailabilityExceptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
    User: 'User',
    Practitioner: 'Practitioner',
    Service: 'Service',
    WeeklyAvailability: 'WeeklyAvailability',
    AvailabilityException: 'AvailabilityException',
    Appointment: 'Appointment'
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
      modelProps: "user" | "practitioner" | "service" | "weeklyAvailability" | "availabilityException" | "appointment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Practitioner: {
        payload: Prisma.$PractitionerPayload<ExtArgs>
        fields: Prisma.PractitionerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PractitionerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PractitionerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          findFirst: {
            args: Prisma.PractitionerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PractitionerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          findMany: {
            args: Prisma.PractitionerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>[]
          }
          create: {
            args: Prisma.PractitionerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          createMany: {
            args: Prisma.PractitionerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PractitionerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>[]
          }
          delete: {
            args: Prisma.PractitionerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          update: {
            args: Prisma.PractitionerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          deleteMany: {
            args: Prisma.PractitionerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PractitionerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PractitionerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>[]
          }
          upsert: {
            args: Prisma.PractitionerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PractitionerPayload>
          }
          aggregate: {
            args: Prisma.PractitionerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePractitioner>
          }
          groupBy: {
            args: Prisma.PractitionerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PractitionerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PractitionerCountArgs<ExtArgs>
            result: $Utils.Optional<PractitionerCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      WeeklyAvailability: {
        payload: Prisma.$WeeklyAvailabilityPayload<ExtArgs>
        fields: Prisma.WeeklyAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.WeeklyAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          findMany: {
            args: Prisma.WeeklyAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>[]
          }
          create: {
            args: Prisma.WeeklyAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          createMany: {
            args: Prisma.WeeklyAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.WeeklyAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          update: {
            args: Prisma.WeeklyAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.WeeklyAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeeklyAvailabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>[]
          }
          upsert: {
            args: Prisma.WeeklyAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.WeeklyAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklyAvailability>
          }
          groupBy: {
            args: Prisma.WeeklyAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      AvailabilityException: {
        payload: Prisma.$AvailabilityExceptionPayload<ExtArgs>
        fields: Prisma.AvailabilityExceptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailabilityExceptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailabilityExceptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          findFirst: {
            args: Prisma.AvailabilityExceptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailabilityExceptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          findMany: {
            args: Prisma.AvailabilityExceptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>[]
          }
          create: {
            args: Prisma.AvailabilityExceptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          createMany: {
            args: Prisma.AvailabilityExceptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailabilityExceptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>[]
          }
          delete: {
            args: Prisma.AvailabilityExceptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          update: {
            args: Prisma.AvailabilityExceptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          deleteMany: {
            args: Prisma.AvailabilityExceptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailabilityExceptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailabilityExceptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>[]
          }
          upsert: {
            args: Prisma.AvailabilityExceptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityExceptionPayload>
          }
          aggregate: {
            args: Prisma.AvailabilityExceptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailabilityException>
          }
          groupBy: {
            args: Prisma.AvailabilityExceptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityExceptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailabilityExceptionCountArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityExceptionCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
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
    user?: UserOmit
    practitioner?: PractitionerOmit
    service?: ServiceOmit
    weeklyAvailability?: WeeklyAvailabilityOmit
    availabilityException?: AvailabilityExceptionOmit
    appointment?: AppointmentOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    appointments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type PractitionerCountOutputType
   */

  export type PractitionerCountOutputType = {
    services: number
    weeklyAvailabilities: number
    availabilityExceptions: number
    appointments: number
  }

  export type PractitionerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | PractitionerCountOutputTypeCountServicesArgs
    weeklyAvailabilities?: boolean | PractitionerCountOutputTypeCountWeeklyAvailabilitiesArgs
    availabilityExceptions?: boolean | PractitionerCountOutputTypeCountAvailabilityExceptionsArgs
    appointments?: boolean | PractitionerCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * PractitionerCountOutputType without action
   */
  export type PractitionerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PractitionerCountOutputType
     */
    select?: PractitionerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PractitionerCountOutputType without action
   */
  export type PractitionerCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * PractitionerCountOutputType without action
   */
  export type PractitionerCountOutputTypeCountWeeklyAvailabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyAvailabilityWhereInput
  }

  /**
   * PractitionerCountOutputType without action
   */
  export type PractitionerCountOutputTypeCountAvailabilityExceptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityExceptionWhereInput
  }

  /**
   * PractitionerCountOutputType without action
   */
  export type PractitionerCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    practitioners: number
    appointments: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioners?: boolean | ServiceCountOutputTypeCountPractitionersArgs
    appointments?: boolean | ServiceCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountPractitionersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PractitionerWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    active: boolean | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    active: boolean | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    phone: number
    active: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    active?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    active?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    active?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    firstName: string
    lastName: string
    phone: string | null
    active: boolean
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    active?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | User$practitionerArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    active?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    active?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    active?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "phone" | "active" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | User$practitionerArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      practitioner: Prisma.$PractitionerPayload<ExtArgs> | null
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      firstName: string
      lastName: string
      phone: string | null
      active: boolean
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    practitioner<T extends User$practitionerArgs<ExtArgs> = {}>(args?: Subset<T, User$practitionerArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.practitioner
   */
  export type User$practitionerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    where?: PractitionerWhereInput
  }

  /**
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Practitioner
   */

  export type AggregatePractitioner = {
    _count: PractitionerCountAggregateOutputType | null
    _min: PractitionerMinAggregateOutputType | null
    _max: PractitionerMaxAggregateOutputType | null
  }

  export type PractitionerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PractitionerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PractitionerCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PractitionerMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PractitionerMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PractitionerCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PractitionerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Practitioner to aggregate.
     */
    where?: PractitionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practitioners to fetch.
     */
    orderBy?: PractitionerOrderByWithRelationInput | PractitionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PractitionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practitioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practitioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Practitioners
    **/
    _count?: true | PractitionerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PractitionerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PractitionerMaxAggregateInputType
  }

  export type GetPractitionerAggregateType<T extends PractitionerAggregateArgs> = {
        [P in keyof T & keyof AggregatePractitioner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePractitioner[P]>
      : GetScalarType<T[P], AggregatePractitioner[P]>
  }




  export type PractitionerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PractitionerWhereInput
    orderBy?: PractitionerOrderByWithAggregationInput | PractitionerOrderByWithAggregationInput[]
    by: PractitionerScalarFieldEnum[] | PractitionerScalarFieldEnum
    having?: PractitionerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PractitionerCountAggregateInputType | true
    _min?: PractitionerMinAggregateInputType
    _max?: PractitionerMaxAggregateInputType
  }

  export type PractitionerGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: PractitionerCountAggregateOutputType | null
    _min: PractitionerMinAggregateOutputType | null
    _max: PractitionerMaxAggregateOutputType | null
  }

  type GetPractitionerGroupByPayload<T extends PractitionerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PractitionerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PractitionerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PractitionerGroupByOutputType[P]>
            : GetScalarType<T[P], PractitionerGroupByOutputType[P]>
        }
      >
    >


  export type PractitionerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | Practitioner$servicesArgs<ExtArgs>
    weeklyAvailabilities?: boolean | Practitioner$weeklyAvailabilitiesArgs<ExtArgs>
    availabilityExceptions?: boolean | Practitioner$availabilityExceptionsArgs<ExtArgs>
    appointments?: boolean | Practitioner$appointmentsArgs<ExtArgs>
    _count?: boolean | PractitionerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["practitioner"]>

  export type PractitionerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["practitioner"]>

  export type PractitionerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["practitioner"]>

  export type PractitionerSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PractitionerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["practitioner"]>
  export type PractitionerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | Practitioner$servicesArgs<ExtArgs>
    weeklyAvailabilities?: boolean | Practitioner$weeklyAvailabilitiesArgs<ExtArgs>
    availabilityExceptions?: boolean | Practitioner$availabilityExceptionsArgs<ExtArgs>
    appointments?: boolean | Practitioner$appointmentsArgs<ExtArgs>
    _count?: boolean | PractitionerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PractitionerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PractitionerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PractitionerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Practitioner"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      services: Prisma.$ServicePayload<ExtArgs>[]
      weeklyAvailabilities: Prisma.$WeeklyAvailabilityPayload<ExtArgs>[]
      availabilityExceptions: Prisma.$AvailabilityExceptionPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["practitioner"]>
    composites: {}
  }

  type PractitionerGetPayload<S extends boolean | null | undefined | PractitionerDefaultArgs> = $Result.GetResult<Prisma.$PractitionerPayload, S>

  type PractitionerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PractitionerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PractitionerCountAggregateInputType | true
    }

  export interface PractitionerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Practitioner'], meta: { name: 'Practitioner' } }
    /**
     * Find zero or one Practitioner that matches the filter.
     * @param {PractitionerFindUniqueArgs} args - Arguments to find a Practitioner
     * @example
     * // Get one Practitioner
     * const practitioner = await prisma.practitioner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PractitionerFindUniqueArgs>(args: SelectSubset<T, PractitionerFindUniqueArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Practitioner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PractitionerFindUniqueOrThrowArgs} args - Arguments to find a Practitioner
     * @example
     * // Get one Practitioner
     * const practitioner = await prisma.practitioner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PractitionerFindUniqueOrThrowArgs>(args: SelectSubset<T, PractitionerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Practitioner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerFindFirstArgs} args - Arguments to find a Practitioner
     * @example
     * // Get one Practitioner
     * const practitioner = await prisma.practitioner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PractitionerFindFirstArgs>(args?: SelectSubset<T, PractitionerFindFirstArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Practitioner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerFindFirstOrThrowArgs} args - Arguments to find a Practitioner
     * @example
     * // Get one Practitioner
     * const practitioner = await prisma.practitioner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PractitionerFindFirstOrThrowArgs>(args?: SelectSubset<T, PractitionerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Practitioners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Practitioners
     * const practitioners = await prisma.practitioner.findMany()
     * 
     * // Get first 10 Practitioners
     * const practitioners = await prisma.practitioner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const practitionerWithIdOnly = await prisma.practitioner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PractitionerFindManyArgs>(args?: SelectSubset<T, PractitionerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Practitioner.
     * @param {PractitionerCreateArgs} args - Arguments to create a Practitioner.
     * @example
     * // Create one Practitioner
     * const Practitioner = await prisma.practitioner.create({
     *   data: {
     *     // ... data to create a Practitioner
     *   }
     * })
     * 
     */
    create<T extends PractitionerCreateArgs>(args: SelectSubset<T, PractitionerCreateArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Practitioners.
     * @param {PractitionerCreateManyArgs} args - Arguments to create many Practitioners.
     * @example
     * // Create many Practitioners
     * const practitioner = await prisma.practitioner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PractitionerCreateManyArgs>(args?: SelectSubset<T, PractitionerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Practitioners and returns the data saved in the database.
     * @param {PractitionerCreateManyAndReturnArgs} args - Arguments to create many Practitioners.
     * @example
     * // Create many Practitioners
     * const practitioner = await prisma.practitioner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Practitioners and only return the `id`
     * const practitionerWithIdOnly = await prisma.practitioner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PractitionerCreateManyAndReturnArgs>(args?: SelectSubset<T, PractitionerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Practitioner.
     * @param {PractitionerDeleteArgs} args - Arguments to delete one Practitioner.
     * @example
     * // Delete one Practitioner
     * const Practitioner = await prisma.practitioner.delete({
     *   where: {
     *     // ... filter to delete one Practitioner
     *   }
     * })
     * 
     */
    delete<T extends PractitionerDeleteArgs>(args: SelectSubset<T, PractitionerDeleteArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Practitioner.
     * @param {PractitionerUpdateArgs} args - Arguments to update one Practitioner.
     * @example
     * // Update one Practitioner
     * const practitioner = await prisma.practitioner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PractitionerUpdateArgs>(args: SelectSubset<T, PractitionerUpdateArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Practitioners.
     * @param {PractitionerDeleteManyArgs} args - Arguments to filter Practitioners to delete.
     * @example
     * // Delete a few Practitioners
     * const { count } = await prisma.practitioner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PractitionerDeleteManyArgs>(args?: SelectSubset<T, PractitionerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Practitioners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Practitioners
     * const practitioner = await prisma.practitioner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PractitionerUpdateManyArgs>(args: SelectSubset<T, PractitionerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Practitioners and returns the data updated in the database.
     * @param {PractitionerUpdateManyAndReturnArgs} args - Arguments to update many Practitioners.
     * @example
     * // Update many Practitioners
     * const practitioner = await prisma.practitioner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Practitioners and only return the `id`
     * const practitionerWithIdOnly = await prisma.practitioner.updateManyAndReturn({
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
    updateManyAndReturn<T extends PractitionerUpdateManyAndReturnArgs>(args: SelectSubset<T, PractitionerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Practitioner.
     * @param {PractitionerUpsertArgs} args - Arguments to update or create a Practitioner.
     * @example
     * // Update or create a Practitioner
     * const practitioner = await prisma.practitioner.upsert({
     *   create: {
     *     // ... data to create a Practitioner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Practitioner we want to update
     *   }
     * })
     */
    upsert<T extends PractitionerUpsertArgs>(args: SelectSubset<T, PractitionerUpsertArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Practitioners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerCountArgs} args - Arguments to filter Practitioners to count.
     * @example
     * // Count the number of Practitioners
     * const count = await prisma.practitioner.count({
     *   where: {
     *     // ... the filter for the Practitioners we want to count
     *   }
     * })
    **/
    count<T extends PractitionerCountArgs>(
      args?: Subset<T, PractitionerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PractitionerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Practitioner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PractitionerAggregateArgs>(args: Subset<T, PractitionerAggregateArgs>): Prisma.PrismaPromise<GetPractitionerAggregateType<T>>

    /**
     * Group by Practitioner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PractitionerGroupByArgs} args - Group by arguments.
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
      T extends PractitionerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PractitionerGroupByArgs['orderBy'] }
        : { orderBy?: PractitionerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PractitionerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPractitionerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Practitioner model
   */
  readonly fields: PractitionerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Practitioner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PractitionerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends Practitioner$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Practitioner$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weeklyAvailabilities<T extends Practitioner$weeklyAvailabilitiesArgs<ExtArgs> = {}>(args?: Subset<T, Practitioner$weeklyAvailabilitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    availabilityExceptions<T extends Practitioner$availabilityExceptionsArgs<ExtArgs> = {}>(args?: Subset<T, Practitioner$availabilityExceptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Practitioner$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Practitioner$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Practitioner model
   */
  interface PractitionerFieldRefs {
    readonly id: FieldRef<"Practitioner", 'String'>
    readonly userId: FieldRef<"Practitioner", 'String'>
    readonly createdAt: FieldRef<"Practitioner", 'DateTime'>
    readonly updatedAt: FieldRef<"Practitioner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Practitioner findUnique
   */
  export type PractitionerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter, which Practitioner to fetch.
     */
    where: PractitionerWhereUniqueInput
  }

  /**
   * Practitioner findUniqueOrThrow
   */
  export type PractitionerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter, which Practitioner to fetch.
     */
    where: PractitionerWhereUniqueInput
  }

  /**
   * Practitioner findFirst
   */
  export type PractitionerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter, which Practitioner to fetch.
     */
    where?: PractitionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practitioners to fetch.
     */
    orderBy?: PractitionerOrderByWithRelationInput | PractitionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Practitioners.
     */
    cursor?: PractitionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practitioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practitioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Practitioners.
     */
    distinct?: PractitionerScalarFieldEnum | PractitionerScalarFieldEnum[]
  }

  /**
   * Practitioner findFirstOrThrow
   */
  export type PractitionerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter, which Practitioner to fetch.
     */
    where?: PractitionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practitioners to fetch.
     */
    orderBy?: PractitionerOrderByWithRelationInput | PractitionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Practitioners.
     */
    cursor?: PractitionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practitioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practitioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Practitioners.
     */
    distinct?: PractitionerScalarFieldEnum | PractitionerScalarFieldEnum[]
  }

  /**
   * Practitioner findMany
   */
  export type PractitionerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter, which Practitioners to fetch.
     */
    where?: PractitionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practitioners to fetch.
     */
    orderBy?: PractitionerOrderByWithRelationInput | PractitionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Practitioners.
     */
    cursor?: PractitionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practitioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practitioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Practitioners.
     */
    distinct?: PractitionerScalarFieldEnum | PractitionerScalarFieldEnum[]
  }

  /**
   * Practitioner create
   */
  export type PractitionerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * The data needed to create a Practitioner.
     */
    data: XOR<PractitionerCreateInput, PractitionerUncheckedCreateInput>
  }

  /**
   * Practitioner createMany
   */
  export type PractitionerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Practitioners.
     */
    data: PractitionerCreateManyInput | PractitionerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Practitioner createManyAndReturn
   */
  export type PractitionerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * The data used to create many Practitioners.
     */
    data: PractitionerCreateManyInput | PractitionerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Practitioner update
   */
  export type PractitionerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * The data needed to update a Practitioner.
     */
    data: XOR<PractitionerUpdateInput, PractitionerUncheckedUpdateInput>
    /**
     * Choose, which Practitioner to update.
     */
    where: PractitionerWhereUniqueInput
  }

  /**
   * Practitioner updateMany
   */
  export type PractitionerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Practitioners.
     */
    data: XOR<PractitionerUpdateManyMutationInput, PractitionerUncheckedUpdateManyInput>
    /**
     * Filter which Practitioners to update
     */
    where?: PractitionerWhereInput
    /**
     * Limit how many Practitioners to update.
     */
    limit?: number
  }

  /**
   * Practitioner updateManyAndReturn
   */
  export type PractitionerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * The data used to update Practitioners.
     */
    data: XOR<PractitionerUpdateManyMutationInput, PractitionerUncheckedUpdateManyInput>
    /**
     * Filter which Practitioners to update
     */
    where?: PractitionerWhereInput
    /**
     * Limit how many Practitioners to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Practitioner upsert
   */
  export type PractitionerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * The filter to search for the Practitioner to update in case it exists.
     */
    where: PractitionerWhereUniqueInput
    /**
     * In case the Practitioner found by the `where` argument doesn't exist, create a new Practitioner with this data.
     */
    create: XOR<PractitionerCreateInput, PractitionerUncheckedCreateInput>
    /**
     * In case the Practitioner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PractitionerUpdateInput, PractitionerUncheckedUpdateInput>
  }

  /**
   * Practitioner delete
   */
  export type PractitionerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    /**
     * Filter which Practitioner to delete.
     */
    where: PractitionerWhereUniqueInput
  }

  /**
   * Practitioner deleteMany
   */
  export type PractitionerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Practitioners to delete
     */
    where?: PractitionerWhereInput
    /**
     * Limit how many Practitioners to delete.
     */
    limit?: number
  }

  /**
   * Practitioner.services
   */
  export type Practitioner$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Practitioner.weeklyAvailabilities
   */
  export type Practitioner$weeklyAvailabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    where?: WeeklyAvailabilityWhereInput
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    cursor?: WeeklyAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * Practitioner.availabilityExceptions
   */
  export type Practitioner$availabilityExceptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    where?: AvailabilityExceptionWhereInput
    orderBy?: AvailabilityExceptionOrderByWithRelationInput | AvailabilityExceptionOrderByWithRelationInput[]
    cursor?: AvailabilityExceptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailabilityExceptionScalarFieldEnum | AvailabilityExceptionScalarFieldEnum[]
  }

  /**
   * Practitioner.appointments
   */
  export type Practitioner$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Practitioner without action
   */
  export type PractitionerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    duration: number | null
    price: Decimal | null
  }

  export type ServiceSumAggregateOutputType = {
    duration: number | null
    price: Decimal | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageUrl: string | null
    duration: number | null
    price: Decimal | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageUrl: string | null
    duration: number | null
    price: Decimal | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    imageUrl: number
    benefits: number
    steps: number
    faq: number
    duration: number
    price: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    duration?: true
    price?: true
  }

  export type ServiceSumAggregateInputType = {
    duration?: true
    price?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    duration?: true
    price?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    duration?: true
    price?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    benefits?: true
    steps?: true
    faq?: true
    duration?: true
    price?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    imageUrl: string | null
    benefits: string[]
    steps: string[]
    faq: JsonValue
    duration: number
    price: Decimal
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    benefits?: boolean
    steps?: boolean
    faq?: boolean
    duration?: boolean
    price?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioners?: boolean | Service$practitionersArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    benefits?: boolean
    steps?: boolean
    faq?: boolean
    duration?: boolean
    price?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    benefits?: boolean
    steps?: boolean
    faq?: boolean
    duration?: boolean
    price?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    benefits?: boolean
    steps?: boolean
    faq?: boolean
    duration?: boolean
    price?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "imageUrl" | "benefits" | "steps" | "faq" | "duration" | "price" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioners?: boolean | Service$practitionersArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      practitioners: Prisma.$PractitionerPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      imageUrl: string | null
      benefits: string[]
      steps: string[]
      faq: Prisma.JsonValue
      duration: number
      price: Prisma.Decimal
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    practitioners<T extends Service$practitionersArgs<ExtArgs> = {}>(args?: Subset<T, Service$practitionersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Service$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Service$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly slug: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly imageUrl: FieldRef<"Service", 'String'>
    readonly benefits: FieldRef<"Service", 'String[]'>
    readonly steps: FieldRef<"Service", 'String[]'>
    readonly faq: FieldRef<"Service", 'Json'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly price: FieldRef<"Service", 'Decimal'>
    readonly active: FieldRef<"Service", 'Boolean'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.practitioners
   */
  export type Service$practitionersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practitioner
     */
    select?: PractitionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Practitioner
     */
    omit?: PractitionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PractitionerInclude<ExtArgs> | null
    where?: PractitionerWhereInput
    orderBy?: PractitionerOrderByWithRelationInput | PractitionerOrderByWithRelationInput[]
    cursor?: PractitionerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PractitionerScalarFieldEnum | PractitionerScalarFieldEnum[]
  }

  /**
   * Service.appointments
   */
  export type Service$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model WeeklyAvailability
   */

  export type AggregateWeeklyAvailability = {
    _count: WeeklyAvailabilityCountAggregateOutputType | null
    _min: WeeklyAvailabilityMinAggregateOutputType | null
    _max: WeeklyAvailabilityMaxAggregateOutputType | null
  }

  export type WeeklyAvailabilityMinAggregateOutputType = {
    id: string | null
    practitionerId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    startTime: string | null
    endTime: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyAvailabilityMaxAggregateOutputType = {
    id: string | null
    practitionerId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    startTime: string | null
    endTime: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyAvailabilityCountAggregateOutputType = {
    id: number
    practitionerId: number
    dayOfWeek: number
    startTime: number
    endTime: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeeklyAvailabilityMinAggregateInputType = {
    id?: true
    practitionerId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyAvailabilityMaxAggregateInputType = {
    id?: true
    practitionerId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyAvailabilityCountAggregateInputType = {
    id?: true
    practitionerId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeeklyAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyAvailability to aggregate.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyAvailabilities
    **/
    _count?: true | WeeklyAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyAvailabilityMaxAggregateInputType
  }

  export type GetWeeklyAvailabilityAggregateType<T extends WeeklyAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyAvailability[P]>
      : GetScalarType<T[P], AggregateWeeklyAvailability[P]>
  }




  export type WeeklyAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyAvailabilityWhereInput
    orderBy?: WeeklyAvailabilityOrderByWithAggregationInput | WeeklyAvailabilityOrderByWithAggregationInput[]
    by: WeeklyAvailabilityScalarFieldEnum[] | WeeklyAvailabilityScalarFieldEnum
    having?: WeeklyAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyAvailabilityCountAggregateInputType | true
    _min?: WeeklyAvailabilityMinAggregateInputType
    _max?: WeeklyAvailabilityMaxAggregateInputType
  }

  export type WeeklyAvailabilityGroupByOutputType = {
    id: string
    practitionerId: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: WeeklyAvailabilityCountAggregateOutputType | null
    _min: WeeklyAvailabilityMinAggregateOutputType | null
    _max: WeeklyAvailabilityMaxAggregateOutputType | null
  }

  type GetWeeklyAvailabilityGroupByPayload<T extends WeeklyAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyAvailability"]>

  export type WeeklyAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyAvailability"]>

  export type WeeklyAvailabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyAvailability"]>

  export type WeeklyAvailabilitySelectScalar = {
    id?: boolean
    practitionerId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeeklyAvailabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "practitionerId" | "dayOfWeek" | "startTime" | "endTime" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["weeklyAvailability"]>
  export type WeeklyAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }
  export type WeeklyAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }
  export type WeeklyAvailabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }

  export type $WeeklyAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyAvailability"
    objects: {
      practitioner: Prisma.$PractitionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      practitionerId: string
      dayOfWeek: $Enums.DayOfWeek
      startTime: string
      endTime: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weeklyAvailability"]>
    composites: {}
  }

  type WeeklyAvailabilityGetPayload<S extends boolean | null | undefined | WeeklyAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$WeeklyAvailabilityPayload, S>

  type WeeklyAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeeklyAvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeeklyAvailabilityCountAggregateInputType | true
    }

  export interface WeeklyAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyAvailability'], meta: { name: 'WeeklyAvailability' } }
    /**
     * Find zero or one WeeklyAvailability that matches the filter.
     * @param {WeeklyAvailabilityFindUniqueArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyAvailabilityFindUniqueArgs>(args: SelectSubset<T, WeeklyAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeeklyAvailability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeeklyAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindFirstArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyAvailabilityFindFirstArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindFirstArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindFirstOrThrowArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeeklyAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyAvailabilities
     * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany()
     * 
     * // Get first 10 WeeklyAvailabilities
     * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyAvailabilityWithIdOnly = await prisma.weeklyAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyAvailabilityFindManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeeklyAvailability.
     * @param {WeeklyAvailabilityCreateArgs} args - Arguments to create a WeeklyAvailability.
     * @example
     * // Create one WeeklyAvailability
     * const WeeklyAvailability = await prisma.weeklyAvailability.create({
     *   data: {
     *     // ... data to create a WeeklyAvailability
     *   }
     * })
     * 
     */
    create<T extends WeeklyAvailabilityCreateArgs>(args: SelectSubset<T, WeeklyAvailabilityCreateArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeeklyAvailabilities.
     * @param {WeeklyAvailabilityCreateManyArgs} args - Arguments to create many WeeklyAvailabilities.
     * @example
     * // Create many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyAvailabilityCreateManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyAvailabilities and returns the data saved in the database.
     * @param {WeeklyAvailabilityCreateManyAndReturnArgs} args - Arguments to create many WeeklyAvailabilities.
     * @example
     * // Create many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyAvailabilities and only return the `id`
     * const weeklyAvailabilityWithIdOnly = await prisma.weeklyAvailability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeeklyAvailability.
     * @param {WeeklyAvailabilityDeleteArgs} args - Arguments to delete one WeeklyAvailability.
     * @example
     * // Delete one WeeklyAvailability
     * const WeeklyAvailability = await prisma.weeklyAvailability.delete({
     *   where: {
     *     // ... filter to delete one WeeklyAvailability
     *   }
     * })
     * 
     */
    delete<T extends WeeklyAvailabilityDeleteArgs>(args: SelectSubset<T, WeeklyAvailabilityDeleteArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeeklyAvailability.
     * @param {WeeklyAvailabilityUpdateArgs} args - Arguments to update one WeeklyAvailability.
     * @example
     * // Update one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyAvailabilityUpdateArgs>(args: SelectSubset<T, WeeklyAvailabilityUpdateArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeeklyAvailabilities.
     * @param {WeeklyAvailabilityDeleteManyArgs} args - Arguments to filter WeeklyAvailabilities to delete.
     * @example
     * // Delete a few WeeklyAvailabilities
     * const { count } = await prisma.weeklyAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyAvailabilityDeleteManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyAvailabilityUpdateManyArgs>(args: SelectSubset<T, WeeklyAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyAvailabilities and returns the data updated in the database.
     * @param {WeeklyAvailabilityUpdateManyAndReturnArgs} args - Arguments to update many WeeklyAvailabilities.
     * @example
     * // Update many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeeklyAvailabilities and only return the `id`
     * const weeklyAvailabilityWithIdOnly = await prisma.weeklyAvailability.updateManyAndReturn({
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
    updateManyAndReturn<T extends WeeklyAvailabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, WeeklyAvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeeklyAvailability.
     * @param {WeeklyAvailabilityUpsertArgs} args - Arguments to update or create a WeeklyAvailability.
     * @example
     * // Update or create a WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.upsert({
     *   create: {
     *     // ... data to create a WeeklyAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyAvailability we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyAvailabilityUpsertArgs>(args: SelectSubset<T, WeeklyAvailabilityUpsertArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeeklyAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityCountArgs} args - Arguments to filter WeeklyAvailabilities to count.
     * @example
     * // Count the number of WeeklyAvailabilities
     * const count = await prisma.weeklyAvailability.count({
     *   where: {
     *     // ... the filter for the WeeklyAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends WeeklyAvailabilityCountArgs>(
      args?: Subset<T, WeeklyAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WeeklyAvailabilityAggregateArgs>(args: Subset<T, WeeklyAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetWeeklyAvailabilityAggregateType<T>>

    /**
     * Group by WeeklyAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityGroupByArgs} args - Group by arguments.
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
      T extends WeeklyAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyAvailabilityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WeeklyAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyAvailability model
   */
  readonly fields: WeeklyAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    practitioner<T extends PractitionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PractitionerDefaultArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WeeklyAvailability model
   */
  interface WeeklyAvailabilityFieldRefs {
    readonly id: FieldRef<"WeeklyAvailability", 'String'>
    readonly practitionerId: FieldRef<"WeeklyAvailability", 'String'>
    readonly dayOfWeek: FieldRef<"WeeklyAvailability", 'DayOfWeek'>
    readonly startTime: FieldRef<"WeeklyAvailability", 'String'>
    readonly endTime: FieldRef<"WeeklyAvailability", 'String'>
    readonly active: FieldRef<"WeeklyAvailability", 'Boolean'>
    readonly createdAt: FieldRef<"WeeklyAvailability", 'DateTime'>
    readonly updatedAt: FieldRef<"WeeklyAvailability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyAvailability findUnique
   */
  export type WeeklyAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability findUniqueOrThrow
   */
  export type WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability findFirst
   */
  export type WeeklyAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyAvailabilities.
     */
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability findFirstOrThrow
   */
  export type WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyAvailabilities.
     */
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability findMany
   */
  export type WeeklyAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailabilities to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyAvailabilities.
     */
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability create
   */
  export type WeeklyAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyAvailability.
     */
    data: XOR<WeeklyAvailabilityCreateInput, WeeklyAvailabilityUncheckedCreateInput>
  }

  /**
   * WeeklyAvailability createMany
   */
  export type WeeklyAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyAvailabilities.
     */
    data: WeeklyAvailabilityCreateManyInput | WeeklyAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyAvailability createManyAndReturn
   */
  export type WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to create many WeeklyAvailabilities.
     */
    data: WeeklyAvailabilityCreateManyInput | WeeklyAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyAvailability update
   */
  export type WeeklyAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyAvailability.
     */
    data: XOR<WeeklyAvailabilityUpdateInput, WeeklyAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which WeeklyAvailability to update.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability updateMany
   */
  export type WeeklyAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyAvailabilities.
     */
    data: XOR<WeeklyAvailabilityUpdateManyMutationInput, WeeklyAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyAvailabilities to update
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * Limit how many WeeklyAvailabilities to update.
     */
    limit?: number
  }

  /**
   * WeeklyAvailability updateManyAndReturn
   */
  export type WeeklyAvailabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to update WeeklyAvailabilities.
     */
    data: XOR<WeeklyAvailabilityUpdateManyMutationInput, WeeklyAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyAvailabilities to update
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * Limit how many WeeklyAvailabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyAvailability upsert
   */
  export type WeeklyAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyAvailability to update in case it exists.
     */
    where: WeeklyAvailabilityWhereUniqueInput
    /**
     * In case the WeeklyAvailability found by the `where` argument doesn't exist, create a new WeeklyAvailability with this data.
     */
    create: XOR<WeeklyAvailabilityCreateInput, WeeklyAvailabilityUncheckedCreateInput>
    /**
     * In case the WeeklyAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyAvailabilityUpdateInput, WeeklyAvailabilityUncheckedUpdateInput>
  }

  /**
   * WeeklyAvailability delete
   */
  export type WeeklyAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which WeeklyAvailability to delete.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability deleteMany
   */
  export type WeeklyAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyAvailabilities to delete
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * Limit how many WeeklyAvailabilities to delete.
     */
    limit?: number
  }

  /**
   * WeeklyAvailability without action
   */
  export type WeeklyAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyAvailability
     */
    omit?: WeeklyAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model AvailabilityException
   */

  export type AggregateAvailabilityException = {
    _count: AvailabilityExceptionCountAggregateOutputType | null
    _min: AvailabilityExceptionMinAggregateOutputType | null
    _max: AvailabilityExceptionMaxAggregateOutputType | null
  }

  export type AvailabilityExceptionMinAggregateOutputType = {
    id: string | null
    practitionerId: string | null
    date: Date | null
    type: $Enums.ExceptionType | null
    startTime: string | null
    endTime: string | null
    reason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailabilityExceptionMaxAggregateOutputType = {
    id: string | null
    practitionerId: string | null
    date: Date | null
    type: $Enums.ExceptionType | null
    startTime: string | null
    endTime: string | null
    reason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailabilityExceptionCountAggregateOutputType = {
    id: number
    practitionerId: number
    date: number
    type: number
    startTime: number
    endTime: number
    reason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AvailabilityExceptionMinAggregateInputType = {
    id?: true
    practitionerId?: true
    date?: true
    type?: true
    startTime?: true
    endTime?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailabilityExceptionMaxAggregateInputType = {
    id?: true
    practitionerId?: true
    date?: true
    type?: true
    startTime?: true
    endTime?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailabilityExceptionCountAggregateInputType = {
    id?: true
    practitionerId?: true
    date?: true
    type?: true
    startTime?: true
    endTime?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AvailabilityExceptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityException to aggregate.
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityExceptions to fetch.
     */
    orderBy?: AvailabilityExceptionOrderByWithRelationInput | AvailabilityExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailabilityExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailabilityExceptions
    **/
    _count?: true | AvailabilityExceptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailabilityExceptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailabilityExceptionMaxAggregateInputType
  }

  export type GetAvailabilityExceptionAggregateType<T extends AvailabilityExceptionAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailabilityException]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailabilityException[P]>
      : GetScalarType<T[P], AggregateAvailabilityException[P]>
  }




  export type AvailabilityExceptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityExceptionWhereInput
    orderBy?: AvailabilityExceptionOrderByWithAggregationInput | AvailabilityExceptionOrderByWithAggregationInput[]
    by: AvailabilityExceptionScalarFieldEnum[] | AvailabilityExceptionScalarFieldEnum
    having?: AvailabilityExceptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailabilityExceptionCountAggregateInputType | true
    _min?: AvailabilityExceptionMinAggregateInputType
    _max?: AvailabilityExceptionMaxAggregateInputType
  }

  export type AvailabilityExceptionGroupByOutputType = {
    id: string
    practitionerId: string
    date: Date
    type: $Enums.ExceptionType
    startTime: string | null
    endTime: string | null
    reason: string | null
    createdAt: Date
    updatedAt: Date
    _count: AvailabilityExceptionCountAggregateOutputType | null
    _min: AvailabilityExceptionMinAggregateOutputType | null
    _max: AvailabilityExceptionMaxAggregateOutputType | null
  }

  type GetAvailabilityExceptionGroupByPayload<T extends AvailabilityExceptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailabilityExceptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailabilityExceptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailabilityExceptionGroupByOutputType[P]>
            : GetScalarType<T[P], AvailabilityExceptionGroupByOutputType[P]>
        }
      >
    >


  export type AvailabilityExceptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    date?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityException"]>

  export type AvailabilityExceptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    date?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityException"]>

  export type AvailabilityExceptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    practitionerId?: boolean
    date?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityException"]>

  export type AvailabilityExceptionSelectScalar = {
    id?: boolean
    practitionerId?: boolean
    date?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AvailabilityExceptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "practitionerId" | "date" | "type" | "startTime" | "endTime" | "reason" | "createdAt" | "updatedAt", ExtArgs["result"]["availabilityException"]>
  export type AvailabilityExceptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }
  export type AvailabilityExceptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }
  export type AvailabilityExceptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
  }

  export type $AvailabilityExceptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailabilityException"
    objects: {
      practitioner: Prisma.$PractitionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      practitionerId: string
      date: Date
      type: $Enums.ExceptionType
      startTime: string | null
      endTime: string | null
      reason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["availabilityException"]>
    composites: {}
  }

  type AvailabilityExceptionGetPayload<S extends boolean | null | undefined | AvailabilityExceptionDefaultArgs> = $Result.GetResult<Prisma.$AvailabilityExceptionPayload, S>

  type AvailabilityExceptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailabilityExceptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailabilityExceptionCountAggregateInputType | true
    }

  export interface AvailabilityExceptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailabilityException'], meta: { name: 'AvailabilityException' } }
    /**
     * Find zero or one AvailabilityException that matches the filter.
     * @param {AvailabilityExceptionFindUniqueArgs} args - Arguments to find a AvailabilityException
     * @example
     * // Get one AvailabilityException
     * const availabilityException = await prisma.availabilityException.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailabilityExceptionFindUniqueArgs>(args: SelectSubset<T, AvailabilityExceptionFindUniqueArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailabilityException that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailabilityExceptionFindUniqueOrThrowArgs} args - Arguments to find a AvailabilityException
     * @example
     * // Get one AvailabilityException
     * const availabilityException = await prisma.availabilityException.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailabilityExceptionFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailabilityExceptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailabilityException that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionFindFirstArgs} args - Arguments to find a AvailabilityException
     * @example
     * // Get one AvailabilityException
     * const availabilityException = await prisma.availabilityException.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailabilityExceptionFindFirstArgs>(args?: SelectSubset<T, AvailabilityExceptionFindFirstArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailabilityException that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionFindFirstOrThrowArgs} args - Arguments to find a AvailabilityException
     * @example
     * // Get one AvailabilityException
     * const availabilityException = await prisma.availabilityException.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailabilityExceptionFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailabilityExceptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailabilityExceptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailabilityExceptions
     * const availabilityExceptions = await prisma.availabilityException.findMany()
     * 
     * // Get first 10 AvailabilityExceptions
     * const availabilityExceptions = await prisma.availabilityException.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availabilityExceptionWithIdOnly = await prisma.availabilityException.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailabilityExceptionFindManyArgs>(args?: SelectSubset<T, AvailabilityExceptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailabilityException.
     * @param {AvailabilityExceptionCreateArgs} args - Arguments to create a AvailabilityException.
     * @example
     * // Create one AvailabilityException
     * const AvailabilityException = await prisma.availabilityException.create({
     *   data: {
     *     // ... data to create a AvailabilityException
     *   }
     * })
     * 
     */
    create<T extends AvailabilityExceptionCreateArgs>(args: SelectSubset<T, AvailabilityExceptionCreateArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailabilityExceptions.
     * @param {AvailabilityExceptionCreateManyArgs} args - Arguments to create many AvailabilityExceptions.
     * @example
     * // Create many AvailabilityExceptions
     * const availabilityException = await prisma.availabilityException.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailabilityExceptionCreateManyArgs>(args?: SelectSubset<T, AvailabilityExceptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailabilityExceptions and returns the data saved in the database.
     * @param {AvailabilityExceptionCreateManyAndReturnArgs} args - Arguments to create many AvailabilityExceptions.
     * @example
     * // Create many AvailabilityExceptions
     * const availabilityException = await prisma.availabilityException.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailabilityExceptions and only return the `id`
     * const availabilityExceptionWithIdOnly = await prisma.availabilityException.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailabilityExceptionCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailabilityExceptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailabilityException.
     * @param {AvailabilityExceptionDeleteArgs} args - Arguments to delete one AvailabilityException.
     * @example
     * // Delete one AvailabilityException
     * const AvailabilityException = await prisma.availabilityException.delete({
     *   where: {
     *     // ... filter to delete one AvailabilityException
     *   }
     * })
     * 
     */
    delete<T extends AvailabilityExceptionDeleteArgs>(args: SelectSubset<T, AvailabilityExceptionDeleteArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailabilityException.
     * @param {AvailabilityExceptionUpdateArgs} args - Arguments to update one AvailabilityException.
     * @example
     * // Update one AvailabilityException
     * const availabilityException = await prisma.availabilityException.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailabilityExceptionUpdateArgs>(args: SelectSubset<T, AvailabilityExceptionUpdateArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailabilityExceptions.
     * @param {AvailabilityExceptionDeleteManyArgs} args - Arguments to filter AvailabilityExceptions to delete.
     * @example
     * // Delete a few AvailabilityExceptions
     * const { count } = await prisma.availabilityException.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailabilityExceptionDeleteManyArgs>(args?: SelectSubset<T, AvailabilityExceptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailabilityExceptions
     * const availabilityException = await prisma.availabilityException.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailabilityExceptionUpdateManyArgs>(args: SelectSubset<T, AvailabilityExceptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityExceptions and returns the data updated in the database.
     * @param {AvailabilityExceptionUpdateManyAndReturnArgs} args - Arguments to update many AvailabilityExceptions.
     * @example
     * // Update many AvailabilityExceptions
     * const availabilityException = await prisma.availabilityException.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailabilityExceptions and only return the `id`
     * const availabilityExceptionWithIdOnly = await prisma.availabilityException.updateManyAndReturn({
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
    updateManyAndReturn<T extends AvailabilityExceptionUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailabilityExceptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailabilityException.
     * @param {AvailabilityExceptionUpsertArgs} args - Arguments to update or create a AvailabilityException.
     * @example
     * // Update or create a AvailabilityException
     * const availabilityException = await prisma.availabilityException.upsert({
     *   create: {
     *     // ... data to create a AvailabilityException
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailabilityException we want to update
     *   }
     * })
     */
    upsert<T extends AvailabilityExceptionUpsertArgs>(args: SelectSubset<T, AvailabilityExceptionUpsertArgs<ExtArgs>>): Prisma__AvailabilityExceptionClient<$Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailabilityExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionCountArgs} args - Arguments to filter AvailabilityExceptions to count.
     * @example
     * // Count the number of AvailabilityExceptions
     * const count = await prisma.availabilityException.count({
     *   where: {
     *     // ... the filter for the AvailabilityExceptions we want to count
     *   }
     * })
    **/
    count<T extends AvailabilityExceptionCountArgs>(
      args?: Subset<T, AvailabilityExceptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailabilityExceptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailabilityException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvailabilityExceptionAggregateArgs>(args: Subset<T, AvailabilityExceptionAggregateArgs>): Prisma.PrismaPromise<GetAvailabilityExceptionAggregateType<T>>

    /**
     * Group by AvailabilityException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityExceptionGroupByArgs} args - Group by arguments.
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
      T extends AvailabilityExceptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailabilityExceptionGroupByArgs['orderBy'] }
        : { orderBy?: AvailabilityExceptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvailabilityExceptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilityExceptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailabilityException model
   */
  readonly fields: AvailabilityExceptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailabilityException.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailabilityExceptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    practitioner<T extends PractitionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PractitionerDefaultArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AvailabilityException model
   */
  interface AvailabilityExceptionFieldRefs {
    readonly id: FieldRef<"AvailabilityException", 'String'>
    readonly practitionerId: FieldRef<"AvailabilityException", 'String'>
    readonly date: FieldRef<"AvailabilityException", 'DateTime'>
    readonly type: FieldRef<"AvailabilityException", 'ExceptionType'>
    readonly startTime: FieldRef<"AvailabilityException", 'String'>
    readonly endTime: FieldRef<"AvailabilityException", 'String'>
    readonly reason: FieldRef<"AvailabilityException", 'String'>
    readonly createdAt: FieldRef<"AvailabilityException", 'DateTime'>
    readonly updatedAt: FieldRef<"AvailabilityException", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailabilityException findUnique
   */
  export type AvailabilityExceptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityException to fetch.
     */
    where: AvailabilityExceptionWhereUniqueInput
  }

  /**
   * AvailabilityException findUniqueOrThrow
   */
  export type AvailabilityExceptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityException to fetch.
     */
    where: AvailabilityExceptionWhereUniqueInput
  }

  /**
   * AvailabilityException findFirst
   */
  export type AvailabilityExceptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityException to fetch.
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityExceptions to fetch.
     */
    orderBy?: AvailabilityExceptionOrderByWithRelationInput | AvailabilityExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityExceptions.
     */
    cursor?: AvailabilityExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityExceptions.
     */
    distinct?: AvailabilityExceptionScalarFieldEnum | AvailabilityExceptionScalarFieldEnum[]
  }

  /**
   * AvailabilityException findFirstOrThrow
   */
  export type AvailabilityExceptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityException to fetch.
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityExceptions to fetch.
     */
    orderBy?: AvailabilityExceptionOrderByWithRelationInput | AvailabilityExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityExceptions.
     */
    cursor?: AvailabilityExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityExceptions.
     */
    distinct?: AvailabilityExceptionScalarFieldEnum | AvailabilityExceptionScalarFieldEnum[]
  }

  /**
   * AvailabilityException findMany
   */
  export type AvailabilityExceptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityExceptions to fetch.
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityExceptions to fetch.
     */
    orderBy?: AvailabilityExceptionOrderByWithRelationInput | AvailabilityExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailabilityExceptions.
     */
    cursor?: AvailabilityExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityExceptions.
     */
    distinct?: AvailabilityExceptionScalarFieldEnum | AvailabilityExceptionScalarFieldEnum[]
  }

  /**
   * AvailabilityException create
   */
  export type AvailabilityExceptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailabilityException.
     */
    data: XOR<AvailabilityExceptionCreateInput, AvailabilityExceptionUncheckedCreateInput>
  }

  /**
   * AvailabilityException createMany
   */
  export type AvailabilityExceptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailabilityExceptions.
     */
    data: AvailabilityExceptionCreateManyInput | AvailabilityExceptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailabilityException createManyAndReturn
   */
  export type AvailabilityExceptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * The data used to create many AvailabilityExceptions.
     */
    data: AvailabilityExceptionCreateManyInput | AvailabilityExceptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityException update
   */
  export type AvailabilityExceptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailabilityException.
     */
    data: XOR<AvailabilityExceptionUpdateInput, AvailabilityExceptionUncheckedUpdateInput>
    /**
     * Choose, which AvailabilityException to update.
     */
    where: AvailabilityExceptionWhereUniqueInput
  }

  /**
   * AvailabilityException updateMany
   */
  export type AvailabilityExceptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailabilityExceptions.
     */
    data: XOR<AvailabilityExceptionUpdateManyMutationInput, AvailabilityExceptionUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityExceptions to update
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * Limit how many AvailabilityExceptions to update.
     */
    limit?: number
  }

  /**
   * AvailabilityException updateManyAndReturn
   */
  export type AvailabilityExceptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * The data used to update AvailabilityExceptions.
     */
    data: XOR<AvailabilityExceptionUpdateManyMutationInput, AvailabilityExceptionUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityExceptions to update
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * Limit how many AvailabilityExceptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityException upsert
   */
  export type AvailabilityExceptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailabilityException to update in case it exists.
     */
    where: AvailabilityExceptionWhereUniqueInput
    /**
     * In case the AvailabilityException found by the `where` argument doesn't exist, create a new AvailabilityException with this data.
     */
    create: XOR<AvailabilityExceptionCreateInput, AvailabilityExceptionUncheckedCreateInput>
    /**
     * In case the AvailabilityException was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailabilityExceptionUpdateInput, AvailabilityExceptionUncheckedUpdateInput>
  }

  /**
   * AvailabilityException delete
   */
  export type AvailabilityExceptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
    /**
     * Filter which AvailabilityException to delete.
     */
    where: AvailabilityExceptionWhereUniqueInput
  }

  /**
   * AvailabilityException deleteMany
   */
  export type AvailabilityExceptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityExceptions to delete
     */
    where?: AvailabilityExceptionWhereInput
    /**
     * Limit how many AvailabilityExceptions to delete.
     */
    limit?: number
  }

  /**
   * AvailabilityException without action
   */
  export type AvailabilityExceptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: AvailabilityExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: AvailabilityExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityExceptionInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    practitionerId: string | null
    serviceId: string | null
    startAt: Date | null
    endAt: Date | null
    status: $Enums.AppointmentStatus | null
    cancellationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    practitionerId: string | null
    serviceId: string | null
    startAt: Date | null
    endAt: Date | null
    status: $Enums.AppointmentStatus | null
    cancellationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    clientId: number
    practitionerId: number
    serviceId: number
    startAt: number
    endAt: number
    status: number
    cancellationReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    clientId?: true
    practitionerId?: true
    serviceId?: true
    startAt?: true
    endAt?: true
    status?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    clientId?: true
    practitionerId?: true
    serviceId?: true
    startAt?: true
    endAt?: true
    status?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    clientId?: true
    practitionerId?: true
    serviceId?: true
    startAt?: true
    endAt?: true
    status?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    clientId: string
    practitionerId: string
    serviceId: string
    startAt: Date
    endAt: Date
    status: $Enums.AppointmentStatus
    cancellationReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    practitionerId?: boolean
    serviceId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    practitionerId?: boolean
    serviceId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    practitionerId?: boolean
    serviceId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    clientId?: boolean
    practitionerId?: boolean
    serviceId?: boolean
    startAt?: boolean
    endAt?: boolean
    status?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "practitionerId" | "serviceId" | "startAt" | "endAt" | "status" | "cancellationReason" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    practitioner?: boolean | PractitionerDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      practitioner: Prisma.$PractitionerPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      practitionerId: string
      serviceId: string
      startAt: Date
      endAt: Date
      status: $Enums.AppointmentStatus
      cancellationReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    practitioner<T extends PractitionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PractitionerDefaultArgs<ExtArgs>>): Prisma__PractitionerClient<$Result.GetResult<Prisma.$PractitionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly clientId: FieldRef<"Appointment", 'String'>
    readonly practitionerId: FieldRef<"Appointment", 'String'>
    readonly serviceId: FieldRef<"Appointment", 'String'>
    readonly startAt: FieldRef<"Appointment", 'DateTime'>
    readonly endAt: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly cancellationReason: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    active: 'active',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PractitionerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PractitionerScalarFieldEnum = (typeof PractitionerScalarFieldEnum)[keyof typeof PractitionerScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageUrl: 'imageUrl',
    benefits: 'benefits',
    steps: 'steps',
    faq: 'faq',
    duration: 'duration',
    price: 'price',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const WeeklyAvailabilityScalarFieldEnum: {
    id: 'id',
    practitionerId: 'practitionerId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeeklyAvailabilityScalarFieldEnum = (typeof WeeklyAvailabilityScalarFieldEnum)[keyof typeof WeeklyAvailabilityScalarFieldEnum]


  export const AvailabilityExceptionScalarFieldEnum: {
    id: 'id',
    practitionerId: 'practitionerId',
    date: 'date',
    type: 'type',
    startTime: 'startTime',
    endTime: 'endTime',
    reason: 'reason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AvailabilityExceptionScalarFieldEnum = (typeof AvailabilityExceptionScalarFieldEnum)[keyof typeof AvailabilityExceptionScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    practitionerId: 'practitionerId',
    serviceId: 'serviceId',
    startAt: 'startAt',
    endAt: 'endAt',
    status: 'status',
    cancellationReason: 'cancellationReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'ExceptionType'
   */
  export type EnumExceptionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExceptionType'>
    


  /**
   * Reference to a field of type 'ExceptionType[]'
   */
  export type ListEnumExceptionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExceptionType[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    practitioner?: XOR<PractitionerNullableScalarRelationFilter, PractitionerWhereInput> | null
    appointments?: AppointmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    practitioner?: PractitionerOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    practitioner?: XOR<PractitionerNullableScalarRelationFilter, PractitionerWhereInput> | null
    appointments?: AppointmentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PractitionerWhereInput = {
    AND?: PractitionerWhereInput | PractitionerWhereInput[]
    OR?: PractitionerWhereInput[]
    NOT?: PractitionerWhereInput | PractitionerWhereInput[]
    id?: StringFilter<"Practitioner"> | string
    userId?: StringFilter<"Practitioner"> | string
    createdAt?: DateTimeFilter<"Practitioner"> | Date | string
    updatedAt?: DateTimeFilter<"Practitioner"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    weeklyAvailabilities?: WeeklyAvailabilityListRelationFilter
    availabilityExceptions?: AvailabilityExceptionListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type PractitionerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
    weeklyAvailabilities?: WeeklyAvailabilityOrderByRelationAggregateInput
    availabilityExceptions?: AvailabilityExceptionOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type PractitionerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PractitionerWhereInput | PractitionerWhereInput[]
    OR?: PractitionerWhereInput[]
    NOT?: PractitionerWhereInput | PractitionerWhereInput[]
    createdAt?: DateTimeFilter<"Practitioner"> | Date | string
    updatedAt?: DateTimeFilter<"Practitioner"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    weeklyAvailabilities?: WeeklyAvailabilityListRelationFilter
    availabilityExceptions?: AvailabilityExceptionListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id" | "userId">

  export type PractitionerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PractitionerCountOrderByAggregateInput
    _max?: PractitionerMaxOrderByAggregateInput
    _min?: PractitionerMinOrderByAggregateInput
  }

  export type PractitionerScalarWhereWithAggregatesInput = {
    AND?: PractitionerScalarWhereWithAggregatesInput | PractitionerScalarWhereWithAggregatesInput[]
    OR?: PractitionerScalarWhereWithAggregatesInput[]
    NOT?: PractitionerScalarWhereWithAggregatesInput | PractitionerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Practitioner"> | string
    userId?: StringWithAggregatesFilter<"Practitioner"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Practitioner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Practitioner"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    imageUrl?: StringNullableFilter<"Service"> | string | null
    benefits?: StringNullableListFilter<"Service">
    steps?: StringNullableListFilter<"Service">
    faq?: JsonFilter<"Service">
    duration?: IntFilter<"Service"> | number
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    practitioners?: PractitionerListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    benefits?: SortOrder
    steps?: SortOrder
    faq?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    practitioners?: PractitionerOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    imageUrl?: StringNullableFilter<"Service"> | string | null
    benefits?: StringNullableListFilter<"Service">
    steps?: StringNullableListFilter<"Service">
    faq?: JsonFilter<"Service">
    duration?: IntFilter<"Service"> | number
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    practitioners?: PractitionerListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id" | "slug">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    benefits?: SortOrder
    steps?: SortOrder
    faq?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    slug?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Service"> | string | null
    benefits?: StringNullableListFilter<"Service">
    steps?: StringNullableListFilter<"Service">
    faq?: JsonWithAggregatesFilter<"Service">
    duration?: IntWithAggregatesFilter<"Service"> | number
    price?: DecimalWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string
    active?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type WeeklyAvailabilityWhereInput = {
    AND?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    OR?: WeeklyAvailabilityWhereInput[]
    NOT?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    id?: StringFilter<"WeeklyAvailability"> | string
    practitionerId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    startTime?: StringFilter<"WeeklyAvailability"> | string
    endTime?: StringFilter<"WeeklyAvailability"> | string
    active?: BoolFilter<"WeeklyAvailability"> | boolean
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
  }

  export type WeeklyAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    practitioner?: PractitionerOrderByWithRelationInput
  }

  export type WeeklyAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    OR?: WeeklyAvailabilityWhereInput[]
    NOT?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    practitionerId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    startTime?: StringFilter<"WeeklyAvailability"> | string
    endTime?: StringFilter<"WeeklyAvailability"> | string
    active?: BoolFilter<"WeeklyAvailability"> | boolean
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
  }, "id">

  export type WeeklyAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeeklyAvailabilityCountOrderByAggregateInput
    _max?: WeeklyAvailabilityMaxOrderByAggregateInput
    _min?: WeeklyAvailabilityMinOrderByAggregateInput
  }

  export type WeeklyAvailabilityScalarWhereWithAggregatesInput = {
    AND?: WeeklyAvailabilityScalarWhereWithAggregatesInput | WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    OR?: WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: WeeklyAvailabilityScalarWhereWithAggregatesInput | WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    practitionerId?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    startTime?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    endTime?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    active?: BoolWithAggregatesFilter<"WeeklyAvailability"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeeklyAvailability"> | Date | string
  }

  export type AvailabilityExceptionWhereInput = {
    AND?: AvailabilityExceptionWhereInput | AvailabilityExceptionWhereInput[]
    OR?: AvailabilityExceptionWhereInput[]
    NOT?: AvailabilityExceptionWhereInput | AvailabilityExceptionWhereInput[]
    id?: StringFilter<"AvailabilityException"> | string
    practitionerId?: StringFilter<"AvailabilityException"> | string
    date?: DateTimeFilter<"AvailabilityException"> | Date | string
    type?: EnumExceptionTypeFilter<"AvailabilityException"> | $Enums.ExceptionType
    startTime?: StringNullableFilter<"AvailabilityException"> | string | null
    endTime?: StringNullableFilter<"AvailabilityException"> | string | null
    reason?: StringNullableFilter<"AvailabilityException"> | string | null
    createdAt?: DateTimeFilter<"AvailabilityException"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityException"> | Date | string
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
  }

  export type AvailabilityExceptionOrderByWithRelationInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    practitioner?: PractitionerOrderByWithRelationInput
  }

  export type AvailabilityExceptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailabilityExceptionWhereInput | AvailabilityExceptionWhereInput[]
    OR?: AvailabilityExceptionWhereInput[]
    NOT?: AvailabilityExceptionWhereInput | AvailabilityExceptionWhereInput[]
    practitionerId?: StringFilter<"AvailabilityException"> | string
    date?: DateTimeFilter<"AvailabilityException"> | Date | string
    type?: EnumExceptionTypeFilter<"AvailabilityException"> | $Enums.ExceptionType
    startTime?: StringNullableFilter<"AvailabilityException"> | string | null
    endTime?: StringNullableFilter<"AvailabilityException"> | string | null
    reason?: StringNullableFilter<"AvailabilityException"> | string | null
    createdAt?: DateTimeFilter<"AvailabilityException"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityException"> | Date | string
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
  }, "id">

  export type AvailabilityExceptionOrderByWithAggregationInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AvailabilityExceptionCountOrderByAggregateInput
    _max?: AvailabilityExceptionMaxOrderByAggregateInput
    _min?: AvailabilityExceptionMinOrderByAggregateInput
  }

  export type AvailabilityExceptionScalarWhereWithAggregatesInput = {
    AND?: AvailabilityExceptionScalarWhereWithAggregatesInput | AvailabilityExceptionScalarWhereWithAggregatesInput[]
    OR?: AvailabilityExceptionScalarWhereWithAggregatesInput[]
    NOT?: AvailabilityExceptionScalarWhereWithAggregatesInput | AvailabilityExceptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailabilityException"> | string
    practitionerId?: StringWithAggregatesFilter<"AvailabilityException"> | string
    date?: DateTimeWithAggregatesFilter<"AvailabilityException"> | Date | string
    type?: EnumExceptionTypeWithAggregatesFilter<"AvailabilityException"> | $Enums.ExceptionType
    startTime?: StringNullableWithAggregatesFilter<"AvailabilityException"> | string | null
    endTime?: StringNullableWithAggregatesFilter<"AvailabilityException"> | string | null
    reason?: StringNullableWithAggregatesFilter<"AvailabilityException"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AvailabilityException"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AvailabilityException"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    practitionerId?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    practitionerId?: SortOrder
    serviceId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: UserOrderByWithRelationInput
    practitioner?: PractitionerOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    clientId?: StringFilter<"Appointment"> | string
    practitionerId?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    practitioner?: XOR<PractitionerScalarRelationFilter, PractitionerWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    practitionerId?: SortOrder
    serviceId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    clientId?: StringWithAggregatesFilter<"Appointment"> | string
    practitionerId?: StringWithAggregatesFilter<"Appointment"> | string
    serviceId?: StringWithAggregatesFilter<"Appointment"> | string
    startAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    cancellationReason?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner?: PractitionerCreateNestedOneWithoutUserInput
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner?: PractitionerUncheckedCreateNestedOneWithoutUserInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUpdateOneWithoutUserNestedInput
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUncheckedUpdateOneWithoutUserNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PractitionerCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPractitionerInput
    services?: ServiceCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPractitionerNestedInput
    services?: ServiceUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PractitionerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PractitionerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioners?: PractitionerCreateNestedManyWithoutServicesInput
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioners?: PractitionerUncheckedCreateNestedManyWithoutServicesInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioners?: PractitionerUpdateManyWithoutServicesNestedInput
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioners?: PractitionerUncheckedUpdateManyWithoutServicesNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityCreateInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner: PractitionerCreateNestedOneWithoutWeeklyAvailabilitiesInput
  }

  export type WeeklyAvailabilityUncheckedCreateInput = {
    id?: string
    practitionerId: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUpdateOneRequiredWithoutWeeklyAvailabilitiesNestedInput
  }

  export type WeeklyAvailabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityCreateManyInput = {
    id?: string
    practitionerId: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionCreateInput = {
    id?: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner: PractitionerCreateNestedOneWithoutAvailabilityExceptionsInput
  }

  export type AvailabilityExceptionUncheckedCreateInput = {
    id?: string
    practitionerId: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityExceptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUpdateOneRequiredWithoutAvailabilityExceptionsNestedInput
  }

  export type AvailabilityExceptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionCreateManyInput = {
    id?: string
    practitionerId: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityExceptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsInput
    practitioner: PractitionerCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    clientId: string
    practitionerId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    practitioner?: PractitionerUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    clientId: string
    practitionerId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PractitionerNullableScalarRelationFilter = {
    is?: PractitionerWhereInput | null
    isNot?: PractitionerWhereInput | null
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type WeeklyAvailabilityListRelationFilter = {
    every?: WeeklyAvailabilityWhereInput
    some?: WeeklyAvailabilityWhereInput
    none?: WeeklyAvailabilityWhereInput
  }

  export type AvailabilityExceptionListRelationFilter = {
    every?: AvailabilityExceptionWhereInput
    some?: AvailabilityExceptionWhereInput
    none?: AvailabilityExceptionWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvailabilityExceptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PractitionerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PractitionerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PractitionerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type PractitionerListRelationFilter = {
    every?: PractitionerWhereInput
    some?: PractitionerWhereInput
    none?: PractitionerWhereInput
  }

  export type PractitionerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    benefits?: SortOrder
    steps?: SortOrder
    faq?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type PractitionerScalarRelationFilter = {
    is?: PractitionerWhereInput
    isNot?: PractitionerWhereInput
  }

  export type WeeklyAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type EnumExceptionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExceptionType | EnumExceptionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExceptionTypeFilter<$PrismaModel> | $Enums.ExceptionType
  }

  export type AvailabilityExceptionCountOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailabilityExceptionMaxOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailabilityExceptionMinOrderByAggregateInput = {
    id?: SortOrder
    practitionerId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumExceptionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExceptionType | EnumExceptionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExceptionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExceptionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExceptionTypeFilter<$PrismaModel>
    _max?: NestedEnumExceptionTypeFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    practitionerId?: SortOrder
    serviceId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    practitionerId?: SortOrder
    serviceId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    practitionerId?: SortOrder
    serviceId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type PractitionerCreateNestedOneWithoutUserInput = {
    create?: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutUserInput
    connect?: PractitionerWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PractitionerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutUserInput
    connect?: PractitionerWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PractitionerUpdateOneWithoutUserNestedInput = {
    create?: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutUserInput
    upsert?: PractitionerUpsertWithoutUserInput
    disconnect?: PractitionerWhereInput | boolean
    delete?: PractitionerWhereInput | boolean
    connect?: PractitionerWhereUniqueInput
    update?: XOR<XOR<PractitionerUpdateToOneWithWhereWithoutUserInput, PractitionerUpdateWithoutUserInput>, PractitionerUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PractitionerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutUserInput
    upsert?: PractitionerUpsertWithoutUserInput
    disconnect?: PractitionerWhereInput | boolean
    delete?: PractitionerWhereInput | boolean
    connect?: PractitionerWhereUniqueInput
    update?: XOR<XOR<PractitionerUpdateToOneWithWhereWithoutUserInput, PractitionerUpdateWithoutUserInput>, PractitionerUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPractitionerInput = {
    create?: XOR<UserCreateWithoutPractitionerInput, UserUncheckedCreateWithoutPractitionerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPractitionerInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutPractitionersInput = {
    create?: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput> | ServiceCreateWithoutPractitionersInput[] | ServiceUncheckedCreateWithoutPractitionersInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPractitionersInput | ServiceCreateOrConnectWithoutPractitionersInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput> | WeeklyAvailabilityCreateWithoutPractitionerInput[] | WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput | WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput[]
    createMany?: WeeklyAvailabilityCreateManyPractitionerInputEnvelope
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
  }

  export type AvailabilityExceptionCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput> | AvailabilityExceptionCreateWithoutPractitionerInput[] | AvailabilityExceptionUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AvailabilityExceptionCreateOrConnectWithoutPractitionerInput | AvailabilityExceptionCreateOrConnectWithoutPractitionerInput[]
    createMany?: AvailabilityExceptionCreateManyPractitionerInputEnvelope
    connect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput> | AppointmentCreateWithoutPractitionerInput[] | AppointmentUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPractitionerInput | AppointmentCreateOrConnectWithoutPractitionerInput[]
    createMany?: AppointmentCreateManyPractitionerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutPractitionersInput = {
    create?: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput> | ServiceCreateWithoutPractitionersInput[] | ServiceUncheckedCreateWithoutPractitionersInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPractitionersInput | ServiceCreateOrConnectWithoutPractitionersInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput> | WeeklyAvailabilityCreateWithoutPractitionerInput[] | WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput | WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput[]
    createMany?: WeeklyAvailabilityCreateManyPractitionerInputEnvelope
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
  }

  export type AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput> | AvailabilityExceptionCreateWithoutPractitionerInput[] | AvailabilityExceptionUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AvailabilityExceptionCreateOrConnectWithoutPractitionerInput | AvailabilityExceptionCreateOrConnectWithoutPractitionerInput[]
    createMany?: AvailabilityExceptionCreateManyPractitionerInputEnvelope
    connect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPractitionerInput = {
    create?: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput> | AppointmentCreateWithoutPractitionerInput[] | AppointmentUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPractitionerInput | AppointmentCreateOrConnectWithoutPractitionerInput[]
    createMany?: AppointmentCreateManyPractitionerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPractitionerNestedInput = {
    create?: XOR<UserCreateWithoutPractitionerInput, UserUncheckedCreateWithoutPractitionerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPractitionerInput
    upsert?: UserUpsertWithoutPractitionerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPractitionerInput, UserUpdateWithoutPractitionerInput>, UserUncheckedUpdateWithoutPractitionerInput>
  }

  export type ServiceUpdateManyWithoutPractitionersNestedInput = {
    create?: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput> | ServiceCreateWithoutPractitionersInput[] | ServiceUncheckedCreateWithoutPractitionersInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPractitionersInput | ServiceCreateOrConnectWithoutPractitionersInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPractitionersInput | ServiceUpsertWithWhereUniqueWithoutPractitionersInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPractitionersInput | ServiceUpdateWithWhereUniqueWithoutPractitionersInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPractitionersInput | ServiceUpdateManyWithWhereWithoutPractitionersInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput> | WeeklyAvailabilityCreateWithoutPractitionerInput[] | WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput | WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput[]
    upsert?: WeeklyAvailabilityUpsertWithWhereUniqueWithoutPractitionerInput | WeeklyAvailabilityUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: WeeklyAvailabilityCreateManyPractitionerInputEnvelope
    set?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    disconnect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    delete?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    update?: WeeklyAvailabilityUpdateWithWhereUniqueWithoutPractitionerInput | WeeklyAvailabilityUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: WeeklyAvailabilityUpdateManyWithWhereWithoutPractitionerInput | WeeklyAvailabilityUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
  }

  export type AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput> | AvailabilityExceptionCreateWithoutPractitionerInput[] | AvailabilityExceptionUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AvailabilityExceptionCreateOrConnectWithoutPractitionerInput | AvailabilityExceptionCreateOrConnectWithoutPractitionerInput[]
    upsert?: AvailabilityExceptionUpsertWithWhereUniqueWithoutPractitionerInput | AvailabilityExceptionUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: AvailabilityExceptionCreateManyPractitionerInputEnvelope
    set?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    disconnect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    delete?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    connect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    update?: AvailabilityExceptionUpdateWithWhereUniqueWithoutPractitionerInput | AvailabilityExceptionUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: AvailabilityExceptionUpdateManyWithWhereWithoutPractitionerInput | AvailabilityExceptionUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: AvailabilityExceptionScalarWhereInput | AvailabilityExceptionScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput> | AppointmentCreateWithoutPractitionerInput[] | AppointmentUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPractitionerInput | AppointmentCreateOrConnectWithoutPractitionerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPractitionerInput | AppointmentUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: AppointmentCreateManyPractitionerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPractitionerInput | AppointmentUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPractitionerInput | AppointmentUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutPractitionersNestedInput = {
    create?: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput> | ServiceCreateWithoutPractitionersInput[] | ServiceUncheckedCreateWithoutPractitionersInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPractitionersInput | ServiceCreateOrConnectWithoutPractitionersInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPractitionersInput | ServiceUpsertWithWhereUniqueWithoutPractitionersInput[]
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPractitionersInput | ServiceUpdateWithWhereUniqueWithoutPractitionersInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPractitionersInput | ServiceUpdateManyWithWhereWithoutPractitionersInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput> | WeeklyAvailabilityCreateWithoutPractitionerInput[] | WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput | WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput[]
    upsert?: WeeklyAvailabilityUpsertWithWhereUniqueWithoutPractitionerInput | WeeklyAvailabilityUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: WeeklyAvailabilityCreateManyPractitionerInputEnvelope
    set?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    disconnect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    delete?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    update?: WeeklyAvailabilityUpdateWithWhereUniqueWithoutPractitionerInput | WeeklyAvailabilityUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: WeeklyAvailabilityUpdateManyWithWhereWithoutPractitionerInput | WeeklyAvailabilityUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
  }

  export type AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput> | AvailabilityExceptionCreateWithoutPractitionerInput[] | AvailabilityExceptionUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AvailabilityExceptionCreateOrConnectWithoutPractitionerInput | AvailabilityExceptionCreateOrConnectWithoutPractitionerInput[]
    upsert?: AvailabilityExceptionUpsertWithWhereUniqueWithoutPractitionerInput | AvailabilityExceptionUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: AvailabilityExceptionCreateManyPractitionerInputEnvelope
    set?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    disconnect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    delete?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    connect?: AvailabilityExceptionWhereUniqueInput | AvailabilityExceptionWhereUniqueInput[]
    update?: AvailabilityExceptionUpdateWithWhereUniqueWithoutPractitionerInput | AvailabilityExceptionUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: AvailabilityExceptionUpdateManyWithWhereWithoutPractitionerInput | AvailabilityExceptionUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: AvailabilityExceptionScalarWhereInput | AvailabilityExceptionScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput = {
    create?: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput> | AppointmentCreateWithoutPractitionerInput[] | AppointmentUncheckedCreateWithoutPractitionerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPractitionerInput | AppointmentCreateOrConnectWithoutPractitionerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPractitionerInput | AppointmentUpsertWithWhereUniqueWithoutPractitionerInput[]
    createMany?: AppointmentCreateManyPractitionerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPractitionerInput | AppointmentUpdateWithWhereUniqueWithoutPractitionerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPractitionerInput | AppointmentUpdateManyWithWhereWithoutPractitionerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ServiceCreatebenefitsInput = {
    set: string[]
  }

  export type ServiceCreatestepsInput = {
    set: string[]
  }

  export type PractitionerCreateNestedManyWithoutServicesInput = {
    create?: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput> | PractitionerCreateWithoutServicesInput[] | PractitionerUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: PractitionerCreateOrConnectWithoutServicesInput | PractitionerCreateOrConnectWithoutServicesInput[]
    connect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PractitionerUncheckedCreateNestedManyWithoutServicesInput = {
    create?: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput> | PractitionerCreateWithoutServicesInput[] | PractitionerUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: PractitionerCreateOrConnectWithoutServicesInput | PractitionerCreateOrConnectWithoutServicesInput[]
    connect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ServiceUpdatebenefitsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ServiceUpdatestepsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type PractitionerUpdateManyWithoutServicesNestedInput = {
    create?: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput> | PractitionerCreateWithoutServicesInput[] | PractitionerUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: PractitionerCreateOrConnectWithoutServicesInput | PractitionerCreateOrConnectWithoutServicesInput[]
    upsert?: PractitionerUpsertWithWhereUniqueWithoutServicesInput | PractitionerUpsertWithWhereUniqueWithoutServicesInput[]
    set?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    disconnect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    delete?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    connect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    update?: PractitionerUpdateWithWhereUniqueWithoutServicesInput | PractitionerUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: PractitionerUpdateManyWithWhereWithoutServicesInput | PractitionerUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: PractitionerScalarWhereInput | PractitionerScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PractitionerUncheckedUpdateManyWithoutServicesNestedInput = {
    create?: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput> | PractitionerCreateWithoutServicesInput[] | PractitionerUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: PractitionerCreateOrConnectWithoutServicesInput | PractitionerCreateOrConnectWithoutServicesInput[]
    upsert?: PractitionerUpsertWithWhereUniqueWithoutServicesInput | PractitionerUpsertWithWhereUniqueWithoutServicesInput[]
    set?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    disconnect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    delete?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    connect?: PractitionerWhereUniqueInput | PractitionerWhereUniqueInput[]
    update?: PractitionerUpdateWithWhereUniqueWithoutServicesInput | PractitionerUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: PractitionerUpdateManyWithWhereWithoutServicesInput | PractitionerUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: PractitionerScalarWhereInput | PractitionerScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PractitionerCreateNestedOneWithoutWeeklyAvailabilitiesInput = {
    create?: XOR<PractitionerCreateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedCreateWithoutWeeklyAvailabilitiesInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutWeeklyAvailabilitiesInput
    connect?: PractitionerWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type PractitionerUpdateOneRequiredWithoutWeeklyAvailabilitiesNestedInput = {
    create?: XOR<PractitionerCreateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedCreateWithoutWeeklyAvailabilitiesInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutWeeklyAvailabilitiesInput
    upsert?: PractitionerUpsertWithoutWeeklyAvailabilitiesInput
    connect?: PractitionerWhereUniqueInput
    update?: XOR<XOR<PractitionerUpdateToOneWithWhereWithoutWeeklyAvailabilitiesInput, PractitionerUpdateWithoutWeeklyAvailabilitiesInput>, PractitionerUncheckedUpdateWithoutWeeklyAvailabilitiesInput>
  }

  export type PractitionerCreateNestedOneWithoutAvailabilityExceptionsInput = {
    create?: XOR<PractitionerCreateWithoutAvailabilityExceptionsInput, PractitionerUncheckedCreateWithoutAvailabilityExceptionsInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutAvailabilityExceptionsInput
    connect?: PractitionerWhereUniqueInput
  }

  export type EnumExceptionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExceptionType
  }

  export type PractitionerUpdateOneRequiredWithoutAvailabilityExceptionsNestedInput = {
    create?: XOR<PractitionerCreateWithoutAvailabilityExceptionsInput, PractitionerUncheckedCreateWithoutAvailabilityExceptionsInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutAvailabilityExceptionsInput
    upsert?: PractitionerUpsertWithoutAvailabilityExceptionsInput
    connect?: PractitionerWhereUniqueInput
    update?: XOR<XOR<PractitionerUpdateToOneWithWhereWithoutAvailabilityExceptionsInput, PractitionerUpdateWithoutAvailabilityExceptionsInput>, PractitionerUncheckedUpdateWithoutAvailabilityExceptionsInput>
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type PractitionerCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PractitionerCreateWithoutAppointmentsInput, PractitionerUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutAppointmentsInput
    connect?: PractitionerWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PractitionerUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PractitionerCreateWithoutAppointmentsInput, PractitionerUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PractitionerCreateOrConnectWithoutAppointmentsInput
    upsert?: PractitionerUpsertWithoutAppointmentsInput
    connect?: PractitionerWhereUniqueInput
    update?: XOR<XOR<PractitionerUpdateToOneWithWhereWithoutAppointmentsInput, PractitionerUpdateWithoutAppointmentsInput>, PractitionerUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    upsert?: ServiceUpsertWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAppointmentsInput, ServiceUpdateWithoutAppointmentsInput>, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type NestedEnumExceptionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExceptionType | EnumExceptionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExceptionTypeFilter<$PrismaModel> | $Enums.ExceptionType
  }

  export type NestedEnumExceptionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExceptionType | EnumExceptionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExceptionType[] | ListEnumExceptionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExceptionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExceptionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExceptionTypeFilter<$PrismaModel>
    _max?: NestedEnumExceptionTypeFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type PractitionerCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerCreateOrConnectWithoutUserInput = {
    where: PractitionerWhereUniqueInput
    create: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateWithoutClientInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner: PractitionerCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClientInput = {
    id?: string
    practitionerId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentCreateManyClientInputEnvelope = {
    data: AppointmentCreateManyClientInput | AppointmentCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type PractitionerUpsertWithoutUserInput = {
    update: XOR<PractitionerUpdateWithoutUserInput, PractitionerUncheckedUpdateWithoutUserInput>
    create: XOR<PractitionerCreateWithoutUserInput, PractitionerUncheckedCreateWithoutUserInput>
    where?: PractitionerWhereInput
  }

  export type PractitionerUpdateToOneWithWhereWithoutUserInput = {
    where?: PractitionerWhereInput
    data: XOR<PractitionerUpdateWithoutUserInput, PractitionerUncheckedUpdateWithoutUserInput>
  }

  export type PractitionerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    practitionerId?: StringFilter<"Appointment"> | string
    serviceId?: StringFilter<"Appointment"> | string
    startAt?: DateTimeFilter<"Appointment"> | Date | string
    endAt?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type UserCreateWithoutPractitionerInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutPractitionerInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutPractitionerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPractitionerInput, UserUncheckedCreateWithoutPractitionerInput>
  }

  export type ServiceCreateWithoutPractitionersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutPractitionersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPractitionersInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput>
  }

  export type WeeklyAvailabilityCreateWithoutPractitionerInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityCreateOrConnectWithoutPractitionerInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    create: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput>
  }

  export type WeeklyAvailabilityCreateManyPractitionerInputEnvelope = {
    data: WeeklyAvailabilityCreateManyPractitionerInput | WeeklyAvailabilityCreateManyPractitionerInput[]
    skipDuplicates?: boolean
  }

  export type AvailabilityExceptionCreateWithoutPractitionerInput = {
    id?: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityExceptionUncheckedCreateWithoutPractitionerInput = {
    id?: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityExceptionCreateOrConnectWithoutPractitionerInput = {
    where: AvailabilityExceptionWhereUniqueInput
    create: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput>
  }

  export type AvailabilityExceptionCreateManyPractitionerInputEnvelope = {
    data: AvailabilityExceptionCreateManyPractitionerInput | AvailabilityExceptionCreateManyPractitionerInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutPractitionerInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPractitionerInput = {
    id?: string
    clientId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutPractitionerInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput>
  }

  export type AppointmentCreateManyPractitionerInputEnvelope = {
    data: AppointmentCreateManyPractitionerInput | AppointmentCreateManyPractitionerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPractitionerInput = {
    update: XOR<UserUpdateWithoutPractitionerInput, UserUncheckedUpdateWithoutPractitionerInput>
    create: XOR<UserCreateWithoutPractitionerInput, UserUncheckedCreateWithoutPractitionerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPractitionerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPractitionerInput, UserUncheckedUpdateWithoutPractitionerInput>
  }

  export type UserUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ServiceUpsertWithWhereUniqueWithoutPractitionersInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutPractitionersInput, ServiceUncheckedUpdateWithoutPractitionersInput>
    create: XOR<ServiceCreateWithoutPractitionersInput, ServiceUncheckedCreateWithoutPractitionersInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutPractitionersInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutPractitionersInput, ServiceUncheckedUpdateWithoutPractitionersInput>
  }

  export type ServiceUpdateManyWithWhereWithoutPractitionersInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutPractitionersInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    imageUrl?: StringNullableFilter<"Service"> | string | null
    benefits?: StringNullableListFilter<"Service">
    steps?: StringNullableListFilter<"Service">
    faq?: JsonFilter<"Service">
    duration?: IntFilter<"Service"> | number
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    active?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type WeeklyAvailabilityUpsertWithWhereUniqueWithoutPractitionerInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    update: XOR<WeeklyAvailabilityUpdateWithoutPractitionerInput, WeeklyAvailabilityUncheckedUpdateWithoutPractitionerInput>
    create: XOR<WeeklyAvailabilityCreateWithoutPractitionerInput, WeeklyAvailabilityUncheckedCreateWithoutPractitionerInput>
  }

  export type WeeklyAvailabilityUpdateWithWhereUniqueWithoutPractitionerInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    data: XOR<WeeklyAvailabilityUpdateWithoutPractitionerInput, WeeklyAvailabilityUncheckedUpdateWithoutPractitionerInput>
  }

  export type WeeklyAvailabilityUpdateManyWithWhereWithoutPractitionerInput = {
    where: WeeklyAvailabilityScalarWhereInput
    data: XOR<WeeklyAvailabilityUpdateManyMutationInput, WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerInput>
  }

  export type WeeklyAvailabilityScalarWhereInput = {
    AND?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
    OR?: WeeklyAvailabilityScalarWhereInput[]
    NOT?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
    id?: StringFilter<"WeeklyAvailability"> | string
    practitionerId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    startTime?: StringFilter<"WeeklyAvailability"> | string
    endTime?: StringFilter<"WeeklyAvailability"> | string
    active?: BoolFilter<"WeeklyAvailability"> | boolean
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
  }

  export type AvailabilityExceptionUpsertWithWhereUniqueWithoutPractitionerInput = {
    where: AvailabilityExceptionWhereUniqueInput
    update: XOR<AvailabilityExceptionUpdateWithoutPractitionerInput, AvailabilityExceptionUncheckedUpdateWithoutPractitionerInput>
    create: XOR<AvailabilityExceptionCreateWithoutPractitionerInput, AvailabilityExceptionUncheckedCreateWithoutPractitionerInput>
  }

  export type AvailabilityExceptionUpdateWithWhereUniqueWithoutPractitionerInput = {
    where: AvailabilityExceptionWhereUniqueInput
    data: XOR<AvailabilityExceptionUpdateWithoutPractitionerInput, AvailabilityExceptionUncheckedUpdateWithoutPractitionerInput>
  }

  export type AvailabilityExceptionUpdateManyWithWhereWithoutPractitionerInput = {
    where: AvailabilityExceptionScalarWhereInput
    data: XOR<AvailabilityExceptionUpdateManyMutationInput, AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerInput>
  }

  export type AvailabilityExceptionScalarWhereInput = {
    AND?: AvailabilityExceptionScalarWhereInput | AvailabilityExceptionScalarWhereInput[]
    OR?: AvailabilityExceptionScalarWhereInput[]
    NOT?: AvailabilityExceptionScalarWhereInput | AvailabilityExceptionScalarWhereInput[]
    id?: StringFilter<"AvailabilityException"> | string
    practitionerId?: StringFilter<"AvailabilityException"> | string
    date?: DateTimeFilter<"AvailabilityException"> | Date | string
    type?: EnumExceptionTypeFilter<"AvailabilityException"> | $Enums.ExceptionType
    startTime?: StringNullableFilter<"AvailabilityException"> | string | null
    endTime?: StringNullableFilter<"AvailabilityException"> | string | null
    reason?: StringNullableFilter<"AvailabilityException"> | string | null
    createdAt?: DateTimeFilter<"AvailabilityException"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityException"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPractitionerInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPractitionerInput, AppointmentUncheckedUpdateWithoutPractitionerInput>
    create: XOR<AppointmentCreateWithoutPractitionerInput, AppointmentUncheckedCreateWithoutPractitionerInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPractitionerInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPractitionerInput, AppointmentUncheckedUpdateWithoutPractitionerInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPractitionerInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPractitionerInput>
  }

  export type PractitionerCreateWithoutServicesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPractitionerInput
    weeklyAvailabilities?: WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateWithoutServicesInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerCreateOrConnectWithoutServicesInput = {
    where: PractitionerWhereUniqueInput
    create: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput>
  }

  export type AppointmentCreateWithoutServiceInput = {
    id?: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutAppointmentsInput
    practitioner: PractitionerCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutServiceInput = {
    id?: string
    clientId: string
    practitionerId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentCreateManyServiceInputEnvelope = {
    data: AppointmentCreateManyServiceInput | AppointmentCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type PractitionerUpsertWithWhereUniqueWithoutServicesInput = {
    where: PractitionerWhereUniqueInput
    update: XOR<PractitionerUpdateWithoutServicesInput, PractitionerUncheckedUpdateWithoutServicesInput>
    create: XOR<PractitionerCreateWithoutServicesInput, PractitionerUncheckedCreateWithoutServicesInput>
  }

  export type PractitionerUpdateWithWhereUniqueWithoutServicesInput = {
    where: PractitionerWhereUniqueInput
    data: XOR<PractitionerUpdateWithoutServicesInput, PractitionerUncheckedUpdateWithoutServicesInput>
  }

  export type PractitionerUpdateManyWithWhereWithoutServicesInput = {
    where: PractitionerScalarWhereInput
    data: XOR<PractitionerUpdateManyMutationInput, PractitionerUncheckedUpdateManyWithoutServicesInput>
  }

  export type PractitionerScalarWhereInput = {
    AND?: PractitionerScalarWhereInput | PractitionerScalarWhereInput[]
    OR?: PractitionerScalarWhereInput[]
    NOT?: PractitionerScalarWhereInput | PractitionerScalarWhereInput[]
    id?: StringFilter<"Practitioner"> | string
    userId?: StringFilter<"Practitioner"> | string
    createdAt?: DateTimeFilter<"Practitioner"> | Date | string
    updatedAt?: DateTimeFilter<"Practitioner"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutServiceInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutServiceInput>
  }

  export type PractitionerCreateWithoutWeeklyAvailabilitiesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPractitionerInput
    services?: ServiceCreateNestedManyWithoutPractitionersInput
    availabilityExceptions?: AvailabilityExceptionCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateWithoutWeeklyAvailabilitiesInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPractitionersInput
    availabilityExceptions?: AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerCreateOrConnectWithoutWeeklyAvailabilitiesInput = {
    where: PractitionerWhereUniqueInput
    create: XOR<PractitionerCreateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedCreateWithoutWeeklyAvailabilitiesInput>
  }

  export type PractitionerUpsertWithoutWeeklyAvailabilitiesInput = {
    update: XOR<PractitionerUpdateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedUpdateWithoutWeeklyAvailabilitiesInput>
    create: XOR<PractitionerCreateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedCreateWithoutWeeklyAvailabilitiesInput>
    where?: PractitionerWhereInput
  }

  export type PractitionerUpdateToOneWithWhereWithoutWeeklyAvailabilitiesInput = {
    where?: PractitionerWhereInput
    data: XOR<PractitionerUpdateWithoutWeeklyAvailabilitiesInput, PractitionerUncheckedUpdateWithoutWeeklyAvailabilitiesInput>
  }

  export type PractitionerUpdateWithoutWeeklyAvailabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPractitionerNestedInput
    services?: ServiceUpdateManyWithoutPractitionersNestedInput
    availabilityExceptions?: AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateWithoutWeeklyAvailabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPractitionersNestedInput
    availabilityExceptions?: AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerCreateWithoutAvailabilityExceptionsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPractitionerInput
    services?: ServiceCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateWithoutAvailabilityExceptionsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerCreateOrConnectWithoutAvailabilityExceptionsInput = {
    where: PractitionerWhereUniqueInput
    create: XOR<PractitionerCreateWithoutAvailabilityExceptionsInput, PractitionerUncheckedCreateWithoutAvailabilityExceptionsInput>
  }

  export type PractitionerUpsertWithoutAvailabilityExceptionsInput = {
    update: XOR<PractitionerUpdateWithoutAvailabilityExceptionsInput, PractitionerUncheckedUpdateWithoutAvailabilityExceptionsInput>
    create: XOR<PractitionerCreateWithoutAvailabilityExceptionsInput, PractitionerUncheckedCreateWithoutAvailabilityExceptionsInput>
    where?: PractitionerWhereInput
  }

  export type PractitionerUpdateToOneWithWhereWithoutAvailabilityExceptionsInput = {
    where?: PractitionerWhereInput
    data: XOR<PractitionerUpdateWithoutAvailabilityExceptionsInput, PractitionerUncheckedUpdateWithoutAvailabilityExceptionsInput>
  }

  export type PractitionerUpdateWithoutAvailabilityExceptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPractitionerNestedInput
    services?: ServiceUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateWithoutAvailabilityExceptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type UserCreateWithoutAppointmentsInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner?: PractitionerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    email: string
    password?: string | null
    firstName: string
    lastName: string
    phone?: string | null
    active?: boolean
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioner?: PractitionerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type PractitionerCreateWithoutAppointmentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPractitionerInput
    services?: ServiceCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPractitionersInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutPractitionerInput
    availabilityExceptions?: AvailabilityExceptionUncheckedCreateNestedManyWithoutPractitionerInput
  }

  export type PractitionerCreateOrConnectWithoutAppointmentsInput = {
    where: PractitionerWhereUniqueInput
    create: XOR<PractitionerCreateWithoutAppointmentsInput, PractitionerUncheckedCreateWithoutAppointmentsInput>
  }

  export type ServiceCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioners?: PractitionerCreateNestedManyWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    benefits?: ServiceCreatebenefitsInput | string[]
    steps?: ServiceCreatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration: number
    price: Decimal | DecimalJsLike | number | string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    practitioners?: PractitionerUncheckedCreateNestedManyWithoutServicesInput
  }

  export type ServiceCreateOrConnectWithoutAppointmentsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PractitionerUpsertWithoutAppointmentsInput = {
    update: XOR<PractitionerUpdateWithoutAppointmentsInput, PractitionerUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PractitionerCreateWithoutAppointmentsInput, PractitionerUncheckedCreateWithoutAppointmentsInput>
    where?: PractitionerWhereInput
  }

  export type PractitionerUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PractitionerWhereInput
    data: XOR<PractitionerUpdateWithoutAppointmentsInput, PractitionerUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PractitionerUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPractitionerNestedInput
    services?: ServiceUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPractitionersNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type ServiceUpsertWithoutAppointmentsInput = {
    update: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioners?: PractitionerUpdateManyWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioners?: PractitionerUncheckedUpdateManyWithoutServicesNestedInput
  }

  export type AppointmentCreateManyClientInput = {
    id?: string
    practitionerId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    practitioner?: PractitionerUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityCreateManyPractitionerInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    startTime: string
    endTime: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityExceptionCreateManyPractitionerInput = {
    id?: string
    date: Date | string
    type: $Enums.ExceptionType
    startTime?: string | null
    endTime?: string | null
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyPractitionerInput = {
    id?: string
    clientId: string
    serviceId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutPractitionersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPractitionersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutPractitionersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: ServiceUpdatebenefitsInput | string[]
    steps?: ServiceUpdatestepsInput | string[]
    faq?: JsonNullValueInput | InputJsonValue
    duration?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUncheckedUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionUncheckedUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExceptionTypeFieldUpdateOperationsInput | $Enums.ExceptionType
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPractitionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyServiceInput = {
    id?: string
    clientId: string
    practitionerId: string
    startAt: Date | string
    endAt: Date | string
    status?: $Enums.AppointmentStatus
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PractitionerUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPractitionerNestedInput
    weeklyAvailabilities?: WeeklyAvailabilityUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weeklyAvailabilities?: WeeklyAvailabilityUncheckedUpdateManyWithoutPractitionerNestedInput
    availabilityExceptions?: AvailabilityExceptionUncheckedUpdateManyWithoutPractitionerNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPractitionerNestedInput
  }

  export type PractitionerUncheckedUpdateManyWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    practitioner?: PractitionerUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    practitionerId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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