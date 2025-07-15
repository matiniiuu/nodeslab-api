export enum RegionTypeEnum {
    local = 'local',
    regional = 'regional',
    global = 'global',
}

export enum BundleActivationPolicyEnum {
    firstInstallation = 'firstInstallation',
    firstUsage = 'firstUsage',
}

export enum BundleDataAmountUnitEnum {
    MB = 'MB',
    GB = 'GB',
}

export enum BundleDurationUnitEnum {
    days = 'days',
}

export enum BundleUnlimitedTypeEnum {
    day = 'day',
    dataAmount = 'dataAmount',
}

export enum BundleProviderEnum {
    airalo = 'airalo',
    esimAccess = 'esimAccess',
}

export enum BundleSmsStatusEnum {
    // supported = 'supported',
    notSupported = 'notSupported',
    receiveOnly = 'receiveOnly',
    dashboardOnly = 'dashboardOnly',
}

export enum BundlePlanTypeEnum {
    dataOnly = 'dataOnly',
    dataVoiceText = 'dataVoiceText',
}
