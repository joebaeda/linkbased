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

export const generateLinkBasedHTML = (data: LinkBasedProps): string => {
  const links = [
    {
      name: 'Website',
      value: data.website,
      url: data.website,
      icon: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
    },
    {
      name: 'Email',
      value: data.email,
      url: `mailto:${data.email}`,
      icon: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
    },
    {
      name: 'Phone',
      value: data.phone,
      url: `tel:${data.phone}`,
      icon: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
    },
    {
      name: 'GitHub',
      value: data.github,
      url: `https://github.com/${data.github}`,
      icon: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`
    },
    {
      name: 'X',
      value: data.twitter,
      url: `https://x.com/${data.twitter}`,
      icon: `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    {
      name: 'Farcaster',
      value: data.farcaster,
      url: `https://warpcast.com/${data.farcaster}`,
      icon: `<svg class="icon" viewBox="105 100 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M257.778 155.556h484.444v688.889h-71.111V528.889h-.697c-7.86-87.212-81.156-155.556-170.414-155.556s-162.554 68.344-170.414 155.556h-.697v315.556h-71.111z" fill="#fff"/><path d="m128.889 253.333 28.889 97.778h24.444v395.556c-12.273 0-22.222 9.949-22.222 22.222v26.667h-4.444c-12.273 0-22.223 9.949-22.223 22.222v26.667h248.889v-26.667c0-12.273-9.949-22.222-22.222-22.222h-4.444v-26.667c0-12.273-9.95-22.222-22.223-22.222h-26.666V253.333zm546.667 493.334c-12.274 0-22.223 9.949-22.223 22.222v26.667h-4.444c-12.273 0-22.222 9.949-22.222 22.222v26.667h248.889v-26.667c0-12.273-9.95-22.222-22.223-22.222h-4.444v-26.667c0-12.273-9.949-22.222-22.222-22.222V351.111h24.444L880 253.333H702.222v493.334z" fill="#fff"/></svg>`
    },
    {
      name: 'Telegram',
      value: data.telegram,
      url: `https://t.me/${data.telegram}`,
      icon: `<svg class="icon" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path stroke-width="12" d="M23.073 88.132s65.458-26.782 88.16-36.212c8.702-3.772 38.215-15.843 38.215-15.843s13.621-5.28 12.486 7.544c-.379 5.281-3.406 23.764-6.433 43.756-4.54 28.291-9.459 59.221-9.459 59.221s-.756 8.676-7.188 10.185c-6.433 1.509-17.027-5.281-18.919-6.79-1.513-1.132-28.377-18.106-38.214-26.404-2.649-2.263-5.676-6.79.378-12.071 13.621-12.447 29.891-27.913 39.728-37.72 4.54-4.527 9.081-15.089-9.837-2.264-26.864 18.483-53.35 35.835-53.35 35.835s-6.053 3.772-17.404.377-24.594-7.921-24.594-7.921-9.08-5.659 6.433-11.693Z"/></svg>`
    },
    {
      name: 'Discord',
      value: data.discord,
      url: data.discord,
      icon: `<svg class="icon" fill="#fff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M12.656 4.906 11.875 5s-3.504.383-6.062 2.438H5.78l-.031.03c-.574.528-.824 1.177-1.219 2.126a31 31 0 0 0-1.187 3.5C2.602 15.777 2 19.027 2 22v.25l.125.25c.926 1.625 2.57 2.66 4.094 3.375 1.523.715 2.84 1.094 3.75 1.125l.594.031.312-.531 1.094-1.937c1.16.261 2.496.437 4.031.437s2.871-.176 4.031-.437l1.094 1.937.313.531.593-.031c.91-.031 2.227-.41 3.75-1.125s3.168-1.75 4.094-3.375l.125-.25V22c0-2.973-.602-6.223-1.344-8.906a31 31 0 0 0-1.187-3.5c-.395-.95-.645-1.598-1.219-2.125l-.031-.032h-.032C23.63 5.384 20.126 5 20.126 5l-.781-.094-.282.719s-.289.73-.468 1.563A20 20 0 0 0 16 7c-.535 0-1.46.035-2.594.188a11 11 0 0 0-.469-1.563Zm-1.375 2.282c.043.14.086.261.125.375-1.293.32-2.672.808-3.937 1.593l1.062 1.688C11.125 9.234 14.851 9 16 9c1.148 0 4.875.234 7.469 1.844l1.062-1.688c-1.265-.785-2.644-1.273-3.937-1.594.039-.113.082-.234.125-.375.933.188 2.715.618 4.187 1.782-.008.004.375.582.719 1.406.352.848.742 1.977 1.094 3.25.676 2.441 1.207 5.414 1.25 8.031-.63.961-1.797 1.828-3.032 2.407a9.7 9.7 0 0 1-2.437.78L22 24c.297-.11.59-.23.844-.344 1.539-.676 2.375-1.406 2.375-1.406l-1.313-1.5s-.562.516-1.875 1.094S18.715 23 16 23s-4.719-.578-6.031-1.156c-1.313-.578-1.875-1.094-1.875-1.094l-1.313 1.5s.836.73 2.375 1.406c.254.114.547.235.844.344l-.5.844a9.7 9.7 0 0 1-2.437-.782c-1.235-.578-2.403-1.445-3.032-2.406.043-2.617.574-5.59 1.25-8.031a29 29 0 0 1 1.094-3.25c.344-.824.727-1.402.719-1.406 1.472-1.164 3.254-1.594 4.187-1.781ZM12.5 14c-.773 0-1.457.441-1.875 1S10 16.246 10 17s.207 1.441.625 2 1.102 1 1.875 1 1.457-.441 1.875-1S15 17.754 15 17s-.207-1.441-.625-2-1.102-1-1.875-1Zm7 0c-.773 0-1.457.441-1.875 1S17 16.246 17 17s.207 1.441.625 2 1.102 1 1.875 1 1.457-.441 1.875-1S22 17.754 22 17s-.207-1.441-.625-2-1.102-1-1.875-1Zm-7 2c.055 0 .125.02.25.188.125.167.25.46.25.812s-.125.645-.25.813-.195.187-.25.187-.125-.02-.25-.187A1.4 1.4 0 0 1 12 17c0-.352.125-.645.25-.812s.195-.188.25-.188Zm7 0c.055 0 .125.02.25.188.125.167.25.46.25.812s-.125.645-.25.813-.195.187-.25.187-.125-.02-.25-.187A1.4 1.4 0 0 1 19 17c0-.352.125-.645.25-.812s.195-.188.25-.188Z"/></svg>`
    },
  ].filter(link => !!link.value);

  const linksHTML = links.map(link => `
      <a href="${link.url || '#'}" target="_blank" rel="noopener noreferrer" class="link-item">
          <span class="link-content">${link.name}${link.icon}</span>
      </a>
  `).join('');

  const keywordsHTML = data.keywords ? `
      <div class="keywords">
          ${data.keywords.split(',').map(keyword => `
              <span class="keyword">${keyword.trim()}</span>
          `).join('')}
      </div>
  ` : '';

  const styles = `
      <style>
          body {
              position: relative;
              font-family: "Rock Salt", cursive;
              font-weight: 400;
              font-style: normal;
              background: linear-gradient(to bottom, #000000, #0c0c0e);
              color: #e5e7eb;
              min-height: 100vh;
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
          }
          .container {
              max-width: 42rem;
              margin: 0 auto;
              text-align: center;
              padding: 1rem;
          }
          .header {
              width: 100%;
              height: 10rem;
              background: ${data.header ? `url(${data.header.replace("ipfs://", "https://ipfs.io/ipfs/")})` : 'url(https://picsum.photos/seed/picsum/1200/200)'};
              background-size: cover;
              background-position: center;
              filter: brightness(0.3) contrast(1.2);
              border-radius: 0 0 1rem 1rem;
              position: absolute;
          }
          .header-overlay {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              background-image: linear-gradient(to bottom, rgb(1 1 2 / 30%), transparent, rgb(0 0 0 / 60%));
              border-bottom-left-radius: 1rem;
              border-bottom-right-radius: 1rem;
          }
          .avatar {
              width: 12.5rem;
              height: 12.5rem;
              border-radius: 1rem;
              border: 4px solid white;
              margin-top: 3rem;
              position: relative;
          }
          .display {
              font-size: 1.875rem;
              font-weight: 800;
              margin-top: 1rem;
          }
          .description {
              font-size: 1rem;
              line-height: 1.8rem;
              padding: 0 1.5rem;
              margin-top: 1rem;
              max-width: 80%;
              margin-left: auto;
              margin-right: auto;
          }
          .keywords {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              justify-content: center;
              margin-top: 1rem;
              padding: 0.75rem;
          }
          .keyword {
              background: rgba(255, 255, 255, 0.1);
              padding: 1.2rem;
              border-radius: 1rem;
          }
          .link-item {
              display: block;
              padding: 1.2rem;
              margin: 1rem 0;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 1rem;
              text-decoration: none;
              color: #e5e7eb;
          }
          .link-item:hover, .keyword:hover {
              background: rgba(255, 255, 255, 0.2);
          }
          .link-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .icon {
              width: 1.25rem;
              height: 1.25rem;
              margin-left: 0.5rem;
          }
          .follow-stats {
              display: flex;
              margin: auto;
              padding: 0.75rem;
              width: 100%;
              max-width: 20rem;
          }
          .followers-count, .following-count {
              width: 100%;
          }
          .follow-link {
              margin-left: 0.5rem;
              display: inline-block;
              vertical-align: middle;
          }
          .follow-link svg {
              width: 32px;
              height: 32px;
              fill: #dfc30c;
          }
          .follow-link:hover svg {
              fill: #ffd700;
          }
          .footer {
              font-size: 0.7rem;
              line-height: 2rem;
              color: #333;
              padding: 1rem;
          }
      </style>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.description || ''}">
  <meta name="keywords" content="${data.keywords || ''}">
  <meta name="author" content="${data.basename || ''}">
  <meta property="og:title" content="${data.display || "Link Based"}">
  <meta property="og:description" content="${data.description || ''}">
  <meta property="og:image" content="${data.avatar ? data.avatar.replace("ipfs://", "https://ipfs.io/ipfs/") : 'https://ipfs.io/ipfs/bafkreih4ex24aspaxbszmpyexzepv3bgmibbrkb5tfagcoytvigwyybidy'}">
  <meta property="og:url" content="https://${data.basename}.limo">
  <meta name="twitter:card" content="summary_large_image">
  <title>${data.display || "Link Based"} | ${data.basename}</title>
  <link rel="icon" type="image/x-icon" href="${data.avatar ? data.avatar.replace("ipfs://", "https://ipfs.io/ipfs/") : 'https://ipfs.io/ipfs/bafkreih4ex24aspaxbszmpyexzepv3bgmibbrkb5tfagcoytvigwyybidy'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
  ${styles}
</head>
<body>
  <div class="header">
  <div class="header-overlay"></div>
  </div>
  <div class="container">
      <img src="${data.avatar ? data.avatar.replace("ipfs://", "https://ipfs.io/ipfs/") : 'https://ipfs.io/ipfs/bafkreih4ex24aspaxbszmpyexzepv3bgmibbrkb5tfagcoytvigwyybidy'}" alt="avatar" class="avatar">
      <h1 class="display">
          ${data.display || data.basename}
          <a href="https://efp.app/${data.address}" target="_blank" class="follow-link" title="Follow on EFP">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#dfc30c">
                  <path d="M2.002 27.959c0-0.795 0.597-1.044 0.835-1.154l8.783-4.145c0.63-0.289 1.064-0.885 1.149-1.573s-0.193-1.37-0.733-1.803c-2.078-1.668-3.046-5.334-3.046-7.287v-4.997c0-2.090 3.638-4.995 7.004-4.995 3.396 0 6.997 2.861 6.997 4.995v4.998c0 1.924-0.8 5.604-2.945 7.292-0.547 0.43-0.831 1.115-0.749 1.807 0.082 0.692 0.518 1.291 1.151 1.582l2.997 1.422 0.494-1.996-2.657-1.243c2.771-2.18 3.708-6.463 3.708-8.864v-4.997c0-3.31-4.582-6.995-8.998-6.995s-9.004 3.686-9.004 6.995v4.997c0 2.184 0.997 6.602 3.793 8.846l-8.783 4.145s-1.998 0.89-1.998 1.999v3.001c0 1.105 0.895 1.999 1.998 1.999h21.997v-2l-21.996 0.001v-2.029zM30.998 25.996h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
              </svg>
          </a>
      </h1>
      <div class="follow-stats">
          <span class="followers-count">Followers: loading...</span>
          <span class="following-count">Following: loading...</span>
      </div>
      ${data.description ? `<p class="description">${data.description}</p>` : ''}
      ${keywordsHTML}
      <div class="links">${linksHTML}</div>
      <div class="footer">
          <p>linkbased.xyz is a web3-based profile using the Basenames (base.eth) and EFP (Ethereum Follow Protocol) as its data source. developed by <a href="https://warpcast.com/joebaeda" target="_blank">joebaeda.</a></p>
          <p>Copyright © ${new Date().getFullYear()}</p>
      </div>
  </div>
  <script>
      const followersSpan = document.querySelector('.followers-count');
      const followingSpan = document.querySelector('.following-count');
      fetch('https://api.ethfollow.xyz/api/v1/users/${data.basename}/followers')
          .then(response => response.json())
          .then(data => {
              const followersCount = data.followers && Array.isArray(data.followers) ? data.followers.length : 'N/A';
              followersSpan.textContent = \`\${followersCount} Followers\`;
          })
          .catch(error => {
              console.error('Error fetching followers:', error);
              followersSpan.textContent = 'Followers error';
          });
      fetch('https://api.ethfollow.xyz/api/v1/users/${data.basename}/following')
          .then(response => response.json())
          .then(data => {
              const followingCount = data.following && Array.isArray(data.following) ? data.following.length : 'N/A';
              followingSpan.textContent = \` \${followingCount} Following\`;
          })
          .catch(error => {
              console.error('Error fetching following:', error);
              followingSpan.textContent = 'Following: error';
          });
  </script>
</body>
</html>
  `.trim();
};