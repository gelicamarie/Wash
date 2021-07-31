const Upload = (props) => {
  return (
    <svg
      width={439}
      height={242}
      viewBox="0 0 439 242"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M171 64.5a15.001 15.001 0 00-15 15v75a15.001 15.001 0 0015 15h90a15.001 15.001 0 0015-15v-75a15 15 0 00-15-15h-90zm90 90h-90l30-60 22.5 45 15-30 22.5 45z"
        fill="#283618"
      />
      <g filter="url(#prefix__filter0_d)">
        <rect
          x={1}
          y={1}
          width={429}
          height={232}
          rx={4}
          stroke="#BC6C25"
          strokeWidth={2}
          strokeDasharray="4 4"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_d"
          x={0}
          y={0}
          width={439}
          height={242}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={4} dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.376471 0 0 0 0 0.423529 0 0 0 0 0.219608 0 0 0 0.69 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default Upload;
