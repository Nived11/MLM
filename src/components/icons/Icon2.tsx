const Icon2 = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.0702 0.754909L13.3965 24.1983L8.09161 15.6802L15.5702 7.91535L5.15922 10.9717L0 2.6875L27.0702 0.754909Z"
        fill={isActive ? "var(--blue-1)" : "white"}
      />
    </svg>
  );
};

export default Icon2;
