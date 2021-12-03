interface Props {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  className,
  onClick,
  ariaLabel,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
