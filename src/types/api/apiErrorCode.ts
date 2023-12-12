/**
 * Kriptonio Private API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: private
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export type ApiErrorCode = 10000 | 10001 | 10002 | 10003 | 10004 | 10005 | 10006 | 10007 | 10008 | 10009 | 10010 | 10011 | 10012 | 10013 | 10014 | 10015 | 10016 | 10017 | 10018 | 10019 | 10020 | 10021 | 10022 | 10023 | 10024 | 10025 | 10026 | 10027 | 10028 | 10029 | 10030 | 10031 | 10032 | 10033 | 10034 | 10035 | 10036 | 10037 | 10038 | 10039 | 10040 | 10041 | 10042 | 10043 | 10044 | 10045 | 10046 | 10047 | 10048 | 10049 | 10050 | 10051 | 10052 | 10053 | 10054 | 10055 | 10056 | 10057 | 10058 | 10059 | 10060 | 10061 | 10062 | 10063 | 10064 | 10065 | 10066 | 10067 | 10068 | 10069 | 10070 | 10071 | 10072 | 10073 | 10074 | 10075 | 10076 | 10077 | 10078 | 10079 | 10080 | 10081 | 10082;

export const ApiErrorCode = {
    Unknown: 10000 as ApiErrorCode,
    Unauthorized: 10001 as ApiErrorCode,
    SubscriptionQuotaExceeded: 10002 as ApiErrorCode,
    Forbidden: 10003 as ApiErrorCode,
    CompilationFailed: 10004 as ApiErrorCode,
    WalletServiceTemporaryUnavailable: 10005 as ApiErrorCode,
    GetContractsFailed: 10006 as ApiErrorCode,
    UserNotFound: 10007 as ApiErrorCode,
    FormValidationFailed: 10008 as ApiErrorCode,
    OrganizationNotFound: 10009 as ApiErrorCode,
    CannotCreateWallet: 10010 as ApiErrorCode,
    UserAlreadyExist: 10011 as ApiErrorCode,
    TokenNotFound: 10012 as ApiErrorCode,
    SmartContractNotFound: 10013 as ApiErrorCode,
    WalletNotFound: 10014 as ApiErrorCode,
    SmartContractNotDeployed: 10015 as ApiErrorCode,
    SmartContractDeploymentFailed: 10016 as ApiErrorCode,
    EstimationFailed: 10017 as ApiErrorCode,
    PasswordWeak: 10018 as ApiErrorCode,
    TwoFactorAlreadyEnabled: 10019 as ApiErrorCode,
    TwoFactorMissingSetup: 10020 as ApiErrorCode,
    TwoFactorCodeInvalid: 10021 as ApiErrorCode,
    TwoFactorNotEnabled: 10022 as ApiErrorCode,
    TwoFactorTooManyFailedAttempts: 10023 as ApiErrorCode,
    MissingTwoFactorCode: 10024 as ApiErrorCode,
    ContractPreparationFailed: 10025 as ApiErrorCode,
    ActivationMissing: 10026 as ApiErrorCode,
    BlockchainNotFound: 10027 as ApiErrorCode,
    BlockchainEndpointNotFound: 10028 as ApiErrorCode,
    SubscriptionPlanNotFound: 10029 as ApiErrorCode,
    BlockchainEndpointCreationFailed: 10030 as ApiErrorCode,
    GetBlockchainEndpointFailed: 10031 as ApiErrorCode,
    SolCompilerTemporaryUnavailable: 10032 as ApiErrorCode,
    BlockchainEndpointServiceTemporaryUnavailable: 10033 as ApiErrorCode,
    GetBlockchainEndpointCallsFailed: 10034 as ApiErrorCode,
    GetBlockchainEndpointMethodUsageFailed: 10035 as ApiErrorCode,
    GetBlockchainEndpointUsageFailed: 10036 as ApiErrorCode,
    GetBlockchainEndpointCallStatsFailed: 10037 as ApiErrorCode,
    DeleteBlockchainEndpointFailed: 10038 as ApiErrorCode,
    GetBlockchainEndpointsFailed: 10039 as ApiErrorCode,
    CannotGetUserInfo: 10040 as ApiErrorCode,
    UserAuthenticatedWithDifferentMethod: 10041 as ApiErrorCode,
    InvalidAccessToken: 10042 as ApiErrorCode,
    CannotActivateAuthMethod: 10043 as ApiErrorCode,
    RpcCallFailed: 10044 as ApiErrorCode,
    RpcRequestFailed: 10045 as ApiErrorCode,
    WalletPasswordNotStrongEnough: 10046 as ApiErrorCode,
    CannotChangeWalletPassword: 10047 as ApiErrorCode,
    CannotGenerateSlug: 10048 as ApiErrorCode,
    UserAlreadyInvited: 10049 as ApiErrorCode,
    InvitationNotFound: 10050 as ApiErrorCode,
    InvitationEmailMismatch: 10051 as ApiErrorCode,
    CannotInviteToPersonalOrganization: 10052 as ApiErrorCode,
    CannotUpdatePersonalOrganization: 10053 as ApiErrorCode,
    CannotRemoveYourself: 10054 as ApiErrorCode,
    MemberNotFound: 10055 as ApiErrorCode,
    SubscriptionProductNotFound: 10056 as ApiErrorCode,
    SubscriptionMetadataNotFound: 10057 as ApiErrorCode,
    PaymentSessionMissing: 10058 as ApiErrorCode,
    CannotFindActiveSubscription: 10059 as ApiErrorCode,
    SubscriptionNotFound: 10060 as ApiErrorCode,
    CannotFindSubscriptionLimit: 10061 as ApiErrorCode,
    SubscriptionDataMissing: 10062 as ApiErrorCode,
    GetOrganizationEndpointConsumptionFailed: 10063 as ApiErrorCode,
    OAuthDataIncomplete: 10064 as ApiErrorCode,
    AppleVerificationFailed: 10065 as ApiErrorCode,
    OAuthEmailMissing: 10066 as ApiErrorCode,
    WalletUsedBySmartContracts: 10067 as ApiErrorCode,
    EmailMissing: 10068 as ApiErrorCode,
    InvalidCode: 10069 as ApiErrorCode,
    TemplateNotFound: 10070 as ApiErrorCode,
    TemplateInputInvalid: 10071 as ApiErrorCode,
    SmartContractNotBelongToOrganization: 10072 as ApiErrorCode,
    UserNotActive: 10073 as ApiErrorCode,
    OrganizationCacheClearFailed: 10074 as ApiErrorCode,
    CannotReadRequest: 10075 as ApiErrorCode,
    PaymasterServiceUnavailable: 10076 as ApiErrorCode,
    CreatePaymasterFailed: 10077 as ApiErrorCode,
    GetPaymasterFailed: 10078 as ApiErrorCode,
    UnsupportedFeature: 10079 as ApiErrorCode,
    PaymasterEndpointNotFound: 10080 as ApiErrorCode,
    CannotResolveRpcCallDetails: 10081 as ApiErrorCode,
    WalletPasswordMissing: 10082 as ApiErrorCode
};

