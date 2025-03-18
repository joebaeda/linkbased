'use client'

import { useCallback, useEffect, useState } from 'react';
import {
  BasenameTextRecordKeys,
  getBasename,
  getBasenameAvatar,
  getBasenameContentHash,
  getBasenameTextRecord,
} from '@/utils/basenames';
import Image from 'next/image';
import { MessageCircle, Globe, Send, Mail, Phone, MapPinned, UserPlus, LockKeyhole, Leaf } from 'lucide-react';
import Link from 'next/link';
import EthFollowCounts from './EthereumFollowProtocol';
import { generateLinkBasedHTML } from './LinkBased';
import { useAccount, useChainId, useConnect, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import sdk from '@farcaster/frame-sdk';
import { useViewer } from '../providers/FrameContextProvider';
import { Layer2ResolverAbi, Layer2ResolverAddress } from '@/lib/Layer2Resolver';
import { base } from 'wagmi/chains';
import { BaseError, namehash } from 'viem';
import Loading from './svg/Loading';
import { config } from '@/lib/config';
import contentHash from 'content-hash';

interface ProfileProps {
  avatar: string | null;
  header: string | undefined;
  display: string | undefined;
  description: string | undefined;
  keywords: string | undefined;
  mail: string | undefined;
  location: string | undefined;
  website: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  github: string | undefined;
  twitter: string | undefined;
  farcaster: string | undefined;
  lens: string | undefined;
  telegram: string | undefined;
  discord: string | undefined;
  contenthash: string;
  basename?: string;
}

interface ProfilesComponentProps {
  initialData?: ProfileProps | null;
}

interface IpfsResponse {
  success: boolean;
  ipfsHash: string;
  error?: string;
}

interface LinkBasedProps {
  address: string;
  basename: string;
  avatar: string;
  header: string;
  display: string;
  description: string;
  keywords: string;
  mail: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  github: string;
  twitter: string;
  farcaster: string;
  lens: string;
  telegram: string;
  discord: string;
}

export default function Profiles({ initialData = null }: ProfilesComponentProps) {
  const [data, setData] = useState<ProfileProps | null>(initialData);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [showMintSuccess, setShowMintSuccess] = useState(false);

  const { added } = useViewer();
  const chainId = useChainId();
  const { connect } = useConnect();
  const { address: baseAddress, isConnected } = useAccount();
  const {
    data: txHash,
    error: isTxError,
    isPending: isTxPending,
    writeContract: uploadSite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const linkToShare = useCallback((siteUrl?: string) => {
    if (siteUrl) {
      sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=Just%20Launching%20my%20Web3%20Profile!%20%20${siteUrl}&embeds[]=https://linkbased.xyz`
      );
    }
  }, []);

  useEffect(() => {
    if (!added) {
      sdk.actions.addFrame();
    }
  }, [added]);

  useEffect(() => {
    if (isConfirmed) {
      setShowMintSuccess(true);
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (isTxError) {
      setShowError(true);
    }
  }, [isTxError]);

  useEffect(() => {
    if (initialData) return; // If initial data provided, skip fetch.

    async function fetchData() {
      const basename = await getBasename(baseAddress as `0x${string}`);

      // Redirect if no Base name found
      if (!basename) {
        return <div className="w-full absolute inset-0 flex justify-center items-center">
          <Image
            src="/loading.gif"
            alt="loading"
            width={200}
            height={200}
            unoptimized
            className="rounded-full"
          />
        </div>;
      }

      const profileDataArray = await Promise.all([
        getBasenameAvatar(basename),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Header),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Display),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Description),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Keywords),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Mail),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Location),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Url),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Email),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Phone),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Github),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Twitter),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Farcaster),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Lens),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Telegram),
        getBasenameTextRecord(basename, BasenameTextRecordKeys.Discord),
        getBasenameContentHash(basename),
      ]);

      const profileData: ProfileProps = {
        avatar: profileDataArray[0],
        header: profileDataArray[1],
        display: profileDataArray[2],
        description: profileDataArray[3],
        keywords: profileDataArray[4],
        mail: profileDataArray[5],
        location: profileDataArray[6],
        website: profileDataArray[7],
        email: profileDataArray[8],
        phone: profileDataArray[9],
        github: profileDataArray[10],
        twitter: profileDataArray[11],
        farcaster: profileDataArray[12],
        lens: profileDataArray[13],
        telegram: profileDataArray[14],
        discord: profileDataArray[15],
        contenthash: profileDataArray[16],
        basename: basename,
      };

      setData(profileData);
    }

    fetchData();
  }, [baseAddress, initialData]);

  if (!data) {
    return <div className="w-full absolute inset-0 flex justify-center items-center">
      <Image
        src="/loading.gif"
        alt="loading"
        width={200}
        height={200}
        unoptimized
        className="rounded-full"
      />
    </div>;
  }

  const links = [
    { name: 'Website', value: data.website, url: data.website, icon: <Globe className="w-5 h-5" /> },
    { name: 'Email', value: data.email, url: `mailto:${data.email}`, icon: <Mail className="w-5 h-5" /> },
    { name: 'Phone', value: data.phone, url: `tel:${data.phone}`, icon: <Phone className="w-5 h-5" /> },
    {
      name: 'GitHub', value: data.github, url: `https://github.com/${data.github}`, icon: <svg className="w-5 h-5" fill="#fff" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g strokeWidth="0" />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1873.256 674.212c0-122.468-35.728-230.622-106.325-321.88 15.712-57.683 32.5-171.972-20.77-313.703-5.596-15.066-17.864-26.796-33.146-32.07-19.155-6.564-122.144-30.347-328.552 110.953-84.157-22.169-172.94-33.576-264.844-34.114-91.582.538-180.366 11.945-264.306 34.114C648.689-23.68 545.7-.005 526.437 6.56c-15.282 5.165-27.55 17.003-33.146 32.177-53.162 141.623-36.374 255.912-20.555 313.594-70.704 91.582-106.54 199.629-106.54 321.88 0 422.826 221.905 557.131 432.188 605.666-46.49 50.903-95.24 125.158-105.68 219.537-71.78 26.044-257.633 78.13-325.109-44.015-3.013-5.596-73.394-137.641-215.017-148.08-25.075 1.184-84.587 4.305-101.052 54.346-18.51 55.961 39.495 97.716 67.906 117.41.538.323 55.745 31.962 93.841 132.045.969 4.628 23.783 114.72 134.951 181.55 87.492 52.731 202.319 63.493 341.252 32.284 0 23.46-.323 48.212-.43 63.386l-.324 31.101H796.34l.215-29.81c1.937-161.532 2.045-164.653-30.778-181.656-12.484-6.457-27.012-7.964-40.356-3.659-136.243 41.002-246.98 40.033-320.052-2.798-70.488-41.54-85.985-108.908-88.89-119.67-3.875-10.653-8.072-20.662-12.269-30.24 126.987 145.713 372.138 77.161 463.289 33.792 18.833-8.825 30.778-27.765 30.778-48.535 0-149.372 148.295-244.182 149.802-245.15 19.371-12.16 28.949-35.19 23.998-57.36-4.95-22.276-23.352-39.065-46.06-41.755-223.626-26.796-452.204-109.338-452.204-518.388 0-106.325 33.577-198.983 99.76-275.175 12.915-15.067 16.681-36.052 9.579-54.562-9.793-25.397-36.482-112.782-.323-234.819 35.729 4.09 110.845 24.321 231.16 110.307 13.344 9.578 30.455 12.376 46.383 7.856 80.497-23.568 170.356-36.267 259.248-36.805 89.321.538 179.073 13.237 259.786 36.805 15.927 4.52 32.93 1.722 46.382-7.856 121.176-86.631 196.4-106.433 230.73-110.63 36.482 122.145 9.793 209.745 0 235.142-7.21 18.51-3.444 39.603 9.578 54.562 66.076 75.977 99.545 168.527 99.545 275.175 0 409.157-229.115 491.161-453.173 517.527-20.985 2.475-38.634 16.896-44.984 37.02-6.456 20.017-.538 42.078 15.067 56.284 6.35 5.703 14.958 12.483 25.074 20.231 51.333 39.28 137.211 105.034 137.211 259.571 0 85.448-1.399 354.273-1.399 354.273l107.617.539s1.399-269.257 1.399-354.812c0-141.838-56.499-229.976-110.845-285.937 210.39-48.427 431.65-182.517 431.65-604.696" fillRule="evenodd" />
      </svg>
    },
    {
      name: 'Twitter', value: data.twitter, url: `https://x.com/${data.twitter}`, icon: <svg className='w-5 h-5' viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white" />
      </svg>
    },
    {
      name: 'Farcaster', value: data.farcaster, url: `https://warpcast.com/${data.farcaster}`, icon: <svg className="w-5 h-5" viewBox="105 100 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M257.778 155.556h484.444v688.889h-71.111V528.889h-.697c-7.86-87.212-81.156-155.556-170.414-155.556s-162.554 68.344-170.414 155.556h-.697v315.556h-71.111z" fill="#fff" />
        <path d="m128.889 253.333 28.889 97.778h24.444v395.556c-12.273 0-22.222 9.949-22.222 22.222v26.667h-4.444c-12.273 0-22.223 9.949-22.223 22.222v26.667h248.889v-26.667c0-12.273-9.949-22.222-22.222-22.222h-4.444v-26.667c0-12.273-9.95-22.222-22.223-22.222h-26.666V253.333zm546.667 493.334c-12.274 0-22.223 9.949-22.223 22.222v26.667h-4.444c-12.273 0-22.222 9.949-22.222 22.222v26.667h248.889v-26.667c0-12.273-9.95-22.222-22.223-22.222h-4.444v-26.667c0-12.273-9.949-22.222-22.222-22.222V351.111h24.444L880 253.333H702.222v493.334z" fill="#fff" />
      </svg>
    },
    { name: 'Telegram', value: data.telegram, url: `https://t.me/${data.telegram}`, icon: <Send className="w-5 h-5" /> },
    { name: 'Discord', value: data.discord, url: data.discord, icon: <MessageCircle className="w-5 h-5" /> },
  ].filter(link => !!link.value); // Filter out undefined ones

  // New function to save to IPFS
  const saveToIPFS = async (): Promise<string | undefined> => {
    setIsUploading(true);
    try {
      if (!data) return;

      // Map your ProfileProps to LinkBasedProps
      const linkBasedData: LinkBasedProps = {
        address: baseAddress?.toLowerCase() as `0x${string}`,
        basename: data.basename || '',
        avatar: data.avatar || '',
        header: data.header || '',
        display: data.display || '',
        description: data.description || '',
        keywords: data.keywords || '',
        mail: data.mail || '',
        location: data.location || '',
        website: data.website || '',
        email: data.email || '',
        phone: data.phone || '',
        github: data.github || '',
        twitter: data.twitter || '',
        farcaster: data.farcaster || '',
        lens: data.lens || '',
        telegram: data.telegram || '',
        discord: data.discord || '',
      };
      // Render component to static HTML
      const htmlContent = generateLinkBasedHTML(linkBasedData);

      // Convert to blob for Pinata upload
      const blob = new Blob([htmlContent], { type: 'text/html' });

      const formData = new FormData();
      formData.append("file", blob, `${data?.basename || baseAddress?.toLowerCase()}.html`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json() as IpfsResponse;

      if (response.ok) {
        setIpfsHash(responseData.ipfsHash); // If you have this state
        return responseData.ipfsHash;
      } else {
        console.error('Pinata upload failed:', responseData.error);
        return undefined;
      }
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error; // Or handle differently based on your needs
    }
  };

  const handleUpload = async () => {

    try {
      const _siteHash = await saveToIPFS();
      if (!_siteHash) throw new Error('Failed to get Site hash');

      setIsUploading(false)

      const contentH = contentHash.fromIpfs(ipfsHash as string)
      console.log(contentH)

      if (contentH) {
        uploadSite({
          abi: Layer2ResolverAbi,
          chainId: base.id,
          address: Layer2ResolverAddress as `0x${string}`,
          functionName: "setContenthash",
          args: [namehash(data.basename as string), `0x${contentH}`],
        })
      }
    } catch (error) {
      console.error("Error during minting:", (error as Error).message);
      setShowError(true);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#000000] to-[#0c0c0e] text-gray-200">

      {data.header ? (
        <div
          className="absolute top-0 z-0 w-full h-40 rounded-b-xl bg-cover bg-center bg-gray-700 overflow-hidden"
          style={{
            backgroundImage: `url(${data.header.replace("ipfs://", "https://ipfs.io/ipfs/")})`,
            filter: 'brightness(0.3) contrast(1.2)', // tweak as needed
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-b-xl"></div>
        </div>
      ) : (
        <div
          className="absolute top-0 z-0 w-full h-42 rounded-b-xl bg-cover bg-center bg-gray-700 overflow-hidden"
          style={{
            backgroundImage: 'url(https://picsum.photos/seed/picsum/1200/200)',
            filter: 'brightness(0.3) contrast(1.2)', // tweak as needed
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 rounded-b-xl"></div>
        </div>
      )}

      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center space-y-4">

        {data.avatar ? (
          <Image
            src={data.avatar}
            alt="avatar"
            width={200}
            height={200}
            className="rounded-2xl mt-12 border-4 border-white shadow-lg"
          />
        ) : (
          <Image
            src="/placeholder.gif"
            alt="avatar"
            width={200}
            height={200}
            unoptimized
            className="rounded-2xl mt-12 bg-amber-50 border-4 border-white shadow-lg"
          />
        )}

        {data.display ? (
          <div className="w-full flex flex-row justify-center items-center space-x-3">
            <h1 className="text-3xl font-extrabold">{data.display}</h1>
            <Link href={`https://efp.app/${baseAddress?.toLowerCase()}`} rel="noopener noreferrer" target="_blank"><UserPlus className="w-8 h-8 text-amber-300" /></Link>
          </div>
        ) : (
          <div className="w-full flex flex-row justify-center items-center space-x-3">
            <h1 className="text-3xl font-extrabold">{data.basename}</h1>
            <Link href={`https://efp.app/${baseAddress?.toLowerCase()}`} rel="noopener noreferrer" target="_blank"><UserPlus className="w-8 h-8 text-amber-300" /></Link>
          </div>
        )}

        <EthFollowCounts basename={data.basename as `0x${string}`} />

        {data.description && <p className="w-full px-6 text-center text-md">{data.description}</p>}

        {data.keywords && (
          <div className="w-full flex flex-wrap gap-2 justify-center">
            {data.keywords.split(",").map((keyword, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur rounded-2xl p-3 hover:bg-white/20 transition-all"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        )}

        {data.location && (
          <div className="flex flex-row opacity-25 justify-center items-center space-x-1">
            <MapPinned className="w-4 h-4" />
            <p className="text-lg font-bold">{data.location}</p>
          </div>
        )}

        <div className="w-full max-w-xl flex flex-col space-y-3 mt-4">
          {links.map(link => (
            <Link
              key={link.name}
              href={link.url ? link.url : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-4 items-center justify-between space-x-3 bg-white/10 backdrop-blur rounded-2xl hover:bg-white/20 transition-all"
            >
              <span>{link.name}</span>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full p-4 max-w-xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>linkbased.xyz is a web3-based profile using the{' '}
          <span className="font-semibold">Basenames &#40;base.eth&#41; and EFP &#40;Ethereum Follow Protocol&#41;</span> as its data source.
          developed by{' '}
          <a
            href="https://warpcast.com/joebaeda" // Replace with your actual profile link
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-amber-300 hover:underline"
          >
            joebaeda
          </a>.
        </p>
        <p className="py-3">Copyright © {new Date().getFullYear()}</p>
        {ipfsHash && (
          <div className="text-center">IPFS Hash: <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank">{ipfsHash}</a></div>
        )}
      </div>

      {/* Transaction Success */}
      {showMintSuccess && (
        <div className="absolute p-4 top-32 mx-auto flex items-center justify-center z-30 w-full max-w-[384px] max-h-[384px]"
        >
          <div className="relative p-4 flex flex-col bg-[#17101f] text-slate-300 rounded-2xl text-center">
            <p className="text-center p-4">Upload Web3 Profile Success</p>
            <button
              className="w-full p-3 rounded-xl bg-gradient-to-r from-[#201029] to-[#290f37] disabled:cursor-not-allowed"
              onClick={() => linkToShare(`https://${data.basename}.limo`)}
            >
              Share
            </button>
          </div>
        </div>
      )}

      {/* Transaction Error */}
      {showError && isTxError && (
        <div
          onClick={() => setShowError(false)}
          className="absolute top-1/4 mx-auto flex items-center justify-center p-4 z-10 w-full max-w-[90%] md:max-w-[384px] max-h-[384px]"
        >
          <div className="relative bg-[#230b36cc] bg-opacity-25 backdrop-blur-[10px] text-slate-300 p-6 rounded-2xl shadow-lg text-center">
            <p className="text-center p-4">
              Error: {(isTxError as BaseError).shortMessage || isTxError.message}
            </p>
          </div>
        </div>
      )}

      {/* Navbar Bottom */}
      <div className="fixed flex justify-center items-center w-full h-20 mx-auto z-20 bottom-0 rounded-t-2xl bg-[#17101f]">
        <div className="absolute flex justify-center items-center p-4 bottom-0 w-[100px] h-28 mx-auto rounded-t-full bg-[#17101f]">
          {isConnected && chainId === base.id ? (
            <button
              onClick={handleUpload}
              disabled={
                !isConnected ||
                isUploading ||
                isTxPending ||
                isConfirming ||
                isConfirmed ||
                chainId !== base.id
              }
              className="w-full flex p-4"
            >
              {isUploading || isTxPending || isConfirming ? (
                <div className="absolute z-0 inset-0 flex max-w-[300px] mx-auto justify-center items-center text-gray-500 text-center">
                  <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
                  <Loading className="w-16 h-16" />
                </div>
              ) : (
                <Leaf className="w-16 h-16" />
              )}
            </button>
          ) : (
            <button
              className="w-full flex p-4"
              onClick={() => connect({ connector: config.connectors[0] })}
            >
              <LockKeyhole className="w-16 h-16" />
            </button>
          )}
        </div>
      </div>

    </main>
  );
}
