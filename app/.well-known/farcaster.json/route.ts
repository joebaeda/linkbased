export async function GET() {

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjg5MTkxNCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDRmYzg1YjUzN2FkYzE4RmYzNTRhMzJDNkUxM0JCRGNEZDk0YTZEMDEifQ",
      payload: "eyJkb21haW4iOiJsaW5rYmFzZWQueHl6In0",
      signature: "MHhjZmFjMGI5NDJjNmQ3NzMyZTA0N2ZjNDg4MDUwMjBhMzA5YzUwZjE2YWU3YjUzNGFjYWZjZmYwZDhmNDA1NDE5MGNiMWExZDgzZjM2OTNmMDFiNWZkNzVkM2FiZDg1Yzc1M2ZmODQ0MmZmMzE1NjUyMjgyN2RmZmYyYzUyN2RlOTFi"
    },
    frame: {
      version: "1",
      name: "Link Based",
      iconUrl: "https://linkbased.xyz/icon.png",
      homeUrl: "https://linkbased.xyz",
      imageUrl: "https://linkbased.xyz/og-image.jpg",
      buttonTitle: "Generate Web3 Profile",
      splashImageUrl: "https://linkbased.xyz/splash.png",
      splashBackgroundColor: "#1b1423",
      webhookUrl: "https://linkbased.xyz/api/webhook"
    },
  };

  return Response.json(config);
}