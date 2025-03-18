import { Layer2ResolverAbi, Layer2ResolverAddress } from "@/lib/Layer2Resolver";
import {
    Address,
    ContractFunctionParameters,
    createPublicClient,
    encodePacked,
    http,
    keccak256,
    namehash,
} from "viem";
import { base, mainnet } from "viem/chains";

export type Basename = `${string}.base.eth`;

export enum BasenameTextRecordKeys {
    Header = "header",
    Avatar = "avatar",
    Display = "display",
    Description = "description",
    Keywords = "keywords",
    Mail = "mail",
    Location = "location",
    Url = "url",
    Email = "email",
    Phone = "phone",
    Github = "com.github",
    Twitter = "com.twitter",
    Farcaster = "xyz.farcaster",
    Lens = "xyz.lens",
    Telegram = "org.telegram",
    Discord = "com.discord",
}

export const textRecordsKeysEnabled = [
    BasenameTextRecordKeys.Header,
    BasenameTextRecordKeys.Avatar,
    BasenameTextRecordKeys.Display,
    BasenameTextRecordKeys.Description,
    BasenameTextRecordKeys.Keywords,
    BasenameTextRecordKeys.Mail,
    BasenameTextRecordKeys.Location,
    BasenameTextRecordKeys.Url,
    BasenameTextRecordKeys.Github,
    BasenameTextRecordKeys.Email,
    BasenameTextRecordKeys.Phone,
    BasenameTextRecordKeys.Twitter,
    BasenameTextRecordKeys.Farcaster,
    BasenameTextRecordKeys.Lens,
    BasenameTextRecordKeys.Telegram,
    BasenameTextRecordKeys.Discord,
];

const baseClient = createPublicClient({
    chain: base,
    transport: http("https://mainnet.base.org"),
});

export async function getBasenameAvatar(basename: Basename) {
    const avatar = await baseClient.getEnsAvatar({
        name: basename,
        universalResolverAddress: Layer2ResolverAddress,
    });

    return avatar;
}

export async function getBasenameContentHash(basename: Basename) {
    const contenthash = await baseClient.readContract({
        abi: Layer2ResolverAbi,
        address: Layer2ResolverAddress,
        args: [namehash(basename)],
        functionName: "contenthash",
    });

    return contenthash;
}

export function buildBasenameTextRecordContract(
    basename: Basename,
    key: BasenameTextRecordKeys
): ContractFunctionParameters {
    return {
        abi: Layer2ResolverAbi,
        address: Layer2ResolverAddress,
        args: [namehash(basename), key],
        functionName: "text",
    };
}

// Get a single TextRecord
export async function getBasenameTextRecord(
    basename: Basename,
    key: BasenameTextRecordKeys
) {
    try {
        const contractParameters = buildBasenameTextRecordContract(basename, key);
        const textRecord = await baseClient.readContract(contractParameters);
        return textRecord as string;
    } catch (error) {
        console.log(error)
    }
}

// Get a all TextRecords
export async function getBasenameTextRecords(basename: Basename) {
    try {
        const readContracts: ContractFunctionParameters[] =
            textRecordsKeysEnabled.map((key) =>
                buildBasenameTextRecordContract(basename, key)
            );
        const textRecords = await baseClient.multicall({
            contracts: readContracts,
        });

        return textRecords;
    } catch (error) {
        console.log(error)
    }
}

/**
 * Convert an chainId to a coinType hex for reverse chain resolution
 */
export const convertChainIdToCoinType = (chainId: number): string => {
    // L1 resolvers to addr
    if (chainId === mainnet.id) {
        return "addr";
    }

    const cointype = (0x80000000 | chainId) >>> 0;
    return cointype.toString(16).toLocaleUpperCase();
};

/**
 * Convert an address to a reverse node for ENS resolution
 */
export const convertReverseNodeToBytes = (
    address: Address,
    chainId: number
) => {
    const addressFormatted = address.toLocaleLowerCase() as Address;
    const addressNode = keccak256(addressFormatted.substring(2) as Address);
    const chainCoinType = convertChainIdToCoinType(chainId);
    const baseReverseNode = namehash(
        `${chainCoinType.toLocaleUpperCase()}.reverse`
    );
    const addressReverseNode = keccak256(
        encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode])
    );
    return addressReverseNode;
};

export async function getBasename(address: Address) {
    try {
        const addressReverseNode = convertReverseNodeToBytes(address, base.id);
        const basename = await baseClient.readContract({
            abi: Layer2ResolverAbi,
            address: Layer2ResolverAddress,
            functionName: "name",
            args: [addressReverseNode],
        });
        if (basename) {
            return basename as Basename;
        }
    } catch (error) {
        console.log(error)
    }
}