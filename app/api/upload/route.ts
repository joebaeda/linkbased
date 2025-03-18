import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const file = await req.formData();
    const fileData = file.get('file') as File | null;

    if (!fileData) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        const formData = new FormData();
        formData.append('file', fileData);
        // Add pinataOptions to force dag-pb
        formData.append('pinataOptions', JSON.stringify({
            cidVersion: 0, // Request CID v0 directly
        }));

        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`,
            },
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            return NextResponse.json({
                success: true,
                ipfsHash: result.IpfsHash, // Should be CID v0
            });
        } else {
            throw new Error(result.error);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}