/**
 * A CSP Directive Poroperty
 */
type CSPDirective = string | string[];

/**
 * A CSP Config
 */
type CSPConfig = {
    "base-uri"?: CSPDirective;
    "child-src"?: CSPDirective;
    "connect-src"?: CSPDirective;
    "default-src"?: CSPDirective;
    "font-src"?: CSPDirective;
    "form-action"?: CSPDirective;
    "frame-ancestors"?: CSPDirective;
    "frame-src"?: CSPDirective;
    "img-src"?: CSPDirective;
    "manifest-src"?: CSPDirective;
    "media-src"?: CSPDirective;
    "object-src"?: CSPDirective;
    "prefetch-src"?: CSPDirective;
    "script-src"?: CSPDirective;
    "style-src"?: CSPDirective;
    "worker-src"?: CSPDirective;
    "block-all-mixed-content"?: CSPDirective;
    "plugin-types"?: CSPDirective;
    "navigate-to"?: CSPDirective;
    "require-sri-for"?: CSPDirective;
    "require-trusted-types-for"?: CSPDirective;
    sandbox?: CSPDirective;
    "script-src-attr"?: CSPDirective;
    "script-src-elem"?: CSPDirective;
    "style-src-attr"?: CSPDirective;
    "style-src-elem"?: CSPDirective;
    "trusted-types"?: CSPDirective;
    "upgrade-insecure-requests"?: CSPDirective;
    "report-to"?: CSPDirective;
    "report-uri"?: CSPDirective;
    reportOnly?: boolean;
};

/**
 * Response header key-value pair
 */
type Header = {
    key: string;
    value: string;
};

type HeaderConfig = string | false;

type PermPolicyDirectiveList =
    | "experimental"
    | "legacy"
    | "proposed"
    | "standard";

/**
 * nextSafe's primary config object
 */
type NextSafeConfig = {
    contentTypeOptions?: HeaderConfig;
    contentSecurityPolicy?: CSPConfig | false;
    frameOptions?: HeaderConfig;
    permissionsPolicy?:
        | {
              [key: string]: string | false;
          }
        | false;
    permissionsPolicyDirectiveSupport?: PermPolicyDirectiveList[];
    isDev?: boolean;
    referrerPolicy?: HeaderConfig;
    xssProtection?: HeaderConfig;
};

type MakeHeaderObj = (
    key: string,
    value: string | false,
    defaultValue: string,
) => Header;

declare namespace nextSafe {
    export {
        NextSafeConfig,
        Header,
        HeaderConfig,
        CSPConfig,
        CSPDirective,
        MakeHeaderObj,
    };
}

declare function nextSafe(options?: NextSafeConfig): Header[];

export = nextSafe;
