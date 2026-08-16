import type { SVGProps } from 'react';

/** Eye — password visible. */
export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Eye with slash — password hidden. */
export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M6.61 6.61A18.5 18.5 0 0 0 1 12s4 8 11 8a9.12 9.12 0 0 0 5.39-1.61" />
      <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88M1 1l22 22" />
    </svg>
  );
}

/** Checkmark used inside the custom checkbox. */
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M1 5l3.5 3.5L11 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function iconBase(props: SVGProps<SVGSVGElement>) {
  return {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
    ...props,
  };
}

/** Rounded-bowl glass — reds. */
export function GlassRedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase(props)}>
      <path d="M6 3h12a6 6 0 0 1-6 8 6 6 0 0 1-6-8Z" />
      <path d="M12 11v7M8.5 21h7" />
    </svg>
  );
}

/** Narrower tapered bowl — whites. */
export function GlassWhiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase(props)}>
      <path d="M7.5 3h9l-1.2 7a3.3 3.3 0 0 1-6.6 0L7.5 3Z" />
      <path d="M12 10v8M8.5 21h7" />
    </svg>
  );
}

/** Same bowl with a filled tint — rosé. */
export function GlassRoseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase(props)}>
      <path d="M7.5 3h9l-1.2 7a3.3 3.3 0 0 1-6.6 0L7.5 3Z" />
      <path d="M8.6 7h6.8" opacity="0.55" />
      <path d="M12 10v8M8.5 21h7" />
    </svg>
  );
}

/** Tall flute with bubbles — sparkling. */
export function GlassSparklingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase(props)}>
      <path d="M9 3h6l-.7 11a2.3 2.3 0 0 1-4.6 0L9 3Z" />
      <path d="M12 16.5V21M9.5 21h5" />
      <path d="M12 6.5v.01M11 9v.01M13 10.5v.01" />
    </svg>
  );
}

/** Three-glass toast — "open to anything". */
export function GlassAnyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase(props)}>
      <path d="M4 5h5l-1 5a1.5 1.5 0 0 1-3 0L4 5ZM15 5h5l-1 5a1.5 1.5 0 0 1-3 0l-1-5Z" />
      <path d="M6.5 12v6M17.5 12v6M12 8v11" />
    </svg>
  );
}

/** Left chevron for the Back control. */
export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase({ width: 18, height: 18, strokeWidth: 2, ...props })}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

/** Right chevron for the Continue control. */
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase({ width: 18, height: 18, strokeWidth: 2, ...props })}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** Restart / start-over. */
export function RestartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase({ width: 18, height: 18, ...props })}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

/** Four-point sparkle — sommelier flourish. */
export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase({ width: 20, height: 20, ...props })}>
      <path d="M12 3c.7 4.2 1.8 5.3 6 6-4.2.7-5.3 1.8-6 6-.7-4.2-1.8-5.3-6-6 4.2-.7 5.3-1.8 6-6Z" />
    </svg>
  );
}
