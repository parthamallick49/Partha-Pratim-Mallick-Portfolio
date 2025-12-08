import type { SVGProps } from 'react';

export const IconNextjs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 180 180"
    role="img"
    aria-label="Next.js logomark"
    {...props}
  >
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="180"
      height="180"
    >
      <circle cx="90" cy="90" r="90" fill="currentColor"></circle>
    </mask>
    <g mask="url(#a)">
      <circle cx="90" cy="90" r="90" fill="currentColor"></circle>
      <path
        d="M149.509 157.52L69.214 55.953h-3.415v68.31H54.019V55.953h-4.113L0 157.52h11.789l38.42-84.825h.34l38.42 84.825H149.51z"
        fill="url(#b)"
        transform="translate(15.24)"
      ></path>
      <path
        d="M109 55.953v68.31h-9.782V55.953H109z"
        fill="url(#c)"
        transform="translate(15.24)"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="b"
        x1="74.75"
        y1="55.953"
        x2="74.75"
        y2="157.52"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff"></stop>
        <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="c"
        x1="104.109"
        y1="55.953"
        x2="104.109"
        y2="124.263"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff"></stop>
        <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export const IconReact = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    role="img"
    aria-label="React logomark"
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

export const IconTailwind = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="Tailwind CSS logomark"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 2.582c-5.184 0-9.418 4.233-9.418 9.418s4.234 9.418 9.418 9.418 9.418-4.234 9.418-9.418S17.184 2.582 12 2.582zM17.683 8.355c-1.12.823-2.138 1.4-3.568 1.4-.41 0-.717-.113-.926-.34-.21-.226-.314-.553-.314-.98v-.002c0-.427.104-.753.314-.98.21-.226.516-.34.926-.34.918 0 1.93.383 2.826 1.058l1.35-1.574c-1.353-.98-2.92-1.573-4.57-1.573-1.65 0-3.044.47-4.18 1.412s-1.705 2.175-1.705 3.707c0 1.482.52 2.76 1.558 3.833s2.333 1.61 4.025 1.61c2.015 0 3.606-.757 4.793-2.27l-1.66-1.574zM12 19.418c-1.574 0-2.887-.47-3.94-1.412S6.355 15.83 6.355 14.3c0-1.48.544-2.76 1.632-3.833S10.428 9.02 12 9.02c1.493 0 2.78.384 3.86.97l-1.43 1.572c-.895-.675-1.907-1.058-2.825-1.058-.91 0-1.92.383-2.827 1.058-.208.113-.418.34-.418.665s.21.55.418.665c.907.675 1.917 1.058 2.827 1.058.918 0 1.93-.383 2.826-1.058l1.43 1.572c-1.08.586-2.367.97-3.86.97z"
    ></path>
  </svg>
);

export const IconNodejs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="Node.js logomark"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.755 22.284l-1.033.432#9.825 21.61c-3.15-.81-5.658-2.34-5.658-4.22V6.61c0-1.88 2.508-3.41 5.658-4.22l9.824-2.613 1.033-.432-1.033.432L21.48 2.39c3.15.81 5.658 2.34 5.658 4.22v10.78c0 1.88-2.508 3.41-5.658 4.22l-9.825 2.613zm7.04-15.483l-2.224 4.195c-.21.4-.53.64-.91.64h-3.6v3.2c0 .42-.33.75-.75.75s-.75-.33-.75-.75v-3.2h-2.1c-.42 0-.75-.33-.75-.75s.33-.75.75-.75h2.1v-2.8h-2.1c-.42 0-.75-.33-.75-.75s.33-.75.75-.75h2.1V4.5c0-.42.33-.75.75-.75s.75.33.75.75v2.3h3.6c.38 0 .7-.24.9-.64l2.224-4.195c.21-.4-.05-.9-.5-.9h-5.45c-.42 0-.75.33-.75.75s.33.75.75.75h3.08l-2.063 3.89h-3.417V4.5c0-.42.33-.75.75-.75s.75.33.75.75v2.3h3.6c.38 0 .7-.24.9-.64L18.795 2.3c.21-.4-.05-.9-.5-.9h-5.45c-.42 0-.75.33-.75.75s.33.75.75.75h3.08l-2.063 3.89H9.395V4.5c0-.42.33-.75.75-.75s.75.33.75.75v2.3h3.6c.38 0 .7-.24.9-.64l2.224-4.195c.21-.4-.05-.9-.5-.9h-5.45c-.42 0-.75.33-.75.75s.33.75.75.75h3.08l-2.063 3.89H9.395V4.5c0-.42-.33-.75-.75-.75s-.75-.33-.75.75v2.3H6.845c-.42 0-.75.33-.75.75s.33.75.75.75h2.1v2.8H6.845c-.42 0-.75.33-.75-.75s.33.75.75.75h2.1v3.2H6.845c-.42 0-.75.33-.75.75s.33.75.75.75h2.1v3.2c0 .42.33.75.75.75s.75-.33.75-.75v-3.2h3.6c.38 0 .7-.24.9-.64l2.224-4.195c.21-.4-.05-.9-.5-.9h-3.08l2.063 3.89h3.417v2.3c0 .42-.33.75-.75.75s-.75-.33-.75-.75v-2.3h-3.6c-.38 0-.7-.24-.9-.64L11.755 12c-.21.4.05.9.5.9h5.45c.42 0 .75-.33.75-.75s-.33-.75-.75-.75h-3.08l2.063-3.89h3.417v2.3c0 .42-.33.75-.75.75s-.75-.33-.75-.75v-2.3h-3.6c-.38 0-.7-.24-.9-.64z"
    ></path>
  </svg>
);

export const IconTypescript = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="TypeScript logomark"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1.5 0 h21 v21 h-21z M3.01 1.51 v17.98 h17.98 v-17.98z M12.5 13.78 l-1.72 1.34 h4.44 v2.36 h-9.98 v-2.22 l5.42-4.14 h-4.12 v-2.24 h8.68 v2.22 h-2.78z"
    ></path>
  </svg>
);

export const IconFirebase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="Firebase logomark"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3.52 17.28l8.59-14.7c.2-.34.66-.34.86 0l2.7 4.63-5.42 9.27zM19.33 15.1l-3.03-5.2-4.8 8.23-2.6 4.45c-.2.34.03.78.43.78h13.3c.4 0 .64-.44.43-.78zM14.07 4.4l-4.24 7.27L14.4 3.4z"
    ></path>
  </svg>
);

export const IconJava = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" role="img" aria-label="Java logomark" {...props}>
      <path
        fill="currentColor"
        d="M12.33,16.42H5.75V11.85h3.45a1.2,1.2,0,0,1,1.25,1.25v2.1A1.2,1.2,0,0,1,9.2,16.42Zm-5-1.5h3.45v-.6a.3.3,0,0,0-.3-.3H7.55v-2h2.55v-1.1H7.83v-1H5.75v5Zm12.44.62c0,2-2.31,2.8-4.22,2.8s-4.22-.8-4.22-2.8V9.11h1.57v7.94c0,1.3,1.3,1.6,2.65,1.6s2.65-.3,2.65-1.6V9.11h1.57Z"
      />
      <path
        fill="currentColor"
        d="M17,21.5H5.42a2,2,0,0,1-2-2V4.5a2,2,0,0,1,2-2H17a2,2,0,0,1,2,2v.8H14.15v1.5h4.8V19.5a2,2,0,0,1-2,2ZM5.42,4A.5.5,0,0,0,5,4.5V19.5A.5.5,0,0,0,5.42,20H17a.5.5,0,0,0,.5-.5V8.3H12.65V18H4.25V3h9.9v1.5h4.8V4.5a.5.5,0,0,0-.5-.5Z"
      />
    </svg>
);

export const IconDotNet = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" role="img" aria-label=".NET logomark" {...props}>
        <path
            fill="currentColor"
            d="M21.44,9.21H16.63V4.39a.5.5,0,0,0-.5-.5H4.89a.5.5,0,0,0-.5.5V15.11a.5.5,0,0,0,.5.5h.21l.2,0a.5.5,0,0,0,.4-.2l4.8-6.07V4.89H15.6v4.32H10.78L6,14.71v4.39a.5.5,0,0,0,.5.5h11.25a.5.5,0,0,0,.5-.5V9.71a.5.5,0,0,0-.5-.5m-1,9.25H7.39V15.3l5-6.22h4Z"
        />
        <path
            fill="currentColor"
            d="M3.56,14.79H2.5a.5.5,0,0,0-.5.5v3.81a.5.5,0,0,0,.5.5H3.56a.5.5,0,0,0,.5-.5V15.29a.5.5,0,0,0-.5-.5m-.5,3.82h0Z"
        />
    </svg>
);

export const IconFlutter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" role="img" aria-label="Flutter logomark" {...props}>
    <path fill="currentColor" d="m13.63 1.37l-9.26 9.25h9.26zm.01 12.01l-9.26 9.25l9.26-9.25zm0-6.01l-3.25 3.25l-6.01-6.01l9.26-3.24zm6.01 6.01h-9.26l4.63-4.62z"></path>
  </svg>
);

export const IconMongoDB = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" role="img" aria-label="MongoDB logomark" {...props}>
    <path fill="currentColor" d="M15.39 14.23c-.39.26-1.12.59-2.04.59c-1.33 0-2.31-.62-2.31-1.54c0-1.14 1.41-1.78 3.51-2.22c-1.11.39-2.03.95-2.03 1.83c0 .54.43.89.84.89c.38 0 .73-.25.96-.52m-2.14 2.45c3.08 0 5.43-1.47 5.43-4.52c0-2.23-1.46-3.4-3.23-3.4c-1.19 0-2.28.53-2.82 1.23v-.9H9.3v8.52h1.61v-3.7c0-.98.54-1.39 1.1-1.39c.67 0 1.09.43 1.09 1.39v3.8Z"></path>
    <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m4.61 14.86c-.53.59-1.34 1-2.29 1.13c-.63-1.07-1.4-2.13-2.37-3.13c-1.89 1.06-3.4 2.4-4.54 4.01a8.43 8.43 0 0 1-4.01-4.01c1.61-1.14 2.95-2.65 4.02-4.53c-1-0.97-2.06-1.74-3.13-2.37C5.01 6.66 5.42 5.85 6 5.39a8.433 8.433 0 0 1 12.61 11.47"></path>
  </svg>
);

export const IconSQLServer = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" role="img" aria-label="SQL Server logomark" {...props}>
    <path fill="currentColor" d="M20.25 0H.75v24h19.5V0zM6 18.75A1.5 1.5 0 0 1 4.5 20a1.5 1.5 0 0 1-1.5-1.5V18H6v.75zm0-2.25H3v-3h3v3zm0-3.75H3v-3h3v3zm0-3.75H3v-3h3v3zm3.75 9.75h-3v-3h3v3zm0-3.75h-3v-3h3v3zm0-3.75h-3v-3h3v3zm0-3.75h-3v-3h3v3zm8.25 9h-3v-3h3v3zm0-3.75h-3v-3h3v3zm0-3.75h-3v-3h3v3zm4.5 6h-3.75V18H18v-2.25h-3v-3h3V12h-3V9h3V8.25h-3.75V6H18V3h3v15zm-4.5-9h-3v-3h3v3z"></path>
  </svg>
);

export const IconDataAnalysis = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" role="img" aria-label="Data Analysis logomark" {...props}>
        <path fill="currentColor" d="M4 17.27V10.5h2.83v6.77zm6.77 0V6.77h2.83v10.5zm6.76 0V2.83h2.83v14.44z"></path>
    </svg>
);

export const IconGit = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" role="img" aria-label="Git logomark" {...props}>
        <path fill="currentColor" d="M22.05 10.87c-.2-.23-.48-.37-.77-.37h-3.23l-3.3-3.3a.75.75 0 1 0-1.06 1.06l1.97 1.97V15.5c0 .35.19.66.47.83l2.83 1.63a.75.75 0 1 0 .75-1.3l-2.05-1.18v-4.28h3.23c.3 0 .58-.14.78-.37c.2-.23.28-.54.2-.82zM8.7 15.5V4.24l-1.97-1.97A.75.75 0 1 0 5.67 3.33l3.3 3.3h3.23c.3 0 .58.14.78.37c.2.23.28.54.2.82s-.28.59-.78.82c-.2.23-.48.37-.78.37H9.17c-1.24 0-2.25 1.01-2.25 2.25v5.33c0 .35.19.66.47.83l2.83 1.63a.75.75 0 1 0 .75-1.3l-2.05-1.18c0-.01 0-.01 0 0zM3.25 12a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5zm12.25 6.75a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5zm-6-13.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5z"></path>
    </svg>
);
